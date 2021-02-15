import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  items: any[] = [];
  ngOnInit(): void {}

  fetchPrevious() {
    const PageSize = 5;

    const previousItems: any[] = Array(PageSize);
    for (let i = 0; i < PageSize; i++) {
      previousItems[i] = -1 * (this.items.length + i);
    }

    this.items = [...previousItems, ...this.items];

    console.log("fetchPrevious", this.items);
  }
}
