import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/userRegister.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

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
