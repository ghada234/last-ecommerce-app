import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ignoreElements, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/Models/Address';
import { IUser } from '../shared/Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baserUrl:string=environment.apiUrl;

  //instead of using behaviour subject user replay subject because behaviour wubject immediately emit itis intitial value null
  //and that is cause authguard to go to login page and not activated route checkout

  // private currentUserSource=new BehaviourSubject<IUser>(null);

  //(1) is the number of values that replaysubject could hold
  // private currentUserSource=new ReplaySubject<IUser>(1);
  private currentUserSource=new BehaviorSubject<IUser>(null);

  //observable current user
  currentUser$=this.currentUserSource.asObservable();


  constructor(private http:HttpClient,private router:Router) { }

  //login method
  login(values:any){

    return this.http.post<IUser>(`${this.baserUrl}account/login`,values).pipe(map((user:IUser)=>{

      if(user){
        localStorage.setItem("token-skynet",user.token);
        this.currentUserSource.next(user);
   
      }
   
    }));
  }

  //register method
  register(values:any){
    return this.http.post<IUser>(`${this.baserUrl}account/register`,values).pipe(map((user:IUser)=>{
      if(user){
        localStorage.setItem("token-skynet",user.token)
        this.currentUserSource.next(user);
      }

    }));

  }

  //logout method
  logOut(){
    localStorage.removeItem("token-skynet");
    this.currentUserSource.next(null);
    //return to home
    this.router.navigateByUrl('/');

  }

  //check email exist
  checkEmialExist(email:string){
    return this.http.get(`${this.baserUrl}account/emailexist?email=${email}`);
  }

  //load current user method
  LoadCurrrentUser(token:string){
    let headers=new HttpHeaders();
    headers=headers.set("Authorization",`Bearer ${token}`);
    return this.http.get<IUser>(`${this.baserUrl}account`,{headers}).pipe(map((user:IUser)=>{
      localStorage.setItem("token-skynet",user.token);
      this.currentUserSource.next(user);

    }))


  }

  //get current user value method
   getCurrentUserValue(){
     return this.currentUserSource.value;
     console.log( this.currentUserSource.value);
   }

  //get UserAdress
   getUserAddress(){
     return this.http.get<IAddress>(`${this.baserUrl}account/address`);
   }

   //updateuser address method
   updateUserAddress(address:IAddress){
     return this.http.put<IAddress>(`${this.baserUrl}account/address`,address);
   }

}
