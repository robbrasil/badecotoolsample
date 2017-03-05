//Get elements
const emailTxt = document.getElementById('txtEmail');
const passwordTxt = document.getElementById('txtPassword');
const loginBtn = document.getElementById('btnLogin');
const signUpBtn = document.getElementById('btnSignUp');
//const btnSignout = document.getElementById('btnSignout');

//Add login event
btnLogin.addEventListener('click', e => {
    console.log('testing');
    const email = emailTxt.value;
    const pass = passwordTxt.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

//Add sign up event
signUpBtn.addEventListener('click', e => {
   
    
   
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});
//Add real time listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser + "logged in!");
        window.location.href = "installations.html";

    } else {
        console.log("User not logged in");
    }

})