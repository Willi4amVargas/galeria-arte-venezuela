import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useArt } from "@/context/ArtContext";
import { useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { APP_CONSTANTS } from "@/app.constants";
export function Homepage() {
  const { artWorks, getArtWorks } = useArt();
  const { setAppState } = useAppState();

  useEffect(() => {
    if (!artWorks)
      getArtWorks({
        params: { q: { page: 1, limit: 20 }, random: true },
        size: { max_heigth: 500, max_width: 500 },
      });
  }, []);

  return (
    <>
      <section className="w-full text-center my-10 md:my-20 text-[#660000] px-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          Bienvenidos a la Galería
        </h1>
        <h2 className="text-base md:text-xl mt-2 opacity-80">
          Explora la diversidad, el talento y la historia capturada por los
          artistas.
        </h2>

        <Carousel
          className="w-[90dvw] md:max-w-1/2 text-black mx-auto mt-10 items-center"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
        >
          <CarouselContent>
            {artWorks &&
              artWorks
                .slice(0, 10)
                .map(
                  (
                    { id, image_url, title, thumbnail, artist_display },
                    index,
                  ) => {
                    if (thumbnail) {
                      return (
                        <CarouselItem key={id} className="basis-full my-auto">
                          <div className="flex flex-col items-center p-2">
                            <button
                              onClick={() =>
                                setAppState({
                                  id: APP_CONSTANTS.ART_WORK_DETAIL_STATE,
                                  artwork_id: index,
                                })
                              }
                              className="cursor-pointer hover:opacity-90 transition-opacity"
                            >
                              <img
                                className="mx-auto rounded-lg shadow-md m"
                                src={image_url}
                                alt={title}
                                loading="lazy"
                              />
                            </button>
                            <span className="mt-4 font-semibold text-sm md:text-base">
                              {title}
                            </span>
                            <i className="text-xs opacity-70">
                              {artist_display}
                            </i>
                          </div>
                        </CarouselItem>
                      );
                    }
                  },
                )}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>

        <h1
          className="text-2xl md:text-3xl text-[#333333] mt-20 mb-10 font-bold"
          id="featured-works"
        >
          Obras Destacadas
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 max-w-7xl mx-auto px-2">
          {artWorks &&
            artWorks
              .slice(10)
              .map(
                (
                  {
                    id,
                    title,
                    thumbnail,
                    artist_display,
                    place_of_origin,
                    image_url
                  },
                  index,
                ) => {
                  if (thumbnail) {
                    return (
                      <div
                        key={id}
                        className="text-xs text-slate-800 flex flex-col items-center group"
                      >
                        <div
                          className="relative bg-gray-100 overflow-hidden mb-3 rounded-md shadow-sm transition-transform duration-300 group-hover:scale-105"
                        >
                          <button
                            onClick={() =>
                              setAppState({
                                id: APP_CONSTANTS.ART_WORK_DETAIL_STATE,
                                artwork_id: index + 10,
                              })
                            }
                            className="w-full h-full"
                          >
                            <img
                              src={thumbnail.lqip}
                              className="absolute inset-0 w-full h-full blur-sm scale-105"
                              alt=""
                            />
                            <img
                              src={image_url}
                              alt={title}
                              className="relative z-10 w-full h-full object-cover"
                              loading="lazy"
                            />
                          </button>
                        </div>

                        <div className="w-full text-center">
                          <h3 className="font-bold text-sm line-clamp-1 group-hover:text-[#660000] transition-colors">
                            {title}
                          </h3>
                          <span className="block truncate opacity-80">
                            {artist_display}
                          </span>
                          <span className="text-slate-500 italic block">
                            {place_of_origin}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                },
              )}
        </div>
      </section>
    </>
  );
}
