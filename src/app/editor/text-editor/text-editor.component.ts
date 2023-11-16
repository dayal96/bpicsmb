import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent implements AfterViewInit {
  @Input() content: string = '';
  @Input() readonly: boolean = false;
  @Output() contentChange = new EventEmitter<string>();
  cursorPos: number = 0;
  cursorInFocus = false;

  @ViewChild('textEditor')
  textEditorRef!: ElementRef<HTMLTextAreaElement>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.textEditorRef.nativeElement.addEventListener(
      'keydown',
      this.keyHandler
    );
  }

  keyHandler = (event: KeyboardEvent): void => {
    if (event.key == 'Tab') {
      this.tabHandler();
      event.preventDefault();
    }
  };

  tabHandler(): void {
    const pos = this.textEditorRef.nativeElement.selectionStart;
    this.content =
      this.content.substring(0, pos) + '    ' + this.content.substring(pos);
    this.updatePos(pos + 4);
    this.changeDetectorRef.detectChanges();
  }

  updatePos(pos: number): void {
    setTimeout(() => {
      this.textEditorRef.nativeElement.setSelectionRange(pos, pos, 'none');
    }, 0);
  }

  contentUpdate(newContent: string) {
    if (!this.readonly) {
      this.content = newContent;
      this.contentChange.emit(this.content);
    } else {
      this.content = this.content;
      this.textEditorRef.nativeElement.value = this.content;
    }
  }
}
