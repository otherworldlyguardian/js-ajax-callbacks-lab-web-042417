function displayError () {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function searchRepositories () {
  $.get(`https://api.github.com/search/repositories?q=${searchTerms.value}`, function (data) {
    const repoList = '<ul>' + data.items.map(r => {
      return (
        `<li>
           <h2>${r.name}<a href="${r.html_url}">Check out this Repo</a></h2>
           <p><a href="${r.owner.url}">${r.owner.login}</a>
           <p>${r.description}</p>
           <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a>
         </li>`
      )
    }).join('') + '</ul>'
    document.getElementById("results").innerHTML = repoList
  }).fail(displayError())
  searchTerms.value = ''
}

function showCommits (el) {
  let n = el.dataset.repository
  let o = el.dataset.owner
  $.get(`https://api.github.com/repos/${o}/${n}/commits`, function (data) {
    const commitsList = 'ul' + data.map(c => {
      return (
        `<li>${c.commit.tree.sha}</li>`
      )
    })
    document.getElementById('details').innerHTML = commitsList
  }).fail(displayError())
}

$(document).ready(function (){
});
