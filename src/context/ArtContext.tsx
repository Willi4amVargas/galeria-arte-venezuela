import type { IArt } from "@/types/art";
import { createContext, useContext, useState, type ReactNode } from "react";
import { getArtWork, getArtWorkImages, type IGetArtWork } from "@/services/art";

interface IArtWorkWithImageUrl extends IArt {
  image_url: string;
}
interface IGetArtWorkContext {
  params: IGetArtWork;
  size: { max_width: number; max_heigth: number };
}

interface IArtContext {
  artWorks: IArtWorkWithImageUrl[] | undefined;
  getArtWorks: (data: IGetArtWorkContext) => Promise<void>;
}

export const ArtContext = createContext<IArtContext>({
  artWorks: undefined,
  getArtWorks: async ({ params, size }) => {},
});

export const ArtProvider = ({ children }: { children: ReactNode }) => {
  const [artWorks, setArtWorks] = useState<IArtWorkWithImageUrl[]>();

  const getArtWorks = async ({ params, size }: IGetArtWorkContext) => {
    try {
      const data = await getArtWork(params);
      if (data && Array.isArray(data)) {
        const artWorksWithImageUrl = data.map((art) => {
          const getArtWorkImagesObject = size
            ? {
                image_id: art.image_id,
                resize: {
                  find_width: size.max_width,
                  find_heigth: size.max_heigth,
                  width: art.thumbnail.width,
                  height: art.thumbnail.height,
                },
              }
            : { image_id: art.image_id };

          const imgSrc = getArtWorkImages(getArtWorkImagesObject);
          return {
            image_url: imgSrc,
            ...art,
          };
        });
        setArtWorks(artWorksWithImageUrl);
        return;
      } else {
        throw Error("Cant get ArtWorks or is not and array");
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return <ArtContext value={{ artWorks, getArtWorks }}>{children}</ArtContext>;
};

export const useArt = () => {
  const context = useContext(ArtContext);
  if (!context) {
    throw new Error("useArt must be used within a ArtProvider");
  }
  return context;
};
