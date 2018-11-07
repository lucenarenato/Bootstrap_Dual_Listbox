{
	tagName: "div",
	id: "adagio-home",
	className: "adagio-checklists",
	events: {
		"click .checklists-sync": function(event) {
			var sincronizarChecklists = _.debounce(this.sincronizarChecklists, 300, true);
			return sincronizarChecklists.call(this, event);
		},
		//
		"click .checklist-add": "novoChecklist",
		"click .checklist-get": "abrirChecklist",
		"change #lista_de_checklists": "abrirChecklist",
		"click .checklist-set": function(event) {
			var salvarChecklist = _.debounce(this.salvarChecklist, 300, true);
			return salvarChecklist.call(this, event);
		},
		"click .checklist-remove": "apagarChecklist",
		//
		"click .checklist-itens": "carregarItens",
		"dblclick .checklist-item": "selecionarItem",
		"dragend .checklist-item": "detalharItem",
		"change #origem_planta": "selecionarPlantaOrigem",
		"change #destino_planta": "selecionarPlantaDestino",
		"change #inputVinculo": "mostrarCnpj",
		"click #consultarPessoa": "averiguarDocumento",
		"click #consultarPlaca": "averiguarPlaca"
	},
	itens: [],
	storage:
	{
		set: function (key, value)
		{
			if (!key || !value)
			return [];

			if (typeof value === "object")
			value = JSON.stringify(value);

			window.localStorage.setItem(key, value);

			return this.get(key);
		},
		get: function (key)
		{
			var value = window.localStorage.getItem(key);

			if (!value)
			return [];

			if (value[0] === "{" || value[0] === "[")
			value = JSON.parse(value);

			return value;
		},

	},
	sincronizarChecklists: function (event)
	{
		try {
			event.preventDefault();
			event.stopPropagation();

			var local = {},
				self = this;

			local.requests = [];
			local.error = false;

			this.$("#area_alertas").empty();

			this.Checklists.each(function (checklist) {
				var request = $.ajax({
					context: self,
					url: adagio.environment.getEndpoint("operacoes"),
					method: "post",
					data: _.extend(checklist.attributes, {cid: checklist.cid})
				}).done(function (data, textStatus, jqXHR) {
					jqXHR.responseJSON = {'model': {'cid': checklist.cid}};
					return jqXHR;
				});
				this.requests.push(request);
			},
			local);

			if (local.requests.length === 0) {
				return;
			}

			var engineering = function () {

				var threads = Array.prototype.slice.call(arguments);

				local.single = threads.length === 3
					? (typeof threads[1] === "string" ? true : false)
					: false;

				if (local.single === true) {
					if (typeof threads[0] === 'object' && threads[0].error) {
						local.error = true;
						this.$el.find("#area_alertas").append(`
							<div class="alert alert-inverse alert-dismissible" role="alert">
							<button type="button" class="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
							<strong>`
							+ _.first(this.Checklists.get(threads[0].model.cid).get("placas"))
							+ "</strong> &mdash; "
							+ _(threads[0].errors).reduce(function(cache, swap) { return cache + " " + swap; }, "")
							+ `</div>`
						);
					}
					else if (typeof threads[0] === 'object' && threads[1] === "success") {
						// Put it out
						this.Checklists.remove(threads[0].cid);
					}
					else if (typeof threads[0] === 'undefined' && threads[1] === "nocontent") {
						if (_.isObject(threads[2]) === true && threads[2].status === 204) {
							// Put it out
							this.Checklists.remove(threads[2].responseJSON.model.cid);
							console.error('This sounds repeated');
						}
					}
					else {
						throw 'Erro desconhecido.';
					}
				}
				else {
					_.each(threads, function(value, key) {
						if (typeof value[0] === 'undefined' && value[1] === 'nocontent') {
							if (_.isObject(value[2]) === true && value[2].status === 204) {
								// Put it out
								this[key].Checklists.remove(value[2].responseJSON.model.cid);
								console.error('This sounds repeated');
							}
						}
						else if (typeof value[0] === 'object' && value[1] === 'success') {
							if (value[0].error && value[0].error === true) {
								local.error = true;

								this[key].$el.find("#area_alertas").append(`
								<div class="alert alert-inverse alert-dismissible" role="alert">
								<button type="button" class="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
								<strong>`
								+ _.first(this[key].Checklists.get(value[0].model.cid).get("placas"))
								+ "</strong> &mdash; "
								+ _(value[0].errors).reduce(function(cache, swap) { return cache+" "+swap; }, "")
								+ `</div>`
								);

								// Keep it up
								console.error('Bad forwarding', value[0].model.cid);
							}
							else {
								// Put it out
								this[key].Checklists.remove(value[0].cid);
								console.log('Sent successfully', value[0].cid);
							}
						}
						else {
							throw 'Erro desconhecido.';
							console.error('Fatal error');
						}
					}, this);
				}
			}
			$.when.apply($, local.requests).
			then(engineering, engineering).
			then(function() {
				// Remaining cache
				console.log('Caching up...');
				return self.storage.set("checklists", self.Checklists.toJSON());
			}).then(function() {
				// self.novoChecklist(event);
			});
			adagio.eventBus.trigger("navigate", "#!" + adagio.environment.getTenancy("operacoes/?tipo=pendentes"), {"trigger": true});
		}
		catch (error) {
			console.error('located at here', error);
		}
	},
	apagarChecklist: function apagarChecklist(event) {
		var self = event.currentTarget, local = {}, global = this;

		local.cid = global.$("input[name=cid]").val ();

		global.Checklists.remove (local.cid);
		global.storage.set ("checklists", global.Checklists.toJSON ());

		return window.location.reload ();
	},
	salvarChecklist: function salvarChecklist(event) {
		var self = event.currentTarget, local = {}, global = this;

		local.checklists = {};
		local.checklist = global.$el.find ("form").serializeArray ();

		_.each(local.checklist, function (item) {
			match = (/([a-z]+)\[(.*?)\]/i).exec(item.name);
			if (match !== null) {
				// Create one new array object
				if (local.checklists[match[1]] === undefined) local.checklists[match[1]] = [];
				// Automatically keyed
				if (match[2].length === 0) match[2] = local.checklists[match[1]].length;
				// Set it up
				local.checklists[match[1]][match[2]] = item.value;
			}
			else if (item.name !== "cid")
				local.checklists[item.name] = item.value;
			else
				local.cid = item.value;
		});

		global.itens = _.where(global.itens, {"tipo": local.checklists.tipo});
		local.checklists.itens = global.itens;

		// if (local.cid == "-1")
		if (global.Checklists.get (local.cid) === undefined) {
			global.$("input[name=cid]").val(global.Checklists.add(local.checklists).cid);
		}
		else {
			// console.log (local.cid);
			global.Checklists.get(local.cid).set(local.checklists);
		}

		global.storage.set("checklists", global.Checklists.toJSON());

		return global.novoChecklist(event);
	},
	selecionarItem: function selecionarItem(event, force)
	{
		event.preventDefault();
		event.stopPropagation();

		force = force === undefined ? false : (typeof force === "boolean" ? force : false);

		var $currentTarget = this.$(event.currentTarget),
			local = {};

		if (force === false)
			$currentTarget.toggleClass("active");

		if (force === true && $currentTarget.hasClass("active") === false)
			$currentTarget.addClass("active");

		local.id = $currentTarget.data("checklist");
		local.tipo = this.$("select[name=tipo]").val();
		local.isActive = $currentTarget.hasClass("active");
		local.index = _.findIndex(this.itens, {"id": local.id});

		if (local.isActive) {
			if (local.index === -1)
				this.itens.push({"id": local.id, "tipo": local.tipo, "comment": ""});
		}
		else {
			if (local.index > -1)
				this.itens.splice(local.index, 1);
		}
		this.$(".checklist-counted-ones").text(this.itens.length);
		// console.log("selecionarItem", this.itens);
		// console.log("enforcement", force);
		return event;
	},
	detalharItem: function detalharItem(event)
	{
		var self = event.currentTarget, local = {}, global = this;
		// window.console.log ($(event.currentTarget).data ("checklist"));
		event.preventDefault();
	},
	carregarItens: function carregarItens(event)
	{
		event.preventDefault();

		var self = event.currentTarget,
			local = {},
			global = this,
			self = this;

		this.$('.awaiting-percurso').show();
		this.$("#checklistItens").empty();
		this.tesao = this.$("#inputTipo").val();

		if (global.tesao == 0) {
			global.$("#inputTipo").focus();
			return false;
		}

		local.ocorrencia = Backbone.Model.extend({
			defaults: {
				"id": 0,
				"ocorrencia": "",
				"pontuacao": 0,
				"nivel": 0,
				"tesoes": [],
				"categoria_id": 0 }
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

				_.each(indexedByTesoes, function (e, i) {
					indexedByTesoes[i] = _.groupBy(e, function (obj) {
						return obj.categoria_id;
					});
				});

				return global.storage.set("ocorrencias", indexedByTesoes);
			}
		});

		if (window.Ocorrencias && typeof window.Ocorrencias === "object")
			window.Ocorrencias.reset(global.storage.get("ocorrencias"));
		else
			window.Ocorrencias = new local.ocorrencias(global.storage.get("ocorrencias"));

		new self.subviews.checklist({
			"el": self.$("#checklistItens"),
			"collection": Ocorrencias,
			"model": self.Checklists.get(self.$('input[name="cid"]').val()),
			"tesao": self.tesao
		});

		return false;
	},
	subviews: {
		"checklist": Backbone.View.extend({
			"tagName": "div",
			"className": "col-lg-12",
"template": _.template (`
<% _.each (adagio.collection, function (group, gindex) { %>
<p><button class="btn btn-default btn-block" type="button" data-toggle="collapse" data-target="#collapseListGroup<%= gindex %>" aria-expanded="false" aria-controls="collapseExample"><div class="text-left"><%= _.first (group).categoria %></div></button></p>
<div style="height: 0px;" aria-expanded="false" id="collapseListGroup<%= gindex %>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading<%= gindex %>">
<div class="list-group">
<% _.each (group, function (li) { %>
<a href="<%= location.hash %>" class="list-group-item checklist-item <%= _.findWhere ((adagio.model.get ("itens") || []), {id: li.id}) ? "active" : "" %>" data-checklist="<%= li.id %>" data-documento="<%= li.documento %>">
	<h4 class="list-group-item-heading"><span class="label label-<%=(li.nivel==4?'danger':(li.nivel>=2?'warning':'default'))%>"><%= li.nivel %></span> <%= li.ocorrencia %></h4><p class="list-group-item-text"></p>
</a>
<% }); %>
</div>
</div>
<% }); %>
`, {variable: 'adagio'}),
			"initialize": function (options)
			{
				this.model = this.model || new Backbone.Model({"itens": []});
				this.options = options;
				this.listenTo(this.collection, 'add', this.render);
				this.render();
			},
			"render": function ()
			{
				if (this.collection.length > 0 && this.collection.get(0).attributes[this.options.tesao] !== undefined)
					this.$el.html(this.template({
						"collection": this.collection.get(0).attributes[this.options.tesao],
						"model": this.model
					}));
				else
					this.collection.fetch();

				return this;
			},
		}),
		"checklists": Backbone.View.extend({
			template: _.template(`
			<% _.each (adagio.models, function (checklist) { %>
			<a href="<%= location.hash %>" class="list-group-item checklist-get" data-cid="<%= checklist.cid %>">
			<p class="list-group-item-heading"><%= (checklist.get ('placas')[0] || (checklist.get ('placas')[1] || 'Sem placa')) %> <% print (checklist.attributes.itens.length > 0 ? '<span class="label label-danger">'+checklist.attributes.itens.length+'</span>' : ''); %></p>
			<p class="list-group-item-text"><ul class="listening-<%= checklist.cid %>"></ul></p>
			</a>
			<% }); %>
			`, {variable: 'adagio'}),
			initialize: function (options) {
				this.options = options;
				this.listenTo(this.collection, 'add change remove', this.render);
				this.render();
			},
			render: function () {
				$("#lista_de_checklists").html('<option value="0">Selecionar...</option>');
				this.collection.each(function (checklist) {
					var option = `<option value="` + checklist.cid + `">`+ (checklist.get('placas')[0] || (checklist.get('placas')[1] || 'Sem placa')) + " " + "(" + (checklist.attributes.itens.length > 0 ? checklist.attributes.itens.length : 0) + ")" + `</option>`;
					$("#lista_de_checklists").append(option);
				},
				this);
				// this.$(".list-group-item").remove ();
				// this.$el.append (this.template (this.collection));
				return this;
			},
		}),
	},

	template: _.template(`
	<div class="container-fluid">
		<div class="row"><div class="col-xs-12">
<nav class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="<%= location.hash %>">Checklists</a>
		</div>
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
			<form class="navbar-form navbar-left" role="search">
				<div class="form-group">
					<select class="form-control" id="lista_de_checklists"></select>
				</div>
			</form>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#" class="checklist-add">Novo</a></li>
				<li><a href="#" class="checklists-sync">Sincronizar</a></li>
			</ul>
		</div>
	</div>
</nav>
		</div></div>
		<div class="row">
			<!--
			<div class="col-md-3">
				<p class="small text-muted text-uppercase"><strong>Checklists</strong></p>
				<p>
					<a class="btn btn-default btn-sm checklist-add">Novo</a>
					<a class="btn btn-outline btn-success btn-sm checklists-sync">Sincronizar</a>
				</p>
				<div class="list-group checklist-sidebar"></div>
			</div>
			-->
			<div class="col-xs-12">
				<div id="area_alertas"></div>
				<div class="panel panel-default">
					<div class="panel-body adagio-checklist-form">
						<h3>Pronto para começar?</h3>
						<p>Antes de começar, é importante você fazer alguns testes para verificar se o seu navegador está bem configurado para suportar todos os recursos do sistema.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	`, {variable: 'adagio'}),

	templateQuestion: _.template(`
<form class="form-horizontal">
<p class="text-uppercase text-muted text-right small"><strong><%= new Date (adagio.attributes.timestamp && adagio.attributes.timestamp.length === 13 ? parseInt (adagio.attributes.timestamp) : _.now ()) %></strong></p>
<input name="timestamp" value="<%= (adagio.attributes.timestamp && adagio.attributes.timestamp.length === 13 ? parseInt (adagio.attributes.timestamp) : _.now ()) %>" type="hidden">
<input name="cid" value="<% print (adagio.cid === undefined ? -1 : adagio.cid) %>" type="hidden">
<fieldset>
<div class="form-group">
	<label for="inputTipo" class="col-sm-3 control-label">Percurso</label>
	<div class="col-sm-3"><select name="tipo" class="form-control" id="inputTipo"><% _(["Selecionar...", "T1", "T2"]).each (function (tesao, i) { %><option <%= (i === parseInt (adagio.attributes.tipo) ? "selected" : "") %> value="<%= i %>"><%= tesao %></option><% }); %></select>
	</div>
	<div class="col-sm-6"><button type="button" class="btn btn-primary checklist-itens">Carregar</button></div>
</div>
</fieldset>
<div class="awaiting-percurso" style="display: none;">
<fieldset>
	<div class="form-group">
		<label for="inputTransportadora" class="col-sm-3 control-label">Transportadora</label>
		<div class="col-sm-9">
		<select name="transportadora" class="form-control" id="inputTransportadora">
			<option value="0">Selecionar...</option>
			<% this.empresas.each (function (empresa) { %>
			<% if (empresa.get ('nome').search (/leiteira/i) !== -1) return false; %>
			<optgroup label="<%= empresa.get('nome') %>">
			<% _.each (empresa.get('dependentes'), function (dependente, uid) { %>
			<option <%= (parseInt (dependente.id) === parseInt (adagio.attributes.transportadora) ? "selected" : "") %> value="<%= dependente.id %>"><%= dependente.nome.toString ().toUpperCase () %></option>
			<% }); %>
			<% }); %>
			</optgroup>
		</select>
		</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<label for="inputOutroGrupo" class="col-sm-3 control-label">Região Leiteira</label>
		<div class="col-sm-9">
			<select name="outro_grupo" class="form-control" id="inputOutroGrupo">
				<option value="0">Selecionar...</option>
				<% this.empresas.each (function (empresa) { %>
					<% if (empresa.get ('nome').search (/leiteira/i) !== -1) { %>
						<% _.each (empresa.attributes.dependentes, function (dependente) { %>
						<option <%= (parseInt (dependente.id) === parseInt (adagio.attributes.outro_grupo) ? "selected" : "") %> value="<%= dependente.id %>"><%= dependente.nome.toString ().toUpperCase () %></option>
						<% }); %>
					<% } %>
				<% }); %>
			</select>
		</div>
	</div>
</fieldset>
<div class="row">
	<div class="col-sm-6">
		<div class="form-group">
			<label for="inputCPF" class="col-sm-6 control-label">CPF</label>
			<div class="col-sm-6">
			<input id="inputCPF" name="cpf_motorista" class="form-control" type="text" value="<%= adagio.attributes.cpf_motorista %>">
<p class="help-block" id="situacaoPessoa">Consultar situação</p>
<button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPessoa">Buscar</button>
			</div>
		</div>
		<div class="form-group">
			<label for="inputMotorista" class="col-sm-6 control-label">Motorista</label>
			<div class="col-sm-6"><input id="inputMotorista" name="nome_motorista" class="form-control" type="text" value="<%= adagio.attributes.nome_motorista %>"></div>
		</div>
		<div class="form-group">
			<label for="inputVinculo" class="col-sm-6 control-label">Vínculo</label>
			<div class="col-sm-6">
			<select name="vinculo" class="form-control" id="inputVinculo">
		      <% _(["Selecionar...", "Frota", "Agregado", "CIF"]).each (function (vinculo, i) { %>
		      <option <%= (i === parseInt (adagio.attributes.vinculo) ? "selected" : "") %> value="<%= i %>"><%= vinculo %></option>
		      <% }); %>
			</select>
			</div>
		</div>
		<div class="form-group if-cnpj" style="display: none;">
			<label for="inputRazao" class="col-sm-6 control-label">Razão Social</label>
			<div class="col-sm-6"><input id="inputRazao" name="razao_motorista" class="form-control" type="text" value="<%= adagio.attributes.razao_motorista %>"></div>
		</div>
		<div class="form-group if-cnpj" style="display: none;">
			<label for="inputCNPJ" class="col-sm-6 control-label">CNPJ</label>
			<div class="col-sm-6"><input id="inputCNPJ" name="cnpj_motorista" class="form-control" type="text" value="<%= adagio.attributes.cnpj_motorista %>"></div>
		</div>
	</div>
	<div class="col-sm-1"></div>
	<div class="col-sm-5">
			<div id="datepicker" data-date="<%= adagio.attributes.data %>"></div>
			<input type="hidden" id="my_hidden_input" name="data" value="<%= adagio.get('data') %>">
			<script>
$.fn.datepicker.dates['pt'] = {
	days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
	daysMin: ["Dm", "Sg", "Tr", "Qa", "Qi", "Sx", "Sb"],
	months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
	monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
	today: "Today",
	clear: "Clear",
	format: "yyyy-mm-dd",
	titleFormat: "MM yyyy",
	weekStart: 0
};
$('#datepicker').datepicker ({ language: 'pt', format: 'yyyy-mm-dd'});
$('#datepicker').on ("changeDate", function (eventDate)
{
	$('#my_hidden_input').val (eventDate.format ('yyyy-mm-dd'));
});
			</script>
	</div>
</div>
<hr>
<fieldset>
	<div class="form-group">
		<label for="selectConfiguracao" class="col-sm-3 control-label">Configuração</label>
		<div class="col-sm-3">
			<select class="form-control" name="configuracao" id="selectConfiguracao">
			<% _(["Selecionar...", "Caminhão", "Caminhão e Reboque", "Bitrem", "Vanderléia", "Rodotrem", "Reboque", "Semirreboque"]).each (function (vinculo, i) { %>
			<option <%= (i === parseInt (adagio.attributes.configuracao) ? "selected" : "") %> value="<%= i %>"><%= vinculo %></option>
			<% }); %>
			</select>
		</div>
		<div class="col-sm-6">
		<dl>
		<dt>Caminhão e Reboque</dt>
		<dd>1 reboque.</dd>
		<dt>Bitrem</dt>
		<dd>2 semirreboques c/ 5ª roda.</dd>
		<dt>Vanderléia</dt>
		<dd>1 semirreboque especial.</dd>
		<dt>Rodotrem</dt>
		<dd>2 semirreboques c/ dolly.</dd>
		</dl>
		<p class="help-block">Portaria 63/2009 do DENATRAN</p>
		</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<label for="inputTracao" class="col-sm-3 control-label">Unidade Tração</label>
		<div class="col-sm-3"><input id="inputTracao" class="form-control" type="text" name="placas[0]" value="<%= adagio.attributes.placas[0] %>"><p class="help-block pongs-0">Placa Ve&iacute;culo</p><button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPlaca" data-model="inputTracao">Buscar</button></div>
		<div class="col-sm-3"><input class="form-control" type="text" name="numeros[0]" value="<%= adagio.attributes.numeros[0] %>"><p class="help-block">Número Frota</p></div>
		<div class="col-sm-3">
			<select class="form-control autocategorias" name="categorias[0]">
				<option value="0">Selecionar...</option>
				<% var unidadestracao = new Backbone.Collection ([{"id":5,"autocategoria":"CAMINHÃO TOCO"},{"id":11,"autocategoria":"CAMINHÃO TRUCK"},{"id":12,"autocategoria":"CAMINHÃO DIRECIONAL"},{"id":6,"autocategoria":"CAVALO MEC&Acirc;NICO"}]); %>
				<% var implementos = new Backbone.Collection ([{"id":10,"autocategoria":"REBOQUE"},{"id":8,"autocategoria":"SEMIRREBOQUE"},{"id":9,"autocategoria":"SEMIRREBOQUE LS"}]); %>
				<% unidadestracao.each (function (vinculo, i) { %>
				<option <%= (adagio.attributes.categorias[0] && vinculo.get ('id') === parseInt (adagio.attributes.categorias[0]) ? "selected" : "") %> value="<%= vinculo.get ('id') %>"><%= vinculo.get ('autocategoria') %></option>
				<% }); %>
			</select>
			<p class="help-block">Categoria</p>
		</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<label for="primeiroImplemento" class="col-sm-3 control-label">Implemento</label>
		<div class="col-sm-3"><input id="primeiroImplemento" class="form-control" type="text" name="placas[1]" value="<%= adagio.attributes.placas[1] %>"><p class="help-block pongs-1">Placa Ve&iacute;culo</p><button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPlaca" data-model="primeiroImplemento">Buscar</button></div>
		<div class="col-sm-3"><input class="form-control" type="text" name="numeros[1]" value="<%= adagio.attributes.numeros[1] %>"><p class="help-block">Número Frota</p></div>
		<div class="col-sm-3">
			<select class="form-control autocategorias" name="categorias[1]">
				<option value="0">Selecionar...</option>
				<% implementos.each (function (vinculo, i) { %>
				<option <%= (adagio.attributes.categorias[1] && vinculo.get ('id') === parseInt (adagio.attributes.categorias[1]) ? "selected" : "") %> value="<%= vinculo.get ('id') %>"><%= vinculo.get ('autocategoria') %></option>
				<% }); %>
			</select>
			<p class="help-block">Categoria</p>
		</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<label for="segundoImplemento" class="col-sm-3 control-label">Implemento</label>
		<div class="col-sm-3"><input id="segundoImplemento" class="form-control" type="text" name="placas[2]" value="<%= adagio.attributes.placas[2] %>"><p class="help-block pongs-2">Placa Ve&iacute;culo</p><button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPlaca" data-model="segundoImplemento">Buscar</button></div>
		<div class="col-sm-3"><input class="form-control" type="text" name="numeros[2]" value="<%= adagio.attributes.numeros[2] %>"><p class="help-block">Número Frota</p></div>
		<div class="col-sm-3">
			<select class="form-control autocategorias" name="categorias[2]">
				<option value="0">Selecionar...</option>
				<% implementos.each (function (vinculo, i) { %>
				<option <%= (adagio.attributes.categorias[2] && vinculo.get ('id') === parseInt (adagio.attributes.categorias[2]) ? "selected" : "") %> value="<%= vinculo.get ('id') %>"><%= vinculo.get ('autocategoria') %></option>
				<% }); %>
			</select>
			<p class="help-block">Categoria</p>
		</div>
	</div>
</fieldset>
<hr>
<div class="form-group">
	<label class="col-sm-3 control-label" for="origem_uf">Origem</label>
	<div class="col-sm-3">
		<select name="origem_uf" class="form-control ufs" id="origem_uf">
			<option value="0">Selecionar...</option>
			<% this.subdistritos.each(function (subdistrito, i) { %>
			<option <%= (subdistrito.get('uf') === parseInt(adagio.attributes.origem_uf) ? "selected" : "") %> value="<%= subdistrito.get('uf') %>"><%= subdistrito.get('nome_uf') %></option>
			<% }); %>
		</select>
	</div>
	<label class="col-sm-3 control-label" for="origem_id">Localidade</label>
	<div class="col-sm-3">
		<select name="origem_id" class="form-control" id="origem_id">
			<option value="0">Selecionar...</option>
			<% if (this['subdistritos.'+adagio.attributes.origem_uf]){ %>
			<% this['subdistritos.'+adagio.attributes.origem_uf].each (function (subdistrito, i) { %>
			<option <%= (subdistrito.get ('codigo_subdistrito') === adagio.attributes.origem_id ? "selected" : "") %> value="<%= subdistrito.get ('codigo_subdistrito') %>"><%= subdistrito.get ('nome_distrito') %><%= (subdistrito.get ('nome_subdistrito') ? ' &#8212; ' + subdistrito.get ('nome_subdistrito') : '') %></option>
			<% }); } %>
		</select>
<p class="help-block">Busca resumida</p>
<button type="button" class="btn btn-xs btn-outline btn-info btn-block" data-toggle="modal" data-target="#plantasOrigem">Buscar</button>
<div class="modal fade" id="plantasOrigem" tabindex="-1" role="dialog" aria-labelledby="plantasOrigemLabel">
	<div class="modal-dialog modal-sm" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="plantasOrigemLabel">Plantas para origem</h4>
			</div>
			<div class="modal-body">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="origem_planta" class="control-label"></label>
						<select class="form-control" id="origem_planta">
							<option value="0">Selecionar...</option>
							<!-- -->
							<option value="31342020500">Ituiutaba&#8212;MG</option>
							<option value="31295090500">Ibiá&#8212;MG</option>
							<option value="31433020500">Montes Claros&#8212;MG</option>
							<option value="31480040500">Patos de Minas&#8212;MG</option>
							<option value="31686060500">Teófilo Otoni&#8212;MG</option>
							<!-- -->
							<option value="33060080500">Três Rios&#8212;RJ</option>
							<!-- -->
							<option value="35028040500">Araçatuba&#8212;SP</option>
							<option value="35032080500">Araraquara&#8212;SP</option>
							<!-- -->
							<option value="41048082500">Juvinópolis&#8212;Cascavel&#8212;PR</option>
							<!-- -->
							<option value="42195070500">Xanxerê&#8212;SC</option>
							<!-- -->
							<option value="43137060500">Palmeira das Missões&#8212;RS</option>
							<option value="43047050500">Carazinho&#8212;RS</option>
							<option value="43049030500">Casca&#8212;RS</option>
							<option value="43193070500">São Paulo das Missões&#8212;RS</option>
							<!-- -->
							<option value="52087070500">Goiânia&#8212;GO</option>
							<option value="52119090500">Jataí&#8212;GO</option>
							<!-- -->
							<option value="51048070500">Jaciara&#8212;MT</option>
						</select>
					</div>
				</div>
			</div>
			<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button></div>
		</div>
	</div>
</div>
	</div>
</div>
<div class="form-group show-on-t2" style="display: none;">
	<label class="col-sm-3 control-label">Destino</label>
	<div class="col-sm-3">
		<select name="destino_uf" class="form-control ufs" id="destino_uf">
			<option value="0">Selecionar...</option>
			<% this.subdistritos.each (function (subdistrito, i) { %>
			<option <%= (subdistrito.get ('uf') === parseInt (adagio.attributes.destino_uf) ? "selected" : "") %> value="<%= subdistrito.get ('uf') %>"><%= subdistrito.get ('nome_uf') %></option>
			<% }); %>
		</select>
	</div>
	<label class="col-sm-3 control-label">Localidade</label>
	<div class="col-sm-3">
		<select name="destino_id" class="form-control" id="destino_id">
			<option value="0">Selecionar...</option>
			<% if (this['subdistritos.'+adagio.attributes.destino_uf]){ %>
			<% this['subdistritos.'+adagio.attributes.destino_uf].each (function (subdistrito, i) { %>
			<option <%= (subdistrito.get ('codigo_subdistrito') === adagio.attributes.destino_id ? "selected" : "") %> value="<%= subdistrito.get ('codigo_subdistrito') %>"><%= subdistrito.get ('nome_distrito') %><%= (subdistrito.get ('nome_subdistrito') ? ' &#8212; ' + subdistrito.get ('nome_subdistrito') : '') %></option>
			<% }); } %>
		</select>
<p class="help-block">Busca resumida</p>
<button type="button" class="btn btn-xs btn-outline btn-info btn-block" data-toggle="modal" data-target="#plantasDestino">Buscar</button>
<div class="modal fade" id="plantasDestino" tabindex="-1" role="dialog" aria-labelledby="plantasDestinoLabel">
	<div class="modal-dialog modal-sm" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="plantasDestinoLabel">Plantas para destino</h4>
			</div>
			<div class="modal-body">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="destino_planta" class="control-label"></label>
						<select class="form-control" id="destino_planta">
							<option value="0">Selecionar...</option>
							<!-- -->
							<option value="31342020500">Ituiutaba&#8212;MG</option>
							<option value="31295090500">Ibiá&#8212;MG</option>
							<option value="31433020500">Montes Claros&#8212;MG</option>
							<option value="31480040500">Patos de Minas&#8212;MG</option>
							<option value="31686060500">Teófilo Otoni&#8212;MG</option>
							<!-- -->
							<option value="33060080500">Três Rios&#8212;RJ</option>
							<!-- -->
							<option value="35028040500">Araçatuba&#8212;SP</option>
							<option value="35032080500">Araraquara&#8212;SP</option>
							<!-- -->
							<option value="41048082500">Juvinópolis&#8212;Cascavel&#8212;PR</option>
							<!-- -->
							<option value="42195070500">Xanxerê&#8212;SC</option>
							<!-- -->
							<option value="43137060500">Palmeira das Missões&#8212;RS</option>
							<option value="43047050500">Carazinho&#8212;RS</option>
							<option value="43049030500">Casca&#8212;RS</option>
							<option value="43193070500">São Paulo das Missões&#8212;RS</option>
							<!-- -->
							<option value="52087070500">Goiânia&#8212;GO</option>
							<option value="52119090500">Jataí&#8212;GO</option>
							<!-- -->
							<option value="51048070500">Jaciara&#8212;MT</option>
						</select>
					</div>
				</div>
			</div>
			<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button></div>
		</div>
	</div>
</div>
	</div>

</div>
<div class="form-group show-on-t2" style="display: none;">

	<label class="col-sm-3 control-label">Posição atual</label>
	<div class="col-sm-3">
		<select name="posicao" class="form-control" id="posicao">
		<% _(["Selecionar...", "Origem", "Destino"]).each (function (vinculo, i) { %>
		<option <%= (i === parseInt (adagio.attributes.posicao) ? "selected" : "") %> value="<%= i %>"><%= vinculo %></option>
		<% }); %>
		</select>
	</div>
</div>
	</div>
</div>
		<hr>
		<p class="lead">INCONFORMIDADES ENCONTRADAS (<span class="checklist-counted-ones">0</span>)</p>
		<div class="row">
	  		<div id="checklistItens" class="col-lg-12"></div>
	  		<div class="col-lg-12">
	  		<p class="text-muted">Clique duas vez para marcar tal ocorrência.</p>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6"><button type="button" class="btn btn-default btn-block checklist-set">Salvar</button></div>
			<div class="col-sm-6"><button type="button" class="btn btn-danger btn-block checklist-remove">Excluir</button></div>
		</div>
	</div>
	</form>
	`,
	{variable: 'adagio'}),
	initialize: function ()
	{
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
	render: function ()
	{
		var _this = this, local = {}, global = window;

		_this.Checklist = Backbone.Model.extend({
			defaults:
			{
				timestamp: "",
				nome_motorista: "",
				cpf_motorista: "",
				grupo: 0,
				vinculo: 0,
				data: "",
				tipo: 0,
				placas: [],
				numeros: [],
				categorias: [],
				itens: [],
				posicao: 1,
			}
		});

		local.Checklists = Backbone.Collection.extend({ model: _this.Checklist });

		_this.Checklists = new local.Checklists(_this.storage.get("checklists"));

		if (_this.$el.attr("class") === undefined) {
			// load
			_this.$el.html(_this.template(_this.model)).attr("class", _this.className);
			new _this.subviews.checklists({el: _this.$(".checklist-sidebar"), collection: _this.Checklists});
		}
		else if (_this.$el.attr("class") !== _this.className) {
			// reload
			_this.$el.html(_this.template(_this.model)).attr("class", _this.className);
			new _this.subviews.checklists({el: _this.$(".checklist-sidebar"), collection: _this.Checklists});
		}
		else {
			// already
		}
	},

	novoChecklist: function novoChecklist(event)
	{
		event.preventDefault();
		event.stopPropagation();

		var self = event.currentTarget, strict = {}, _this = this, globals = window;

		strict.objectCaches = [
			new globals.objectCache('empresas', adagio.environment.getEndpoint('prestadores'), null, true),
			new globals.objectCache('autocategorias', adagio.environment.getRoot()+'/autocategorias'),
			new globals.objectCache('subdistritos', adagio.environment.getRoot()+'/subdistritos')
		];

		$.when.apply(null, strict.objectCaches).then(function () {
			var args = Array.prototype.slice.call(arguments);

			for (var n in args) if (args[n] && args[n].instance)
			_this[args[n].instance] = args[n].get('collection');

			_this.itens = [];

			_this.checklistVazio = new _this.Checklist();

			_this.$(".adagio-checklist-form").html(_this.templateQuestion(_this.checklistVazio));
			_this.$("#lista_de_checklists").val(0);
			_this.$("#area_alertas").html("");

			_this.$('[name=tipo]').off().on("change", function (event) {
				var valor = this.value;

				if (valor == "2")
					_this.$(".show-on-t2").show();
				else
					_this.$(".show-on-t2").hide();
			});

			_this.$('[name=configuracao]').off().on("change", function (event) {
				_this.$('select[name="categorias[0]"]').prop('disabled', false);
				_this.$('select[name="categorias[1]"]').prop('disabled', false);
				_this.$('select[name="categorias[2]"]').prop('disabled', false);
				_this.$('input[name="placas[0]"]').prop('disabled', false);
				_this.$('input[name="placas[1]"]').prop('disabled', false);
				_this.$('input[name="placas[2]"]').prop('disabled', false);
				_this.$('input[name="numeros[0]"]').prop('disabled', false);
				_this.$('input[name="numeros[1]"]').prop('disabled', false);
				_this.$('input[name="numeros[2]"]').prop('disabled', false);

				switch (this.value)
				{
					case '1':
						_this.$('select[name="categorias[0]"]').val(5);
						_this.$('select[name="categorias[1]"]').val(0).prop('disabled', true);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[1]"]').prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[1]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
					case '2':
						_this.$('select[name="categorias[0]"]').val(5);
						_this.$('select[name="categorias[1]"]').val(10);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
					case '3':
						_this.$('select[name="categorias[0]"]').val(6);
						_this.$('select[name="categorias[1]"]').val(8);
						_this.$('select[name="categorias[2]"]').val(8);
					break;
					case '4':
						_this.$('select[name="categorias[0]"]').val(6);
						_this.$('select[name="categorias[1]"]').val(9);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
					case '5':
						_this.$('select[name="categorias[0]"]').val(6);
						_this.$('select[name="categorias[1]"]').val(8);
						_this.$('select[name="categorias[2]"]').val(8);
					break;
					case '6':
						_this.$('select[name="categorias[1]"]').val(10);
						_this.$('select[name="categorias[0]"]').val(0).prop('disabled', true);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[0]"]').prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[0]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
					case '7':
						_this.$('select[name="categorias[1]"]').val(8);
						_this.$('select[name="categorias[0]"]').val(0).prop('disabled', true);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[0]"]').prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[0]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
				}
			});

			_this.$(".ufs").off().on("change", function (event, subdistrito) {
				var nome = this.name.split("_"),
					valor = this.value;

				var alvo = ['#', nome[0], '_', 'id'].join('');

				subdistrito = subdistrito ? subdistrito : "0";

				if (valor !== "0")
				new globals.objectCache('subdistritos.' + valor, adagio.environment.getRoot()+'/subdistritos?uf=' + valor).
				done(function (response) {
					_this.carregarLocais({
						"valor": subdistrito,
						"data": response,
						"currentTarget": _this.$(alvo),
						"preventDefault": function () {
							//
						},
					});
				});
			});
		});

		return event;
	},

	abrirChecklist: function abrirChecklist(event)
	{
		try {
			event.preventDefault();
			event.stopPropagation();

			var $currentTarget = this.$(event.currentTarget),
				strict = {},
				_this = this,
				globals = window,
				cid = $currentTarget.data("cid") || $currentTarget.val();

			if (parseInt(cid) === 0) {
				throw new Error("None");
			}

			strict.objectCaches = [
				new globals.objectCache('empresas', adagio.environment.getEndpoint('prestadores'), null, true),
				new globals.objectCache('autocategorias', adagio.environment.getRoot()+'/autocategorias'),
				new globals.objectCache('subdistritos', adagio.environment.getRoot()+'/subdistritos'),
				new globals.objectCache('subdistritos.'+_this.Checklists.get(cid).get('origem_uf'), adagio.environment.getRoot()+'/subdistritos?uf='+_this.Checklists.get(cid).get('origem_uf')),
				new globals.objectCache('subdistritos.'+_this.Checklists.get(cid).get('destino_uf'), adagio.environment.getRoot()+'/subdistritos?uf='+_this.Checklists.get(cid).get('destino_uf')),
			];

		$.when.apply(null, strict.objectCaches).then(function () {
			var args = Array.prototype.slice.call(arguments);

			for (var n in args) if (args[n] && args[n].instance)
			_this[args[n].instance] = args[n].get('collection');

			_this.itens = _this.Checklists.get(cid).attributes.itens;
			console.log("abrirChecklist", _this.itens);

			_this.$(".adagio-checklist-form").html(_this.templateQuestion(_this.Checklists.get(cid)));

			_this.$('[name=tipo]').off().on("change", function (event) {
				var valor = this.value;

				if (valor == "2")
					_this.$(".show-on-t2").show();
				else
					_this.$(".show-on-t2").hide();
			});

			_this.$('[name=configuracao]').off().on("change", function (event) {
				_this.$('select[name="categorias[0]"]').prop('disabled', false);
				_this.$('select[name="categorias[1]"]').prop('disabled', false);
				_this.$('select[name="categorias[2]"]').prop('disabled', false);
				_this.$('input[name="placas[0]"]').prop('disabled', false);
				_this.$('input[name="placas[1]"]').prop('disabled', false);
				_this.$('input[name="placas[2]"]').prop('disabled', false);
				_this.$('input[name="numeros[0]"]').prop('disabled', false);
				_this.$('input[name="numeros[1]"]').prop('disabled', false);
				_this.$('input[name="numeros[2]"]').prop('disabled', false);

				switch (this.value)
				{
					case '1':
						_this.$('select[name="categorias[0]"]').val(5);
						_this.$('select[name="categorias[1]"]').val(0).prop('disabled', true);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[1]"]').prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[1]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
					case '2':
						_this.$('select[name="categorias[0]"]').val(5);
						_this.$('select[name="categorias[1]"]').val(10);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
					case '3':
						_this.$('select[name="categorias[0]"]').val(6);
						_this.$('select[name="categorias[1]"]').val(8);
						_this.$('select[name="categorias[2]"]').val(8);
					break;
					case '4':
						_this.$('select[name="categorias[0]"]').val(6);
						_this.$('select[name="categorias[1]"]').val(9);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
					case '5':
						_this.$('select[name="categorias[0]"]').val(6);
						_this.$('select[name="categorias[1]"]').val(8);
						_this.$('select[name="categorias[2]"]').val(8);
					break;
					case '6':
						_this.$('select[name="categorias[1]"]').val(10);
						_this.$('select[name="categorias[0]"]').val(0).prop('disabled', true);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[0]"]').prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[0]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
					case '7':
						_this.$('select[name="categorias[1]"]').val(8);
						_this.$('select[name="categorias[0]"]').val(0).prop('disabled', true);
						_this.$('select[name="categorias[2]"]').val(0).prop('disabled', true);
						_this.$('input[name="placas[0]"]').prop('disabled', true);
						_this.$('input[name="placas[2]"]').prop('disabled', true);
						_this.$('input[name="numeros[0]"]').prop('disabled', true);
						_this.$('input[name="numeros[2]"]').prop('disabled', true);
					break;
				}
			}).
			trigger("change", _this.$('[name=configuracao]').val());

			if (_this.Checklists.get(cid).attributes.tipo == "2")
				_this.$(".show-on-t2").show();
			
			_this.$(".checklist-itens").trigger("click");

			_this.$(".ufs").off().on("change", function (event, subdistrito) {
				var nome = this.name.split("_"),
					valor = this.value;

				var alvo = ['#', nome[0], '_', 'id'].join('');

				subdistrito = subdistrito ? subdistrito : "0";

				if (valor !== "0")
				new globals.objectCache('subdistritos.'+valor, adagio.environment.getRoot()+'/subdistritos?uf=' + valor).
				done(function (response) {
					_this.carregarLocais({
						"valor": subdistrito,
						"data": response,
						"currentTarget": _this.$(alvo),
						"preventDefault": function ()
						{
							//
						},
					});
				});
			});
			_this.$('.awaiting-percurso').show();
		});

	}
	catch (caughtError) {
		console.error(caughtError);
	}
	finally {
		return event;
	}},
	carregarUfs: function carregarUfs(event)
	{
		try {
			var _this = event.currentTarget, strict = {}, globals = this;

			if (globals.ufs.length === 0) throw "vazio";

			strict.fragmento = '<option value="0">Selecionar...</option>';

			event.data.get('collection').each(function (uf) {
				strict.fragmento += '<option value="' + uf.get('uf') + '">' + uf.get('nome_uf') + '</option>';
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
	carregarLocais: function carregarLocais(event)
	{
		try {
			var _this = event.currentTarget,
				strict = {},
				globals = this;

			if (event.data.length === 0)
				throw "vazio";

			strict.fragmento = '<option value="0">Selecionar...</option>';

			event.data.get('collection').each(function (localidade) {
				if (localidade.get('nome_subdistrito') === "")
				strict.fragmento += '<option value="' + localidade.get('codigo_subdistrito') + '">' + localidade.get('nome_distrito') + '</option>';
			});

			_this.html(strict.fragmento);

			if (event && event.valor)
				_this.val(event.valor);
		}
		catch (error) {
			console.error(error);
		}
		finally {
			event.preventDefault();
		}
	},
	selecionarPlantaOrigem: function selecionarPlantaOrigem(event)
	{
		try {
			event.preventDefault();
			var _this = this,
				strict = {},
				$currentTarget = this.$(event.target);
			if (this.$('select#origem_id option[value="' + $currentTarget.val() + '"]').length) {
				this.$("#origem_id").val($currentTarget.val());
			}
			else {
				strict.uf = $currentTarget.val().toString().substring(0, 2);
				this.$("#origem_uf").val(strict.uf);
				this.$("#origem_uf.ufs").trigger("change", $currentTarget.val());
			}
		}
		catch (error) {
			console.error(error);
		}
	},
	selecionarPlantaDestino: function selecionarPlantaDestino(event)
	{
		try {
			event.stopPropagation();
			event.preventDefault();

			var _this = this,
				strict = {},
				globals = window,
				$currentTarget = this.$(event.currentTarget);

			if (_this.$('select#destino_id option[value="' + $currentTarget.val () + '"]').length)
				_this.$("#destino_id").val ($currentTarget.val ());
			else {
				strict.uf = $currentTarget.val().toString().substring(0, 2);
				_this.$("#destino_uf").val(strict.uf);
				_this.$("#destino_uf.ufs").trigger("change", $currentTarget.val());
			}
		}
		catch (error) {
			console.error(error);
		}
	},
	mostrarCnpj: function mostrarCnpj(event)
	{
		event.preventDefault();
		event.stopPropagation();

		var $dom = this.$(event.target),
			vars = {};
			vars.vinculo = parseInt($dom.val());

		if (vars.vinculo > 1)
			this.$(".if-cnpj").show();
		else
			this.$(".if-cnpj").hide();

		return false;
	},
	averiguarDocumento: function averiguarDocumento(evento)
	{
		try {
			var parametro = this.$el.find("#inputCPF").val();
			$.ajax({
				"url": adagio.environment.getEndpoint("cartorial/buscadocvencidoscpf/" + parametro),
				"method": "get",
				"dataType": "json",
				"context": this
			})
			.done(function (response) {
				var hashedUrl = response.model.url
					? response.model.url.replace(/client\/v[0-9]+\//, '#!/')
					: '';
				if (response.encontrado === false) {
					this.$("#inputCPF").parent().attr("class", "col-sm-6 has-error");
					this.$("#situacaoPessoa").text("Não localizado");
				}
				if (response.nome_condutor.length === 0) {
					this.$("#inputCPF").parent().attr("class", "col-sm-6 has-error");
					this.$("#situacaoPessoa").text("Não localizado");
				}
				else if (response.model.status_quo.vencimentos.length > 0) {
					this.$("#inputCPF").val(response.cpf).parent().attr("class", "col-sm-6 has-error");
					this.$("#situacaoPessoa").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.vencimentos.length + ' vencimentos</a>');
					this.$("#area_alertas").html("");
					_(response.dados).each(function (item) {
						this.$("#area_alertas").append(`<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>` + item.titulo + `</strong> em vencimento para ` + (new Date(item.vencimento).toISOString().slice(0, 10).split("-").reverse().join("/")) +
						`.</div>`);
						this.$('[data-documento="'+item.tipo+'"]').trigger("dblclick", [true]);
					},
					this);
				}
				else if (response.model.status_quo.ausentes.length > 0) {
					this.$("#inputCPF").parent().attr("class", "col-sm-6 has-warning");
					this.$("#situacaoPessoa").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.ausentes.length + ' ausências</a>');
				}
				else if (response.model.status_quo.pendentes.length > 0) {
					this.$("#inputCPF").parent().attr("class", "col-sm-6 has-warning");
					this.$("#situacaoPessoa").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.pendentes.length + ' pendências</a>');
				}
				else {
					this.$("#inputCPF").val(response.cpf).parent().attr("class", "col-sm-6 has-success");
					this.$("#situacaoPessoa").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Regular</a>');
				}
				this.$("#inputMotorista").val(response.nome_condutor);
				this.$("#inputVinculo").val(response.vinculo);
				this.$("#inputTransportadora").val(response.frota);
			});
		}
		catch (caughtError) {
			console.error(caughtError);
		}
	},
	averiguarPlaca: function averiguarPlaca(event)
	{
		try {
			var $currentTarget = this.$(event.currentTarget),
				referencia = $currentTarget.data('model'),
				placa = this.$('#'+referencia).val(),
				ordem = this.$('#'+referencia).attr('name').match(/placas\[([0-9])\]/),
				frota = this.$('[name="numeros['+ordem[1]+']"]'),
				carro = this.$('[name="categorias['+ordem[1]+']"]'),
				reply = this.$('.pongs-'+ordem[1]);

			$.ajax({
				"url": adagio.environment.getEndpoint("cartorial/buscadocvencidosplaca/" + placa),
				"method": "get",
				"dataType": "json",
				"context": this
			})
			.then(function (response) {
				var hashedUrl = response.model.url
					? response.model.url.replace(/client\/v[0-9]+\//, '#!/')
					: '';

				if (response.encontrado === false) {
					$currentTarget.parents("div.form-group").attr("class", "form-group has-error");
					reply.text("Não localizado");
				} else if (response.model.status_quo.vencimentos.length > 0) {
					$currentTarget.parents("div.form-group").attr("class", "form-group has-error");
					reply.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.vencimentos.length + ' vencimentos</a>');
					_(response.dados).each(function(item) {
						this.$("#area_alertas").append(`<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>` + item.titulo + `</strong> em vencimento para ` + (new Date(item.vencimento).toISOString().slice(0, 10).split("-").reverse().join("/")) +
						`.</div>`);
						console.log('[data-documento="'+item.tipo+'"]');
						this.$('[data-documento="'+item.tipo+'"]').trigger("dblclick", [true]);
					}, this);
				} else if (response.model.status_quo.ausentes.length > 0) {
					$currentTarget.parents("div.form-group").attr("class", "form-group has-warning");
					reply.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.ausentes.length + ' ausências</a>');
				} else if (response.model.status_quo.pendentes.length > 0) {
					$currentTarget.parents("div.form-group").attr("class", "form-group has-warning");
					reply.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.pendentes.length + ' pendências</a>');
				} else {
					$currentTarget.parents("div.form-group").attr("class", "form-group has-success");
					reply.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Regular</a>');
				}
				this.$('#'+referencia).val(response.placa);
				frota.val(response.veiculo_frota);
				if (response.carro === 0) {
					//
				} else {
					carro.val(response.carro);

					if (parseInt(carro.val()) !== response.carro) {
						carro.val(0);
					}
				}
			});
		}
		catch (caughtError) {
			console.error(caughtError);
		}
	}
}