{
	tagName: "div",
	id: "adagio-home",
	className: "adagio-operacoes-ver",
	events: {
		"click .checklist-itens": "carregarItens",
		"click #salvarFeedback": "salvarFeedback",
		"click .mostrar-feedbacks": "mostrarFeedbacks",
		"click .to-edit": "editarInspecao"
	},
	editarInspecao: function editarInspecao(event)
	{
		event.preventDefault();
		adagio.eventBus.trigger("navigate", location.hash + '/edit', {trigger: true});
	},
    mostrarFeedbacks: function mostrarFeedbacks(event)
    {
        event.preventDefault();

        // if body hasClass small_sidebar | obsolete
		if (this.$(".operacao-col-left label").hasClass("hidden-xs") === false) {
            this.$(".operacao-col-left label").addClass("hidden-xs");
            this.$(".operacao-col-left").attr("class", "col-md-12 operacao-col-left");
            this.$(".operacao-col-right").attr("class", "visible-xs-block operacao-col-right");
            this.$('#sidebar_toggle').trigger('click');
        }
        else {
            this.$(".operacao-col-left label").removeClass("hidden-xs");
            this.$(".operacao-col-left").attr("class", "col-md-7 operacao-col-left");
            this.$(".operacao-col-right").attr("class", "col-md-5 operacao-col-right");
            this.$('#sidebar_toggle').trigger('click');
        }
    },
	storage:
	{
		set: function (key, value) {
			if (!key || !value) return [];

			if (typeof value === "object") value = JSON.stringify(value);

			window.localStorage.setItem(key, value);

			return this.get(key);
		},
		get: function (key) {
			var value = localStorage.getItem(key);

			if (!value) return [];

			if (value[0] === "{" || value[0] === "[") value = JSON.parse(value);

			return value;
		},
	},
	"subviews":
	{
		"operacoes_foto":
		{
			tagName: "div",
			className: "col-sm-3",
			template: _.template('<div class="thumbnail">' +
			'<a href="#" class="a-album"><img src="/storage/<%= view.get("id") %>" alt="Imagem" /></a>' +
			'<div class="caption"><p><%= view.get("observacoes") %></p></div>' +
			'</div>',
			{variable: 'view'}),
			initialize: function (options) {
				return this.render();
			},
			render: function () {
				try {
					this.$el.html(this.template(this.model));
					this.model.attributes.update = adagio.environment.getEndpoint(
					["operacoes", this.model.get("operacao"), "fotos", this.model.get("id")].join("/")
					);

					_.each(this.model.attributes, function (value, key, list) {
						this.$el.find("img").data(key, value);
					},
					this);
				}
				catch (error) {
					console.error(error);
				}
				finally {
					this.listenTo(this.model, 'change', this.editing);
					this.listenTo(this.model, 'destroy', this.erasing);

					return this;
				}
			},
			editing: function () {
				try {
					this.$el.find(".thumbnail").replaceWith(this.template(this.model));
				}
				catch (error) {
					console.error(error);
				}
				finally {
					return this;
				}
			},
			erasing: function () {
				return this;
			}
		},
		"checklist": Backbone.View.extend({
			tagName: "div",
			className: "col-lg-12",
			content: document.createDocumentFragment(),
			template: _.template(`
			<% var iterator = 1; %>

			<div class="row">
			<% _.each (adagio.collection, function (group, gindex) { %>

		<p><button class="btn btn-default btn-block" type="button" data-toggle="collapse" data-target="#collapseListGroup<%= gindex %>" aria-expanded="false" aria-controls="collapseExample"><div class="text-left"><%= _.first (group).categoria %></div></button></p>

		<div style="height: 0px;" aria-expanded="false" id="collapseListGroup<%= gindex %>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading<%= gindex %>">
			<div class="list-group">
			<% _.each (group, function (li, index) { %>
			<a data-toggle="collapse" href="#obs<%=iterator%>" aria-expanded="false" aria-controls="collapseExample" class="list-group-item checklist-item <%= (adagio.model.get (li.id) !== undefined ? 'list-group-item-warning' : '') %>" data-checklist="<%= li.id %>">
				<span class="label label-<%= (li.nivel == 4 ? 'danger' : (li.nivel >= 2 ? 'warning' : 'default')) %> hidden-xs"><%= li.nivel %></span>
				<%= li.ocorrencia %>
			</a>
			<div class="collapse" id="obs<%=iterator%>">
				<div class="input-group">
					<span class="input-group-addon"><input type="checkbox" aria-label="..." name="itens[<%=iterator%>][id]" value="<%= li.id %>" <%= (adagio.model.get (li.id) !== undefined ? 'checked' : '') %> disabled></span>
					<input class="form-control" name="itens[<%=iterator%>][observacoes]" value="<%= (adagio.model.get (li.id) !== undefined ? adagio.model.get (li.id).get ('observacoes') : '') %>" type="text" readonly>
				</div>
			</div>
			<% iterator++; %>
			<% }); %>
			</div>
		</div>

			<% }); %>
			</div>
			`, {variable: 'adagio'}),
			initialize: function (options)
			{
				this.options = options;
				this.listenTo(this.collection, 'add', this.render);
				this.render();
			},
			render: function ()
			{
				if (this.collection.length > 0 && this.collection.get(0).attributes[this.options.tesao] !== undefined)
					this.$el.html(this.template({model: this.model, collection: this.collection.get(0).attributes[this.options.tesao]}));
				else
					this.collection.fetch();
				return this;
			},
		}),
	},
	template: _.template(`
<div class="container-fluid">
	<div class="row">
		<div class="col-xs-12 col-sm-6">
			<div class="btn-group">
				<button id="mostra-status" type="button" class="btn btn-default operacao-status">Carregando...</button>
				<button id="controle-status" type="button" class="btn btn-default operacao-status dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>
				<ul class="dropdown-menu" role="menu">
				<li><a href="#" class="codigo-status" data-codigo-status="1">Reprovado</a></li>
				<li><a href="#" class="codigo-status" data-codigo-status="3">Corrigido</a></li>
				<li><a href="#" class="codigo-status" data-codigo-status="5">Aprovado</a></li>
				<li role="separator" class="divider"></li>
				<li><a href="#" class="to-edit">Editar</a></li>
				</ul>
			</div>
			<button type="button" class="btn btn-info mostrar-feedbacks" data-toggle="button" aria-pressed="false" autocomplete="off"><i class="fa fa-fw fa-comment"></i> Feedbacks</button>
		</div>
		<div class="col-xs-12 col-sm-6">
			<p class="lead operacao-autor"></p>
		</div>
	</div><!-- /row -->
	<hr>
	<div class="row">
		<div class="col-sm-12 col-md-12 operacao-col-left">
			<div class="">
				<div class=""></div>
				<form class="form-horizontal form-datas">
				<input name="timestamp" value="<%= _.now() %>" type="hidden">
				<input name="id" value="<%= view.id %>" type="hidden">
<fieldset>
	<div class="form-group">
		<label for="inputTransportadora" class="col-sm-2 control-label">Transportadora</label>
		<div class="col-sm-4"><p class="form-control-static"><%= (view.get('grupo') ? view.get('gruposKit').get(view.get('grupo')).get('nome').toString().toUpperCase() : "INDEFINIDO") %></p></div>
		<label for="inputOutroGrupo" class="col-sm-2 control-label">Planta</label>
		<div class="col-sm-4"><p class="form-control-static"><%= (view.get('outro_grupo') ? view.get('regioesKit').get(view.get('outro_grupo')).get('nome').toString().toUpperCase() : "INDEFINIDO") %></p></div>
	</div>
</fieldset>
				<fieldset><div class="form-group">
					<label class="col-md-2 control-label">Motorista</label>
					<div class="col-md-4"><p class="form-control-static"><%= view.attributes.nome_motorista %></p></div>
					<label class="col-md-2 control-label">CPF</label>
					<div class="col-md-4"><p class="form-control-static"><%= view.attributes.cpf_motorista %></p></div>
				</div></fieldset>
				<% if (view.has('vinculo') && parseInt(view.get('vinculo')) > 1) { %>
				<fieldset><div class="form-group">
					<label class="col-md-2 control-label">Razão Social</label>
					<div class="col-md-4"><p class="form-control-static"><%= view.attributes.razao_motorista %></p></div>
					<label class="col-md-2 control-label">CNPJ</label>
					<div class="col-md-4"><p class="form-control-static"><%= view.attributes.cnpj_motorista %></p></div>
				</div></fieldset>
				<% } %>
				<fieldset><div class="form-group">
					<label class="col-md-2 control-label">Vínculo</label>
					<div class="col-md-4"><p class="form-control-static"><%= (view.get('vinculo') ? view.get('vinculosCollection').at(view.attributes.vinculo).get('name').toString().toUpperCase() : "") %></p></div>
					<label class="col-md-2 control-label">Data</label>
					<div class="col-md-4">
						<p class="form-control-static"><%= (view.get('data') ? view.attributes.data.substr(8, 2)+ "/"+ view.attributes.data.substr(5, 2)+ "/"+ view.attributes.data.substr(0, 4) : "") %></p>
						<input type="hidden" id="data" name="data" value="<%= view.get('data') || "" %>">
					</div>
				</div></fieldset>
<fieldset>
	<div class="form-group">
		<label for="selectConfiguracao" class="col-sm-2 control-label">Configuração</label>
		<div class="col-sm-4">
			<p class="form-control-static"><%= view.get ('configuracoesCollection').get (view.get('configuracao')).get('name').toString().toUpperCase() %></p>
		</div>
	</div>
</fieldset>
				<% var _this = this; _.each (view.get ('placas'), function (placa, i) { %>
				<fieldset><div class="form-group">
					<label class="col-md-2 control-label">Placa</label>
					<div class="col-md-3"><p class="form-control-static"><%= placa.placa %></p><p class="help-block">Placa Veículo</p></div>
					<div class="col-md-3"><p class="form-control-static"><%= (placa.pivot.numero && placa.pivot.numero.length ? placa.pivot.numero : "&nbsp;") %></p><p class="help-block">Número Frota</p></div>
					<div class="col-md-4">
					<p class="form-control-static"><%= this.autocategorias.get(parseInt(placa.pivot.autocategoria_id)) ? this.autocategorias.get(parseInt(placa.pivot.autocategoria_id)).get('autocategoria') : '' %></p>
					<p class="help-block">Categoria Veículo</p>
					</div>
				</div></fieldset>
				<% }, this); %>
				<fieldset><div class="form-group">
					<label for="inputTipo" class="col-md-2 control-label">Percurso</label>
					<div class="col-md-4">
						<p class="form-control-static"><%= view.get('percursosCollection').get(parseInt(view.attributes.tipo)).get ("name") %></p>
					</div>
				</div></fieldset>

<div class="form-group">
	<label class="col-md-2 control-label">Origem</label>
	<div class="col-md-4">
		<p class="form-control-static"><%= (view.attributes.origem_uf === null ? "" : this.subdistritos.findWhere({"uf": parseInt(view.attributes.origem_uf)}).get('nome_uf').toString().toUpperCase()) %></p>
	</div>
	<label class="col-md-2 control-label">Localidade</label>
	<div class="col-md-4">
		<select name="origem_id" class="form-control" id="origem_id" disabled>
			<option value="0">Selecionar...</option>
			<% if (this['subdistritos.'+view.attributes.origem_uf]){ %>
			<% this['subdistritos.'+view.attributes.origem_uf].each (function (subdistrito, i) { %>
			<option <%= (subdistrito.get('codigo_subdistrito') === view.attributes.origem_id ? "selected" : "") %> value="<%= subdistrito.get('codigo_subdistrito') %>"><%= subdistrito.get('nome_distrito') %><%= (subdistrito.get('nome_subdistrito') ? ' &#8212; ' + subdistrito.get('nome_subdistrito') : '') %></option>
			<% }); } %>
		</select>
	</div>
</div>
<div class="form-group show-on-t2" style="display: none;">
	<label class="col-md-2 control-label">Destino</label>
	<div class="col-md-4">
		<p class="form-control-static"><%= (view.attributes.destino_uf === null ? "" : this.subdistritos.findWhere({"uf": parseInt(view.attributes.destino_uf)}).get('nome_uf').toString().toUpperCase()) %></p>
	</div>
	<label class="col-md-2 control-label">Localidade</label>
	<div class="col-md-4">
		<select name="destino_id" class="form-control" id="destino_id" disabled>
			<option value="0">Selecionar...</option>
			<% if (this['subdistritos.'+view.attributes.destino_uf]){ %>
			<% this['subdistritos.'+view.attributes.destino_uf].each (function (subdistrito, i) { %>
			<option <%= (subdistrito.get('codigo_subdistrito') === view.attributes.destino_id ? "selected" : "") %> value="<%= subdistrito.get ('codigo_subdistrito') %>"><%= subdistrito.get ('nome_distrito') %><%= (subdistrito.get ('nome_subdistrito') ? ' &#8212; ' + subdistrito.get ('nome_subdistrito') : '') %></option>
			<% }); } %>
		</select>
	</div>
</div>
<div class="form-group show-on-t2" style="display: none;">
	<label class="col-sm-2 control-label">Posição atual</label>
	<div class="col-sm-4">
		<p class="form-control-static"><%= view.get('posicoesCollection').get(parseInt(view.attributes.posicao)).get ("name").toString ().toUpperCase () %></p>
	</div>
</div>
<div class="clearfix"><br /></div>
<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">Ocorrências levantadas <span class="badge primary"><span class="checklist-counted-ones"><%= this.collection.itens.length || 0 %></span></span></h3>
	</div>
	<ul class="list-group ocorrencias-destacadas"></ul>
	<div class="panel-footer text-right">
		<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="fa fa-fw fa-check-square-o"></i> Ver todas</button>
	</div>
</div>

<!-- Modal -->
<div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog modal-md">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
<h4 class="modal-title" id="myModalLabel">Lista de checagem</h4>
</div>
<div class="modal-body">
<div class="row"><div class="col-sm-12" id="checklistItens"></div></div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-primary" data-dismiss="modal">Concluir</button>
</div>
</div>
</div>
</div>

</form>
			</div><!-- card -->

	<div class="clearfix"><br /></div>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Fotografias <span class="badge primary"><span class="numeros-resultados">0</span></span></h3>
		</div>
		<div class="panel-footer">
			As fotografias só podem ser inseridas quando o documento ainda está em construção/pendente. Depois de finalizado, as novas fotografias só podem ser inseridas por meio de <kbd>feedback</kbd> para ratificação e/ou retificação de algo.
		</div>
	</div>
	<div id="fotos" class="row"></div>
</div><!-- col-md-8 -->
<div class="col-sm-12 col-md-12 visible-xs-block operacao-col-right">

<form id="form-feedbacks" class="">
<div id="operacao-panel-feedback" class="panel panel-default">
	<div class="panel-heading">
		<div class="clearfix">NOVO FEEDBACK <span class="badge primary pull-right"><span class="numeros-feedbacks"></span></span></div></div>
	<div class="panel-body" style="padding: 0 !important;">
		<div class="warning-feedbacks"></div>
		<div class="form-group" style="margin-bottom: 0 !important;"><textarea class="form-control" id="conteudoFeedback" style="border-radius: 0 !important;"></textarea></div>
	</div>
<ul class="list-group">
<li class="list-group-item"><div class="form-group"><input type="file" id="uploadArquivoFeedback" multiple></div></li>
</ul>
	<div class="panel-footer clearfix text-right">
		<p class="pull-left"><span class="files-on-hover">0</span> arquivos na fila</p>
		<a href="#" id="salvarFeedback" class="btn btn-default" role="button" data-teor="0">Publicar</a>
	</div>
</div>
<div id="holderArquivoFeedback" style="display: none;"></div>
</form>
<div id="feedbacks"></div>

		</div><!-- col-md-4 -->
	</div><!-- row -->
	</div><!-- container-fluid -->
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12"></div>
		</div>
	</div>
	`, {variable: 'view'}),
	// version: 1,
	initialize: function ()
	{
		try {
			this.version = 1;

			this.getJSON(adagio.environment.getEndpoint("prestadores"))
				.load("web")
				.release();
		} catch (error) {
			console.error(error);
		} finally {
			//
		}
	},
	render: function ()
	{
		try {
		// Method scopes
		var strict = {}, _this = this, globals = window;

		//
		strict.objectCaches = [
			new globals.objectCache('autocategorias', adagio.environment.getRoot()+'/autocategorias'),
			new globals.objectCache('subdistritos', adagio.environment.getRoot()+'/subdistritos'),
			new globals.objectCache('subdistritos.'+_this.model.get('origem_uf'), adagio.environment.getRoot()+'/subdistritos?uf='+_this.model.get('origem_uf')),
			new globals.objectCache('subdistritos.'+_this.model.get('destino_uf'), adagio.environment.getRoot()+'/subdistritos?uf='+_this.model.get('destino_uf')),
		];
		//
		$.when.apply(null, strict.objectCaches).then(function () {
			var args = Array.prototype.slice.call(arguments);

			for (var n in args) if (args[n] && args[n].instance)
			_this[args[n].instance] = args[n].get('collection');

			_this.model.set(
				'vinculosCollection',
				new Backbone.Collection([
					{"name": "Desconhecido"}, {"name": "Frota"}, {"name": "Agregado"}, {"name": "CIF"}
				])
			);

			_this.model.set(
				'percursosCollection',
				new Backbone.Collection([
					{"id": 0, "name": "Desconhecido"}, {"id": 1, "name": "T1"}, {"id": 2, "name": "T2"}
				])
			);

			_this.model.set(
				'posicoesCollection',
				new Backbone.Collection([
					{"id": 0, "name": "Desconhecido"}, {"id": 1, "name": "Origem"}, {"id": 2, "name": "Destino"}
				])
			);

			_this.model.set(
				'configuracoesCollection',
				new Backbone.Collection([
					{"id": 0, "name": "Desconhecido"},
					{"id": 1, "name": "Caminhão"},
					{"id": 2, "name": "Caminhão e Reboque"},
					{"id": 3, "name": "Bitrem"},
					{"id": 4, "name": "Vanderléia"},
					{"id": 5, "name": "Rodotrem"},
					{"id": 6, "name": "Reboque"},
					{"id": 7, "name": "Semirreboque"}
				])
			);

			_this.$el.html(_this.template(_this.model)).attr("class", _this.className);
			_this.carregarItens({ currentTarget: _this.$(".checklist-itens"), preventDefault: function (){}});
			//
			_this.collection.fotos = new Backbone.Collection();
			_this.collection.fotos.url = adagio.environment.getEndpoint('operacoes/'+_this.model.get('id')+'/fotos');
			_this.collection.fotos.fetch().done(function (response) {
				_this.carregarFotos({currentTarget: _this.$("#fotos"), preventDefault: function (){}});
			});
			// Feedbacks
			if (_this.feedbacks === undefined) {
				// Object collection
				_this.feedbacks = new (Backbone.Collection.extend({
				parse: function (response)
				{	// It updates the caller view model and its collection
					_.extend(_this.model, response.model);
					return (response.collection ? response.collection : []);
				}
				}))();
				// Event listen
				_this.listenTo(_this.feedbacks, 'sync', function () {
					_this.carregarFeedbacks({currentTarget: _this.$("#feedbacks"), preventDefault: function (){}});
					return false;
				});
			}
			// Web service
			_this.feedbacks.url = adagio.environment.getEndpoint('operacoes/'+_this.model.get('id')+'/feedbacks');
			// Update
			_this.feedbacks.fetch().done(function ()
			{	// TODO
				// setInterval
			});
			//
			_this.$('[name=tipo]').off().on("change", function (event)
			{
				var valor = this.value;
				if (valor == "2") _this.$(".show-on-t2").show();
				else _this.$(".show-on-t2").hide();
			});
			//
			_this.$(".ufs").off().on("change", function (event)
			{
				var nome = this.name.split("_"),
					valor = this.value;
				var alvo = ['#', nome[0], '_', 'id'].join('');
				if (valor !== "0") {
					new globals.objectCache('subdistritos.' + valor, adagio.environment.getRoot()+'/subdistritos?uf='+valor).done(function (response) {
						_this.carregarLocais({ data: response, currentTarget: _this.$(alvo), preventDefault: function (){} });
					});
				}
			});
			//
			if (_this.model.get('tipo') === 2) _this.$(".show-on-t2").show();
			//
			_this.$(".operacao-autor").html(_this.model.get('autorNome') + "<br /><small>" + "<i class='fa fa-clock-o'></i> " + _this.model.get('created_at').substr(-8) +
				" &mdash; " + "<i class='fa fa-calendar-o'></i> " + _this.model.get('created_at').substr(8, 2) + "/" + _this.model.get('created_at').substr(5, 2) + "/" + _this.model.get('created_at').substr(0, 4) +
				"</small>");
			_this.tratamentoStatus();
		});

		} catch (caughtThrown) {
			console.error(caughtThrown);
		}
	},
	alteraBotaoStatus: function alteraBotaoStatus()
	{
		var self = this,
			vars = {};

		vars.statuses = ['Pendente', 'Reprovado', '', 'Corrigido', '', 'Aprovado'];
		vars.colors = ['btn-default', 'btn-danger', '', 'btn-warning', '', 'btn-success'];
		vars.status = vars.statuses[self.model.get("status")];
		vars.color = " " + vars.colors[self.model.get("status")];

		self.$("#mostra-status").text(vars.status);
		self.$(".operacao-status").each(function () {
			var dropdownlet = self.$(this).hasClass("dropdown-toggle") ? " dropdown-toggle" : "";
			self.$(this).attr("class", "operacao-status btn btn-md" + vars.color + dropdownlet);
		});
	},
	tratamentoStatus: function tratamentoStatus()
	{
		var self = this,
			vars = {};

		self.alteraBotaoStatus();

		$.ajax({
			url: adagio.environment.getEndpoint('operacoes/' + self.model.get("id") + '/statuses'),
			method: 'head',
			dataType: 'html',
		}).
		done(function () {
			console.info('Parabéns! Permissão para alteração de status do objeto encontrada.');

			self.$("#controle-status").removeAttr("disabled");
			self.$(".codigo-status").off().on("click", function (event) {
				event.preventDefault();
				event.stopPropagation();
				vars.codigo = parseInt(self.$(event.currentTarget).data("codigo-status"));

				if (self.model.get('status') !== vars.codigo)
				$.ajax({
					url: adagio.environment.getEndpoint('operacoes/' + self.model.get("id")),
					method: 'patch',
					dataType: 'json',
					data: {status: vars.codigo}
				}).
				done(function () {
					vars.destino = "!" + adagio.environment.getTenancy('operacoes/' + self.model.get('id') + (vars.codigo === 0 ? '/edit' : ''));

					if (vars.destino !== location.hash.substr(1)) {
						adagio.eventBus.trigger("navigate", vars.destino, {"trigger": true});
					} else {
						self.model.set('status', vars.codigo);
						self.alteraBotaoStatus();
					}
				});
				return false;
			});
		}).
		fail(function () {
			self.$("#controle-status").attr("disabled", "disabled");
		});
		return false;
	},
	carregarItens: function carregarItens(event)
	{
		var self = event.currentTarget,
			local = {},
			_this = this;

		this.$("#checklistItens").empty();
		this.tesao = this.model.get('tipo');

		if (this.tesao === 0)
			return false;

		local.ocorrencia = Backbone.Model.extend({
			defaults: {"id": 0, "ocorrencia": "", "pontuacao": 0, "nivel": 0, "tesoes": [], "categoria_id": 0}
		});

		local.ocorrencias = Backbone.Collection.extend({
			url: adagio.environment.getEndpoint('ocorrencias'),
			model: local.ocorrencia,
			parse: function (data) {
				var indexes = [1, 2], indexedByTesoes = {};

				_.map(indexes, function (i) {
					indexedByTesoes[i] = _.filter(data, function (line) {
						return _.contains(line.tesoes, i);
					});
				});

				delete data;

				_.each(indexedByTesoes, function(e, i) {
					indexedByTesoes[i] = _.groupBy(e, function (obj) {
						return obj.categoria_id;
					});
				});

				return _this.storage.set("ocorrencias", indexedByTesoes);
			}
		});

		if (_this.Ocorrencias && typeof _this.Ocorrencias === "object")
			_this.Ocorrencias.reset(_this.storage.get("ocorrencias"));
		else
			_this.Ocorrencias = new local.ocorrencias(_this.storage.get("ocorrencias"));

		new _this.subviews.checklist({el: _this.$("#checklistItens"), collection: _this.Ocorrencias, model: _this.collection.itens, tesao: _this.tesao});

		_this.$(".ocorrencias-destacadas").empty();
		_this.collection.itens.each(function (item) {
			try {
				_this.$(".ocorrencias-destacadas").append(`<li class="list-group-item">`+ _.chain(_this.Ocorrencias.at(0).get(_this.tesao)).values().flatten().where({id: item.id}).first().value().ocorrencia +`</li>`);
			}
			catch (error) {
				console.error(error);
			}
		});

		event.preventDefault()
	},
	carregarLocais: function carregarLocais(event)
	{
		try {
			var _this = event.currentTarget,
				strict = {};

			if (event.data.length === 0) {
				throw "vazio";
			}

			strict.fragmento = '<option value="0">Selecionar...</option>';

			event.data.get('collection').each(function (localidade) {
				strict.fragmento += '<option value="' + localidade.get('codigo_subdistrito') + '">' + localidade.get('nome_distrito') + (localidade.get('nome_subdistrito') ? ' &#8212; ' + localidade.get('nome_subdistrito') : '') + '</option>';
			});

			_this.html(strict.fragmento);
		}
		catch (error) {
			console.error(error);
		}
		finally {
			event.preventDefault();
		}
	},
	carregarFeedbacks: function carregarFeedbacks(event)
	{
		try {
			var $this = event.currentTarget,
				strict = {},
				_this = this;

			this.feedbacksFormData = new FormData(document.getElementById("form-feedbacks"));

			if (parseInt(_this.$(".numeros-feedbacks").text()) === _this.feedbacks.length) {
				throw 'No new feedback found to rewrite the present DOM at here on ' + _.now() + ' timestamp.';
			}

            $this.html('');
			strict.fragmento = '';

			_this.feedbacks.each(function (feedback) {
				strict.fragmento = `
				<div class="well well-sm">
					<div class="row"><div class="col-xs-12">
						<strong class="text-primary">` + feedback.get('usuario').nome + `</strong><br />
						<small>` + (feedback.get('created_at') ? feedback.get('created_at') : 'Recente') + `</small><br />` +
						(feedback.get('conteudo') && feedback.get('conteudo').length > 0 ? '<p>'+feedback.get('conteudo')+'</p>' : '<p></p>') +
					`</div></div>
					<div class="row">`;

				_.each(feedback.get('midias'), function (midia) {

					var mostrar = midia.unidade === 'image' ?
					'<a href="#" class="a-album"><image src="/storage/' + midia.sha256 + '" class="img-thumbnail" data-id="'+midia.sha256+'" /></a>' :
					'<p><a href="/storage/' + midia.sha256 + '" class="btn btn-default btn-md"><i class="fa fa-file-pdf-o"></i> PDF</a></p>';

					strict.fragmento += '<div class="col-xs-6 col-sm-4">' + mostrar + '</div>';
				});
				strict.fragmento += '</div></div>';
				$this.prepend(strict.fragmento);
			});

			this.$(".numeros-feedbacks").text(this.feedbacks.length);

            if (this.feedbacks.length > 0) {
                if ($("body").hasClass("small_sidebar") === false)
                    $('#sidebar_toggle').trigger('click');

                this.$(".operacao-col-left label").removeClass("hidden-xs");
                this.$(".operacao-col-left").attr("class", "col-md-7 operacao-col-left");
                this.$(".operacao-col-right").attr("class", "col-md-5 operacao-col-right");
            }

this.holderArquivoFeedback = function holderArquivoFeedback (files) {
_.each(files, function (arquivo, indice) {
	indice += this.$(".file-to-upload").length;

	var reader = new FileReader();
	reader.onload = _(function (event) {
		var miniatura = `<div class="thumbnail">` +
			(arquivo.type.search(/^image\//i) === 0 ?
			`<a href="#"><img src="` + event.target.result + `" alt="Imagem" class="file-to-upload"></a>` :
			``) +
			`<div class="caption">` + arquivo.name + `</div>
			</div>`;
		this.$("#holderArquivoFeedback").prepend(miniatura);
		this.$("#holderArquivoFeedback").show();
		this.feedbacksFormData.append('arquivos[' + indice + ']', arquivo);
		this.$('.files-on-hover').text(indice + 1);
	}).bind(this);
	reader.readAsDataURL(arquivo);
}, this);
}

			this.$("#uploadArquivoFeedback").get(0).onchange = _(function (event) {
				this.holderArquivoFeedback(event.target.files);
			}).bind(this);
		}
		catch (error) {
			window.console.error(error);
		}
		finally {
			return event.preventDefault();
		}
	},
	salvarFeedback: function (event)
	{
		event.stopPropagation();
		event.preventDefault();

		var $currentTarget = this.$(event.currentTarget),
			locals = {};

		locals.forms = this.feedbacksFormData;
		locals.forms.append('conteudo', $currentTarget.parents('form').find('[id=conteudoFeedback]').val());
		locals.forms.append('teor', $currentTarget.data("teor"));

		this.feedbacks.create(null, {
			"context": this,
			"timeout": 0,
			"wait": true,
			"processData": false,
			"contentType": false,
			"data": locals.forms,
			"success": function (collection, response, options) {
				$currentTarget.closest("form").find(".form-control").val('');
				$currentTarget.closest("form").find("[class^=warning-]").empty();
				if (response && response.error) {
					for (var n in response.errors) {
						$currentTarget.closest("form")
							.find("[class^=warning-]")
							.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.errors[n] + '</div>');
					}
				}
			},
			"error": function (collection, response, options) {
				$currentTarget.closest("form").find(".form-control").val('');
				$currentTarget.closest("form").find("[class^=warning-]").empty();
				if (response.responseJSON && response.responseJSON.error) {
					for (var n in response.responseJSON.errors) {
						$currentTarget.closest("form")
							.find("[class^=warning-]")
							.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.responseJSON.errors[n] + '</div>');
					}
				}
			},
			"complete": function () {
            	this.feedbacks.fetch();
            	this.feedbacksFormData = new FormData(document.getElementById("form-feedbacks"));
            	this.$('#holderArquivoFeedback').empty();
            	this.$('#uploadArquivoFeedback').val('');
            	this.$('.files-on-hover').text('0');
			}
		});
		return this;
	},
	"carregarFotos": function carregarFotos(evento)
	{
		try {
			if (this.collection.fotos.length === 0) {
				throw new Error("No photo found.");
			}

			var fragmento = document.createDocumentFragment();

			this.$("[role=listbox]").empty();
			this.$("ol.carousel-indicators").empty();

			this.collection.fotos.each(function (foto, index) {
				var item = Backbone.View.extend(this.subviews["operacoes_foto"]),
					ativo = index === 0 ? ' active' : '';

				fragmento.appendChild(new item({model: foto}).el);

				this.$("[role=listbox]").append('<div class="item' + ativo + '"><img src="/storage/' + foto.get ('id') + '" /><div class="carousel-caption">' + (foto.get ('observacoes') || "") + '</div></div>');
				this.$("ol.carousel-indicators").append('<li data-target="#carousel-example-generic" data-slide-to="' + index + '" class="' + ativo + '"></li>');
			},
			this);

			this.$("#fotos").append(fragmento);
			this.$(".numeros-resultados").text(this.$("#fotos").find(".thumbnail").length);

			if (this.$("#fotos").find(".thumbnail").length === 0)
				this.$("#fotos").parent("div").hide();
			else
				this.$("#fotos").closest(".row").parent("div").show();
		}
		catch (thrown) {
			console.info(thrown);
		}
		finally {
			event.preventDefault();
		}
	}
}