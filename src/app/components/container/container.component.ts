import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { VIRTUAL_SCROLL_STRATEGY } from "@angular/cdk/scrolling";
import { ContextViewerStrategy } from "../../strategies/context-viewer.strategy";

@Component({
  selector: "container",
  templateUrl: "./container.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: ContextViewerStrategy
    }
  ]
})
export class ContainerComponent implements OnInit {
  index: number;
  items: any[] = [];

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.items.push({
        i
      });
    }
  }
}
