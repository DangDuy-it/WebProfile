import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: sql.config={
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: true,
    },
    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

export const sqlConnection = async () => {
    try{
        const pool = await sql.connect(dbConfig);
        console.log('Connected to SQL Server');
        return pool;
    } catch (error) {
        console.error('SQL Connection Error: ', error);
        throw error;
    }
}

export const getRequest = async () => {
    const pool = await sqlConnection();
    return pool.request();
}
