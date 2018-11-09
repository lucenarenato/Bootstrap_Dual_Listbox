{
	"tagName": "div",
	"id": 'adagio-layout',
	"className": 'adagio-userground container-fluid',
	"template": _.template(`
    <style>
html, body, .adagio-userground {
height: 100%;
margin: 0 auto;
}
input[type="text"], input[type="password"], input[type="email"] {
display: block;
margin: 0;
width: 100%;
font-family: sans-serif;
font-size: 18px;
appearance: none;
box-shadow: none;
border-radius: none;
}
input[type="text"]:focus, input[type="password"]:focus, input[type="email"]:focus {
color: #fff;
outline: none;
box-shadow: none;
}
.full-height {
height: 100%;
}
.img-on-55 {
height: 55px;
width: auto;
}
.form-control {
color: #949ba2;
border: none;
border-radius: 4px;
-webkit-box-shadow: none;
box-shadow: none;
-webkit-transition: none;
-o-transition: none;
transition: none;
background-color: #494b54;
position: relative;
font-size: 16px;
height: auto;
padding: 10px;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
}
.form-signin {
max-width: 330px;
padding: 15px;
margin: 0 auto;
}
/*
.form-signin .form-control:focus {
z-index: 2;
}
*/
.form-signin input[type="text"] {
margin-bottom: -1px;
border-bottom-left-radius: 0;
border-bottom-right-radius: 0;
}
.form-signin input[type="password"] {
margin-bottom: 10px;
border-top-left-radius: 0;
border-top-right-radius: 0;
}
.title-login {
color: #fff;
font-size: 24px;
}
.subtitle-login {
color: #949ba2;
line-height: 0;
}
@media only screen and (min-width:600px) {
.full-background {
background: url(/assets/images/login-bg-2.jpg) no-repeat center center fixed;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
color: #FFF; border-radius: 0; height: 100%;
display: block;
}
.full-background > .jumbotron {
display: block;
background: rgba(0,0,0,0.5);
color: #FFF;
border-radius: 0;
}
}
    </style>
    <div class="row full-height">
    <div class="col-md-4 col-xs-12" style="background: #24262d; height: inherit; padding: 0;">
        <div style="height: inherit; overflow-y: auto;"><div id="adagio-user"></div></div>
    </div>
    <div class="col-md-8 col-xs-12 hidden-xs hidden-sm" style="background-color: #FFF; height: inherit; padding: 0;">
        <div style="height: inherit; overflow-y: auto;">
<!-- header -->
<div class="full-background">
	<div class="jumbotron">
	<div class="container">
	<h1>ADAGIO</h1>
	<p>Seja bem vindo! &Eacute; necess&aacute;rio estar autenticado para prosseguir. Por favor, fa&ccedil;a login ou siga as instru&ccedil;&otilde;es de apoio para valida&ccedil;&atilde;o de usu&aacute;rio.</p>
	</div>
	</div>
</div>
<!-- workaround -->
<div class="col-xs-12" style="min-height: 100%;">
	<h2 class="text-right">Precisa de ajuda?</h2>
	<h3><br>Obtendo ou recuperando acesso</h3>
	<ul>
		<li>Vá em <strong>Cadastrar</strong>.</li>
		<li>Informe o <strong>endere&ccedil;o de e-mail</strong> utilizado na opera&ccedil;&atilde;o da qual você faz parte.</li>
		<li>Confira na <strong>caixa de entrada</strong> do e-mail fornecido se alguma mensagem emitida pelo sistema ADAGIO chegou.</li>
		<li>Encontrou? Ent&atilde;o, ative o <strong>token de recupera&ccedil;&atilde;o</strong> através do link indicado na mensagem.</li>
		<li>N&atilde;o encontrou? Aguarde mais um pouco, e/ou confira a sua <strong>caixa de spam</strong>. Busque pelo token de recupera&ccedil;&atilde;o para continuar.</li>
		<li><strong>Parab&eacute;ns!</strong> Voc&ecirc; &eacute; capaz de definir (ou redefinir) a sua pr&oacute;pria senha para autenticar-se.</li>
	</ul>
	<h3><br>Acesso de parceiros diretos</h3>
	<ul>
		<li>Informe-se com o seu superior imediato. Ou procure pelo <a href='m&#97;ilto&#58;su&#112;orte&#64;%6B%6C&#105;%6Fs%2E%63&#111;m&#46;b&#37;72'>suporte t&eacute;cnico</a>.</li>
	</ul>
</div>
<!-- bottom -->
            <div class="col-xs-12" style="width: 100%; height: 200px; padding: 0;">
				<div class="col-xs-4 text-center" style="background-color: #eee; padding: 40px 50px 0; height: inherit;">
					<p style="color: #7f8c8d; letter-spacing: 2px; font-size: 12px; text-transform: uppercase;">realiza&ccedil;&atilde;o</p>
					<img src="/images/klios_1.png" class="img-responsive" />
				</div>
				<div class="col-xs-4 text-center" style="background-color: #eee; padding: 40px 50px 0; height: inherit;">
					<p style="color: #7f8c8d; letter-spacing: 2px; font-size: 12px; text-transform: uppercase;">idealiza&ccedil;&atilde;o</p>
					<img src="/images/safety_2.png" class="img-responsive" />
				</div>
				<div class="col-xs-4 text-center" style="background-color: #eee; padding: 40px 50px 0; height: inherit;">
					<p style="color: #7f8c8d; letter-spacing: 2px; font-size: 12px; text-transform: uppercase;">oferecimento</p>
					<img src="/images/federal_1.png" class="img-responsive" />
				</div>
			</div>
        </div>
    </div>
    </div>
	`, {variable: 'adagio'}),
	"initialize": function () {
		try {
			this
				.getScript("/assets/css/bootstrap.min.css", "css", "bootstrap")
				.release();
		}
        catch (thrown) {
			console.error(thrown);
		}
	},
	"render": function (e) {
		try {
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
			console.error (thrown);
		}
		finally {
			return this;
		}
	}
}