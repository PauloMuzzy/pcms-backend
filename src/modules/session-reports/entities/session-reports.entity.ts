import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'session-reports' })
export class SessionReports {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;
}
