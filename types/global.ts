export type MediaType = "movie" | "tv"

export type MediaItemType = {
    id: string
    title?: string
    name?: string
    overview: string
    backdrop_path: string | null
    poster_path: string | null
    release_date?: string
    first_air_date?: string
}

export type PersonType = {
    id: string
    name: string
    character: string
    profile_path: string | null
}
