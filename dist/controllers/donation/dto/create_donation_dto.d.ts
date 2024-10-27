export declare class CreateDonationDto {
    productName: string;
    description: string;
    category: string;
    condition: 'novo' | 'usado' | 'precisa de reparos';
    quantity: number;
    image: string[];
    numberShoes: number;
    tamanhos: 'PP' | 'P' | 'M' | 'G' | 'GG';
    donor: string;
}
