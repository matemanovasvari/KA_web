const cursorDot = document.querySelector("[data-cursor-dot]");

window.addEventListener("mousemove", function(e){
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`;
});

const currentYear = new Date().getFullYear();

document.getElementById("releaseYear").setAttribute("max", currentYear);

//open and close add album
document.getElementById("open_add_album_tab").addEventListener("click", function() {
    const form = document.getElementsByClassName("add-album")[0];

    const formToClose = document.getElementsByClassName("display-album")[0];
    formToClose.style.display = "none";
    formToClose.classList.remove("active")

    form.style.display = "flex";
    requestAnimationFrame(() => {
      form.classList.add("active");
    });
});

document.getElementById("close_add_album_tab").addEventListener("click", function() {
    const form = document.getElementsByClassName("add-album")[0];
    form.classList.remove("active");
  });

//open and close display album
document.getElementById("open_display_album").addEventListener("click", function() {
    const form = document.getElementsByClassName("display-album")[0];

    const formToClose = document.getElementsByClassName("add-album")[0];
    formToClose.style.display = "none";
    formToClose.classList.remove("active");

    form.style.display = "flex";
    requestAnimationFrame(() => {
      form.classList.add("active");
    });
});

document.getElementById("close_display_album_tab").addEventListener("click", function() {
  const form = document.getElementsByClassName("display-album")[0];
  form.classList.remove("active");
});

//album adding
document.getElementById("saveBtn").addEventListener("click", async function(){

  const singer = document.getElementById("singerInput").value.trim();
  const title = document.getElementById("titleInput").value.trim();
  const release_year = document.getElementById("releaseYear").value.trim();
  const song_amount = document.getElementById("songAmount").value.trim();

  const data = {
    singer,
    title,
    release_year,
    song_amount
  };

    try {
    const response = await fetch("/albums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (response.ok) {
      alert("Album added successfully!");

      document.getElementById("singerInput").value = "";
      document.getElementById("titleInput").value = "";
      document.getElementById("releaseYear").value = "";
      document.getElementById("songAmount").value = "";

    }
  } catch (err) {
    console.error("Error:", err);
    alert("There was an error adding the album.");
  }
});