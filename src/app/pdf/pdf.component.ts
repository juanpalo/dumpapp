import { Component, OnInit,Inject } from '@angular/core';
import * as jsPDF from 'jspdf'
import { Router  } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class PdfComponent implements OnInit {

  constructor(private route: Router,public afAuth:AngularFireAuth,
    @Inject('Window') private window: Window,
  ) { }

  download() {

    var doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');

    // Save the PDF
    doc.save('Test.pdf');
}

  ngOnInit() {
    if (!this.afAuth.auth.currentUser) {
      this.route.navigate(['']);
   }
  }

}
