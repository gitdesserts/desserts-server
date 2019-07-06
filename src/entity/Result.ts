import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  score: number;

  @Column({ nullable: false })
  creator: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
