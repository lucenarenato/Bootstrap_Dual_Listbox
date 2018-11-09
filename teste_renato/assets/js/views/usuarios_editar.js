{
	tagName: "div",
	id: "adagio-home",
	className: "adagio-usuarios-editar",
	events: {
		"click #form-salvar": function (event) {
			event.stopPropagation();
			event.preventDefault();

			$.ajax({
				data: this.$("#form-editar").serialize(),
				url: adagio.environment.getEndpoint("usuarios/" + this.model.get('id')),
				dataType: "json",
				method: "PUT",
				context: this
			}).
			done(function (collection, response, options) {
				if (collection && collection.error) {
					this.$(".help-block").remove();
					for (var n in collection.errors) {
						this.$(event.currentTarget).find("[name=" + n + "]").closest(".form-group").attr("class", "form-group has-error");
						for (o in collection.errors[n]) {
							this.$(event.currentTarget).find("[name=" + n + "]").after('<span class="help-block">' + collection.errors[n][o] + '</span>');
						}
					}
				}
			});

			return this;
		},
		"click #form-excluir": function (event) {
			event.preventDefault();
			event.stopPropagation();
			this.model.urlRoot = adagio.environment.getEndpoint("usuarios");
			this.model.destroy({
				success: function (model, response) {
					adagio.eventBus.trigger("navigate", "!" + adagio.environment.getTenancy("usuarios"), {"trigger": true});
				}
			});
		},
		"click #incluirContexto": function (event) {
			event.stopPropagation();
			event.preventDefault();
			this.$(event.currentTarget).closest(".form-group").after(this.contexto({}));
			return this;
		},
	},
	contexto: _.template(`
	<hr>
	<% var i = this.$("select[id^=contexto]").length; %>
	<div class="form-group">
		<label class="col-sm-4 control-label" for="papel[<%= i %>]">Função
		</label>
		<div class="col-sm-8">
			<select id="papel[<%= i %>]" name="contextos[<%= i %>][pivot][papel_id]" class="form-control" required><option value="0">Selecionar...</option>
			<% this.collection.papeis.each (function (papel) { %>
			<option value="<%= papel.get ('id') %>" <%= (cargo.papel === papel.get ('id')? "selected" :"") %>><%= papel.get ('papel').toUpperCase () %></option>
			<% }); %>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-4 control-label" for="contexto[<%= i %>]">Negócio
		</label>
		<div class="col-sm-8">
			<select id="contexto[<%= i %>]" name="contextos[<%= i %>][id]" class="form-control" required><option value="0">Selecionar...</option>
			<% this.collection.contextos.each (function (contexto) { %>
			<option value="<%= contexto.get('id') %>" <%= (cargo.contexto === contexto.get ('id')? "selected" :"") %>><%= contexto.get('contexto').toUpperCase () %></option>
			<% }); %>
			</select>
		</div>
	</div>
	`, {variable: 'cargo'}),
	template: _.template (`
<div class="container-fluid">
<div class="row">
<div class="col-sm-12">
<div class="panel panel-default">
<div class="panel-heading"><strong><%= adagio.get('nome') %></strong></div>
<div class="panel-body">

	<div class="row">
		<div class="col-sm-4">
			<p class="text-center"><img src="http://www.amdadjusters.org/amd/images/profileholder.gif" style="height:96px;width:auto;" /></p>
			<div class="form-group">
				<div class="col-sm-12"><input type="file" id="foto" name="foto" disabled></div>
			</div>
		</div>
		<form class="form-horizontal form-editar" id="form-editar">
		<div class="col-sm-4">
			<div class="">
				<input name="id" value="<%= adagio.get('id') %>" type="hidden">
				<div class="form-group">
					<label class="col-sm-4 control-label" for="nome">Nome
					</label>
					<div class="col-sm-8"><input id="nome" name="nome" class="form-control" type="text" value="<%= adagio.get('nome') %>" required>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="email">E-mail
					</label>
					<div class="col-sm-8"><input id="email" name="email" class="form-control" type="email" value="<%= adagio.get('email') %>" required>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="email_confirmation">Repetir e-mail
					</label>
					<div class="col-sm-8"><input id="email_confirmation" name="email_confirmation" class="form-control" type="email" value="<%= adagio.get('email') %>" required>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="password">Senha
					</label>
					<div class="col-sm-8"><input id="password" name="password" class="form-control" type="password" value="">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="password_confirmation">Repetir senha
					</label>
					<div class="col-sm-8"><input id="password_confirmation" name="password_confirmation" class="form-control" type="password" value="">
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm-4">
			<div class="form-group">
				<label class="col-sm-4 control-label" for="titular">Titular
				</label>
				<div class="col-sm-8">
					<select id="titular" name="titular" class="form-control"><option value="0">Nenhum</option>
					<% this.collection.empresas.each (function (empresa) { %>
					<option value="<%= empresa.get('id') %>" <%= (adagio.get('titular_id') === empresa.get ('id')? "selected" :"") %>><%= empresa.get('nome').toUpperCase () %></option>
					<% }); %>
					</select>
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
				<div class="col-sm-12 text-right">
					<a href="#" class="btn btn-default btn-sm" id="incluirContexto"><i class="fa fa-fw fa-plus"></i> Incluir contexto</a>
				</div>
			</div>
		</div>
		<div class="col-sm-12">
			<hr>
			<div class="form-group">
			<div class="col-sm-12">

			</div>
			</div>
		</div>
		</form>
	</div>

</div>
<div class="panel-footer">
	<button type="button" id="form-salvar" class="btn btn-sm btn-default">SALVAR</button>
	<button type="button" id="form-excluir" class="btn btn-sm btn-danger">DESATIVAR</button>
</div>
</div>
</div>
</div>
	`, {variable: 'adagio'}),
	initialize: function () {
		try {
			this.load("web").release();
		}
		catch (thrown) {
			console.error(thrown);
		}
	},
	render: function () {
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