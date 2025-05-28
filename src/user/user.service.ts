import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException();

    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepo.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return this.userRepo.delete(id);
  }
}
