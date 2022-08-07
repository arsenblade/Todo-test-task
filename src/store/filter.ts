import { makeAutoObservable } from "mobx";

class Filter {
  currentFilterType: string = 'Все'

  constructor() {
    makeAutoObservable(this)
  }

  changeFilterType(filterType: string) {
    this.currentFilterType = filterType;
  }
}

export default new Filter();