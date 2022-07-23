import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    createdAt: Date

    
}
