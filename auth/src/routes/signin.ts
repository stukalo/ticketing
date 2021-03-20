import express, { Request, Response } from 'express';
import {body} from 'express-validator';
import {validateRequest, BadRequestError} from "@savtickets/common";
import {User} from "../models/user";
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must provide a password'),
    validateRequest,
], async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        req.session = null;
        throw new BadRequestError('Invalid credentials');
    }

    const isPasswordMatch = await Password.compare(
        existingUser.password,
        password
    );

    if (!isPasswordMatch) {
        req.session = null;
        throw new BadRequestError('Invalid credentials');
    }

    const userJwt = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email,
        },
        process.env.JWT_KEY!,
    );

    req.session = {
        jwt: userJwt,
    };

    res.status(200).send(existingUser);
});

export { router as signinRouter };