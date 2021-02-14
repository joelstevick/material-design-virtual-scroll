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

const ARRAY_LENGTH = 20;

let moreIndex = -1;

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
  items: any[] = [];

  initialized = false;

  @ViewChild("top") topRef: ElementRef;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngAfterViewChecked(): void {}

  ngOnInit() {
    return;
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = i;
    }
    // listen for scroll to topRef
    const top = this.document.querySelector("#top");

    const handleIntersect = (entries, observer) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.fetchMore();
        }
      });
    };
    let observer = new IntersectionObserver(handleIntersect, {});
    observer.observe(top);

    // scroll to bottom
    setTimeout(() => {
      this.scrollToBottom();
      this.changeDetectorRef.detectChanges();
      setTimeout(() => {
        this.initialized = true;
      });
    });

    this.testDynamicData();
  }

  fetchMore() {
    return;
    if (!this.initialized) {
      return;
    }
    for (let i = 0; i < 10; i++) {
      this.items = [moreIndex--, ...this.items];
    }

    this.changeDetectorRef.detectChanges();
  }
  testDynamicData() {
    let count = -1;
    // first and to the start and then the end
    let handle = setInterval(() => {
      this.items = [count--, ...this.items];

      this.changeDetectorRef.detectChanges();

      if (count < -3) {
        clearInterval(handle);

        count = 1000;

        // add to the end to simulate new messages
        handle = setInterval(() => {
          this.items = [...this.items, count++];

          this.changeDetectorRef.detectChanges();
          if (count > 1003) {
            clearInterval(handle);

            this.scrollToBottom();
            this.changeDetectorRef.detectChanges();
          }
        }, 100);
      }
    }, 100);
  }
  scrollto(id) {
    this.document.getElementById(id).scrollIntoView(id === "top");
  }
  scrollToTop() {
    this.scrollto("top");
  }
  scrollToBottom() {
    console.log("scrollToBottom");
    this.scrollto("bottom");
  }
  fetchMoreitems(newIndex: number) {}

  scrolledIndexChange(index) {
    this.fetchMoreitems(index);
    this.index = index;
  }
}
