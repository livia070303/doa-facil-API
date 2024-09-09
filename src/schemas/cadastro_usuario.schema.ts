import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<CadastroUsuario>;

@Schema()
export class CadastroUsuario {
  @Prop()
  ID: number;

  @Prop()
  nomeCompleto: string;

  @Prop()
  CPF: number;

  @Prop()
  telefone: number;

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

}

export const CadastroUsuarioSchema = SchemaFactory.createForClass(CadastroUsuario);