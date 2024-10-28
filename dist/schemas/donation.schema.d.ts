import { HydratedDocument, Types } from 'mongoose';
export type DonationDocument = HydratedDocument<Donation>;
export declare class Donation {
    donor: Types.ObjectId;
    productName: string;
    description: string;
    category: string;
    condition: 'novo' | 'usado' | 'precisa de reparos';
    quantity: number;
    numberShoes: number;
    tamanhos: 'PP' | 'P' | 'M' | 'G' | 'GG' | '';
    status: 'available' | 'reserved' | 'received';
    receiver?: Types.ObjectId | null;
    image: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const DonationSchema: import("mongoose").Schema<Donation, import("mongoose").Model<Donation, any, any, any, import("mongoose").Document<unknown, any, Donation> & Donation & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Donation, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Donation>> & import("mongoose").FlatRecord<Donation> & {
    _id: Types.ObjectId;
}>;
