export declare class CreateDonationDto {
    productName: string;
    description: string;
    category: string;
    condition: 'novo' | 'usado' | 'precisa de reparos';
    quantity: number;
    image: string;
    donor: string;
}
