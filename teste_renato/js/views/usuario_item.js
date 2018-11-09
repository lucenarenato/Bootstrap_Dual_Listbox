{
	"tagName": "li",
	"className": "list-group-item",
	"template": _.template(`
	<div class="row">
		<div class="col-sm-12 clearfix">
		<ul class="list-inline pull-left">
			<li class="visible-md-inline visible-lg-inline"><img src="/images/icon.png" alt="..." style="height:32px;width:auto;"></li>
			<li><abbr title="<%= view.get('email') %>"><%= view.get('nome') %></abbr></li>
			<li><p class="text-muted"><%= view.get('documento') %></p></li>
			<li class="visible-md-inline visible-lg-inline text-info"><% _.each(_.uniq(_.pluck(_.flatten(view.get('contextos')), 'contexto')), function (item) { %>
			<span class="label label-info"><%= item %></span>
			<% }); %></li>
		</ul>
		<span class="pull-right"><a href="#!<%= adagio.environment.getTenancy('usuarios/'+view.get('id')) %>" class="btn btn-default btn-sm"><i class="fa fa-user"></i></a></span>
		</div>
		<% if (view.get('dependentes').length) { %>
		<div class="row">
		<div class="col-sm-12">
		<table class="table table-condensed">
		<% _.each (view.get('dependentes'), function (dependente) { %>
		<tr>
			<td><%= dependente.nome %></td>
			<td><p class="text-muted"><%= dependente.documento %></p></td>
			<td><p class="text-muted visible-md-inline visible-lg-inline"><%= dependente.email %></p></td>
			<td><p class="text-right">
				<a href="#!<%= adagio.environment.getTenancy('usuarios/'+dependente.id) %>" class="btn btn-default btn-xs"><i class="fa fa-user"></i></a>
				<a href="#!<%= adagio.environment.getTenancy('usuarios/'+dependente.id) %>/edit" class="btn btn-default btn-xs"><i class="fa fa-user-plus"></i></a>
				<a href="#!<%= adagio.environment.getTenancy('usuarios/'+dependente.id) %>" class="btn btn-default btn-xs remover-dependente" data-id="<%= dependente.id %>"><i class="fa fa-user-times"></i></a>
			</p></td>
		</tr>
			<% if (dependente.dependentes && dependente.dependentes.length > 0) { %>
			<tr>
			<td colspan="4">
				<div class="row">
				<div class="col-sm-12">
					<p class="small text-muted text-uppercase"><strong>outros</strong></p>
					<div class="list-group">
						<% _.each(dependente.dependentes, function (subdependente) { %>
							<a href="#!<%= adagio.environment.getTenancy('usuarios/'+subdependente.id) %>" class="list-group-item"><%= subdependente.nome %></a>
						<% }); %>
					</div>
				</div>
				</div>
			</td>
			</tr>
			<% } %>
		<% }); %>
		</table>
		</div>
		</div>
		<% } %>
	</div>
	`, {"variable": "view"}),
	"initialize": function (options) {
		this.release();
	},
	"render": function () {
		if (this.model.has("id")) {
			this.$el.html(this.template(this.model));
		}
		return this;
	}
}