import { Exclude } from 'class-transformer';
import { Client } from '../clients/client.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('individuals')
export class Individual {
  @PrimaryColumn()
  client_id: number;

  @Column()
  full_name: string;

  @Column()
  social_security_number: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;

  // Relationships
  @OneToOne(() => Client, (client) => client.individual)
  @JoinColumn({ name: 'client_id' })
  @Exclude()
  client: Client;
}
