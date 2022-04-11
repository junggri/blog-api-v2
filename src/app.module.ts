import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import depthLimit from 'graphql-depth-limit';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { GoogleModule } from '@src/google/google.module';
import { AuthModule } from '@src/auth/auth.module';
import { HitModule } from '@src/Hit/hit.module';
import { MessageModule } from '@src/message/message.module';
import { PostModule } from '@src/post/post.module';
import { UserModule } from '@src/user/user.module';
import { VisitModule } from '@src/visit/visit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      validationRules: [
        depthLimit(8),
      ],
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: true,
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot(config),
    GoogleModule,
    AuthModule,
    HitModule,
    MessageModule,
    PostModule,
    UserModule,
    VisitModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
