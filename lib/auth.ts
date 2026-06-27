//lib/auth.ts → funções para login.

import { jwtVerify } from "jose"
import { cookies } from "next/headers"

const secret = new  TextEncoder().encode(
    process.env.JWT_SECRET
)

export async function verifyAuth() {
    const token = (await cookies()).get('token')?.value

    if(!token){
        throw new Error("Não autenticado")
    }

    await jwtVerify(token, secret);
}