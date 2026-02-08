import type { IArt } from "@/types/art";
import env from "@/lib/env";

interface IQueryGetArtWork {
  page: number;
  limit: number;
}

export interface IGetArtWork {
  id?: number;
  random?: boolean;
  q?: IQueryGetArtWork;
}

export const getArtWork = async ({
  id,
  random = true,
  q = {
    page: 1,
    limit: 10,
  },
}: IGetArtWork = {}): Promise<IArt[] | IArt | void> => {
  const url = id
    ? `${env.ARTDATA_API_URL}/${id}`
    : q && q.page && q.limit
      ? `${env.ARTDATA_API_URL}?page=${random ? getRandomInt(1000) : q.page}&limit=${q.limit}`
      : `${env.ARTDATA_API_URL}`;
  try {
    const response = await fetch(`${url}`, {
      headers: {
        "AIC-User-Agent": "galeria-de-arte (info@widvu.com)",
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

interface IGetArtWorkImageResize {
  width: number;
  height: number;
  find_width: number;
  find_heigth: number;
}

interface IGetArtWorkImages {
  image_id: string | string[];
  region?: [number, number, number, number] | "full";
  size?: [number, number] | number | "full";
  rotation?: number;
  resize?: IGetArtWorkImageResize;
}

export function getArtWorkImages(
  params: IGetArtWorkImages & {
    image_id: string;
    resize?: IGetArtWorkImageResize;
  },
): string;
export function getArtWorkImages(
  params: IGetArtWorkImages & { image_id: string[] },
): string[];

export function getArtWorkImages({
  image_id,
  region = "full",
  size = 350,
  rotation = 0,
  resize,
}: IGetArtWorkImages): string | string[] {
  if (!Array.isArray(image_id)) {
    if (resize) {
      return `${env.ARTIMAGES_API_URL}/${image_id}/${Array.isArray(region) ? `pct:${region.join(",")}` : region}/${calculateScale(resize).join(",")}/${rotation}/default.jpg`;
    }
    return `${env.ARTIMAGES_API_URL}/${image_id}/${Array.isArray(region) ? `pct:${region.join(",")}` : region}/${Array.isArray(size) ? size.join(",") : typeof size === "number" ? `${size},` : `${size}`}/${rotation}/default.jpg`;
  } else {
    return image_id.map(
      (e) =>
        `${env.ARTIMAGES_API_URL}/${e}/${Array.isArray(region) ? region.join(",") : region}/${Array.isArray(size) ? size.join(",") : typeof size === "number" ? `${size},` : `${size}`}/${rotation}/default.jpg`,
    );
  }
}

export function calculateScale({
  find_width,
  find_heigth,
  width,
  height,
}: IGetArtWorkImageResize): [number, number] {
  const scale = Math.min(find_heigth / width, find_width / height);
  return [Math.round(width * scale), Math.round(height * scale)];
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
