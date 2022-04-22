import { Module } from '@nestjs/common';
import { MessageService } from '@src/message/message.service';
import { MessageResolver } from '@src/message/message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '@src/entities/Message';
import { ExternalApiModule } from '@src/externalApi/externalApi.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    ExternalApiModule,
  ],
  providers: [
    MessageService,
    MessageResolver,
  ],
  exports: [],
})

export class MessageModule {

}
