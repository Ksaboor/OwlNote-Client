import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	currentQuestion: string;
	answer: string = 'Yo ';
	response = {response: ''};

	constructor(public navCtrl: NavController, private http: HttpClient) {
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
//npm run dev

  getQuestion(){
    this.http.get('http://localhost:8080/questions/Getquestions').subscribe(
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
    //console.log('the answer', this.answer);
  }
}

export interface Question{
  id: number,
  question: string
}