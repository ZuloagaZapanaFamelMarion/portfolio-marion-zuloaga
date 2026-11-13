import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './contact-message.entity';
import { CreateContactMessageDto } from './create-contact-message.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly messagesRepository: Repository<ContactMessage>,
  ) {}

  async create(payload: CreateContactMessageDto): Promise<{ id: string }> {
    const message = this.messagesRepository.create(payload);
    const savedMessage = await this.messagesRepository.save(message);

    return { id: savedMessage.id };
  }
}
