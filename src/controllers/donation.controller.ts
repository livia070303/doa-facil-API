import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { DonationService } from '../controllers/donation/donation.service';
import { CreateDonationDto } from '../controllers/donation/dto/create_donation_dto';
import { UpdateDonationDto } from '../controllers/donation/dto/update_donation_dto';
import {
  ReturnDonationDto,
  ReturnListDonationDto,
} from '../controllers/donation/dto/return_donation_dto';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async createDonation(
    @Body() createDonationDto: CreateDonationDto,
  ): Promise<ReturnDonationDto> {
    const donations =
      await this.donationService.createDonation(createDonationDto);
    return {
      donations,
      message: 'Doação criada com sucesso',
    };
  }

  @Get('category')
  async getDonationByCategory(
    @Query('category') category: string,
  ): Promise<ReturnDonationDto> {
    const donations =
      await this.donationService.getDonationByCategory(category);
    return {
      donations,
      message: 'Busca de Doação por categoria realizada com sucesso',
    };
  }

  @Get('search')
  async searchDonationByCategoryOrName(
    @Query('search') search: string,
  ): Promise<ReturnDonationDto> {
    const donations =
      await this.donationService.searchDonationByCategoryOrName(search);
    return {
      donations,
      message: 'Busca de Doação realizada com sucesso',
    };
  }

  @Get('recents')
  async getDonationRecents(
    @Query('limit') limit: number,
  ): Promise<ReturnDonationDto> {
    const donations = await this.donationService.getDonationRecents(limit);
    return {
      donations,
      message: 'Busca de Doação realizada com sucesso',
    };
  }

  @Get('donor/:donorId')
  async getDonationsByDonor(
    @Param('donorId') donorId: string,
  ): Promise<ReturnDonationDto> {
    const donations = await this.donationService.getDonationsByUser(donorId);
    return {
      donations,
      message: 'Busca de doações do doador realizada com sucesso',
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
    const donations = await this.donationService.getDonationById(id);
    return {
      donations,
      message: 'Doação recuperada com sucesso',
    };
  }

  @Put(':id')
  async updateDonation(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ): Promise<ReturnDonationDto> {
    const updatedDonation = await this.donationService.updateDonationById(
      id,
      updateDonationDto,
    );
    return {
      donations: updatedDonation,
      message: 'Doação atualizada com sucesso',
    };
  }

  @Patch(':id/status')
  async updateDonationStatus(
    @Param('id') id: string,
    @Body('status') status: 'available' | 'reserved' | 'received',
  ): Promise<ReturnDonationDto> {
    const updatedDonation = await this.donationService.updateDonationStatus(
      id,
      status,
    );
    return {
      donations: updatedDonation,
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
