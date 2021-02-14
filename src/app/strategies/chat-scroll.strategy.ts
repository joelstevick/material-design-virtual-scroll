import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Observable } from "rxjs";

export class ChatScrollStrategy implements VirtualScrollStrategy {
  scrolledIndexChange: Observable<number>;
  attach(viewport: CdkVirtualScrollViewport): void {
    console.log("chat-scroll.attach");
  }
  detach(): void {
    console.log("chat-scroll.detach");
  }
  onContentScrolled(): void {
    console.log("chat-scroll.onContentScrolled");
  }
  onDataLengthChanged(): void {
    console.log("chat-scroll.onDataLengthChanged");
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
