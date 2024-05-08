import type { IBaseEntity } from '@/models/IBaseEntity'

export default class Category implements IBaseEntity {
  created_at: Date | null = new Date()
  id: number = new Date().getTime()
  title: string = ''
  order: number = 0

}