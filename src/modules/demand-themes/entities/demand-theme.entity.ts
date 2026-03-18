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
import { Admin } from '@modules/admin/entities/admin.entity';
import { Demand } from '@modules/demands/entities/demand.entity';

@Entity('demand_themes')
export class DemandTheme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  name: string; // "Depressão", "Ansiedade", "Luto", "Vícios", "Transtorno Alimentar"

  @Column({ type: 'text', nullable: true })
  description: string; // Descrição do tema

  @Column({ type: 'boolean', default: true })
  is_active: boolean; // Soft delete gerenciado

  // Who created
  @Column({ type: 'uuid', nullable: false })
  created_by_admin_id: string;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'created_by_admin_id' })
  created_by_admin: Admin;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @OneToMany(() => Demand, (demand) => demand.theme)
  demands: Demand[];
}
