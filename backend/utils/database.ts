
// backend/utils/database.ts

/*  
 opens or creates the db
 reads the scheme and executes it
 exports usable data
*/

import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("shelfwise.db");
const schema = await Deno.readTextFile("../models/schema.sql");

db.execute(schema);

export default db;
