import type { IBaseEntity } from '@/models/IBaseEntity'

export class Cart implements IBaseEntity {
  created_at: Date = new Date()
  id: number = new Date().getTime()
  user_id: number = 0
  product_id: number = 0
  amount: number = 1
}