import { UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AppService } from './app.service';
import { AUTH_SERVICE, USUARIO_SERVICE } from './const/services.const';

describe('AppService', () => {
  let service: AppService;
  let authClientProxyMock: jest.Mocked<ClientProxy>;
  let usuarioClientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    authClientProxyMock = {
      send: jest.fn(),
    } as unknown as jest.Mocked<ClientProxy>;

    usuarioClientProxyMock = {
      send: jest.fn(),
    } as unknown as jest.Mocked<ClientProxy>;

    const serviceMock: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: AUTH_SERVICE, useValue: authClientProxyMock },
        { provide: USUARIO_SERVICE, useValue: usuarioClientProxyMock },
      ],
    }).compile();

    service = serviceMock.get<AppService>(AppService);
  });

  describe('login', () => {
    it('Deve retornar o usuário se for valido', async () => {
      const mockUser = {
        id: 'xxxx-xxxx-uudi-aqui',
        name: 'User name',
        email: 'user@email.com',
      };

      authClientProxyMock.send.mockReturnValue(
        of({ valid: true, user: mockUser }),
      );

      const result = await service.login({
        user: 'user@email.com',
        password: '1234',
      });

      expect(result).toEqual(mockUser);
    });

    it('Deve lançar UnauthorizedException se inválido', async () => {
      authClientProxyMock.send.mockReturnValue(
        of({ valid: false, user: null }),
      );

      await expect(
        service.login({ user: 'erro@erro.com', password: 'erroerro' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('createUser', () => {
    it('deve criar um usuário', async () => {
      const mockUser = {
        id: 'xxxx-xxxx-uudi-aqui',
        name: 'User name',
        email: 'user@email.com',
      };
      usuarioClientProxyMock.send.mockReturnValue(of(mockUser));

      const result = await service.createUser({
        email: 'user@email.com',
        name: 'User name',
        password: '1234',
      });

      expect(result).toEqual(mockUser);
    });
  });
});
