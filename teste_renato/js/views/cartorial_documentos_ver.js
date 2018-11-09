{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-cartorial-documentos-ver",
  "template": _.template(`
  <div class="container">
  <div class="row">
  <div class="col-sm-6">

  <form class="form-horizontal">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">ID</label>
    <div class="col-sm-10">
      <p class="form-control-static"><%= view.get("id") %></p>
    </div>
  </div>
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Documento</label>
    <div class="col-sm-10">
      <p class="form-control-static"><%= view.get("titulo").toUpperCase() %></p>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <p class="form-control-static"><%= view.get("possui_vencimento") === true ? "VENCIMENTO" : "SEM VENCIMENTO" %></p>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
    <p class="form-control-static<%= view.get("ativo") === false ? " text-muted" : "" %>"><%= view.get("ativo") === true ? "ATIVO" : "INATIVO" %></p>
    </div>
  </div>
  <div class="form-group">
    <hr>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <a href="#!<%= adagio.environment.getTenancy('cartorial/documentos/' + view.get("id") + '/edit') %>" class="btn btn-inverse"><span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span> Editar</a>
    </div>
  </div>
</form>

  </div>
  <div class="col-sm-6">

  <ul class="list-group">
  <% view.get("dependencias").each(function (dependencia) { %>
  <li class="list-group-item">OPERA&Ccedil;&Atilde;O: <%= dependencia.get("operacao") %>, PASTA: <%= dependencia.get("pasta").toUpperCase() %></li>
  <% }); %>
  </ul>

  </div>
  </div>
  </div>`,
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