{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-cartorial-todos",
  "events": {
    "click .editar_dados": function editarDados(event) {
      event.preventDefault();
      // , {"tenant": this.$(event.currentTarget).data("contexto")}
      var destino = "!".concat(adagio.environment.getTenancy("cartorial/".concat(this.$(event.currentTarget).val())));
      adagio.eventBus.trigger("navigate", destino, {"trigger": true});
    },
    "keypress #busca": function buscarPorDigitar(event) {
      if (event.which == 13) {
        event.preventDefault();
        event.stopPropagation();
        var requests = this.model.get('requests'),
          regionalismo = this.$("#inputRegionalismo").val(requests["cartorial-regionalismo"]),
          busca = this.$("#searchbox").serialize();
        adagio.eventBus.trigger(
          "navigate",
          ["!", adagio.environment.getTenancy("cartorial?"), busca, "&page=1"].join(''),
          {"trigger": true}
        );
      }
    },
    "click #filtrar": function buscarPorClicar() {
      event.preventDefault();
      event.stopPropagation();
      var requests = this.model.get('requests'),
        regionalismo = this.$("#inputRegionalismo").val(requests["cartorial-regionalismo"]),
        busca = this.$("#searchbox").serialize();
      adagio.eventBus.trigger(
        "navigate",
        ["!", adagio.environment.getTenancy("cartorial?"), busca, "&page=1"].join(''),
        {"trigger": true}
      );
    },
    "click .inativar_cadastro": function inativarCadastro(event) {
      var $currentTarget = this.$(event.currentTarget),
        id_cartorial_dado = $currentTarget.val(),
        id_contexto = this.$(event.currentTarget).data("contexto"),
        option = $currentTarget.data("value");
      var confirmar = confirm("Deseja definir esse cadastro para " + option.toUpperCase() + " agora?");
      if (confirmar === true) {
        $.ajax({
          "context": this,
          "url": [
            adagio.environment.getEndpoint("cartorial/inativarcadastro/", {"tenant": id_contexto}),
            id_cartorial_dado,
            '?acao=',
            option
          ].join('')
        })
        .done(function (retorno) {
          if (retorno === "true") {
            var
              withQuerystring = location.hash.slice(1).search(/\?/i) === -1 ? false : true,
              withCompletion = withQuerystring ? '&_=' : '?_=',
              uri = [location.hash.slice(1), withCompletion, _.now()].join("");
            this.route.set({"uri": uri});
          }
        });
      }
    }
  },
  "listagem": _.template(`
  <div class="row">
		<div class="col-xs-12">
			<div id="area_alertas"></div>
			<div class="adagio-notification"></div>
		</div>
	</div>
    <style>
      .remove_padding{padding-left: 0 !important; padding-right: 0 !important;}
      .verificar_vencidos {padding: 10px 15px; cursor: pointer;}
    </style>
    <table class="table table-striped table-bordered" cellspacing="0" width="100%" style="width: 100%;">
      <thead>
        <tr role="row">
          <th>Nome/Modelo</th>
          <th>CPF/Tanque</th>
          <th><%= view.get("campos").findWhere({"elemento": "frota"}).get("campo_personalizado") %></th>
          <th>Transportadora</th>
          <th>Situação</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <% if(view.get("paginacao").qtdados == 0){ %>
          <tr>
            <td colspan="6" align="center">Nenhum registro encontrado</td>
          </tr>
        <% } %>
        <% view.get("dados").each(function (item) { %>
          <tr role="row" class="<%= (item.get("status") == "0" ? "danger" : (item.get("grupo") === null ? "warning" : "")) %>">
            <td><%= item.get("nome_condutor") || item.get("modelo_veiculo") %></td>
            <td><%= item.get("cpf_condutor") || (item.get("placa_veiculo") || item.get("apolice")) %></td>
            <td><%= item.get("apelido") !== null ? item.get("apelido") : '' %></td>
            <td><%= item.get("nome") %></td>
            <td>
              <span class="label <%= (item.get("narquivos") === this.get("quotas")[item.get("pasta")][item.get("operacao")] ? "label-success" : "label-inverse") %>">
<%= [item.get("narquivos"), '/', (item.get("operacao") === null ? _.find(this.get("quotas")[item.get("pasta")]) : this.get("quotas")[item.get("pasta")][item.get("operacao")])].join('') %>
              </span>
            </td>
            <td>
              <span class="pull-right">
<button title="Editar casdastro" type="button" class="btn btn-xs btn-default editar_dados" value="<%= item.get("id_cartorial_dado") %>" data-contexto="<%= item.get("contexto_id") %>"><i class="fa fa-fw fa-pencil-square-o"></i></button>
<button title="<%= item.get("status") == "0" ? "Reativar" : "Inativar" %>" type="button" class="btn btn-xs btn-default inativar_cadastro" data-value="<%= item.get("status") == "0" ? "on" : "off" %>" value="<%= item.get("id_cartorial_dado") %>" data-contexto="<%= item.get("contexto_id") %>"><i class="<%= (item.get("status") == "0" ? "fa fa-fw fa-unlock" : "fa fa-fw fa-lock") %>"></i></button>
              </span>
            </td>
          </tr>
        <% }, view); %>
      </tbody>
    </table>
  `,
  {"variable": "view"}),
  "template": _.template(`
    <style>
      a { color: #5c7995; }
      .space { padding: 10px 0 10px 0; }
      .pagination { float: right; margin: 0 0 10px 0; }
    </style>

    <div class="container-fluid">

<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-default">
      <div class="panel-body">
        <form class="form-inline" id="searchbox">
          <div class="form-group">
            <label for="inputCadastro" class="sr-only">Natureza</label>
            <select class="form-control" id="inputCadastro" name="tipo-cadastro">
              <option value="0">Todos</option>
              <% this.model.get("pastas").each(function (pasta) { %>
              <option value="<%= pasta.get("id") %>"><%= pasta.get("titulo") %></option>
              <% }); %>
            </select>
          </div>
<div class="form-group">
  <label for="inputLocal" class="sr-only">Local</label>
  <select id="inputLocal" class="form-control" name="local">
    <option value="0">Todos</option>
    <% adagio.get("gruposKit").each(function (grupo) { %>
    <option value="<%= grupo.get('id') %>"><%= grupo.get('nome').toString().toUpperCase() %></option>
    <% }); %>
  </select>
</div>
          <div class="form-group">
            <label for="inputSituacao" class="sr-only">Status</label>
            <select class="form-control" name="situacao" id="inputSituacao">
              <option value="todos">Todos</option>
              <option value="ativos">Ativos</option>
              <option value="completos">Completos</option>
              <option value="incompletos">Incompletos</option>
              <option value="inativos">Inativos</option>
            </select>
          </div>
          <div class="form-group">
            <label for="busca" class="sr-only">Pesquisar</label>
            <input type="text" class="form-control" name="busca" id="busca" placeholder="Pesquisar...">
          </div>
          <button id="filtrar" type="button" class="btn btn-default">Carregar</button>
          <input type="hidden" value="on" name="cartorial-regionalismo" id="inputRegionalismo">
        </form>
      </div>
    </div>
  </div>
</div>

      <div class="row"><!--ini row-->
        <div class="col-sm-12" id="listagem">

        </div>

        <div class="col-sm-12 paginacao_cartorial">
          <nav>
            <ul class="pagination"></ul>
          </nav>
        </div>
      </div><!--fim row-->

      <div class="row space"></div>
    </div>
  `,
  {"variable": "adagio"}),
  "initialize": function () {
    try {
      this.getJSON(adagio.environment.getEndpoint("prestadores")).load("web").release();
    }
    catch (thrown) {
      console.error(thrown);
    }
  },
  "paginacao": function () {
    var
      _this = this,
      corpo = "",
      page = parseInt(this.model.get("paginacao").page),
      npage = parseInt(this.model.get("paginacao").npage),
      inicio = (page > 1) ? page - 1 : 1, // não futricar
      fim = 3, // não colocar menor que 3, número de páginas
      n = (fim - 2);

    if (npage > fim) {
      if (page > 1){
        fim = page + n;
      }
      if ((npage - n) <= page) {
        fim = npage;
        inicio = npage - (n + 1);
      }
    }
    else {
      fim = npage;
      inicio = 1;
    }

    for (i = inicio; i <= fim; i++) {
      corpo += '<li id="id' + i + '"><a href="#!' + adagio.environment.getTenancy(this.linkGenerator('cartorial', {"page": i})) + '">' + i + '</a></li>';
    }

    this.$('.paginacao_cartorial .pagination').html(corpo);
    this.$('.paginacao_cartorial .pagination ' + '#id' + this.model.get("paginacao").page).attr('class', 'active');
    this.$("#registros").attr("class", "active");
  },
  "render": function () {
    if (this.$el.attr("class") === undefined) {
      this.$el.html(this.template(this.model)).attr("class", this.className);
      this.$('#listagem').html(this.listagem(this.model));
      this.paginacao();
    } else if (this.$el.attr("class") !== this.className) {
      this.$el.html(this.template(this.model)).attr("class", this.className);
      this.$('#listagem').html(this.listagem(this.model));
      this.paginacao();
    } else {
      this.$('#listagem').html(this.listagem(this.model));
      this.paginacao();
    }
    return this;
  },
  "linkGenerator": function (uri, querystring) {
    var target = uri || '', requests = this.model.get('requests') || {}, params = [];

    for (var key in querystring) {
      params.push(key+"="+querystring[key]);
    }

    for (var option in requests) {
      if (requests[option] !== null) {
        params.push(option+"="+requests[option]);
      }
    }

    return target + '?' + params.join('&');
  },
  notification: window.handling.notification
}