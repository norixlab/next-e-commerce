import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '@/backend/models/User'
import { NextResponse } from 'next/server';
import { connect } from '@/backend/config/db';

export async function POST(req){
	await connect();
	try {
		const {email, password} = await req.json();

		const user = await UserModel.findOne({email})
		
		if(!user){
			return NextResponse.json({error: 'User not found'}, {status: 404})
		}

		const isValidPass = await bcrypt.compare(password, user.password);
		if(!isValidPass){
			return NextResponse.json({ error: 'Wrong login or password' },{status: 400});
		}

		const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.TOKEN_SECRET,
        {
			expiresIn: '1d'
		});
		const {password: passwordHash, ...userData} = user._doc;
		
		const response = NextResponse.json({
			message: 'Login successful',
			success: true,
			userData,
			token
		},{status: 200});

		response.cookies.set('token', token,{httpOnly:true})

		return response;
	} catch (error) {
		return NextResponse.json({error: message.error},{status: 500})
	}
}