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
  document.getElementById("exploreBox").classList.remove("active");
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
      alert(errorData.message);
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
  document.getElementById("exploreBox").innerHTML = "";
  document.getElementById("post").classList.remove("active");
  document.getElementById("manageBox").classList.remove("active");
});

openPostBtn.addEventListener("click", () => {
  document.getElementById("welcome").classList.add("closed");
  document.getElementById("post").classList.add("active");
  document.getElementById("exploreBox").classList.remove("active");
  document.getElementById("manageBox").classList.remove("active");
  document.querySelector("#post-form h2").textContent = "Post a thought";
  document.getElementById("postButton").textContent = "Post";
  document.getElementById("titleInput").value = "";
  document.getElementById("category").value = "";
  document.getElementById("contentInput").value = "";
});

closePostBtn.addEventListener("click", () => {
  document.getElementById("welcome").classList.remove("closed");
  document.getElementById("post").classList.remove("active");
});

const textarea = document.getElementById("contentInput");
const wordCountDisplay = document.getElementById('wordCount');
const maxWords = 150;

textarea.addEventListener("input", () => {
  let words = textarea.value.trim().split(" ").filter(word => word.length > 0);
  let wordCount = words.length;

  if (wordCount > maxWords) {
    words = words.slice(0, maxWords);
    textarea.value = words.join(' ');
    wordCount = maxWords;
  }

  wordCountDisplay.textContent = `${wordCount}/${maxWords} words`;
});

document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const userId = user.id;
  const author = user.username;
  const title = document.getElementById("titleInput").value.trim();
  const category = document.getElementById("category").value.trim();
  const content = document.getElementById("contentInput").value.trim();
  const currentdate = new Date();
  const date = currentdate.getFullYear() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getDay();
  const modifyDate = "";

  const data = {
    userId,
    author,
    title,
    category,
    content,
    date,
    modifyDate
  };
  console.log(data);
  try {
    const res = await fetch("/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      return;
    }
    alert("Posting successful!");
    document.getElementById("titleInput").value = "";
    document.getElementById("category").value = "";
    document.getElementById("contentInput").value = "";
  } catch (err) {
    console.log(err);
    alert("User save failed!")
  }
});

