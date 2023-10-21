import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'tab-editor',
  templateUrl: './tab-editor.component.html',
  styleUrls: ['./tab-editor.component.scss'],
})
export class TabEditorComponent implements AfterViewInit {
  tabs: Tab[] = [];
  activeTab?: Tab;

  @Input() openFiles?: BehaviorSubject<Tab>;
  @Output() fileSaved = new EventEmitter<Tab>();
  @Output() ready = new EventEmitter<void>();

  ngAfterViewInit(): void {
    this.tabs.push({ title: 'hello.txt', content: 'Hello!\n', saved: true });
    this.tabs.push({ title: 'world.txt', content: 'World!\n', saved: true });
    document.addEventListener('keydown', this.keyHandler);
    this.ready.emit();
  }

  keyHandler = (event: KeyboardEvent): void => {
    if (event.ctrlKey && event.key == 's') {
      if (this.activeTab) {
        this.fileSaved.emit(this.activeTab);
        this.activeTab.saved = true;
      }
      event.preventDefault();
    }
  };

  switch(tab: Tab) {
    this.activeTab = tab;
  }

  markAsChanged(tab: Tab) {
    console.log('Marked as unsaved');
    tab.saved = false;
  }
}

export interface Tab {
  content: string;
  title: string;
  saved: boolean;
}
