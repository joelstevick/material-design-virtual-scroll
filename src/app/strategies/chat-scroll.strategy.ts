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
    console.log(
      "chat-scroll.onContentScrolled",
      this.viewport.measureScrollOffset()
    );
    if (this.viewport.measureScrollOffset() === 0) {
      if (this.viewport.getDataLength() > 0) {
        console.log("fetch", this.viewMap.getIndexHeight(0));
      }
      this.index$.next(0);
    } else {
      this.index$.next(-1);
    }
  }
  onDataLengthChanged(): void {
    console.log("chat-scroll.onDataLengthChanged");
    this.viewport.setTotalContentSize(this.viewport.getViewportSize() + 10);
    this.viewport.setRenderedRange({
      start: this.index$.getValue(),
      end: this.index$.getValue() + 5
    });
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
}
