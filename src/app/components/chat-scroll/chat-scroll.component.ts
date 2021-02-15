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

  ngAfterViewChecked(): void {}
  ngOnInit(): void {}

  scrolledIndexChange(index: number) {
    if (index === 0) {
      this.fetchPrevious.emit();
    }
  }
}
