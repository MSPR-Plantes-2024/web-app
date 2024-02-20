import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications: any[] = [];
  botanists: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
     
    this.http.get<any[]>('URL_DE_VOTRE_API_PUBLICATIONS').subscribe(data => {
      this.publications = data;
    });

     this.http.get<any[]>('URL_DE_VOTRE_API_BOTANISTS').subscribe(data => {
      this.botanists = data;
    });
  }
}
