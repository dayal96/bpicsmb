import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from 'src/app/model/request';

@Component({
  selector: 'tab-editor',
  templateUrl: './tab-editor.component.html',
  styleUrls: ['./tab-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabEditorComponent implements AfterViewInit, OnChanges {
  private cdRef = inject(ChangeDetectorRef);

  tabs: Request[] = [];
  activeTab?: Request;

  @Input() filesToOpen?: Observable<Request>;
  @Output() fileSaved = new EventEmitter<Request>();
  @Output() ready = new EventEmitter<void>();

  ngAfterViewInit(): void {
    document.addEventListener('keydown', this.keyHandler);
    this.filesToOpen?.subscribe((newTab) => {
      this.tabs.push(newTab);
    });
    this.ready.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filesToOpen']) {
      this.filesToOpen?.subscribe((newTab) => {
        this.tabs.push(newTab);
      });
    }
  }

  keyHandler = (event: KeyboardEvent): void => {
    if (event.ctrlKey && event.key == 's') {
      if (this.activeTab && !this.activeTab.saved) {
        this.fileSaved.emit(this.activeTab);
        this.activeTab.saved = true;
        this.cdRef.detectChanges();
      }
      event.preventDefault();
    }
  };

  switch(tab: Request, event: MouseEvent) {
    this.activeTab = tab;
    event.stopPropagation();
  }

  markAsChanged(tab: Request | undefined) {
    if (tab) {
      tab.saved = false;
    }
  }

  addNewTab(): void {
    const newTab = {
      id: crypto.randomUUID(),
      title: 'Untitled',
      content: '',
      saved: false,
    };
    this.tabs.push(newTab);
    this.activeTab = newTab;
  }

  closeTab(toClose: Request, event: MouseEvent): void {
    this.tabs = this.tabs.filter((tab) => tab.id !== toClose.id);
    if (toClose.id === this.activeTab?.id) {
      this.activeTab = undefined;
    }
    event.stopPropagation();
  }
}
