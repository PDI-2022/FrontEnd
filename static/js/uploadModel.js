var formData = new FormData()

const validFormats = [
    ".zip",
    ".tar",
    ".7zip",
]

window.onload = ()=>{
    handleSendButton()
}

function stateHandle(button) {
    let name = document.querySelector("#InputName").value
    formData.delete("name")
    formData.append("name",name)
    let validator = !!formData.get("name") && !!formData.get("model")

    button.disabled = !validator
}

function handleSendButton(){
    let button = document.querySelector("#sendModelBtn");
    let nameInput = document.querySelector("#InputName")
    button.disabled = true;
    nameInput.addEventListener("keyup",()=>{
        stateHandle(button)
    }); 
}

function dropHandler(event) {
    try {
        event.preventDefault();
        const item = event.dataTransfer.items

        if (item.length > 0) {
            const itemAsFile = item[0].getAsFile()
            validateFile(itemAsFile,itemAsFile.name)
        }
        else {
            throw new Error("Arquivo com problema")
        }
    }
    catch (err) {
        console.error(err)
    }
}

function dragOverHandler(event) {
    event.preventDefault();
}

function uploadFileInput(event) {
    if (event.target.files.length > 0) {
        validateFile(event.target.files[0],event.target.files[0].name)
    }
}

function validateFile(itemAsFile,name) {
    formData.delete("model")
    const format = name.substring(name.lastIndexOf("."))
    if (validateFormat(format)) {

        formData.append("model",itemAsFile)

        let button = document.querySelector("#sendModelBtn");
        stateHandle(button)
    }
    else {
        window.alert("Ocorreu um erro com o upload o modelo:\nFormato inválido " + `${format}`)
    }
}

function validateFormat(name){
    return validFormats.includes(name)
}

async function sendModel(){
    let url = "http://127.0.0.1:5000/api/v1/models"

    await fetch(url,{
          method: 'POST',
          body: formData
    }).then(response=>{
        window.location.href = "/"
    }).catch(err=>{
        console.error(err)
    })
}

