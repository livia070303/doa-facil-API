import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop()
  ID: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userIdFirst: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userIdSecond: Types.ObjectId;

  @Prop({
    type: [
      {
        userSend: { type: String, ref: 'User', required: true },
        ConteudoMessage: { type: String, required: true },
        Timespam: { type: Date, required: true },
      },
    ],
  })
  messages: [
    {
      userSend: string;
      ConteudoMessage: string;
      Timespam: Date;
    },
  ];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
