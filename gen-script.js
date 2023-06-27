window.onload =()=>{
    'use strict';
    const menuBurger = document.querySelector('.fi-rr-menu-burger');
    const menuClose = document.querySelector('.fi-rr-cross');
    const navTray = document.querySelector('.nav-links-container');
    const navTrayOpen = document.querySelector('.nav-tray-open');
    const userName = document.querySelector('.old-username');
    const userPass = document.querySelector('.pass');
    const loginBtn = document.querySelector('.sign-in');
    const newUserName = document.querySelector('.new-username');
    const newUserPass = document.querySelector('.new-pass');
    const newUserConPass = document.querySelector('.new-pass2');
    const signUpBtn = document.querySelector('.sign-up');
    const openAcctBtn = document.querySelector('.open-acct-btn');
    const ownAcctBtn = document.querySelector('.own-account-btn');
    const signInCon = document.querySelector('.sign-in-container');
    const signUpCon = document.querySelector('.sign-up-container');

    //nav menu for small screens
    menuBurger.onclick = (e) =>{
        menuBurger.setAttribute('hidden','hidden');
        menuClose.removeAttribute('hidden');
        if(navTray.classList.contains('nav-tray-open') === false){
            navTray.classList.toggle('nav-tray-open');
        }
    };
    menuClose.onclick = (e) =>{
        menuBurger.removeAttribute('hidden');
        menuClose.setAttribute('hidden','hidden'); 
        if(navTray.classList.contains('nav-tray-open') === true){
            navTray.classList.toggle('nav-tray-open');
        }
    };

    //detail validation
    loginBtn.onclick = (e) =>{
        e.preventDefault();
        //decoy backend
        const validCrid = [
            {
                'username' : ['bolaahmed@gmail.com','bola ahmed'],
                'password' : '1234567890'  
            },
            {
              'username' : ['emmanuelaberuagba22@gmail.com', 'emmanuel aberuagba'],
              'password' : '1234567890'  
            }   
        ]

        let name = userName.value;
        name = name.toLowerCase();
        let pass = String(userPass.value);

        let i;
        for (i in validCrid){
            let curN = validCrid[i].username;
            let curP = validCrid[i].password;

            if ((curN[0] === name || curN[1] === name) && (curP === pass)){
                location.href ='eye-withness.html';
                userName.classList.add('complete');
                userPass.classList.add('complete');
                
                if (userName.classList.contain('warning')===true || userPass.classList.contains('warning')===true){
                    userName.classList.remove('warning');
                    userPass.classList.remove('warning');
                };
                
            }
            else if ((curN[0] !== name || curN[1] !== name) || (curP !== pass)){
                if (curN !== name && curP === pass){
                    userName.classList.add('warning');
                    userPass.classList.add('warning');
                }else if (curN === name && curP !== pass){
                    userPass.classList.add('warning');
                }
                else if (curN !== name && curP !== pass){
                    userName.classList.add('warning');
                    userPass.classList.add('warning');
                }
            }
            else if ((curN[0] !== name || curN[1] !== name) && (curP !== pass)){
                userName.classList.add('warning');
                userPass.classList.add('warning');
            }
            
        }
    }

    let value = newUserPass.value
    newUserPass.onkeyup = () =>{
        console.log(value); 

        value = newUserPass.value;
        let upperCase = /[A-Z]/g;
        let lowerCase = /[a-z]/g;
        let numbers = /[0-9]/g;
        let spChar = /[\!\@\#\$\%\^\&\*\)\+\-\=\{\(\}\|\;\:\"\'\,\<\.\>\?\|]/g;

        if ((lowerCase.test(value)===true && upperCase.test(value) === true) && (numbers.test(value)=== true || spChar.test(value) ===true) && (value.length >7)){
            newUserPass.classList.add('complete');
            if (newUserPass.classList.contains('semi-complete')===true){
                newUserPass.classList.remove('semi-complete');
            }else if (newUserPass.classList.contains('warning')===true){
                newUserPass.classList.remove('warning');
            }
        }else if ((lowerCase.test(value)===true && upperCase.test(value) === true) && (numbers.test(value)=== true || spChar.test(value) ===true) && (value.length <8)){
            newUserPass.classList.add('semi-complete');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('warning')){
                newUserPass.classList.remove('warning');
            }
        }else if ((lowerCase.test(value)===true && upperCase.test(value) === false) && (numbers.test(value)=== true || spChar.test(value) ===true) && (value.length <8)){
            newUserPass.classList.add('warning');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('semi-complete')===true){
                newUserPass.classList.remove('semi-complete');
            }
        }else if ((lowerCase.test(value)===true && upperCase.test(value) === false) && (numbers.test(value)=== true || spChar.test(value) ===true) && (value.length >7)){
            newUserPass.classList.add('semi-complete');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('warning')===true){
                newUserPass.classList.remove('warning');
            }
        }else if ((lowerCase.test(value)===true && upperCase.test(value) === true) && (numbers.test(value)=== false && spChar.test(value) ===false) && (value.length >7)){
            newUserPass.classList.add('semi-complete');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('warning')===true){
                newUserPass.classList.remove('warning');
            }
        }else if ((lowerCase.test(value)===true && upperCase.test(value) === true) && (numbers.test(value)=== false && spChar.test(value) ===false) && (value.length <8)){
            newUserPass.classList.add('warning');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('semi-complete')===true){
                newUserPass.classList.remove('semi-complete');
            }
        }else if ((lowerCase.test(value)===true && upperCase.test(value) === false) && (numbers.test(value)=== false && spChar.test(value) ===false) && (value.length <8)){
            newUserPass.classList.add('warning');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('semi-complete')===true){
                newUserPass.classList.remove('semi-complete');
            }
        }else if ((lowerCase.test(value)===true && upperCase.test(value) === false) && (numbers.test(value)=== false && spChar.test(value) ===false) && (value.length >7)){
            newUserPass.classList.add('semi-complete');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('warning')===true){
                newUserPass.classList.remove('warning');
            }
        }else if ((lowerCase.test(value)===false && upperCase.test(value) === true) && (numbers.test(value)=== false && spChar.test(value) ===false)&& (value.length >7)){
            newUserPass.classList.add('semi-complete');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('warning')===true){
                newUserPass.classList.remove('warning');
            }
        }else if ((lowerCase.test(value)===false && upperCase.test(value) === true) && (numbers.test(value)=== false && spChar.test(value) ===false)&& (value.length <8)){
            newUserPass.classList.add('warning');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('semi-complete')===true){
                newUserPass.classList.remove('semi-complete');
            }
        }else if ((lowerCase.test(value)===false && upperCase.test(value) === false) && (numbers.test(value)=== true || spChar.test(value) ===true) && (value.length >7)){
            newUserPass.classList.add('semi-complete');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('warning')===true){
                newUserPass.classList.remove('warning');
            }
        }else if ((lowerCase.test(value)===false && upperCase.test(value) === false) && (numbers.test(value)=== true || spChar.test(value) ===true) && (value.length <8)){
            newUserPass.classList.add('warning');
            if (newUserPass.classList.contains('complete')===true){
                newUserPass.classList.remove('complete');
            }else if (newUserPass.classList.contains('semi-complete')===true){
                newUserPass.classList.remove('semi-complete');
            }
        }else if(value ===''){
            newUserPass.classList.remove('warning');
            newUserPass.classList.remove('complete');
            newUserPass.classList.remove('semi-complete');
        }

        //enabling signup button
        if (newUserPass.classList.contains('complete') === true && newUserConPass.classList.contains('complete') === true){
            signUpBtn.removeAttribute('disabled');
        }else {
            if (!signUpBtn.hasAttribute('disabled')){
                signUpBtn.setAttribute('disabled','disabled');
            }
        }
    };



    newUserConPass.onkeyup = (e) =>{
        let conf = newUserConPass.value;
        if (value === conf){
            newUserConPass.classList.add('complete');
            if (newUserConPass.classList.contains('warning')){
                newUserConPass.classList.remove('warning');
            };
        } else if (conf ==='' ){
            newUserConPass.classList.remove('warning');
            newUserConPass.classList.remove('complete');
        }else{
            newUserConPass.classList.add('warning');
            if (newUserConPass.classList.contains('complete')){
                newUserConPass.classList.remove('complete');
            };
        }

        //enabling signup button
        if (newUserPass.classList.contains('complete') === true && newUserConPass.classList.contains('complete') === true){
            signUpBtn.removeAttribute('disabled');
        }else {
            if (!signUpBtn.hasAttribute('disabled')){
                signUpBtn.setAttribute('disabled','disabled');
            }
        }
    }


    //signup 
    signUpBtn.onclick = (e) =>{
        e.preventDefault();
        location.href ='eye-withness.html';
        
    }

    //visibility for password
    newUserPass.onmouseover = () =>{
        newUserPass.type ='text';
    };
    newUserPass.onmouseout = () =>{
        newUserPass.type ='password';
    };
    newUserConPass.onmouseover = () =>{
        newUserConPass.type ='text';
    };
    newUserConPass.onmouseout = () =>{
        newUserConPass.type ='password';
    };
    userPass.onmouseover = () =>{
        userPass.type ='text';
    };
    userPass.onmouseout = () =>{
        userPass.type ='password';
    };

    openAcctBtn.onclick = (e) =>{
        e.preventDefault();
        signInCon.setAttribute('hidden','hidden');
        signUpCon.removeAttribute('hidden');
    };
    ownAcctBtn.onclick = (e) =>{
        e.preventDefault();
        signUpCon.setAttribute('hidden','hidden');
        signInCon.removeAttribute('hidden');
    }
}

