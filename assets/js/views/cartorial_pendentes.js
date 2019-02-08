{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-cartorial-pendentes",
  "template": _.template(`
<div class="container-fluid">

<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-default">
      <div class="panel-body">
        <form class="form-inline" id="searchbox">
          <input type="hidden" name="cartorial-regionalismo" value="<%= view.get('cartorial-regionalismo') %>">
          <input type="hidden" name="status" value="<%= view.get('status') %>">
          <div class="form-group">
            <label for="inputPercurso" class="sr-only">Natureza</label>
            <select class="form-control" id="inputPercurso" name="tipo-cadastro">
            <option value="0">Todos</option>
            <% view.get("pastas").each(function (pasta) { %>
            <option value="<%= pasta.get("id") %>"<%= pasta.get("id") == this.get("pasta") ? " selected" : "" %>><%= pasta.get("titulo") %></option>
            <% }, view); %>
            </select>
          </div>
<div class="form-group">
  <label for="inputLocal" class="sr-only">Local</label>
  <select id="inputLocal" class="form-control" name="local">
  <option value="0" class="oculto">Todos</option>
  <% view.get("gruposKit").each(function (grupo) { %>
  <option value="<%= grupo.get('id') %>"<%= grupo.get("id") == this.get("local") ? " selected" : "" %>><%= grupo.get('nome').toString().toUpperCase() %></option>
  <% }, view); %>
  </select>
</div>
          <div class="form-group">
            <label for="inputSituacao" class="sr-only">Tempo</label>
            <div class="input-group input-daterange">
              <input type="text" class="form-control" name="periodo-inicio" value="<%= view.get('periodo-inicio') === null ? '' : view.get('periodo-inicio').toString().split('-').reverse().join('/') %>">
              <span class="input-group-addon">at&eacute;</span>
              <input type="text" class="form-control" name="periodo-fim" value="<%= view.get('periodo-fim') === null ? '' : view.get('periodo-fim').toString().split('-').reverse().join('/') %>">
            </div>
          </div>
          <button id="filtrarx" type="submit" class="btn btn-default">Carregar</button>
        </form>
      </div>
    </div>
  </div>
</div>

  <div class="row">
    <div class="col-sm-12">
      <table id="tabelaPendentes" class="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead><tr>
      <th>Transportadora</th><th>Documento</th><th>...</th><!--<th>Criação</th>--><th>Vencimento</th><th></th>
      </tr></thead>
      <tfoot><tr>
      <th>Transportadora</th><th>Documento</th><th>...</th><!--<th>Criação</th>--><th>Vencimento</th><th></th>
      </tr></tfoot>
      <tbody id="listaPendentes"></tbody>
      </table>
    </div><!-- /.col-sm-12 -->
    <div class="col-sm-12">
        <p><strong>P</strong> significa Pender;</p>
        <p><strong>A</strong> significa Aprovar;</p>
        <p><strong>R</strong> significa Reprovar.</p>
    </div><!-- /.col-sm-12 -->
  </div><!-- /.row -->
</div><!-- /.container-fluid -->
  `,
  {"variable": "view"}),
  "events": {
    "click .set-status": function setStatus(event) {
      try {
        var
          $currentTarget = this.$(event.currentTarget),
          datas = $currentTarget.data();
        $.ajax({
          "context": this,
          "url": [adagio.environment.getEndpoint("cartorialDoc"), datas.hash].join('/'),
          "method": "PUT",
          "data": datas
        })
        .done(function (retorno) {
          var notification = new NotificationFx({
            "message": '<span class="icon pe-7s-like2"></span><p>Documento avaliado com sucesso.</p>',
            "layout": 'bar',
            "effect": 'slidetop',
            "type": 'success',
            "position": 'topright'
          });
          notification.show();
          if (this.datatable) {
            this.datatable.draw();
          }
        });
      } catch (caughtException) {
        console.error(caughtException);
      } finally {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    "submit #searchbox": function buscarPorClicar() {
      try {
        event.preventDefault();
        event.stopPropagation();
        var busca = this.$("#searchbox").serialize();
        location.hash = ["!", adagio.environment.getTenancy("cartorial/pendentes?"), busca].join('');
        /*
        adagio.eventBus.trigger(
          "navigate",
          ["!", adagio.environment.getTenancy("cartorial/pendentes?"), busca].join(''),
          {"trigger": true}
        );
        */
      } catch (error) {
        console.error(error);
      } finally {
        return false;
      }
    }
  },
  "initialize": function ()
  {
    try {
      this.
      getScript('/DataTables/js/jquery.dataTables.min.js', "js").
      getScript('/DataTables/js/dataTables.bootstrap.min.js', "js").
      getScript('/DataTables/css/dataTables.bootstrap.min.css', "css").
      getJSON(adagio.environment.getEndpoint("prestadores")).
      load("web").
      release();
    } catch (thrown) {
      console.error(thrown);
    } finally {
      //
    }
  },
  "render": function () {
    var _this = this;

    if (this.$el.attr("class") === undefined) {
      this.$el.html(this.template(this.model)).attr("class", this.className);
    } else if (this.$el.attr("class") !== this.className) {
        this.$el.html(this.template(this.model)).attr("class", this.className);
    } else {
        this.$el.html(this.template(this.model));
    }

        var datatableOptions = {
            "processing": true,
            "serverSide": true,
            // "deferLoading": _this.model.get ("recordsTotal"),
            "lengthMenu": [[20, 50], [20, 50]],
            "searching": false,
            // "order": [[ 0, "desc" ]],
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
                        /*
                        if (value['created_at'] === null)
                            value['created_at'] = '<span class="label label-default">Inaplic&aacute;vel</span>';
                        else
                            value['created_at'] = value['created_at'].substr(8, 2) + "/" + value['created_at'].substr(5, 2) + "/" + value['created_at'].substr(0, 4);
                        */
                        if (value['vencimento'] === null)
                            value['vencimento'] = '<span class="label label-inverse">Nenhum</span>';
                        else
                            value['vencimento'] = value['vencimento'].substr(8, 2) + "/" + value['vencimento'].substr(5, 2) + "/" + value['vencimento'].substr(0, 4);

                        value['transportadora'] = '<a class="btn btn-link" href="#!' + adagio.environment.getTenancy("cartorial/"+value['arquivavel_id']) + '"><i class="fa fa-external-link"></i> '+value['transportadora']+'</a>';

                        if (value['sha256'] === null)
                            value['nome'] = '<a class="btn btn-inverse" href="javascript:void(0);"><i class="fa fa-ban"></i> '+value['nome']+'</a>';
                        else
                            value['nome'] = '<a class="btn btn-link" target="_blank" href="/storage/'+value['sha256']+'"><i class="fa fa-external-link"></i> '+value['nome']+'</a>';
                        /*
                        if (value["nome_condutor"] !== null && value["nome_condutor"].length > 0)
                            value["nome_condutor"] = value["nome_condutor"].split(/\s/).shift();
                        */
if (_this.model.get("write") === 0)
value['controle'] = `
<a href="javascript:void(0);" class="btn btn-labeled btn-primary disabled" disabled><i class="btn-label fa fa-fw fa-check"></i></a>
<a href="javascript:void(0);" class="btn btn-labeled btn-danger disabled" disabled><i class="btn-label fa fa-fw fa-close"></i></a>`;
else if (_this.model.get("status") === "aprovados") {
    // <a href="#" class="btn btn-labeled btn-warning set-status" data-valor="0" data-documento="`+value['arquivo_type']+`" data-serie="`+value['ordem']+`" data-referencia="`+value['arquivavel_id']+`" data-hash="`+(value['sha256'] || 0)+`"><i class="btn-label fa fa-fw fa-clock-o"></i>P</a>
    value['controle'] = '<a href="#" class="btn btn-labeled btn-danger set-status" data-valor="-1" data-documento="'+value['arquivo_type']+'" data-serie="'+value['ordem']+'" data-referencia="'+value['arquivavel_id']+'" data-hash="'+(value['sha256'] || 0)+'"><i class="btn-label fa fa-fw fa-close"></i>R</a>';
}
else if (_this.model.get("status") === "reprovados") {
    // <a href="#" class="btn btn-labeled btn-warning set-status" data-valor="0" data-documento="`+value['arquivo_type']+`" data-serie="`+value['ordem']+`" data-referencia="`+value['arquivavel_id']+`" data-hash="`+(value['sha256'] || 0)+`"><i class="btn-label fa fa-fw fa-clock-o"></i>P</a>
    value['controle'] = '<a href="#" class="btn btn-labeled btn-primary set-status" data-valor="1" data-documento="'+value['arquivo_type']+'" data-serie="'+value['ordem']+'" data-referencia="'+value['arquivavel_id']+'" data-hash="'+(value['sha256'] || 0)+'"><i class="btn-label fa fa-fw fa-check"></i>A</a>';
}
else if (_this.model.get("status") === "vencidos") {
    value['controle'] = '';
}
else {
value['controle'] = `
<a href="#" class="btn btn-labeled btn-primary set-status" data-valor="1" data-documento="`+value['arquivo_type']+`" data-serie="`+value['ordem']+`" data-referencia="`+value['arquivavel_id']+`" data-hash="`+(value['sha256'] || 0)+`"><i class="btn-label fa fa-fw fa-check"></i>A</a>
<a href="#" class="btn btn-labeled btn-danger set-status" data-valor="-1" data-documento="`+value['arquivo_type']+`" data-serie="`+value['ordem']+`" data-referencia="`+value['arquivavel_id']+`" data-hash="`+(value['sha256'] || 0)+`"><i class="btn-label fa fa-fw fa-close"></i>R</a>`;
}
            return value;
          });
          return json.collection;
        },
        url: adagio.environment.getEndpoint("cartorial/pendentes"),
        data: function (query) {
          query.status = _this.model.get("status");
          if (_this.model.get("cartorial-regionalismo") !== null) {
            query["cartorial-regionalismo"] = _this.model.get("cartorial-regionalismo");
          }
          if (_this.model.get("periodo-inicio") !== null) {
            query["periodo-inicio"] = _this.model.get("periodo-inicio");
          }
          if (_this.model.get("periodo-fim") !== null) {
            query["periodo-fim"] = _this.model.get("periodo-fim");
          }
          if (_this.model.get("percurso") !== null) {
            query["percurso"] = _this.model.get("percurso");
          }
          if (_this.model.get("local") !== null) {
            query["local"] = _this.model.get("local");
          }
          if (_this.model.get("tipo-cadastro") !== null) {
            query["tipo-cadastro"] = _this.model.get("tipo-cadastro");
          }
        }
      },
      "columns": [
        {"orderable": false, "data": "transportadora"},
        {"orderable": false, "data": "nome"},
        {"orderable": false, "data": "nome_condutor"},
        /* {"orderable": false, "data": "created_at"}, */
        {"orderable": false, "data": "vencimento"},
        {"orderable": false, "data": "controle"}
      ]
    };

    if (this.datatable) {
      this.datatable.destroy();
    }

    this.datatable = this.$('#tabelaPendentes').DataTable(datatableOptions);

    $.fn.datepicker.dates['pt'] = {
      "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "daysShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      "daysMin": ["Dm", "Sg", "Tr", "Qa", "Qi", "Sx", "Sb"],
      "months": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      "monthsShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      "today": "Today",
      "clear": "Clear",
      "format": "yyyy-mm-dd",
      "titleFormat": "MM yyyy",
      "weekStart": 0
    };

    this.$('.input-daterange input').each(function () {
      self.$(this).datepicker({"language": "pt", "format": "dd/mm/yyyy"}).on("changeDate", function (eventDate) {
        console.log(eventDate);
      });
    });
  }
}