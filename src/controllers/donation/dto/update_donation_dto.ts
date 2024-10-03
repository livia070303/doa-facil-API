import { IsOptional, IsString, IsNumber, IsEnum, IsObject } from 'class-validator';

export class UpdateDonationDto {
  @IsOptional()
  @IsString()
  productName?: string;  

  @IsOptional()
  @IsString()
  description?: string;  
  @IsOptional()
  @IsString()
  category?: string;  

  @IsOptional()
  @IsEnum(['novo', 'usado', 'precisa de reparos'])
  condition?: 'novo' | 'usado' | 'precisa de reparos';  

  @IsOptional()
  @IsNumber()
  quantity?: number;  

  @IsOptional()
  @IsObject()
  location?: { latitude: number; longitude: number };  

  @IsOptional()
  @IsString()
  status?: 'available' | 'reserved' | 'received';  
}