import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/userLogin.dto';
import { RegisterUserDto } from './dtos/userRegister.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //! User login endpoint
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticates user and returns JWT token',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        accessToken: 'jwt.token.here',
        user: {
          id: 1,
          email: 'user@example.com',
          roles: ['admin', 'employee'],
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  //! Register new user endpoint
  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description: 'Creates a new user account',
  })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        id: 1,
        email: 'user@example.com',
        roles: ['admin'],
        createdAt: '2026-05-10T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async registerUser(@Body() userDto: RegisterUserDto) {
    return this.authService.registerUser(userDto);
  }
}
