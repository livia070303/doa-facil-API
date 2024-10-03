import { IsNotEmpty, IsString, IsNumber, IsEnum, IsObject } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
  productName: string; 
  @IsString()
  description: string;  

  @IsNotEmpty()
  @IsString()
  category: string;  

  @IsNotEmpty()
  @IsEnum(['novo', 'usado', 'precisa de reparos'])
  condition: 'novo' | 'usado' | 'precisa de reparos';  

  @IsNotEmpty()
  @IsNumber()
  quantity: number;  

  // @IsNotEmpty()
  // @IsObject()
  // location: { latitude: number; longitude: number }; 
  
  @IsString()
  image: string; 

  @IsNotEmpty()
  @IsString()
  donor: string; 
}