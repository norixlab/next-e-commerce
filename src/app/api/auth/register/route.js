import UserModel from '@/backend/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connect } from '@/backend/config/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
	await connect();
    try {
        const { username, email, password } = await req.json();

        const user = await UserModel.findOne({ email });
        if (user) {
            return NextResponse.json({ error: 'This user is already registered' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            username,
            email,
            password: hash,
        });

        const newUser = await doc.save();

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.TOKEN_SECRET,
            { 
				expiresIn: '1d' 
			},
        );
		const { password: passwordHash, ...userData } = newUser._doc;
		return NextResponse.json(
            {
                message: 'User successfully registered',
                success: true,
                newUser: userData,
                token,
            },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
