import { Sequelize } from "sequelize";
import "dotenv/config"

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

export const connectDB = async()=>{
    try {
  await sequelize.authenticate();
  console.log('>>> Exito en autenticacion');
  await sequelize.sync()
  console.log('>>> exito en sincronizacion')
} catch (error) {
  console.error(' >>> ! No se pudo conectar con la base de datos', error);
}
}