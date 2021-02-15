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

    for (
      let i = this.items.length;
      i > -1 * (this.items.length + PageSize);
      i--
    ) {
      this.items.push(i * -1);
    }
  }
}
