import {Component, ViewChild} from "@angular/core";
import {List, NavController} from "ionic-angular";
import {PersonService} from "../../person/service/personService";
import {Person} from "../../person/model/person";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(List) list: List;
  private persons = [];

  constructor(public navCtrl: NavController, public personService: PersonService) {
  }

  ionViewDidLoad() {
    this.getPersonCount();
  }

  private loadPersonsData(maxIndex: number) {
    let randomizedNumbers = [];
    for (let i = 0; i < 10; i++) {
      let random = this.randomPersonIndex(maxIndex);
      while (randomizedNumbers.indexOf(random) > -1) {
        random = this.randomPersonIndex(maxIndex);
      }
      randomizedNumbers.push(random);
      this.personService.loadPerson(random)
        .subscribe(response => this.addToPersons(response.json()));
    }
  }

  private randomPersonIndex(maxIndex: number): number {
    return Math.floor(Math.random() * maxIndex) + 1;
  }

  private addToPersons(response) {
    let person = response as Person;
    this.persons.push(person);
    console.log(person.name);
  }

  private getPersonCount() {
    this.personService.getPersonsCount()
      .subscribe(response => this.loadPersonsData(response.json().count));
  }

  private giveMeHelp() {
  }
}
