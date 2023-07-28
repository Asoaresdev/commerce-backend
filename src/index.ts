import { products, users } from "./database";
import express, { Request, Response } from "express"
import cors from "cors"
import { Products, User } from "./types";
import { db } from "./database/knex";


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


app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM users
        `)
        res.status(200).send(result)
        if (!result) {
            res.status(404)
            throw new Error("O recurso solicitado não foi encontrado")
        }

    } catch (error) {
        console.log(error)

        // se chegar ainda valendo 200 sabemos que foi um erro inesperado
        if (res.statusCode === 200) {
            res.status(500) // definimos 500 porque é algo que o servidor não previu
        }
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }

    }

})

app.get("/products", async(req: Request, res: Response) => {
    try {
        const name = (req.query.name as string).toLowerCase()

        if (name) {
            // verificação pedida no Projeto, porém sem sentido
            if (name.length < 1) {
                throw new Error("Precisa de pelo menos 1 caracter")
            }
            const result = await db.raw(`
                SELECT * FROM products
                WHERE name like "%${name}%";
            `)
            //==
            
            
            res.status(200).send(result)
        } else {
            const resultGetAllProducts = await db.raw(`
            SELECT * FROM products;
        `)
            res.status(200).send(resultGetAllProducts)
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado dos servidor")
        }
        res.send(error.message)
    }

})

app.post("/users", async (req: Request, res: Response) => {
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

        const validateIdInDatabase = await db.raw(`
            SELECT * FROM users
            WHERE id = '${id}';
        `)
       
        const [validateEmailInDatabase] = await db.raw(`
            SELECT * FROM users
            WHERE email = '${email}';
        `)

        if (validateIdInDatabase[0]) {
            res.statusCode = 400
            throw new Error("ID já cadastrado")
        }
        if (validateEmailInDatabase) {
            res.statusCode = 400
            throw new Error(" Email já cadastrado")
        }

        await db.raw(`
            INSERT INTO users (id, name, email, password, created_at)
            VALUES('${id}', '${name}', '${email}', '${password}', '${new Date().toISOString()}')
        `)
      

        res.status(201).send("cadastro realizado com sucesso")
    } catch (error: any) {
        console.log(error);
        
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado do servidor")
        }
        res.send(error.message)
    }
})



app.post("/products", async (req: Request, res: Response) => {
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
        if ( typeof description !== "string" ) {
            res.statusCode = 400
            throw new Error( "Description precisa ser uma string" )
        }
        if ( typeof imageUrl !== "string" ) {
            res.statusCode = 400
            throw new Error( "imageUrl precisa ser uma string" )
        }

        const validadteId = await db.raw(`
            SELECT * FROM products
            WHERE id = '${id}';
        `)
        
        if( validadteId[0] ){
            res.statusCode = 400
            throw new Error( "id já cadastrado" )
        }


        await db.raw(`
            INSERT INTO products ( id, name, price, description, image_url )
            VALUES( "${ id }","${ name }","${ price }","${ description }","${ imageUrl }" )
        `)

        res.status( 201 ).send( `Produto ${ name } criado com sucesso` )
    } catch ( error: any ) {
        
        if ( res.statusCode === 200 ) {
            res.status( 500 ).send( "Erro inesperado no servidor" )
        }
        res.send( error.message )
    }

})

app.delete( "/users/:id", async ( req: Request, res: Response ) => {
    try{
        const idUser = req.params.id
    
        const [ user ] : User[] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${ idUser }";
        `)
    
        if ( !user ) {
            res.statusCode = 400
            throw new Error( `Usuario de id: ${ idUser } não encontrado` )
        } 

        await db.raw(`
	        DELETE FROM users
            WHERE id = "${ idUser }";
        `)
        res.status( 200 ).send( { message: "Usuário deletado com sucesso" } )
    } catch ( error ) {
        console.log( error );
        
        if( res.statusCode === 200 ) {
            res.status( 500 ).send( { message:"Erro inesperado no servidor" } )
        }
        if ( error instanceof Error ) {
            res.send( error.message )
        } else {
            res.send( "Erro inesperado" )
        }
    }
})


