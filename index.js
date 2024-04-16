const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');

// Controls whether success or error styling is displayed, displays error message
const showError = (input, message) => {
	const formControl = input.parentElement;

	formControl.classList.remove('success');
	formControl.classList.add('error');

	const errorMessage = formControl.querySelector('.error__message');
	errorMessage.innerText = message;
};

const showSuccess = input => {
	const formControl = input.parentElement;

	formControl.classList.remove('error');
	formControl.classList.add('success');
};

const checkRequired = inputArray => {
	inputArray.forEach(input => {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input.id)} cannot be empty`);
		}
	});
};
//Formatting of error messages for first/last name
const getFieldName = input => {
	return input.charAt(0).toUpperCase() + input.slice(1).replace('n', ' n');
};

// Check whether email address is valid
const checkEmail = input => {
	if (!isValidEmail(input.value)) {
		showError(input, 'Looks like this is not an email');
	} else {
		showSuccess(input);
	}
};
// Email validation
const isValidEmail = email => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
// Check Password Length
const checkLength = (input, min, max) => {
 	if (input.value.trim().length < min) {
 		showError(
 			input,
 			`The ${getFieldName(input.id)} should be at least ${min} characters`
 		);
 	} else if (input.value.trim().length > max) {
 		showError(
 			input,
 			`The ${getFieldName(input.id)} should be less than ${max} characters`
 		);
 	} else {
 		showSuccess(input);
 	}
};
// Event listenrs
form.addEventListener('submit', event => {
	event.preventDefault();

	checkRequired([firstName, lastName, email, password]);

	if (firstName.value.trim() !== '') {
		checkLength(firstName, 2, 20);
	}

	if (lastName.value.trim() !== '') {
		checkLength(lastName, 2, 20);
	}

	if (email.value.trim() !== '') {
		checkEmail(email);
	}

	if (password.value.trim() !== '') {
		checkLength(password, 8, 25);
	}
});