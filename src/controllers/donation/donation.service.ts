import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donation} from '../../schemas/donation.schema';
import { CreateDonationDto } from '../donation/dto/create_donation_dto';
import { UpdateDonationDto } from '../donation/dto/update_donation_dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation.name, 'main')
    private donationModel: Model<Donation>,
    @InjectModel(User.name, 'main')
    private userModel: Model<User>,
  ) {}

  async createDonation(createDonationDto: CreateDonationDto): Promise<Donation> {
    try {
      const newDonation = new this.donationModel(createDonationDto);

      const user =  await this.userModel.findById(createDonationDto.donor);
     
      if (!user) {
        throw new NotFoundException(`Donor inválido, precisa ser um ID de usuário valido`);
      }

      return newDonation.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar a doação: ' + error.message,
      );
    }
  }

  async getDonations(): Promise<Donation[]> {
    try {
      return this.donationModel.find().populate('donor').exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar doações: ' + error.message,
      );
    }
  }

  //Busca 4 doações recentes
  async getDonationRecents(limit : number): Promise<Donation[]> {
    try {
      const query = this.donationModel
      .find()
      .sort({ createdAt: -1 })// Ordena pela data de criação, do mais recente para o mais antigo
      .populate('donor');
  
      if (limit && limit > 0) {
        query.limit(limit); // Limita o resultado dos mais recentes
      }
      
      return query.exec();

    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar doações: ' + error.message,
      );
    }
  }

  // Buscar doação por Categoria
  async getDonationByCategory(category: string): Promise<Donation[]> {
    try {
      const donation = await this.donationModel.find({ category: category }).populate('donor').exec();
      if (!donation) {
        throw new NotFoundException(`Nenhum item com a categoria :"${category}" foi encontrada`);
      }
      return donation;

    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar doações por categoria: ' + error.message,
      );
    }
  }

  // Buscar doação por Categoria ou pelo name
  async searchDonationByCategoryOrName(search: string): Promise<Donation[]> {
    try {
      
      const searchCriteria = {
        $or: [
          { productName: { $regex: search, $options: 'i' } }, // Busca no nome do produto
          { category: { $regex: search, $options: 'i' } },   // Busca na categoria
        ],
      };

      const donation = await this.donationModel.find(searchCriteria).populate('donor').exec();
      if (!donation) {
        throw new NotFoundException(`Nenhum item foi encontrada na busca`);
      }
      return donation;

    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar doações: ' + error.message,
      );
    }
  }


  // Buscar doação por ID
  async getDonationById(id: string): Promise<Donation> {
    try {
      const donation = await this.donationModel.findById(id).populate('donor').populate('receiver').exec();
      if (!donation) {
        throw new NotFoundException(`Doação com ID "${id}" não encontrada`);
      }
      return donation;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar a doação: ' + error.message,
      );
    }
  }

  // Atualizar uma doação por ID
  async updateDonationById(id: string, updateDonationDto: UpdateDonationDto): Promise<Donation> {
    try {
      const updatedDonation = await this.donationModel
        .findByIdAndUpdate(id, updateDonationDto, { new: true })
        .exec();

      if (!updatedDonation) {
        throw new NotFoundException(`Doação com ID "${id}" não encontrada`);
      }

      return updatedDonation;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar a doação: ' + error.message,
      );
    }
  }

  // Atualizar o status da doação
  async updateDonationStatus(id: string, status: 'available' | 'reserved' | 'received'): Promise<Donation> {
    try {
      const donation =  await this.donationModel.findById(id);

      if(donation){
        donation.status = status;
        donation.save();
        return donation;
    } else {
      throw new BadRequestException('Doação não encontrada');
    }
      
      
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar o status da doação: ' + error.message,
      );
    }
  }

  async deleteDonationById(id: string): Promise<void> {
    try {
      const result = await this.donationModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Doação com ID "${id}" não encontrada`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar a doação: ' + error.message,
      );
    }
  }
}
