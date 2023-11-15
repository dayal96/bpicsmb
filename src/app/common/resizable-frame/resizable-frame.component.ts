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
  _size: number = 50;
  _sizeMin: number = 0;
  _sizeMax: number = 100;
  active = false;
  _gen_style: GridStyle = {} as GridStyle;

  start = -1;

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

    document.body.style.cursor =
      this.direction == 'HORIZONTAL' ? 'col-resize' : 'row-resize';
    this.active = true;
    this.start = this.direction == 'HORIZONTAL' ? evt.clientX : evt.clientY;
    evt.preventDefault();
    this.changeDetectorRef.detectChanges();
  };

  mouseUp = (evt: MouseEvent) => {
    if (!this.active) {
      return;
    }

    document.body.style.cursor = 'default';
    this.active = false;
    evt.preventDefault();
    this.changeDetectorRef.detectChanges();
  };

  mouseMove = (evt: MouseEvent) => {
    if (!this.active) {
      return;
    }

    const flowHori = this.direction == 'HORIZONTAL';
    const pos0 = flowHori
      ? this.frameContainer.nativeElement.getBoundingClientRect().left
      : this.frameContainer.nativeElement.getBoundingClientRect().top;
    const divSize = flowHori
      ? this.frameContainer.nativeElement.clientWidth
      : this.frameContainer.nativeElement.clientHeight;

    const min = pos0 + ((divSize - pos0) * this.sizeMin) / 100;
    const max = pos0 + ((divSize - pos0) * this.sizeMax) / 100;

    let mousePos = flowHori ? evt.clientX : evt.clientY;
    mousePos = Math.max(min, Math.min(max, mousePos));

    this._size = ((mousePos - pos0) / (divSize ?? 1)) * 100;
    // this._size = Math.max(this._sizeMin, Math.min(this._size, this._sizeMax));
    this.start = mousePos;
    this.updateStyle();
  };

  updateStyle() {
    const style = this._size + 'fr' + ' auto ' + (100 - this._size) + 'fr';
    if (this.direction == 'VERTICAL') {
      this._gen_style['grid-template-columns'] = undefined;
      this._gen_style['grid-template-rows'] = style;
    } else {
      this._gen_style['grid-template-columns'] = style;
      this._gen_style['grid-template-rows'] = undefined;
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
