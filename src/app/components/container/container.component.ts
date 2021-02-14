import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from "@angular/core";
import { VIRTUAL_SCROLL_STRATEGY } from "@angular/cdk/scrolling";
import { ContextViewerStrategy } from "../../strategies/context-viewer.strategy";
import { DOCUMENT } from "@angular/common";

const ARRAY_LENGTH = 100;

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
export class ContainerComponent implements OnInit, AfterViewChecked {
  index: number;
  items: any[] = Array(ARRAY_LENGTH).fill(null);

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = i;
    }

    let count = -1;
    this.scrollToBottom();
    // first and to the start and then the end
    let handle = setInterval(() => {
      this.items = [count--, ...this.items];

      this.changeDetectorRef.detectChanges();

      if (count < -10) {
        clearInterval(handle);

        count = 1000;

        // add to the end to simulate new messages
        handle = setInterval(() => {
          this.items = [...this.items, count++];

          this.changeDetectorRef.detectChanges();

          if (count > 1010) {
            clearInterval(handle);
          }
        }, 1000);
      }
    }, 100);
  }

  scrollToBottom() {
    this.document.getElementById("bottom").scrollIntoView();
  }
  fetchMoreitems(newIndex: number) {}

  scrolledIndexChange(index) {
    this.fetchMoreitems(index);
    this.index = index;
  }
}
