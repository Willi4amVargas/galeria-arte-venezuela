import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { getArtWork, getArtWorkImages, calculateScale } from "@/services/art";
import type { IArt } from "@/types/art";

export function Homepage() {
  const [artData, setArtData] = useState<IArt[]>();
  useEffect(() => {
    getArtWork({
      q: {
        page: 1,
        limit: 20,
      },
    }).then((e) => {
      if (e) {
        if (Array.isArray(e)) {
          setArtData(e);
        }
      }
    });
  }, []);

  return (
    <>
      <section className="w-full text-center my-30 text-[#660000]">
        <h1 className="text-3xl">Bienvenidos a la Galería</h1>
        <h2 className="text-xl">
          Explora la diversidad, el talento y la historia capturada por los
          artistas.
        </h2>
        <Carousel
          className="w-full max-w-1/2 text-black mx-auto mt-10"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {artData &&
              artData.map(
                ({ id, image_id, title, thumbnail, artist_display }, index) => {
                  //for render only firts 10
                  if (index > 10) return;
                  if (thumbnail) {
                    const MAX_WIDTH = 350;
                    const MAX_HEIGTH = 750;

                    const imgSrc = getArtWorkImages({
                      image_id,
                      resize: {
                        find_width: MAX_WIDTH,
                        find_heigth: MAX_HEIGTH,
                        width: thumbnail.width,
                        height: thumbnail.height,
                      },
                    });
                    return (
                      <CarouselItem key={id}>
                        <div className="h-full flex flex-col items-center">
                          <img
                            className="my-auto"
                            src={imgSrc}
                            loading="lazy"
                          />
                          <span>{title}</span>
                          <i className="text-xs">{artist_display}</i>
                        </div>
                      </CarouselItem>
                    );
                  }
                },
              )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <h1 className="text-3xl text-[#333333] mt-20 mb-10" id="featured-works">Obras Destacadas</h1>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 grid-cols-1 mx-20 gap-x-5 gap-y-10">
          {artData &&
            artData.map(
              (
                {
                  id,
                  image_id,
                  title,
                  thumbnail,
                  artist_display,
                  place_of_origin,
                },
                index,
              ) => {
                // Omitir los primeros 11 elementos
                if (index <= 10) return null;

                if (thumbnail) {
                  const MAX_WIDTH = 250;
                  const MAX_HEIGHT = 250;

                  const resize = {
                    find_width: MAX_WIDTH,
                    find_heigth: MAX_HEIGHT,
                    width: thumbnail.width,
                    height: thumbnail.height,
                  };
                  const [finalWidth, finalHeight] = calculateScale(resize);

                  const imgSrc = getArtWorkImages({
                    image_id,
                    resize,
                  });

                  return (
                    <div
                      key={id}
                      className="text-xs text-slate-800 flex flex-col items-center"
                    >
                      <div
                        className="relative bg-gray-200 overflow-hidden mb-2"
                        style={{
                          width: `${finalWidth}px`,
                          height: `${finalHeight}px`,
                        }}
                      >
                        <img
                          src={thumbnail.lqip}
                          className="absolute inset-0 w-full h-full blur-sm scale-105"
                          alt=""
                        />
                        <img
                          src={imgSrc}
                          alt={thumbnail.alt_text || title}
                          className="relative z-10 w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      <div className="w-full text-center px-2">
                        <h3 className="font-bold text-sm line-clamp-2">
                          {title}
                        </h3>
                        <span className="block truncate">{artist_display}</span>
                        <span className="text-slate-500 italic">
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
