import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import { getDataList, addComment } from './modules/getList.js';
import logo2 from './assets/logo2.jpg';

const logoIcon = document.querySelector('#logoIcon');
logoIcon.src = logo2;

getDataList();
addComment();
