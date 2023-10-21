import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'resizable-frame',
  templateUrl: './resizable-frame.component.html',
  styleUrls: ['./resizable-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizableFrameComponent implements OnInit, AfterViewInit {
  @Input() size: number = 50;
  @Input() sizeMin: number = 0;
  @Input() sizeMax: number = 100;
  @Input() direction: 'VERTICAL' | 'HORIZONTAL' = 'VERTICAL';
  @Input() resizable: boolean = true;
  _edgeClass: string = 'edge-row';
  _size: number = 50;
  _sizeMin: number = 0;
  _sizeMax: number = 100;
  active = false;
  start: number = -1;
  _gen_style: GridStyle = {} as GridStyle;

  @ViewChild('frameContainer')
  frameContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('edge')
  edgeRef!: ElementRef<HTMLDivElement>;

  @ViewChild('dragArea')
  dragAreaRef!: ElementRef<HTMLDivElement>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  mouseDown = (evt: MouseEvent) => {
    if (this.active) {
      return;
    }

    this.active = true;
    this.start = this.direction == 'HORIZONTAL' ? evt.clientX : evt.clientY;
    evt.preventDefault();
  };

  mouseUp = (evt: MouseEvent) => {
    if (!this.active) {
      return;
    }

    this.active = false;
    this.start = -1;
    evt.preventDefault();
  };

  mouseMove = (evt: MouseEvent) => {
    if (!this.active) {
      return;
    }

    const flowHori = this.direction == 'HORIZONTAL';
    const mousePos = flowHori ? evt.clientX : evt.clientY;
    const divSize = flowHori
      ? this.frameContainer.nativeElement.clientWidth
      : this.frameContainer.nativeElement.clientHeight;

    const deltaSize = ((mousePos - this.start) / (divSize ?? 1)) * 100;
    this._size += deltaSize;
    this._size = Math.max(this._sizeMin, Math.min(this._size, this._sizeMax));
    this.start = mousePos;
    this.updateStyle();
  };

  updateStyle() {
    const style = this._size + 'fr' + ' auto ' + (100 - this._size) + 'fr';
    if (this.direction == 'VERTICAL') {
      this._gen_style['grid-template-columns'] = undefined;
      this._gen_style['grid-template-rows'] = style;
      this._edgeClass = 'h-layout';
    } else {
      this._gen_style['grid-template-columns'] = style;
      this._gen_style['grid-template-rows'] = undefined;
      this._edgeClass = 'v-layout';
    }
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.resizable) {
      this.dragAreaRef.nativeElement.addEventListener(
        'mousedown',
        this.mouseDown
      );
      document.addEventListener('mouseup', this.mouseUp);
      document.addEventListener('mousemove', this.mouseMove);
    }
  }

  ngOnInit(): void {
    this._sizeMin = Math.max(this.sizeMin, 0);
    this._sizeMax = Math.min(this.sizeMax, 100);
    this._size = this.size;
    this._size = Math.max(this._sizeMin, Math.min(this._size, this._sizeMax));
    this.updateStyle();
  }
}

interface GridStyle {
  'grid-template-columns': string | undefined;
  'grid-template-rows': string | undefined;
}
