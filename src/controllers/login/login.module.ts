import { Module } from '@nestjs/common';
import { LoginService } from '../login/login.service';
import { LoginController } from '../login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';


@Module({
    imports: [
      MongooseModule.forFeature(
        [{ name: User.name, schema: UserSchema }],
        'main',
      ),
    ],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [LoginService],
  })
  export class LoginModule {}