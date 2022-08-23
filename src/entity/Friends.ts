import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("friends", { schema: "public" })
export class Friends {
  @PrimaryColumn("integer", { name: "Index", nullable: false })
  index: number | null;

  @Column("integer", { name: "Season", nullable: true })
  season: number | null;

  @Column("integer", { name: "EP", nullable: true })
  ep: number | null;

  @Column("character varying", { name: "Title", nullable: true, length: 128 })
  title: string | null;
}
