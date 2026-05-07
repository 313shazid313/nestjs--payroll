import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/userLogin.dto';
import { RegisterUserDto } from './dtos/userRegister.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async login(userLoginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: userLoginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      payload,
    };
  }

  public async registerUser(userDto: RegisterUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (user) {
      return 'the user with this email already exists';
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    let newUser = this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    newUser = await this.userRepository.save(newUser);

    return newUser;
  }
}
