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
    seasons?: SeasonType[]
}

export type SeasonType = {
    id: string
    season_number: number
    name: string
    episode_count: number
}

export type EpisodeType = {
    id: string
    episode_number: number
    name: string
    air_date: string | null
    runtime: number | null
    overview: string
}

export type SeasonDetailsType = {
    id: string
    name: string
    season_number: number
    episodes: EpisodeType[]
}

export type PersonType = {
    id: string
    name: string
    character: string
    profile_path: string | null
}
