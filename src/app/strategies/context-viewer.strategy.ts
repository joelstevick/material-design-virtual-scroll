import { I } from "@angular/cdk/keycodes";
import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Observable, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

function getViewPortHeight() {
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
    this.viewport = viewport;
    this.viewport.setTotalContentSize(getViewPortHeight());
    console.log("attach");
  }

  detach() {
    this.index$.complete();
    this.viewport = null;
  }

  onContentScrolled() {
    if (this.viewport) {
    }
  }

  scrollToIndex(index: number, behavior: ScrollBehavior): void {
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
}
