import { ListRange } from "@angular/cdk/collections";
import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { ChatScrollStrategyViewMap } from "../components/chat-scroll/chat-scroll-strategy.view-map";

class State {
  measureScrollOffset: number;
  offsetToRenderedContentStart: number | null;
  renderedRange: ListRange;
  dataLength: number;
  measureRenderedContentSize: number;
}
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
    console.log("strategy.attach");
  }
  detach(): void {
    this.index$.complete();
    this.viewport = null;
    console.log("strategy.detach");
  }
  onContentScrolled(): void {
    const offset = this.viewport.measureScrollOffset();
    console.log("strategy.onContentScrolled", this.getState());

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
  }
  onDataLengthChanged(): void {
    // data length changed implies that more data was fetched
    console.log("strategy.onDataLengthChanged", this.getState());

    const { adjustedRange, delta } = this.getAdjustedRange();

    if (delta) {
      adjustedRange.start--;
      adjustedRange.end--;
    }

    this.viewport.setRenderedRange(adjustedRange);

    this.viewport.scrollToOffset(10);

    this.viewport.setTotalContentSize(this.viewport.getViewportSize() + 10);
  }
  onContentRendered(): void {
    console.log("strategy.onContentRendered", this.getState());
  }
  onRenderedOffsetChanged(): void {
    console.log("strategy.onRenderedOffsetChanged", this.getState());
  }
  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    console.log("strategy.scrollToIndex", this.getState());
  }

  getState(): State {
    return {
      dataLength: this.viewport.getDataLength(),
      offsetToRenderedContentStart: this.viewport.getOffsetToRenderedContentStart(),
      renderedRange: this.viewport.getRenderedRange(),
      measureRenderedContentSize: this.viewport.measureRenderedContentSize(),
      measureScrollOffset: this.viewport.measureScrollOffset()
    };
  }
  // private logic
  getModelStartIndex() {
    let offset = this.viewport.measureScrollOffset();
    const { start } = this.viewport.getRenderedRange();

    console.log("strategy.getModelStartIndex", start);

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
    console.log(
      "strategy.getModelEndIndex",
      start,
      this.viewport.getDataLength()
    );
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
