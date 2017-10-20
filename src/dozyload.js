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
	if (['IMG', 'IFRAME'].indexOf(element.nodeName) > -1) {
		let parent = element.parentNode;
		
		// Calculate padding-bottom to add.
		let ratioText = element.getAttribute('data-ratio');
		let ratio = ratioText.split(':');
		let padding = ratio[1] / ratio[0] * 100;

		// Add padding bottom to the parrent.
		parent.classList.add('dozy-parent');
		parent.style.paddingBottom = padding + '%';
	} else {

	}
});

// After adding padding to each parent element.
dozyelements.forEach( (element) => {
	let src = element.getAttribute('data-src');
	if ( element.nodeName === 'IMG' ) {
		let srcset = element.getAttribute('data-srcset');
		if (srcset) {
			element.setAttribute('srcset', srcset);
		}
		if (src) {
			element.setAttribute('src', src);
		}
		return;
	} 
	if ( element.nodeName === 'IFRAME' ) {
		if (src) element.setAttribute('src', src);
		return;
	} 
	if (src) {
		element.style.backgroundImage = `url("${src}")`;
	}
});