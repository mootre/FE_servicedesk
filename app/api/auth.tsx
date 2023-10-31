import { BehaviorSubject } from 'rxjs';

const userSubject = new BehaviorSubject(process.browser)

function authlogin(credentials){
    return fetch("http://10.15.0.23:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }).then((data) => data.json());
  }
   

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    authlogin
}