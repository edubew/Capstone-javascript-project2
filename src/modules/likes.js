import LikeObj from './likeObject.js';
import Utilities from './utilities.js';
import { displayItemCounted } from './displayCount.js';

const InvolvementApiKey = 'oWfus23KNVDBoOzs2EjU';
const utilities = new Utilities();

const appIDLikes = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${InvolvementApiKey}/likes`;

const fetchLikes = async (appIDLikes) => {
  const response = await fetch(appIDLikes);
  const result = response.json();
  return result;
};

const show = document.querySelector('.main-container');
let template = '';
const fetchData = async () => {
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
        <a href="#" class="btn btn-1">Comments</a>
      </div>
    </div>
</div>
</li>
        `;
    show.innerHTML = template;
  });
};
const updateLikes = async () => {
  fetchLikes(appIDLikes).then((response) => response).then((response) => {
    const keys = Object.keys(response);
    keys.forEach((key) => {
      const likes = document.querySelectorAll('.likes');
      [...likes].forEach((item) => {
        const showID = parseInt(
          item.previousElementSibling.lastElementChild.getAttribute(
            'data-id',
          ),
          10,
        );
        if (response[key].item_id === showID) {
          item.innerText = `${response[key].likes} Likes`;
          if (response[key].likes > 0) {
            item.previousElementSibling.lastElementChild.classList.add('red');
          }
        }
      });
    });
  });
};
const postLikes = async () => {
  const data = await fetch('https://api.tvmaze.com/search/shows?q=girls');
  const result = await data.json();
  const clickLikes = document.querySelectorAll('.heart');
  const likeObj = new LikeObj();
  if (result.length !== 0) {
    [...clickLikes].forEach((res) => {
      res.addEventListener('click', (e) => {
        likeObj.item_id = parseInt(e.target.getAttribute('data-id'), 10);
        fetch(appIDLikes, {
          method: 'POST',
          body: JSON.stringify(likeObj),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const totalLikes = e.target.parentElement.nextElementSibling;
        fetchLikes(appIDLikes)
          .then((response) => response)
          .then((response) => {
            const keys = Object.keys(response);
            keys.forEach((key) => {
              if (response[key].item_id === likeObj.item_id) {
                totalLikes.innerText = `${response[key].likes} Likes`;
              }
            });
          });
      });
    });
  }
  displayItemCounted(result);
};

export {
  updateLikes,
  postLikes,
  fetchData,
};
