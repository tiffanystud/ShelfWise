// backend/utils/auth.ts

/* 
- Hash passwords,
- Verify passwords (login),
- Create JTW, verify JTW
*/

import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { create, getNumericDate, Header } from "https://deno.land/x/djwt/mod.ts";


const jtwKey = Deno.env.get("JWT_SECRET")!;
const header: Header = {
    alg: "HS256",
    typ: "JWT",
}


export async function hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password);
    return hashed;
}


export async function comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
}


export function getTokenExpiration(minuteFromNow: number): number {

    const secondsInAMinute = 60;
    const millisecondsInASecond = 1000;
    const expirationTimestamp = Math.floor(Date.now() / millisecondsInASecond) + (minuteFromNow * secondsInAMinute);

    return expirationTimestamp
}


export async function generateJwtToken(payload: Record<string, any>): Promise<string> {

    const token = await create(header, payload, jtwKey);
    return token;
}




