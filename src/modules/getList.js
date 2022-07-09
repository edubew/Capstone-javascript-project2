import modalPopup from './popup.js';
import postComment from './postComments.js';

const card = document.querySelector('.card-container');
let template = '';

const getDataList = async () => {
  const data = await fetch('https://api.tvmaze.com/search/shows?q=girls');
  const result = await data.json();
  result.map((res, index) => {
    template += `
    <li id="${res.show.id}" class="col-sm mt-3">
     <div class="card" style="width: 18rem;">
      <img src="${res.show.image.medium}" class="card-img-top" alt="...">
      <div class="card-body">
       <div class="space">
        <h5 class="card-title">${res.show.name}</h5>
        <i data-id=${index} class="heart fa fa-heart" aria-hidden="true"></i>
       </div>
        <span  class="likes">Likes</span>
        <div class="btn-container">
          <button class="btn btn-1 comments">Comments</button>
        </div>
      </div>
  </div>
  </li>
          `;
    card.innerHTML = template;
  });
  const commentBtn = document.querySelectorAll('.comments');
  commentBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      modalPopup(e.target.parentNode.parentNode.parentNode.parentNode.id);
    });
  });
};

const addComment = () => {
  const modal = document.querySelector('.modal');
  modal.addEventListener('submit', (e) => {
    e.preventDefault();
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    const username = document.getElementById('name').value;
    const comment = document.getElementById('textarea').value;
    const id = document.querySelector('.hidden').value;
    const commentList = document.querySelector('.comments-list');
    commentList.childNodes[0].innerHTML = `Comments (${commentList.childNodes.length})`;
    const li = document.createElement('li');
    li.innerText = `${today} ${username}: ${comment}`;
    commentList.appendChild(li);
    postComment(id, username, comment);
    document.querySelector('.needs-validation').reset();
  });
};

export { getDataList, addComment };