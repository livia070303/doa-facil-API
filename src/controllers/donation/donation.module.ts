import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationService } from './donation.service';
import { DonationController } from '../donation.controller';
// import { AutenticacaoController } from '../autenticacao.controller';
import { Donation, DonationSchema } from 'src/schemas/donation.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Donation.name, schema: DonationSchema }, { name: User.name, schema: UserSchema }],
      'main',
    ),
  ],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService],
})
export class DonationModule {}