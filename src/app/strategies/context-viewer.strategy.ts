import { I } from "@angular/cdk/keycodes";
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
  return 50;
}
export class ContextViewerStrategy implements VirtualScrollStrategy {
  private index$ = new Subject<number>();

  scrolledIndexChange = this.index$.pipe(distinctUntilChanged());

  private viewport: CdkVirtualScrollViewport | null = null;

  attach(viewport: CdkVirtualScrollViewport) {
    console.log("attach");
    this.viewport = viewport;
    this.viewport.setTotalContentSize(getContentHeight());

    this.updateRenderedRange();
  }

  detach() {
    this.index$.complete();
    this.viewport = null;
    console.log("detach");
  }

  onContentScrolled() {
    console.log("onContentScrolled");

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
    const newRange = {
      start: start,
      end: start + viewportSize / getItemHeight() + 1
    };

    console.log(
      "updateRenderedRange",
      viewportSize,
      offset,
      start,
      end,
      dataLength
    );
    this.viewport.setRenderedRange(newRange);

    this.index$.next(0);
  }
}
