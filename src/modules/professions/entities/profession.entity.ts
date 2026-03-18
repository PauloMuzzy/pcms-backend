import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Patient } from '@modules/patients/entities/patient.entity';

@Entity('professions')
export class Profession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  name: string; // "Engenheiro", "Professor", "Estudante", etc.

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  // Relationships
  @OneToMany(() => Patient, (patient) => patient.profession)
  patients: Patient[];
}
