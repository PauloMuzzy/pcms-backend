import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Psychologist } from '@modules/psychologists/entities/psychologist.entity';
import { SessionReport } from '@modules/session-reports/entities/session-report.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  psychologist_id: string;

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.tags)
  @JoinColumn({ name: 'psychologist_id' })
  psychologist: Psychologist;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string; // "TCC", "Mindfulness", "EMDR", "Psicanálise", etc.

  @Column({ type: 'varchar', length: 7, nullable: true })
  color: string; // Hex color: #FF5733

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToMany(() => SessionReport, (report) => report.tags)
  session_reports: SessionReport[];
}
