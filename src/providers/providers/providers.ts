import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProvidersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersProvider {
	currentQuestion: string;
	answer: string = 'Yo ';
  response = {response: ''};
  
  constructor(public http: HttpClient) {
    this.getQuestion();
  }
  postResponse(){
    console.log(this.response);
     this.http.post('http://localhost:8080/journalResponse/responses', this.response).subscribe(
       response => {
         console.log(response);
       }
     )
  }
  getQuestion(){
    this.http.get('http://localhost:8080/api/v1/questions').subscribe(
			(response: Array<Question>) => {
        console.log('get questions response', response);
        this.currentQuestion = response[0].question;
			},
			(err) => {
				console.error('get question error', err);
			},
			() => {
				console.log('get questions');
			}
		);
  }

  submit(){
		this.postResponse();
    console.log('the answer', this.answer);
  }
}
export interface Question{
  id: number,
  question: string
}
