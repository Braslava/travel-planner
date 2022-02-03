import { handleSubmit } from './js/handlers';
import { form } from './js/elements';

import './styles/reset.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/content.scss';
import './styles/header.scss';

form.addEventListener('submit', handleSubmit);
