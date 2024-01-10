import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  async getUsers() {
    return prisma.user.findMany();
  }

  @Post('users')
  createUser(@Body('id') id: number) {
    return prisma.user.create({
      data: {
        id,
      },
    });
  }
}
