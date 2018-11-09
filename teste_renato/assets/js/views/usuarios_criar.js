{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-usuarios-usuario",
	"events": {
		/*
		"click .nav > a": function (event) {
			event.preventDefault();
			event.stopPropagation();
			var $currentTarget = this.$(event.currentTarget),
				self = this;
			$currentTarget.parent("div").children("a").each(function (index, element) {
				self.$(element).removeClass("active");
			});
			$currentTarget.toggleClass("active");
		},
		*/
		"submit form.form-registrar": "salvarUsuario"
	},
	"salvarUsuario": function salvarUsuario(event) {
		event.preventDefault();
		event.stopPropagation();
		var form = new FormData(document.getElementById("form-registrar")),
			$currentTarget = this.$(event.currentTarget);
		this.collection.usuarios.create(null, {
			processData: false,
			contentType: false,
			data: form,
			context: this,
			success: function (collection, response, options) {
				if (response.error) {
					this.$(".help-block").remove();
					for (var n in response.errors) {
						$currentTarget.find("[name=" + n + "]").closest(".form-group").attr("class", "form-group has-error");
						for (o in response.errors[n]) {
							$currentTarget.find("[name=" + n + "]").after('<span class="help-block">' + response.errors[n][o] + '</span>');
						}
					}
				}
				else {
					adagio.eventBus.trigger("navigate", "!" + adagio.environment.getTenancy("usuarios?tipo=" + this.$('select[name=papel] option:selected').text().toLowerCase()), {"trigger": true});
				}
			}
		});
	},
	"template": _.template(`
	<div class="container-fluid">
	<div class="row">
		<div class="col-sm-6 col-sm-offset-3">
			<div class="">
				<form class="form-horizontal form-registrar" id="form-registrar">
				<input name="id" value="<%= adagio.id %>" type="hidden">
				<div class="form-group">
					<label class="col-sm-4 control-label" for="nome">Nome Completo
					</label>
					<div class="col-sm-8"><input id="nome" name="nome" class="form-control" type="text" value="<%=adagio.attributes.nome_motorista%>" required>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="documento">CPF/CNPJ
					</label>
					<div class="col-sm-8">
						<input id="documento" name="documento" class="form-control" type="text" value="<%=adagio.attributes.cpf_motorista%>" required>
						<input id="autenticidade" name="autenticidade" type="hidden">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="email">E-mail
					</label>
					<div class="col-sm-8"><input id="email" name="email" class="form-control" type="email" value="<%=adagio.attributes.nome_motorista%>" required>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="papel">Função
					</label>
					<div class="col-sm-8">
						<select id="papel" name="papel" class="form-control" required><option value="0">Selecionar...</option>
						<% this.collection.papeis.each (function (papel) { %>
						<option value="<%= papel.get ('id') %>"><%= papel.get ('papel').toUpperCase () %></option>
						<% }); %>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="contexto">Titular
					</label>
					<div class="col-sm-8">
						<select id="titular" name="titular" class="form-control"><option value="0">Nenhum</option>
						<% this.collection.empresas.each (function (empresa) { %>
						<option value="<%= empresa.get('id') %>"><%= empresa.get('nome').toUpperCase () %></option>
						<% }); %>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="contexto">Negócio
					</label>
					<div class="col-sm-8">
						<select id="contexto" name="contexto" class="form-control" required><option value="0">Selecionar...</option>
						<% this.collection.contextos.each(function (contexto) { %>
						<option value="<%= contexto.get('id') %>"><%= contexto.get('contexto').toUpperCase() %></option>
						<% }); %>
						</select>
					</div>
				</div>
				<!--
				<div class="form-group">
					<label class="col-sm-4 control-label" for="foto">Foto
					</label>
					<div class="col-sm-8"><input type="file" id="foto" name="foto" disabled>
					</div>
				</div>
				-->
				<div class="form-group">
					<label class="col-sm-4 control-label" for="password">Senha
					</label>
					<div class="col-sm-8"><input id="password" name="password" class="form-control" type="password" value="<%=adagio.attributes.nome_motorista%>" required>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label" for="password_confirmation">Repetir senha
					</label>
					<div class="col-sm-8"><input id="password_confirmation" name="password_confirmation" class="form-control" type="password" value="<%=adagio.attributes.cpf_motorista%>" required>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-4 col-sm-8">
						<div class="checkbox"><label><input type="checkbox" name="login"> Autenticar depois de criar</label>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-4 col-sm-8"><button type="submit" class="btn btn-default">Cadastrar</button>
					</div>
				</div>
				</form>
			</div>
		</div>
	</div>
	</div>
	`,
	{variable: 'adagio'}),
	"initialize": function () {
		try {
			this.load("web").release();
		}
		catch (thrown) {
			console.error(thrown);
		}
	},
	"render": function () {
		this.collection.usuarios = new Backbone.Collection();
		this.collection.usuarios.url = adagio.environment.getEndpoint('usuarios');
		if (this.$el.attr("class") === undefined) {
			this.$el.html(this.template(this.model)).attr("class", this.className);
		}
		else if (this.$el.attr("class") !== this.className) {
			this.$el.html(this.template(this.model)).attr("class", this.className);
		}
		else {
			//
		}
		return this;
	}
}