import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ContainerComponent } from "./components/container/container.component";
import { ChatScrollComponent } from "./components/chat-scroll/chat-scroll.component";
import { ChatComponent } from "./components/chat/chat.component";

@NgModule({
  imports: [BrowserModule, FormsModule, ScrollingModule],
  declarations: [
    AppComponent,
    ContainerComponent,
    ChatScrollComponent,
    ChatComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
