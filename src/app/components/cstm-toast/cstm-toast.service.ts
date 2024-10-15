import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CstmToast {
  type: 'success' | 'danger' | 'warning' | 'primary';
  message: string;
  description: string;
  icon?: string;
  duration?: number;
  id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CstmToastService {
  private createdToastNumber = 0;
  private toasts: CstmToast[] = [];
  private toastSubject = new BehaviorSubject<CstmToast[]>([]);
  toasts$ = this.getToasts();

  getToasts() {
    return this.toastSubject.asObservable();
  }

  addToast(toast: CstmToast) {
    toast.id = this.createdToastNumber++;
    toast.duration = toast.duration !== undefined ? toast.duration : 3000;
    toast.icon = toast.icon !== undefined ? toast.icon : 'notifications';
    this.toasts.unshift(toast);
    this.toastSubject.next(this.toasts);
  }

  removeToast(toastId: number) {
    this.toasts = this.toasts.filter((t) => t.id !== toastId);
    this.toastSubject.next(this.toasts);
  }
}
