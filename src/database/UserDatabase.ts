import { User, UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async getUsers() {
        const result: User[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS) 
        return result
    }

    public async insertUser(newUserDB: UserDB) {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(newUserDB)
    }
}