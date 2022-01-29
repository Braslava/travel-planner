import { checkForName } from './js/lib';
import { handleSubmit } from './js/handlers';

import './styles/reset.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/content.scss';
import './styles/header.scss';

const submit = document.querySelector('.submit-btn');
const form = document.querySelector('.app__form');
form.addEventListener('submit', handleSubmit);
console.log('it works!');

// export all js files to the output (Client) library

export { checkForName, handleSubmit };
