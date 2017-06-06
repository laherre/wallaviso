(function() {
	let main_el = '#appSearchs'; 
	if(document.querySelector(main_el) !== null) {
		let appSearchs = new Vue({
			el: main_el,
			delimiters: ['[[', ']]'],
			data: {
				form_search: document.querySelector('#form_search'),
				search: document.querySelector('#form_search input#name').value,
				main: document.querySelector('main'),
				form_add: document.querySelector('#form_add'),
				search_item: '',
				search_send: '',
				results: true,
				confirm_add: false,
				lat: 0,
				lng: 0
			},
			methods: {
				mounted: () => {
					// Get position
					appSearchs.getLocation();
				},
				next: (search_item) => {
					appSearchs.results = false;
					appSearchs.confirm_add = true;
					appSearchs.search_item = search_item;
					appSearchs.main.classList.add('col-sm-12');
					appSearchs.main.classList.remove('col-sm-8');
					// Move scroll to next step
					window.scrollTo(appSearchs.main.scrollTop, 0);
				},
				add: (search_send) => {
					appSearchs.form_add = document.querySelector('#form_add');
					appSearchs.form_add.elements.distance.value =  appSearchs.form_search.elements.distance.value;
					appSearchs.search_send = search_send;
					appSearchs.form_add.elements.add.value = search_send;
					appSearchs.form_add.submit();
				},
				back: () => {
					appSearchs.results = true;
					appSearchs.confirm_add = false;
					appSearchs.main.classList.remove('col-sm-12');
					appSearchs.main.classList.add('col-sm-8');

				},
				saveLocation: (position) => {
					appSearchs.lat = position.coords.latitude;
					appSearchs.lng = position.coords.longitude;
					appSearchs.form_add = document.querySelector('#form_add');
					appSearchs.form_search = document.querySelector('#form_search');
					// Add form
					appSearchs.form_add.elements.lat.value = appSearchs.lat;
					appSearchs.form_add.elements.lng.value = appSearchs.lng;
					// Search form
					appSearchs.form_search.elements.lat.value = appSearchs.lat;
					appSearchs.form_search.elements.lng.value = appSearchs.lng;
					// Enable button search
					let geoposition = document.querySelector('#geoposition');
					geoposition.style.display = 'none';
					let button_search = document.querySelector('#search_button');
					button_search.disabled = false;
				},
				getLocation: () => {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(appSearchs.saveLocation);
					} else {
						vex.dialog.alert({message: 'Imposible geolocalizar. Las busquedas serán globales.', className: 'vex-theme-os danger'});
					}
				}
			}
		});
		appSearchs.mounted();
	}
})();