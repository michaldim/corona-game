const instructions = document.querySelector('#instructions');
const medal = document.querySelector('#medal');
const medalSpan = document.querySelector('#medal span');
const savedNickname = localStorage.getItem('name');//name that was saved from last game

//Putting the name from the localStorage in the nicknameForm (The form that appears at the homepage)
if((savedNickname != '') && (savedNickname != null)) {
    document.forms.nicknameForm.nickname.setAttribute("value", localStorage.name);
    document.forms.nicknameForm.nickname.style.color = "#555555";

    if ((localStorage.getItem('bestScore') != null) && (localStorage.getItem('bestScore') != '') && (localStorage.getItem('bestScore') != 0)) {
        medalSpan.textContent = localStorage.getItem('bestScore');
        medal.style.display = 'block';
    } 
    
}


export { instructions, medal, savedNickname };