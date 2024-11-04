import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        res.sendStatus(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    res.json({ message: 'User created' });
};

export const signin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user: IUser | null = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user.id.toString());
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.body.token;

    if (!token) {
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        const newToken = generateToken(user.id);
        res.json({ token: newToken });
    });
};
