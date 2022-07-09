import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import { Modal } from 'bootstrap';

import logo2 from './assets/logo2.jpg';

const logoIcon = document.querySelector('#logoIcon');
logoIcon.src = logo2;

// Homepage Api Data
const card = document.querySelector('.card-container');

const getEpisodeList = async () => {
  const response = await fetch('https://api.tvmaze.com/search/shows?q=girls');
  const data = await response.json();
  let show = '';
  // eslint-disable-next-line array-callback-return
  data.map(dt => {
    show += `
      <div id = "${dt.show.id}"class = "cards">
       <img src="${dt.show.image.medium}" id="image" alt="" />
        <div class="heading">
           <h2>${dt.show.name}</h2>
           <span><i class="fa-solid fa-heart"></i></span>
        </div>
        <p>Rating: ${dt.show.rating.average}</p>
        <button type="submit" class="comment-btn">Comments</button>
        </div>
      `;
    card.innerHTML = show;
  });
  const commentBtn = document.querySelectorAll('.comment-btn');
  commentBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log("ËVENT", e.target.parentNode.id)
      commentsPopup(e.target.parentNode.id);
    });
  });
};

// Modal window dom activities
const popUpContainer = document.getElementById('staticBackdrop');
const modal = document.querySelector('.modal');

const commentsPopup = async (id) => {
  const urlData = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/YkOvPYHKCkzwzPHkcOz4/comments/?item_id=${id}
`);
  const commentsData = await urlData.json();
  console.log("COMMME", commentsData)
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const data = await response.json();
  const ul = document.createElement('ul');
  let h3 = document.createElement('h3');
  if(commentsData.length){
    h3.innerHTML = `Comments (${commentsData.length})`
  } else {
    h3.innerHTML = `Comments (0)`;
  }
  ul.appendChild(h3)
  const output = `
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="staticBackdropLabel">${data.name}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class="popup-image col-sm-12">
    <img class='img-popup' src=${data.image.medium} id="staticBackdropLabel" alt="Girls Image">
    <div class="subtitles">
      <div class="subtitles-container">
      <p><b>Language</b>:<span>${data.language}</span></p>
      <p><b>Premiered</b>:<span>${
  data.premiered === null ? 'Not Available' : data.premiered
}</span></p>
      <p><b>Type</b>:<span>${data.type}</span></p>
      <p><b>Rating</b>:<span>${
  data.rating.average === null
    ? 'Not Available'
    : data.rating.average
}</span></p>
      </div>
      </div>
      <div class='comments-container'>
      ${commentsData.length > 0 ? `
      ${commentsData.map((comment) => {
    const li = document.createElement('li');
    li.innerText = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
    ul.appendChild(li);
  })}
      ` : ''
}
      </div>
      <div class='add-container'>
      <h3>Add a comment</h3>
  <form class="needs-validation" novalidate>
  <div class="col-md-4 input-container">
    <input type="hidden" value='${data.id}' class="form-control hidden" required>
    <input type="text" class="form-control required" id="name" placeholder = "Your name" required>
    <div class="invalid-feedback">
        Please enter a username.
      </div>
  </div>
  <div class="col-md-4 mb-3 input-container">
    <textarea class="form-control required" id="textarea" placeholder="Your insights" required></textarea>
    <div class="invalid-feedback">
        Please enter a comment.
      </div>
  </div>
  <div class="col-12 btn-submit">
    <button class="btn btn-1 submit comments" type="submit">Comment</button>
  </div>
  </form>
      </div>
    </div>
  </div>
</div>
 `;
 popUpContainer.innerHTML = output;
  document.querySelector('.comments-container').appendChild(ul);
  ul.classList.add('comments-list');
  const myModal = new Modal(modal, {
    keyboard: false,
    focus: true,
  });
  myModal.show();

  (() => {
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
      .forEach((form) => {
        form.addEventListener('submit', (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      });
  })();

//   modal.innerHTML = output;
//   document.querySelector('.comments').appendChild(ul);
//   ul.classList.add('inner-container')
//   modal.classList.add('active');

 };

// const close = document.querySelector('#close-btn');
//   close.addEventListener('click', () => {
//     close.classList.add('hide');
//   });


 const postComment = async (id, username, comment) => {
  const commentsUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/YkOvPYHKCkzwzPHkcOz4/comments'
  await fetch(`${commentsUrl}`,
    {
      method: 'POST',
      body: JSON.stringify({
       item_id: id,
       username,
       comment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
   // return response.text;
};

getEpisodeList();

// form event listener
modal.addEventListener('submit', (e) => {
  e.preventDefault();
  let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;

  let name = document.querySelector('#name').value;
  let insight = document.querySelector('#textarea').value;
  let id = document.querySelector('.hidden').value;
  console.log("ÏD>>>>>>", id)
  let commentsList = document.querySelector('.comments-list');
  //console.log("commentsList", commentsList)
  commentsList.childNodes[0].innerHTML = `Comments(${commentsList.childNodes.length})`;
  const li = document.createElement('li');
  li.innerText = `${today} ${name} ${insight}`
  commentsList.appendChild(li);
  postComment(name, insight, id);
})


