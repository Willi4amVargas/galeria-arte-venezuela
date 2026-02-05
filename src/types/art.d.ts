export type IArtTumbnail = {
    lqip: string
    width: number
    height: number
    alt_text: string
}

export type IArt = {
    id: number
    title: string
    medium_display: string
    thumbnail: IArtTumbnail
    artist_display: string
    place_of_origin: string
    category_titles: string[]
    classification_titles: string[]
    image_id: string
}