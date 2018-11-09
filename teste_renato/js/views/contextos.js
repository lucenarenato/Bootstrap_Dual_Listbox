{
	tagName: "div",
	id: "adagio-home",
	className: "adagio-operacoes",
	events: {
		"click .nav > a": function (event)
		{
			var self = event.currentTarget, local = {}, global = this;

			global.$(self).parent ("div").children ("a").each (function (index, element)
			{
				global.$(element).removeClass ("active");
			});

			global.$(self).toggleClass ("active");

			return true;
		}
	},
	template: _.template (`
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<ul class="nav nav-pills">
					<li role="presentation" class="active"><a href="#!/usuarios/?tipo=clientes" class="active">Clientes</a></li>
					<li role="presentation"><a href="#!/usuarios/?tipo=assistentes">Assistentes</a></li>
					<li role="presentation"><a href="#!/usuarios/?tipo=analistas">Analistas</a></li>
					<li role="presentation"><a href="#!/usuarios/?tipo=gestores">Gestores</a></li>
					<li role="presentation"><a href="#!/usuarios/?tipo=diretores">Diretores</a></li>
					<li role="presentation" class="pull-right"><a href="#!/usuarios/create">Novo</a></li>
				</ul>
			</div><!-- /.col-md-12 -->
		</div><!-- /.row -->
	</div><!-- /.container-fluid -->

	<div class="container">
		<div class="row"><h4>&nbsp;</h4></div>
		<div class="row"><div class="col-sm-12"><ul class="list-group" id="usuarios"></ul></div></div><!-- /.row -->
	</div><!-- /.container -->
	`, {variable: 'adagio'}),

	initialize: function (options)
	{
		this.load ("default");
		this.release ();
	},

	render: function ()
	{
		var self = this, local = {}, global = window;

		if ($("#" + self.id).length > 0 && $("#" + self.id).html () == "")
		{
			if ($("#" + self.id).replaceWith (self.$el.html (self.template ())))
			{
				//
			}
		}

		// self.collection = new Backbone.Collection (self.collection);
		// self.carregarUsuarios ({ currentTarget: self.$("#usuarios"), preventDefault: function (){} });

		if (_.has (global.pool, self.options.pool))
		{
			global.pool[self.options.pool].resolve (self);
			return global.pool[self.options.pool];
		}
	},
	"carregarUsuarios": function (event)
	{
		try
		{
			var self = event.currentTarget, local = {}, global = this;

			if (global.collection.length === 0) throw "vazio";

			global.fragmento = document.createDocumentFragment ();

			global.collection.each (function (usuario)
			{
				global.fragmento.appendChild (new self.views['usuarios_usuario']({ model: usuario }).el);
			});

			global.$("#usuarios").html (global.fragmento);
		}
		catch (error)
		{
			global.$("#usuarios").html ('<div class="well well-lg text-center"><h3><small>' + error.toUpperCase () + '</small></h3><p>Stakeholders autorizados têm acesso a esse recurso para administração de usuários no sistema.</p><p><a href="#!/usuarios/create" class="btn btn-default">Adicionar um stakeholder</a></p></div>');
		}
		finally
		{
			return event.preventDefault ();
		}
	},
	"subviews":
	{
		"recursos_recurso":
		{
			tagName: "li",
			className: "list-group-item",
			template: _.template (`
			<div class="row">
				<div class="col-sm-12">
				<ul class="list-inline pull-left">
					<li class="visible-md-inline visible-lg-inline"><img src="/images/icon.png" alt="..." class="img-circle" style="height:48px;width:auto;"></li>
					<li><span class="label label-primary"><%= adagio.get ('documento') %></span></li>
					<li><abbr title="<%= adagio.get ('email') %>"><%= adagio.get ('nome') %></abbr></li>
					<li class="visible-md-inline visible-lg-inline text-info"><%= _.uniq (_.pluck (_.flatten (adagio.get ('contextos')), 'contexto')).join (', ') %></li>
				</ul>
				<span class="pull-right"><a href="#!/usuarios/create" class="btn btn-default btn-md"><i class="glyphicon glyphicon-user"></i></a></span>
				</div>
			</div>
			`, {variable: 'adagio'}),
			events: {
			},
			initialize: function (options)
			{
				var self = this, local = {}, global = window;
				// window.console.log (self.model.collection);
				return self.render ();
			},
			render: function ()
			{
				var self = this, local = {}, global = window;
				self.$el.html (self.template (this.model));
				return self;
			}
		}
	}
}
