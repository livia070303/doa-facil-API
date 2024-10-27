import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DonationDocument = HydratedDocument<Donation>;

@Schema()
export class Donation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  donor: Types.ObjectId; 

  @Prop({ required: true })
  productName: string;  

  @Prop({ required: true })
  description: string;  

  @Prop({ required: true })
  category: string; 

  @Prop({ enum: ['novo', 'usado', 'precisa de reparos'], required: true })
  condition: 'novo' | 'usado' | 'precisa de reparos';  

  @Prop({ required: true })
  quantity: number;  

  @Prop({ required: true })
  numberShoes: number;

  @Prop({ enum: ['PP', 'P', 'M', 'G', 'GG'] })
  tamanhos: 'PP'| 'P'| 'M'| 'G'| 'GG';

  @Prop({ enum: ['available', 'reserved', 'received'], default: 'available' })
  status: 'available' | 'reserved' | 'received';  

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  receiver?: Types.ObjectId | null;  

  @Prop()
  image : string[];

  @Prop({ default: Date.now })
  createdAt: Date;  

  @Prop({ default: Date.now })
  updatedAt: Date;  
}

export const DonationSchema = SchemaFactory.createForClass(Donation);

DonationSchema.pre<Donation>('save', function (next) {
  this.updatedAt = new Date();
  next();
});
