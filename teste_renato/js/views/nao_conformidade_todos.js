{
  "tagName": "div",
  "id": "adagio-home",
  "className": "nao-conformidade-index",
  "template": _.template(`
<div class="container-fluid">
  <div class="row">
  <div class="col-sm-12">
    <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th class="hidden-xs hidden-sm text-center">#</th>
          <th class="hidden-xs hidden-sm">Data</th>
          <th class="hidden-xs hidden-sm">Operação</th>
          <th class="hidden-xs hidden-sm">Planta</th>
          <th class="hidden-xs hidden-sm">Transportadora</th>
          <th class="hidden-xs hidden-sm">Placa</th>
          <th class="hidden-xs hidden-sm">Condutor</th>
          <th class="hidden-xs hidden-sm">Analista</th>
          <th>Visualizar</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="hidden-xs hidden-sm">#</th>
          <th class="hidden-xs hidden-sm">Data</th>
          <th class="hidden-xs hidden-sm">Operação</th>
          <th class="hidden-xs hidden-sm">Planta</th>
          <th class="hidden-xs hidden-sm">Tranportadora</th>
          <th class="hidden-xs hidden-sm">Placa</th>
          <th class="hidden-xs hidden-sm">Condutor</th>
          <th class="hidden-xs hidden-sm">Analista</th>
          <th>Visualizar</th>
          <th>Deletar</th>
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
      "order": [[ 0, "desc" ]],
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
          return _.map(response.model.naoConformidades, function (naoConformidade) {
            naoConformidade.data = naoConformidade.data.substr(8, 2) + "/" + naoConformidade.data.substr(5, 2) + "/" + naoConformidade.data.substr(0, 4);
            naoConformidade.link = '<a class="btn btn-xs btn-inverse" href="#!' + adagio.environment.getTenancy('naoConformidades/' + naoConformidade.id) + '"><i class="fa fa-eye" aria-hidden="true"></i> acessar</a>';
            naoConformidade.deletar = '<button type="button" class="btn btn-xs btn-inverse bg-danger btn-deletar" value="'+naoConformidade.id +'"><i class="fa fa-trash" aria-hidden="true"></i> deletar</button>';

            return naoConformidade;
          }, this);
        },
        "url": adagio.environment.getEndpoint("naoConformidades"),
        "data": function (query) {       
          query.status = _this.model.get("status");       
        }
      },
      "columns": [
        {"orderable": true, "data": "id_nc", "className": "hidden-xs hidden-sm"},
        {"orderable": false, "data": "data", "className": "hidden-xs hidden-sm"},
        {"orderable": false, "data": "percurso", "className": "hidden-xs hidden-sm",},
        {"orderable": false, "data": "planta", "className": "hidden-xs hidden-sm",},
        {"orderable": false, "data": "transportadora", "className": "hidden-xs hidden-sm"},
        {"orderable": false, "data": "placa", "className": "hidden-xs hidden-sm"},
        {"orderable": false, "data": "nome_condutor", "className": "hidden-xs hidden-sm"},
        {"orderable": false, "data": "analista", "className": "hidden-xs hidden-sm"},
        {"orderable": false, "data": "link"},
        {"orderable": false, "data": "deletar"}
      ]
    };

    if (this.datatable) {
      this.datatable.destroy();
    }

    this.datatable = this.$('#example').DataTable(datatableOptions);
  },
    events: {
        "click .btn-deletar":
        function(event){
            var deletarNaoConformidades = _.debounce(this.currentTarget, 600, true);
            id = (this.$(event.currentTarget).val());
            decisao = confirm("Você tem certeza que deseja deletar a Não Conformidade ?");
            if (decisao){

                $.ajax({
                    "url": adagio.environment.getEndpoint("naoConformidades/" + id),
                    "method": "delete",
                    "dataType": "json",
                    "global": false,
                    "context": this
                })
                    .then(function(response){
                      if(response){
                          alert("A NC " + response + " foi deletada com sucesso!");
                      }
                    })
                    .errors(function(){
                        alert('Ocorreu um erro ao deletar a NC escolhida. Favor verificar');
                    });
            }
        }
    }
}
