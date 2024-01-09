import UserModel from '@/backend/models/User';
import { getDataFromToken } from '@/backend/helpers/getDataFromToken';
import { NextResponse } from 'next/server';
import { connect } from '@/backend/config/db';

export async function GET(req){
	await connect()
	try {
		const userId = await getDataFromToken(req);
		const user = await UserModel.findOne({_id: userId}).select('-password');
		return NextResponse.json({
			success: true,
			data: user
		})
	} catch (error) {
		return NextResponse.json({error: error.message},{status:500})
	}
}
