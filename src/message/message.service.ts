import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '@src/entities';
import { Repository } from 'typeorm';
import { ExternalApiService } from '@src/externalApi/externalApi.service';
import { MessageInput, MessageReplyInput } from '@src/message/input/message.input';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private readonly externalApi: ExternalApiService,
  ) {
  }

  async createMessage(data: MessageInput) {
    await this.messageRepository
      .createQueryBuilder('message')
      .insert()
      .into(Message)
      .values({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        content: data.content,
      })
      .execute();

    const smsData = {
      name: data.name,
      content: data.content,
    };
    await this.externalApi.sendSMS(smsData);
  }


  async getMessage() {
    const data = await this.messageRepository
      .createQueryBuilder('message')
      .getMany();

    return data;
  }

  async replyMessage(data: MessageReplyInput) {
    await this.externalApi.sendMail(data);
    return 'success';
  }
}

