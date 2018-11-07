{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-relatorios-resumo-tedois",
	"events":
	{
		"submit": "updating"
	},
	"updating": function (event)
	{
		event.preventDefault ();
		event.stopPropagation ();

		var $dom = this.$(event.target),
			vars = {};
			vars.id = $dom.find ("input[name=operacao]").val ();

		$.ajax ({
			url: "/interfaces/operacoes/" + vars.id,
			method: "patch",
			data: $dom.serialize (),
			dataType: "json",
		}).done (function (response)
		{
			$dom.parents ("tr").hide ();
		});

		return false;
	},
	"template": _.template (`
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
			<h1 class="page-header margin-top-none">Resumo Operacional <small>T2</small></h1>
<div class="panel panel-default">
	<div class="panel-heading"><%= adagio.get ('data_inicio') %> - <%= adagio.get ('data_fim') %>
	<!--
		<div class="btn-group btn-group-xs pull-right" role="group" aria-label="...">
			<button type="button" class="btn btn-default"><i class="fa fa-download text-muted"></i> Download CSV</button>
		</div>
	-->
	</div>
	<div class="table-responsive" style="width: 100%;">
	<table class="table">
		<thead>
			<tr>
			<th scope="col">Transportadora</th>
			<th scope="col">Total</th>
			<th scope="col">N/C</th>
<% this.collection.regioes.each (function (regiao) { %>
	<th scope="col"><%= regiao.get ('apelido') %></th>
<% }); %>
			</tr>
		</thead>
		<tbody>
<% this.collection.transportadoras.each (function (transportadora) { %>
<% var grupo = this.collection.operacoes.where ({ grupo: transportadora.get ('transportadora') }) %>
	<tr>
		<td><%= transportadora.get ('nome_transportadora') %></td>
		<td><strong><%= grupo.reduce (function (memo, num) { if (num) return memo+num.get('totais'); else return memo + 0; }, 0) %></strong></td>
		<td><strong><%= grupo.reduce (function (memo, num) { if (num) return memo+num.get('reprovados'); else return memo + 0; }, 0) %></strong></td>
		<% this.collection.regioes.each (function (regiao) { %>
		<% var aggregation = this.collection.operacoes.where ({ outro_grupo: regiao.get ('id'), grupo: transportadora.get ('transportadora') }) %>
			<td><%= aggregation.reduce (function (memo, item){ return memo + item.get ('totais'); }, 0) %></td>
		<% }, this); %>
	</tr>
<% }, this); %>
		</tbody>
	</table>
	</div>
</div>

<div class="panel panel-default">
<div class="panel-body">
<div class="row">
<% this.collection.regioes.each (function (regiao) { %>
	<div class="col-sm-4 col-md-3">
	<span class="label outline info pull-right"><%= regiao.get ('apelido') %></span> <%= regiao.get ('nome').replace (/[\-]/gi, ' ').substr (2).toUpperCase () %>
	</div>
<% }); %>
</div>
</div>
</div>

<h1 class="page-header margin-top-none"><small>Registros sem região leiteira detectados</small></h1>
<div class="panel panel-default">
	<table class="table table-responsive">
		<thead>
			<tr>
				<th scope="col">Data</th>
				<th scope="col">Transportadora</th>
				<th scope="col">Localidade</th>
				<th scope="col">RL</th>
			</tr>
		</thead>
		<tbody>
			<% this.collection.revisoes.each (_(function (revisao) { %>
			<tr>
				<td><%= revisao.get ('data') %></td>
				<td><%= revisao.get ('nome_grupo').toString ().toUpperCase () %></td>
				<td><%= (revisao.get ('tipo') === 1 ? revisao.get ('nome_origem_uf') : revisao.get ('nome_origem_uf') + '/' + revisao.get ('nome_destino_uf')) %></td>
				<td>
					<form class="form-inline change-up">
					<input type="hidden" name="operacao" value="<%= revisao.get ('id') %>" />
					<input type="hidden" name="status" value="-1" />
					<select name="outro_grupo" class="form-control">
					<option value="0">Selecionar...</option>
<% this.collection.regioes.each (function (regiao) { %>
	<option value="<%= regiao.get ('id') %>"><%= regiao.get ('nome').toString ().toUpperCase () %></option>
<% }); %>
					</select>
					<button type="submit" class="btn btn-default btn-md">OK</button>
					<a href="#!/operacoes/<%= revisao.get ('id') %>" class="btn btn-primary btn-md">VER</a>
					</form>
				</td>
			</tr>
			<% }).bind (this)); %>
		</tbody>
	</table>
</div>
			</div><!-- /.col-md-12 -->
		</div><!-- /.row -->
	</div><!-- /.container-fluid -->
	`, {variable: 'adagio'}),
	"initialize": function ()
	{
		try
		{
			this.
				getScript ("/sumea/chartist.js", "js").
				getScript ("/sumea/chartist.css", "css").
				load ("board").
				release ();
		}
		catch (thrown)
		{
			console.error (thrown);
		}
		finally
		{
			//
		}
	},
	"render": function ()
	{
		try
		{
			if (this.$el.attr ("class") === undefined)
			{
				this.$el.html (this.template (this.model)).attr ("class", this.className);
			}
			else if (this.$el.attr ("class") !== this.className)
			{
				this.$el.html (this.template (this.model)).attr ("class", this.className);
			}
			else
			{
				//
			}
		}
		catch (thrown)
		{
			console.error (thrown);
		}
		finally
		{
			return this;
		}
	},
	"notification": handling.notification
}