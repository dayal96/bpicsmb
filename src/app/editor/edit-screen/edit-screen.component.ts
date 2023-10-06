import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'edit-screen',
  templateUrl: './edit-screen.component.html',
  styleUrls: ['./edit-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditScreenComponent implements AfterViewInit {
  @Input() content: string = '';
  @Output() contentChange = new EventEmitter<string>();
  cursorStart: number = 0;

  @ViewChild('textEditor')
  textEditorRef!: ElementRef<HTMLTextAreaElement>;

  ngAfterViewInit(): void {
      this.textEditorRef.nativeElement.addEventListener('keydown', this.tabHandler);
  }

  tabHandler = (event: KeyboardEvent): void => {
    if (event.key != "Tab") {
      return;
    }

    
    event.preventDefault();
  }

  contentUpdate(newContent: string) {
    this.content = newContent;
    this.contentChange.emit(this.content);
  }

  updateCursorStart(ev: Event) {
    console.log(ev);
  }
}
