import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Gender } from '@modules/genders/entities/gender.entity';
import { Profession } from '@modules/professions/entities/profession.entity';
import { EmergencyContactRelationship } from '@modules/emergency-contact-relationships/entities/emergency-contact-relationship.entity';
import { Demand } from '@modules/demands/entities/demand.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 14, unique: true, nullable: false })
  cpf: string; // 000.000.000-00

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string; // Opcional

  @Column({ type: 'date', nullable: false })
  date_of_birth: Date;

  // Relationship with Gender
  @Column({ type: 'int', nullable: false })
  gender_id: number;

  @ManyToOne(() => Gender, (gender) => gender.patients)
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  // Relationship with Profession
  @Column({ type: 'int', nullable: false })
  profession_id: number;

  @ManyToOne(() => Profession, (profession) => profession.patients)
  @JoinColumn({ name: 'profession_id' })
  profession: Profession;

  @Column({ type: 'varchar', length: 15, nullable: false })
  phone: string; // (11) 98888-8888

  // Emergency Contact
  @Column({ type: 'varchar', length: 100, nullable: false })
  emergency_contact_name: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  emergency_contact_phone: string;

  @Column({ type: 'int', nullable: false })
  emergency_contact_relationship_id: number;

  @ManyToOne(() => EmergencyContactRelationship, (relationship) => relationship.patients)
  @JoinColumn({ name: 'emergency_contact_relationship_id' })
  emergency_contact_relationship: EmergencyContactRelationship;

  // Additional fields
  @Column({ type: 'text', nullable: true })
  general_notes: string; // Observações gerais

  @Column({ type: 'text', nullable: true })
  medical_history: string; // Histórico médico relevante

  @Column({ type: 'text', nullable: true })
  medications_in_use: string; // Medicações atuais

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date; // Soft delete

  // Relationships
  @OneToMany(() => Demand, (demand) => demand.patient)
  demands: Demand[];
}
