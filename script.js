const APIURL = "https://api.github.com/users/";

const mainEl = document.querySelector("#main");
const formEl = document.querySelector("#form");
const searchEl = document.querySelector("#search");

getUser("gabrielss97");

async function getUser(username) {
  const response = await fetch(APIURL + username);
  const responseData = await response.json();

  createUserCard(responseData);

  getRepos(username);
}

async function getRepos(username) {
  const response = await fetch(APIURL + username + "/repos");
  const responseData = await response.json();

  addReposToCard(responseData);
}

function createUserCard(data) {
  const { avatar_url, bio, name, followers, following, public_repos } = data;

  const cardHTML = `
  <div class="card">
  <div>
    <img class="avatar" src="${avatar_url}" alt="${name}">   
  </div>
  <div class="user-info">
  <h2>${name}</h2>
  <p>${bio}</p>

  <ul>
    <li>${followers} Followers</li>
    <li>${following} Following</li>
    <li>${public_repos} Repos</li>
  </ul>

   <div id="repos">
   
   </div>
  </div>
  </div>
  `;

  mainEl.innerHTML = cardHTML;
}

function addReposToCard(repos = []) {
  const reposEl = document.querySelector("#repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = searchEl.value;

  if (user) {
    getUser(user);

    searchEl.value = "";
  }
});
