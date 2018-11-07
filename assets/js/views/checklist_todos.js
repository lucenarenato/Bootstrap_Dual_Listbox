{
  "tagName": "div",
  "id": "adagio-home",
  "className": "checklist-index",
  "template": _.template(`
<div class="container-fluid">
  <div class="row">
  <div class="col-sm-12">
    <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th class="hidden-xs hidden-sm">Data</th>
          <th class="hidden-xs hidden-sm">Operação</th>
          <th class="hidden-xs hidden-sm">Frota</th>
          <th>Autor</th>
          <th>Placa</th>
          <th></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="hidden-xs hidden-sm">Data</th>
          <th class="hidden-xs hidden-sm">Operação</th>
          <th class="hidden-xs hidden-sm">Frota</th>
          <th>Autor</th>
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
      "searching": true,
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
          return _.map(response.model.checklists, function (checklist) {
            checklist.data = checklist.data.substr(8, 2) + "/" + checklist.data.substr(5, 2) + "/" + checklist.data.substr(0, 4);
            checklist.link = '<a class="btn btn-xs btn-inverse" href="#!' + adagio.environment.getTenancy('checklists/' + checklist.id) + '"><i class="fa fa-share-square-o" aria-hidden="true"></i> acessar</a>';
            checklist.autor = checklist.autor && checklist.autor.length ? checklist.autor.split(" ").shift() : "";
            return checklist;
          }, this);
        },
        "url": adagio.environment.getEndpoint("checklists"),
        "data": function (query) {
          query.status = _this.model.get("status");
        }
      },
      "columns": [
        {"orderable": false, "data": "data", "className": "hidden-xs hidden-sm"},
        {"orderable": false, "data": "operacao", "className": "hidden-xs hidden-sm",},
        {"orderable": false, "data": "nome_grupo", "className": "hidden-xs hidden-sm"},
        {"orderable": false, "data": "autor", "className": "hidden-xs"},
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