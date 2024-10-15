import { Component, Input, OnInit } from '@angular/core';
import { CstmToastService } from './cstm-toast.service';

@Component({
  selector: 'app-cstm-toast',
  templateUrl: './cstm-toast.component.html',
  styleUrl: './cstm-toast.component.scss',
})
export class CstmToastComponent implements OnInit {
  @Input() type: 'success' | 'danger' | 'warning' | 'primary' = 'primary';
  @Input({ required: true }) message: string = '';
  @Input({ required: true }) description: string = '';
  @Input() icon: string | undefined = '';
  @Input() duration: number | undefined = 3000; // Milliseconds
  @Input() id?: number | undefined = 0; // Milliseconds

  isVisible: boolean = true;

  constructor(private toastService: CstmToastService) {}

  ngOnInit(): void {
    setTimeout(() => {
      // if (this.id !== undefined) this.toastService.removeToast(this.id);
    }, this.duration);
  }
}
