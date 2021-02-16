import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ChatEntry } from "../chat-scroll/chat-scroll.component";

@Component({
  selector: "chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  items: ChatEntry[] = [];
  ngOnInit(): void {}

  fetchPrevious() {
    const PageSize = 5;

    const previousItems: ChatEntry[] = Array(PageSize);
    for (let i = 0; i < PageSize; i++) {
      previousItems[i] = {
        html: `${-1 * (this.items.length + i)}`
      };
    }
    previousItems.reverse();

    this.items = [...previousItems, ...this.items];
  }
}
