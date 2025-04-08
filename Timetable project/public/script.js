function addClass() {
  window.location.href = "http://localhost:3000/add-class";
  console.log("I hate javascript")
}

const form = document.getElementById("add-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    day: document.getElementById("day").value,
    period: document.getElementById("period").value,
    class_name: document.getElementById("class-name").value,
    teacher: document.getElementById("teacher-name").value,
    room: document.getElementById("room-number").value,
  };

  console.log(data);

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
      form.reset();
    }
  } catch (err) {
    console.error("Error:", err);
    alert("There was an error adding the class.");
  }
});
