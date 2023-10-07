import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResizableFrameComponent } from './common/resizable-frame/resizable-frame.component';
import { EditScreenComponent } from './editor/edit-screen/edit-screen.component';
import { FormsModule } from '@angular/forms';
import { TabEditorComponent } from './editor/tab-editor/tab-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditScreenComponent,
    ResizableFrameComponent,
    TabEditorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
