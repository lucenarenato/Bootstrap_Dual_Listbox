{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-usuarios-ver",
	"events": {
		"click #form-editar": function (event) {
			event.preventDefault();
			event.stopPropagation();
			adagio.eventBus.trigger("navigate", "!" + adagio.environment.getTenancy("usuarios/" + this.model.get('id') + "/edit"), {"trigger": true});
		},
		"click #form-excluir": function (event) {
			event.preventDefault();
			event.stopPropagation();
			var confirmar = confirm("Deseja desativar com certeza?");
      		if (confirmar !== true) {
				return false;
			}
			this.model.urlRoot = adagio.environment.getEndpoint("usuarios");
			this.model.destroy({
				"success": function (model, response) {
					console.log(model, response);
					adagio.eventBus.trigger("navigate", "!" + adagio.environment.getTenancy("usuarios"), {"trigger": true});
				},
				"error": function (model, response) {
					console.error(model, response);
					adagio.eventBus.trigger("navigate", "!" + adagio.environment.getTenancy("usuarios"), {"trigger": true});
				}
			});
		},
	},
	"contexto": _.template(`
	<hr>
	<% var i = this.$("select[id^=contexto]").length; %>
	<div class="form-group">
		<label class="col-sm-4 control-label" for="papel[<%= i %>]">Função
		</label>
		<div class="col-sm-8">
			<% this.collection.papeis.each (function (papel) { %>
			<%= (cargo.papel === papel.get ('id') ? papel.get ('papel').toUpperCase () : "") %>
			<% }); %>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-4 control-label" for="contexto[<%= i %>]">Negócio
		</label>
		<div class="col-sm-8">
			<% this.collection.contextos.each (function (contexto) { %>
			<%= (cargo.contexto === contexto.get ('id') ? contexto.get('contexto').toUpperCase () : "") %>
			<% }); %>
		</div>
	</div>
	`,
	{variable: "cargo"}),
	"template": _.template(`
<div class="container-fluid">
<div class="row">
<div class="col-sm-12">
<div class="panel panel-default">
<div class="panel-heading"><strong><%= adagio.get('nome') %></strong>, <%= adagio.get('documentoFormatado') %></div>
<div class="panel-body">

	<div class="row">
		<div class="col-sm-4">
			<p class="text-center"><img src="http://www.amdadjusters.org/amd/images/profileholder.gif" style="height:96px;width:auto;" /></p>
		</div>
		<form class="form-horizontal form-editar">
		<div class="col-sm-4">
			<div class="">
				<input name="id" value="<%= adagio.get('id') %>" type="hidden">
				<div class="form-group">
					<label class="col-sm-4 control-label" for="nome">Nome
					</label>
					<div class="col-sm-8">
						<p class="form-control-static"><%= adagio.get('nome').toUpperCase () %></p>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="email">E-mail
					</label>
					<div class="col-sm-8"><p class="form-control-static"><%= adagio.get('email') %></p>
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm-4">
			<div class="form-group">
				<label class="col-sm-4 control-label" for="titular">Titular
				</label>
				<div class="col-sm-8">
					<p class="form-control-static">
					<% this.collection.empresas.each (function (empresa) { %>
					<%= (adagio.get('titular_id') === empresa.get ('id') ? empresa.get('nome').toUpperCase () : "") %>
					<% }); %>
					</p>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-12">
					<p class="text-center">ou</p>
				</div>
			</div>
			<% if (adagio.get('contextos').length === 0) { %>
			<%= this.contexto ({}) %>
			<% } %>
			<% _.each (adagio.get('contextos'), _.bind (function (cargo, i) { %>
			<%= this.contexto (cargo) %>
			<% }, this)); %>
			<div class="form-group">
				<div class="col-sm-12">
					<small>Quando se tem um Titular, o contexto de Fun&ccedil;&atilde;o e Neg&oacute;cio perde efeito automaticamente.</small>
				</div>
			</div>
		</div>
		</form>
	</div>
</div>
<div class="panel-footer">
	<button type="button" id="form-editar" class="btn btn-sm btn-default">EDITAR</button>
	<button type="button" id="form-excluir" class="btn btn-sm btn-outline btn-danger">DESATIVAR</button></div>
</div>
</div>
</div>
</div>
	`,
	{variable: "adagio"}),
	"initialize": function () {
		try {
			this.load("web").release();
		}
		catch (thrown) {
			console.error(thrown);
		}
	},
	"render": function () {
		try {
			this.$el.html(this.template(this.model)).attr("class", this.className);
		}
		catch (thrown) {
			console.error(thrown);
		}
		finally {
			return this;
		}
	}
}