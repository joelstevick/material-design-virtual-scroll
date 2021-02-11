import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}
@Component({
  selector: "container",
  templateUrl: "./container.component.html",
   changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}],
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ]
})
export class ContainerComponent implements OnInit {
  index: number;
  items: any[] = [];

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.items.push({
        i
      });
    }
  }
}
