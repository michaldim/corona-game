const registerButton = document.querySelector("#register");
const registerFormContainer = document.querySelector("#registerFormContainer");
const signInButton = document.querySelector('#signIn');
const signInFormContainer = document.querySelector('#signInFormContainer');
const closeX = document.querySelector(".x");


registerButton.addEventListener("click", () => {
    registerFormContainer.style.display = 'block';
    closeX.style.display = 'block';
});


signInButton.addEventListener("click", () => {
    signInFormContainer.style.display = 'block';
    closeX.style.display = 'block';
});

closeX.addEventListener("click", () => {
    signInFormContainer.style.display = 'none';
    registerFormContainer.style.display = 'none';
    closeX.style.display = 'none';
});



export { registerButton, registerFormContainer, signInButton, signInFormContainer, closeX };