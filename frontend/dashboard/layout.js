const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/frontend/index.html";
}

const username = document.querySelector(".user-name");
const email = document.querySelector(".user-email");

function getUserInfo() {
  const userId = localStorage.getItem("id");

  fetch(`http://localhost:3000/auth/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      username.textContent = data.username;
      email.textContent = data.email;
    });
}
getUserInfo();

const main = document.querySelector(".task-board");

window.navClicked = function (clicked) {
  main.innerHTML = "";

  if (clicked.childNodes[3].textContent == "Dashboard") {
    const p = document.createElement("p");
    p.textContent = "this is p in dashboard";
    main.appendChild(p);
  } else if (clicked.childNodes[3].textContent == "Projects") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = projectContainer;
    const projectElement = tempDiv.firstElementChild;

    main.appendChild(projectElement);
  } else if (clicked.childNodes[3].textContent == "Tasks") {
    const p = document.createElement("p");
    p.textContent = "this is p in Tasks";
    main.appendChild(p);
  } else if (clicked.childNodes[3].textContent == "Users") {
    createThead();
    main.appendChild(table);
    fetch("http://localhost:3000/auth/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => createTbody(data));
  }
};

function createThead() {
  thead.innerHTML = "";
  const tr = document.createElement("tr");
  tr.style.border = "1px solid black";
  thead.appendChild(tr);

  labels.forEach((label) => {
    let th = document.createElement("th");
    th.style.border = "1px solid black";
    th.textContent = label;
    tr.appendChild(th);
  });

  table.appendChild(thead);
}

const labels = ["Username", "Email"];

const table = document.createElement("table");
table.style.border = "1px solid black";
table.style.borderCollapse = "collapse";

const thead = document.createElement("thead");
const tbody = document.createElement("tbody");

function renderRow(user) {
  const tr = document.createElement("tr");
  tr.style.border = "1px solid black";

  Object.values(user).forEach((value) => {
    let td = document.createElement("td");
    td.style.border = "1px solid black";
    td.textContent = value;
    tr.appendChild(td);
  });

  tbody.appendChild(tr);
}

function createTbody(users) {
  tbody.innerHTML = "";
  users.forEach((user) => {
    renderRow({
      username: user.username,
      email: user.email,
      // ownedProjects: user.ownedProjects[0].title ,
      // participatedProjects: user.participatedProjects || "",
    });
  });
  table.appendChild(tbody);
}

// project container - keginchalik project.js ga otkazish kerak
const projectContainer = `<div class="project-card">
        <div class="project-title">Project Planning</div>
        <div class="project-info">
            <div class="project-members">
                Members: <span>John Doe, Jane Smith</span>
            </div>
            <div class="project-deadline">
                Deadline: <span>2025-05-15</span>
            </div>
        </div>
        <div class="project-actions">
            <button class="btn-add-user" onclick="addUser(1)">Add User</button>
            <button class="btn-edit" onclick="editproject(1)">Edit</button>
            <button class="btn-delete" onclick="deleteproject(1)">Delete</button>
        </div>
    </div>`;
