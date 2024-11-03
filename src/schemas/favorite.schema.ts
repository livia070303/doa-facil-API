import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema()
export class Favorite {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId; 

    @Prop({ type: Types.ObjectId, ref: 'Donation', required: true })
    donationId: Types.ObjectId; 

    @Prop({ type: Date, default: Date.now })
    addedAt: Date;
}


export const FavoriteSchema = SchemaFactory.createForClass(Favorite);