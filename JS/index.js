window.onload = function(){
    localStorage.clear()
}
function dropHandler(event, input){
    try{
        event.preventDefault();
        if(input != "interna" && input != "externa"){
            throw new Error("Problema com o tipo do input informado")
        }
        const item = event.dataTransfer.items
        if(item.length > 0){
            const itemAsFile = item[0].getAsFile()
            makeBlob(input,itemAsFile)
        }
        else{
            throw new Error("Arquivo com problema")
        }
    }
    catch(err){
        console.error(err)
    }
     
}
function dragOverHandler(event, input){
    event.preventDefault();
}
function uploadImgInput(event,input){
    if(input != "interna" && input != "externa"){
        throw new Error("Problema com o tipo do input informado")
    }
    if(event.target.files.length > 0){
        makeBlob(input,event.target.files[0])

    }
}

function makeBlob(input,itemAsFile){
        
            const name = itemAsFile.name
            if(name.endsWith(".jpeg") || name.endsWith(".jpg")){
                var reader = new FileReader();
                reader.onloadend = function () {
                    var json = {
                        "fileName": `${name}`,
                        "base64": `${reader.result}`
                    };
                    var showIconAndName = false
                    if(!localStorage.getItem(input))
                        showIconAndName = true
                    localStorage.setItem(input, JSON.stringify(json));
                    if(showIconAndName == true)
                        showTextAndIcon(input,name)
                }
                reader.readAsDataURL(itemAsFile);
            }
            else{
                const formatInvalid = name.substring(name.lastIndexOf("."))
                window.alert("Ocorreu um erro com o upload da imagem " + `${input}` + 
                " da semente:\nFormato inválido " + `${formatInvalid}`)
            }       
}
function showTextAndIcon(input,name){
    var elem1 = document.createElement('img')
    elem1.src = "Assets/Icons/imgUpload.svg"
    var elem2 = document.createElement('label');
    elem2.innerHTML = name;
    elem2.classList.add("label-icon-upload")
    if(input == "externa"){
        document.getElementsByClassName('imgExtIconContainer')[0].appendChild(elem1);
        document.getElementsByClassName('imgExtIconContainer')[0].appendChild(elem2);
    }
    else{
        document.getElementsByClassName('imgIntIconContainer')[0].appendChild(elem1);
        document.getElementsByClassName('imgIntIconContainer')[0].appendChild(elem2); 
    }    
}