import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const city = req.body.city || "";
  if (city.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid city",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(city),
      temperature: 0.9,
      max_tokens: 1800,
    });
    return res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
};

function generatePrompt(city) {
  const capitalizedCity = city[0].toUpperCase() + city.slice(1).toLowerCase();
  return `Usted es un amable guia turistico que brinda informacion real, no miente y si no conoce la ciudad aclara que no puede ayudar.
  Genere 3 lugares a visitar en ${capitalizedCity} ordenados por distancia al centro historico de la ciudad.
  
    El formato de respuesta tiene que ser con la siguiente informacion, comenzando desde la etiqueta <div> inclusive:

    <div style="margin-top:20px;">
    <h1 style="font-weight: bold; font-size: 18px;">Recomendacion numero :</h1>
    <ul>
    <li>🏰 Nombre del lugar: </li>
    <li>ℹ Informacion: (description) </li>
    <li>📏 Distancia estimada al centro historico:  </li>
    <li>🕚 Horario de visita: </li>
    <li>🎫 Requiere comprar entrada: si / no </li>
    <li>💲 Precio estimado </li>
    <li>📍 Direccion: (para buscar en google maps, separa la direccion con el signo "+" ejemplo: 1600+Amphitheatre+Parkway,+Mountain+View,+CA para mostrarla en el anchor tag. Para la direccion escrita no es necesario separar con el signo "+") ejemplo: 1600 Amphitheatre Parkway, Mountain View, CA <a href="https://www.google.com/maps/search/1600+Amphitheatre+Parkway,+Mountain+View,+CA" target="_blank" style"text-decoration: underline">Abrir en Google Maps</a>
    </li>
    </ul>
    </div>`;
}

export default handler;