document.getElementById("exploreBtn").addEventListener("click", async () => {
  document.getElementById("welcome").classList.add("closed");
  document.getElementById("post").classList.remove("active");
  document.getElementById("exploreBox").classList.add("active");
  document.getElementById("manageBox").classList.remove("active");
  document.getElementById("login").classList.remove("active");
  document.getElementById("register").classList.remove("active");

  try {
    const res = await fetch("/blogs");
    if (!res.ok) {
      alert("Failed to fetch blogs for exploring.");
      return;
    }
    const blogs = await res.json();

    const container = document.getElementById("container");
    container.innerHTML = "";

    if(blogs.length >= 1){
      blogs.forEach((blog) => {
        const card = document.createElement("div");
        card.className = "blog-card";
        card.innerHTML = `
          <h2>${blog.title}</h2>
          <p><strong>Author:</strong> ${blog.author}</p>
          <p><strong>Category:</strong> ${blog.category}</p>
          <p><strong>Date:</strong> ${blog.date}</p>
          <p><strong>Modify date: </strong> ${blog.modifyDate == "" ? "Original post" : blog.modifyDate}</p>
          <strong>Content:</strong><br>
          <p style="text-align:center;">${blog.content}</p>
        `;
        container.appendChild(card);
      });
    }
    else{
      const card = document.createElement("div");
      card.className = "blog-card";
      card.innerHTML = `<h2>There are no blogs yet! Share your ideas yourself!</h2>`;
      container.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    alert("Error occurred while fetching blogs.");
  }
});

document.getElementById("closeExplore").addEventListener("click", () => {
  document.getElementById("exploreBox").classList.remove("active");
  document.getElementById("welcome").classList.remove("closed");
});

document.getElementById("manageBtn").addEventListener("click", async () => {
  document.getElementById("welcome").classList.add("closed");
  document.getElementById("post").classList.remove("active");
  document.getElementById("exploreBox").classList.remove("active");
  document.getElementById("manageBox").classList.add("active");
  
  const managableBlogs = [];
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  try {
    const res = await fetch("/blogs");
    if (!res.ok) {
      alert("Failed to fetch blogs for exploring.");
      return;
    }
    const blogs = await res.json();

    const container = document.getElementById("container");
    container.innerHTML = "";

    blogs.forEach(e => {
      if(e.userId == user.id){
        managableBlogs.push(e);
      }
    });
  } catch (err) {
    console.error(err);
    alert("Error occurred while fetching blogs.");
  }

  const container = document.getElementById("container2");
  container.innerHTML = "";

  if (managableBlogs.length >= 1) {
    managableBlogs.forEach((blog) => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.alignItems = "center";
      card.style.justifyContent = "center";
      card.innerHTML = `
        <h2>${blog.title}</h2>
        <p><strong>Author:</strong> ${blog.author}</p>
        <p><strong>Category:</strong> ${blog.category}</p>
        <p><strong>Date:</strong> ${blog.date}</p>
        <p><strong>Modify date: </strong> ${blog.modifyDate == "" ? "Original post" : blog.modifyDate}</p>
        <strong>Content:</strong><br>
        <p style="text-align:center;">${blog.content}</p>
      `;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.style.marginRight = "12.5px";
      editBtn.classList.add("action-btn", "edit-btn");
      editBtn.addEventListener("click", function () {
        document.getElementById("postBtn").click();

        document.getElementById("titleInput").value = blog.title;
        document.getElementById("category").value = blog.category;
        document.getElementById("contentInput").value = blog.content;
        const currentdate = new Date();
        blog.modifyDate =
          currentdate.getFullYear() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getDay();

        document.querySelector("#post-form h2").textContent = "Edit";

        const saveBtn = document.getElementById("postButton");

        saveBtn.textContent = "Update";
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      editBtn.style.marginLeft = "12.5px";
      deleteBtn.classList.add("action-btn", "delete-btn");
      deleteBtn.addEventListener("click", function () {
        deleteBlogFunc(blog.id);
      });

      container.appendChild(card);
      card.appendChild(editBtn);
      card.appendChild(deleteBtn);
    });
  } else {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.innerHTML = `<h2>You haven't posted anything yet!</h2>`;
    container.appendChild(card);
  }

});

document.getElementById("closeManage").addEventListener("click", () => {
  document.getElementById("manageBox").classList.remove("active");
  document.getElementById("welcome").classList.remove("closed");
});

async function deleteBlogFunc(id) {
  try {
    const response = await fetch(`/blogs/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (response.ok) {
      alert("Blog deleted successfully!");
      refreshManageBlogs();
    } else {
      alert(result.message || "Error deleting blog.");
    }
  } catch (err) {
    console.error("Error deleting blog:", err);
    alert("Error deleting blog.");
  }
}

async function refreshManageBlogs() {
  const managableBlogs = [];
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  try {
    const res = await fetch("/blogs");
    if (!res.ok) {
      alert("Failed to fetch blogs.");
      return;
    }
    const blogs = await res.json();
    blogs.forEach((e) => {
      if (e.userId == user.id) {
        managableBlogs.push(e);
      }
    });

    const container = document.getElementById("container2");
    container.innerHTML = "";

    if (managableBlogs.length >= 1) {
      managableBlogs.forEach((blog) => {
        const card = document.createElement("div");
        card.className = "blog-card";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.alignItems = "center";
        card.style.justifyContent = "center";
        card.innerHTML = `
        <h2>${blog.title}</h2>
        <p><strong>Author:</strong> ${blog.author}</p>
        <p><strong>Category:</strong> ${blog.category}</p>
        <p><strong>Date:</strong> ${blog.date}</p>
        <p><strong>Modify date: </strong> ${
          blog.modifyDate == "" ? "Original post" : blog.modifyDate
        }</p>
        <strong>Content:</strong><br>
        <p style="text-align:center;">${blog.content}</p>
      `;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginRight = "12.5px";
        editBtn.classList.add("action-btn", "edit-btn");
        editBtn.addEventListener("click", function () {
          document.getElementById("postBtn").click();

          document.getElementById("titleInput").value = blog.title;
          document.getElementById("category").value = blog.category;
          document.getElementById("contentInput").value = blog.content;
          const currentdate = new Date();
          blog.modifyDate =
            currentdate.getFullYear() +
            "/" +
            (currentdate.getMonth() + 1) +
            "/" +
            currentdate.getDay();

          document.querySelector("#post-form h2").textContent = "Edit";

          const saveBtn = document.getElementById("postButton");

          saveBtn.textContent = "Update";
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        editBtn.style.marginLeft = "12.5px";
        deleteBtn.classList.add("action-btn", "delete-btn");
        deleteBtn.addEventListener("click", function () {
          deleteBlogFunc(blog.id);
        });

        container.appendChild(card);
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);
      });
    } else {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.innerHTML = `<h2>You haven't posted anything yet!</h2>`;
      container.appendChild(card);
    }
  } catch (err) {
    console.error("Error fetching blogs:", err);
    alert("Error occurred while fetching blogs.");
  }
}