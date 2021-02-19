import { VIRTUAL_SCROLL_STRATEGY } from "@angular/cdk/scrolling";
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { ChatScrollStrategy } from "../../strategies/chat-scroll.strategy";
import { ChatScrollStrategyViewMap } from "./chat-scroll-strategy.view-map";

export interface ChatEntry {
  html: string;
}
@Component({
  selector: "chat-scroll",
  templateUrl: "./chat-scroll.component.html",
  styleUrls: ["./chat-scroll.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: ChatScrollStrategy
    }
  ]
})
export class ChatScrollComponent
  implements OnInit, AfterViewChecked, OnChanges {
  @Input() items: ChatEntry[];

  @Output() fetchPrevious = new EventEmitter();

  constructor(private viewMap: ChatScrollStrategyViewMap) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.items.previousValue &&
      changes.items.currentValue.length !== changes.items.previousValue.length
    ) {
      this.updateViewMap(changes.items.currentValue);
    }
  }

  ngAfterViewChecked(): void {}
  ngOnInit(): void {}
  updateViewMap(items: ChatEntry[]) {
    this.viewMap.map = items.map(() => {
      return {
        height: 10
      };
    });
    console.log("chat-scroll.update view map", this.viewMap.map.length);
  }
  scrolledIndexChange(index: number) {
    if (index === 0) {
      this.fetchPrevious.emit();
    }
  }
}
