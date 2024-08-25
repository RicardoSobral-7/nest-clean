import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcryptjs";

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  // a baixo para pegarmos o body usamos o decorator, colocamos a variavel body e a tipagem
  async handle(@Body() body: any) {
    const { name, email, password } = body;

    // no tsconfig colocamos uma propriedade a mais para ajudar no typescript chama strict pra true e strictNullChecks pra true que agora faz o null ser um valor valido
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      // temos varias Exceptions vindas do nest para utilziar
      throw new ConflictException(
        "User with same e-mail address already exists"
      );
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
