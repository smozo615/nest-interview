import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginHandler } from './login.handler';
import { LoginQuery } from './login.query';
import { UserRepository } from '../../../domain/user.repository';
import { InjectionToken } from '../../constants';
import { LoginResponseDto } from '../../../interface/dtos/response';

describe('LoginHandler', () => {
  let handler: LoginHandler;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginHandler,
        {
          provide: InjectionToken.USER_REPOSITORY,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<LoginHandler>(LoginHandler);
    userRepository = module.get<UserRepository>(InjectionToken.USER_REPOSITORY);
  });

  it('should throw NotFoundException if user is not found', async () => {
    const query: LoginQuery = { email: 'test@test.co', password: 'password' };

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    const query: LoginQuery = { email: 'test@test.co', password: 'password' };

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({
      isPasswordValid: jest.fn().mockReturnValueOnce(false),
      generateToken: jest.fn(),
      loginSuccess: jest.fn(),
      commit: jest.fn(),
    });

    await expect(handler.execute(query)).rejects.toThrow(UnauthorizedException);
  });

  it('should generate token and return it if login is successful', async () => {
    const query: LoginQuery = { email: 'test@test.co', password: 'password' };
    const token = 'generated-token';

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({
      isPasswordValid: jest.fn().mockReturnValueOnce(true),
      generateToken: jest.fn().mockResolvedValueOnce(token),
      loginSuccess: jest.fn(),
      commit: jest.fn(),
    });

    const result: LoginResponseDto = await handler.execute(query);

    expect(result.token).toBe(token);
  });
});
