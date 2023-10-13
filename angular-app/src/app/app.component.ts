import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  inputData: string = '';
  response: any;
  urlForm: FormGroup;

  // constructor(private http: HttpClient) {}

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.urlForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('^(http|https)://.*$')]],
    });
  }


  
  onSubmit() {
      // if (this.urlForm.valid) {
      // Create an object to send in the POST request
      const data = { inputField: this.inputData };
      console.log(data);

      // Send a POST request to your Laravel backend
      this.http.post('http://localhost/laravel-scrapper/public/', data).subscribe(
        (response) => {
          this.response = response;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  // }
}
