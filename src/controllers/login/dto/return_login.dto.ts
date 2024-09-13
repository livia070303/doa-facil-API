import { User } from "src/schemas/user.schema";

export class ReturnLoginDto {
    dados: User;
    message: string;
  }