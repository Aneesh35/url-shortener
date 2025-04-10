import jwt from 'jsonwebtoken'

export const userAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'] || req.body.token;
        if(!token){
            return res.status(401).json({"msg":"access denied!!"})
        }
        const decodedUser=jwt.decode(token);
        if(!decodedUser){
            return res.status(401).json({"msg":"access denied!!"})
        }
        req.user=decodedUser.id;
        next();
    }
    catch (error) {
        return res.status(401).json({"msg":"Invalid token!!"})
    }
}