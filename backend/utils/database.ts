
// backend/utils/database.ts

/*  
 opens or creates the db
 reads the scheme and executes it
 exports usable data
*/

import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts"; 

const db = new DB("shelfwise.db");
const schema = await Deno.readTextFile(new URL("../models/schema.sql", import.meta.url));


db.execute(schema);

export default db;
