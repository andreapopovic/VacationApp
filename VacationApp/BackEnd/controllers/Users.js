import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Request from "../models/RequestModel.js";

export const getUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            attributes:['userID','name','lastName','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const getUserById = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                id: req.params.id
            }

        });
        res.json(user[0]);

    } catch (error) {
        res.json({ message: error.message });
    }
}
export const Register = async(req, res) => {
    const { name,lastname, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            type:0,
            name: name,
            lastname:lastname,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match)
            return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const type = user[0].type;
        const name = user[0].name;
        const lastname = user[0].lastname;
        const email = user[0].email;
        const accessToken = jwt.sign({userId,type, name, lastname, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId,type, name, lastname, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await User.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken ,userId,type});
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}

export const Logout = async(req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken)
        return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    console.log("User that want to loguot: " + user[0])
    if(!user[0])

        return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}