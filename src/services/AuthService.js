import ConnectionService from 'services/ConnectionService'

class AuthService {
   static auth = ConnectionService.auth;
   static db = ConnectionService.db;
   static storageKey = 'BICYLIFE';

   static registration = ( data ) => {
      const promise = AuthService.auth.createUserWithEmailAndPassword(data.email, data.password);
      return promise;
   }

   static login = (data) => {
      const promise = AuthService.auth.signInWithEmailAndPassword(data.email, data.password);
      return promise;
   }

   static saveUser = (data) => {
      const promise = AuthService.db.ref('users/' + data.uid).set({
         name: data.name,
         lastname: data.lastname,
         email: data.email,
         profile_picture : 'default.jpg'
      });
      return promise;
   }

   static isLoggedIn = () => {
      return new Promise((resolve, reject) => {
         AuthService.auth.onAuthStateChanged(function (user) {
            if (user) {
               resolve(user)
            } else {
               reject(console.log())
            }
         })
      })
   }

   static logOut = () => {
      const promise = AuthService.auth.signOut();
      return promise;
   }

   static isAuthenticated = () => {
      return !!localStorage.getItem(AuthService.storageKey);
   };

   static getSession = () => {
      return (localStorage.getItem(AuthService.storageKey) != null ) ? JSON.parse(localStorage.getItem('BICYLIFE')) : {};
   }

   static saveSessionUser = (user) => {
      window.localStorage.setItem(AuthService.storageKey, JSON.stringify(user));
   }

   static removeSessionUser = () => {
      window.localStorage.removeItem(AuthService.storageKey);
   }
}

export default AuthService;