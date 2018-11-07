{
	"tagName": "div",
	"id": 'adagio-layout',
	"className": 'row membership',
	"template": _.template (`
    <div class="col-lg-8 col-md-6 hidden-sm hidden-xs membership-brand">
        <div class="brand-wrapper">
            <div class="brand-container">
				<a href="#"><img class="brand-logo" src="/assets/images/adagio_lil_white.png" alt="ADAGIO" /></a>
                <div class="brand-title">Seja bem vindo ao ADAGIO</div>
                <div class="brand-subtitle">Entre com uma conta agora mesmo.</div>
                <div class="brand-description">O que é?<br /><strong>ADAGIO</strong> é um Software As A Service (SaaS) otimizado para atender negócios em gestão de risco para o nicho logístico. Acompanha-se das últimas tendências tecnológicas para melhor desempenho das aplicações. E diferencia-se pela criação de novas funcionalidades sob demanda.</div>
                <div class="brand-action">
                    <a class="btn btn-default" href="mailto:comercial@klios.com.br">ENTRAR EM CONTATO</a>
                </div>
                <ul class="brand-links">
                    <li><a href="#">Termos de uso</a></li>
                    <li><a href="#">SLA</a></li>
                    <li><a href="#">Contato</a></li>
                    <li><a href="#">Suporte</a></li>
                </ul>
            </div>

        </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 membership-container">
        <a href="" class="hidden-lg hidden-md"><img class="brand-logo" src="/assets/images/adagio_lil_white.png" alt="KLIOS" /></a>
		<div id="adagio-home"></div>
    </div>

	`, {variable: 'adagio'}),
	"initialize": function () {
		try {
			this
				.getScript("/assets/css/bootstrap.min.css", "css", "bootstrap")
				.getScript("/assets/css/animate.min.css", "css")
				.getScript("/assets/css/application.css", "css", "theme")
				.getScript("/assets/js/modernizr.js", "js")
				.release();
		}
		catch (thrown) {
			console.error(thrown);
		}
	},
	"render": function (e) {
		try
		{
			if (this.$el.attr ("class") === undefined) {
				this.$el.html (this.template (this.model)).attr ("class", this.className);
			}
			else if (this.$el.attr ("class") !== this.className) {
				this.$el.html (this.template (this.model)).attr ("class", this.className);
			}
			else {
				//
			}
		}
		catch (thrown) {
			console.error(thrown);
		}
		finally {
			return this;
		}
	}
}