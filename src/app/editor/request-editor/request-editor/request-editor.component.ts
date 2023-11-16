import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { BpicsmnRequest, RequestType } from 'src/app/model/bpicsmn-request';

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestEditorComponent {
  private cdRef = inject(ChangeDetectorRef);

  @Output() requestChange = new EventEmitter<BpicsmnRequest>();

  @Input() response: string = 'Hello World!';

  @Input() set request(requestBody: BpicsmnRequest | undefined) {
    this.toEdit = requestBody;
    this.updateRequestTypeColor();
  }

  EditorView = EditorView;
  RequestType = RequestType;

  toEdit?: BpicsmnRequest;
  typeColor = '#202020';
  editorView: EditorView = EditorView.HEADERS;

  typeChange() {
    this.updateRequestTypeColor();
    // this.cdRef.detectChanges();
    this.emitChange();
  }

  updateRequestTypeColor() {
    if (this.toEdit) {
      if (this.toEdit.type === RequestType.GET) {
        this.typeColor = '#509040';
      } else if (this.toEdit.type === RequestType.POST) {
        this.typeColor = '#2090E0';
      } else if (this.toEdit.type === RequestType.PUT) {
        this.typeColor = '#008070';
      } else if (this.toEdit.type === RequestType.DELETE) {
        this.typeColor = '#FF5050';
      }
    }
  }

  emitChange() {
    if (this.toEdit) {
      this.requestChange.emit(this.toEdit);
    }
  }

  removeHeader(i: number) {
    if (this.toEdit && i >= 0 && i < this.toEdit.headers.length) {
      this.toEdit.headers = [
        ...this.toEdit.headers.slice(0, i),
        ...this.toEdit.headers.slice(i + 1),
      ];
      this.emitChange();
    }
  }

  addHeader() {
    if (this.toEdit) {
      this.toEdit.headers.push(['', '']);
      this.emitChange();
    }
  }

  addRequestParam() {
    if (this.toEdit) {
      this.toEdit.params.push(['', '']);
      this.emitChange();
    }
  }
}

export enum EditorView {
  REQUEST_PARAMS,
  HEADERS,
}
