import { Modal } from 'bootstrap';

const popUpContainer = document.getElementById('staticBackdrop');
const modal = document.querySelector('.modal');

const modalPopup = async (id) => {
  const urlData = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/YkOvPYHKCkzwzPHkcOz4/comments/?item_id=${id}
      `);
  const commentsData = await urlData.json();
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const data = await response.json();
  const ul = document.createElement('ul');
  const h3 = document.createElement('h3');
  if (commentsData.length) {
    h3.innerHTML = `Comments (${commentsData.length})`;
  } else {
    h3.innerHTML = 'Comments (0)';
  }
  ul.appendChild(h3);
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
};

export default modalPopup;