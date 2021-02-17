import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { ChatScrollStrategyViewMap } from "../components/chat-scroll/chat-scroll-strategy.view-map";

@Injectable()
export class ChatScrollStrategy implements VirtualScrollStrategy {
  constructor(private viewMap: ChatScrollStrategyViewMap) {}

  private index$ = new BehaviorSubject<number>(null);

  scrolledIndexChange = this.index$.pipe(distinctUntilChanged());

  private viewport: CdkVirtualScrollViewport | null = null;

  private prevDataLength = 0;

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
    console.log("onContentScrolled");
    // calculate the new model-range
    this.viewport.setRenderedRange(this.getUpdatedModelRange());

    if (this.viewport.measureScrollOffset() === 0) {
      this.index$.next(0);
    } else {
      this.index$.next(-1);
    }
    console.log(
      "chat-scroll.onContentScrolled - completed",
      this.viewport.measureScrollOffset(),
      this.viewport.getRenderedRange(),
      this.viewport.getDataLength()
    );
  }
  onDataLengthChanged(): void {
    console.log("onDataLengthChanged");
    this.adjustForNewDataLength();

    this.viewport.setTotalContentSize(this.viewport.getViewportSize() + 10);
    console.log(
      "chat-scroll.onDataLengthChanged - completed",
      this.viewport.measureScrollOffset(),
      this.viewport.getRenderedRange()
    );
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

  // private logic
  getModelStartIndex() {
    let offset = this.viewport.measureScrollOffset();
    const { start } = this.viewport.getRenderedRange();

    console.log("getModelStartIndex", start);

    let index = start;

    while (offset > 0 && index < this.viewport.getDataLength()) {
      const heightForIndex = this.viewMap.getIndexHeight(index);

      offset -= heightForIndex;

      if (offset > 0) {
        index++;
      }
    }

    return index;
  }

  getModelEndIndex(start: number): number {
    console.log("getModelEndIndex", start, this.viewport.getDataLength());
    // check for eof
    if (start === this.viewport.getDataLength()) {
      return start;
    }
    let offsetRemaining =
      this.viewport.getViewportSize() - this.viewMap.getIndexHeight(start);
    let index = start;

    while (offsetRemaining > 0 && index < this.viewport.getDataLength()) {
      const heightForIndex = this.viewMap.getIndexHeight(index);

      offsetRemaining -= heightForIndex;

      if (offsetRemaining > 0) {
        index++;
      }
    }

    return index;
  }

  getUpdatedModelRange() {
    const start = this.getModelStartIndex();
    console.log("getUpdatedModelRange", {
      start,
      end: this.getModelEndIndex(start)
    });
    return {
      start,
      end: this.getModelEndIndex(start)
    };
  }

  adjustForNewDataLength() {
    console.log("adjustForNewDataLength");
    // assume monotonically increases
    if (this.prevDataLength === 0) {
      this.viewport.setRenderedRange({
        start: 0,
        end: this.getModelEndIndex(0)
      });
    } else {
      const delta = this.viewport.getDataLength() - this.prevDataLength;

      const { start, end } = this.viewport.getRenderedRange();

      this.viewport.setRenderedRange({
        start: start + delta,
        end: end + delta
      });
    }
  }
}
