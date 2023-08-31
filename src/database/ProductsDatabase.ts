import { Products, ProductsDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";


export class ProductsDatabase extends BaseDatabase{
    public static TABLE_PRODUCTS = "products"

    public async getProducts(name:string){
        const result:Products[] = await BaseDatabase 
            .connection(ProductsDatabase.TABLE_PRODUCTS)
            .select()
            .where("name", "LIKE", `%${name}%`)

            return result
    }
    public async getAllProducts(){
        const result:Products[] = await BaseDatabase 
            .connection(ProductsDatabase.TABLE_PRODUCTS)

            return result
    }

    public async insertProduct(newProduct: ProductsDB) {
        await BaseDatabase
        .connection(ProductsDatabase.TABLE_PRODUCTS)
        .insert(newProduct)
    }

    public async deleteProduct(id:string, ) {
        await BaseDatabase
        .connection(ProductsDatabase.TABLE_PRODUCTS)
        .del()
        .where({id:id})
    }
    
    public async editProduct(id:string, updateUser:ProductsDB){
        await BaseDatabase
        .connection(ProductsDatabase.TABLE_PRODUCTS)
        .update(updateUser)
        .where({id:id})
    }
}