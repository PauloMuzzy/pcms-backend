import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { UniqueFieldCheckerService } from 'src/common/modules/unique-field-checker/unique-field-checker.service';
import { UniqueRegisterCheckerService } from 'src/common/modules/unique-register-checker/unique-register-checker.service';
import { UuidService } from 'src/common/modules/uuid/uuid.service';
import { CreateUserRequestDto } from 'src/modules/users/dto/create-user-request.dto';
import { EditUserRequestDto } from 'src/modules/users/dto/edit-user-request.dto';
import { FindUsersRequestDto } from 'src/modules/users/dto/find-users-request.dto';
import { FindUsersResponseDto } from 'src/modules/users/dto/find-users-response.dto';
import { RemoveUserRequestDto } from 'src/modules/users/dto/remove-user-request.dto';

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
    const password_hash = await bcrypt.hash(password, this.saltRounds);
    return password_hash;
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
        password_hash
      FROM 
        users
      WHERE 
        email = ?`;

    const result = await this.databaseService.query(SQL, [email]);
    return result[0];
  }

  async create(body: CreateUserRequestDto): Promise<void> {
    const { cpf, email } = body;
    const password = this.generatePassword();
    const password_hash = await this.generateHashPassword(password);
    const uuid = await this.uuidService.generate();
    await this.uniqueFieldCheckerService.check({
      tableName: 'users',
      fields: {
        cpf,
        email,
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
          (uuid, name, last_name, email, cpf, access_type_id, date_of_birth, password_hash)
      VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?)`;

    return await this.databaseService.query(SQL, [
      uuid,
      ...Object.values(body),
      password_hash,
    ]);
  }

  async find(query: FindUsersRequestDto): Promise<FindUsersResponseDto[]> {
    const {
      uuid,
      name,
      cpf,
      email,
      access_type_id,
      active,
      sort_field,
      sort_direction,
      page,
      items_per_page,
    } = query;
    const where = [];
    const queryParams = [];
    const offset = (Number(page) - 1) * Number(items_per_page) || 0;
    const limit = Number(items_per_page) || 10;

    let SQL = `
    SELECT 
      uuid,
      name,
      last_name,
      email,
      access_type_id,
      date_of_birth,
      created_at,
      updated_at,
      active
    FROM 
      users
    WHERE 1=1
  `;

    if (uuid) {
      where.push(`uuid = ?`);
      queryParams.push(uuid);
    }

    if (name) {
      where.push(`name LIKE ?`);
      queryParams.push(`%${name}%`);
    }

    if (cpf) {
      where.push(`cpf = ?`);
      queryParams.push(cpf);
    }

    if (email) {
      where.push(`email = ?`);
      queryParams.push(email);
    }

    if (access_type_id) {
      where.push(`access_type_id = ?`);
      queryParams.push(access_type_id);
    }

    if (Number(active) && Number(active) === 0) {
      where.push(`active = 0`);
    }

    if (where.length > 0) {
      SQL += ' AND ' + where.join(' AND ');
    }

    if (sort_field && sort_direction) {
      SQL += ` ORDER BY ${sort_field} ${sort_direction}`;
    } else {
      SQL += ' ORDER BY created_at DESC';
    }

    SQL += ` LIMIT ${offset}, ${limit}`;

    const result = await this.databaseService.query(SQL, queryParams);
    if (result.length === 0) throw new NotFoundException('No users found');
    return result;
  }

  async edit(body: EditUserRequestDto): Promise<void> {
    const { uuid, cpf, email } = body;
    await this.uniqueRegisterCheckerService.check('users', uuid);
    await this.uniqueFieldCheckerService.check({
      tableName: 'users',
      fields: {
        cpf,
        email,
      },
      uuid,
    });

    const updates = [];
    const params = [];

    for (const [key, value] of Object.entries(body)) {
      if (key !== 'uuid' && value !== undefined) {
        updates.push(`${key} = ?`);
        params.push(value);
      }
    }

    params.push(uuid);

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

  async remove(param: RemoveUserRequestDto): Promise<void> {
    const { uuid } = param;
    await this.uniqueRegisterCheckerService.check('users', uuid);
    const SQL = `
      DELETE FROM 
        users
      WHERE 
        uuid = ?
      LIMIT 1 `;
    const result = await this.databaseService.query(SQL, [uuid]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('User not removed');
    }
  }
}
