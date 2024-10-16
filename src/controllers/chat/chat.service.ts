import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model, ObjectId, Types } from 'mongoose';
  import { Chat } from 'src/schemas/chat.schema';
  import { Message } from 'src/schemas/message.schema';
    
  @Injectable()
  export class ChatService {
    constructor(
      @InjectModel(Chat.name, 'main')
      private chatModel: Model<Chat>,
      @InjectModel(Message.name, 'main')
      private messageModel: Model<Message>,
    ) {}
  
    async sendMessage(user1 : Types.ObjectId, user2 : Types.ObjectId, message : string): Promise<Message> {
        try {
    
          let chatItem =  await this.chatModel.findOne({
              $or: [
                { userIdFirst: user1, userIdSecond: user2 },
                { userIdSecond: user1, userIdFirst: user2}
              ]
            })
         
          if (!chatItem) {
            const newChat = new this.chatModel({
                userIdFirst: user1,
                userIdSecond: user2,
              });

          chatItem = await newChat.save();
            
          }
    
          const newMessage = new this.messageModel();

          newMessage.IdChat = chatItem.id;
          newMessage.ConteudoMessage = message;
          newMessage.userSend = user1;
  
          return newMessage.save();
          
        } catch (error) {
          throw new InternalServerErrorException(
            'Erro ao criar da mensagem: ' + error.message,
          );
        }
      }

      async GetMessage(user1 : Types.ObjectId, user2 : Types.ObjectId): Promise<Message[]> {
        try {

          let chatItem =  await this.chatModel.findOne({
              $or: [
                { userIdFirst: user1, userIdSecond: user2 },
                { userIdSecond: user1, userIdFirst: user2}
              ]
            })
          console.log(chatItem)
          if (!chatItem) {
            throw new NotFoundException(`Não existe mensagens trocadas entre esses usuários`);
          }
    
          const listaMensagens = await this.messageModel.find( { IdChat : chatItem.id});
  
          return listaMensagens
          
        } catch (error) {
          throw new InternalServerErrorException(
            'Erro ao buscar da mensagem: ' + error.message,
          );
        }
      }
  }
  