window.onload = () =>{
    'use strict'
    const dropArea = document.querySelector('.drop-area');
    const inputArea = document.querySelector('.input-img-container');
    const warningNote = document.querySelector('.warning');
    const inputPick = document.getElementById('file-input');
    const inputLabel = document.querySelector('.file-input-label');
    const textAreaDiv = document.querySelector('.texta-body');
    const textAreaDivCon = document.querySelector('#texta-body');
    const textAreaBackdrop = document.querySelector('.text-backdrop');
    const textArea = document.getElementById('news-text');
    const uploadedHead = document.getElementById('news-title');
    const loaderAnim = document.querySelector('.loading-anime');
    const submitButton = document.querySelector('.submit-button');
    const uploadSection = document.querySelector('.upload-section');
    const verifiedNews = document.querySelector('.verified-news');
    const verifiedTitle = document.querySelector('.verified-title');
    const verifiedImg = document.querySelector('.verified-img');
    const verifiedNewsContent = document.querySelector('.verified-news-content');
    const verifiedImgOthers = document.querySelector('.other-verified-img');
    const resetBtn = document.querySelector('.reset-button');
    const menuBurger = document.querySelector('.fi-rr-menu-burger');
    const menuClose = document.querySelector('.fi-rr-cross');
    const navTray = document.querySelector('.nav-links-container');
    const navTrayOpen = document.querySelector('.nav-tray-open');

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

    //warner function
    const warner = (e) =>{
        e.preventDefault();
        warningNote.classList.toggle('warn-note-second')

        dropArea.removeEventListener('drop',this);
        setTimeout(()=>{
            warningNote.classList.toggle('warn-note-second');
        },5000);
    };


    //image upload class
    class userUpload{
        upload(data, imagesContainer,acceptedImg){
            let firstImgContainer =document.createElement('div');
            firstImgContainer.classList.add('first-main-container');
            firstImgContainer.classList.add('p-0');
            firstImgContainer.classList.add('col');

            let imgContainer = document.createElement('div');
            imgContainer.classList.add('p-2');
            imgContainer.classList.add('main-container');

            let newImg = document.createElement('img');
            newImg.src = data;
            newImg.setAttribute('width','100%');

            imgContainer.append(newImg);
            firstImgContainer.append(imgContainer);
            imagesContainer.append(firstImgContainer);

            let numImg = acceptedImg.length;
            if (numImg<5){
                imagesContainer.classList.add(`row-cols-2`);
            }
            else if (6 > numImg >= 5){
                imagesContainer.classList.add(`row-cols-4`);
            }
            else if (numImg >= 6){
                imagesContainer.classList.add(`row-cols-6`);
            }     
        
            //removing display for input element
            if (inputArea.classList.contains('hide') == false){
                inputArea.classList.toggle('hide');
            };

            imgContainer.onmouseover = (e) =>{
                newImg.style.filter = 'brightness(50%)'
                newImg.style.transition = 'all 0.5s'
            }
            imgContainer.onmouseleave = (e) =>{
                newImg.style.filter = 'brightness(100%)'
                newImg.style.transition = 'all 0.5s'
            }


            //click to close event for imgs
            imgContainer.onclick = (e) =>{
                if (imagesContainer.children.length > 1){
                    firstImgContainer.remove();
                }else{
                    firstImgContainer.remove();
                    imagesContainer.remove();
                    
                    inputArea.classList.toggle('hide');
                
                    dropArea.classList.remove('active-area');
                    inputLabel.innerText = 'choose or drop picture';
        
                    dropArea.addEventListener('drop',Drop);
                    dropArea.removeEventListener('drop', warner);
                }
                
            }
        }
    }

    //img input by browsing
    const inputPicker = (e) =>{

        //activating file browser
        let file = e.target.files;
        
        //creating image container
        var imagesContainer = document.createElement('div');
        imagesContainer.classList.add(`row`);
        imagesContainer.classList.add(`p-3`);
        imagesContainer.classList.add(`m-0`);
        imagesContainer.classList.add(`upload-container`);

        //validating img selection
        let acceptedImg = []; 
        let validImg = ['image/jpeg','image/PNG','image/jpg','image/png'];
        let i

        for(i = 0; i < file.length; i++){
            if (validImg.includes(file[i].type) && file.length< 10 ){
                acceptedImg.push(file[i]);

            }else{
                if (file.length >= 10){
                    alert(`Too much file`);
                    break;
                }else if (!validImg.includes(file[i].type) && file.length < 10){
                    alert(`${file[i].name} was rejected `);
                    i++;
                }
            } 
        }

        

        //getting uploaded img data
        for(i = 0; i < acceptedImg.length; i++){
            let fileReader = new FileReader();
            let data
            
            fileReader.onload = () =>{
                data = fileReader.result;
                const uploader = new userUpload();
                uploader.upload(data,imagesContainer, acceptedImg);
                return dropArea.append(imagesContainer);
            }
            
            fileReader.readAsDataURL(acceptedImg[i]);
        }
       

        let uploaded = (imagesContainer.children);

        if (uploaded.length >1){
            for (i=0; i<uploaded; i++){
                uploaded[i].addEventListener('click',(e)=>{
                    e.preventDefault();

                    if (uploaded[i].classList.contains('col')){
                        uploaded[i].classList.replace('col','col-12');
                    }else{
                        uploaded[i].classList.replace('col-12','col');
                    }
                })
            }
        };
    }
    inputPick.addEventListener('change',inputPicker);

    
    //drag drop 
    const dragOver = (e) => {
        e.preventDefault();

        dropArea.classList.add('active-area');
        inputLabel.innerText = 'drop to upload';
    }
    dropArea.addEventListener('dragover',dragOver);


    const dragLeave = (e) => {
        e.preventDefault();

        dropArea.classList.remove('active-area');
        inputLabel.innerText = 'choose or drop picture'; 
    }
    dropArea.addEventListener('dragleave',dragLeave);


    const  Drop  = (e) => {
        e.preventDefault();
        dropArea.classList.remove('active-area');

        //get file
        const file = e.dataTransfer.files;
        let gridSize = file.length;
        

        //comtaining img formats
        let i = 0;
        let acceptedImg = []; 
        let validImg = ['image/jpeg','image/PNG','image/jpg','image/png'];

        var imagesContainer = document.createElement('div');
        imagesContainer.classList.add(`row`);
        imagesContainer.classList.add(`p-3`);
        imagesContainer.classList.add(`m-0`);
        imagesContainer.classList.add(`upload-container`);

        
        for(i = 0; i < gridSize; i++){
            if (validImg.includes(file[i].type) && file.length< 10 ){
                acceptedImg.push(file[i]);

            }else{
                if (file.length >= 10){
                    alert(`Too much file`);
                    break;
                }else if (!validImg.includes(file[i].type) && file.length < 10){
                    alert(`${file[i].name} was rejected `);
                    i++;
                }
            }
        };

        if (acceptedImg.length >= 1){
            for(i = 0; i< acceptedImg.length; i++){
                let data
                let fileReader = new FileReader();

                fileReader.onload = () =>{
                    data = fileReader.result;
                    const uploader = new userUpload();
                    uploader.upload(data,imagesContainer, acceptedImg);
                }
                fileReader.readAsDataURL(acceptedImg[i]);
            }

            //removing display for input element
            if (inputArea.classList.contains('hide') == false){
                inputArea.classList.toggle('hide');
            }
            dropArea.removeEventListener('drop',Drop);
            dropArea.addEventListener('drop', warner);
        }else{
            console.log('somthing just happen rn');
            dropArea.classList.remove('active-area');
            inputLabel.innerText = 'choose or drop picture';
        };

        return dropArea.append(imagesContainer);   
    }   
    dropArea.addEventListener('drop',Drop);
    
    //textarea validation
    let message;

    //censure check for text area
    textArea.onkeyup = (e) =>{
        var text = textArea.value;

        const censures = ['fuck','fucking','fuckers','fucker', 'fuckery','ass','asshole','doggy','pussy', 'motherfucker', 'fag', 'niggah', 'retard', 'ode', 'bastard', 'mumu', 'werey', 'idiot', 'cock', 'bitch', 'cunt', 'pscho','shit'];
        message = text;

        let messagePass = text;
        let messageCode = messagePass.split(' ');

        textAreaDiv.innerHTML = message;
        let messageCodeM = textAreaDiv.innerHTML;
        let messageCodeS = messageCodeM.split(' ');

        let i;

        for (i in messageCode){
            if (censures.includes(messageCode[i].toLowerCase()) && messageCodeS[i].search('<match>') === -1 ){
                let cur = messageCode[i];
                messageCode[i] = `<mark>${cur}</mark>`;
            }else{
                i++
            }
        }
    
        message = messageCode.join(' ');
        textAreaDiv.innerHTML = message;

        textAreaDiv.scrollTop =textArea.scrollTop;

        //enable submit button
        if (textArea.value !== '' && uploadedHead.value !== '' && message.search('<mark>') === -1){
            console.log('now');
            submitButton.removeAttribute('disabled');
        }else{
            if(submitButton.hasAttribute('hidden') ===false){
                submitButton.setAttribute('disabled','disabled');
            }
        };
    };

    //sync textarea to textdiv 
    const scroll = (e) =>{
        textAreaDiv.scrollTop =textArea.scrollTop;
    };
    textArea.addEventListener('scroll', scroll);


    //title check for inputbox
    uploadedHead.onkeyup = (e) => {
        //enable submit button
        if (textArea.value !== '' && uploadedHead.value !== '' && message.search('<mark>') === -1){
            console.log('now');
            submitButton.removeAttribute('disabled');
        }else{
            if(submitButton.hasAttribute('hidden') ===false){
                submitButton.setAttribute('disabled','disabled');
            }
        };
    } 


    //submit button
    submitButton.onclick = (e)=>{
        e.preventDefault();
         console.log();

        if (textArea.value !== '' && uploadedHead.value !== '' && message.search('<mark>') === -1){

            //show loading page
            loaderAnim.removeAttribute('hidden');
            uploadSection.setAttribute('hidden','hidden');

            setTimeout(()=>{
                loaderAnim.setAttribute('hidden','hidden');
                verifiedNews.removeAttribute('hidden');
            },200);

            //verified title creation
            let verifiedTitleChild = document.createElement('h5');
            verifiedTitleChild.innerText = uploadedHead.value
            verifiedTitle.append(verifiedTitleChild);


            //verified img creation
            let upImages = document.querySelectorAll('.first-main-container');
            let otherImg = [];
            let i;

            if (upImages.length > 0){
                for (i=0; i< upImages.length; i++){
                    otherImg.push(upImages[i]);
                    let child = upImages[i].firstChild;
                    console.log(child);
                    child.onclick = (e)=>{
                        return false;
                    }
                    child.onmouseover =(e) =>{
                        return false;
                    }
                    child.onmouseout =(e)=>{
                        return false;
                    } 
                }
                verifiedImg.append(otherImg[0]);


                //other verified images
                if (otherImg.length - 1 >= 1){

                    verifiedImgOthers.classList.add('row');
                    if (otherImg.length -1 === 1){
                        verifiedImgOthers.classList.add(`row-cols-1`);
                    }
                    else if (1 < otherImg.length -1 < 5){
                        verifiedImgOthers.classList.add(`row-cols-3`);
                    }
                    else if (6 > otherImg.length -1 >= 5){
                        verifiedImgOthers.classList.add(`row-cols-6`);
                    }
                    else if (otherImg.length -1 >= 6){
                        verifiedImgOthers.classList.add(`row-cols-9`);
                    };

                    for (i = 1; i<otherImg.length; i++){
                        verifiedImgOthers.append(otherImg[i]);
                    };

                }else{
                    verifiedImgOthers.remove();
                }


            }else{
                verifiedImg.remove();
                verifiedImgOthers.remove();
            }

            //verified news content creation
            let verifiedContentText = document.createElement('p');
            verifiedContentText.innerText = textArea.value;

            let verifiedContentChild = document.createElement('div');
            verifiedContentChild.classList.add('rounded-3');
            verifiedContentChild.classList.add('p-3');
            verifiedContentChild.classList.add('m-0');

            verifiedContentChild.append(verifiedContentText);
            verifiedNewsContent.append(verifiedContentChild);
        };

    }

    

    //reset button
    resetBtn.onclick = (e) =>{
        console.log('entry reset');
        e.preventDefault();

        uploadedHead.value = '';
        textArea.value = '';
        textAreaDiv.innerHTML = '';

        if (dropArea.children.length > 1){
            if (inputArea.classList.contains('hide') === true){
                inputArea.classList.toggle('hide');
            }
            document.querySelector('.upload-container').remove();
            dropArea.classList.remove('active-area');
            inputLabel.innerText = 'choose or drop picture';

            dropArea.addEventListener('drop',Drop);
            dropArea.removeEventListener('drop', warner);
        };
        submitButton.setAttribute('disabled','disabled');
    }

    
} 