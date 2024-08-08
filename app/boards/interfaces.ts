export interface Card {
    id: number
    title: string
    desc: string
    list_id: number
    order: number
}

export interface List {
    id: number
    title: string
    board_id: number
    list_cards: Card[],
    order: number
}

export interface Board {
    id: number
    title: string
    description: string
    owner_id: number
    board_lists: List[],
}