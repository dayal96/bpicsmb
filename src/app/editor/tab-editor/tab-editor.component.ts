import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BpicsmnRequest, RequestType } from 'src/app/model/bpicsmn-request';

@Component({
  selector: 'tab-editor',
  templateUrl: './tab-editor.component.html',
  styleUrls: ['./tab-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabEditorComponent implements AfterViewInit, OnChanges {
  private cdRef = inject(ChangeDetectorRef);

  @Input() filesToOpen?: Observable<BpicsmnRequest>;
  @Output() fileSaved = new EventEmitter<BpicsmnRequest>();
  @Output() ready = new EventEmitter<void>();

  @ViewChild('tabNameInput') set tabNameInput(
    ele: ElementRef<HTMLInputElement>
  ) {
    if (ele) {
      ele.nativeElement.focus();
    }
  }

  tabs: BpicsmnRequest[] = [];
  activeTab?: BpicsmnRequest;
  editingName: boolean = false;

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

  switch(tab: BpicsmnRequest, event: MouseEvent) {
    this.activeTab = tab;
    event.stopPropagation();
  }

  editName(event: MouseEvent) {
    this.editingName = true;
    event.stopPropagation();
  }

  saveName() {
    this.editingName = false;
  }

  markAsChanged(tab: BpicsmnRequest | undefined) {
    if (tab) {
      tab.saved = false;
    }
  }

  addNewTab(): void {
    const newTab = {
      type: RequestType.GET,
      id: crypto.randomUUID(),
      title: 'Untitled',
      content: '',
      saved: false,
      url: '',
      headers: {},
      params: {},
    };
    this.tabs.push(newTab);
    this.activeTab = newTab;
  }

  closeTab(toClose: BpicsmnRequest, event: MouseEvent): void {
    this.tabs = this.tabs.filter((tab) => tab.id !== toClose.id);
    if (toClose.id === this.activeTab?.id) {
      this.activeTab = undefined;
    }
    event.stopPropagation();
  }
}
