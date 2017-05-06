import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {PersonService} from "../../person/service/personService";
import {Person} from "../../person/model/person";
import {HelpOptions} from "../../help/model/helpOptions";
import {FilmService} from "../../film/service/filmService";
import {PlanetService} from "../../planet/service/planetService";
import {SpecieService} from "../../specie/service/specieService";
import {StarshipService} from "../../starship/service/starshipService";
import {VehicleService} from "../../vehicle/service/vehicleService";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private personCount = 10;
  private persons = [];
  private personToGuessIndex: number;
  private helpOptions: HelpOptions;

  constructor(public navCtrl: NavController, private personService: PersonService, private filmService: FilmService, private planetService: PlanetService, private specieService: SpecieService, private starshipService: StarshipService, private vehicleService: VehicleService, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.getPersonCount();
  }

  private loadPersonsData(maxIndex: number) {
    let randomizedNumbers = [];
    this.persons = [];
    this.personToGuessIndex = this.randomPersonIndex(this.personCount) - 1;
    this.helpOptions = new HelpOptions();
    for (let i = 0; i < this.personCount; i++) {
      let random = this.randomPersonIndex(maxIndex);
      while (randomizedNumbers.indexOf(random) > -1) {
        random = this.randomPersonIndex(maxIndex);
      }
      randomizedNumbers.push(random);
      this.personService.loadPerson(random)
        .subscribe(response => this.addToPersons(response.json()), error => this.loadPersonsData(maxIndex));
    }
  }

  private randomPersonIndex(maxIndex: number): number {
    return Math.floor(Math.random() * maxIndex) + 1;
  }

  private addToPersons(response) {
    let person = response as Person;
    this.persons.push(person);
  }

  private getPersonCount() {
    this.personService.getPersonsCount()
      .subscribe(response => this.loadPersonsData(response.json().count));
  }

  private giveMeHelp() {
    if (!this.helpOptions.birth_year) {
      return this.showBirthYear();
    }
    if (!this.helpOptions.eye_color) {
      return this.showEyeColor();
    }
    if (!this.helpOptions.films) {
      this.helpOptions.films = true;
      return this.filmService.getFilm(this.persons[this.personToGuessIndex].films[0])
        .subscribe(response => this.showFilmTitle(response.json()));
    }
    if (!this.helpOptions.gender) {
      return this.showGender();
    }
    if (!this.helpOptions.hair_color) {
      return this.showHairColor();
    }
    if (!this.helpOptions.height) {
      return this.showHeight();
    }
    if (!this.helpOptions.homeworld) {
      return this.planetService.getPlanet(this.persons[this.personToGuessIndex].homeworld)
        .subscribe(response => this.showHomeWorld(response.json()));
    }
    if (!this.helpOptions.mass) {
      return this.showMass();
    }
    if (!this.helpOptions.skin_color) {
      return this.showSkinColor();
    }
    if (!this.helpOptions.species) {
      this.helpOptions.species = true;
      return this.specieService.getSpecie(this.persons[this.personToGuessIndex].species[0])
        .subscribe(response => this.showSpecie(response.json()));
    }
    if (!this.helpOptions.starships) {
      this.helpOptions.starships = true;
      return this.starshipService.getStarship(this.persons[this.personToGuessIndex].starships[0])
        .subscribe(response => this.showStarship(response.json()));
    }
    if (!this.helpOptions.vehicles) {
      this.helpOptions.vehicles = true;
      return this.vehicleService.getVehicle(this.persons[this.personToGuessIndex].vehicles[0])
        .subscribe(response => this.showVehicle(response.json()));
    }
    return this.showToast("There is no more tips, guess :)");
  }

  private showBirthYear() {
    this.helpOptions.birth_year = true;
    this.showToast("His/Her year of birth is " + this.persons[this.personToGuessIndex].birth_year);
  }

  private showEyeColor() {
    this.helpOptions.eye_color = true;
    this.showToast("His/Her eyes color is " + this.persons[this.personToGuessIndex].eye_color);
  }

  private showFilmTitle(json) {
    this.showToast("He/She appeared in " + json.title);
  }

  private showGender() {
    this.helpOptions.gender = true;
    this.showToast("His/Her gender is " + this.persons[this.personToGuessIndex].gender);
  }

  private showHairColor() {
    this.helpOptions.hair_color = true;
    this.showToast("His/Her hair color is " + this.persons[this.personToGuessIndex].hair_color);
  }

  private showHeight() {
    this.helpOptions.height = true;
    this.showToast("His/Her height is " + this.persons[this.personToGuessIndex].height + "cm");
  }

  private showHomeWorld(json) {
    this.helpOptions.homeworld = true;
    this.showToast("His/Her home world is " + json.name);
  }

  private showMass() {
    this.helpOptions.mass = true;
    this.showToast("His/Her mass is " + this.persons[this.personToGuessIndex].mass + "kg");
  }

  private showSkinColor() {
    this.helpOptions.skin_color = true;
    this.showToast("His/Her skin color is " + this.persons[this.personToGuessIndex].skin_color);
  }

  private showSpecie(json) {
    this.showToast("His/Her specie is " + json.name);
  }

  private showStarship(json) {
    this.showToast("His/Her starship is " + json.name);
  }

  private showVehicle(json) {
    this.showToast("His/Her vehicle is " + json.name);
  }

  private showToast(s: string) {
    this.toastCtrl.create({
      message: s,
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  private nameClicked(person: Person) {
    if (this.persons.indexOf(person) == this.personToGuessIndex) {
      this.showToast("CORRECT");
    }
    else {
      this.showToast("INCORRECT");
    }
  }
}
