// todo vísa í rétta hluti með import
import {
  empty,
} from './helpers';
import getRandomImage from './nasa-api';
import {
  save,
} from './storage';
// breytur til þess að halda utan um html element nodes
const title = document.querySelector('.apod__title'); // titill fyrir mynd á forsíðu
const text = document.querySelector('.apod__text'); // texti fyrir mynd á forsíðu
const img = document.querySelector('img'); // mynd á forsíðu
const iframe = document.querySelector('iframe');

let image; // object sem inniheldur núverandi mynd á forsíðu.
/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {
  getRandomImage().then((json) => {
    image = json;
    if (image.media_type === 'image') {
      img.setAttribute('src', image.hdurl);
      if (img.classList.contains('notdisplayed')) {
        img.classList.remove('notdisplayed');
      }
      if (!iframe.classList.contains('notdisplayed')) {
        iframe.classList.add('notdisplayed');
      }
    } else {
      iframe.setAttribute('src', image.url);
      if (iframe.classList.contains('notdisplayed')) {
        iframe.classList.remove('notdisplayed');
      }
      if (!img.classList.contains('notdisplayed')) {
        img.classList.add('notdisplayed');
      }
    }
    empty(text);
    empty(title);
    text.appendChild(document.createTextNode(image.explanation));
    title.appendChild(document.createTextNode(image.title));
  });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  if (image.media__type === 'image') {
    save(image.media_type, image.hdurl, image.explanation, image.title);
  } else {
    save(image.media_type, image.url, image.explanation, image.title);
  }
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init() {
  getNewImage();
  const newImageButton = document.querySelector('#new-image-button');
  newImageButton.addEventListener('click', getNewImage);

  const saveImageButton = document.querySelector('#save-image-button');
  saveImageButton.addEventListener('click', saveCurrentImage);
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {

}
