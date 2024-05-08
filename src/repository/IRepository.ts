import type { IBaseEntity } from '@/models/IBaseEntity'

export interface IRepository<TModel extends IBaseEntity> {
  getAsync(id: number | string): Promise<TModel | null>

  getAllAsync(): Promise<TModel[]>

  createAsync(model: TModel): Promise<TModel>

  updateAsync(model: TModel): Promise<TModel>

  deleteAsync(id: number | string): Promise<boolean>
}