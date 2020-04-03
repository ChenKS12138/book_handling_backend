import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegistryDto } from '../dto/user.dto';
import { exception, success } from 'src/utils/result';
import { md5 } from 'src/utils/crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async registry(registryDto: RegistryDto) {
    const { email, password, studentId, username } = registryDto;
    const isEmailUsed =
      (await this.userRepository.find({ where: { email } })).length !== 0;
    if (isEmailUsed) return exception.USER_EXISED;
    const user = new User();
    user.name = username;
    user.password = md5(password);
    user.studentId = studentId;
    user.email = email;
    await this.userRepository.save(user);
    return success(true);
  }
}
