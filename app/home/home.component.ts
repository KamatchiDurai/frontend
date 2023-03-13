import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accountResponse: any;
  
  constructor(public authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onGetAccount(): void {
    const apiUrl = 'http://demo7675902.mockable.io/student/account';
    this.http.get(apiUrl).subscribe(response => {
      this.accountResponse = response;
    });
  } 

}
