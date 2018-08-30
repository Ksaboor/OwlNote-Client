import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
    this.getQuestion();
    questions: any[];
  }
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

}
