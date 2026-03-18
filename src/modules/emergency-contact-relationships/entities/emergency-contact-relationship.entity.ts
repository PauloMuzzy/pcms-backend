import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Patient } from '@modules/patients/entities/patient.entity';

@Entity('emergency_contact_relationships')
export class EmergencyContactRelationship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string; // "Pai/Mãe", "Irmão/Irmã", "Cônjuge", "Filho/Filha", "Amigo", "Outro"

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  // Relationships
  @OneToMany(() => Patient, (patient) => patient.emergency_contact_relationship)
  patients: Patient[];
}
