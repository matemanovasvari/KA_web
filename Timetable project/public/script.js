document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/classes");
    const allClasses = await response.json();

    const buttons = document.querySelectorAll(".class-button");

    buttons.forEach((button) => {
      const day = button.dataset.day;
      const period = button.dataset.period;

      const classMatch = allClasses.find(
        (cls) => cls.day === day && cls.period == period
      );

      if (classMatch) {
        const classDiv = document.createElement("div");
        classDiv.className = "class-info";
        classDiv.innerHTML = `
          <strong>${classMatch.class_name}</strong><br>
          ${classMatch.teacher} - Room ${classMatch.room}
          <div class="buttons" style="display: none;">
            <button class="edit-btn" data-id="${classMatch.id}">Edit</button>
            <button class="delete-btn" data-id="${classMatch.id}">Delete</button>
          </div>
        `;

        classDiv.addEventListener("mouseenter", () => {
          const buttonsDiv = classDiv.querySelector(".buttons");
          buttonsDiv.style.display = "block";
        });
        classDiv.addEventListener("mouseleave", () => {
          const buttonsDiv = classDiv.querySelector(".buttons");
          buttonsDiv.style.display = "none";
        });

        const deleteButton = classDiv.querySelector(".delete-btn");
        deleteButton.addEventListener("click", async () => {
          if (confirm("Are you sure you want to delete this class?")) {
            await fetch(`/classes/${classMatch.id}`, {
              method: "DELETE",
            });

            const originalButton = document.createElement("button");
            originalButton.className = "class-button";
            originalButton.dataset.day = day;
            originalButton.dataset.period = period;
            originalButton.textContent = "+";

            classDiv.replaceWith(originalButton);
          }
        });

        button.replaceWith(classDiv);
      }
    });
  } catch (error) {
    console.error("Failed to load classes:", error);
  }
});

let lastSubmittedSlot = null;

function addClass(button) {
  const day = button.getAttribute("data-day");
  const period = button.getAttribute("data-period");

  const redirectUrl = `http://localhost:3000/add-class?day=${day}&period=${period}`;

  window.location.href = redirectUrl;
}

async function addClassToDB() {
  const urlParams = new URLSearchParams(window.location.search);
  const day = urlParams.get("day");
  const period = urlParams.get("period");

  const class_name = document.getElementById("class-name").value.trim();
  const teacher = document.getElementById("teacher-name").value.trim();
  const room = document.getElementById("room-number").value.trim();

  const data = {
    day,
    period,
    class_name,
    teacher,
    room,
  };

  const currentSlot = `${day}-${period}`;

  if (currentSlot === lastSubmittedSlot) {
    alert(
      "A class has already been added to this slot. Please go back to the homepage."
    );
    return;
  }

  try {
    const response = await fetch("/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (response.ok) {
      alert("Class added successfully!");

      lastSubmittedSlot = currentSlot;

      document.getElementById("class-name").value = "";
      document.getElementById("teacher-name").value = "";
      document.getElementById("room-number").value = "";
    }
  } catch (err) {
    console.error("Error:", err);
    alert("There was an error adding the class.");
  }
}

//-------------------------------------edit---------------------------------------------------------------------//