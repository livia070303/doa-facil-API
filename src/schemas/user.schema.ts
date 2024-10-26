import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  ID: string;

  @Prop()
  nomeCompleto: string;

  @Prop()
  CPF: string;

  @Prop()
  telefone: string;

  @Prop()
  email: string;

  @Prop()
  CEP: string;

  @Prop()
  estado: string;

  @Prop()
  rua: string;

  @Prop()
  cidade: string;

  @Prop()
  senha: string;

  @Prop()
  identity: string;

  @Prop()
  orders: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);