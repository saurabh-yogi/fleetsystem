const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// Register
router.post('/register', async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    'Password must contain uppercase, lowercase, number, special character and minimum 8 characters.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: 'User registered successfully'
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

});


// Login

router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: 'Invalid credentials'
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '7d'
            }

        );

        return res.status(200).json({

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        return res.status(500).json({

            message: error.message

        });

    }

});

module.exports = router;