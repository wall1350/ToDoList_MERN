export interface ToDoInterface {
    id: string
    userId: string
    title: string
    textContent: string
    highlightFlag?: boolean
    progessStatus?: string
}

export interface GetToDoResult {
    data:[ToDoInterface]
}

export interface CreateToDoInterface {
    title: string
    textContent: string
}

export interface editToDoInterface {
    userId: string
    title: string
    textContent: string
    highlightFlag?: boolean
    progessStatus?: string
}