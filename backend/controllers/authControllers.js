import User from '../models/authModals.js';
import bcryptjs from 'bcryptjs';
import generateJWT from '../utils/createToken.js';

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format',
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long',
            });
        }
        const existingUserName = await User.findOne({ username });

        if (existingUserName) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists',
            });
        }
        const existingUserEmail = await User.findOne({ email });

        if (existingUserEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = [
            '/avatar1.png',
            '/avatar2.png',
            '/avatar3.png',
        ];

        const image =
            PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            username,
            email,
            password: hashedPass,
            image,
        });
        generateJWT(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...newUser._doc,
                password: null,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email||!password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        const user = await User.findOne({email})

        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }
        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
            });
        }

        generateJWT(user._id, res)

        res.json({
            success: true,
            message: 'Logged in successfully',
            user: {
                ...user._doc,
                password: null,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('jwt-netflix');
        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

export { signup, login, logout };
