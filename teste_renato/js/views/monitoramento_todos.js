{
  "tagName": "div",
  "id": "adagio-home",
  "className": "monitoramento-index",
  "events": {
  },
  "template": _.template(`
<div class="container-fluid">
  <div class="row">
  <div class="col-sm-12">
    <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>Data</th>
          <th>Transportadora</th>
          <th>Rota</th>
          <th>Placa</th>
          <th></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Data</th>
          <th>Transportadora</th>
          <th>Rota</th>
          <th>Placa</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>
  </div>
</div>
  `,
  {"variable": "view"}),
  "initialize": function ()
  {
    try {
      this
        .getScript('/DataTables/js/jquery.dataTables.min.js', "js")
        .getScript('/DataTables/js/dataTables.bootstrap.min.js', "js")
        .getScript('/DataTables/css/dataTables.bootstrap.min.css', "css")
        .load("web")
        .release();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      //
    }
  },
  "render": function ()
  {
    var _this = this;

    this.$el.html(this.template(this.model)).attr("class", this.className);

    var datatableOptions = {
      "processing": true,
      "serverSide": true,
      // "deferLoading": _this.model.get ("recordsTotal"),
      "lengthMenu": [[20, 50], [20, 50]],
      "searching": false,
      // "order": [[ 0, "desc" ]],
      "language": {
        "processing": "Processando...",
        "search": "Pesquisar",
        "lengthMenu": "Mostrar _MENU_ registros",
        "info": "Exibindo de _START_ a _END_ em _TOTAL_ registros",
        "infoEmpty": "Nenhum item encontrado",
        "infoFiltered": "(filtro sobre _MAX_)",
        "emptyTable": "Sem registros para listagem",
        "paginate": {
          "first": "Primeiro",
          "previous": "Anterior",
          "next": "Pr&oacute;ximo",
          "last": "&Uacute;ltimo"
        }
      },
      "ajax": {
        "dataSrc": function (response) {
          return _.map(response.model.monitoramentos, function (monitoramento) {
            monitoramento.data = monitoramento.data.substr(8, 2) + "/" + monitoramento.data.substr(5, 2) + "/" + monitoramento.data.substr(0, 4);
            monitoramento.link = '<a class="btn btn-xs btn-inverse" href="#!' + adagio.environment.getTenancy('monitoramentos/' + monitoramento.id) + '"><i class="fa fa-share-square-o" aria-hidden="true"></i> acessar</a>';
            return monitoramento;
          }, this);
        },
        "url": adagio.environment.getEndpoint("monitoramentos"),
        "data": function (query) {
          query.status = _this.model.get("status");
        }
      },
      "columns": [
        {"orderable": false, "data": "data"},
        {"orderable": false, "data": "transportadora"},
        {"orderable": false, "data": "trajeto"},
        {"orderable": false, "data": "placa"},
        {"orderable": false, "data": "link"}
      ]
    };

    if (this.datatable) {
      this.datatable.destroy();
    }

    this.datatable = this.$('#example').DataTable(datatableOptions);
  }
}