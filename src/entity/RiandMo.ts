import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("rick_and_morty", { schema: "public" })
export class RiandMo {
  @PrimaryColumn("integer", { name: "Index", nullable: false })
  index: number | null;

  @Column("integer", { name: "Season", nullable: true })
  season: number | null;

  @Column("integer", { name: "EP", nullable: true })
  ep: number | null;

  @Column("character varying", { name: "Title", nullable: true, length: 50 })
  title: string | null;
}
