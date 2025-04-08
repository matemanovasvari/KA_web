function addClass(button) {
  const day = button.getAttribute('data-day');
  const period = button.getAttribute('data-period');

  const redirectUrl = `http://localhost:3000/add-class?day=${day}&period=${period}`;

  window.location.href = redirectUrl;
}

async function addClassToDB(){
    const urlParams = new URLSearchParams(window.location.search);
    const day = urlParams.get('day');
    const period = urlParams.get('period');

    if (!day || !period) {
      alert("Error: Missing day or period!");
      return;
    }

    const data = {
      day: day,
      period: period,
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
      }
    } catch (err) {
      console.error("Error:", err);
      alert("There was an error adding the class.");
    }
}