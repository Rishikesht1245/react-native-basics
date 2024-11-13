export interface IUser {
    name : string,
    email : string,
    password : string,
    todos : ITodo[]
}

export interface ITodo {
    title : string,
    status : "pending" | "completed",
    category : "all" | "personal" | "work",
    dueDate :string
}