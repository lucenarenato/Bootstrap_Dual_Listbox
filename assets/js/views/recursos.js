{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-recursos",
	"template": _.template (`
	<div class="container-fluid"
		<div class="row">
			<div class="col-sm-12">
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
		try
		{
			var self = this;

			self.load ("web").release ();
			self.on ("load", function (event)
			{
				this.carregarRecursos (event);
			},
			this);
		}
		catch (error)
		{
			console.error (error);
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

		if (this.$el.attr ("class") === undefined)
		{
			// load
			this.$el.html (this.template (this.model)).attr ("class", this.className);
			this.carregarMenu ();
		}
		else if (_this.$el.attr ("class") !== _this.className)
		{
			// reload
			this.$el.html (this.template (this.model)).attr ("class", this.className);
			this.carregarMenu ();
		}
		else
		{
			// already
		}
		this.trigger ("load");
	},
	"carregarMenu": function ()
	{
		try
		{
			if (this.model.get ('tipos').length === 0)
				throw "vazio";

			if (this.$("#adagio-sidebar").length === 0)
				throw "inutil";

			var fragmento = document.createDocumentFragment ();

			this.model.get ('tipos').forEach (function (tipo)
			{
				var ul = document.createElement ('ul'),
					li = document.createElement ('li'),
					item = document.createElement ('a'),
					content = document.createTextNode (tipo.resource.substr (0, 1).toUpperCase () + tipo.resource.substr (1));

				ul.setAttribute ('class', 'nav nav-second-level collapse in');
				item.setAttribute ('href', '#!/recursos/?tipo=' + tipo.resource.toLowerCase ());
				item.appendChild (content);
				li.appendChild (item);
				ul.appendChild (li);

				fragmento.appendChild (ul);
			});

			this.$("#adagio-sidebar").html (fragmento);
		}
		catch (error)
		{
			console.error (error);
		}
		finally
		{
			//
		}
	},
	"carregarRecursos": function ()
	{
		try
		{
			if (this.collection.length === 0)
				throw "vazio";

			var fragmento = document.createDocumentFragment ();

			this.collection.each (function (usuario)
			{
				fragmento.appendChild ((new this.subviews.lista ({model: usuario})).el);
			},
			this);

			this.$el.find ("#recursos").html (fragmento);
		}
		catch (error)
		{
			this.
				$el.
				find ("#recursos").
				html (
					'<div class="well well-lg text-center"><h3><small>' +
					error.toUpperCase () +
					'</small></h3><p>Stakeholders autorizados têm acesso a esse recurso para administração de usuários no sistema.</p><p><a href="#!/usuarios/create" class="btn btn-default">Adicionar um stakeholder</a></p></div>'
				);
		}
		finally
		{
			//
		}
	},
	"subviews": {
		"lista": Backbone.View.extend ({
			tagName: "li",
			className: "list-group-item",
			template: _.template (`
			<div class="row">
				<div class="col-sm-12">
				<ul class="list-inline pull-left">
					<li class="visible-md-inline visible-lg-inline"><i class="fa fa-fw fa-link"></i></li>
					<li class="text-muted"><%= adagio.get ('namespace') %></li>
					<li><strong><%= adagio.get ('resource') %></strong></li>
					<li class="text-info"><%= adagio.get ('action') %></li>
				</ul>
				<span class="pull-right"><a href="#!/recursos/<%= adagio.get ('id') %>/edit" class="btn btn-default btn-md"><i class="fa fa-fw fa-cog"></i></a></span>
				</div>
				<% _.each (adagio.get ('autoridades'), function (autoridade) { %>
					<div class="col-sm-12">
					<ul class="list-inline pull-left"><li><span class="label label-primary"><%= autoridade.contexto %></span></li><li class="text-success"><%= autoridade.papel %></li></ul>
					</div>
				<% }); %>
			</div>
			`,
			{
				"variable": "adagio"
			}),
			initialize: function (options)
			{
				return this.render ();
			},
			render: function ()
			{
				this.$el.html (this.template (this.model));
				return this;
			}
		})
	}
}