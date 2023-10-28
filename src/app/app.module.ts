import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResizableFrameComponent } from './common/resizable-frame/resizable-frame.component';
import { TextEditorComponent } from './editor/text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { TabEditorComponent } from './editor/tab-editor/tab-editor.component';
import { RequestEditorComponent } from './editor/request-editor/request-editor/request-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TextEditorComponent,
    ResizableFrameComponent,
    TabEditorComponent,
    RequestEditorComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
