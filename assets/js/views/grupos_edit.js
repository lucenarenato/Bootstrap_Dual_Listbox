{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-grupos-edit",
  "template": _.template(`
<div class="container-fluid">
<div class="row">
<div class="col-sm-12">
<p class="lead"><%= view.get('nome').toString().toUpperCase() + " #" +view.get('id') %></p>
<form class="edit">
  <div class="adagio-notification">
    <% if (view.get('ativo') === 1 || view.get('ativo') === true) { %>
      <div class="alert alert-info">Esse grupo está ativado regularmente.</div>
    <% } else { %>
      <div class="alert alert-danger">Esse grupo foi desativado.</div>
    <% } %>
  </div>
  <div class="form-horizontal">
    <div class="form-group">
      <label for="inputObjeto" class="col-sm-4 control-label">Objeto</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" id="inputObjeto" placeholder="" value="<%= view.get('nome').toString().toUpperCase() %>" name="nome">
        <input type="hidden" value="<%= view.get('ativo') %>" name="ativo"></input>
        <input type="hidden" value="<%= view.get('id') %>" name="id"></input>
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-4 control-label">Proprietário</label>
      <div class="col-sm-8">
        <select class="form-control" name="proprietario">
          <option value="0">Selecionar...</option>
          <% if (this.collection.todos) this.collection.todos.each(function (usuario) { %>
            <option value="<%= usuario.get('id') %>" <%= (parseInt(view.get('proprietario')) === usuario.get('id') ? 'selected' : '') %>><%= usuario.get('nome') %></option>
          <% }); %>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="inputContexto" class="col-sm-4 control-label">Contexto</label>
      <div class="col-sm-8">
        <select class="form-control" id="inputContexto" name="contexto">
          <option value="0">Selecionar...</option>
          <% if (this.collection.contextos) this.collection.contextos.each(function (contexto) { %>
            <option value="<%= contexto.get('id') %>" <%= (parseInt(view.get('contexto')) === contexto.get('id') ? 'selected' : '') %>><%= contexto.get('contexto').toString().toUpperCase() %></option>
          <% }); %>
        </select>
      </div>
    </div>
    <div class="form-group">
    <label for="inputOperacao" class="col-sm-4 control-label">Opera&ccedil;&atilde;o</label>
    <div class="col-sm-8">
      <select class="form-control" id="inputOperacao" name="operacao">
        <option value="0">Selecionar...</option>
        <% if (this.collection.operacoes) this.collection.operacoes.each(function (operacao) { %>
          <option value="<%= operacao.get('id') %>" <%= (parseInt(view.get('operacao_id')) === operacao.get('id') ? 'selected' : '') %>><%= operacao.get('titulo').toString().toUpperCase() %></option>
        <% }); %>
      </select>
    </div>
  </div>
    <div class="form-group">
    <label for="inputTipo" class="col-sm-4 control-label">Tipo</label>
    <div class="col-sm-8">
      <select class="form-control" id="inputTipo" name="tipo">
        <option value="0">Selecionar...</option>
        <% _.each([{"id":1,"titulo":"Planta"},{"id":2,"titulo":"Região Leiteira"}], function (tipo) { %>
          <option value="<%= tipo.id %>" <%= (parseInt(view.get('tipo')) === tipo.id ? 'selected' : '') %>><%= tipo.titulo.toString().toUpperCase() %></option>
        <% }); %>
      </select>
    </div>
  </div>
  <hr>
    <div class="form-group">
      <label for="inputApelido" class="col-sm-4 control-label">Apelido</label>
      <div class="col-sm-8"><input type="text" class="form-control" id="inputApelido" placeholder="" value="<%= view.get('apelido') %>" name="apelido"></div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-4 control-label">Descrição</label>
      <div class="col-sm-8"><textarea class="form-control" name="descricao"><%= view.get('descricao') || '' %></textarea></div>
    </div>
  </div>
  <div>
    <hr>
    <% if (view.get('ativo') === 1 || view.get('ativo') === true) { %>
      <button id="ativacao" type="button" class="btn btn-outline btn-danger">Desativar</button>
    <% } else { %>
      <button id="ativacao" type="button" class="btn btn-outline btn-success">Ativar</button>
    <% } %>
    <button type="submit" class="btn btn-primary">Salvar</button>
  </div><!-- /.col-md-12 -->
</form>
</div><!-- /.col-md-12 -->
</div><!-- /.row -->
</div><!-- /.container-fluid -->
  `,
  {"variable": "view"}),
  "events": {
    "submit form.edit": "edicao",
    "click #ativacao": "ativacao",
  },
  "ativacao": function ativacao(event) {
    event.preventDefault();
    event.stopPropagation();
    var
      _this = this,
      vars = {"ativo": 0};
    if (_this.model.get('ativo') === 1 || _this.model.get('ativo') === true) {
      //
    }
    else {
      vars.ativo = 1;
    }
    $.ajax({
      "url": adagio.environment.getEndpoint("grupos/" + _this.model.get("id")),
      "method": 'patch',
      "dataType": 'json',
      "data": vars,
      "context": _this
    }).done(function (response) {
      if (this.model.get('ativo') === 1 || this.model.get('ativo') === true) {
        this.model.set('ativo', 0);
      }
      else {
        this.model.set('ativo', 1);
      }
      this.route.set({"uri": [location.hash.slice(1), '?_=', _.now()].join("")});
    });
    return event;
  },
  "edicao": function edicao(event) {
    event.preventDefault();
    event.stopPropagation();
    var _this = this
      , vars = {}
      , $currentTarget = this.$(event.currentTarget);
    $currentTarget.find("input, textarea, select").each(function () {
      vars[this.name] = this.value === 'true' ? 1 : (this.value === 'false' ? 0 : this.value);
    });
    $.ajax({
      "url": adagio.environment.getEndpoint("grupos/" + _this.model.get("id")),
      "method": 'put',
      "dataType": 'json',
      "data": vars,
      "context": _this
    }).done(function (response) {
      //
    });
    return event;
  },
  "initialize": function grupos_edit() {
    try {
      this.load("web").release();
    }
    catch (error) {
      console.error(error);
    }
  },
  "render": function () {
    try {
      this.$el.html(this.template(this.model));
    }
    catch (thrown) {
      console.error(thrown);
    }
    finally {
      return this;
    }
  },
  "notification": window.handling.notification
}