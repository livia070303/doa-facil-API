import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Favorite } from 'src/schemas/favorite.schema';
import { Donation } from 'src/schemas/donation.schema';
export declare class FavoriteService {
    private favoriteModel;
    private donationModel;
    private userModel;
    constructor(favoriteModel: Model<Favorite>, donationModel: Model<Donation>, userModel: Model<User>);
    create(userId: string, donationId: string): Promise<import("mongoose").Document<unknown, {}, Favorite> & Favorite & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllFavorites(userId: string): Promise<Favorite>;
    delete(userId: string, donationId: string): Promise<void>;
}
