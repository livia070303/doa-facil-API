import { HydratedDocument, Types } from 'mongoose';
export type FavoriteDocument = HydratedDocument<Favorite>;
export declare class Favorite {
    userId: Types.ObjectId;
    donationId: Types.ObjectId;
    addedAt: Date;
}
export declare const FavoriteSchema: import("mongoose").Schema<Favorite, import("mongoose").Model<Favorite, any, any, any, import("mongoose").Document<unknown, any, Favorite> & Favorite & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Favorite, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Favorite>> & import("mongoose").FlatRecord<Favorite> & {
    _id: Types.ObjectId;
}>;
