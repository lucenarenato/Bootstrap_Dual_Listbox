{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-grupos-usuarios",
  "events": {
    "submit form.inserir-usuario": function inserirUsuario(event) {
      event.stopPropagation();
      event.preventDefault();
      var self = this,
        vars = {},
        $currentTarget = this.$(event.currentTarget);
      vars.forms = new FormData($currentTarget.get(0));
      self.collection.usuarios.create(null, {
        "wait": true,
        "processData": false,
        "contentType": false,
        "data": vars.forms,
        "context": self,
        "complete": function(jqXHR, textStatus) {
          self.collection.usuarios.fetch().done(function () {
            self.carregarUsuarios(event);
          });
        }
      });
    },
    "click .excluir": function excluirUsuario(event) {
      event.stopPropagation();
      event.preventDefault();
      var self = this,
        $currentTarget = this.$(event.currentTarget);
      self.collection.usuarios.get($currentTarget.data('id')).destroy({
        "complete": function (model, response) {
          self.collection.usuarios.fetch().done(function () {
            self.carregarUsuarios(event);
          });
        },
        "context": self
      });
    }
  },
  "template": _.template(`
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
      <p class="lead"><%= view.get('grupo').toString().toUpperCase() %></p>
      <div class="adagio-notification"></div>
<nav class="navbar navbar-inverse">
<div class="container-fluid">
<!-- Brand and toggle get grouped for better mobile display -->
<div class="navbar-header">
<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
</div>
<!-- Collect the nav links, forms, and other content for toggling -->
<div class="navbar-collapse" id="bs-example-navbar-collapse-1">
<form class="navbar-form navbar-left inserir-usuario">
<div class="form-group">
<select class="form-control" name="usuario">
<option value="0">Selecionar...</option>
<% this.collection.todos.each(function (usuario) { %>
<option value="<%= usuario.get('id') %>"><%= usuario.get('email') %></option>
<% }); %>
</select>
</div>
<button type="submit" class="btn btn-success btn-default">Adicionar</button>
<input type="hidden" value="<%= view.get('id') %>" name="grupo">
</form>
<ul class="nav navbar-nav navbar-right">
<li><a href="#!<%= adagio.environment.getTenancy('grupos') %>">Voltar</a></li>
</ul>
</div>
<!-- /.navbar-collapse -->
</div>
<!-- /.container-fluid -->
</nav>
            </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default"><table class="table">
        <thead><tr><th>#</th><th>Nome</th><th>Agrupamento</th><th></th></tr></thead>
        <tbody id="groupusers"></tbody>
        </table></div>
      </div><!-- /.col-md-12 -->
    </div><!-- /.row -->
  </div><!-- /.container-fluid -->
  `, {"variable": "view"}),
  "initialize": function initialize() {
    try {
      this.load("web").release();
    }
    catch (thrown) {
      console.error(thrown);
    }
  },
  "render": function render() {
    try {
      if (this.$el.attr("class") === undefined) {
        this.$el.html(this.template(this.model)).attr("class", this.className);
      }
      else if (this.$el.attr("class") !== this.className) {
        this.$el.html(this.template(this.model)).attr("class", this.className);
      }
      else {
        //
      }
      this.carregarUsuarios({currentTarget: this.$("#groupusers"), preventDefault: function (){}});
    }
    catch (thrown) {
      console.error(thrown)
    }
    finally {
      return this;
    }
  },
  "notification": window.handling.notification,
  "carregarUsuarios": function carregarUsuarios(event)
  {
    try {
      var fragmento = document.createDocumentFragment();

      if (this.collection.usuarios.length === 0) {
        throw "vazio";
      }

      this.collection.usuarios.each(function (usuario) {
        var item = Backbone.View.extend(this.subviews.grupos_usuario);
        fragmento.appendChild(new item({model: usuario}).el);
      },
      this);

      this.$("#groupusers").html(fragmento);
    }
    catch (error) {
      this.$("#groupusers").html('');
    }
    finally {
      event.preventDefault();
    }
  },
  "subviews": {
    "grupos_usuario": {
      "tagName": "tr",
      "template": _.template(`
      <th scope="row"><%= adagio.get('id') %></th>
      <td><%= adagio.get('nome').toString().toUpperCase() %><br /><small class="text-info"><%= adagio.get('titularidade') || '' %></small></td>
      <td><ul>
      <% _.each(adagio.get('grupos'), function (grupo) { %>
      <li><%= grupo.nome.toUpperCase() %></li>
      <% }); %>
      </ul></td>
      <td><a class="btn btn-danger btn-sm excluir" href="#" data-id="<%= adagio.get('id') %>">Remover</a></td>
      `,
      {"variable": "adagio"}),
      "initialize": function (options) {
        return this.render();
      },
      "render": function () {
        this.$el.html(this.template(this.model));
        return this;
      }
    }
  }
}