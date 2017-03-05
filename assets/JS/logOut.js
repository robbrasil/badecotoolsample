//Get elements
const signoutBtn = document.getElementById("btnSignout");
//Add Sign Out event
signoutBtn.addEventListener("click", e=>{
    firebase.auth().signOut();
    window.location.href = "login.html";
});