import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userSend: string;

  @Prop({ type: Types.ObjectId, refPath: 'Chat.ID', required: true })
  IdChat: Types.ObjectId;

  @Prop()
  ConteudoMessage: string;

  @Prop()
  Timespam: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
