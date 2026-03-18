import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Demand } from '@modules/demands/entities/demand.entity';
import { SessionReport } from '@modules/session-reports/entities/session-report.entity';
import { Tag } from '@modules/tags/entities/tag.entity';

@Entity('psychologists')
export class Psychologist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string; // Hashed with bcrypt

  @Column({ type: 'varchar', length: 14, unique: true, nullable: false })
  cpf: string; // 000.000.000-00

  @Column({ type: 'varchar', length: 10, unique: true, nullable: true })
  crp: string; // 01/12345 (Registro profissional)

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string; // (11) 98888-8888

  @Column({ type: 'date', nullable: false })
  date_of_birth: Date;

  @Column({ type: 'enum', enum: ['psychologist'], default: 'psychologist' })
  role: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  email_verified_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date; // Soft delete

  // Relationships
  @OneToMany(() => Demand, (demand) => demand.psychologist)
  demands: Demand[];

  @OneToMany(() => SessionReport, (report) => report.created_by_psychologist)
  session_reports: SessionReport[];

  @OneToMany(() => Tag, (tag) => tag.psychologist)
  tags: Tag[];
}
