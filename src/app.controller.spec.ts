import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appServiceMock: {
    login: jest.Mock;
    createUser: jest.Mock;
  };

  beforeEach(async () => {
    appServiceMock = {
      login: jest.fn(),
      createUser: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appServiceMock }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('login', () => {
    it('Deve retornar um usuário quando válido', async () => {
      const mockUser = {
        id: 'xxxx-xxxx-uuid',
        name: 'User name mock',
        email: 'user@mock.com.br',
      };

      appServiceMock.login.mockResolvedValue(mockUser);

      const result = await appController.login({
        password: '1234',
        user: 'user@mock.com.br',
      });

      expect(result).toEqual(mockUser);

      expect(appServiceMock.login).toHaveBeenCalledWith({
        password: '1234',
        user: 'user@mock.com.br',
      });
    });

    it('deve lançar UnauthorizedException se inválido', async () => {
      appServiceMock.login.mockRejectedValue(new UnauthorizedException());

      await expect(
        appController.login({ user: 'errado', password: 'senha' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('create', () => {
    it('deve Criar um usuário', async () => {
      const mockUser = {
        id: 'xxxx-xxxx-uuid',
        name: 'User name mock',
        email: 'user@mock.com.br',
      };

      appServiceMock.createUser.mockResolvedValue(mockUser);

      const result = await appController.createUserLogin({
        password: '1234',
        email: 'user@mock.com.br',
        name: 'user name',
      });

      expect(result).toEqual(mockUser);

      expect(appServiceMock.createUser).toHaveBeenCalledWith({
        password: '1234',
        email: 'user@mock.com.br',
        name: 'user name',
      });
    });
  });
});
