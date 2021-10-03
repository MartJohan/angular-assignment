import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';
import { Observable } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  retry,
  switchMap,
  tap,
} from 'rxjs/operators';
import { PokemonResponse, Pokemon } from '../models/pokemon.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _trainer: Trainer | undefined;
  private pokemon : Pokemon[] = [];
  public attempting: boolean = false;
  private error: string = '';

  private baseURL = environment.apiBaseUrl;
  private key = environment.apiKey;

  constructor(
    private http: HttpClient,
    private readonly sessionService: SessionService
  ) {
    const storedTrainer = localStorage.getItem('trainer');
    if (storedTrainer) {
      this._trainer = JSON.parse(storedTrainer) as Trainer;
    }
  }

  get trainer(): Trainer | undefined {
    return this.trainer;
  }
  //Sets local storage to false or true depending on the value given
  changeLoggedIn(value: boolean) {
    if (value) {
      localStorage.setItem('LoggedIn', '1');
    } else {
      localStorage.setItem('LoggedIn', '0');
    }
  }
  //Handles the change trainer process
  changeTrainer(value: any) {
    if (value === null) {
      localStorage.setItem('trainer', '');
    } else {
      localStorage.setItem('trainer', JSON.stringify(value));
    }
  }

  //HTTP calls

  //Get user based on username
  private findTrainerByUsername(username: string): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.baseURL}?username=${username}`);
  }
  //Post user based on username
  private createTrainer(username: string): Observable<Trainer> {
    
    const headers = new HttpHeaders({
      'x-api-key': this.key,
    });
    return this.http.post<Trainer>(
      `${this.baseURL}`,
      { 'username' : username, 'pokemon' : this.pokemon  },
      { headers }
    );
  }
  //Authenticate the user
  public authenticate(username: string, onSuccess: () => void): void {
    this.attempting = true;

    const mapToRegister = (trainers: Trainer[]): Observable<Trainer> => {
      if (trainers.length) {
        return of(trainers[0]);
      }
      return this.createTrainer(username);
    };

    const catchRequestError = (trainer: Trainer) => {
      return throwError('Could not create trainer');
    };

    const tapToSession = (trainer: Trainer) => {
      this.sessionService.setTrainer(trainer);
    };

    const finalizeRequest = () => (this.attempting = false);
    //finds trainer by username
    this.findTrainerByUsername(username)
      .pipe(
        retry(3),
        switchMap(mapToRegister),
        tap(tapToSession),
        catchError(catchRequestError),
        finalize(finalizeRequest)
      )
      .subscribe(
        (trainer: Trainer) => {
          onSuccess();
        },
        (error: string) => {
          this.error = error;
        }
      );
  }
  //Patch the specific pokemon to the user
  patchUserPokemon(trainer: Trainer, pokemon: Array<Pokemon>, onSuccess : () => void) : void {
    this.http
      .patch(`${this.baseURL}/${trainer.id}`, {pokemon : pokemon}, {
        headers: { 'x-api-key': this.key },
      })
      .subscribe((response) => {
        localStorage.setItem("trainer",JSON.stringify(response))
        this.sessionService.setTrainer(response as Trainer);
        onSuccess();
      });
  }
}
