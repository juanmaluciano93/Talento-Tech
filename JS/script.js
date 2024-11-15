//Agrego accion a los botones del trailer
function ocultarMostrar(button) {
    const videoContainer = button.parentElement.querySelector(".video");
    if (videoContainer.style.display === "none" || videoContainer.style.display === "") {
        videoContainer.style.display = "block";
        button.innerHTML = "Ocultar trailer"
        button.style.background = "orange"
        button.style.color = "darkred"
    } else {
        videoContainer.style.display = "none";
        button.innerHTML = "Mostrar trailer"
        button.style.background = "darkred"
        button.style.color = "yellow"
    }
}

