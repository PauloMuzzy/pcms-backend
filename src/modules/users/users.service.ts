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
import { FindUsersQueryModel } from 'src/modules/users/model/find-user-query.model';

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
    const password = this.generatePassword();
    console.log('password', password);
    const password_hash = await this.generateHashPassword(password);
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
          (uuid, name, last_name, email, cpf, access_type_id, date_of_birth, password_hash)
      VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?)`;

    return await this.databaseService.query(SQL, [
      uuid,
      body.name,
      body.last_name,
      body.email,
      body.cpf,
      body.access_type_id,
      body.date_of_birth,
      password_hash,
    ]);
  }

  async find(query: FindUsersRequestDto): Promise<FindUsersResponseDto[]> {
    const where = [];
    const queryParams = [];

    const {
      uuid,
      name,
      cpf,
      email,
      accessTypeId,
      active,
      sortField,
      sortDirection,
      page,
      itemsPerPage,
    } = new FindUsersQueryModel(query);

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

    if (accessTypeId) {
      where.push(`access_type_id = ?`);
      queryParams.push(accessTypeId);
    }

    if (Number(active) && Number(active) === 0) {
      where.push(`active = 0`);
    }

    if (where.length > 0) {
      SQL += ' AND ' + where.join(' AND ');
    }

    if (sortField && sortDirection) {
      SQL += ` ORDER BY ${sortField} ${sortDirection}`;
    } else {
      SQL += ' ORDER BY created_at DESC';
    }

    SQL += ` LIMIT ${(page - 1) * itemsPerPage}, ${itemsPerPage}`;

    const result = await this.databaseService.query(SQL, queryParams);
    if (result.length === 0) throw new NotFoundException('No users found');
    return result;
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
    const result = await this.databaseService.query(SQL, [uuid]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('User not removed');
    }
  }
}
