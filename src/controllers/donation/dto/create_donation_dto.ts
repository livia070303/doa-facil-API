import { IsNotEmpty, IsString, IsNumber, IsEnum, IsObject, IsArray } from 'class-validator';
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
  
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  image: string[]; 

  @IsNotEmpty()
  @IsNumber()
  numberShoes: number;

  @IsNotEmpty()
  @IsEnum(['PP', 'P', 'M', 'G', 'GG'])
  tamanhos: 'PP'| 'P'| 'M'| 'G'| 'GG';

  @IsNotEmpty()
  @IsString()
  donor: string; 
}