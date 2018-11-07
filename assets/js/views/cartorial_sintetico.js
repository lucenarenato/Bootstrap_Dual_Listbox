{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-cartorial-sintetico",
  "template": _.template(`
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">

<% var estatisticaAprovados = view.get('estatistica').reduce(function (memo, item){ return memo + item.get('aprovados'); }, 0) %>
<% var estatisticaTotais = (view.get('estatistica').reduce(function (memo, item){ return memo + item.get('totais'); }, 0) + view.get('estatistica').reduce(function (memo, item){ return memo + item.get('ausentes'); }, 0)) %>

<div class="alert alert-inverse alert-dismissible fade in" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  DATA IN&Iacute;CIO: <%= view.get('periodo_inicio') || 'TODOS' %> //////// DATA FIM: <%= view.get('periodo_fim') || 'TODOS' %>
</div>

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
    <th>Plantas</th>
    <th class="text-right">Ausentes</th>
    <th class="text-right">Pendentes</th>
    <th class="text-right">Reprovados</th>
    <th class="text-right">Aprovados</th>
    <th class="text-right">Totais</th>
    <th class="text-right">%</th>
  </tr>
</thead>
<tfoot>
  <tr>
    <td>Subtotais</td>
    <td class="text-right text-danger"><%= view.get('estatistica').reduce(function (memo, item){ return memo + item.get('ausentes'); }, 0) %></td>
    <td class="text-right"><%= view.get('estatistica').reduce(function (memo, item){ return memo + item.get('pendentes'); }, 0) %></td>
    <td class="text-right"><%= view.get('estatistica').reduce(function (memo, item){ return memo + item.get('reprovados'); }, 0) %></td>
    <td class="text-right"><%= estatisticaAprovados %></td>
    <td class="text-right"><%= estatisticaTotais %></td>
    <td class="text-right"><%= (estatisticaAprovados / estatisticaTotais * 100).toFixed(2) %>%</td>
  </tr>
</tfoot>
<tbody id="lancamentos">
<% view.get('estatistica').each(function (planta) { %>
  <tr>
    <td><strong><%= planta.get('nome').toString().toUpperCase() %></strong></td>
    <td class="text-right text-danger"><%= planta.get('ausentes') %></td>
    <td class="text-right"><%= planta.get('pendentes') %></td>
    <td class="text-right"><%= planta.get('reprovados') %></td>
    <td class="text-right"><%= planta.get('aprovados') %></td>
    <td class="text-right"><%= (planta.get('totais') + planta.get('ausentes')) %></td>
    <td class="text-right"><%= ((planta.get('pendentes') + planta.get('reprovados') + planta.get('ausentes')) === 0 ? 100 : (planta.get('aprovados') / (planta.get('totais') + planta.get('ausentes')))*100).toFixed(2) %>%</td>
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
    if (this.$el.attr("class") === undefined) {
      this.$el.html(this.template(this.model)).attr("class", this.className);
    }
    if (this.$el.attr("class") !== this.className) {
      this.$el.html(this.template(this.model)).attr("class", this.className);
    }
  },
  "notification": handling.notification
}