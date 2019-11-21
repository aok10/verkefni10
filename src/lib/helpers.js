/**
 * Hreinsa börn úr elementi
 *
 * @param {object} element Element sem á að hreinsa börn úr
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Búa til element og aukalega setja börn ef send með
 *
 * @param {string} name Nafn á element
 * @param  {...any} children Börn fyrir element
 */
export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
* Skilar tölu af handahófi á bilinu [min, max]
*/
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  
  let randomyyyy = randomNumber(1995, yyyy);
  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((randomyyyy%100!=0&&randomyyyy%4===0)||randomyyyy%400===0) {
    months[1]=29;
  }

  let randomdd;
  let randommm;
  if (randomyyyy == 1995) {
    randommm = randomNumber(6, 12);
    if (randommm === 6) {
      randomdd = randomNumber(16, months[randommm-1]);
    } else {
      randomdd = randomNumber(1, months[randommm-1]);
    }
  } else if (randomyyyy == yyyy) {
    randommm = randomNumber(1, mm);
    if (randommm === mm) {
      randomdd = randomNumber(1, dd);
    } else {
      randomdd = randomNumber(1, months[randommm-1]);
    }
  } else {
    randommm = randomNumber(1, 12);
    randomdd = randomNumber(1, months[randommm-1]);
  }

  today = randomyyyy + '-' + randommm + '-' + randomdd;
  console.log(today);
  return today;
}