export default ()=>({
    environment:process.env.NODE_ENV||'development',
    database:{
        type: 'postgres',
        host:process.env.DATABASE_HOST,
        port:parseInt(process.env.DATABASE_PORT,10)||5432,
        username: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        autoLoadEntities: true,
        synchronize: false,
    }
});