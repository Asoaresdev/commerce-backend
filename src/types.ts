export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string
}
export type UserDB = {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string
}

export type Products = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}