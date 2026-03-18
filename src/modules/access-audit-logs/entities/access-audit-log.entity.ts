import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DemandAccessRequest } from '@modules/demand-access-requests/entities/demand-access-request.entity';
import { Demand } from '@modules/demands/entities/demand.entity';
import { Psychologist } from '@modules/psychologists/entities/psychologist.entity';

@Entity('access_audit_logs')
export class AccessAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relationship with request
  @Column({ type: 'uuid', nullable: false })
  access_request_id: string;

  @ManyToOne(() => DemandAccessRequest, (request) => request.audit_logs)
  @JoinColumn({ name: 'access_request_id' })
  access_request: DemandAccessRequest;

  @Column({ type: 'uuid', nullable: false })
  demand_id: string;

  @ManyToOne(() => Demand)
  @JoinColumn({ name: 'demand_id' })
  demand: Demand;

  // Action performed
  @Column({
    type: 'enum',
    enum: ['request', 'patient_approve', 'psychologist_approve', 'reject', 'grant', 'revoke'],
    nullable: false,
  })
  action: string;

  // Who performed the action
  @Column({ type: 'uuid', nullable: false })
  actor_id: string; // User ID (psychologist, patient or admin)

  @Column({
    type: 'enum',
    enum: ['psychologist', 'patient', 'admin'],
    nullable: false,
  })
  actor_type: string;

  // For whom it was granted (in case of grant)
  @Column({ type: 'uuid', nullable: true })
  target_psychologist_id: string;

  @ManyToOne(() => Psychologist)
  @JoinColumn({ name: 'target_psychologist_id' })
  target_psychologist: Psychologist;

  // Additional metadata
  @Column({ type: 'json', nullable: true })
  metadata: any; // Extra data (device, browser, etc)

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip_address: string;

  // Timestamp (immutable)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  timestamp: Date;

  // NO updated_at, deleted_at (immutable record)
}
