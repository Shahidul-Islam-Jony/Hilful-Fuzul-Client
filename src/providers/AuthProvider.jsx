import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  FacebookAuthProvider,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  sendEmailVerification
} from "firebase/auth";
import app from "../firebase/firebase.config";
import swal from "sweetalert";



const fbProvider = new FacebookAuthProvider();

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // user creating by email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user
  const updateUser = (name, photoUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  // login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const loginByGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Sign In with Facebook
  const loginByFB = () => {
    setLoading(true);
    return signInWithPopup(auth, fbProvider);
  };

  // logout user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

// Match password and email
  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
  
    return reauthenticateWithCredential(user, credential);
  };

  // update password
  const updatePass = (currentPassword, newPassword) => {
    reauthenticate(currentPassword).then(() => {
      const user = auth.currentUser;
      updatePassword(user, newPassword).then(() => {
        // console.log("Password updated successfully");
        swal("Password updated successfully", "success");
      }).catch((error) => {
        // console.error("Error updating password: ", error);
        swal("Oops", { error }, "error");
      });
    }).catch(() => {
      // console.error("Error re-authenticating: ", error);
      swal("Oops","Password did not match", "error");
    });
  };


  // Update Email
  // const updateEmailHandler = (currentPassword, newEmail) => {
  //   reauthenticate(currentPassword).then(() => {
  //     const user = auth.currentUser;
  //     updateEmail(user, newEmail).then(() => {
  //       console.log("Email updated successfully");
  //       swal("Email updated successfully", "success");
  //     }).catch((error) => {
  //       console.error("Error updating email: ", error);
  //       swal("Oops","Error updating email", "error");
  //     });
  //   }).catch((error) => {
  //     console.error("Error re-authenticating: ", error);
  //     swal("Oops", "Email or Password doesn't match", "error");
  //   });
  // };
  
  
  // const updateEmailForUser = async(currentPassword, newEmail) => {
  //   const user = auth.currentUser;
  //   const credential = EmailAuthProvider.credential(user.email, currentPassword);
  
  //   return reauthenticateWithCredential(user, credential)
  //     .then(async() => await sendEmailVerification(user))
  //     .then(async() => await updateEmail(user, newEmail))
  //     .then(() => {
  //       // Show success message
  //       swal("Email updated successfully", {
  //         icon: "success",
  //       });
  //     })
  //     .catch((error) => {
  //       // Show error message
  //       swal("Oops", error.message, "error");
  //     });
  // };


  const updateEmailForUser = (currentPassword, newEmail) => {
    reauthenticate(currentPassword)
      .then(() => {
        const user = auth.currentUser;
        return updateEmail(user, newEmail);
      })
      .then(() => {
        swal("Success", "Email updated successfully", "success");
      })
      .catch((error) => {
        swal("Error", error.message, "error");
      });
  };



  // User observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUser,
    logout,
    login,
    loginByGoogle,
    loginByFB,
    updatePass,
    // updateEmailHandler,
    updateEmailForUser
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
