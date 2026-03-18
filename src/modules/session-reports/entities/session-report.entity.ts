import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Demand } from '@modules/demands/entities/demand.entity';
import { Psychologist } from '@modules/psychologists/entities/psychologist.entity';
import { Tag } from '@modules/tags/entities/tag.entity';

@Entity('session_reports')
export class SessionReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relationships
  @Column({ type: 'uuid', nullable: false })
  demand_id: string;

  @ManyToOne(() => Demand, (demand) => demand.session_reports, { eager: true })
  @JoinColumn({ name: 'demand_id' })
  demand: Demand;

  @Column({ type: 'uuid', nullable: false })
  created_by_psychologist_id: string;

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.session_reports, { eager: true })
  @JoinColumn({ name: 'created_by_psychologist_id' })
  created_by_psychologist: Psychologist;

  // Session dates
  @Column({ type: 'timestamp', nullable: false })
  session_start: Date;

  @Column({ type: 'timestamp', nullable: true })
  session_finish: Date;

  @Column({ type: 'int', nullable: true })
  duration_minutes: number; // Automatically calculated

  // Initial Assessment
  @Column({ type: 'text', nullable: true })
  initial_patient_report: string; // How patient arrived

  @Column({ type: 'varchar', length: 100, nullable: true })
  initial_feeling: string; // "Anxious", "Sad", "Calm"

  @Column({ type: 'int', nullable: true })
  initial_feeling_level: number; // 0-10

  // Session Content
  @Column({ type: 'text', nullable: false })
  session_notes: string; // Main session notes

  @Column({ type: 'text', nullable: true })
  techniques_used: string; // Applied techniques

  @Column({ type: 'varchar', length: 500, nullable: true })
  patient_mood: string; // Observed mood during session

  @Column({ type: 'text', nullable: true })
  psychologist_observations: string; // Psychologist observations

  @Column({ type: 'text', nullable: true })
  progress_notes: string; // Evolution notes

  // Final Assessment
  @Column({ type: 'varchar', length: 100, nullable: true })
  final_feeling: string; // How patient left

  @Column({ type: 'int', nullable: true })
  final_feeling_level: number; // 0-10

  @Column({ type: 'text', nullable: true })
  next_steps: string; // Planned next steps

  // Metadata
  @Column({ type: 'boolean', default: false })
  is_edited: boolean; // If edited after creation

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date; // Soft delete

  // Relationship with Tags (Many-to-Many)
  @ManyToMany(() => Tag, (tag) => tag.session_reports)
  @JoinTable({
    name: 'session_report_tags',
    joinColumn: { name: 'session_report_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
