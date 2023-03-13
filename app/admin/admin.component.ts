import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  gradesResponse:any

  constructor(public authService:AuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onGetGrades(): void {
    const apiUrl = 'http://demo7675902.mockable.io/student/grades';
    this.http.get(apiUrl).subscribe(response => {
      this.gradesResponse = response;
    });
  } 

}
