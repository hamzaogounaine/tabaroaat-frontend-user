import jwt from 'jsonwebtoken'

export function verifyToejn(req) {
    const token = req.cookies?.token;
    if(!token) return null;

    try {
        const user = jwt.verify(token , process.env.JWT_SECRET)
        return user
    }
    catch {
        return null
    }
}