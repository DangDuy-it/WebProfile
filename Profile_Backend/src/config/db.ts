import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to SQL Server via Prisma');
    } catch (error) {
        console.error('Prisma Connection Error: ', error);
        process.exit(1);
    }
}

export default prisma;
