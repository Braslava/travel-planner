import { handleSubmit } from './js/handlers';
import { form } from './js/elements';

import './styles/reset.scss';
import './styles/loader.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/content.scss';
import './styles/header.scss';


form.addEventListener('submit', handleSubmit);

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				console.log('SW registered: ', registration);
			})
			.catch((registrationError) => {
				console.log('SW registration failed: ', registrationError);
			});
	});
}
