/** Affichage de la 1ere Modale */

function displayFirstModal() {
const modalContainer = document.querySelector(".containerModal");
const closeModal = document.querySelector(".closeModal");
const modify = document.querySelector(".modification")


modify.addEventListener("click", () => {
    modalContainer.style.display = "block"
})
closeModal.addEventListener("click", () => {
    modalContainer.style.display = "none"
})
modalContainer.addEventListener("click", (e) => {
    
    if (e.target.className == "containerModal") {
        modalContainer.style.display = "none";
    }
})
}
displayFirstModal()


/** Récupération des works et Affichage des works dans la modale*/

async function displayWorks() {
    const galeriePhoto = document.querySelector(".galeriePhoto")

    galeriePhoto.innerHTML = ""
    const galerie = await getWorks()
   /**Création des works et des icones  */ 
    galerie.forEach(photo => {
        
        const div = document.createElement("div")
        
        const img = document.createElement("img")
        const span = document.createElement("span")
        const trash = document.createElement("i")
        trash.classList.add("div-trash")
        trash.classList.add("fa-solid", "fa-trash-can")
         
        trash.id = photo.id
        img.src = photo.imageUrl
        
        span.appendChild(trash)
        div.appendChild(span)
        div.appendChild(img)
        
        galeriePhoto.appendChild(div)
    })
   deletePhoto()
}
displayWorks()

/**Fonctin pour effectue la Supression d'un work dans la 1ere modale */
function deletePhoto() {
    const trashs = document.querySelectorAll(".fa-trash-can")
    trashs.forEach(trash => {
        trash.addEventListener("click", (e) => {
            e.preventDefault()
            const id = trash.id;
            const init = {
                method:"DELETE",
                headers: {
                    
                    "content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            }
            fetch("http://localhost:5678/api/works/" +id,init)
            
           
            .then (() => {
                
                
                displayWorks();
                affichageWorks()
                
            })
            
            })
        })
    }

/*** Faire appraitre la 2eme modale a partir du bouton ajouter une photo */

const btnAddPhoto = document.querySelector(".ajoutPhoto")
const modalAddPhoto = document.querySelector(".modalAddPhoto")
const modal = document.querySelector(".modal")
const arrow = document.querySelector(".arroow")
const clooseModal = document.querySelector(".clooseModal")
const modalContainer = document.querySelector(".containerModal");
function displayAddPhoto() {
  btnAddPhoto.addEventListener("click",() => {
    modalAddPhoto.style.display = "block"
    modal.style.display = "none"
    
})

/**retour en arriere si click sur fleche*/ 
const photo = document.querySelector(".containerphoto img")


  arrow.addEventListener("click", () => {
    photo.src = ""
    labelFile.style.display = "flex"
    pFile.style.display ="block"
    
    modal.style.display = "block"
    modalAddPhoto.style.display = "none"
   
    
  })

/**fermeture de la modale */
  clooseModal.addEventListener("click", () => {
    modalContainer.style.display = "none"
    modalAddPhoto.style.display = "block"
})
}
displayAddPhoto()

/** Faire la prévisualtision de l'image */

const prevImg = document.querySelector("#previewImage")
const inputFile = document.querySelector("#file")
const labelFile = document.querySelector(".containerphoto label")

const pFile = document.querySelector(".containerphoto p")

console.log(inputFile)


/**Ecouter les changements sur l'input file */
inputFile.addEventListener("change",()=> {
    const file = inputFile.files[0]
    console.log(file);
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            prevImg.src = e.target.result
            prevImg.style.display = "block"
            labelFile.style.display = "none"
            iconePhoto.style.display = "none"
            pFile.style.display = "none"
        }
            reader.readAsDataURL(file);
    } else {
        
        prevImg.style.display = "none"
        
    } 
})

/** Créer une liste de catégories dans l'input select */
async function displayCategoryModal () {
    const select = document.querySelector(".modalAddPhoto select")
    const categorys = await getCategorys()
    categorys.forEach(category => {
        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
    })
}
displayCategoryModal()

/** Utilisation de la méthode POST pour ajouter un nouveau work */


const form = document.querySelector(".modalAddPhoto form")
const title = document.querySelector(".modalAddPhoto #title")
const category = document.querySelector(".modalAddPhoto #category")
const photo = document.querySelector(".containerphoto img")
const iconePhoto = document.querySelector(".containerphoto span")
function addNewWork(){
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    
    fetch("http://localhost:5678/api/works", {
        method:"POST",
        body: formData,
        headers: {
            "Authorization": "Bearer " + token,
        }
    
    })
    
    .then(() => {
      
        displayFirstModal();
        displayWorks()
        affichageWorks()
        form.reset()
        modalAddPhoto.style.display = "none";
        modal.style.display = "block";
        labelFile.style.display = "flex";
        pFile.style.display = "block"
        iconePhoto.style.display = "flex"
        photo.src = ""
        title.value = ""
        
        
    })
})
}
addNewWork()

//** fonction qui verifie si tous les inputs sont bien remplies avant validation */
function verif() {
    const buttonValid = document.querySelector(".modalAddPhoto button")
    const photo = document.querySelector(".containerphoto img")
    form.addEventListener("input", () => {
        
        if (!title.value == "" && !inputFile.files[0] == "") {
            buttonValid.classList.add("validation");
            buttonValid.disabled = false
            
    } else {
            buttonValid.classList.remove("validation");
            buttonValid.disabled = true
            
            
        }
    })
}
verif()


 