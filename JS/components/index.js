class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-light  d-flex justify-content-center" style="background-color: #712F26;">
            <a class="navbar-brand" onclick="returnHome()" style="display: flex; cursor: pointer;">
                <img src="Assets/Logo/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
                <div style="color: white; padding-left: 12px;">TetraSeed </div>
            </a>
        </nav>
        <div style="background-color: #fff; padding: 6px 0;"></div>
          `
    }
}
class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = ` 
        <footer class="page-footer font-small blue pt-4">
          <div class="container-fluid text-center text-md-left">
                <hr class="line"/>
                <div>
                    <h6>Projeto desenvolvido pela equipe de Interface na disciplina de PDI 2022 - UFC</h6>
                </div>
                <div class="row"> 
                    <div class="col-4">
                    </div>
                    <div class="col-2">
                        <h6>Contato</h6>
                    </div>
                    <div class="col-2">
                        <h6>Suporte</h6>
                    </div>
                    <div class="col-4"></div>
                </div>
            </div>
        </footer>
      `
    }
}
class ModalLoading extends HTMLElement {
    connectedCallback() {
        this.innerHTML = ` 
        <div class="modal" id="modal-comp" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4 offset-md-4">
                                <div class="spinner-border"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label id="modal-alert" class="form-text text-muted">
                                    Estamos processando as imagens...
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `
    }
}
class DownloadSection extends HTMLElement {
    connectedCallback() {
        this.innerHTML = ` 
        <section class="container-section">
            <div class="container">
                <div class="mt-5 botao">
                    <button type="button" class="btn btn-danger btn-lg" id="botaoDownload" onclick="downloadCsv()">Download</button>
                    <div class="arquivo"></div>
                </div>
                <div class="mt-5 botao">
                    <button 
                        type="button" 
                        class="btn btn-secondary btn-lg botaoVoltar" 
                        data-toggle="tooltip" 
                        data-placement="right" 
                        title="Clique aqui para voltar a tela de envio de imagens"
                        onclick="goback()"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </section>
      `
    }
}
customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('modal-loading', ModalLoading);
customElements.define('download-section', DownloadSection);