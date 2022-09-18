window.onload = function () {
    localStorage.clear()
}
function dropHandler(event, input) {
    try {
        event.preventDefault();
        if (input != "interna" && input != "externo") {
            throw new Error("Problema com o tipo do input informado")
        }
        const item = event.dataTransfer.items
        if (item.length > 0) {
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
var uri = "https://api.adviceslip.com/advice";
function get() {
    var req = new XMLHttpRequest();
    req.addEventListener("readystatechange", function () {
        if (this.readyState !== 4) {
            new Promise(() => {
                $('#modal-comp').modal('show');
                
            },5000);
        }
        if (this.readyState === 4) {
            console.log(req.response);
            //$('#modal-comp').modal('hide');
        }
    });
    req.open('GET', uri, true);
    req.send('');
}

function habilitarBotao(){
    // let imgExt = document.querySelector(".imgExtIconContainer");
    // let imgInt = document.querySelector(".imgIntIconContainer");
    let button = document.querySelector(".button");
    let imgExt = document.querySelector(".imgExtIconContainer").value;
    let imgInt = document.querySelector(".imgIntIconContainer").value;

    if (imgExt !== "" && imgExt !== "") {
        button.disabled = false; 
      } else {
        button.disabled = true;
      }
    // $('.imgExtIconContainer').on('label change', function () {
    //     if ($(this).val() != '') {
    //         $('#submit').prop('disabled', false);
    //     }
    //     else {
    //         $('#submit').prop('disabled', true);
    //     }
    // });
}