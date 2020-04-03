import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Admin } from './entities/admin.entity';
import { Book } from './entities/book.entity';
import { Comment } from './entities/comment.entity';
import { Record } from './entities/record.entity';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECTET } from './auth/auth.constant';
import { AuthController } from './auth/auth.controller';
import { AdminController } from './controllers/admin.controller';
import { BookController } from './controllers/book.controller';
import { CommentController } from './controllers/comment.controller';
import { UserController } from './controllers/user.controller';
import { AuthService } from './auth/auth.service';
import { AdminService } from './services/admin.service';
import { BookService } from './services/book.service';
import { CommentService } from './services/comment.service';
import { UserService } from './services/user.service';
import { JwtStrategy } from './auth/auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE || 'bookHandling',
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      synchronize: true,
      port: parseInt(process.env.DB_PORT || '5432'),
      entities: [Admin, Book, Comment, Record, User],
    }),
    TypeOrmModule.forFeature([Admin, Book, Comment, Record, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECTET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE || '4h' },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    AdminController,
    BookController,
    CommentController,
    UserController,
  ],
  providers: [
    AppService,
    AuthService,
    AdminService,
    BookService,
    CommentService,
    UserService,
    JwtStrategy,
  ],
})
export class AppModule {}
