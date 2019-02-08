{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-cartorial-transferencias",
  "events": {
    "click .submit-patch-fix": function (event) {
      event.preventDefault();
      event.stopPropagation();
      var
        $currentTarget = this.$(event.currentTarget),
        resource = [adagio.environment.getEndpoint("cartorial/transferencias"), $currentTarget.data("id")].join('/'),
        modal = this.$("#" + $currentTarget.data("modal")),
        self = this,
        submeter = confirm("Deseja fazer isso realmente?");
      if (submeter === true) {
        $.ajax({
          "context": this,
          "url": resource,
          "method": "patch",
          "data": {
            "checksum": $currentTarget.data("checksum")
          },
          "beforeSend": function () {
            $currentTarget.prop("disabled", true).addClass("disabled");
          }
        })
        .done(function (data, textStatus, jqXHR) {
					modal.one('hidden.bs.modal', _.debounce(function () {
						self.route.set({"uri": [location.hash.slice(1), '?_=', _.now()].join("")});
					}, 300));
					modal.modal('hide');
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          $currentTarget.prop("disabled", false).removeClass("disabled");
        });
      }
    }
  },
  "template": _.template(`
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">

<div class="panel panel-white">
  <div class="panel-heading">
    <h3 class="panel-title">Situa&ccedil;&atilde;o de documentos</h3>
    <!--
    <div class="panel-tools">
      <a class="tools-action" href="#" data-toggle="collapse" style="color: #000;"><i class="pe-7s-angle-up"></i></a>
      <a class="tools-action" href="#" data-toggle="dispose" style="color: #000;"><i class="pe-7s-close"></i></a>
    </div>
    -->
  </div>
  <div class="panel-body" style="padding: 0; margin: 0;">

<div class="table-responsive" style="width: 100%;"><table class="table">
<thead>
  <tr>
    <th>Registro</th>
    <th>Instância</th>
    <th></th>
  </tr>
</thead>
<tfoot>
  <tr>
    <td>Registro</td>
    <td>Instância</td>
    <td></td>
  </tr>
</tfoot>
<tbody id="lancamentos">
<% _.each(view.get('tabelaDivergencias'), function (divergencia) { %>
  <tr>
    <td><strong><%= divergencia[0].get('identificacao') %></strong></td>
    <td><%= divergencia.length %></td>
    <td><button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal-<%= divergencia[0].get('identificacao') %>">VERIFICAR</button>
<form class="form-fix">
<!-- Modal -->
<div class="modal fade" id="modal-<%= divergencia[0].get('identificacao') %>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><%= divergencia[0].get('identificacao') %></h4>
      </div>
<table class="table">
  <thead>
    <tr>
      <th>GRUPO</th>
      <th>CRIAÇÃO</th>
      <th>OPÇÃO</th>
    </tr>
  </thead>
  <tbody>
<% _.each(divergencia, function (registro) { %>
<tr class="<%= registro.get('grupo') === null ? 'warning' : '' %>">
<td><a href="https://adagio.klios.com.br/#!/t/4/cartorial/<%= registro.get('uid') %>"><%= registro.get('grupo') === null ? 'SEM NEXO' : registro.get('grupo').toString().toUpperCase() %></a></td>
<td><%= registro.get('created_at') %></td>
<td>
<% if (registro.get('grupo') !== null) { %>
<a class="btn btn-xs btn-block btn-success submit-patch-fix" data-id="<%= registro.get('uid') %>" data-checksum="<%= registro.get('checksum') %>" data-modal="modal-<%= registro.get('identificacao') %>">MANTER</a></td>
<% } %>
</tr>
<% }); %>
  </tbody>
</table>
    </div>
  </div>
</div>
</form>
    </td>
  </tr>
<% }); %>
</tbody>
</table></div>

  </div><!-- /.panel-body -->
</div><!-- /.panel -->

      </div><!-- /.col-md-12 -->
    </div><!-- /.row -->
  </div><!-- /.container-fluid -->
  `,
  {"variable": "view"}),
  "initialize": function () {
    try {
      this.load("web").release();
    }
    catch (thrown) {
      console.error(thrown);
    }
  },
  "render": function () {
    this.model.set("tabelaDivergencias", this.model.get('divergencias').groupBy(function (divergencia) {
      return divergencia.get('identificacao');
    }));

    this.$el.html(this.template(this.model)).attr("class", this.className);
  },
  "notification": handling.notification
}