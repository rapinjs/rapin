import { isUndefined, size } from 'lodash'
import {Model} from 'system/common'
import {Like} from 'typeorm'

export class ModelItemItem extends Model {
  public addItem(data) {
    const item = this.db.create('Item')

    item.description = data.description
    item.price = data.price
    item.item_type_id = data.item_type_id
    item.city_id = data.city_id
    item.item_bedrooms_id = data.item_bedrooms_id
    item.item_size_id = data.item_size_id
    item.lat = data.lat
    item.lng = data.lng

    this.db.save('Item', item)

    return item.id
  }

  public editItem(itemId, data) {
    const item = this.getItem(itemId)
    item.description = data.description
    item.price = data.price
    item.item_type_id = data.item_type_id
    item.city_id = data.city_id
    item.item_bedrooms_id = data.item_bedrooms_id
    item.item_size_id = data.item_size_id
    item.lat = data.lat
    item.lng = data.lng
    this.db.save('Item', item)
  }

  public getItem(itemId) {
    return this.db.findOne('Item', {id: itemId},
      {
        relations: ['itemType', 'city', 'itemBedroom', 'images'],
      },
    )
  }

  public getItems(data: any = {}) {
    const options: any = {
      relations: ['itemType', 'city', 'itemBedroom', 'images'],
      order: {
        id: 'ASC',
      },
      where: {},
    }

    if(!isUndefined(data.filter_name)) {
      options.where.name = Like('%' + data.filter_name + '%')
    }

    if (!isUndefined(data.limit) && !isUndefined(data.start)) {
      options.skip = data.start
      options.take = data.limit
    }

    return this.db.find('Item', options)
  }

  public getTotalItems(data: any = []) {
    const options: any = {
      relations: ['itemType', 'city', 'itemBedroom', 'images'],
      order: {
        id: 'ASC',
      },
      where: {},
    }

    if(!isUndefined(data.filter_name)) {
      options.where.name = Like('%' + data.filter_name + '%')
    }


    return size(this.db.find('Item', options))
  }
  public getCoordinatesItems(data: any = {}) {
    const options: any = {
      select: ['id', 'lat', 'lng'],
      order: {
        name: 'ASC',
      },
      where: {},
    }

    if(!isUndefined(data.filter_name)) {
      options.where.name = Like('%' + data.filter_name + '%')
    }


    if (!isUndefined(data.limit) && !isUndefined(data.start)) {
      options.skip = data.start
      options.take = data.limit
    }

    return this.db.find('Item', options)
  }

  public getTotalCoordinatesItems(data: any = []) {
    const options: any = {
      select: ['id', 'lat', 'lng'],
      where: {},
    }

    if(!isUndefined(data.filter_name)) {
      options.where.name = Like('%' + data.filter_name + '%')
    }


    return size(this.db.find('Item', options))
  }

  public updateImage(userId: number, image: string) {
    const user = this.getUser(userId)
    user.image = image
    this.db.save('User', user)
    return user
  }

  public addImages(itemId: number, images: Array<string>) {
    for (const image of images) {
      const itemImage = this.db.create('ItemImage')
      itemImage.itemId = itemId
      itemImage.image = image
      this.db.save('ItemImage', itemImage)

    }
  }
}
