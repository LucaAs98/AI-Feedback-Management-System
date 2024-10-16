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
  @Input() icon: string = '';
  @Input() duration: number = 3000; // Milliseconds
  @Input() id: number = 0; // Milliseconds

  constructor(private toastService: CstmToastService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.toastService.removeToast(this.id); //Removes the toast after its duration
    }, this.duration);
  }
}
