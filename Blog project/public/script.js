const openLoginButton = document.getElementById("openLoginBtn");
const closeLoginButton = document.getElementById("close_login");
const openRegisterButton = document.getElementById("openRegister");
const closeRegisterButton = document.getElementById("close_register");

const openPostBtn = document.getElementById("postBtn");
const closePostBtn = document.getElementById("close_post");

let isUserLoggedIn = false;

window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    isUserLoggedIn = true;
    updateUIForLoggedInUser(JSON.parse(loggedInUser));
  }
});

function updateUIForLoggedInUser(user) {
  document.getElementById("postBtn").disabled = false;
  document.getElementById("manageBtn").disabled = false;
  document.getElementById("logoutBtn").style.display = "inline-block";
  document.getElementById("openLoginBtn").style.display = "none";
  document.getElementById("welcome").classList.remove("closed");
  document.getElementById("login").classList.remove("active");
  alert(`Welcome back, ${user.username}!`);
}


if(isUserLoggedIn == false){
  document.getElementById("postBtn").disabled = true;
  document.getElementById("manageBtn").disabled = true;
  document.getElementById("logoutBtn").style.display = "none";
}

openLoginButton.addEventListener("click", () => {
  document.getElementById("welcome").classList.add("closed");
  document.getElementById("login").classList.add("active");
  document.getElementById("register").classList.remove("active");
});

closeLoginButton.addEventListener("click", () => {
  document.getElementById("login").classList.remove("active");
  document.getElementById("welcome").classList.remove("closed");
});

openRegisterButton.addEventListener("click", () => {
  document.getElementById("welcome").classList.add("closed");
  document.getElementById("login").classList.remove("active");
  document.getElementById("register").classList.add("active");
});

closeRegisterButton.addEventListener("click", () => {
  document.getElementById("register").classList.remove("active");
  document.getElementById("welcome").classList.remove("closed");
  
  document.getElementById("emailInput").value = "";
  document.getElementById("usernameInput").value = "";
  document.getElementById("passwordInput").value = "";
});

const registerBtn = document.getElementById("registerBtn");

document.getElementById("register-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
  
  const email = document.getElementById("emailInput").value.trim();
  const username = document.getElementById("usernameInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();
  
  const data = {
    email,
    username,
    password
  };
  
  try {
    const res = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      return;
    }
    alert("Registration successful!");
    document.getElementById("register").classList.remove("active");
    document.getElementById("login").classList.add("active");
    this.reset();
  } catch (err) {
    console.log(err);
  }
});

document.getElementById("login-form")
.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("usernameLoginInput").value.trim();
  const password = document.getElementById("passwordLoginInput").value.trim();
  
  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }
  
  try {
    const res = await fetch("/users");
    if (!res.ok) {
      alert("Failed to fetch users for login.");
      return;
    }
    
    const users = await res.json();
    const matchedUser = users.find(
      (user) => user.username == username && user.password == password
    );
    
    if (matchedUser) {
      isUserLoggedIn = true;
      
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      updateUIForLoggedInUser(matchedUser);
      
      document.getElementById("login-form").reset();
    } else {
      alert("Invalid username or password.");
    }
  } catch (err) {
    console.error(err);
    alert("Error occurred during login.");
  }
});


document.getElementById("logoutBtn").addEventListener("click", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  alert(`Come back soon, ${JSON.parse(loggedInUser).username}!`);
  localStorage.removeItem("loggedInUser");
  document.getElementById("postBtn").disabled = true;
  document.getElementById("manageBtn").disabled = true;
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("openLoginBtn").style.display = "inline-block";
  document.getElementById("welcome").classList.remove("closed");
});

openPostBtn.addEventListener("click", () => {
  document.getElementById("welcome").classList.add("closed");
  document.getElementById("post").classList.add("active");
});

closePostBtn.addEventListener("click", () => {
  document.getElementById("welcome").classList.remove("closed");
  document.getElementById("post").classList.remove("active");
});