export declare class UpdateDonationDto {
    productName?: string;
    description?: string;
    category?: string;
    condition?: 'novo' | 'usado' | 'precisa de reparos';
    quantity?: number;
    location?: {
        latitude: number;
        longitude: number;
    };
    status?: 'available' | 'reserved' | 'received';
}
