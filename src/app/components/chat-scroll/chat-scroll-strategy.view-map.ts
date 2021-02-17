import { Injectable } from "@angular/core";

export interface ChatScrollStrategyViewMapDesc {
  height: number;
}

@Injectable()
export class ChatScrollStrategyViewMap {
  private _map: ChatScrollStrategyViewMapDesc[];

  get map() {
    if (!this._map) {
      throw new Error("map not configured");
    }
    return this._map;
  }

  set map(map: ChatScrollStrategyViewMapDesc[]) {
    this._map = map;
    console.log("update view map", this.map);
  }

  getIndexHeight(index: number): number {
    // console.log("getIndexHeight", index);
    if (index > this._map.length - 1) {
      throw new Error(`out of range: ${index}, ${this._map.length}`);
    }
    return this.map[index].height;
  }
}
