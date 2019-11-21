// todo vísa í rétta hluti með import
import { empty, el, randomNUmber, randomDate } from './helpers';
import getRandomImage from './nasa-api';
import { load, save, clear } from './storage';
// breytur til þess að halda utan um html element nodes
let title = document.querySelector('.apod__title'); // titill fyrir mynd á forsíðu
let text = document.querySelector('.apod__text'); // texti fyrir mynd á forsíðu
let img = document.querySelector('img'); // mynd á forsíðu
let iframe = document.querySelector('iframe');

let image; // object sem inniheldur núverandi mynd á forsíðu.
/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {
    getRandomImage().then((json) => {
        image = json;
        if (image.media_type==='image') {
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
    console.log('save image');
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
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
