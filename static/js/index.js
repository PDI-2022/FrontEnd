window.onload = function () {
    localStorage.clear();
}
function returnHome(){
    window.location.href = '/'
}
function dragOverHandler(event, input) {
    event.preventDefault();
}

async function sendToBack(ReceiveImg = false) {
    var tableAux = 0

    if(!!json["interna"] && !!json["externa"]){
        var req = new XMLHttpRequest();
        const url = ReceiveImg ? new String("http://127.0.0.1:5000/api/v1/upload/wtImg") : new String("http://127.0.0.1:5000/api/v1/upload");
        req.open('POST',url,true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var internalImg = JSON.stringify(json["interna"])
        var externalImg = JSON.stringify(json["externa"])
        data = {
            internalImg,
            externalImg
        }
        req.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && req.status != 200) {
                $('#modal-comp').modal('hide'); 
            }
            else if(req.status == 200){
                localStorage.setItem("csv",req.response)
                $('#modal-comp').modal('hide'); 

                var showIconAndName = false
                if (!localStorage.getItem('csv')) {
                    showIconAndName = true;
                }
                if(localStorage.getItem('csv') != '' && tableAux == 0){
                    $('#modal-comp').modal('hide');
                    let botaoImgs = document.getElementById("botaoImgs")
                    botaoImgs.remove()
                    ReceiveImg ? window.location.href = "/seeds" : generateDownloadScreen()
                    tableAux = 1
                }
                if (showIconAndName == true) {
                    showIconAndName = false;
                }
            }
        });
        req.send(JSON.stringify(data))
        new Promise(() => {
            $('#modal-comp').modal({
                show:true,
                backdrop: 'static',
                keyboard: false
            });                
        }, rej=>{
            console.error(rej)
        });
    }
}

function generateDownloadScreen(){
    let main = document.getElementById("main-section");
    let botao = document.getElementById("botao");
    let body = document.getElementsByTagName("body")[0]
    let footer = document.getElementsByTagName("main-footer")[0]
    if(!document.getElementsByTagName("download-section")[0]){
        let download = document.createElement("download-section");
        download.setAttribute("id","download-sectio+n")
        body.appendChild(download)
    }

    main.style.display = "none"
    botao.style.display = "none"
    footer.remove()

    body.appendChild(footer)
}

function downloadCsv() {
    const csvString = localStorage.getItem('csv');
    var blob = new Blob([csvString], { type: 'text/plain;charset=utf-8;' });
    var link = document.createElement("a");
    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "Arquivo.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        stateHandlePage();
    }
}
let buttons = document.querySelectorAll(".botaoEnviar");
buttons.forEach(button => {
    button.disabled = true;
});
let buttonExt = false;
let buttonInt = false;

function stateHandlePage() {
    let main = document.getElementById("main-section");
    let botao = document.getElementById("botao");
    main.style.display = 'flex';
    botao.style.display = 'block';
    buttons.forEach(button => {
        button.disabled = true;
    });
    download = document.getElementsByTagName("download-section")[0];
    download.remove()
    window.location.href ="/"
}
function goBack(){
    window.location.href = "/"
}

function stateHandle() {
    buttons.forEach(button => {
        button.disabled = buttonExt && buttonInt ? false : true;
    }); 
}
function showTextAndIconDownload(name) {
    var elem1 = document.createElement('img')
    elem1.src = "static/Assets/Icons/imgUpload.svg";
    var elem2 = document.createElement('label');
    elem2.setAttribute('id', `img-arquivo`);
    elem2.innerHTML = name;
    elem1.classList.add("icon-download");
    elem2.classList.add("icon-download");
    document.getElementsByClassName('arquivo')[0].appendChild(elem1);
    document.getElementsByClassName('arquivo')[0].appendChild(elem2);
}
function updateTextAndIcon(input, name) {
    let id = `img-label-${input}`;
    let imgLabel = document.querySelector("#" + id);
    imgLabel.innerHTML = name;
}
function showTextAndIcon(input, name) {
    var elem1 = document.createElement('img')
    var elem2 = document.createElement('label');
    elem2.setAttribute('id', `img-label-${input}`);
    elem2.innerHTML = name;
    elem1.classList.add("icon-upload");
    elem2.classList.add("label-icon-upload");
    if (input == "externa") {
        document.getElementsByClassName('imgExtIconContainer')[0].appendChild(elem1);
        document.getElementsByClassName('imgExtIconContainer')[0].appendChild(elem2);
    }
    else {
        document.getElementsByClassName('imgIntIconContainer')[0].appendChild(elem1);
        document.getElementsByClassName('imgIntIconContainer')[0].appendChild(elem2);
    }
}

function readImage() {
    if (this.files && this.files[0]) {
        if(validateFormat(this.files[0].name)){
            var file = new FileReader();
            file.onload = function(e) {
                document.getElementById("preview").src = e.target.result;
            };
            file.readAsDataURL(this.files[0]);
        }
    }
}
document.getElementById("imgButtonExt").addEventListener("change", readImage, false);

function readImage2() {
    if (this.files && this.files[0]) {
        if(validateFormat(this.files[0].name)){
            var file = new FileReader();
            file.onload = function(e) {
                document.getElementById("previews").src = e.target.result;
            };
            file.readAsDataURL(this.files[0]);
        }
    }
}
document.getElementById("imgButtonInt").addEventListener("change", readImage2, false);