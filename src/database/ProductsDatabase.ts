import { Products } from "../types";
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

}