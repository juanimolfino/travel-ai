import Head from "next/head";
import Layout, { siteTitle, name, webDescription } from "../components/layout";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [completion, setCompletion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUserInput = (event) => {
    setCity(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });

      const data = await res.json();

      if (data.result) {
        const he = document.documentElement.clientHeight;
        setError("");
        setCompletion(data.result);
        setLoading(false);
        scrollToBottom(he);
      } else if (data.error) {
        setCompletion("");
        setError(data.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
      setCompletion("");
      setError(error);
      setLoading(false);
    }
  }

  function scrollToBottom(h) {
    setTimeout(() => {
      window.scrollTo({
        top: h,
        behavior: "smooth", // Para hacer el scroll suave
      });
    }, 1000);
  }

  function newGenerate() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para hacer el scroll suave
    });
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="h-screen flex items-center justify-center bg-cover bg-center bg-[url('/images/portada.jpeg')] opacity-90">
        <section className="md:w-2/3 sm:w-3/4 w-5/6">
          <h1 className="text-white text-6xl sm:text-8xl text-center font-soehne font-bold">
            {name}
          </h1>
          <p className="text-white text-md sm:text-xl text-center font-soehne">
            {webDescription}
          </p>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                className="p-2 bg-neutral-700 block text-white w-full rounded-md mt-10"
                type="text"
                onChange={handleUserInput}
                value={city}
                placeholder="Write a city to search (you can add country and more information)"
              />
              <button
                className="bg-yellow-500 p-2 rounded-md block disabled:bg-opacity-80 mt-4 hover:bg-yellow-400"
                type="submit"
                disabled={loading}
              >
                {" "}
                {loading ? "Thinking..." : "Generate"}
              </button>
              {error && (
                <section className="text-red-600 font-semibold text-2xl mt-4">
                  <div>{error.message}</div>
                </section>
              )}
            </form>
          </div>
        </section>
      </main>
      {completion && (
        <section className=" py-10 flex flex-col items-center justify-center bg-cover bg-center bg-amber-200 opacity-90 sm:px-20 px-10">
          <div className="container mx-auto flex flex-col align-middle">
            <h2 className="font-bold text-2xl">
              Lugares recomendados para tu visita a: {city}
            </h2>
            <br />
            <div
              className="text-black font-soehne text-md"
              dangerouslySetInnerHTML={{ __html: completion }}
            />
            <div>
              <button
                className="bg-yellow-500 p-2 rounded-md block disabled:bg-opacity-40 mt-8 mb-8 hover:bg-yellow-600"
                onClick={newGenerate}
              >
                New generate
              </button>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
