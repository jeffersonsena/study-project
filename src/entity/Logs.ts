import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


@Entity("logs", { schema: "public" })
export class Logs {
  @PrimaryGeneratedColumn()
  index: number;

  @Column()
  log_Info: string;

  @CreateDateColumn()
  created_At: Date;
}
