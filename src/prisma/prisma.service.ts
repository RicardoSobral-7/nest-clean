import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ["query", "warn", "error"],
    }); // chama o construtor da classe prisma client
  }
  onModuleDestroy() {
    return this.$connect();
  }
  onModuleInit() {
    return this.$disconnect();
  }
}
