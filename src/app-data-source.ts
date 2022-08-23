import "reflect-metadata"
import { DataSource } from "typeorm"
import { Himym } from "./entity/Himym"
import { RiandMo } from "./entity/RiandMo"
import { Friends } from "./entity/Friends"
import { Movies } from "./entity/Movies"

export const appDataSource = new DataSource({
    type: "postgres",
    host: "ec2-44-208-88-195.compute-1.amazonaws.com",
    port: 5432,
    username: "vuowpxcsoknyyu",
    password: "488214c1ec9cdf155ee6ae7d5c850bda466c1a237cdbd6f000ecfc8b8d6b4881",
    database: "dcfondv122ev5r",
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
