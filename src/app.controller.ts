import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthLoginDto } from './dto/request/authLogin.dto';
import { UserDto } from './dto/response/authLogin.dto';

@Controller('login')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async login(@Body() payload: AuthLoginDto): Promise<UserDto> {
    return await this.appService.login(payload);
  }
}
