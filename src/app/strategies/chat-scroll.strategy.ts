import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

export class ChatScrollStrategy implements VirtualScrollStrategy {
  private index$ = new Subject<number>();

  scrolledIndexChange = this.index$.pipe(distinctUntilChanged());

  private viewport: CdkVirtualScrollViewport | null = null;

  // lifecycle hooks
  attach(viewport: CdkVirtualScrollViewport): void {
    this.viewport = viewport;
    this.viewport.setTotalContentSize(0);
    this.viewport.setRenderedRange({ start: 0, end: 0 });
    this.viewport.setRenderedContentOffset(0);
    console.log("chat-scroll.attach");
  }
  detach(): void {
    this.index$.complete();
    this.viewport = null;
    console.log("chat-scroll.detach");
  }
  onContentScrolled(): void {
    console.log(
      "chat-scroll.onContentScrolled",
      this.viewport.measureScrollOffset()
    );
    if (this.viewport.measureScrollOffset() === 0) {
      console.log("fetch");
      this.index$.next(0);
    } else {
      this.index$.next(-1);
    }
  }
  onDataLengthChanged(): void {
    console.log("chat-scroll.onDataLengthChanged");
    this.viewport.setTotalContentSize(this.viewport.getViewportSize() + 20);
    this.viewport.setRenderedRange({
      start: 0,
      end: this.viewport.getDataLength()
    });
  }
  onContentRendered(): void {
    console.log("chat-scroll.onContentRendered");
  }
  onRenderedOffsetChanged(): void {
    console.log("chat-scroll.onRenderedOffsetChanged");
  }
  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    console.log("chat-scroll.scrollToIndex");
  }
}
