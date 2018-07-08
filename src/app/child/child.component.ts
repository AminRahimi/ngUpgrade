import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  onOpenModalClick() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        firstName: 'Amin'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed : ', result);
    });

  }

  ngOnInit() {
  }

}
