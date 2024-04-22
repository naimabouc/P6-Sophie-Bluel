const gallery = document.querySelector(".gallery")
const filters = document.querySelector(".filters")
const logOut = document.getElementById("login-link");
const token = window.sessionStorage.getItem("token");
const user = window.sessionStorage.getItem("userId");
const adminText = "Mode édition";
const adminLogo = `<i class="fa-regular fa-pen-to-square"></i>`;
const adminConexionUP = `<div class="admin-edit">
                    <p>${adminLogo}${adminText}</p>
                        </div>`;

/* Recuperation des Works depuis l'API*/
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}
getWorks();

/* Affichage des works dans le DOM*/
async function affichageWorks() {
    gallery.innerHTML = ""
    const arrayWorks = await getWorks();
    arrayWorks.forEach((work) => {
        createWorks(work);
    });
}
affichageWorks();

function createWorks(work) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
        
    }

/* récupération des boutons via API*/
const boutonTrier = document.querySelector(".btn-trier")

async function getCategorys() {
    const res = await fetch("http://localhost:5678/api/categories");
    return await res.json();
}

async function displayCategoriesBouton() {
    const categories = await getCategorys();
    console.log(categories);
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.classList.add("btn-trier-two")
        btn.textContent = category.name;
        btn.id = category.id;
        filters.appendChild(btn);

    })
}
displayCategoriesBouton();

/* tri par classe les filtres */
async function filterCategory() {
    const works = await getWorks(); 
    
    const buttons = document.querySelectorAll(".filters button");
    
    buttons.forEach((button) => {
        button.addEventListener("click",(e) => {
            buttons.forEach((btn) => {
            btn.classList.remove("validation")
            })
            button.classList.add("validation")
            const btnId = e.target.id;
            gallery.innerHTML = "";
            if (btnId !== "0") {
                
                const worksTriCategory = works.filter((work) => {
                    return work.categoryId == btnId;
                   
                });
                worksTriCategory.forEach((work) => {
                    createWorks(work);
                });
            } else {
                affichageWorks();
                
            }
            
        })

    })
}
filterCategory();


 /*****Partie ou l'utilisateur et conecté*****/
 const modification = document.querySelector(".modification")
 function loginAdmin() {
    if (user) {
      // Modifications si L'utilisateur est connecté
    
      logOut.textContent = "logout";   
       
      modification.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>` + "modifier"
        
     
      filters.style = "display:none";
        
      
      
      //*Créer le bandeau Admin Editor**// 
      
        document.body.insertAdjacentHTML("afterbegin", adminConexionUP);
        
        
    }}
   
    loginAdmin()


    

/****Suprimer le userToken du local storage si click sur log Out******/
function logoutAdmin() {
    logOut.addEventListener("click", () => {
      if (user) {
        window.sessionStorage.setItem("token", "");
        logOut.textContent = "login";
        window.sessionStorage.setItem("userId", "");
        window.location.href = "./index.html";
      } else {
        //renvoi sur page accueil
        window.location.href = "./index.html";
      }
    })
}
logoutAdmin()

