import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from 'src/schemas/chat.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name, 'main')
    private chatModel: Model<Chat>,
    @InjectModel(User.name, 'main')
    private userModel: Model<User>,
  ) {}

  async sendMessage(
    user1: string,
    user2: string,
    message: string,
  ): Promise<Chat> {
    try {
      const chatItem = await this.chatModel.findOne({
        $or: [
          { userIdFirst: user1, userIdSecond: user2 },
          { userIdSecond: user1, userIdFirst: user2 },
        ],
      });

      if (!chatItem) {
        // Create a new chat if it doesn't exist
        const newChat = new this.chatModel({
          userIdFirst: user1,
          userIdSecond: user2,
          messages: [
            {
              userSend: user1,
              ConteudoMessage: message,
              Timespam: new Date(),
            },
          ],
        });

        return await newChat.save();
      } else {
        chatItem.messages.push({
          userSend: user1,
          ConteudoMessage: message,
          Timespam: new Date(),
        });

        return await chatItem.save();
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar da mensagem: ' + error.message,
      );
    }
  }

  async getLastMessages(userId: string): Promise<any> {
    try {
      const chatItens = await this.chatModel.aggregate([
        {
          $match: {
            $or: [{ userIdFirst: userId }, { userIdSecond: userId }],
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userIdFirst',
            foreignField: 'ID',
            as: 'userFirstDetails',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userIdSecond',
            foreignField: 'ID',
            as: 'userSecondDetails',
          },
        },
        {
          $unwind: '$userFirstDetails',
        },
        {
          $unwind: '$userSecondDetails',
        },
        {
          $sort: {
            'messages.Timespam': -1,
          },
        },
        {
          $project: {
            _id: 1,
            userIdFirst: 1,
            userIdSecond: 1,
            messages: 1,
            'userFirstDetails.nomeCompleto': 1,
            'userFirstDetails.email': 1,
            'userSecondDetails.nomeCompleto': 1,
            'userSecondDetails.email': 1,
          },
        },
      ]);

      if (!chatItens || chatItens.length === 0) {
        throw new NotFoundException(
          `Não existe mensagens trocadas entre esses usuários`,
        );
      }

      if (!chatItens || chatItens.length === 0) {
        throw new NotFoundException(
          `Não existe mensagens trocadas entre esses usuários`,
        );
      }

      return chatItens;
    } catch (error) {
      throw new InternalServerErrorException('Chat error: ' + error.message);
    }
  }
}
