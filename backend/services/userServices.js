
import { userModel } from "../model/user.model.js";
import bcrypt from 'bcrypt'
export const createUser=async({email,password})=>{
    if(!email || !password){
        throw new Error("Email or password is required");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        email:email,
        password:hashedPassword,
    })
    return user;
}

export const findUser=async({email,password})=>{
    try{
        const user=await userModel.findOne({email}).select('+password')
        if(user){
            bcrypt.compare(password,user.password);
            return user;
        }
        throw new Error("user not found !!")
    }
    catch(error){
        throw new Error("user Email or password is wrong!!");
    }
}