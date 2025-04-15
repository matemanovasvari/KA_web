const cursorDot = document.querySelector("[data-cursor-dot]");

window.addEventListener("mousemove", function(e){
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`;
});

const currentYear = new Date().getFullYear();

document.getElementById("releaseYear").setAttribute("max", currentYear);

function openAddAlbumForm(){
    document.getElementsByClassName("add-album")[0].style.display = "flex";
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
    }
    document.getElementsByClassName("add-album")[0].style.transform = "scale(100%)";
}