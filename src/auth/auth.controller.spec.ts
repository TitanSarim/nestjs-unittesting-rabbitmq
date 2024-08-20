import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
          {
            provide: AuthService,
            useValue: {
              signUp: jest.fn(),
              login: jest.fn(),
            },
          },
        ],
      }).compile();
  
      authController = module.get<AuthController>(AuthController);
      authService = module.get<AuthService>(AuthService);
    });

    describe('signUp', () => {
        it('should register a user and return a token', async () => {
          const result = { token: 'jwt-token' };
          const signUpDto: SignUpDto = {name: "testing", email: "testing123@gmail.com", password: "testing123" };
    
          jest.spyOn(authService, 'signUp').mockResolvedValue(result);
    
          expect(await authController.signUp(signUpDto)).toBe(result);
        });
      });
    
      describe('login', () => {
        it('should login a user and return a token', async () => {
          const result = { token: 'jwt-token' };
          const loginDto: LoginDto = { email: "testing123@gmail.com", password: "testing123" };
    
          jest.spyOn(authService, 'login').mockResolvedValue(result);
    
          expect(await authController.login(loginDto)).toBe(result);
        });
      });

})  