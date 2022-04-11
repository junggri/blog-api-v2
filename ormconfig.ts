import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

const connectionOption: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrationsRun: process.env.TYPEORM_RUN_MIGRATION === 'ture',
  dropSchema: process.env.TYPEORM_DROP_SCHEMA === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [path.join(__dirname, process.env.TYPEORM_ENTITY)],
  migrations: [path.join(__dirname, process.env.TYPEORM_MIGRATION)],
  cli: {
    entitiesDir: 'entities',
    migrationsDir: 'migrations',
  },
};

export = connectionOption;
