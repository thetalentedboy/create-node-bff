import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
    name: 'user_collect_schedules'
})
export class UserCollectEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() app_id: number;

    @Column() user_id: number;

    // status 0=不推荐，1=推荐
    @Column() status: number;

    @CreateDateColumn({
        name: 'created_at',
        default: 'CURRENT_TIMESTAMP(6)'
    })
        createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        default: 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
        updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
        deletedAt?: Date;
}