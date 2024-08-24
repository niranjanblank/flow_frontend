export interface Card {
    id: number
    title: string
    desc: string
    list_id: number
    order: number
    created_at: string; 
    due_date?: string;   
    updated_at: string;
    completed: boolean
    labels: Label[]
}

export interface Label {
    id: number
    title: string
    color: string
    board_id: number
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
    board_lists: List[]
    background_image_url: string
    board_labels: Label[]
}

