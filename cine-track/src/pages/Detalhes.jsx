import { useState } from "react";
import { ArrowLeft, Star, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";

const movie = {
  id: 1,
  title: "Interestelar",
  originalTitle: "Interstellar",
  poster:
    "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  rating: "8.4",
  releaseDate: "2014",
  type: "Filme",
  genres: ["Ficção científica", "Drama", "Aventura"],
  duration: "2h 49min",
  synopsis:
    "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.",
};

function Detalhes() {
  const [added, setAdded] = useState(() => {
    const savedMovies = localStorage.getItem("cineTrackMinhaLista");

    if (!savedMovies) {
      return false;
    }

    const movies = JSON.parse(savedMovies);

    return movies.some((item) => item.id === movie.id);
  });

  function handleAddToList() {
    const savedMovies = localStorage.getItem("cineTrackMinhaLista");

    const movies = savedMovies ? JSON.parse(savedMovies) : [];

    const alreadyExists = movies.some((item) => item.id === movie.id);

    if (alreadyExists) {
      setAdded(true);
      return;
    }

    const movieToSave = {
      ...movie,
      status: "Quero assistir",
    };

    const updatedMovies = [...movies, movieToSave];

    localStorage.setItem(
      "cineTrackMinhaLista",
      JSON.stringify(updatedMovies),
    );

    setAdded(true);
  }

  return (
    <main className="min-h-screen bg-[#0b1020]">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <Link
          to="/explorar"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Voltar para explorar
        </Link>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
          <div>
            <img
              src={movie.poster}
              alt={`Pôster de ${movie.title}`}
              className="w-full max-w-[320px] rounded-xl object-cover shadow-2xl"
            />
          </div>

          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span>{movie.type}</span>
              <span>{movie.releaseDate}</span>
              <span>{movie.duration}</span>
            </div>

            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {movie.title}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {movie.originalTitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <Star size={20} fill="currentColor" />
                <span className="font-semibold">{movie.rating}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-md border border-white/10 px-3 py-1 text-xs text-gray-400"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white">
                Sinopse
              </h2>

              <p className="mt-3 leading-7 text-gray-400">
                {movie.synopsis}
              </p>
            </div>

            <button
              onClick={handleAddToList}
              disabled={added}
              className={`mt-8 flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${
                added
                  ? "bg-white/10 text-gray-300"
                  : "bg-indigo-500 text-white hover:bg-indigo-400"
              }`}
            >
              {added ? <Check size={19} /> : <Plus size={19} />}

              {added ? "Adicionado à minha lista" : "Adicionar à minha lista"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Detalhes;