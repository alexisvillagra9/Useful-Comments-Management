import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FbPostService } from 'src/app/services/fb-post/fb-post.service';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent {

  title = '';
  confirmButtonText = '';
  cancelButtonText = '';
  reportCancel = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogContentComponent>,
    private fbPostService: FbPostService
  ) {
    if (data) {
      this.reportCancel = data.comment.comment_report;
      this.title = data.title || this.title;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onReportUpdate() {
    if (
      this.data.comment.id_reply === null ||
      this.data.comment.id_reply === '' ||
      this.data.comment.id_reply === 'undefined'
    ) {
      this.fbPostService.updatePostReport(this.data.comment._id, this.data.comment.comment_report);
    } else {
      this.fbPostService.updatePostReply(
        this.data.comment._id,
        this.data.comment.id_reply,
        this.data.comment.comment_report
      );
    }
  }

  onReportCancel() {
    this.data.comment.comment_report = this.reportCancel;
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
