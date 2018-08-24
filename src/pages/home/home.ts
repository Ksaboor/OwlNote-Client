import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	questions: any[];
	currentQuestion: string;
	currentQuestionIdx: number = 0;
	answer: string = 'Yo ';
	response = {response: ''};
	handler = this.submit;

	constructor(public navCtrl: NavController, private http: HttpClient) {
	  this.getQuestion();
  }
postResponse(){
	console.log(this.response);
   this.http.post('http://localhost:8080/journalResponse/responses', this.response).subscribe(
		 response => {
			 console.log(response);
	//this.currentQuestion = this.questions[this.currentQuestionIdx].question;
		 }
	 )
}
//npm run dev

  getQuestion(){
    this.http.get('http://localhost:8080/questions/Getquestions').subscribe(
			(response: Array<Question>) => {
				console.log('get questions response', response);
				this.questions = response;
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
		if(this.currentQuestionIdx < this.questions.length - 1){
		this.currentQuestionIdx += 1;
		} else {this.questions.push({id:this.questions.length,question:"Thank you for answering all of your questions."});
	this.currentQuestionIdx += 1;}
		this.response = {response:''};
		this.currentQuestion = this.questions[this.currentQuestionIdx].question;

		//location.reload();
    //console.log('the answer', this.answer);
  }
}

export interface Question{
  id: number,
  question: string
}