import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Request } from 'src/app/model/request';

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestEditorComponent {
  @Input() request?: Request;
  @Output() requestChange = new EventEmitter<Request>();

  emitChange() {
    if (this.request) {
      this.requestChange.emit(this.request);
    }
  }
}
