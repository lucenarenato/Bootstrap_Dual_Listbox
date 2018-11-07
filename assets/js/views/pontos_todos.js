{
  "tagName": "div",
  "id": "adagio-home",
  "className": "ponto-index",
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
          <th>Tipo</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Data</th>
          <th>Tipo</th>
          <th>Latitude</th>
          <th>Longitude</th>
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
          return _.map(response.model.pontos, function (ponto) {
            ponto.data = ponto.created_at.substr(8, 2) + "/" + ponto.created_at.substr(5, 2) + "/" + ponto.created_at.substr(0, 4);
            ponto.link = '<a class="btn btn-xs btn-inverse" href="#!' + adagio.environment.getTenancy('ponto/' + ponto.id) + '"><i class="fa fa-share-square-o" aria-hidden="true"></i> acessar</a>';
            if(ponto.pontuavel_type == 'pontosAcionamento'){
              ponto.pontuavel_type = 'Ocorrência';
            }
            else if(ponto.pontuavel_type == 'pontosCombustivel'){
              ponto.pontuavel_type = 'Postos de Combustível';
            } 
            else if(ponto.pontuavel_type == 'pontosErb'){
              ponto.pontuavel_type = 'ERB';
            }
            else if(ponto.pontuavel_type == 'pontosHospedagem'){
              ponto.pontuavel_type = 'Hospedagem';
            } 
            else if(ponto.pontuavel_type == 'pontosPedagios'){
              ponto.pontuavel_type = 'Pedágio';
            } 
            else if(ponto.pontuavel_type == 'pontosPolicia'){
              ponto.pontuavel_type = 'Unidade Policial';
            } 
            else if(ponto.pontuavel_type == 'pontosPrestador'){
              ponto.pontuavel_type = 'Prestador FEDERAL ST';
            } 
            else if(ponto.pontuavel_type == 'pontosReferencia'){
              ponto.pontuavel_type = 'Ponto Notável';
            }
            else if(ponto.pontuavel_type == 'pontosRisco'){
              ponto.pontuavel_type = 'Risco de Parada e Pernoite';
            } 
            else if(ponto.pontuavel_type == 'pontosRodoviario'){
              ponto.pontuavel_type = 'Risco Rodovário';
            } 
            else if(ponto.pontuavel_type == 'pontosTransportadora'){
              ponto.pontuavel_type = 'Transportadora';
            }  

            return ponto;
          }, this);
        },
        "url": adagio.environment.getEndpoint("ponto"),
        "data": function (query) {
          //alert(_this.model.get("tipo"));
          query.tipo = _this.model.get("tipo");          
        }
      },
      "columns": [
        {"orderable": false, "data": "data"},
        {"orderable": false, "data": "pontuavel_type"},
        {"orderable": false, "data": "latitude"},
        {"orderable": false, "data": "longitude"},
        {"orderable": false, "data": "link"}
      ]
    };

    if (this.datatable) {
      this.datatable.destroy();
    }

    this.datatable = this.$('#example').DataTable(datatableOptions);
  }
}