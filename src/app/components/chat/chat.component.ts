import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  items: any[] = ["test"];
  ngOnInit(): void {}
}
