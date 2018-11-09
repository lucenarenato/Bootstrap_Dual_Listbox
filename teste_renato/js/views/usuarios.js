{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-usuarios",
	"events": {
		/*
		"click .nav > a": function (event) {
			var self = event.currentTarget, local = {}, global = this;
			global.$(self).parent("div").children("a").each(function (index, element) {
				global.$(element).removeClass("active");
			});
			global.$(self).toggleClass("active");
			return true;
		}
		*/
	},
	"template": _.template(`
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<ul class="nav nav-tabs nav-justified" role="tablist">
					<li role="presentation"><a href="#!<%= adagio.environment.getTenancy('usuarios?tipo=clientes') %>" class="active">Clientes</a></li>
					<li role="presentation"><a href="#!<%= adagio.environment.getTenancy('usuarios?tipo=assistentes') %>">Assistentes</a></li>
					<li role="presentation"><a href="#!<%= adagio.environment.getTenancy('usuarios?tipo=analistas') %>">Analistas</a></li>
					<li role="presentation"><a href="#!<%= adagio.environment.getTenancy('usuarios?tipo=gestores') %>">Gestores</a></li>
					<li role="presentation"><a href="#!<%= adagio.environment.getTenancy('usuarios?tipo=diretores') %>">Diretores</a></li>
<li role="presentation" class="dropdown">
	<a aria-expanded="false" href="#" id="myTabDrop1" class="dropdown-toggle" data-toggle="dropdown" aria-controls="myTabDrop1-contents"><i class="pe-7s-settings"></i> <span>Opções</span> <i class="pe-7s-angle-down"></i></a>
	<ul class="dropdown-menu" id="myTabDrop1-contents">
		<li><a href="#!<%= adagio.environment.getTenancy('usuarios/create') %>" aria-controls="dropdown1">NOVO</a></li>
		<li><a href="#!<%= adagio.environment.getTenancy('grupos') %>" aria-controls="dropdown2">GRUPOS</a></li>
	</ul>
</li>
				</ul>
			</div><!-- /.col-md-12 -->
		</div><!-- /.row -->
		<div class="row"><br /></div>
		<div class="row">
			<div class="col-sm-12"><ul class="list-group" id="usuarios"></ul></div>
		</div><!-- /.row -->
	</div><!-- /.container -->
	`,
	{"variable": "view"}),
	"initialize": function initialize() {
		try {
			this.load('web').load('usuario_item').release();
		}
		catch (thrown) {
			console.error(thrown);
		}
	},
	"render": function render() {
		try {
			this.$el.html(this.template(this.model)).attr("class", this.className);
			this.carregarUsuarios({currentTarget: this.$("#usuarios"), preventDefault: function (){}});
		}
		catch (thrown) {
			console.error(thrown);
		}
		finally {
			return this;
		}
	},
	"carregarUsuarios": function carregarUsuarios(event) {
		try {
			var self = this;
			if (self.collection.usuarios.length === 0) {
				throw "vazio";
			}
			self.fragmento = document.createDocumentFragment();
			self.collection.usuarios.each(function (usuario) {
				self.fragmento.appendChild(new self.views['usuario_item']({"model": usuario}).render().el);
			});
			self.$("#usuarios").html(self.fragmento);
		}
		catch (error) {
			self.$("#usuarios").empty();
		}
		finally {
			event.preventDefault();
		}
	}
}