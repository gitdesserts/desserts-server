import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Insight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  code: string;

  @Column()
  img: string;
}
