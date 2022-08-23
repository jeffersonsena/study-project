import "reflect-metadata"
import { DataSource } from "typeorm"
import { Himym } from "./entity/Himym"
import { RiandMo } from "./entity/RiandMo"
import { Friends } from "./entity/Friends"
import { Movies } from "./entity/Movies"

export const appDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [Himym, RiandMo, Friends, Movies],
    ssl: true,
    extra: {
        ssl: {
            "rejectUnauthorized": false
        }
    },
    logging: true,
    synchronize: true,
})
