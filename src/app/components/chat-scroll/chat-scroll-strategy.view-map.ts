import { Injectable } from "@angular/core";

export interface ChatScrollStrategyViewMapDesc {
  height: number;
}

@Injectable()
export class ChatScrollStrategyViewMap {
  private _map: ChatScrollStrategyViewMapDesc[];

  get map() {
    if (!this._map) {
      console.warn("map not configured");
      return [];
    }
    return this._map;
  }

  set map(map: ChatScrollStrategyViewMapDesc[]) {
    this._map = map;
  }

  getIndexHeight(index: number): number {
    if (index > this._map.length - 1) {
      throw new Error(`out of range: ${index}, ${this._map.length}`);
    }
    // console.log(`getIndexHeight(${index}) => ${this.map[index].height}`);

    return this.map[index].height;
  }
}
