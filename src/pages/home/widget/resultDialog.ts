import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import {HomePage} from "../home";
/**
 * Created by bartoszlach on 06.05.2017.
 */
@Component({
  template: `
    <img src="../../../assets/happy_darth.gif">
    <div>
      <p style="text-align: center">SUCCESS</p>
    </div>
    <div style="text-align: center">
      <button ion-button color="title-background" (click)="newGame()">NEW GAME</button>
    </div>
  `
})
export class SuccessDialog {
  private gamePage: HomePage;

  public constructor(private viewController: ViewController, params: NavParams) {
    this.gamePage = params.get('homePages');
  }

  private newGame() {
    this.gamePage.startNewGame();
    this.viewController.dismiss();
  }
}
@Component({
  template: `
    <img src="../../../assets/sad_darth.gif">
    <div>
      <p style="text-align: center">FAILURE</p>
      <p style="text-align: center">It was {{correctAnswer}}</p>
    </div>
    <div style="text-align: center">
      <button ion-button color="title-background" (click)="newGame()">NEW GAME</button>
    </div>
  `
})
export class FailureDialog {
  private correctAnswer: string;
  private gamePage: HomePage;

  public constructor(private viewController: ViewController, params: NavParams) {
    this.correctAnswer = params.get('correctAnswer');
    this.gamePage = params.get('homePages');
  }

  private newGame() {
    this.gamePage.startNewGame();
    this.viewController.dismiss();
  }
}
