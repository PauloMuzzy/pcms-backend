import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserRequestDto } from 'src/modules/users/dto/create-user-request.dto';
import { FindAllUsersResponseDto } from 'src/modules/users/dto/find-all-users-response.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  private saltRounds = 10;

  generatePassword(): string {
    const numbers = '0123456789';
    let password = '';
    const pick = (str: string) => {
      return str[Math.floor(Math.random() * str.length)];
    };
    for (let i = 0; i < 6; i++) {
      password += pick(numbers);
    }
    return password;
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return hashedPassword;
  }

  async sendEmail(mailOptions: {
    to: string;
    subject: string;
    text: string;
    html: string;
  }) {
    await this.mailerService.sendMail({
      to: mailOptions.to,
      from: 'noreply@nestjs.com',
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
    });
  }

  async findAll(): Promise<FindAllUsersResponseDto[]> {
    const users = await this.usersRepository.find({
      select: [
        'id',
        'name',
        'lastName',
        'email',
        'dateOfBirth',
        'active',
        'accessType',
      ],
    });

    return users.map((user) => {
      const dto = new FindAllUsersResponseDto();
      dto.id = user.id;
      dto.name = user.name;
      dto.lastName = user.lastName;
      dto.email = user.email;
      dto.dateOfBirth = user.dateOfBirth;
      dto.active = user.active;
      dto.accessType = user.accessType;
      return dto;
    });
  }

  async create(params: CreateUserRequestDto) {
    const password = this.generatePassword();
    const hashedPassword = await this.hashPassword(password);

    const user = new User();
    user.name = params.name;
    user.lastName = params.lastName;
    user.email = params.email;
    user.accessType = params.accessType;
    user.dateOfBirth = new Date(params.dateOfBirth);
    user.password = hashedPassword;
    user.active = 1;

    const savedUser = await this.usersRepository.save(user);

    if (savedUser) {
      try {
        await this.sendEmail({
          to: savedUser.email,
          subject: 'Cadastro Realizado com Sucesso',
          text: `Olá ${savedUser.name}! Seu cadastro foi realizado com sucesso! Sua senha é: ${password}`,
          html: `<p>Olá ${savedUser.name}! Seu cadastro foi realizado com sucesso! Sua senha é: <strong>${password}</strong></p>`,
        });
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
      }
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
