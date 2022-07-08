import './styles/index.css';
import logo2 from './assets/logo2.jpg';
// import logo3 from './assets/logo3.jpg';

const logoIcon = document.querySelector('#logoIcon');
logoIcon.src = logo2;
 comments-popup

// const epImage = document.querySelector('#epImage');
// epImage.src = logo3;

// Modal window dom activities

const getEpisodeDetails = async (e) => {
  e.preventDefault();
  if (e.target.classList.contains('comment-btn')) {
    const itemId = e.target.parentElement.parentElement;
    const res = await fetch(`https://api.tvmaze.com/seasons/1/episodes=${itemId}`);
    const data = await res.json();
    getEpisodeDetails(data.result);
  }
};

const details = document.querySelector('.details');
const popupWindow = (episodedetails) => {
  let output = '';
  episodedetails.map((detail) => {
    output += `
     <div class="image-container">
           <span class="close-btn">X</span>
        <img src="${image.original}" id="epImage" alt="" />
        </div>
        <h1>${name}</h1>
        <p>Episode:${number}</p>
        <p>${summary}</p>
    `;
    details.innerHTML = output;
  });
};

// Comments section
const addComments = document.querySelector('.add-comment');
let html = '';
html += `
   <h2>Add a comment</h2>
        <form action="#">
          <input type="text" placeholder="Your name" required><br>
          <input type="text" placeholder="Your insights" required><br>
          <button type="submit">Comment</button>
        </form>
`;
addComments.innerHTML = html;

const card = document.querySelector('.card-container');

const getEpisodeList = async () => {
  const response = await fetch('https://api.tvmaze.com/seasons/1/episodes');
  const data = await response.json();
  let show = '';
  // eslint-disable-next-line array-callback-return
  data.map((episode) => {
    show += `
      <div class = "cards">
       <img src="${episode.image.medium}" id="image" alt="" />
        <div class="heading">
           <h2>${episode.name}</h2>
           <span><i class="fa-solid fa-heart"></i></span>
        </div>
        <p>Rating: ${episode.rating.average}</p>
        <p>${episode.summary}</p>
        <button type="submit" class="comment-btn">Comments</button>
        </div>
      `;
    card.innerHTML = show;
  });
};
window.addEventListener('load', getEpisodeList);
 develop
