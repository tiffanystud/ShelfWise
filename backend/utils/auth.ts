// backend/utils/auth.ts

/* 
- Hash passwords,
- Verify passwords (login),
- Create JTW, verify JTW
*/

import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export async function hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password);
    return hashed;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}