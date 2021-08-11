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
        gender: true,
    },
    {
        name: "user",
        email: "user@gmail.com",
        password: bcrypt.hashSync('1234', 8),
        isAdmin: true,
        gender: false
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
                gender: user.gender,
                token: generateToken(user),
            })
            return;
        }
    }
    res.status(401).send({ message: "Invalid email or password!" })
}))


userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        gender: req.body.gender
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        gender: createdUser.gender,
        token: generateToken(createdUser),
    })
}))
export default userRouter;