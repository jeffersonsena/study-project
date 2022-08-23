import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("himym", { schema: "public" })
export class Himym {
  @PrimaryColumn("integer", { name: "index", nullable: false })
  index: number | null;

  @Column("integer", { name: "Season", nullable: true })
  season: number | null;

  @Column("integer", { name: "EP", nullable: true })
  ep: number | null;

  @Column("character varying", { name: "Title", nullable: true, length: 50 })
  title: string | null;
}
