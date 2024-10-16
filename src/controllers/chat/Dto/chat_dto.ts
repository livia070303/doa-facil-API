import { IsNotEmpty, IsString } from 'class-validator';

export class ChatDto {
  @IsNotEmpty()
  @IsString()
  userIdFirst: string; 
  @IsString()
  userIdSecond: string; 
}