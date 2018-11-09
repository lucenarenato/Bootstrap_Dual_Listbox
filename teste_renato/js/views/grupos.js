{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-grupos",
	"events": {
		"submit form.inserir-grupo": function (event) {
			event.stopPropagation();
			event.preventDefault();

			var _this = this,
			strict = {},
			globals = window,
			$currentTarget = this.$(event.currentTarget);

			strict.forms = new FormData($currentTarget.get(0));

			_this.collection.grupos.create(null, {
				wait: true,
				processData: false,
				contentType: false,
				data: strict.forms,
				context: _this,
				complete: function (jqXHR, textStatus) {
					_this.collection.grupos.fetch().done(function () {
						_this.carregarGrupos(event);
					});
				}});
		}
	},
	"template": _.template(`
	<div id="grupos-edit"></div>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
			<div class="adagio-notification"></div>
<nav class="navbar navbar-inverse">
<div class="container-fluid">
<!-- Brand and toggle get grouped for better mobile display -->
<div class="navbar-header">
<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
</div>
<!-- Collect the nav links, forms, and other content for toggling -->
<div class="navbar-collapse" id="bs-example-navbar-collapse-1">
<form class="navbar-form navbar-left inserir-grupo" id="inserir-grupo">
<div class="form-group">
<input type="text" class="form-control" name="grupo">
</div>
<select class="form-control" name="proprietario">
<option value="0">Selecionar...</option>
<% if (this.collection.todos) this.collection.todos.each (function (usuario) { %>
<option value="<%= usuario.get ('id') %>"><%= usuario.get ('nome') %></option>
<% }); %>
</select>
<button type="submit" class="btn btn-success btn-default">Adicionar</button>
</form>
<ul class="nav navbar-nav navbar-right">
<li><a href="#!<%= adagio.environment.getTenancy('grupos') %>">Voltar</a></li>
</ul>
</div>
<!-- /.navbar-collapse -->
</div>
<!-- /.container-fluid -->
</nav>
            </div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div class="panel panel-default">
				<table class="table">
				<thead>
				<tr>
				<th>#</th>
				<th><span class="visible-lg-inline-block">Contexto</span></th>
				<th>Nome</th>
				<th><span class="visible-md-inline-block visible-lg-inline-block">Propriedade</span></th>
				<th></th>
				<th></th>
				</tr>
				</thead>
				<tbody id="usergroups">
				</tbody>
				</table>
				</div>
			</div><!-- /.col-md-12 -->
		</div><!-- /.row -->
	</div><!-- /.container-fluid -->
	`,
	{variable: 'view'}),
	"initialize": function initialize() {
		try {
			this.load("web").release();
		}
		catch (thrown) {
			console.error(thrown);
		}
		finally {
			//
		}
	},
	"render": function render() {
		this.$el.html(this.template(this.model)).attr("class", this.className);
		this.carregarGrupos({currentTarget: this.$("#usergroups"), preventDefault: function (){}});
	},
	"notification": window.handling.notification,
	"carregarGrupos": function carregarGrupos(event) {
		try {
			var fragmento = document.createDocumentFragment();

			if (this.collection.grupos.length === 0)
				throw "vazio";

			this.collection.grupos.each(function (grupo) {
				var item = Backbone.View.extend(this.subviews.grupos_grupo);
				fragmento.appendChild(new item({model: grupo}).el);
			},
			this);

			this.$("#usergroups").html(fragmento);
		}
		catch (error) {
			console.error(error);
			this.$("#usuarios").html(
				'<div class="well well-lg text-center"><h3><small>' +
				error.toUpperCase() +
				'</small></h3><p>Stakeholders autorizados têm acesso a esse recurso para administração de usuários no sistema.</p>' +
				'<p><a href="#!/usuarios/create" class="btn btn-default">Adicionar um stakeholder</a></p></div>'
			);
		}
		finally {
			event.preventDefault();
		}
	},
	"subviews":
	{
		"grupos_grupo":
		{
			"tagName": "tr",
			"template": _.template(`
			<th scope="row"><%= view.get('id') %></th>
			<td><span class="visible-lg-inline-block"><%= view.get('contexto').toUpperCase() %></span></td>
			<td><%= view.get('nome').toString().toUpperCase() %></td>
			<td><span class="visible-md-inline-block visible-lg-inline-block"><%= (view.get('proprietario') ? view.get('proprietario').nome : '') %></span></td>
			<td><span class="visible-lg-inline-block"><%= view.get('usuarios') %></span></td>
			<td>
				<a class="btn btn-default btn-sm" href="#!<%= adagio.environment.getTenancy('grupos/'+view.get('id')+'/usuarios') %>"><i class="fa fa-fw fa-users"></i></a>
				<a class="btn btn-default btn-sm" href="#!<%= adagio.environment.getTenancy('grupos/'+view.get('id')+'/edit') %>"><i class="fa fa-fw fa-cog"></i></a>
			</td>
			`,
			{"variable": 'view'}),
			"initialize": function (options) {
				this.className = 'grupos-tr-' + this.model.get('id');
				this.className += this.model.get('ativo') === 1 || this.model.get('ativo') === true ? '' : ' danger';

				return this.render();
			},
			"render": function () {
				this.$el.html(this.template(this.model)).attr("class", this.className);
				return this;
			}
		}
	}
}