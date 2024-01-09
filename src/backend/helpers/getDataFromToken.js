import {NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';
import { connect } from '../config/db';

export async function getDataFromToken(req){
	await connect()
	try {
		const token = await req.cookies.get('token')?.value || '';

		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

		return decoded.id
	} catch (error) {
		return NextResponse.json({error: error.message},{status:500})
	}
}