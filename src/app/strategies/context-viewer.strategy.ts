import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Observable, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

function getContentHeight() {
  return 1000;
}
function getItemHeight() {
  return 10;
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
    const offsetIndex = this.viewport.measureScrollOffset();
    const { start, end } = this.viewport.getRenderedRange();
    const dataLength = this.viewport.getDataLength();
    const newIndex = offsetIndex;
    const newRange = {
      start: newIndex,
      end: newIndex + 10
    };

    console.log(
      offsetIndex,
      newIndex,
      this.viewport.getRenderedRange(),
      newRange
    );
    this.index$.next(newIndex);
    this.viewport.setRenderedRange(newRange);

    this.viewport.setRenderedContentOffset(newIndex);
  }
}
