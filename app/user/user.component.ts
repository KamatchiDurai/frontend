import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  addressResponse: any;

  constructor(public authService: AuthService, 
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  onGetAddress(): void {
    const apiUrl = 'http://demo7675902.mockable.io/student/address';
    this.http.get(apiUrl).subscribe(response => {
      this.addressResponse = response;
    });
  } 

}
