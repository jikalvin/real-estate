import * as React from "react";
// import * as firebase from "firebase/compat/app";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";

const FirebaseAuthContext = React.createContext(undefined);

function FirebaseAuthProvider({ children }){
  const [user, setUser] = React.useState(null);
  const value = { user };

  React.useEffect(() => {
    // const unsubscribe = onAuthStateChanged(setUser);
    onAuthStateChanged(auth, (user) => {
        if (user) {

          setUser(user)
          console.log("User is signed in");
  
        } else {
          console.log("User is signed out");
        }
      });
  
    }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
    const context = React.useContext(FirebaseAuthContext);
    if (context === undefined) {
      throw new Error(
        "useFirebaseAuth must be used within a FirebaseAuthProvider"
      );
    }
    return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };