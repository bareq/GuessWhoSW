import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {PersonService} from "../person/service/personService";
import {HttpModule} from "@angular/http";
import {FilmService} from "../film/service/filmService";
import {PlanetService} from "../planet/service/planetService";
import {VehicleService} from "../vehicle/service/vehicleService";
import {SpecieService} from "../specie/service/specieService";
import {StarshipService} from "../starship/service/starshipService";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PersonService,
    FilmService,
    PlanetService,
    VehicleService,
    SpecieService,
    StarshipService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
