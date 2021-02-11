import { Component, Input } from "@angular/core";

@Component({
  selector: "container",
  templateUrl: "./container.component.html",
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ]
})
export class ContainerComponent {
  index: number;
}
