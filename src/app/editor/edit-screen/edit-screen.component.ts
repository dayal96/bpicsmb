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
  selector: 'edit-screen',
  templateUrl: './edit-screen.component.html',
  styleUrls: ['./edit-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditScreenComponent implements AfterViewInit {
  @Input() content: string = '';
  @Output() contentChange = new EventEmitter<string>();
  cursorPos: number = 0;
  cursorInFocus = false;

  @ViewChild('textEditor')
  textEditorRef!: ElementRef<HTMLTextAreaElement>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.textEditorRef.nativeElement.addEventListener(
      'keydown',
      this.tabHandler
    );
  }

  tabHandler = (event: KeyboardEvent): void => {
    if (event.key != 'Tab') {
      return;
    }

    const pos = this.textEditorRef.nativeElement.selectionStart;
    this.content =
      this.content.substring(0, pos) + '\t' + this.content.substring(pos);
    this.updatePos(pos + 1);
    this.changeDetectorRef.detectChanges();
    event.preventDefault();
  };

  updatePos(pos: number): void {
    setTimeout(() => {
      this.textEditorRef.nativeElement.setSelectionRange(pos, pos, 'none');
    }, 0);
  }

  contentUpdate(newContent: string) {
    this.content = newContent;
    this.contentChange.emit(this.content);
  }
}
