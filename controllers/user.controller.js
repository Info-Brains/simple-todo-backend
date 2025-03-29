const UserModel = require('../models/user.db.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const register = async (req, res) => {
    try {
        const {error, value} = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "Invalid input",
                error: error.details[0].message,
            })
        }

        const { email, password, name } = value;

        const isEmailExist = await UserModel.FindOne({ email: email });
        if (isEmailExist) {
            return res.status(409).json({
                message: "Email already exists",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await UserModel.CreateOne({
            name: name,
            email: email,
            password: hashedPassword,
        }, {
            id: true,
            name: true,
            email: true,
            createdAt: true
        });

        const authToken = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET)

        return res.status(201).json({
            message: "User created",
            data: {
                ...user,
                authToken: authToken
            }
        });
    } catch (err) {
        console.error('Register user err:', err)
        return res.status(500).json({
            message: 'Internal server error',
        })
    }
}

const login = async (req, res) => {
    try {
        const {error, value} = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "Invalid input",
                error: error.details[0].message,
            })
        }

        const { email, password } = value;

        const user = await UserModel.FindOne({ email: email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
            })
        }

        const authToken = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET)

        delete user.password;

        return res.status(200).json({
            message: "Login successful",
            data: {
                ...user,
                authToken: authToken
            }
        });
    } catch (err) {
        console.error('Login user err:', err)
        return res.status(500).json({
            message: 'Internal server error',
        })
    }
}

module.exports = {
    register,
    login
}
