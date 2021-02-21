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
    }

    this.updateRenderedRange();
  }
  onDataLengthChanged(): void {
    const {
      dataLength,
      offsetToRenderedContentStart,
      renderedRange,
      measureRenderedContentSize,
      measureScrollOffset
    } = this.getState();

    // data length changed implies that more data was fetched
    console.log("strategy.onDataLengthChanged", this.getState());

    this.viewport.setTotalContentSize(1000);
    if (!this.initialized) {
      console.log("should scroll to end");
      this.viewport.setRenderedRange({
        start: dataLength - 10,
        end: dataLength
      });

      // need let the event loop run
      setTimeout(() => {
        this.viewport.scrollToOffset(1000);
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
  private updateRenderedRange() {
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
