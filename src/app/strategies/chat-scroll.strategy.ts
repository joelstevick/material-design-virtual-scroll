import { ListRange } from "@angular/cdk/collections";
import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import {
  ChatScrollStrategyViewMap,
  ChatScrollStrategyViewMapDesc
} from "../components/chat-scroll/chat-scroll-strategy.view-map";

class State {
  measureScrollOffset: number;
  offsetToRenderedContentStart: number | null;
  renderedRange: ListRange;
  dataLength: number;
  measureRenderedContentSize: number;
  viewMap: ChatScrollStrategyViewMapDesc[];
}
@Injectable()
export class ChatScrollStrategy implements VirtualScrollStrategy {
  constructor(private viewMap: ChatScrollStrategyViewMap) {}

  private index$ = new BehaviorSubject<number>(null);

  scrolledIndexChange = this.index$.pipe(distinctUntilChanged());

  private viewport: CdkVirtualScrollViewport | null = null;

  private initialized = false;

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
      return;
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

    if (!this.initialized) {
      this.initialized = true;

      this.viewport.setRenderedRange({
        start: this.viewport.getDataLength() - 5,
        end: this.viewport.getDataLength()
      });
    }
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
      measureScrollOffset: this.viewport.measureScrollOffset(),
      viewMap: this.viewMap.map
    };
  }
  // private logic
  private updateRenderedRange(viewport: CdkVirtualScrollViewport) {
    const {
      dataLength,
      offsetToRenderedContentStart,
      renderedRange,
      measureRenderedContentSize,
      measureScrollOffset
    } = this.getState();
  }
  getAdjustedRangeForOffset() {
    // assume monotonically increases
    let adjustedRange: ListRange;

    return { adjustedRange };
  }
}
