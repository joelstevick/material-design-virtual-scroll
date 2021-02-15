import { Injectable } from "@angular/core";

@Injectable()
export class ChatScrollStrategyView {
  getIndexHeight(index: number): number {
    return 100;
  }
}
