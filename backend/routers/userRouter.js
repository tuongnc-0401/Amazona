import express from 'express'
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
const userData = [
    {
        name: "Tuong",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('1234', 8),
        isAdmin: true,
    },
    {
        name: "user",
        email: "user@gmail.com",
        password: bcrypt.hashSync('1234', 8),
        isAdmin: true,
    },
]

const userRouter = express.Router();

userRouter.get('/seed',
    expressAsyncHandler(
        async (req, res) => {
            await User.remove({});
            const createUsers = await User.insertMany(userData);
            res.send({ createUsers });
        }))

export default userRouter;