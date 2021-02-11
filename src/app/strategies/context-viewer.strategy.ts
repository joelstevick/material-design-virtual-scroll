import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy
} from "@angular/cdk/scrolling";
import { Observable } from "rxjs";

export class ContextViewerStrategy implements VirtualScrollStrategy {
  scrolledIndexChange: Observable<number>;
  attach(viewport: CdkVirtualScrollViewport): void {
    throw new Error("Method not implemented.");
  }
  detach(): void {
    throw new Error("Method not implemented.");
  }
  onContentScrolled(): void {
    throw new Error("Method not implemented.");
  }
  onDataLengthChanged(): void {
    throw new Error("Method not implemented.");
  }
  onContentRendered(): void {
    throw new Error("Method not implemented.");
  }
  onRenderedOffsetChanged(): void {
    throw new Error("Method not implemented.");
  }
  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    throw new Error("Method not implemented.");
  }
}
