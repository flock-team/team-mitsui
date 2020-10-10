import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss'],
})
export class CreateEventDialogComponent implements OnInit {
  readonly titleMaxLength = 20;
  readonly descriptionMaxLength = 100;
  readonly timeList = [
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  form = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.maxLength(this.titleMaxLength)],
    ],
    description: ['', [Validators.maxLength(this.descriptionMaxLength)]],
    eventDate: ['', [Validators.required]],
    eventOpenTime: ['10:00', [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private dialogRef: MatDialogRef<CreateEventDialogComponent>,
    private fb: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {}

  createEvent(uid: string) {
    return this.eventService.createEvent(uid, this.form.value).then(() => {
      this.dialogRef.close();
    });
  }
}
