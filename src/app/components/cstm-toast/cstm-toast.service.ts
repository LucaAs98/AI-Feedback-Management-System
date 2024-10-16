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

  /**
   * Retrieves an observable stream of toast notifications.
   * @returns {Observable<CstmToast[]>} An observable that emits the current list of toasts.
   */
  getToasts() {
    return this.toastSubject.asObservable();
  }

  /**
   * Adds a new toast notification to the list.
   * @param {CstmToast} toast - The toast object to be added.
   */
  addToast(toast: CstmToast) {
    toast.id = this.createdToastNumber++; // "id" is assigned a unique identifier by incrementing "createdToastNumber"
    toast.duration = toast.duration !== undefined ? toast.duration : 3000; //"duration" is set to a default of 3000ms if not provided
    toast.icon = toast.icon !== undefined ? toast.icon : 'notifications'; //"icon" defaults to 'notifications' if not specified

    this.toasts.unshift(toast); // Adds the new toast to the beginning of the toasts array.
    this.toastSubject.next(this.toasts); // Emits the updated list of toasts.
  }

  /**
   * Removes a toast notification from the list by its ID.
   * @param {number} toastId - The ID of the toast to be removed.
   */
  removeToast(toastId: number) {
    document.getElementById('cstm-toast-' + toastId)?.classList.add('hide'); // Adds 'hide' class to the toast element for hide animation.

    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== toastId); // Removes the toast from the array.
      this.toastSubject.next(this.toasts); // Emits the updated list of toasts.
    }, 500); // Delay before removing from the array because we want to see the hide animation.
  }
}
