import type { IBaseEntity } from './IBaseEntity'


export default class Product implements IBaseEntity {
  created_at: Date = new Date()
  id: number = new Date().getTime()
  title: string = ''
  description: string = ''
  price: number = 0
  currency: string = ''
  category_id: number = 0
  image: string = ''
}