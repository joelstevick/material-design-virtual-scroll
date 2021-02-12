import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { VIRTUAL_SCROLL_STRATEGY } from "@angular/cdk/scrolling";
import { ContextViewerStrategy } from "../../strategies/context-viewer.strategy";

@Component({
  selector: "container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"],
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

  ngOnInit() {}

  fetchMoreitems(newIndex: number) {
    const PAGE_SIZE = 10;

    if (newIndex > this.items.length - PAGE_SIZE) {
      const amountToAdd = Math.max(PAGE_SIZE, newIndex - this.items.length);

      for (let i = 0; i < amountToAdd; i++) {
        this.items.push({
          i
        });
      }
    }
  }

  scrolledIndexChange(index) {
    this.fetchMoreitems(index);
    this.index = index;
  }
}
