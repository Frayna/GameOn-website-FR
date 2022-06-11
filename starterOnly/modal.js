
/** Hide/Show navbar in mobile mode */ 
function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// select DOM form display elements
const modalbg = document.querySelector(".bground");
const formData = document.querySelectorAll(".formData");

// get action inputs from the form
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const submit = document.getElementById("submit")

/** generate "Thanks for submit" modal */
const generateGreetings = () => {
	const container = document.createElement("form");
	container.appendChild(document.createElement("p"));
	container.appendChild(document.createElement("button"));
	container.childNodes[0].innerText = "Merci ! Votre réservation a été reçue.";
	container.childNodes[1].innerText = "Valider";
	container.childNodes[1].style.marginTop = "15px";
	// set a refresh class end-form
	container.childNodes[1].className = "btn-submit end-form";
	document.getElementsByClassName("close")[0].className += " end-form";
	// refresh the page and keep cache when end-form DOM elements are clicked
	Array.from(document.getElementsByClassName("end-form")).forEach((e) => e.addEventListener("click", (e) => {
		e.preventDefault();
		location.reload();
	}))
	return container;
}

// submit event
submit.addEventListener('click', (e) => {
	e.preventDefault();
	if (validate()) {
		document.querySelector('form[name=reserve]').style.display = "none";
		const greetings = generateGreetings();
		document.querySelector('.modal-body').appendChild(greetings);
	}
})

/** set class to error on a DOM element with a message
 * @param node the dom element to display as error
 * @param message error message to display
*/
const errorMessage = (node, message) => {
	node.parentNode.setAttribute("data-error", message);
	node.parentNode.setAttribute("data-error-visible", true);
};

/** remove error and valid class to a DOM element 
 * @param node the dom element to remove error state
*/
const clearError = (node) => {
	node.parentNode.removeAttribute("data-error");
	node.parentNode.removeAttribute("data-error-visible");
	node.parentNode.removeAttribute("data-valid");
}

/** set class to valid on a DOM element
 * @param node the dom element to display as valid
*/
const valid = (node) => {
	node.parentNode.setAttribute("data-valid", true);
}

/**
 * <h4 style="text-decoration: underline;"> Validator function </h4>
 * This function check every required input <br/>
 * using regex and javascript
*/
const validate = () => {
	const nameRegex = /^[a-zA-Zăàáâãäåçèéêëìíîïðòóôõöùúûüýÿ\-]{2,}$/;
	const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const tournoisRegex = /^\b([0-9]|[0-9][0-9])\b$/;
	
	let valide = true;
	document.querySelectorAll('[required]').forEach((e) => {
		switch (e.id) {
			case "first":
				if (!e.value.match(nameRegex)) {
					errorMessage(e, "Veuillez entrer 2 caractères ou plus, alphabétique uniquement")
					valide = false;
				} else {
					valid(e);
				}
				break;
			case "last":
				if (!e.value.match(nameRegex)) {
					errorMessage(e, "Veuillez entrer 2 caractères ou plus, alphabétique uniquement")
					valide = false;
				} else {
					valid(e);
				}
				break;
			case "email":
				if (!e.value.match(mailRegex)) {
					errorMessage(e, "Veuillez entrer un mail valide (identifiant@domain.extension)")
					valide = false;
				} else {
					valid(e);
				}
				break;
			case "birthdate":
				if (!e.value) {
					errorMessage(e, "Vous devez entrer votre date de naissance.")
					valide = false;
				} else {
					let value = new Date(e.value);
					let now = new Date(Date.now());
					if ((value.getTime() >= now.getTime()) || (value.getTime() <= (new Date(now.setFullYear(now.getFullYear() - 150))).getTime())) {
						errorMessage(e, "Vous devez entrer votre date de naissance.")
						valide = false;
						break;
					}
					valid(e);
				}
				break;
			case "quantity":
				if (!e.value.match(tournoisRegex)) {
					errorMessage(e, "Veuillez entrer un nombre correct (0-99)")
					valide = false;
				} else {
					valid(e);
				}
				break;
			case "location1":
				if (!document.querySelector('input[name=location]:checked') && document.querySelector('#quantity').value > 0) {
					errorMessage(e, "Veuillez selectionner une ville")
					valide = false;
				} else {
					valid(e);
				}
				break;
			case "checkbox1":
				if (e.checked) {
					valid(e);
				} else {
					errorMessage(e, "Vous devez vérifier que vous acceptez les termes et conditions.")
					valide = false;
				}
			default:
				break;
		}
	})
	return (valide)
}

// show modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// hide modal event
closeBtn.addEventListener("click", () => {
	hideModal();
})

/** hide modal form */
function hideModal() {
	document.querySelector('form[name=reserve]').style.display = "block";
	modalbg.style.display = "none";
}

/** show modal form  */
function launchModal() {
	modalbg.style.display = "block";
}