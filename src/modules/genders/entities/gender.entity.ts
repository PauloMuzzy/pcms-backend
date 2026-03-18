import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Patient } from '@modules/patients/entities/patient.entity';

@Entity('genders')
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string; // "Masculino", "Feminino", "Não-binário", "Prefiro não dizer"

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  // Relationships
  @OneToMany(() => Patient, (patient) => patient.gender)
  patients: Patient[];
}
