import { Patient } from 'src/modules/patients/entities/patient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gender' })
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  description: string;

  @OneToMany(() => Patient, (patient) => patient.gender)
  patients: Patient[];
}
