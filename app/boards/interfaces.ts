export interface Card {
    id: string
    title: string
    desc: string
    list_id: number
}

export interface List {
    id: number
    title: string
    board_id: number
    list_cards: Card[]
}

export interface Board {
    id: number
    title: string
    description: string
    owner_id: number
    board_lists: List[]
}