import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthLoginDto, UserCreate } from './dto/request/authLogin.dto';
import { ResponseLoginDto, UserDto } from './dto/response/authLogin.dto';

@ApiTags('login')
@Controller('login')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Retorna os dados do usuário caso o login tenha dado sucesso',
    type: ResponseLoginDto,
  })
  async login(@Body() payload: AuthLoginDto): Promise<ResponseLoginDto> {
    return await this.appService.login(payload);
  }

  @Post('create')
  async createUserLogin(@Body() body: UserCreate): Promise<UserDto | void> {
    return await this.appService.createUser(body);
  }
}
