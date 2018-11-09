{
	tagName: "div",
	id: "adagio-home",
	className: "adagio-operacoes",
	events: {
		"submit form#status-exchange": function (event)
		{
			event.preventDefault();
			event.stopPropagation();

			var $currentTarget = this.$(event.currentTarget),
				vars = {};

			vars.id = $currentTarget.find("input[name=id]").val();
			vars.status = $currentTarget.find("select[name=status]").val();

			this.collection.get(vars.id).save(
				{ status: vars.status },
				{
					context: this,
					patch: true,
					success: function(model, response, options) {
						this.render();
					}
				}
			);

			this.$('#modal_for_tag').modal('hide');

			return false;
		},
		"click .on-td": function(event)
		{
			event.preventDefault();
			event.stopPropagation();

			var $currentTarget = this.$(event.currentTarget).parent("tr"),
				vars = {};

			if ($currentTarget.data("id") === undefined) {
				return false;
			}

			vars.id = parseInt($currentTarget.data("id"));
			vars.status = parseInt($currentTarget.data("status"));
			vars.request = '!'+adagio.environment.getTenancy('operacoes/'+vars.id+(vars.status===0?'/edit':''));

			adagio.eventBus.trigger("navigate", vars.request, {trigger: true});

			return false;
		},
		"contextmenu .on-td": function (event)
		{
			event.preventDefault();
			event.stopPropagation();

			var $currentTarget = this.$(event.currentTarget).closest("tr"),
				vars = {};

			if ($currentTarget.data("id") === undefined) {
				return false;
			}

			vars.id = parseInt($currentTarget.data("id"));
			vars.status = parseInt($currentTarget.data("status"));

			$.ajax ({
				url: adagio.environment.getEndpoint('operacoes/'+vars.id+'/statuses'),
				method: 'get',
				dataType: 'html',
				context: this
			}).done (function (response) {
				this.$("form#status-exchange").html(response);
				this.$("#status-exchange-id").val(vars.id);
				this.$("#status-exchange-status").val(this.collection.get(vars.id).get('status'));
				this.$("#status-exchange-placa-a").text(_.pluck(this.collection.get(vars.id).get('placas'), 'placa').join(', '));
				this.$("#status-exchange-nome-transportadora").text(this.collection.get(vars.id).get('transportadora'));
				this.$('#modal_for_tag').modal('show');
			});

			return false;
		},
	},
	template: function (which)
	{
		return _.template (this.templates[which], {variable: 'adagio'});
	},
	templates: {
		minimal: `
<style>.on-td { cursor:pointer; }</style>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-12">
			<table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
			<thead><tr>
			<th class="hidden-xs hidden-sm">Data</th><th class="hidden-xs hidden-sm">Percurso</th><th class="hidden-xs hidden-sm">Planta</th><th>Placa</th><th class="hidden-xs hidden-sm">Motorista</th><th>Transportadora</th><th class="hidden-xs hidden-sm"><i class="fa fa-fw fa-comment-o"></i></th>
			</tr></thead>
            <tfoot><tr>
            <th class="hidden-xs hidden-sm">Data</th><th class="hidden-xs hidden-sm">Percurso</th><th class="hidden-xs hidden-sm">Planta</th><th>Placa</th><th class="hidden-xs hidden-sm">Motorista</th><th>Transportadora</th><th class="hidden-xs hidden-sm"><i class="fa fa-fw fa-comment-o"></i></th>
            </tr></tfoot>
			<tbody id="operacoes_lista"></tbody>
			</table>
		</div><!-- /.col-sm-12 -->
	</div><!-- /.row -->
</div><!-- /.container-fluid -->
<form id="status-exchange">
</form><!-- /#status-exchange -->
		`,
		full: `
<style>.on-td { cursor:pointer; }</style>
<div class="container-fluid">
<div class="row">
<div class="col-sm-12">
	<table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
		<thead><tr>
		<th class="hidden-xs hidden-sm">Data</th><th class="hidden-xs hidden-sm">Percurso</th><th class="hidden-xs hidden-sm">Planta</th><th>Placa</th><th>Transportadora</th><th class="hidden-xs hidden-sm">Analista</th><th class="hidden-xs hidden-sm"><i class="fa fa-fw fa-comment-o"></i></th>
		</tr></thead>
		<tfoot><tr>
		<th class="hidden-xs hidden-sm">Data</th><th class="hidden-xs hidden-sm">Percurso</th><th class="hidden-xs hidden-sm">Planta</th><th>Placa</th><th>Transportadora</th><th class="hidden-xs hidden-sm">Analista</th><th class="hidden-xs hidden-sm"><i class="fa fa-fw fa-comment-o"></i></th>
		</tr></tfoot>
		<tbody id="operacoes_lista"></tbody>
	</table>
</div><!-- /.col-sm-12 -->
</div><!-- /.row -->
</div><!-- /.container-fluid -->
<hr>
<div class="container-fluid">
<div class="row">
<div class="col-sm-12">
	<p class="text-muted small text-uppercase"><strong>LEGENDAS</strong></p>
	<p class=""><i class="fa fa-fw fa-comment-o"></i> Indica o número de feedbacks encontrados na inspeção.</p>
</div><!-- /.col-sm-12 -->
</div><!-- /.row -->
</div><!-- /.container-fluid -->
<form id="status-exchange">
</form><!-- /#status-exchange -->
		`,
		selfish: `
<style>.on-td { cursor:pointer; }</style>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-12">
			<table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
				<thead><tr>
				<th class="hidden-xs hidden-sm">Data</th><th class="hidden-xs hidden-sm">Percurso</th><th class="hidden-xs hidden-sm">Planta</th><th>Placa</th><th>Motorista</th><th class="hidden-xs hidden-sm">Analista</th><th class="hidden-xs hidden-sm"><i class="fa fa-fw fa-comment-o"></i></th>
				</tr></thead>
                <tfoot><tr>
                <th class="hidden-xs hidden-sm">Data</th><th class="hidden-xs hidden-sm">Percurso</th><th class="hidden-xs hidden-sm">Planta</th><th>Placa</th><th>Motorista</th><th class="hidden-xs hidden-sm">Analista</th><th class="hidden-xs hidden-sm"><i class="fa fa-fw fa-comment-o"></i></th>
                </tr></tfoot>
				<tbody id="operacoes_lista"></tbody>
			</table>
		</div><!-- /.col-sm-12 -->
	</div><!-- /.row -->
</div><!-- /.container-fluid -->
<form id="status-exchange">
</form><!-- /#status-exchange -->
		`,
		none:
		`<div class="col-sm-12"><h2>Nenhuma pasta selecionada.</h2></div>`
	},
	initialize: function ()
	{
		try {
			var _this = this;

			_this.datatableOptions = {
				"processing": true,
				"serverSide": true,
				"lengthMenu": [[20, 50], [20, 50]],
				"order": [[ 0, "desc" ]],
				language: {
					processing: "Processando...",
					search: "Pesquisar",
					lengthMenu: "Mostrar _MENU_ registros",
					info: "Exibindo de _START_ a _END_ em _TOTAL_ registros",
					infoEmpty: "Nenhum item encontrado",
					infoFiltered: "(filtro sobre _MAX_)",
					emptyTable: "Sem registros para listagem",
					paginate: {
						first: "Primeiro",
						previous: "Anterior",
						next: "Pr&oacute;ximo",
						last: "&Uacute;ltimo"
					}
				},
				"ajax": {
					dataSrc: function (json) {
						_this.collection.set(json.collection);
						_.map(json.collection, function (value, key) {
							var placa = _.first(value['placas']);

							value['placas'] = placa && placa.placa ? placa.placa : '';
							value['data'] = value['data'].substr(8, 2)+"/"+value['data'].substr(5, 2)+"/"+value['data'].substr(0, 4);
							value['tipo'] = "T"+value['tipo'];
							value['feedbacks'] = '<i class="fa fa-fw fa-comment"></i> '+value['feedbacks'];
							value['analista'] = typeof value['analista'] === "string" ? _.first(value['analista'].split(/\s+/)) : "";

							if (value['nome_motorista']) {
								value['nome_motorista'] = _.first(value['nome_motorista'].split(/\s/));
							}

							return value;
						});

						return json.collection;
					},
					url: adagio.environment.getEndpoint("operacoes"),
					data: function(query)
					{
						query.tipo = _this.model.get('status');

						if (query.draw === 1 && _this.model.has('search')) {
							query.search = _this.model.get('search');
							query.start = _this.model.get('start');
							query.order = _this.model.get('order');

							if (_this.model.get('search') && _this.model.get('search').value) {
								_this.$('#datatable_filter input').val(_this.model.get('search').value);
							}
						} else {
							_this.model.set('search', query.search);
							_this.model.set('start', query.start);
							_this.model.set('order', query.order);
						}
					}
				},
				"columns": _this.columns[_this.model.get('layout')]
			};
			this.
			getScript('/DataTables/js/jquery.dataTables.min.js', "js").
			getScript('/DataTables/js/dataTables.bootstrap.min.js', "js").
			getScript('/DataTables/css/dataTables.bootstrap.min.css', "css").
			load("web").
			release();
		}
		catch (error) {
			console.error(error);
		}
		finally {
			//
		}
	},
	render: function()
	{
		var _this = this;

		if (this.collection === undefined) {
			this.collection = new Backbone.Collection();
		}
		else if (this.collection.cid === undefined) {
			this.collection = new Backbone.Collection(this.collection);
		}
		else {
			this.collection.reset(this.collection);
		}
		this.collection.url = adagio.environment.getEndpoint("operacoes");

		if (this.$el.attr("class") === undefined) {
			this.require();
		}
		else if (this.$el.attr("class") !== this.className) {
			this.require();
		}
		else {
			if (this.datatable) {
				this.datatable.destroy();
			}
			this.datatable = this.$('#datatable').DataTable(this.datatableOptions);
		}
		return this;
	},
	columns: {
		minimal: [
		{ "className": "on-td hidden-xs hidden-sm", "data": "data", },
		{ "className": "on-td hidden-xs hidden-sm", "data": "tipo" },
        { "className": "on-td", "orderable": false, "data": "planta" },
		{ "className": "on-td", "orderable": false, "data": "placas" },
		{ "className": "on-td hidden-xs hidden-sm", "orderable": false, "data": "nome_motorista" },
		{ "className": "on-td", "orderable": false, "data": "transportadora" },
		{ "className": "hidden-xs hidden-sm", "orderable": false, "data": "feedbacks" }
		],
		full: [
		{ "className": "on-td hidden-xs hidden-sm", "data": "data", },
		{ "className": "on-td hidden-xs hidden-sm", "data": "tipo" },
        { "className": "on-td", "orderable": false, "data": "planta" },
		{ "className": "on-td", "orderable": false, "data": "placas" },
		{ "className": "on-td", "orderable": false, "data": "transportadora" },
		{ "className": "on-td hidden-xs hidden-sm", "orderable": false, "data": "analista" },
		{ "className": "hidden-xs hidden-sm", "orderable": false, "data": "feedbacks" }
		],
		selfish: [
		{ "className": "on-td hidden-xs hidden-sm", "data": "data", },
		{ "className": "on-td hidden-xs hidden-sm", "data": "tipo" },
        { "className": "on-td", "orderable": false, "data": "planta" },
		{ "className": "on-td", "orderable": false, "data": "placas" },
		{ "className": "on-td", "orderable": false, "data": "nome_motorista" },
		{ "className": "on-td hidden-xs hidden-sm", "orderable": false, "data": "analista" },
		{ "className": "hidden-xs hidden-sm", "orderable": false, "data": "feedbacks" }
		],
	},
	require: function ()
	{
		try {
			this.required = this.model.get('required') || false;
			if ($.fn.dataTable && $.fn.dataTable.isDataTable('#datatable')) {
				this.datatable.destroy();
			}
			if (this.required === false) {
				this.model.set('required', true);
			}
			this.$el.html(this.template(this.model.get('layout'))).attr("class", this.className);
			this.datatable = this.$('#datatable').DataTable(this.datatableOptions);
		}
		catch (error) {
			console.error(error);
		}
	}
}