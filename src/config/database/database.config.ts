import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AdditionalInformation } from 'src/modules/aditional-informations/entities/aditional-informations.entity';
import { Gender } from 'src/modules/patients/entities/gender.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';
import { User } from 'src/modules/users/entities/user.entity';
require('dotenv').config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Patient, Gender, AdditionalInformation],
  synchronize: true,
};
