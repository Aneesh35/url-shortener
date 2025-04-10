import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
})


UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);

}

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateJwt = function () {
    return jwt.sign({ email: this.email }, secret, { expiresIn: '24h' });
}

export const userModel = model("users", UserSchema);