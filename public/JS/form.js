function actionForm(event) {
  event.preventDefault()

  let formData = {
    email: event.target[0].value,
    typeComment: event.target[1].value,
    date: event.target[2].value,
    comment: event.target[3].value
  }

  modalComentario.innerHTML = `
  
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title fs-5" id="exampleModalLabel">GRACIAS!!!!</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
         ${formData.email} Gracias por dejarnos tu ${formData.typeComment}, nos pondremos en contacto en la fecha que nos indicaste el ${formData.date}
         </div>
         <div class="modal-footer">
           <button type="button" id="botonModal"class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         </div>
       </div>
     </div>
   </div>
 `
  let botonModal = document.getElementById("botonModal")
  botonModal.addEventListener("click", function () { backHome() })
}

function backHome() {
  setState("paginaANavegar", "home")
  imprimir()
}

