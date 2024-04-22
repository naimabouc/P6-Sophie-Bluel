
const token = window.sessionStorage.getItem("token");
const user = window.sessionStorage.getItem("userId");
const logOut = document.getElementById("login-link");
const form = {
    email: document.querySelector("form #email"),
    password: document.querySelector("form #password"),
    
};

const bta = document.querySelector("#connexion");

const messageErreur = document.querySelector("p");

/********Ecouteur d'évènement du Form de conexion***********/
// recupération de l'email et du password via les inputs

bta.addEventListener("click", (e) => {
    e.preventDefault();
    const userEmail = email.value;
    const userPassword = password.value;
    console.log(userEmail, userPassword);
    const login = {
        email: userEmail,
        password: userPassword,
    }

/****Envoi de la requette****/
    const url = 'http://localhost:5678/api/users/login';
    const user = JSON.stringify(login)
    fetch(url, {
        method: "POST",
        headers: {

            "Content-Type": "application/json",
        },
        body: user,
        })

 // recupération de la réponse de la base de donnée
          .then((response) => {
          
            
            if (!response.ok) {
              
              messageErreur.textContent = "votre email ou votre mot de passe est incorrect"; 
               
            } else {
             return response.json()
            
             .then((data) => {
// Récupération des donnés Token et id de l'utilisateur une fois la response terminé
              const userId = data.userId;
              const userToken = data.token;
              window.sessionStorage.setItem("token", userToken);
              window.sessionStorage.setItem("userId", userId);
              window.location.href = "./index.html";
              console.log(data)
              
             }
             )}
            })   
          })
        