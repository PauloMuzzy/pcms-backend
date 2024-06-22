import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserRequestDto } from 'src/modules/users/dto/create-user-request.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly dbService: DatabaseService,
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

  async create(params: CreateUserRequestDto) {
    const password = this.generatePassword();
    const hashedPassword = await this.hashPassword(password);

    if (true) {
      try {
        await this.sendEmail({
          to: 'paulokriger@gmail.com',
          subject: 'Cadastro Realizado com Sucesso',
          text: `Olá ${`Paulo`}! Seu cadastro foi realizado com sucesso! Sua senha é: ${password}`,
          html: `<p>Olá ${`Paulo`}! Seu cadastro foi realizado com sucesso! Sua senha é: <strong>${password}</strong></p>`,
        });
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
      }
    }
  }

  async findOnebyEmail(email: string): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
  }> {
    const SQL = `
      SELECT 
        *
      FROM 
          users
      WHERE 
          email = ?`;

    const result = await this.dbService.query(SQL, [email]);
    return result[0];
  }

  async findOne(uuid: string): Promise<any> {
    const SQL = `
      SELECT 
        *
      FROM 
          users
      WHERE 
          id = ?`;

    const result = await this.dbService.query(SQL, [uuid]);
    return result[0];
  }
}
