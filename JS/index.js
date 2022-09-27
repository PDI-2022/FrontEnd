window.onload = function () {
    localStorage.clear()
}
function returnHome(){
    window.location.href = '/index.html'
}

async function sendToBack() {
    var req = new XMLHttpRequest();
    const url = new String("http://127.0.0.1:5000/api/v1/upload")

    req.open('POST',url,true)

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
        }
        else if(req.status == 200){
            localStorage.setItem("csv",req.response)
            setInterval(function(){
                $('#modal-comp').modal('hide'); 
              }, 5000);
        }
    });
    req.send(JSON.stringify(data))
}

let button = document.querySelector(".botaoEnviar");
button.disabled = true;
let buttonExt = false;
let buttonInt = false;

function stateHandle() {
    button.disabled = buttonExt && buttonInt ? false : true
}

function updateTextAndIcon(input, name) {
    let id = `img-label-${input}`;
    let imgLabel = document.querySelector("#" + id);
    imgLabel.innerHTML = name;
}
function showTextAndIcon(input, name) {
    var elem1 = document.createElement('img')
    elem1.src = "Assets/Icons/imgUpload.svg"
    var elem2 = document.createElement('label');
    elem2.setAttribute('id', `img-label-${input}`);
    elem2.innerHTML = name;
    elem2.classList.add("label-icon-upload")
    if (input == "externa") {
        document.getElementsByClassName('imgExtIconContainer')[0].appendChild(elem1);
        document.getElementsByClassName('imgExtIconContainer')[0].appendChild(elem2);
    }
    else {
        document.getElementsByClassName('imgIntIconContainer')[0].appendChild(elem1);
        document.getElementsByClassName('imgIntIconContainer')[0].appendChild(elem2);
    }
}