import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from '../usuario.controller';
import { AutenticacaoController } from '../autenticacao.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthorizerController } from '../autorizacao.controller';
import { FavoriteService } from './favorite.service';
import { Favorite, FavoriteSchema } from 'src/schemas/favorite.schema';
import { Donation, DonationSchema } from 'src/schemas/donation.schema';
import { LogoutController } from '../logout.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: Favorite.name, schema: FavoriteSchema },
        { name: Donation.name, schema: DonationSchema },
      ],
      'main',
    ),
  ],
  controllers: [
    UsuarioController,
    AutenticacaoController,
    AuthorizerController,
    LogoutController,
  ],
  providers: [UsuarioService, FavoriteService],
  exports: [UsuarioService, FavoriteService],
})
export class UsuarioModule {}
