import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BpicsmnRequest } from 'src/app/model/bpicsmn-request';

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestEditorComponent {
  @Input() request?: BpicsmnRequest;
  @Output() requestChange = new EventEmitter<BpicsmnRequest>();

  emitChange() {
    if (this.request) {
      this.requestChange.emit(this.request);
    }
  }
}
