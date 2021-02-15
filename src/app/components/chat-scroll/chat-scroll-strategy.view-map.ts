import { Injectable } from "@angular/core";

@Injectable()
export class ChatScrollStrategyViewMap {
  getIndexHeight(index: number): number {
    return 100;
  }
}
