import './styles/index.css';
import logo2 from './assets/logo2.jpg';

const logoIcon = document.querySelector('#logoIcon');
logoIcon.src = logo2;

// Homepage Api Data
const card = document.querySelector('.card-container');

const getEpisodeList = async () => {
  const response = await fetch('https://api.tvmaze.com/seasons/1/episodes');
  const data = await response.json();
  let show = '';
  // eslint-disable-next-line array-callback-return
  data.map((episode) => {
    show += `
      <div id = "${episode.id}"class = "cards">
       <img src="${episode.image.medium}" id="image" alt="" />
        <div class="heading">
           <h2>${episode.name}</h2>
           <span><i class="fa-solid fa-heart"></i></span>
        </div>
        <p>Rating: ${episode.rating.average}</p>
        <p>${episode.summary}</p>
        <button type="submit" onclick="document.getElementById(${episode.id}).style.display='block'" class="comment-btn">Comments</button>
        </div>
      `;
    card.innerHTML = show;
  });
  const commentBtn = document.querySelectorAll('.comment-btn');
  commentBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('comment-btn')) {
        const { id } = e.target.parentNode;
        commentsPopup((id));
      }
    });
  });
};
window.addEventListener('load', getEpisodeList);

// Modal window dom activities
const info = document.querySelector('.details');

const commentsPopup = async (id) => {
  const response = await fetch(`https://api.tvmaze.com/shows/1/episodebynumber?season=1&number=${id}`);
  const data = await response.json();
  const output = `
        <div class="image-container">
          <span class = "close-btn" onclick="closeModal().style.display='none'" class="w3-button w3-display-topright">&times;</span>
        <img src="${data.image.original}" id="epImage" alt="" />
        </div>
        <h1>${data.name}</h1>
        <p>Episode:${data.number}</p>
        <p>${data.summary}</p>
  `;
  info.innerHTML += output;
  info.parentElement.classList.add('active');

  let comment = '';
  comment += `
    <div class="comments">
        <h2>Comments</h2>
        <p>This is crazy!</p>
       </div>
  `;
  info.innerHTML += comment;

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
};

const closeModal = () => {
  info.innerHTML = '';
  addComments.innerHTML = '';
};
closeModal();
