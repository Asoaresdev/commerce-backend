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
app.get("/ping", (req: Request, res: Response) => {
    try {
        res.status(200).send("Pong!")

    } catch (error: any) {
        console.log(error)

        // se chegar ainda valendo 200 sabemos que foi um erro inesperado
        if (res.statusCode === 200) {
            res.status(500) // definimos 500 porque é algo que o servidor não previu
        }

        res.send(error.message)
    }
})
// =============================***============================


app.get("/users", (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
        if (!users) {
            res.status(404)
            throw new Error("O recurso solicitado não foi encontrado")
        }

    } catch (error: any) {
        console.log(error)

        // se chegar ainda valendo 200 sabemos que foi um erro inesperado
        if (res.statusCode === 200) {
            res.status(500) // definimos 500 porque é algo que o servidor não previu
        }

        res.send(error.message)
    }

})

app.get("/products", (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        if (name) {
            // verificação pedida no Projeto, porém sem sentido
            if (name.length < 1) {
                throw new Error("Precisa de pelo menos 1 caracter")
            }
            //==
            const result = products.filter((product) => {
                return product.name.toLowerCase().includes(name.toLowerCase())
            })
            res.status(200).send(result)
        } else {
            res.status(200).send(products)
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado dos servidor")
        }
        res.send(error.message)
    }

})

app.post("/users", (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if (typeof id !== "string") {
            res.statusCode = 400
            throw new Error("id precisa ser uma string")
        }
        if (typeof name !== "string") {
            res.statusCode = 400
            throw new Error("Nome precisa ser uma string")
        }
        if (typeof email !== "string") {
            res.statusCode = 400
            throw new Error("Email precisa ser uma string")
        }
        if (typeof password !== "string") {
            res.statusCode = 400
            throw new Error("Password precisa ser uma string")
        }

        const validateIdInDatabase = users.find((user) => user.id === id)
        const validateEmailInDatabase = users.find((user) => user.email === email)

        if (validateIdInDatabase) {
            res.statusCode = 400
            throw new Error("ID já cadastrado")
        }
        if (validateEmailInDatabase) {
            res.statusCode = 400
            throw new Error(" Email já cadastrado")
        }

        const newUser: User = {
            id: id,
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        }
        users.push(newUser)

        res.status(201).send("cadastro realizado com sucesso")
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado dos servidor")
        }
        res.send(error.message)
    }
})



app.post("/products", (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl } = req.body

        if (typeof id !== "string") {
            res.statusCode = 400
            throw new Error("id precisa ser uma string")
        }
        if (typeof name !== "string") {
            res.statusCode = 400
            throw new Error("Nome precisa ser uma string")
        }
        if (typeof price !== "number") {
            res.statusCode = 400
            throw new Error("Price precisa ser um number")
        }
        if (typeof description !== "string") {
            res.statusCode = 400
            throw new Error("Description precisa ser uma string")
        }
        if (typeof imageUrl !== "string") {
            res.statusCode = 400
            throw new Error("imageUrl precisa ser uma string")
        }

        const validadteId = products.find((product) => product.id === id)
        if(validadteId){
            res.statusCode = 400
            throw new Error("id já cadastrado")
        }
        const newProduct: Products = {
            id,
            name,
            price,
            description,
            imageUrl
        }
        products.push(newProduct)
        res.status(201).send(`Produto ${name} criado com sucesso`)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado no servidor")
        }
        res.send(error.message)
    }

})

app.delete("/users/:id", (req: Request, res: Response) => {
    try{
        const idUser = req.params.id
    
        const indexUser = users.findIndex((user) => user.id === idUser)
        
    
        if (indexUser >= 0) {
            users.splice(indexUser, 1)
            res.status(200).send(`Usuario de id: ${idUser} deletado`)
        } else {
            res.statusCode = 400
            throw new Error(`Usuario de id: ${idUser} não encontrado`)
        }
    } catch ( error: any ) {
        if(res.statusCode === 200) {
            res.status(500).send("Erro inesperado no servidor")
        }
        res.send(error.message)
    }
})


app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const idProduct = req.params.id
    
        const indexProduct = products.findIndex((product) => product.id === idProduct)
    
        if (indexProduct >= 0) {
            const NameProduct = products[indexProduct].name
            products.splice(indexProduct, 1)
            res.status(200).send(`Produto ${NameProduct}, com id: ${idProduct}, apagado com sucesso`)
        } else {
            res.statusCode = 400
            throw new Error(`Produto de id:${idProduct} não encontrado`)
        }
    } catch( error: any ){
        if(res.statusCode === 200){
            res.status(500).send("Erro inesperado no servidor")
        }
        res.send(error.message)
    }
})

app.put("/products/:id", (req: Request, res: Response) => {
    try{
        const idProduct = req.params.id
        const { newId, newName, newPrice, newDescription, newImageUrl } = req.body
        const productToEdit = products.find((product) => product.id === idProduct)
        if(!productToEdit){
            res.statusCode = 400
            throw new Error("Produto não encontrado")
        } 

        if (newId && typeof newId !== "string") {
            res.statusCode = 400
            throw new Error("id precisa ser uma string")
        }
        if (newName && typeof newName !== "string") {
            res.statusCode = 400
            throw new Error("Nome precisa ser uma string")
        }
        if (newPrice && typeof newPrice !== "number") {
            res.statusCode = 400
            throw new Error("Price precisa ser um number")
        }
        if (newDescription && typeof newDescription !== "string") {
            res.statusCode = 400
            throw new Error("Description precisa ser uma string")
        }
        if (newImageUrl && typeof newImageUrl !== "string") {
            res.statusCode = 400
            throw new Error("imageUrl precisa ser uma string")
        }
       
            productToEdit.id = newId || productToEdit.id
            productToEdit.name = newName || productToEdit.name
            productToEdit.price = newPrice || productToEdit.price
            productToEdit.description = newDescription || productToEdit.description
            productToEdit.imageUrl = newImageUrl || productToEdit.imageUrl
       
        res.status(200).send(`produto alterado com sucesso`)

    }catch( error : any ){
        if(res.statusCode === 200) {
            res.status(500).send("Erro inseperado no servidor")
        }
        res.send(error.message)
    }
})