import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../tasks-status";


@Entity()
export class Task {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    title: string;

    @Column()
    description: string

    @Column()
    status: TaskStatus;

}
