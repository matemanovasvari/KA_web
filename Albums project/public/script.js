const cursorDot = document.querySelector("[data-cursor-dot]");

window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
});

const currentYear = new Date().getFullYear();

document.getElementById("releaseYear").setAttribute("max", currentYear);

// Open and close add album
document
  .getElementById("open_add_album_tab")
  .addEventListener("click", function () {
    const form = document.getElementsByClassName("add-album")[0];

    const formToClose = document.getElementsByClassName("display-album")[0];
    formToClose.style.display = "none";
    formToClose.classList.remove("active");

    form.style.display = "flex";
    requestAnimationFrame(() => {
      form.classList.add("active");
    });
  });

document
  .getElementById("close_add_album_tab")
  .addEventListener("click", function () {
    const form = document.getElementsByClassName("add-album")[0];
    form.classList.remove("active");
  });

// Open and close display album
document
  .getElementById("open_display_album")
  .addEventListener("click", function () {
    const form = document.getElementsByClassName("display-album")[0];

    const formToClose = document.getElementsByClassName("add-album")[0];
    formToClose.style.display = "none";
    formToClose.classList.remove("active");

    form.style.display = "flex";
    requestAnimationFrame(() => {
      form.classList.add("active");
    });
  });

document
  .getElementById("close_display_album_tab")
  .addEventListener("click", function () {
    const form = document.getElementsByClassName("display-album")[0];
    form.classList.remove("active");
  });

// Add or update album
document.getElementById("saveBtn").addEventListener("click", async function () {
  const singer = document.getElementById("singerInput").value.trim();
  const title = document.getElementById("titleInput").value.trim();
  const release_year = document.getElementById("releaseYear").value.trim();
  const song_amount = document.getElementById("songAmount").value.trim();

  const data = {
    singer,
    title,
    release_year,
    song_amount,
  };

  if (document.getElementById("saveBtn").textContent === "Update album") {
    const albumId = document
      .getElementById("saveBtn")
      .getAttribute("data-album-id");

    try {
      const response = await fetch(`/albums/${albumId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        alert("Album updated successfully!");
        document.getElementById("singerInput").value = "";
        document.getElementById("titleInput").value = "";
        document.getElementById("releaseYear").value = "";
        document.getElementById("songAmount").value = "";
        document.getElementById("saveBtn").textContent = "Save album";
        document.getElementById("saveBtn").removeAttribute("data-album-id");
        document.querySelector(".add-album h2").textContent = "Add album";
        clearAlbumDisplay();
      }
    } catch (err) {
      console.error("Error updating album:", err);
      alert("Error updating album.");
    }
  } else {
    // Add new album
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
  }
});

document
  .getElementById("submitBtn")
  .addEventListener("click", async function () {
    const albumId = document.getElementById("albumId").value.trim();

    if(albumId == ""){
      alert("The form is not filled");
      return;
    }

    try {
      const response = await fetch(`/albums/${albumId}`);
      const result = await response.json();
      
      if (response.ok) {
        displayAlbum(result);
      } else {
        const lastAlbumId = await getLastAlbumId();

        if (lastAlbumId) {
          alert(
            `Album not found. The last ID in the database is ${lastAlbumId}.`
          );
        } else {
          alert("No albums in the database.");
        }

        clearAlbumDisplay();
      }
    } catch (err) {
      console.error("Error fetching album:", err);
      alert("Error fetching album data.");
      clearAlbumDisplay();
    }
});

function displayAlbum(album) {
  const albumDisplay = document.getElementById("albumDisplay");

  albumDisplay.innerHTML = "";

  const albumCard = document.createElement("div");
  albumCard.classList.add("album-card");

  const albumTitle = document.createElement("h3");
  albumTitle.textContent = `${album.singer} - ${album.title}`;

  const albumYear = document.createElement("p");
  albumYear.textContent = `Release Year: ${album.release_year}`;

  const albumSongs = document.createElement("p");
  albumSongs.textContent = `Number of Songs: ${album.song_amount}`;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.marginRight = "12.5px";
  editBtn.classList.add("action-btn", "edit-btn");
  editBtn.addEventListener("click", function () {
    openEditForm(album);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  editBtn.style.marginLeft = "12.5px";
  deleteBtn.classList.add("action-btn", "delete-btn");
  deleteBtn.addEventListener("click", function () {
    deleteAlbum(album.id);
  });

  albumCard.appendChild(albumTitle);
  albumCard.appendChild(albumYear);
  albumCard.appendChild(albumSongs);
  albumCard.appendChild(editBtn);
  albumCard.appendChild(deleteBtn);

  albumDisplay.appendChild(albumCard);
}

function openEditForm(album) {
  document.getElementById("open_add_album_tab").click();

  document.getElementById("singerInput").value = album.singer;
  document.getElementById("titleInput").value = album.title;
  document.getElementById("releaseYear").value = album.release_year;
  document.getElementById("songAmount").value = album.song_amount;

  document.querySelector(".add-album h2").textContent = "Edit album";

  const saveBtn = document.getElementById("saveBtn");

  saveBtn.setAttribute("data-album-id", album.id);
  saveBtn.textContent = "Update album";
}

async function deleteAlbum(id) {
  const confirmation = confirm("Are you sure you want to delete this album?");
  if (!confirmation) return;

  try {
    const response = await fetch(`/albums/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (response.ok) {
      alert("Album deleted successfully!");
      clearAlbumDisplay();
    } else {
      alert(result.message || "Error deleting album.");
    }
  } catch (err) {
    console.error("Error deleting album:", err);
    alert("Error deleting album.");
  }
}

async function getLastAlbumId() {
  try {
    const response = await fetch("/albums");
    const albums = await response.json();

    if (albums && albums.length > 0) {
      return albums[albums.length - 1].id;
    }

    return null;
  } catch (err) {
    console.error("Error fetching last album ID:", err);
    return null;
  }
}

function clearAlbumDisplay() {
  const albumDisplay = document.getElementById("albumDisplay");
  albumDisplay.innerHTML = "";
}