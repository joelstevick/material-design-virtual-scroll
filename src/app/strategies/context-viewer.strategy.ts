import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Observable, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

function getContentHeight() {
  return 200;
}
function getItemHeight() {
  return 10;
}

export const PAGE_SIZE = 10;

export class ContextViewerStrategy implements VirtualScrollStrategy {
  private index$ = new Subject<number>();

  scrolledIndexChange = this.index$.pipe(distinctUntilChanged());

  private viewport: CdkVirtualScrollViewport | null = null;

  attach(viewport: CdkVirtualScrollViewport) {
    this.viewport = viewport;
    this.viewport.setTotalContentSize(getContentHeight());
    this.viewport.setRenderedRange({ start: 0, end: 10 });
    this.viewport.setRenderedContentOffset(0);
  }

  detach() {
    this.index$.complete();
    this.viewport = null;
  }

  onContentScrolled() {
    const offset = this.viewport.measureScrollOffset();
    console.log("content scrolled", offset);
    if (this.viewport) {
    }
  }

  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    console.log("scrollToIndex");

    if (this.viewport) {
      this.viewport.scrollToOffset(0, behavior);
    }
  }
  // not implemented
  onDataLengthChanged(): void {
    console.log("onDataLengthChanged", !!this.viewport);
    if (this.viewport) {
      this.viewport.setRenderedRange({
        start: 0,
        end: 20
      });
      this.viewport.setRenderedContentOffset(0);
    }
  }
  onContentRendered(): void {
    console.log("onContentRendered");
  }
  onRenderedOffsetChanged(): void {
    console.log("onRenderedOffsetChanged");
  }

  // custom logic
}
