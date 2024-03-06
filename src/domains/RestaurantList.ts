import { StorageKeyEnum, MESSAGE } from '../constants';
import InitialRestaurantData from '../data/restaurantData';
import { Category, RestaurantInfo } from '../types';

class RestaurantList {
  #list: RestaurantInfo[] | undefined = InitialRestaurantData;

  constructor() {
    this.#updateListByLocalStorage();
  }

  get list() {
    return JSON.parse(JSON.stringify(this.#list)) as
      | RestaurantInfo[]
      | undefined;
  }

  addRestaurant(info: RestaurantInfo) {
    this.#checkDuplicate(info.name);

    if (!this.#list) {
      this.#list = [info];
      return;
    }

    this.#list.push(info);
  }

  #updateListByLocalStorage() {
    const item = localStorage.getItem(StorageKeyEnum.restaurants);

    if (item) {
      this.#list = JSON.parse(item);
    }
  }

  #checkDuplicate(name: string) {
    if (!this.#list?.every((info: RestaurantInfo) => info.name !== name)) {
      throw new Error(MESSAGE.duplicateRestaurantName);
    }
  }

  //2단계 - 즐겨찾기 편집
  // filterRestaurantByCategory(category: Category) {
  //   return this.#list
  //     ?  JSON.parse(JSON.stringify(this.#list)).filter(
  //         (info: RestaurantInfo) => info.category === category,
  //       )
  //     : undefined;
  // }
}

export default RestaurantList;
