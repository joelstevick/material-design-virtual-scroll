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
    const PageSize = 500;

    const previousItems: ChatEntry[] = [];

    for (let i = 0; i < PageSize; i++) {
      previousItems.push({
        html: `${-1 * (this.items.length + i)}`
      });
    }
    this.items = [...previousItems, ...this.items];
    console.log("chat.fetchPrevious", this.items.length);
  }
}
