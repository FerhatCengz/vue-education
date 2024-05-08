import type { IBaseEntity } from '@/models/IBaseEntity'
import type { IRepository } from '@/repository/IRepository'
import supabaseClient from '@/plugins/supaBase'

export class SupabaseRepository<TModel extends IBaseEntity> implements IRepository<TModel> {
  _tableName: string

  constructor(tableName: string) {
    this._tableName = tableName
  }

  async createAsync(model: TModel): Promise<TModel> {
    const { data, error } = await supabaseClient.from(this._tableName).insert(model)

    if (error) {
      throw new Error(error.message)
    }

    return data ? data[0] : model

  }

  async deleteAsync(id: number | string): Promise<boolean> {
    const { error } = await supabaseClient.from(this._tableName).delete().eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return Promise.resolve(true)
  }

  async getAllAsync(): Promise<TModel[]> {
    const { data } = await supabaseClient.from(this._tableName).select('*')
    return data as TModel[]
  }

  async getAsync(id: number | string): Promise<TModel | null> {
    const { data, error } = await supabaseClient.from(this._tableName).select('*').eq('id', id).single()
    if (error) {
      throw new Error(error.message)
    }
    return data ? data : null

  }

  async updateAsync(model: TModel): Promise<TModel> {
    const { error, data } = await supabaseClient.from(this._tableName).update(model).eq('id', model.id)
    if (error) {
      throw new Error(error.message)
    }

    return data ? data[0] : model
  }


  query(): any {
    return supabaseClient.from(this._tableName)
  }

}


