var throttle = require('lodash.throttle');


const refs = {
    form: document.querySelector(".feedback-form"),
    textarea: document.querySelector(".feedback-form textarea"),
}

const STORAGE_KEY = "feedback-form-state";
const formData = {};

refs.form.addEventListener("input", throttle(onFormInput, 500));
refs.form.addEventListener("submit", onFormSubmit);


populateTextArea()

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
   
}

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(formData);

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

}

function populateTextArea() {
     const savedMasseg = localStorage.getItem(STORAGE_KEY);
    const parsedsavedMasseg = JSON.parse(savedMasseg)
    
    if (savedMasseg) {
        refs.form.elements.message.value = parsedsavedMasseg.message || "";
        refs.form.elements.email.value = parsedsavedMasseg.email || "";

    }
}

// нужно добавить чтобы при перезагрузке и изменении одного значения при повторной перезагрузке не очищалось первое поле ввода

