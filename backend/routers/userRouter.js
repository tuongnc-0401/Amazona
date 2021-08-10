import express from 'express'
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
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
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            })
            return;
        }
    }
    res.status(401).send({ message: "Invalid email or password!" })
}))
export default userRouter;