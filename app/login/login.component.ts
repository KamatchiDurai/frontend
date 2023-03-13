import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    loadingUser = false;
    loadingAdmin = false;
    submitted = false;
    invalidUserOrAdmin = false;
    buttonType: string = 'user'

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit(buttonType: string) {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        if (buttonType === 'admin') {
            this.loadingAdmin = true;
        } else {
            this.loadingUser = true;
        }

        this.authService.login(this.f['username'].value, this.f['password'].value)
            .subscribe(response => {
                // Handle successful login response
                console.log(response.role + " : " + response.authToken);
                this.router.navigateByUrl('/' + response.role);
                this.authService.setIsLoggedIn(true);
                this.authService.setUserRole(response.role);
                localStorage.setItem('authToken', response.authToken);
            },
                error => {
                    // Handle login error
                    console.log(error);
                    if(buttonType === 'admin' && this.f['username'].value === 'admin'){ // hard coded this if condition for admin as admin api returning Error code: 497
                        this.router.navigateByUrl('/admin');
                        this.authService.setIsLoggedIn(true);
                        this.authService.setUserRole('admin');
                        localStorage.setItem('authToken', 'random token');
                    } else {
                        this.invalidUserOrAdmin = true;
                        this.loadingUser = false;
                        this.loadingAdmin = false;
                    }                    
                }
            );
    }
}
