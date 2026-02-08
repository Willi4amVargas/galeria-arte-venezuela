import { useAppState } from "@/context/AppStateContext";
import { useArt } from "@/context/ArtContext";

export function ArtWorkDetail({ id }: { id: number }) {
  const { setAppState } = useAppState();
  const { artWorks } = useArt();

  if (!artWorks) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <h1 className="text-xl font-light text-gray-500 animate-pulse">
          Cargando los datos de la obra...
        </h1>
      </div>
    );
  }

  const artWorkDetailData = artWorks[id];

  if (!artWorkDetailData) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Obra no encontrada</h1>
        <p className="text-gray-600">
          Lo sentimos, no pudimos localizar la pieza solicitada.
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <section className="relative group overflow-hidden rounded-lg bg-gray-100 shadow-2xl">
          <img
            src={artWorkDetailData.image_url}
            alt={
              artWorkDetailData.thumbnail.alt_text || artWorkDetailData.title
            }
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold tracking-widest uppercase">
            {artWorkDetailData.place_of_origin}
          </span>
        </section>

        <section className="flex flex-col space-y-6">
          <header>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 leading-tight">
              {artWorkDetailData.title}
            </h1>
            <p className="text-xl text-gray-600 mt-2 italic">
              {artWorkDetailData.artist_display}
            </p>
          </header>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                Técnica
              </h3>
              <p className="text-gray-800 text-lg">
                {artWorkDetailData.medium_display}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  Categoría
                </h3>
                <p className="text-gray-800">
                  {artWorkDetailData.category_titles.join(", ") || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  Clasificación
                </h3>
                <p className="text-gray-800">
                  {artWorkDetailData.classification_titles.join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {artWorkDetailData.category_titles.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full hover:bg-black hover:text-white transition-colors cursor-default"
              >
                #{tag.toLowerCase().replace(/\s+/g, "")}
              </span>
            ))}
          </div>

          <button
            className="mt-8 border-2 border-black py-3 px-8 text-black font-bold hover:bg-black hover:text-white transition-all duration-300 w-fit cursor-pointer"
            onClick={() => setAppState({ id: 1 })}
          >
            VOLVER A LA GALERÍA
          </button>
        </section>
      </div>
    </main>
  );
}
