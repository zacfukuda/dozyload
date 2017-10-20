let defaultSetting = {
	selector: '.dozy',
	container: document,
	threshold: 300,
	dataSrc: 'src',
	dataSrcset: 'srcset',
	classLoading: 'loading',
	classLoaded: 'loaded',
	classError: 'error',
	callbackLoad: null,
	callback_error: null,
	callback_set: null
};

// Retrieve Dozyload elements
const dozyelements = document.querySelectorAll('.dozy');

// Set padding to the parents of the Dozy elements.
dozyelements.forEach( (element) => {
	let ratioText = element.getAttribute('data-ratio');

	// <img> or <iframe>.
	if (['IMG', 'IFRAME'].indexOf(element.nodeName) > -1 && ratioText) {
		
		let parent = element.parentNode;

		// Calculate padding-bottom to add.
		let ratio = ratioText.split(':');
		let padding = ratio[1] / ratio[0] * 100;

		// Add padding bottom to the parrent.
		parent.classList.add('dozy-parent');
		parent.style.paddingBottom = padding + '%';
	}
});

// Set Intersection Observer
const DozyObserverOptions = {
  rootMargin: '-100px 0px 100px',
};

const observerCallback = (entries) => {	
	entries.forEach( (entry) => {
		if (entry.intersectionRatio > 0) {
			let element = entry.target;

			// set src, srcset, and so on.
			let src = element.getAttribute('data-src');

			if ( element.nodeName === 'IMG' ) {
				let srcset = element.getAttribute('data-srcset');
				if (srcset) {
					element.setAttribute('srcset', srcset);
				}
				if (src) {
					element.setAttribute('src', src);
				}
			} else if ( element.nodeName === 'IFRAME' ) {
				if (src) element.setAttribute('src', src);
			} else if (src) {
				element.style.backgroundImage = `url("${src}")`;
			}

			// No longer observe this entry.
			DozyObserver.unobserve(element);
		}
	});
};

const DozyObserver = new IntersectionObserver(observerCallback, DozyObserverOptions);

dozyelements.forEach( (element) => {
	DozyObserver.observe(element);
});

class Dozyload {
	constructor(setting) {
		console.log('Hi, I‘m Dozy.');
	}
}

module.exports = Dozyload;