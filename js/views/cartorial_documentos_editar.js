{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-cartorial-documentos-editar",
  "events": {
    "submit .to-be-added": function (event) {
      event.preventDefault();

      event.stopPropagation();

      $.ajax({
        "method": "put",
        "url": adagio.environment.getEndpoint("cartorial/documentos/" + this.model.get("id")),
        "data": this.$(event.currentTarget).serialize() + "&acao=add",
        "context": this
      })
      .done(function (response) {
        //
      });

      return false;
    },
    "click .to-be-deleted": function (event) {
      event.preventDefault();

      event.stopPropagation();

      $.ajax({
        "method": "put",
        "url": adagio.environment.getEndpoint("cartorial/documentos/" + this.model.get("id")),
        "data": _.extend(this.$(event.currentTarget).data(), {
          "acao": "remove"
        }),
        "context": this
      })
      .done(function (response) {
        this.$(event.currentTarget).remove();
      });

      return false;
    }
  },
  "template": _.template(`
  <div class="container">
  <div class="row">
  <div class="col-sm-6">

  <form class="form-horizontal">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">ID</label>
    <div class="col-sm-10">
      <p class="form-control-static">12</p>
    </div>
  </div>
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Documento</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email" value="<%= view.get("titulo").toUpperCase() %>">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox"><label><input type="checkbox" checked="checked"> <span class="text">Vencimento</span></label></div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox"><label><input type="checkbox" checked="checked" disabled="disabled"> <span class="text">Ativo</span></label></div>
    </div>
  </div>
  <div class="form-group">
    <hr>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Editar</button>
    </div>
  </div>
</form>

  </div>
    <div class="col-sm-6">

    <div class="panel panel-default">
    <div class="panel-body">
    <form class="form-horizontal to-be-added">
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-4 control-label">Opera&ccedil;&atilde;o</label>
      <div class="col-sm-8">
      <select class="form-control" id="inputOperacao" name="documentos-operacoes">
      <option value="0">Selecionar...</option>
      <% view.get('tesoes').each(function (vinculo) { %>
        <option value="<%= vinculo.get('id') %>"><%= vinculo.get('tesao').toString().toUpperCase() %></option>
      <% }); %>
    </select>
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-4 control-label">Pasta</label>
      <div class="col-sm-8">
      <select class="form-control" id="inputPasta" name="documentos-pastas">
      <option value="0">Selecionar...</option>
      <% this.model.get("pastas").each(function (pasta) { %>
      <option value="<%= pasta.get("id") %>"><%= pasta.get("titulo") %></option>
      <% }); %>
      </select>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-4 col-sm-8">
        <button type="submit" class="btn btn-default">Adicionar</button>
      </div>
    </div>
  </form>
  </div>
  </div>

      <div class="list-group">
      <% view.get("dependencias").each(function (dependencia) { %>
        <a href="#" class="list-group-item clearfix to-be-deleted" data-operacao="<%= dependencia.get("operacao_id") %>" data-pasta="<%= dependencia.get("pasta_id") %>">OPERA&Ccedil;&Atilde;O: <%= dependencia.get("operacao") %>, PASTA: <%= dependencia.get("pasta").toUpperCase() %> <span class="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span></a>
      <% }); %>
      </div>
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