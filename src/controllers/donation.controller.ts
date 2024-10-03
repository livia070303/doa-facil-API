import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { DonationService } from '../controllers/donation/donation.service';
import { CreateDonationDto } from '../controllers/donation/dto/create_donation_dto';
import { UpdateDonationDto } from '../controllers/donation/dto/update_donation_dto';
import { ReturnDonationDto, ReturnListDonationDto } from '../controllers/donation/dto/return_donation_dto';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async createDonation(
    @Body() createDonationDto: CreateDonationDto,
  ): Promise<ReturnDonationDto> {
    const donation = await this.donationService.createDonation(createDonationDto);
    return {
      donation,
      message: 'Doação criada com sucesso',
    };
  }

  @Get()
  async getDonations(): Promise<ReturnListDonationDto> {
    const donations = await this.donationService.getDonations();
    return {
      donations,
      message: 'Lista de doações recuperada com sucesso',
    };
  }

  @Get(':id')
  async getDonationById(@Param('id') id: string): Promise<ReturnDonationDto> {
    const donation = await this.donationService.getDonationById(id);
    return {
      donation,
      message: 'Doação recuperada com sucesso',
    };
  }

  @Put(':id')
  async updateDonation(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ): Promise<ReturnDonationDto> {
    const updatedDonation = await this.donationService.updateDonationById(id, updateDonationDto);
    return {
      donation: updatedDonation,
      message: 'Doação atualizada com sucesso',
    };
  }

  @Patch(':id/status')
  async updateDonationStatus(
    @Param('id') id: string,
    @Body('status') status: 'available' | 'reserved' | 'received',
  ): Promise<ReturnDonationDto> {
    const updatedDonation = await this.donationService.updateDonationStatus(id, status);
    return {
      donation: updatedDonation,
      message: 'Status da doação atualizado com sucesso',
    };
  }

  @Delete(':id')
  async deleteDonation(@Param('id') id: string): Promise<any> {
    await this.donationService.deleteDonationById(id);
    return {
      message: 'Doação excluída com sucesso',
    };
  }
}
