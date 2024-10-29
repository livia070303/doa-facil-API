import { DonationService } from '../controllers/donation/donation.service';
import { CreateDonationDto } from '../controllers/donation/dto/create_donation_dto';
import { UpdateDonationDto } from '../controllers/donation/dto/update_donation_dto';
import { ReturnDonationDto, ReturnListDonationDto } from '../controllers/donation/dto/return_donation_dto';
export declare class DonationController {
    private readonly donationService;
    constructor(donationService: DonationService);
    createDonation(createDonationDto: CreateDonationDto): Promise<ReturnDonationDto>;
    getDonationByCategory(category: string): Promise<ReturnDonationDto>;
    searchDonationByCategoryOrName(search: string): Promise<ReturnDonationDto>;
    getDonationRecents(limit: number): Promise<ReturnDonationDto>;
    getDonations(): Promise<ReturnListDonationDto>;
    getDonationById(id: string): Promise<ReturnDonationDto>;
    updateDonation(id: string, updateDonationDto: UpdateDonationDto): Promise<ReturnDonationDto>;
    updateDonationStatus(id: string, status: 'available' | 'reserved' | 'received'): Promise<ReturnDonationDto>;
    deleteDonation(id: string): Promise<any>;
}
