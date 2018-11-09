{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-cartorial-documentos",
  "events": {
    "change select": "retrieve"
  },
  "retrieve": function analitico(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    var $dom = this.$('form');

    $.ajax({
      "method": "get",
      "url": adagio.environment.getEndpoint('cartorial/documentos?' + $dom.serialize()),
      "context": this
    })
    .done(function (response) {
      this.$("#documentos_tabela").empty();
      _(response.model.documentos).each(function (documento) {
        this.$("#documentos_tabela").append('<tr' + (documento.ativo === false ? ' class="danger"' : '') + '><th scope="row">' + documento.id + '</th><td>' + documento.titulo + '</td><td>' + documento.operacao_nome + '</td><td>' + (documento.possui_validade === true ? 'SIM' : 'N&Atilde;O') + '</td><td><a href="#!' + adagio.environment.getTenancy('cartorial/documentos/' + documento.id) + '" class="btn btn-xs btn-inverse"><i class="fa fa-share-square-o" aria-hidden="true"></i> acessar</a></td></tr>');
      }, this);
    });

    return false;
  },
  "template": _.template(`
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
<form class="form-header-documentos">
<div class="panel panel-default">
  <div class="panel-body">
    <div class="row">
      <div class="col-lg-4">
      <p class="small text-muted text-uppercase"><strong>OPERA&Ccedil;&Atilde;O</strong></p>
      <div class="form-group">
        <select class="form-control" id="inputOperacao" name="documentos-operacoes">
          <option value="0">Selecionar...</option>
          <% view.get('tesoes').each(function (vinculo) { %>
            <option value="<%= vinculo.get('id') %>"><%= vinculo.get('tesao').toString().toUpperCase() %></option>
          <% }); %>
        </select>
      </div>
      </div>
      <div class="col-lg-4">
        <p class="small text-muted text-uppercase"><strong>PASTA</strong></p>
        <select class="form-control" id="inputPasta" name="documentos-pastas">
        <option value="0">Selecionar...</option>
        <% this.model.get("pastas").each(function (pasta) { %>
        <option value="<%= pasta.get("id") %>"><%= pasta.get("titulo") %></option>
        <% }); %>
        </select>
      </div>
      <div class="col-lg-4">
        <p class="small text-muted text-uppercase"><strong><%= view.get("nome_contexto") %></strong></p>
        <a href="#" class="btn btn-inverse btn-block btn-md">CRIAR NOVO</a>
      </div>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr><th>ID</th><th>Documento</th><th>Opera&ccedil;&atilde;o</th><th>Validade</th><th></th></tr>
    </thead>
    <tbody id="documentos_tabela"></tbody>
  </table>
</div>
</form>
      </div><!-- /.col-md-12 -->
    </div><!-- /.row -->
    <div class="row">
      <div class="col-md-12">

      </div>
    </div>
  </div><!-- /.container-fluid -->`,
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
    this.retrieve();
  },
  "notification": handling.notification
}