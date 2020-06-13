const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../Models/userModels');
const { check, validationResult } = require('express-validator');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // here will pass an object to env so it will understand where the configuration file is located
const JwtSecret = process.env.JWT_SECRET || 'mySecrettoken';

const router = express.Router();

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   Post api/users/login
// @desc    Authenticate use and get token
// @access  Public
router.post('/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {

            // see if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            JWT.sign(
                payload,
                JwtSecret,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            );

        } catch (error) {
            console.error(error.message);
            res.status(500).send('server error');
        }
    });


// @route   Post api/users/register
// @desc    Authenticate use and get token
// @access  Public
router.post('/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 })
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {

            // see if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'user already exists' }] });
            }

            user = new User({
                name,
                email,
                password
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            JWT.sign(
                payload,
                JwtSecret,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            );

        } catch (error) {
            console.error(error.message);
            res.status(500).send('server error');
        }
    });

// @route   Post api/users/updateProfile
// @desc    Authenticate use and get token
// @access  Public
router.put('/updateProfile',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 })
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {

            // see if user exists
            let user = await User.findOne({ email });
            if (user) {
                user.name = name;
                user.email = email;
                user.password = password;
             

                // Encrypt password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                const updatedProfile = await user.save();

                // // Return jsonwebtoken
                const payload = {
                    user: {
                        id: user.id
                    }
                }

                JWT.sign(
                    payload,
                    JwtSecret,
                    { expiresIn: 360000 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token })
                    }
                );

                if (updatedProfile) {
                    return res.status(200).send({ message: 'Profile Updated', data: updatedProfile });
                }
            }

            // await user.save();

        } catch (error) {
            console.error(error.message);
            res.status(500).send('server error');
        }
    });

module.exports = router;