let input_file = document.getElementById('json');
let text = document.getElementById('jsontext');
let htmlResult = document.getElementById('result');
let data;
let result = '';


input_file.addEventListener('change', readFile);

function readFile() {
	clear();

    if (input_file.files.length == 0) {
        alert('Файл не добавлен!');
        return
    };
    let file = input_file.files[0];
    let jsondb = new FileReader();
    jsondb.readAsText(file);

    jsondb.onload = function() {
        writeResult(jsondb.result);
    };
}

function writeResult(result) {
    data = JSON.parse(result);
    createForm(data);
}

function createForm(object) {
    let formItemsArray = object.form.items;

	for( let i = 0; i < formItemsArray.length; i++) {
	
	let formItem = formItemsArray[i];
	let formItemAttributes = formItem.attributes;
	let validationRules;

	if (Object.keys(formItemAttributes).indexOf('validationRules') > -1) {
		validationRules = formItemAttributes.validationRules[0].type;
	}

	let tag = "";

	switch (formItem.type) {
  		case "filler":
    		createFiller(formItemAttributes);
    		break;
		case "button":
			createButton(formItemAttributes);
			break;
		case "text":
			tag = "input";
			createInput(formItemAttributes, validationRules, tag);
			break;
		case "textarea":
			tag = "textarea"
			createInput(formItemAttributes, formItem.type, tag);
			break;
		case "checkbox":
			createInput(formItemAttributes, formItem.type);
			break;
		case "select":
			let options = formItemAttributes.options;
			let option = '';
			let j = 0;
			while (j < options.length) {
				let selected = options[j].selected ? " selected" : "";
				option = `${option} <option value="${options[j].value}" ${selected}>${options[j].text}</option>`
				j++
			}
			createSelect(formItemAttributes, option)
			break;
		case "radio":
			createInput(formItemAttributes, formItem.type);
			break;
    }
}
	print(result);
}

function createFiller(element) {
    result =`${result} <h3>${element.message}</h3> `;
}

function createButton(element) {
	result =`${result} <input type="button" 
						class="${element.class}" 
						value="${element.text}"> `;
}

function createInput(element, type, tag) {

	let disabled = element.disabled ? " disabled" : "";
	let required = element.required ? " required" : "";
	let checked = element.checked ? " checked" : "";
	let value = (element.value !== undefined) ? ` "value"="${element.value}"` : "";

	result =`${result} <label>${element.label}<${tag} type="${type}"
						name="${element.name}"
						placeholder="${element.placeholder}" 
						${value}
						class="${element.class}"
						${required}
						${disabled}
						${checked}> </${tag}> </label> `;
}

function createSelect(element, options) {
	let disabled = element.disabled ? " disabled" : "";
	let required = element.required ? " required" : "";
	result =`${result} <select name="${element.name}"
						class="${element.class}"
						${required}
						${disabled}> ${options}
	</select> `;
}

function print(result) {
	htmlResult.innerHTML = result;
}

function clear() {
	result = '';
	htmlResult.innerHTML = '';
}