import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  inputData: string = '';
  response: any;
  urlList: any[] = [];
  tldList: any[] = [];
  scrapedDataList: any[] = [];
  invalidUrl: boolean = false;
  inputValid: boolean = false;
  errorText: string = '';
  scrapURL: string = '';
  headers = new HttpHeaders({
    'X-XSRF-TOKEN': 'your-csrf-token-value-another-one' // Replace with your actual CSRF token
  });

  constructor(private http: HttpClient) { }

  displayError(errorText: string) {
    this.errorText = errorText;
    this.invalidUrl = true;
    setTimeout(() => {
      this.invalidUrl = false;
      this.errorText = '';
    }, 2000);
  }

  submitScrap(scrapURL: string) {


    const data = { scrapURL };

    this.http.post<any[]>('http://127.0.0.1/laravel-scrapper/public/scrap', data, { headers: this.headers }).subscribe(
      (response : any) => {

        if(response.error) this.displayError(response?.error);

        this.scrapedDataList = response;
      },
      (error) => {
        this.displayError(error.message);

      }
    );
  }

  handleSubmit(inputData: string) {

    if ((inputData.split('https')[0] === '' || inputData.split('http')[0] || inputData.split('www')[0]) && inputData.includes('.')) {
      let siteExtension = inputData.split('.')[inputData.split('.').length - 1].toUpperCase();

      siteExtension = siteExtension.includes('/') ? siteExtension.split('/')[0] : siteExtension;

      if (this.tldList.includes(siteExtension)) {

        const data = { inputField: inputData };


        this.http.post<any[]>('http://127.0.0.1/laravel-scrapper/public/', data, { headers: this.headers }).subscribe(
          (response) => {
            this.response = response;

            let name = this.inputData;

            if (this.response.message == 'URL added!') {
              this.urlList.push({ name: inputData });
              this.inputData = '';
            }

            setTimeout(() => {
              this.response = '';
            }, 2000);
          },
          (error) => {
            this.displayError(error.message);

          }
        );


      } else {

        this.displayError("URL's tld doesn't exist");
      }
    } else {
      this.displayError("Invalid URL format. It must start with 'http://' or 'https://'<br> and end with an extension");
    }
    this.inputData = '';

  }


  onSubmit() {
    this.handleSubmit(this.inputData);
  }

  ngOnInit() {
    this.fetchDataUrls();
    this.fetchUrlTldList();
  }

  fetchDataUrls() {

    this.http.get<any[]>('https://localhost/laravel-scrapper/public/urls', { headers: this.headers }).subscribe(
      (data) => {

        this.urlList = data;
        this.inputData = '';
      },
      (error) => {
        this.displayError(error.message);
      }
    );
  }

  fetchUrlTldList() {
    this.http.get<any[]>('../assets/tldsList.json').subscribe(
      (data) => {
        this.tldList = data;
      },
      (error) => {
        this.displayError(error.message);
      }
    );
  }
}