app.delete("/products/:id", async ( req: Request, res: Response ) => {
    try {
        const idProduct = req.params.id
    
        const [ product ] : Products[] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${ idProduct }";
        `)
    
        if ( !product ) {
            res.statusCode = 400
            throw new Error( `Produto de id:${idProduct} não encontrado` )
        } 

        await db.raw(`
	        DELETE FROM products
            WHERE id = "${ idProduct }";
        `)
        res.status( 200 ).send( { message: "Produto deletado com sucesso" } )
    } catch( error ){
        if( res.statusCode === 200 ){
            res.status( 500 ).send( "Erro inesperado no servidor" )
        }
        if ( error instanceof Error ) {
            res.send( error.message )
        } else {
            res.send( "Erro inesperado" )
        }
    }
})

app.put( "/products/:id", async( req: Request, res: Response) => {
    try{
        const idProduct = req.params.id
        const { newId, newName, newPrice, newDescription, newImageUrl } = req.body
       
        if ( newId && typeof newId !== "string" ) {
            res.statusCode = 400
            throw new Error( "id precisa ser uma string" )
        }
        if ( newName && typeof newName !== "string" ) {
            res.statusCode = 400
            throw new Error( "Nome precisa ser uma string" )
        }
        if ( newPrice && typeof newPrice !== "number" ) {
            res.statusCode = 400
            throw new Error( "Price precisa ser um number" )
        }
        if ( newDescription && typeof newDescription !== "string" ) {
            res.statusCode = 400
            throw new Error( "Description precisa ser uma string" )
        }
        if ( newImageUrl && typeof newImageUrl !== "string" ) {
            res.statusCode = 400
            throw new Error( "imageUrl precisa ser uma string" )
        }
       
        const [ productToEdit ] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${ idProduct }"
        `)

        if( productToEdit ){
            await db.raw(`
            UPDATE products
            SET
                id = "${ newId || productToEdit.id }",
                name = "${ newName || productToEdit.name }",
                price = "${ newPrice || productToEdit.price }",
                description = "${ newDescription || productToEdit.description }",
                image_url = "${ newImageUrl || productToEdit.image_url }"
            WHERE
                id = "${idProduct}"
            `)
        }
        res.status( 200 ).send( { message:`produto alterado com sucesso` } )

    }catch( error : any ){
              
        if( res.statusCode === 200 ) {
            res.status( 500 ).send( "Erro inseperado no servidor" )
        }
        
        if( error instanceof Error ){
            res.send( error.message )
        } else{
            res.send( "Erro inesperado" )
        }
    }
})

app.post( "/purchases", async( req: Request, res: Response ) => {
    try{
        const { id, buyer, products } = req.body

        if( !id || typeof id !== "string" ){
            res.statusCode = 400
            throw new Error( "id é obrigatório e precisa ser uma string" )
        }
        if( !buyer || typeof buyer !== "string" ){
            res.statusCode = 400
            throw new Error( "buyer é obrigatório e precisa ser uma string" )
        }
        if( !products ){
            res.statusCode = 400
            throw new Error( "products é obrigatório" )
        }
        
                
        let query = ""
        let totalPrice = 0
        for ( const product of products ) {
            if( !product.quantity ||  typeof product.quantity !== "number"  ){
                res.statusCode = 400
                throw new Error( "quantitiy em products é obrigatório e precisa ser um number" )
            }
            if( !product.id  || typeof product.id !== "string"  ){
                res.statusCode = 400
                throw new Error( "id de products é obrigatório e precisa ser uma string" )
            }

            const [ priceProduct ] = await db.raw(`
                SELECT price FROM products
                WHERE id = "${ product.id }"
            `)
            
            totalPrice += product.quantity * priceProduct.price
            
            query += `( "${ id }", "${ product.id }", ${ product.quantity } ), `
        }
        
        await db.raw(`
        INSERT INTO purchases ( id, buyer, total_price, created_at )
        VALUES( "${ id }","${ buyer }","${ totalPrice }","${ new Date().toISOString() }" )
        `)
        const newTeste = query.slice(0, -2)

        await db.raw(`
            INSERT INTO purchases_products ( purchase_id, product_id, quantity )
            VALUES
            ${ newTeste }
        `)
        res.status( 201 ).send( { message:`Pedido realizado com sucesso` } )
    }catch( error:any ){
        console.log(error);
        
        if( res.statusCode === 200 ) {
            res.status( 500 ).send( "Erro inseperado no servidor" )
        }
        
        if( error instanceof Error ){
            res.send( error.message )
        } else{
            res.send( "Erro inesperado" )
        }
        
    }
})