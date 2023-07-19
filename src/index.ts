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

app.delete("/users/:id", (req: Request, res: Response) => {
    const idUser = req.params.id

    const indexUser = users.findIndex((user) => user.id === idUser)

    if(indexUser >= 0){
        users.splice(indexUser, 1)
        res.status(200).send(`Usuario de id:${idUser} deletado`)
    }else{
        res.send(`Usuario de id:${idUser} não encontrado`) 
    }
})


app.delete("/products/:id", (req: Request, res: Response) => {
    const idProduct = req.params.id

    const indexProduct = products.findIndex((product) => product.id === idProduct)
    
    if(indexProduct >= 0){
        const NameProduct = products[indexProduct].name
        products.splice(indexProduct,1)
        res.status(200).send(`Produto ${NameProduct}, com id: ${idProduct}, apagado com sucesso`)
    }else{
        res.send(`Produto de id:${idProduct} não encontrado`) 
    }
})

app.put("/products/:id", (req: Request, res: Response) =>{
    const idProduct = req.params.id
    const { newId, newName, newPrice, newDescription, newImageUrl } = req.body

    const productToEdit = products.find((product) => product.id === idProduct)
    
    if(productToEdit){
        productToEdit.id = newId || productToEdit.id
        productToEdit.name = newName || productToEdit.name
        productToEdit.price = newPrice || productToEdit.price
        productToEdit.description = newDescription || productToEdit.description
        productToEdit.imageUrl = newImageUrl || productToEdit.imageUrl
    }
    res.status(200).send(`produto alterado com sucesso`)
})