import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { md5 } from '../utils/crypto';
import { User } from '../entities/user.entity';
import { exception, success } from '../utils/result';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async userLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const target = await this.userVerify(email, password);
    if (!target) return exception.VERIFY_FAIL;
    return {
      bearToken: this.jwtService.sign({ ...target, isAdmin: false }),
    };
  }
  private async userVerify(email: string, password: string) {
    return this.userRepository.findOne({
      where: { email, password: md5(password) },
      select: ['name', 'studentId', 'email', 'id'],
    });
  }
  async adminLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    // 临时的硬编码后面再改，数据迁移太麻烦了
    const ROOT_EMAIL = 'root@bh.com';
    const ROOT_NAME = 'root';
    const ROOT_PASSWORD = 'root';
    if (email === ROOT_EMAIL && password === ROOT_PASSWORD) {
      return {
        bearToken: this.jwtService.sign({
          name: ROOT_NAME,
          email: ROOT_EMAIL,
          id: -1,
          isAdmin: true,
        }),
      };
    }
    const target = await this.adminVerify(email, password);
    if (!target) return exception.VERIFY_FAIL;
    return {
      bearToken: this.jwtService.sign({ ...target, isAdmin: true }),
    };
  }
  private async adminVerify(email: string, password: string) {
    return this.adminRepository.findOne({
      where: { email, password: md5(password) },
      select: ['name', 'email', 'id'],
    });
  }
}
