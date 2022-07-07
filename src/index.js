import './styles/index.css';
import logo2 from './assets/logo2.jpg';
// import logo3 from './assets/logo3.jpg';

const logoIcon = document.querySelector('#logoIcon');
logoIcon.src = logo2;

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
