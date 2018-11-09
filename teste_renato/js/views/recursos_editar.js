{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-recursos-recurso",
	"events": {
		"submit form.autorizar-novo": function (event)
		{
			var self = event.currentTarget, local = {}, global = this;

			local.parametros = {};
			local.parametros.recurso = global.model.get ('recurso').id;
			local.parametros.contexto = parseInt ($(self).find ("[name=contexto]").val ());
			local.parametros.papel = parseInt ($(self).find ("[name=papel]").val ());

			local.opcoes = {};
			local.opcoes.success = function (collection, response, options)
			{
				global.$(".warning").empty ();
				local.modelo = {};
				local.modelo.contexto = _.findWhere (global.model.get ('contextos'), { id: local.parametros.contexto }).contexto;
				local.modelo.papel = _.findWhere (global.model.get ('papeis'), { id: local.parametros.papel }).papel;
				local.modelo.contextoId = local.parametros.contexto;
				local.modelo.papelId = local.parametros.papel;
				global.collection.push ([local.modelo]);
			};
			local.opcoes.error = function (collection, response, options)
			{
				global.$(".warning").empty ();
				if (response.responseJSON.error)
					for (var error in response.responseJSON.errors)
						for (var n in response.responseJSON.errors[error])
							global.$(".warning").append ('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.responseJSON.errors[error][n] + '</div>');
			};

			global.recursosContextualizados.create (local.parametros, local.opcoes);

			return event.preventDefault ();
		},
	},
	"template": _.template (`
<div class="container-fluid"
	<div class="row">
		<div class="col-sm-12">
		<ol class="breadcrumb">
		<li><a href="#!/recursos" class="txt-recurso-namespace"><%= adagio.get ('recurso').namespace %></a></li><li><a href="#" class="txt-recurso-resource"><%= adagio.get ('recurso').resource %></a></li><li class="txt-recurso-action active"><%= adagio.get ('recurso').action %></li>
		</ol>
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
			</div>
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
				<form class="navbar-form navbar-left autorizar-novo" role="search">
					<div class="form-group">
						<select class="form-control" name="contexto"><option value="0">Selecionar...</option>
						<% _.each (adagio.get ('contextos'), function (contexto) { %>
						<option value="<%= contexto.id %>"><%= contexto.contexto.toUpperCase () %></option>
						<% }); %>
						</select>
					</div>
					<div class="form-group">
						<select class="form-control" name="papel"><option value="0">Selecionar...</option>
						<% _.each (adagio.get ('papeis'), function (papel) { %>
						<option value="<%= papel.id %>"><%= papel.papel.toUpperCase () %></option>
						<% }); %>
						</select>
					</div>
					<div class="form-group">
						<button type="submit" class="btn btn-outline btn-success">Autorizar</button>
					</div>
				</form>
			</div>
		</div>
	</nav>
	<div class="warning"></div>
	<ul class="list-group" id="recursos"></ul>
		</div>
	</div>
</div>
	`,
	{
		"variable": "adagio"
	}),
	"initialize": function ()
	{
		var _this = this, strict = {}, globals = window;

		try
		{
			this.load ("web").release ();
		}
		catch (error)
		{
			globals.console.error (error);
		}
		finally
		{
			//
		}
	},
	"render": function ()
	{
		var _this = this, local = {}, global = window;

		if (_this.collection === undefined)
		_this.collection = new Backbone.Collection ();
		else if (_this.collection.cid === undefined)
		_this.collection = new Backbone.Collection (_this.collection);
		else
		_this.collection.reset (_this.collection);

		if (_this.model === undefined)
		_this.model = new Backbone.Model ();
		else if (_this.model.cid === undefined)
		_this.model = new Backbone.Model (_this.model);
		else
		_this.model.set (_this.model);

		if (_this.recursosContextualizados === undefined)
		_this.recursosContextualizados = new Backbone.Collection ();

		_this.collection.url = '/interfaces/recursos/';
		_this.recursosContextualizados.url = '/interfaces/recursos/' + _this.model.get ('recurso').id + '/contextos';
	    _this.listenTo (_this.collection, "add", _this.carregarRecursos);

		if (_this.$el.attr ("class") === undefined)
		{
			// load
			_this.$el.html (_this.template (_this.model)).attr ("class", _this.className);
			_this.carregarMenu ({ currentTarget: _this.$("#adagio-sidebar"), preventDefault: function (){} });
		}
		else if (_this.$el.attr ("class") !== _this.className)
		{
			// reload
			_this.$el.html (_this.template (_this.model)).attr ("class", _this.className);
			_this.carregarMenu ({ currentTarget: _this.$("#adagio-sidebar"), preventDefault: function (){} });
		}
		else
		{
			// already
		}

		_this.carregarRecursos ({currentTarget: _this.$("#recursos"), preventDefault: function () {}});
	},
	"carregarMenu": function (event)
	{
		try
		{
			var self = event.currentTarget, local = {}, _this = this;

			if (_this.model.get ('tipos').length === 0) throw "vazio";

			local.fragmento = document.createDocumentFragment ();

			_this.model.get ('tipos').forEach (function (tipo)
			{
				var ul = document.createElement ('ul');
				ul.setAttribute ('class', 'nav nav-second-level collapse in');
				var li = document.createElement ('li');

				var item = document.createElement ('a');
				var content = document.createTextNode (tipo.action.substr (0, 1).toUpperCase () + tipo.action.substr (1));
				item.setAttribute ('href', '#!/recursos/' + tipo.id + '/edit');
				item.appendChild (content);
				local.fragmento.appendChild (item);

				item.appendChild (content);
				li.appendChild (item);
				ul.appendChild (li);
				local.fragmento.appendChild (ul);
			});

			$("#adagio-sidebar").html (local.fragmento);
		}
		catch (error)
		{
			this.$("#recursos").html ('<div class="well well-lg text-center"><h3><small>' + error.toUpperCase () + '</small></h3><p>Stakeholders autorizados têm acesso a esse recurso para administração de usuários no sistema.</p><p><a href="#!/usuarios/create" class="btn btn-default">Adicionar um stakeholder</a></p></div>');
		}
		finally
		{
			if (event === undefined)
			return false;
			else if (event.preventDefault === undefined)
			return false;
			else
			return event.preventDefault ();
		}
	},
	"carregarRecursos": function (event)
	{
		try
		{
			var self = event.currentTarget, local = {}, _this = this;

			if (_this.collection.length === 0) throw "vazio";

			local.fragmento = document.createDocumentFragment ();

			_this.collection.each (function (recurso)
			{
				local.fragmento.appendChild (new this.subviews.autoridades ({model: recurso}).el);
			});

			_this.$("#recursos").html (local.fragmento);
			_this.$(".txt-recurso-namespace").text (_this.model.get ('recurso').namespace);
			_this.$(".txt-recurso-resource").attr ("href", '#!/recursos/?tipo=' + _this.model.get ('recurso').resource).text (_this.model.get ('recurso').resource);
			_this.$(".txt-recurso-action").text (_this.model.get ('recurso').action);
		}
		catch (error)
		{
			this.$("#recursos").html ('<div class="well well-lg text-center"><h3><small>' + error.toUpperCase () + '</small></h3><p>Stakeholders autorizados têm acesso a esse recurso para administração de usuários no sistema.</p><p><a href="#!/usuarios/create" class="btn btn-default">Adicionar um stakeholder</a></p></div>');
		}
		finally
		{
			if (event === undefined)
			return false;
			else if (event.preventDefault === undefined)
			return false;
			else
			return event.preventDefault ();
		}
	},
	"subviews": {
		"autoridades": Backbone.View.extend ({
			"tagName": "li",
			"className": "list-group-item",
			"template": _.template (`
			<div class="row">
				<div class="col-sm-12">
				<ul class="list-inline pull-left">
					<li class="visible-md-inline visible-lg-inline"><i class="fa fa-fw fa-user"></i></li>
					<li class="text-muted"><%= adagio.get ('contexto') %></li>
					<li><strong><%= adagio.get ('papel') %></strong></li>
				</ul>
				<span class="pull-right">
					<a href="#!/usuarios/create" class="btn btn-link btn-xs remove"><i class="fa fa-fw fa-remove"></i></a>
				</span>
				</div>
			</div>
			`,
			{
				"variable": "adagio"
			}),
			"events": {
				"click .remove": function (event)
				{
					event.preventDefault ();
					this.model.destroy (); 
				}
			},
			"initialize": function (options)
			{
				return this.render ();
			},
			"render": function ()
			{
				this.$el.html (this.template (this.model));
				return this;
			}
		})
	}
}