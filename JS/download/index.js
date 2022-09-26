window.onload = function () {
    var arquivoCsv = sessionStorage.getItem('arquivoCsv');
    const arquivo = JSON.parse(arquivoCsv);

    var elem1 = document.createElement('img')
    elem1.src = "Assets/Icons/imgUpload.svg";
    var elem2 = document.createElement('label');
    elem2.setAttribute('id', `img-arquivo`);
    elem2.innerHTML = arquivo.nome;
    document.getElementsByClassName('arquivo')[0].appendChild(elem1);
    document.getElementsByClassName('arquivo')[0].appendChild(elem2);

    console.log(arquivo);
}
function goback() {
    location.href = 'index.html';
}
// function downloadCsv() {
//     var url = '';
//     window.open(url, "_blank");
// }
function download() {
    var req = new XMLHttpRequest();
    req.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            const obj = JSON.parse(req.response);
            const csvString = createCSV(
                documents, obj
            );
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
            }
        }
    });
    var url = '';
    req.open('GET', url, true);
    req.send('');
}
const documents = [
    {
        Header: "Id",
        accessor: "idProduto",
    },
    {
        Header: "Nome",
        accessor: "descricaoProcessamento",
    },
];
function createCSV(headers, content) {
    let _headers = "";
    headers.forEach((item) => {
        _headers += item.Header + ";";
    });
    let _content = "";
    content.forEach((val) => {
        var line = "";
        headers.forEach((hd) => {
            if (hd.Cell) {
                line += hd.Cell(val) + ";";
                return;
            }
            line += val[hd.accessor] + ";";
        });
        _content += line + "\n";
    });
    return _headers + "\n" + _content;
};
