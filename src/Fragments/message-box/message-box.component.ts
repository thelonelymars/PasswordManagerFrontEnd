import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box',
  template: `
  <div class="MainSection" mat-dialog-content>
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">OK</button>
    </div>
  </div>
  `,
   styles: [`
    .MainSection {
      padding: 20px;
    }
    h1 {
      margin: 0;
      font-size: 24px;
    }
    div[mat-dialog-content] {
      margin: 20px 0;
    }
    div[mat-dialog-actions] {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class MessageBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}