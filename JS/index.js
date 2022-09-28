window.onload = function () {
    localStorage.clear();
    main.style.display = 'block';
    download.style.display = 'none';
}
function returnHome(){
    window.location.href = '/index.html'
}
function dragOverHandler(event, input) {
    event.preventDefault();
}
let download = document.querySelector("#download-section");
download.style.display = 'none';
let main = document.querySelector("#main-section");
main.style.display = 'block';

async function sendToBack() {
    var req = new XMLHttpRequest();
    const url = new String("http://127.0.0.1:5000/api/v1/upload");
    req.open('POST',url,true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var internalImg = localStorage.getItem("interna")
    var externalImg = localStorage.getItem("externa")
    data = {
        internalImg,
        externalImg
    }
    req.addEventListener("readystatechange", function () {
        if (this.readyState !== 4) {
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
        if (this.readyState === 4 && req.status != 200) {
            console.error(req.response);
            $('#modal-comp').modal('hide'); 
        }
        else if(req.status == 200){
            localStorage.setItem("csv",req.response)
            $('#modal-comp').modal('hide'); 
            main.style.display = 'none';
            download.style.display = 'block';
            var showIconAndName = false
            if (!localStorage.getItem('csv')) {
                showIconAndName = true;
            }
            if (showIconAndName == true) {
                showTextAndIconDownload('arquivo.csv');
                showIconAndName = false;
            }
        }
    });
    req.send(JSON.stringify(data))
}
function goback() {
    main.style.display = 'block';
    download.style.display = 'none';
    removeChild('icon-download');
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
let button = document.querySelector(".botaoEnviar");
button.disabled = true;
let buttonExt = false;
let buttonInt = false;

function stateHandlePage() {
    localStorage.clear();
    main.style.display = 'block';
    download.style.display = 'none';
    button.disabled = true;
    removeChild('icon-upload');
    removeChild('label-icon-upload');
    removeChild('icon-download');
}
function removeChild(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
function stateHandle() {
    button.disabled = buttonExt && buttonInt ? false : true
}
function showTextAndIconDownload(name) {
    var elem1 = document.createElement('img')
    elem1.src = "Assets/Icons/imgUpload.svg";
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
    elem1.src = "Assets/Icons/imgUpload.svg";
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