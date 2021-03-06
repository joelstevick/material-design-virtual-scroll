import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ContainerComponent } from "./components/container/container.component";
import { ChatScrollComponent } from "./components/chat-scroll/chat-scroll.component";
import { ChatComponent } from "./components/chat/chat.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ChatScrollStrategyViewMap } from "./components/chat-scroll/chat-scroll-strategy.view-map";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ScrollingModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AppComponent,
    ContainerComponent,
    ChatScrollComponent,
    ChatComponent
  ],
  providers: [ChatScrollStrategyViewMap],
  bootstrap: [AppComponent]
})
export class AppModule {}
