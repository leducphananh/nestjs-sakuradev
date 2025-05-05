import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  //   don't put this here, instead use .env file
  url: 'postgresql://neondb_owner:npg_AudcZgPDl15y@ep-twilight-math-a1f4jk2r-pooler.ap-southeast-1.aws.neon.tech/realEstateDB?sslmode=require',
  port: 3306,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
