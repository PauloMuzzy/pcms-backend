import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Patient } from '@modules/patients/entities/patient.entity';
import { Psychologist } from '@modules/psychologists/entities/psychologist.entity';
import { DemandTheme } from '@modules/demand-themes/entities/demand-theme.entity';
import { SessionReport } from '@modules/session-reports/entities/session-report.entity';
import { DemandAccessRequest } from '@modules/demand-access-requests/entities/demand-access-request.entity';

@Entity('demands')
export class Demand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Main relationships
  @Column({ type: 'uuid', nullable: false })
  patient_id: string;

  @ManyToOne(() => Patient, (patient) => patient.demands, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({ type: 'uuid', nullable: false })
  psychologist_id: string;

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.demands, {
    eager: true,
  })
  @JoinColumn({ name: 'psychologist_id' })
  psychologist: Psychologist;

  @Column({ type: 'uuid', nullable: false })
  theme_id: string;

  @ManyToOne(() => DemandTheme, (theme) => theme.demands, { eager: true })
  @JoinColumn({ name: 'theme_id' })
  theme: DemandTheme;

  // Demand status
  @Column({
    type: 'enum',
    enum: ['active', 'in_progress', 'paused', 'completed', 'transferred'],
    default: 'active',
  })
  status: string;

  // Description and therapeutic fields
  @Column({ type: 'varchar', length: 500, nullable: false })
  demand_description: string; // Specific case description

  @Column({ type: 'text', nullable: true })
  problem_history: string; // Problem history

  @Column({ type: 'text', nullable: true })
  symptoms: string; // Presented symptoms

  @Column({ type: 'text', nullable: true })
  treatment_goals: string; // Treatment goals

  @Column({ type: 'text', nullable: true })
  impact_on_life: string; // Impact on patient's life

  @Column({ type: 'text', nullable: true })
  previous_attempts: string; // Previous treatment attempts

  @Column({ type: 'varchar', length: 500, nullable: true })
  social_support: string; // Social support network

  @Column({ type: 'varchar', length: 500, nullable: true })
  aggravating_factors: string; // Aggravating factors

  @Column({ type: 'text', nullable: true })
  treatment_expectations: string; // Treatment expectations

  @Column({ type: 'varchar', length: 500, nullable: true })
  motivation_for_change: string; // Motivation for change

  @Column({ type: 'varchar', length: 500, nullable: true })
  current_medication: string; // Demand-related medications

  @Column({ type: 'varchar', length: 500, nullable: true })
  other_therapies: string; // Simultaneous therapies

  @Column({ type: 'text', nullable: true })
  additional_observations: string; // Additional observations

  // Current feeling (optional)
  @Column({ type: 'int', nullable: true })
  current_feeling_id: number;

  @Column({ type: 'int', nullable: true })
  feeling_intensity: number; // 0-10

  // Dates
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @OneToMany(() => SessionReport, (report) => report.demand)
  session_reports: SessionReport[];

  @OneToMany(() => DemandAccessRequest, (request) => request.demand)
  access_requests: DemandAccessRequest[];
}
