import { UserCollectEntity } from 'entities/userCollectEntity';
import { Service } from 'typedi';
import type { FindOptionsWhere} from 'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

export const USER_COLLECT_REPO_INTERFACE = 'UserCollectRepoInterface';

export enum UserCollectStatus {
    NotCollect = 0,
    Collect = 1
}

export interface UserCollectRepositoryImpl {
    getUserCollect(where: FindOptionsWhere<UserCollectEntity>): Promise<UserCollectEntity | null>; // 获取用户收藏
    getUserCollects(userId: number): Promise<UserCollectEntity[]>; // 获取用户收藏列表
    addUserCollect(appId: number, userId: number, status: number): Promise<UserCollectEntity>; // 添加用户收藏
    updateUserCollect(id: number, status: number): Promise<UserCollectEntity>;
}

@Service(USER_COLLECT_REPO_INTERFACE)
class UserCollectRepo implements UserCollectRepositoryImpl {
    @InjectRepository(UserCollectEntity) private readonly userCollectRepository: Repository<UserCollectEntity>;

    getUserCollect(where: FindOptionsWhere<UserCollectEntity>): Promise<UserCollectEntity | null> {
        return this.userCollectRepository.findOne({ where });
    }

    getUserCollects(userId: number): Promise<UserCollectEntity[]> {
        return this.userCollectRepository.find({
            where: {
                user_id: userId
            }
        });
    }

    addUserCollect(appId: number, userId: number, status: number) {
        const collect = new UserCollectEntity();
        collect.app_id = appId;
        collect.user_id = userId;
        collect.status = status === UserCollectStatus.NotCollect ? UserCollectStatus.NotCollect : UserCollectStatus.Collect;
        return this.userCollectRepository.save(collect);
    }

    async updateUserCollect(id: number, status: number): Promise<UserCollectEntity> {
        const collect = await this.getUserCollect({ id });
        if (!collect) {
            throw new Error('Record Not Found');
        }

        collect.status = status === UserCollectStatus.NotCollect ? UserCollectStatus.NotCollect : UserCollectStatus.Collect;
        return this.userCollectRepository.save(collect);
    }
}