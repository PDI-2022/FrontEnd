window.onload = function(){
    localStorage.clear()
}
function dropHandler(event, input){
    try{
        event.preventDefault();
        if(input != "interna" && input != "externo"){
            throw new Error("Problema com o tipo do input informado")
        }
        const item = event.dataTransfer.items
        if(item.length > 0){
            const itemAsFile = item[0].getAsFile()
            const name = itemAsFile.name

            var reader = new FileReader();
            reader.onloadend = function () {
                var json = {
                    "fileName": `${name}`,
                    "base64": `${reader.result}`
                };
                localStorage.setItem(input, JSON.stringify(json));
            }
            reader.readAsDataURL(itemAsFile);
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
