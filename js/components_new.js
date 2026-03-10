async function loadComponent(id, file){

const response = await fetch(file)
const html = await response.text()

document.getElementById(id).innerHTML = html

}

/* load components */

async function initComponents(){

await loadComponent("navbar","components/navbar_new.html")
await loadComponent("footer","components/footer_new.html")

/* mobile menu logic AFTER navbar exists */

const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")

if(menuToggle){
menuToggle.addEventListener("click", () => {
navLinks.classList.toggle("active")
})
}

}

initComponents()