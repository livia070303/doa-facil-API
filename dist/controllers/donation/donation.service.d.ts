import { Model } from 'mongoose';
import { Donation } from '../../schemas/donation.schema';
import { CreateDonationDto } from '../donation/dto/create_donation_dto';
import { UpdateDonationDto } from '../donation/dto/update_donation_dto';
import { User } from 'src/schemas/user.schema';
export declare class DonationService {
    private donationModel;
    private userModel;
    constructor(donationModel: Model<Donation>, userModel: Model<User>);
    createDonation(createDonationDto: CreateDonationDto): Promise<Donation>;
    getDonations(): Promise<Donation[]>;
    getDonationRecents(limit: number): Promise<Donation[]>;
    getDonationsByUser(donorId: string): Promise<Donation[]>;
    getDonationByCategory(category: string): Promise<Donation[]>;
    searchDonationByCategoryOrName(search: string): Promise<Donation[]>;
    getDonationById(id: string): Promise<Donation>;
    updateDonationById(id: string, updateDonationDto: UpdateDonationDto): Promise<Donation>;
    updateDonationStatus(id: string, status: 'available' | 'reserved' | 'received'): Promise<Donation>;
    deleteDonationById(id: string): Promise<void>;
}
