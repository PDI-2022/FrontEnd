var json={
    "interna":"",
    "externa":""
}
function dropHandler(event, input) {
    try {
        event.preventDefault();
        if (input != "interna" && input != "externa") {
            throw new Error("Problema com o tipo do input informado")
        }
        const item = event.dataTransfer.items
        if (item.length > 0) {
            const itemAsFile = item[0].getAsFile()
            makeBlob(input, itemAsFile)
            stateHandle();
        }
        else {
            throw new Error("Arquivo com problema")
        }
    }
    catch (err) {
        console.error(err)
    }

}
function dragOverHandler(event, input) {
    event.preventDefault();
}
function uploadImgInput(event, input) {
    if (input != "interna" && input != "externa") {
        throw new Error("Problema com o tipo do input informado")
    }
    if (event.target.files.length > 0) {
        makeBlob(input, event.target.files[0])
        stateHandle();
    }
}

function makeBlob(input, itemAsFile) {
    var showIconAndName = false

    if (json[input] == "") {
        showIconAndName = true;
    }
    const name = new String(itemAsFile.name)
    if (validateFormat(name)) {
        var reader = new FileReader();
        reader.onloadend = function () {
            json[input] = {
                "filename": `${name.substring(0,name.lastIndexOf("."))}`,
                "image": `${reader.result.split("data:image/jpeg;base64,")[1]}`,
                "extension": `${name.substring(name.lastIndexOf(".")+1)}`
            }
            if (showIconAndName == true) {
                showTextAndIcon(input, name);
            } else {
                updateTextAndIcon(input, name);
            }
        }
        reader.readAsDataURL(itemAsFile);
        if (input === "interna") {
            buttonInt = true;
        }
        if (input === "externa") {
            buttonExt = true;
        }
    }
    else {
        const formatInvalid = name.substring(name.lastIndexOf("."))
        window.alert("Ocorreu um erro com o upload da imagem " + `${input}` +
            " da semente:\nFormato inválido " + `${formatInvalid}`)
    }
}

function validateFormat(name){
    return name.endsWith(".jpeg") || name.endsWith(".jpg")
}