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
import { Demand } from '@modules/demands/entities/demand.entity';
import { Psychologist } from '@modules/psychologists/entities/psychologist.entity';
import { AccessAuditLog } from '@modules/access-audit-logs/entities/access-audit-log.entity';

@Entity('demand_access_requests')
export class DemandAccessRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Requested demand
  @Column({ type: 'uuid', nullable: false })
  demand_id: string;

  @ManyToOne(() => Demand, (demand) => demand.access_requests)
  @JoinColumn({ name: 'demand_id' })
  demand: Demand;

  // Who is requesting access (new psychologist)
  @Column({ type: 'uuid', nullable: false })
  requesting_psychologist_id: string;

  @ManyToOne(() => Psychologist)
  @JoinColumn({ name: 'requesting_psychologist_id' })
  requesting_psychologist: Psychologist;

  // Request status
  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected', 'revoked'],
    default: 'pending',
  })
  status: string;

  // Approvals (timestamps when approved)
  @Column({ type: 'timestamp', nullable: true })
  patient_approved_at: Date;

  @Column({ type: 'uuid', nullable: true })
  patient_approved_by: string; // Patient ID who approved (if patient has account)

  @Column({ type: 'timestamp', nullable: true })
  psychologist_approved_at: Date;

  @Column({ type: 'uuid', nullable: true })
  psychologist_approved_by: string; // Previous psychologist ID who approved

  // Rejection
  @Column({ type: 'text', nullable: true })
  rejection_reason: string;

  @Column({ type: 'uuid', nullable: true })
  rejected_by: string; // Who rejected (patient or psychologist)

  // Revocation
  @Column({ type: 'timestamp', nullable: true })
  revoked_at: Date;

  @Column({ type: 'uuid', nullable: true })
  revoked_by: string; // Who revoked

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @OneToMany(() => AccessAuditLog, (log) => log.access_request)
  audit_logs: AccessAuditLog[];
}
