class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-light  d-flex justify-content-center" style="background-color: #712F26;">                <a class="navbar-brand" href="#" style="display: flex;">
                    <img src="Assets/Logo/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
                    <div style="color: white; padding-left: 12px;">TetraSeed </div>
                </a>
        </nav>
          `
    }
}

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = ` 
        <!-- Footer -->
        <footer class="page-footer font-small blue pt-4">
        
          <!-- Footer Links -->
          <div class="container-fluid text-center text-md-left">
        <hr class="line"/>
        <div>
            <h6>Projeto desenvolvido pela equipe de Interface na disciplina de PDI 2022 - UFC</h6>
        </div>
        <div class="row"> 
            <div class="col-4">
            </div>
            <div class="col-2">
                <h5>Contato</h4>
            </div>
            <div class="col-2">
                <h5>Suporte</h4>
            </div>
            <div class="col-4"></div>
        </div>
        </div>
        <!-- Copyright -->
      </footer>
      <!-- Footer -->`
    }
}
customElements.define('main-header', Header);
customElements.define('main-footer', Footer);