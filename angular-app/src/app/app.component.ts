import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  inputData: string = '';
  response: any;
  urlForm: FormGroup;
  urlList: any[] = [];
  tldList: any[] = [];
  newUrl: string = '';
  invalidUrl: boolean = false;
  inputValid: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.urlForm = this.fb.group({
      url: ['', [Validators.required]],
    });
  }



  displayError() {
    this.invalidUrl = true;
    setTimeout(() => {
      this.invalidUrl = false;
    }, 1500);
  }


handleSubmit(inputData:string){

  if (inputData.split('https')[0] === '' || inputData.split('http')[0] || inputData.split('www')[0] && inputData.includes('.')) {

    let siteExtension = inputData.split('.')[inputData.split('.').length - 1].toUpperCase();

    if (this.tldList.includes(siteExtension)) {


      const data = { inputField: inputData };

      const headers = new HttpHeaders({
        'X-XSRF-TOKEN': 'your-csrf-token-value' // Replace with your actual CSRF token
      });

      this.http.post<any[]>('http://127.0.0.1/laravel-scrapper/public/', data, { headers: headers }).subscribe(
        (response) => {
          this.response = response;
          this.urlList.push({ 0: this.inputData });
          setTimeout(() => {
            this.response = '';
          }, 1500);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {

      this.displayError();
    }
  } else {
    this.displayError();
  }

}


  onSubmit() {
    this.handleSubmit(this.inputData);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.get<any[]>('https://localhost/laravel-scrapper/public/urls', { headers }).subscribe(
      (data) => {

        this.urlList = data;
        this.inputData = '';
        // console.log(this.urlList, 'yes');

      },
      (error) => {
        console.error('Error:', error);
      }
    );


    this.http.get<any[]>('../assets/tldsList.json').subscribe(
      (data) => {
        // Handle the data here
        // console.log(data);
        this.tldList = data;
        // console.log(this.tldList, 'tldList');
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}




