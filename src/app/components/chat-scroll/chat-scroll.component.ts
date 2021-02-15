import { VIRTUAL_SCROLL_STRATEGY } from "@angular/cdk/scrolling";
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { ChatScrollStrategy } from "../../strategies/chat-scroll.strategy";
import { ChatScrollStrategyViewMap } from "./chat-scroll-strategy.view-map";

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
export class ChatScrollComponent implements OnInit, AfterViewChecked {
  @Input() items: any[];

  @Output() fetchPrevious = new EventEmitter();

  constructor(private viewMap: ChatScrollStrategyViewMap) {}

  ngAfterViewChecked(): void {}
  ngOnInit(): void {
    this.updateViewMap();
  }
  updateViewMap() {
    this.viewMap.map = this.items.map(() => {
      return {
        height: 10
      };
    });
  }
  scrolledIndexChange(index: number) {
    if (index === 0) {
      this.fetchPrevious.emit();
    }
  }
}
