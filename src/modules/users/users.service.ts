import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { UniqueFieldCheckerService } from 'src/common/modules/unique-field-checker/unique-field-checker.service';
import { UniqueRegisterCheckerService } from 'src/common/modules/unique-register-checker/unique-register-checker.service';
import { UuidService } from 'src/common/modules/uuid/uuid.service';
import { CreateUserRequestDto } from 'src/modules/users/dto/create-user-request.dto';
import { FindUsersRequestDto } from 'src/modules/users/dto/find-users-request.dto';
import { FindUsersResponseDto } from 'src/modules/users/dto/find-users-response.dto';
import { UpdateUserRequestDto } from 'src/modules/users/dto/update-user-request.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly uniqueFieldCheckerService: UniqueFieldCheckerService,
    private readonly uniqueRegisterCheckerService: UniqueRegisterCheckerService,
    private readonly databaseService: DatabaseService,
    private readonly uuidService: UuidService,
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

  async generateHashPassword(password: string): Promise<string> {
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
      from: 'no-reply@pcms.com',
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
    });
  }

  async findCredentials(email: string): Promise<any> {
    const SQL = `
      SELECT 
        uuid,
        password
      FROM 
        users
      WHERE 
        email = ?`;

    const result = await this.databaseService.query(SQL, [email]);
    return result[0];
  }

  async create(body: CreateUserRequestDto): Promise<void> {
    const password = this.generatePassword();
    const hashedPassword = await this.generateHashPassword(password);
    const uuid = await this.uuidService.generate();
    await this.uniqueFieldCheckerService.check({
      tableName: 'users',
      fields: {
        cpf: body.cpf,
        email: body.email,
      },
    });

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

    const SQL = `
      INSERT INTO 
          users
          (uuid, name, lastName, email, cpf, accessTypeId, dateOfBirth, password)
      VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?)`;

    return await this.databaseService.query(SQL, [
      uuid,
      body.name,
      body.lastName,
      body.email,
      body.cpf,
      body.accessTypeId,
      body.dateOfBirth,
      hashedPassword,
    ]);
  }

  async find(query: FindUsersRequestDto): Promise<FindUsersResponseDto[]> {
    const where = [];
    const queryParams = [];
    const itemsPerPage = Number(query.itemsPerPage) || 10;
    const pageNumber = Number(query.page) || 1;
    const offset = (pageNumber - 1) * itemsPerPage;

    let SQL = `
    SELECT 
      uuid,
      name,
      lastName,
      email,
      accessTypeId,
      dateOfBirth,
      createdAt,
      updatedAt,
      active
    FROM 
      users
    WHERE 1=1
    `;

    if (query.uuid) {
      where.push(`uuid = ?`);
      queryParams.push(query.uuid);
    }

    if (query.name) {
      where.push(`name LIKE ?`);
      queryParams.push(`%${query.name}%`);
    }

    if (query.cpf) {
      where.push(`cpf = ?`);
      queryParams.push(query.cpf);
    }

    if (query.email) {
      where.push(`email = ?`);
      queryParams.push(query.email);
    }

    if (query.accessTypeId) {
      where.push(`accessTypeId = ?`);
      queryParams.push(query.accessTypeId);
    }

    if (query.active && query.active === '0') {
      where.push(`active = 0`);
    }

    if (where.length > 0) {
      SQL += ' AND ' + where.join(' AND ');
    }

    if (query.sortField && query.sortDirection) {
      SQL += ` ORDER BY ${query.sortField} ${query.sortDirection}`;
    } else {
      SQL += ' ORDER BY CreatedAt DESC';
    }

    SQL += ` LIMIT ${offset}, ${itemsPerPage}`;

    return await this.databaseService.query(SQL, queryParams);
  }

  async edit(body: UpdateUserRequestDto): Promise<void> {
    await this.uniqueRegisterCheckerService.check('users', body.uuid);
    await this.uniqueFieldCheckerService.check({
      tableName: 'users',
      fields: {
        cpf: body.cpf,
        email: body.email,
      },
      uuid: body.uuid,
    });

    const updates = [];
    const params = [];

    for (const [key, value] of Object.entries(body)) {
      if (key !== 'uuid' && value !== undefined) {
        updates.push(`${key} = ?`);
        params.push(value);
      }
    }

    params.push(body.uuid);

    const SQL = `
      UPDATE users
      SET ${updates.join(', ')}
      WHERE uuid = ?
      LIMIT 1;
    `;

    const result = await this.databaseService.query(SQL, params);

    if (result.changedRows === 0) {
      throw new NotFoundException('User not changed');
    }
  }

  async remove(uuid: string): Promise<void> {
    await this.uniqueRegisterCheckerService.check('users', uuid);
    const SQL = `
      DELETE FROM 
        users
      WHERE 
        uuid = ?
      LIMIT 1 `;
    return await this.databaseService.query(SQL, [uuid]);
  }
}
