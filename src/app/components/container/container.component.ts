import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { VIRTUAL_SCROLL_STRATEGY } from "@angular/cdk/scrolling";
import { ContextViewerStrategy } from "../../strategies/context-viewer.strategy";

const ARRAY_LENGTH = 10;

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
  items: any[] = Array(ARRAY_LENGTH).fill(null);

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = i;
    }
  }

  fetchMoreitems(newIndex: number) {}

  scrolledIndexChange(index) {
    this.fetchMoreitems(index);
    this.index = index;
  }
}
