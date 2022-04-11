import { Module } from '@nestjs/common';
import { MessageService } from '@src/message/message.service';
import { MessageResolver } from '@src/message/message.resolver';

@Module({
  imports: [],
  providers: [MessageService, MessageResolver],
  exports: [],
})

export class MessageModule {

}
