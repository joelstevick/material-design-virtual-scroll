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
    const offset = this.viewport.measureScrollOffset();
    console.log("onContentScrolled", offset);

    if (offset === 0) {
      this.index$.next(0);
    } else {
      this.index$.next(-1);

      const delta = Math.trunc(offset / 10);

      const { start, end } = this.viewport.getRenderedRange();

      if (end + delta <= this.viewport.getDataLength()) {
        this.viewport.setRenderedRange({
          start: start + delta,
          end: end + delta
        });
      }
    }
    console.log(
      "chat-scroll.onContentScrolled - completed",
      this.viewport.measureScrollOffset(),
      this.viewport.getRenderedRange(),
      this.viewport.getDataLength()
    );
  }
  onDataLengthChanged(): void {
    // data length changed implies that more data was fetched
    console.log("onDataLengthChanged");

    const { adjustedRange, delta } = this.getAdjustedRange();

    if (delta) {
      adjustedRange.start--;
      adjustedRange.end--;
    }

    this.viewport.setRenderedRange(adjustedRange);

    if (delta) {
      this.viewport.setRenderedContentOffset(10);
    }

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

    const modelRange = {
      start,
      end: this.getModelEndIndex(start)
    };

    console.log("getUpdatedModelRange", modelRange);
    return modelRange;
  }

  getAdjustedRange() {
    // assume monotonically increases
    let adjustedRange: any;
    let delta;

    if (this.prevDataLength === 0) {
      adjustedRange = {
        start: 0,
        end: this.getModelEndIndex(0)
      };
      delta = 0;
    } else {
      delta = this.viewport.getDataLength() - this.prevDataLength;

      const { start, end } = this.viewport.getRenderedRange();

      adjustedRange = {
        start: start + delta,
        end: end + delta
      };
      console.log("getAdjustedRange", delta, start, end);
    }
    this.prevDataLength = this.viewport.getDataLength();

    return { adjustedRange, delta };
  }
}
