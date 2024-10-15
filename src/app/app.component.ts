import { Component } from '@angular/core';
import { CstmToastService } from './components/cstm-toast/cstm-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public cstmToastService: CstmToastService) {}
}
