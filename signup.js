/*SELEZIONE FOTO*/
let i=0;
function onClick(event){
    const target = document.querySelector('.foto input');
    const foto = document.querySelectorAll('.choice-grid div img');
    const box = event.currentTarget;
    const section = box.parentElement;
    const array = section.querySelectorAll('div');
    i = 0;
    for (const x of array) {
        if (x === box) {
            target.value = foto[i].src;
            console.log(target.value);
            x.classList.add("selected");
            x.classList.remove("unselected");
        }else {
            target.innerHTML= '';
            x.classList.remove("selected");
            x.classList.add("unselected");
        }
        i++;
    }
}

const div = document.querySelectorAll('.choice-grid div');
for (const select of div) {
    select.addEventListener('click', onClick);
}

//-----NOME
function CheckName(event){
    const name = event.currentTarget;
    const y = document.querySelector('.name span');
    if(name.value.length !== 0){
        name.classList.add('true_in');
        y.classList.remove('error_s');
    }else{
        y.classList.add('error_s');
        name.classList.remove('true_in')
        name.classList.add('error_in');
    }
}

//-----COGNOME
function CheckSurname(event){
    const surname = event.currentTarget;
    const y = document.querySelector('.surname span');
    if(surname.value.length !== 0){
        surname.classList.add('true_in');
        y.classList.remove('error_s');
    }else{
        y.classList.remove('hidden');
        y.classList.add('error_s');
        surname.classList.remove('true_in')
        surname.classList.add('error_in');
    }
}

//-----ONRESPONSE
function onResponse(response){
    return response.json();
}


//-----NOME UTENTE
function CheckUsername(event){
    const username = event.currentTarget;
    const y = document.querySelector('.username span');
    if(!/^[a-zA-Z0-9_]{1,15}$/.test(username.value)){
        y.classList.add('error_s');
        y.textContent = 'Caratteri non validi';
        username.classList.add('error_in');
        username.classList.remove('true_in')
    }
    else{
        fetch("username.php?q="+encodeURIComponent(username.value)).then(onResponse).then(onCheckUsername);
    }
}

function onCheckUsername(json){
    const username = document.querySelector('.username label input');
    if(json.exists == true){
        document.querySelector('.username span').textContent = "Nome utente già utilizzato";
        document.querySelector('.username span').classList.add('error_s');
        username.classList.add('error_in');
        username.classList.remove('true_in');
    }else{
        username.classList.remove('error_in');
        username.classList.add('true_in');
        document.querySelector('.username span').classList.remove('error_s');
    }
}

//-----EMAIL
function CheckEmail(event){
    const email = event.currentTarget;
    const y = document.querySelector('.email span');
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email.value).toLowerCase())){
        y.classList.add('error_s');
        y.textContent = 'Email non valida. Caratteri errati';
        email.classList.add('error_in');
        email.classList.remove('true_in')
    }else{
        fetch("email.php?q="+encodeURIComponent(String(email.value).toLowerCase())).then(onResponse).then(onCheckEmail);
    }
}

function onCheckEmail(json){
    const email = document.querySelector('.email label input');
    if(json.exists == true){
        document.querySelector('.email span').textContent = "Email già utilizzata";
        document.querySelector('.email span').classList.add('error_s');
        email.classList.add('error_in');
        email.classList.remove('true_in');
    }else{
        email.classList.remove('error_in');
        email.classList.add('true_in');
        document.querySelector('.email span').classList.remove('error_s');
    }
}

//-----PASSWORD
let pass = document.querySelector('.password label input');
function CheckPassword(){
    const y = document.querySelector('.password span');
    if(pass.value.length == 0 || pass.value.length < 8){
        y.classList.add('error_s');
        y.textContent = 'Troppi pochi caratteri, riprova!';
        pass.classList.add('error_in');
        pass.classList.remove('true_in');
    }else{
        y.classList.remove('error_s');
        pass.classList.add('true_in');
        pass.classList.remove('error_in');
    }
}

//-----CONFERMA PASSWORD
function CheckConfirmPassword(event){
    const checkpass = event.currentTarget;
    const y = document.querySelector('.confirm_password span');
    if(pass.value !== checkpass.value || checkpass.value.length == 0){
        y.classList.add('error_s');
        y.textContent = 'Le due password non coincidono, riprova!';
        checkpass.classList.add('error_in');
        checkpass.classList.remove('true_in');
    }else{
        y.classList.remove('error_s');
        checkpass.classList.add('true_in');
        checkpass.classList.remove('error_in');
    }
}

document.querySelector('.name label input').addEventListener('blur', CheckName);
document.querySelector('.surname label input').addEventListener('blur', CheckSurname);
document.querySelector('.username label input').addEventListener('blur', CheckUsername);
document.querySelector('.email label input').addEventListener('blur', CheckEmail);
document.querySelector('.password label input').addEventListener('blur', CheckPassword);
document.querySelector('.confirm_password label input').addEventListener('blur', CheckConfirmPassword);
