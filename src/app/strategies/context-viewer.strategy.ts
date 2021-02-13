import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Observable, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

function getContentHeight() {
  return 5000;
}
function getItemHeight() {
  return 50;
}
export class ContextViewerStrategy implements VirtualScrollStrategy {
  private index$ = new Subject<number>();

  scrolledIndexChange = this.index$.pipe(distinctUntilChanged());

  private viewport: CdkVirtualScrollViewport | null = null;

  attach(viewport: CdkVirtualScrollViewport) {
    this.viewport = viewport;
    this.viewport.setTotalContentSize(getContentHeight());

    this.updateRenderedRange();
  }

  detach() {
    this.index$.complete();
    this.viewport = null;
  }

  onContentScrolled() {
    if (this.viewport) {
      this.updateRenderedRange();
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
    console.log("onDataLengthChanged");
  }
  onContentRendered(): void {
    console.log("onContentRendered");
  }
  onRenderedOffsetChanged(): void {
    console.log("onRenderedOffsetChanged");
  }

  // custom logic
  private updateRenderedRange() {
    const viewportSize = this.viewport.getViewportSize();
    const offset = this.viewport.measureScrollOffset();
    const { start, end } = this.viewport.getRenderedRange();
    const dataLength = this.viewport.getDataLength();
    const newIndex = Math.round(offset / getItemHeight());
    const newRange = {
      start: start + newIndex,
      end: start + viewportSize / getItemHeight() + 1
    };

    console.log(
      "updateRenderedRange",
      viewportSize,
      this.viewport.getRenderedRange(),
      offset,
      newRange,
      newIndex,
      (newRange.start - start) * getItemHeight()
    );
    this.viewport.setRenderedRange(newRange);
    this.viewport.setRenderedContentOffset(
      (newRange.start - start) * getItemHeight()
    );

    this.index$.next(newIndex);
  }
}
