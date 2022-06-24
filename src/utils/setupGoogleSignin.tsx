import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const authStateObserver = (
  user: any,
) => {
  const picEls = Array.from(document.querySelectorAll('.user-pic')) as HTMLElement[];
  const nameEls = Array.from(document.querySelectorAll('.user-name')) as HTMLElement[];
  const signInEls = Array.from(document.querySelectorAll('.sign-in')) as HTMLElement[];
  const signOutEls = Array.from(document.querySelectorAll('.sign-out')) as HTMLElement[];

  if (user) {
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    picEls.forEach((el) => {
      el.style.backgroundImage = `url(${addSizeToGoogleProfilePic(profilePicUrl)})`;
      el.removeAttribute('hidden');
    });

    nameEls.forEach((el) => {
      el.textContent = userName as string;
      el.removeAttribute('hidden');
    });

    signOutEls.forEach((el) => { el.removeAttribute('hidden'); });
    signInEls.forEach((el) => { el.setAttribute('hidden', 'true'); });

    // might need to implement saveMessagingToken?
  } else {
    nameEls.forEach((el) => { el.setAttribute('hidden', 'true'); });
    picEls.forEach((el) => { el.setAttribute('hidden', 'true'); });
    signOutEls.forEach((el) => { el.setAttribute('hidden', 'true'); });
    signInEls.forEach((el) => { el.removeAttribute('hidden'); });
  }
};

const addSizeToGoogleProfilePic = (url: any) => {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return `${url}?sz=150`;
  }
  return url;
};

const signIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

const signOutUser = () => {
  signOut(getAuth());
};

const getProfilePicUrl = () => (
  getAuth().currentUser?.photoURL || '../src/assets/profile_placeholder.png'
);

const getUserName = () => (
  getAuth().currentUser?.displayName
);

const isUserSignedIn = () => (
  !!getAuth().currentUser
);

const initFirebaseAuth = () => {
  onAuthStateChanged(getAuth(), authStateObserver);
};

export {
  initFirebaseAuth,
  authStateObserver,
  signIn,
  signOutUser,
  getUserName,
};
