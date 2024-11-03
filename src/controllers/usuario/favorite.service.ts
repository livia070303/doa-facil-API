import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CadastroUsuarioDto,
  updateCadastroUsuarioDto,
} from './dto/cadastro_usuario_dto';
import { User } from 'src/schemas/user.schema';
import { randomUUID } from 'crypto';
import { Favorite } from 'src/schemas/favorite.schema';
import { Donation } from 'src/schemas/donation.schema';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name, 'main')
    private favoriteModel: Model<Favorite>,
    @InjectModel(Donation.name, 'main')
    private donationModel: Model<Donation>,
    @InjectModel(User.name, 'main')
    private userModel: Model<User>,
  ) {}

  async create(userId: string, donationId: string) {
    const model = new Favorite();

    const donation = await this.donationModel.findById(donationId ).exec();

    if (!donation) {
      throw new NotFoundException(
        `A doação ${donationId} não está mais cadastrada `,
      );
    }

    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`O usuário ${userId} não foi encontrado `);
    }

    model.donationId = donation.id;
    model.userId = user.id;
    return this.favoriteModel.create(model);
  }

  async getAllFavorites(userId: string): Promise<Favorite> {
    const user = await this.favoriteModel.findOne({
      userId: userId,
    });

    return user;
  }


  async delete(userId: string, donationId: string): Promise<void> {
    const donation = await this.donationModel.findById(donationId ).exec();

    if (!donation) {
      throw new NotFoundException(
        `A doação ${donationId} não está mais cadastrada `,
      );
    }

    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`O usuário ${userId} não foi encontrado `);
    }

    await this.favoriteModel.findOneAndDelete({ userId : user.id, donationId: donation.id });
  }
}
