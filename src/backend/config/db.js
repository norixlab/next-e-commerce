import mongoose from 'mongoose';

export const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('DB CONNECTED');
        });

        connection.on('disconnected', () => {
            console.log('DB DISCONNECTED');
        });

        connection.on('error', (err) => {
            console.error('DB ERROR', err);
            
        });
    } catch (error) {
		console.error('DB ERROR', error);
	}
};
