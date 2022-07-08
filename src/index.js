import './styles/index.css';
import logo2 from './assets/logo2.jpg';

const logoIcon = document.querySelector('#logoIcon');
logoIcon.src = logo2;
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
