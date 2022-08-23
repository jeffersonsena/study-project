import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("movies", { schema: "public" })
export class Movies {
  @PrimaryGeneratedColumn("identity", { name: "Index" })
  index: number | null;

  @Column("character varying", { name: "Title", nullable: true, length: 100 })
  title: string | null;
}
