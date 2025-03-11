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
      if (user1 === user2) {
        throw new Error('User cannot send a message to themselves.');
      }

      const [firstUser, secondUser] =
        user1 < user2 ? [user1, user2] : [user2, user1];

      let chatItem = await this.chatModel.findOne({
        $or: [
          { userIdFirst: firstUser, userIdSecond: secondUser },
          { userIdFirst: secondUser, userIdSecond: firstUser },
        ],
      });

      if (!chatItem) {
        chatItem = new this.chatModel({
          userIdFirst: firstUser,
          userIdSecond: secondUser,
          messages: [
            {
              userSend: user1,
              ConteudoMessage: message,
              Timespam: new Date(),
            },
          ],
        });
        return await chatItem.save();
      } else {
        const lastMessage = chatItem.messages[chatItem.messages.length - 1];

        if (
          lastMessage &&
          lastMessage.userSend === user1 &&
          lastMessage.ConteudoMessage === message
        ) {
          throw new Error('Duplicate message detected.');
        }

        chatItem.messages.push({
          userSend: user1,
          ConteudoMessage: message,
          Timespam: new Date(),
        });

        return await chatItem.save();
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar/enviar a mensagem: ' + error.message,
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
