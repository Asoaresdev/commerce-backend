import { products, users } from "./database";
import express, { Request, Response } from "express"
import cors from "cors"
import { Products, User } from "./types";


const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("servidor rodando na porta 3003, http://localhost:3003") 
})

//endpoint de teste
app.get("/ping", (req: Request, res: Response) =>{
    res.status(200).send("Pong!")
})


app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    const name = req.query.name as string
    
    if(name){
        const result = products.filter((product) =>{
            return product.name.toLowerCase().includes(name.toLowerCase())
        })
        res.status(200).send(result)
    }else{
        res.status(200).send(products)
    }
})

app.post("/users", (req: Request, res: Response) => {
    const {id, name, email, password} = req.body
    
    const newUser: User = {
        id: id,
        name: name,
        email: email,
        password: password, 
        createdAt :new Date().toISOString()
    }
    users.push(newUser)
    
    res.status(201).send("cadastro realizado com sucesso") 
})

app.post("/products", (req:Request, res: Response) => {
    const { id, name, price, description, imageUrl} = req.body

    const newProduct: Products = {
        id,
        name,
        price,
        description,
        imageUrl
    }
    products.push(newProduct)
    res.status(201).send(`Produto ${name} criado com sucesso`)
})

