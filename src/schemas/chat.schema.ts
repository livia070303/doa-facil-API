import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
    // @Prop()
    // ID: number; 

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userIdFirst: Types.ObjectId; 

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userIdSecond: Types.ObjectId; 
}

export const ChatSchema = SchemaFactory.createForClass(Chat);