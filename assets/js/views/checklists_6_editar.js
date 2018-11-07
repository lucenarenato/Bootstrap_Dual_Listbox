{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-checklists-edit",
  "events": {
    "click #carregar-formulario-completo": "carregarFormulario",
    "click #incluirPlaca": "incluirPlaca",
    "click .checklist-set": "salvarChecklist",
    "change #inputVinculo": "mostrarCnpj",
    "click #adicionar-problema": "incluirOcorrencia",
    "click #incluirComentarioNoModelo": "incluirComentarioNoModelo",
    "click .remocao-evidencia": function (event) {
      try {
        this.model.get("rolEvidencias").remove(this.$(event.target).data("cid"));
      } catch (thrown) {
        console.error(thrown);
      } finally {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    "change #entradaEvidencia": function (event) {
      var
        files = event.target.files,
        mimetypes = ["image/png", "image/jpeg", "image/gif", "image/bmp"];

      for (var i = 0, file; file = files[i]; i++) {
        if (mimetypes.indexOf(file.type) === -1) {
          //
        } else {
          this.model.get("rolEvidencias").add({"__file": file});
        }
      }
    },
  },
  "evidenciaEmSelecao": _.template('<div id="anexacao_<%= fragment.cid %>" class="row">' +
  '<div id="previsao_<%= fragment.cid %>" class="col-sm-6">' +
  '<div class="thumbnail"><img src="<%= fragment.image %>" /></div>' +
  '</div>' +
  '<div class="col-sm-6"><p>Legenda</p>' +
  '<textarea id="legenda_<%= fragment.cid %>" class="form-control"></textarea>' +
  '<div class="p-t-10"><a href="#" class="btn btn-inverse btn-block remocao-evidencia" data-cid="<%= fragment.cid %>"><i class="fa fa-times" aria-hidden="true"></i> Remover</a></div>' +
  '</div>' +
  '</div>',
  {"variable": "fragment"}),
  "adicionarEvidencia": function (model, collection, options) {
    var
      reader = new FileReader(),
      _this = this;

    reader.onloadend = function (readerEvent) {
      _this.$("#selecaoArquivo").after(_this.evidenciaEmSelecao({
        "image": readerEvent.target.result,
        "cid": model.cid
      }));
    };

    if (model.get("__file")) {
      reader.readAsDataURL(model.get("__file"));
    }
  },
  "removerEvidencia": function (model, collection, options) {
    this.$("#anexacao_" + model.cid).remove();
  },
  "incluirOcorrencia": function (event) {
    try {
      this.incluirOcorrenciaPorId({
        "id": this.$("#ocorrenciasProblema").val(),
        "titulo": this.$("#ocorrenciasProblema option:selected").text(),
        "nota": this.$("#ocorrenciasNota").val()
      });

      this.$("#ocorrenciasProblema").val(0);

      this.$("#ocorrenciasNota").val('');
    } catch (thrown) {
      console.error(thrown);
    } finally {
      event.preventDefault();
      event.stopPropagation();
    }
  },
  "incluirComentario": function (model, collection, options) {
    try {
      if (model.get("anexos") === undefined) {
        console.log(model);
        return;
      }

      if (model.get("anexos").length > 0) {
        var tabelaAnexos = '<table class="table table-bordered table-condensed">';

        _.each(model.get("anexos"), function (anexo) {
          tabelaAnexos += '<tr><td><a href="/storage/' + anexo.arquivo_id + '" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i> ' + anexo.arquivo_nome + '</a></td></tr>';
        });

        tabelaAnexos += '</table>';
      } else {
        tabelaAnexos = '';
      }

      this.$("#receptaculoDeComentarios").append('<div class="media">' +
      '<div class="media-left media-top"><a href="#"><img class="media-object" src="https://www.gravatar.com/avatar/8cdfcdf4defb7936b5b3fe666b9fddcb?s=64" alt="Avatar"></a></div>' +
      '<div class="media-body">' +
      '<h4 class="media-heading">' + model.get("usuario_nome") + '</h4>' +
      '<small class="text-muted">' + model.get("comentario_data") + '</small><p>' +
      model.get("comentario_conteudo") +
      '</p>' +
      tabelaAnexos +
      '</div>' +
      '</div>');
    } catch(thrown) {
      console.error(thrown);
    }
  },
  "incluirComentarioNoModelo": function (event) {
    try {
      var data = new FormData();

      data.append("conteudo", this.$("#conteudoComentario").val());

      $.each(this.$("#anexoComentario").get(0).files, function (index, file) {
        data.append("anexos[]", file);
      });

      this.model.get("rolComentarios").create(null, {
        "timeout": 0,
        "wait": true,
        "processData": false,
        "contentType": false,
        "data": data,
        "context": this
      });
    } catch (thrown) {
      console.error(thrown);
    } finally {
      event.preventDefault();
      event.stopPropagation();
    }
  },
  "incluirOcorrenciaPorId": function (options) {
    try {
      var
        ocorrenciaId = options.id,
        ocorrenciaTitulo = options.titulo,
        ocorrenciaNota = options.nota,
        linha = '<tr><th scope="row"><div><label><input checked="checked" type="checkbox" name="listagem[' + ocorrenciaId + ']" value="' + ocorrenciaId + '"> <span class="text">' + ocorrenciaTitulo + '</span></label></div></th><td><input type="text" name="notacao[' + ocorrenciaId + ']" value="' + ocorrenciaNota + '"></td></tr>';

      this.$("#receptaculoDeOcorrencias").append(linha);
    } catch (thrown) {
      console.error(thrown);
    }
  },
  "mostrarCnpj": function mostrarCnpj(event) {
    event.preventDefault();
    event.stopPropagation();

    var vinculo = parseInt(this.$(event.currentTarget).val());

    if (vinculo > 1) {
      this.$(".if-cnpj").show();
    }
    else {
      this.$(".if-cnpj").hide();
    }
  },
  "filaAnexos": function (position, collection) {
    var
      recursively = this.filaAnexos,
      _this = this;

    return new Promise(function (resolve, reject) {
      var
        key = position || 0,
        list = (collection === undefined) ? _this.model.get("rolEvidencias") : collection,
        url = _this.model.has('id')
          ? adagio.environment.getEndpoint('checklists/' + _this.model.get('id') + '/fotos')
          : _this.model.get('url') + '/fotos';

      // Promise
      if (list.length === 0) {
        return resolve();
      }
      // Deferred
      else {
        var
          formData = new FormData(),
          form = {
            "method": "post",
            "timeout": 0,
            "processData": false,
            "contentType": false,
            "url": url
          };

        formData.append("foto", list.at(key).get("__file"));

        formData.append("nota", _this.$("#legenda_" + list.at(key).cid).val());

        form.data = formData;

        return Promise.resolve($.ajax(form))
        .then(function () {
          _this.$("#anexacao_" + list.at(key).cid).remove();

          if (key + 1 < list.length) {
            return _this.filaAnexos.call(_this, key + 1, list);
          }
        }, function () {
          return reject();
        })
        .then(function () {
          _this.model.get("rolEvidencias").reset();
          return resolve();
        }, function () {
          return reject();
        });
      }
    });
  },
  "salvarChecklist": function (event)
  {
    try {
      var forms = this.$(".input-on-checklists").serialize(); // .replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '');

      $.ajax({
        "url": adagio.environment.getEndpoint("checklists"),
        "method": "post",
        "data": forms,
        "context": this
      })
      .done(function (data, textStatus, jqXHR) {
        if (jqXHR.getResponseHeader("Location")) {
          this.model.set("url", jqXHR.getResponseHeader("Location"));
        }
        if (data.error) {
          for (var n in data.errors) {
            this.$('[name="' + n + '"]').closest(".form-group").attr("class", "form-group has-error");
            for (o in data.errors[n]) {
              this.$('[name="' + n + '"]').closest("form").prepend('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + data.errors[n][o] + '</div>');
            }
          }
        } else {
          // ok
        }
        return jqXHR;
      })
      .done(function (data, textStatus, jqXHR) {
        console.log(jqXHR.getResponseHeader("Location"));
        if (this.model.has("id") && this.model.get("id") > 0) {
          return this.filaAnexos(0);
        } else if (this.model.has("url") && this.model.get("url").length > 0) {
          return this.filaAnexos(0);
        } else {
          return jqXHR;
        }
      });
    } catch (thrown) {
      console.error(thrown);
    } finally {
      event.preventDefault();
      event.stopPropagation();
    }
  },
  "carregarFormulario": function (event) {
    event.preventDefault();
    event.stopPropagation();

    var $currentTarget = this.$("#inputTipo");

    if ($currentTarget.val() === "0") {
      this.$("#checklist-form").empty();

      this.$("#painelOcorrencias").hide();

      this.$("#painelEvidencias").hide();

      this.$("#painelMensagens").hide();

      this.alteraBotaoStatus();

      return event;
    }

    var innerForm = ['checklist', $currentTarget.val()].join('_');

    this
      .__load(innerForm, {"model": this.model, "collection": this.collection})
      .then(function (loaded) {
        return loaded.getJSON(adagio.environment.getEndpoint("problemas/" + $currentTarget.val()))
          .then(function () {
            return loaded;
          });
      })
      .then(function (loaded) {
        if (loaded.model.has('create') && loaded.model.get('create') === true) {
          adagio.eventBus.trigger("checklist:create", [$currentTarget.val()]);
        }
        else {
          adagio.eventBus.trigger("checklist:edit", [$currentTarget.val()]);
        }
      });

    return event;
  },
  "template": _.template(`
  <div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <div class="btn-group">
        <button id="mostra-status" type="button" class="btn btn-default operacao-status">Carregando...</button>
        <button id="controle-status" type="button" class="btn btn-default operacao-status dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>
        <ul class="dropdown-menu" role="menu">
        <li><a href="#" class="codigo-status" data-codigo-status="1">Reprovado</a></li>
        <li><a href="#" class="codigo-status" data-codigo-status="3">Corrigido</a></li>
        <li><a href="#" class="codigo-status" data-codigo-status="5">Aprovado</a></li>
        </ul>
      </div><!-- /.btn-group -->
    </div><!-- /.col-xs-* -->
    <div class="col-xs-12 col-sm-6">
      <p class="lead operacao-autor"></p>
    </div><!-- /.col-xs-* -->
  </div><!-- /row -->
  <div class="row">
    &nbsp;
  </div>
  <div class="row">
    <div class="col-sm-12">
      <div class="panel panel-default">
        <div class="panel-heading">INSPEÇÃO #<%= view.get('id') %></div>
        <div class="panel-body">
          <form class="form-horizontal input-on-checklists">
          <input name="timestamp" value="<%= _.now () %>" type="hidden">
          <input name="id" value="<%= view.get('id') %>" type="hidden">
          <fieldset><div class="form-group">
            <label for="inputTipo" class="col-sm-3 control-label">Opera&ccedil;&atilde;o</label>
            <div class="col-sm-3">
              <select name="dados[tipo]" class="form-control" id="inputTipo">
              <option value="0">Selecionar...</option>
              <% if (view.has('operacoes')) view.get('operacoes').each(function (operacao) { %>
                <% var selecionado = view.has('dados') && operacao.get('id') === parseInt(this.get('dados').tipo) ? " selected" : "" %>
                <option<%= selecionado %> value="<%= operacao.get('id') %>"><%= operacao.get('operacao') %></option>
              <% }, view); %>
              </select>
            </div>
            <div class="col-sm-6"><button id="carregar-formulario-completo" type="button" class="btn btn-default">Carregar</button></div>
          </div></fieldset>
          <div id="checklist-form"></div>
          </form>
        </div><!-- panel-body -->
      </div>

<div id="painelOcorrencias" class="panel panel-inverse" style="display: none;">
  <div class="panel-heading">Ocorr&ecirc;ncias apontadas</div>
  <form class="input-on-checklists">
    <table class="table">
      <thead><tr><th scope="row">Motivo</th><th>Detalhe</th></tr></thead>
      <tbody id="receptaculoDeOcorrencias"></tbody>
    </table>
  </form>
  <div class="panel-body">
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only" for="ocorrenciasProblema">Problema</label>
        <select class="form-control" id="ocorrenciasProblema"><option value="0">Selecionar...</option></select>
      </div>
      <div class="form-group">
        <label class="sr-only" for="ocorrenciasNota">Detalhe do problema</label>
        <input type="text" class="form-control" id="ocorrenciasNota" placeholder="Nota">
      </div>
      <button id="adicionar-problema" type="submit" class="btn btn-default">Adicionar</button>
    </form>
  </div><!-- /.panel-body -->
</div><!-- /.panel -->

      <div class="row">
        <div class="col-xs-12 col-sm-6">

<div id="painelEvidencias" class="panel panel-inverse" style="display: none;">
  <div class="panel-heading">Evid&ecirc;ncias fotogr&aacute;ficas</div>
  <form class="input-on-checklists">
    <table class="table">
      <thead><tr><th scope="row">Imagem</th><th>Legenda</th></tr></thead>
      <tbody id="receptaculoDeEvidencias"></tbody>
    </table>
  </form>
  <div class="panel-body">
    <div id="selecaoArquivo" class="row">
      <div class="col-sm-12">
        <form class="">
          <div class="form-group"><input type="file" id="entradaEvidencia" name="arquivos" class="form-control" accept="image/png,image/jpeg,image/gif" multiple></div>
        </form>
      </div>
    </div>
  </div><!-- /.panel-body -->
  <div class="panel-footer">Apenas imagens no formato JPG, JPEG, PNG e GIF.</div>
</div><!-- /.panel -->

        </div><!-- /.col-xs-* -->
        <div class="col-xs-12 col-sm-6">
          <div id="painelMensagens" class="panel panel-inverse" style="display: none;">
            <div class="panel-heading">Coment&aacute;rios</div>
            <div class="row"><div class="col-xs-12"><textarea id="conteudoComentario" class="form-control"></textarea></div></div>
            <div class="row">
              <div class="col-xs-8"><input id="anexoComentario" type="file" class="form-control" multiple></div>
              <div class="col-xs-4"><a href="#" id="incluirComentarioNoModelo" class="btn btn-link btn-block"><i class="fa fa-reply" aria-hidden="true"></i> Responder</a></div>
            </div>
            <div id="receptaculoDeComentarios" class="panel-body" style="border-top: solid 1px #ccc;">
            </div><!-- /.panel-body -->
          </div><!-- /.panel -->
        </div><!-- /.col-xs-* -->
      </div><!-- /.row -->

      <div class="row">
        <div class="col-sm-4"><button type="button" class="btn btn-primary btn-lg checklist-set">Salvar</button></div>
      </div><!-- /.row -->

      <div class="row">
        &nbsp;
      </div><!-- /.row -->
    </div>
  </div>
  </div>`,
  {"variable": "view"}),
  "comum": function (operacaoTipo) {
    var _this = this;

    this.$("#receptaculoDeOcorrencias").empty();

    this.$('.date').datepicker({
      "format": "yyyy-mm-dd",
      "startDate": "-3m",
      "autoclose": true
    });

    this.$(".ufs").off().on("change", function (event) {
      var
        nome = this.id.split("_"),
        valor = this.value,
        alvo = ['#', nome[0], '_', 'id'].join('');

      if (valor !== "0") {
        _this.getJSON(adagio.environment.getRoot() + '/subdistritos?uf=' + valor).then(function (response) {
          _this.carregarLocais({
            "data": response['subdistritos.' + valor],
            "currentTarget": _this.$(alvo),
            "preventDefault": function () {
              //
            }
          });
        });
      }
    });

    this.$("#painelOcorrencias").show();

    this.$("#painelEvidencias").show();

    var grupoOcorrencias = this.model.get('problemas.' + operacaoTipo).groupBy(function (needle) {
      return needle.get('categoria');
    });

    for (var categoria in grupoOcorrencias) {
      this.$("#ocorrenciasProblema").append('<optgroup label="' + categoria + '">');

      for (var ocorrencia in grupoOcorrencias[categoria]) {
        var ocorrenciaInteira = grupoOcorrencias[categoria][ocorrencia];
        if (this.model.has('ocorrencias') && this.model.get('ocorrencias').get(ocorrenciaInteira.get('id'))) {
          this.incluirOcorrenciaPorId({
            "id": ocorrenciaInteira.get("id"),
            "titulo": ocorrenciaInteira.get("titulo"),
            "nota": this.model.get('ocorrencias').get(ocorrenciaInteira.get('id')).get('nota'),
          });
        }
        else {
          this.$("#ocorrenciasProblema").append('<option value="' + ocorrenciaInteira.get('id') + '">' + ocorrenciaInteira.get('titulo') + '</option>');
        }
      }

      this.$("#ocorrenciasProblema").append('</optgroup>');
    }
  },
  "create": function (operacaoTipo) {
    this.comum(operacaoTipo);

    this.alteraBotaoStatus();

    this.$("#incluirPlaca").trigger("click");
  },
  "edit": function (operacaoTipo) {
    this.comum(operacaoTipo);

    this.$('#inputVinculo').trigger('change');

    this.tratamentoStatus();

    this.preencherFormulario();

    this.preencherEvidencias();

    this.$("#painelMensagens").show();

    this.model.get("rolComentarios").fetch();

    this.$(".operacao-autor").html(
      "<small class='text-muted'><i class='fa fa-clock-o'></i> " + this.model.get("created_at").substr(-8) + "&nbsp;&mdash;&nbsp;" +
      "<i class='fa fa-calendar-o'></i> " + this.model.get("created_at").substr(8, 2) + "/" + this.model.get("created_at").substr(5, 2) + "/" + this.model.get("created_at").substr(0, 4) +
      "</small><br /><small><i class='fa fa-clock-o'></i> " + this.model.get("updated_at").substr(-8) +
      "&nbsp;&mdash;&nbsp;<i class='fa fa-calendar-o'></i> " + this.model.get("updated_at").substr(8, 2) + "/" + this.model.get("updated_at").substr(5, 2) + "/" + this.model.get("updated_at").substr(0, 4) +
      "</small>"
    );
  },
  "preencherEvidencias": function () {
    try {
      $.ajax({
        "method": "get",
        "url": adagio.environment.getEndpoint('checklists/' + this.model.get('id') + '/fotos'),
        "context": this,
        "beforeSend": function () {
          this.$("#receptaculoDeEvidencias").empty();
        }
      })
      .done(function (response) {
        _.each(response, function (item, key) {
          var datas = '';
          datas += ' data-id="' + item.hash_arquivo + '"';
          datas += ' data-update="' + adagio.environment.getEndpoint('checklists/' + this.model.get('id') + '/fotos/' + item.hash_arquivo) + '"';
          datas += ' data-observacoes="' + item.nota_arquivo + '"';
          this.$("#receptaculoDeEvidencias").append('<tr>' +
          '<td><a href="#" class="a-album"' + datas + '>' + item.nome_arquivo + '</a></td>' + '<td>' + (item.nota_arquivo || 'Sem legenda') + '</td>' +
          '</tr>');
        }, this);
      });
    } catch (thrown) {
      console.error(thrown);
    } finally {
      //
    }
  },
  "initialize": function ()
  {
    try {
      if (this.model.has("create") && this.model.get("create") === true) {
        for (var key in this.model.attributes) {
          if (["create", "operacoes"].indexOf(key) === -1) {
            this.model.unset(key);
          }
        }
      }

      if (this.model.has("rolEvidencias")) {
        this.model.get("rolEvidencias").reset();
      } else {
        this.model.set("rolEvidencias", new Backbone.Collection);

        this.model.get("rolEvidencias").off("add").on("add", this.adicionarEvidencia, this);

        this.model.get("rolEvidencias").off("remove").on("remove", this.removerEvidencia, this);
      }

      if (this.model.has("rolComentarios")) {
        this.model.get("rolComentarios").reset();
      } else {
        var rolComentarios = Backbone.Collection.extend({
          "parse": function (response) {
            return response.model.comentarios;
          }
        });

        this.model.set("rolComentarios", new rolComentarios);

        this.model.get("rolComentarios").off("sync").on("sync", function (model_or_collection, response, options) {
          //
        }, this);

        this.model.get("rolComentarios").off("add").on("add", this.incluirComentario, this);
      }

      if (this.model.has("id")) {
        this.model.get("rolComentarios").url = adagio.environment.getEndpoint("checklists/" + this.model.get("id") + "/comentarios");
      }

      this.getJSON(adagio.environment.getEndpoint("prestadores"))
        .getJSON(adagio.environment.getRoot() + '/autocategorias')
        .getJSON(adagio.environment.getRoot() + '/subdistritos');

      if (this.model.has('dados') && this.model.get('dados').origem_uf) {
        this.getJSON(adagio.environment.getRoot() + '/subdistritos?uf=' + this.model.get("dados").origem_uf);
      }

      if (this.model.has('dados') && this.model.get('dados').destino_uf) {
        this.getJSON(adagio.environment.getRoot() + '/subdistritos?uf=' + this.model.get("dados").destino_uf);
      }

      if (this.model.has('dados') && this.model.get('dados').tipo) {
        this.getJSON(adagio.environment.getEndpoint("problemas/" + this.model.get('dados').tipo));
      }

      adagio.eventBus.off("checklist:create").on("checklist:create", this.create, this);

      adagio.eventBus.off("checklist:edit").on("checklist:edit", this.edit, this);

      this.load("web")
        .release();
    }
    catch (error) {
      console.error(error);
    }
  },
  "render": function ()
  {
    this.$el.html(this.template(this.model)).attr("class", this.className);

    this.$("#carregar-formulario-completo").trigger("click");

    return this;
  },
  "incluirPlaca": function incluirPlaca(event)
  {
    try {
      var $el = this.$("#incluirPlaca"),
        indice = this.$('[name^=placas]').length,
        portaPlaca = this.model.has("veiculos") && this.model.get("veiculos").at(indice) ? this.model.get("veiculos").at(indice).get("placa") : "",
        portaNumero = this.model.has("veiculos") && this.model.get("veiculos").at(indice) ? this.model.get("veiculos").at(indice).get("numero") : "",
        portaCategoria = this.model.has("veiculos") && this.model.get("veiculos").at(indice) ? this.model.get("veiculos").at(indice).get("categoria") : "",
        formulario = _.template(`<fieldset><div class="form-group">
      <label for="placas[<%= view.indice %>]" class="col-sm-3 control-label">Placa</label>
      <div class="col-sm-3"><input class="form-control" type="text" id="placas[<%= view.indice %>]" name="placas[<%= view.indice %>]" value="<%= view.portaPlaca %>"><p class="help-block">Placa Veículo</p></div>
      <div class="col-sm-3"><input class="form-control" type="text" name="numeros[<%= view.indice %>]" value="<%= view.portaNumero %>"><p class="help-block">Número Frota</p></div>
      <div class="col-sm-3">
      <select class="form-control autocategorias" name="categorias[<%= view.indice %>]">
      <option value="0">Selecionar...</option>
      <% view.autocategorias.each(function (vinculo) { %>
      <option value="<%= vinculo.get('id') %>"<% print (vinculo.get('id') == view.portaCategoria ? " selected" : "") %>><%= vinculo.get('autocategoria') %></option>
      <% }); %>
      </select>
      <p class="help-block">Categoria Veículo</p>
      </div>
      </div></fieldset>`,
      {"variable": "view"});

      $el.closest("fieldset")
        .before(formulario({
          "autocategorias": this.model.get('autocategoriasCol'),
          "indice": indice,
          "portaPlaca": portaPlaca,
          "portaNumero": portaNumero,
          "portaCategoria": portaCategoria
        }));
    }
    catch (thrown) {
      console.error(thrown);
    }
    finally {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      else {
        return this;
      }
    }
  },
  "alteraBotaoStatus": function alteraBotaoStatus()
  {
    var
      self = this,
      vars = {};

    if (self.model.has("create") && self.model.get("create") === true) {
      $("#mostra-status").parent(".btn-group").hide();

      return this;
    }

    vars.statuses = ['Pendente', 'Reprovado', '', 'Corrigido', '', 'Aprovado'];
    vars.colors = ['btn-default', 'btn-danger', '', 'btn-warning', '', 'btn-success'];
    vars.status = vars.statuses[self.model.get("status")];
    vars.color = " " + vars.colors[self.model.get("status")];

    self.$("#mostra-status").text(vars.status);
    self.$(".operacao-status").each(function () {
      var dropdownlet = self.$(this).hasClass("dropdown-toggle") ? " dropdown-toggle" : "";
      self.$(this).attr("class", "operacao-status btn btn-md" + vars.color + dropdownlet);
    });
  },
  "tratamentoStatus": function tratamentoStatus()
  {
    var
      self = this,
      vars = {};

    self.alteraBotaoStatus();

    $.ajax({
      "url": adagio.environment.getEndpoint('checklists/' + self.model.get('id') + '/statuses'),
      "method": 'head',
      "dataType": 'html',
    })
    .done(function () {
      console.info('Parabéns! Permissão para alteração de status do objeto encontrada.');

      self.$("#controle-status").removeAttr("disabled");
      self.$(".codigo-status").off().on("click", function (event) {
        event.preventDefault();

        vars.codigo = parseInt(self.$(event.currentTarget).data("codigo-status"));

        if (self.model.get('status') !== vars.codigo) {
          $.ajax({
            "url": adagio.environment.getEndpoint('checklists/' + self.model.get('id')),
            "method": 'patch',
            "dataType": 'json',
            "data": {"status": vars.codigo}
          })
          .done(function () {
            vars.destino = "!" + adagio.environment.getTenancy('checklists/' + self.model.get('id') + (vars.codigo === 0 ? '/edit' : ''));

            if (vars.destino !== location.hash.substr(1)) {
              adagio.eventBus.trigger("navigate", vars.destino, {"trigger": true});
            } else {
              self.collection.status = vars.codigo;
              self.alteraBotaoStatus();
            }
          });
        }

        return false;
      });
    })
    .fail(function () {
      self.$("#controle-status").attr("disabled", "disabled");
    });

    return false;
  },
  "preencherFormulario": function () {
    var
      _this = this,
      origem_uf = this.model.get("dados").origem_uf || null,
      destino_uf = this.model.get("dados").destino_uf  || null;

    if (origem_uf) {
      _this.carregarLocais({
        "data": this.model.get('subdistritos.' + origem_uf),
        "currentTarget": _this.$("[name='dados[origem_id]']"),
        "preventDefault": function () {
          //
        }
      });
    }

    if (destino_uf) {
      _this.carregarLocais({
        "data": this.model.get('subdistritos.' + destino_uf),
        "currentTarget": _this.$("[name='dados[destino_id]']"),
        "preventDefault": function () {
          //
        }
      });
    }

    this.model.get("veiculos").each(function () {
      _this.incluirPlaca();
    });

    for (var attribute in this.model.attributes) {
      if (attribute === "dados") {
        for (var deepAttribute in this.model.attributes[attribute]) {
          var field = "[name='dados[" + deepAttribute + "]']";

          if (this.$(field).length > 0) {
            this.$(field).val(this.model.attributes[attribute][deepAttribute]);
          }
        }
      }
      else {
        var field = "[name='" + attribute + "']";

        if (this.$(field).length > 0) {
          this.$(field).val(this.model.attributes[attribute]);
        }
      }
    }
  },
  "carregarLocais": function (event)
  {
    try {
      var
        _this = event.currentTarget,
        fragmento = '<option value="0">Selecionar...</option>';

      if (event.data.length === 0) {
        throw "vazio";
      }

      event.data.each(function (localidade) {
        fragmento += '<option value="' + localidade.get('codigo_subdistrito') + '">' + localidade.get('nome_distrito') + (localidade.get('nome_subdistrito') ? ' &#8212; ' + localidade.get('nome_subdistrito') : '') + '</option>';
      });

      _this.html(fragmento);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      event.preventDefault();
    }
  }
}