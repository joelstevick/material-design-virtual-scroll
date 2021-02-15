import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  items: any[] = [1];
  ngOnInit(): void {}
}
