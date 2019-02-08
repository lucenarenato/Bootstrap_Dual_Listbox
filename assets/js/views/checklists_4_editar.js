{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-checklists-edit",
  "events": {
    "click #carregar-formulario-completo": "carregarFormulario",
    "click #incluirPlaca": "incluirPlaca",
    "click .checklist-set": "salvarChecklist",
    "change #inputVinculo": "mostrarCnpj",
    "change #inputTransportadora": "averiguarFrota",
    "click #adicionar-problema": "incluirOcorrencia",
    "click #incluirComentarioNoModelo": "incluirComentarioNoModelo",
    "click .averiguar-placa": "averiguarPlaca",
    "click #averiguar-cpf": "averiguarPessoa",
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
      var files = event.target.files
        , mimetypes = ["image/png", "image/jpeg", "image/gif", "image/bmp"];

      for (var i = 0, file; file = files[i]; i++) {
        if (mimetypes.indexOf(file.type) === -1) {
          //
        } else {
          var currentFile = new Backbone.Model({"__file": file});
          this.model.get("rolEvidencias").add(currentFile);
        }
      }
    },
  },
  "tipoPossuiOcorrencia": function (operacao, tipoOcorrencia) {
    tipoOcorrencia = parseInt(tipoOcorrencia);

    var attributeName = ["problemas.", operacao].join('')
      , response = null;

    if (this.model.has(attributeName)) {
      if (this.model.get(attributeName).where({"tipo_id": tipoOcorrencia}).length > 0) {
        response = this.model.get(attributeName).where({"tipo_id": tipoOcorrencia}).pop();
      }
    }

    return response;
  },
  "averiguarFrota": _.debounce(function (event) {
    try {
      var $currentTarget = this.$(event.currentTarget).parents("fieldset")
        , $campoBlock = $currentTarget.find(".help-block").first()
        , $campoFrota = this.$(event.currentTarget)
        , frota = $campoFrota.val()
        , operacao = $currentTarget.parents("form").find("#inputTipo").val()
        , vigencia = this.$(".form-control[name='data']").length && this.$(".form-control[name='data']").val() !== "" ? this.$(".form-control[name='data']").val()
            : (this.model.has("data") ? this.model.get("data")
              : (this.model.has("created_at") ? this.model.get("created_at").substr(0, 10)
                : null)
            );

      if (! frota) {
        $campoFrota.focus();
        return event;
      }

      $.ajax({
        "url": adagio.environment.getEndpoint("cartorial/buscadocvencidosfrota/" + frota + (vigencia ? "?vigencia=".concat(vigencia) : "")),
        "method": "get",
        "dataType": "json",
        "global": false,
        "context": this
      })
      .then(function (response) {
        var hashedUrl = response.model.url ? response.model.url.replace(/client\/v[0-9]+\//, '#!/') : ''
          , apolicesId = _.pluck(response.model.status_quo.todos, 'tipo');

        var ocorrenciaApolicesId = this.model.get('problemas.' + operacao)
          .chain()
          .filter(function (problema) {
            return _.indexOf(apolicesId, problema.get("tipo_id")) !== -1;
          })
          .map(function (element) {
            return element.get("id");
          })
          .tap(this.desmarcarOcorrenciaPorId.bind(this))
          .value();

        if (response.encontrado === false) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-error");
          $campoBlock.html("Não localizado");
        } else if (response.model.status_quo.vencimentos.length > 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-error");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.vencimentos.length + ' vencimentos</a>');

          _(response.dados).each(function (item) {
            var consultaItem = this.tipoPossuiOcorrencia(operacao, item.tipo)
              , dataVencimento = (new Date(item.vencimento).toISOString().slice(0, 10).split("-").reverse().join("/"));

            if (consultaItem !== null) {
              this.incluirOcorrenciaPorId({
                "id": consultaItem.get('id'),
                "titulo": consultaItem.get('titulo'),
                "nota": ("Vencido em " + dataVencimento)
              });
            }

            this.$("#area_alertas").append(`<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>` + item.titulo + `</strong> em vencimento para ` + dataVencimento + `.</div>`);
          }, this);
        } else if (response.model.status_quo.ausentes.length > 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-warning");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.ausentes.length + ' ausências</a>');
        } else if (response.model.status_quo.pendentes.length > 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-warning");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.pendentes.length + ' pendências</a>');
        } else {
          $currentTarget.find("div.form-group").attr("class", "form-group has-success");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Regular</a>');
        }
      });
    } catch (thrown) {
      console.error(thrown);
    } finally {
      event.preventDefault();
      event.stopPropagation();
    }
  }, 1000, false),
  "averiguarPessoa": _.debounce(function (event) {
    try {
      var $currentTarget = this.$(event.currentTarget).parents("fieldset")
        , $campoCpf = $currentTarget.find("[name='dados[cpf_motorista]']")
        , $campoNome = $currentTarget.find("[name='dados[nome_motorista]']")
        , $campoBlock = $currentTarget.find(".help-block").first()
        , $campoVinculo = $currentTarget.parents("form").find("#inputVinculo")
        , $campoTransportadora = $currentTarget.parents("form").find("#inputTransportadora")
        , operacao = $currentTarget.parents("form").find("#inputTipo").val()
        , parametro = $campoCpf.val();

      if (! parametro) {
        $campoCpf.focus();
        return event;
      }

      $.ajax({
        "url": adagio.environment.getEndpoint("cartorial/buscadocvencidoscpf/" + parametro),
        "method": "get",
        "dataType": "json",
        "global": false,
        "context": this
      })
      .done(function (response) {
        var hashedUrl = response.model.url ? response.model.url.replace(/client\/v[0-9]+\//, '#!/') : '';

        if (response.encontrado === false) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-error");
          $campoBlock.text("Não localizado");
        }

        if (response.nome_condutor.length === 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-error");
          $campoBlock.text("Não localizado");
        } else if (response.model.status_quo.vencimentos.length > 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-error");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.vencimentos.length + ' vencimentos</a>');

          _(response.dados).each(function (item) {
            var consultaItem = this.tipoPossuiOcorrencia(operacao, item.tipo)
              , dataVencimento = (new Date(item.vencimento).toISOString().slice(0, 10).split("-").reverse().join("/"));

            if (consultaItem !== null) {
              this.incluirOcorrenciaPorId({
                "id": consultaItem.get('id'),
                "titulo": consultaItem.get('titulo'),
                "nota": ("Vencido em " + dataVencimento)
              });
            }

            this.$("#area_alertas").append(`<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>` + item.titulo + `</strong> em vencimento para ` + dataVencimento + `.</div>`);
          }, this);
        } else if (response.model.status_quo.ausentes.length > 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-warning");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.ausentes.length + ' ausências</a>');
        } else if (response.model.status_quo.pendentes.length > 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-warning");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.pendentes.length + ' pendências</a>');
        } else {
          $campoCpf.val(response.cpf).parents(".form-group").attr("class", "form-group has-success");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Regular</a>');
        }

        if (response.encontrado) {
          $campoNome.val(response.nome_condutor);
          $campoVinculo.val(response.vinculo);

          if ($campoTransportadora.val() == 0)
              $campoTransportadora.val(response.frota).trigger("change");
        }

        $campoCpf.val(response.cpf);
      });
    } catch (thrown) {
      console.error(thrown);
    } finally {
      event.preventDefault();
      event.stopPropagation();
    }
  }, 1000, true),
  "averiguarPlaca": _.debounce(function (event) {
    try {
      var $currentTarget = this.$(event.currentTarget).parents("fieldset")
        , $campoPlaca = $currentTarget.find("[id^=placas]").first()
        , $campoFrota = $currentTarget.find("[name^=numeros]").first()
        , $campoCarro = $currentTarget.find("[name^=categorias]").first()
        , $campoBlock = $currentTarget.find(".help-block").first()
        , operacao = $currentTarget.parents("form").find("#inputTipo").val()
        , placa = $campoPlaca.val();

      if (! placa) {
        $campoPlaca.focus();
        return event;
      }

      $.ajax({
        "url": adagio.environment.getEndpoint("cartorial/buscadocvencidosplaca/" + placa),
        "method": "get",
        "dataType": "json",
        "global": false,
        "context": this
      })
      .then(function (response) {
        var hashedUrl = response.model.url ? response.model.url.replace(/client\/v[0-9]+\//, '#!/') : '';

        if (response.encontrado === false) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-error");
          $campoBlock.html("Não localizado");
        } else if (response.model.status_quo.vencimentos.length > 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-error");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.vencimentos.length + ' vencimentos</a>');

          _(response.dados).each(function (item) {
            var consultaItem = this.tipoPossuiOcorrencia(operacao, item.tipo)
              , dataVencimento = (new Date(item.vencimento).toISOString().slice(0, 10).split("-").reverse().join("/"));

            if (consultaItem !== null) {
              this.incluirOcorrenciaPorId({
                "id": consultaItem.get('id'),
                "titulo": consultaItem.get('titulo'),
                "nota": ("Vencido em " + dataVencimento)
              });
            }

            this.$("#area_alertas").append(`<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>` + item.titulo + `</strong> em vencimento para ` + dataVencimento + `.</div>`);
          }, this);
        } else if (response.model.status_quo.ausentes.length > 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-warning");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.ausentes.length + ' ausências</a>');
        } else if (response.model.status_quo.pendentes.length > 0) {
          $currentTarget.find("div.form-group").attr("class", "form-group has-warning");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.pendentes.length + ' pendências</a>');
        } else {
          $currentTarget.find("div.form-group").attr("class", "form-group has-success");
          $campoBlock.html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Regular</a>');
        }

        $campoPlaca.val(response.placa);
        $campoFrota.val(response.veiculo_frota);
        $campoCarro.val(response.carro);

        if (response.carro === 0) {
          //
        } else {
          $campoCarro.val(response.carro);

          if (parseInt($campoCarro.val()) !== response.carro) {
            $campoCarro.val(0);
          }
        }
      });
    } catch (thrown) {
      console.error(thrown);
    } finally {
      event.preventDefault();
      event.stopPropagation();
    }
  }, 300, true),
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
    var reader = new FileReader()
      , _this = this;

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
      if (this.$("#ocorrenciasProblema").val() == 0) {
        throw "Nada selecionado.";
      }

      if (this.$("#ocorrenciasNota").val() == "") {
        var notification = new NotificationFx({
          "message": '<span class="icon pe-7s-light"></span><p>Informe algum detalhe ao item reprovado.</p>',
          "layout": 'bar',
          "effect": 'slidetop',
          "type": 'info',
          "position": 'topright'
        });
        notification.show();
        this.$("#ocorrenciasNota").focus();
        throw "Nada selecionado.";
      }

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
      '<div class="media-left media-top"><a href="#"><img class="media-object" src="' + model.get("avatar") + '" alt="Avatar"></a></div>' +
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
  "desmarcarOcorrenciaPorId": function (ocorrenciaId) {
    try {
      if (_.isArray(ocorrenciaId)) {
        for (var index in ocorrenciaId) {
          this.desmarcarOcorrenciaPorId(ocorrenciaId[index]);
        }
        return ocorrenciaId;
      }

      var atributo = ["input[name='listagem[", ocorrenciaId, "]']"].join('')
        , $ocorrencia = this.$(atributo);

      if ($ocorrencia.length) {
        $ocorrencia.prop("checked", false);
        $ocorrencia.parents("tr").remove();
      }
      return ocorrenciaId;
    } catch (thrown) {
      console.error(thrown);
    }
  },
  "incluirOcorrenciaPorId": function (options) {
    try {
      var ocorrenciaId = options.id
        , ocorrenciaTitulo = options.titulo
        , ocorrenciaNota = options.nota
        , linha = '<tr><th scope="row"><div><label><input checked="checked" type="checkbox" name="listagem[' + ocorrenciaId + ']" value="' + ocorrenciaId + '"> <span class="text">' + ocorrenciaTitulo + '</span></label></div></th><td><input type="text" class="form-control" name="notacao[' + ocorrenciaId + ']" value="' + ocorrenciaNota + '"></td></tr>';

      if (this.$(["[name='listagem[", options.id, "]']"].join('')).length === 0)
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
    var position = position || 0
      , collection = (collection === undefined) ? this.model.get("rolEvidencias").clone() : collection
      , url = this.model.has('id') ? adagio.environment.getEndpoint(['checklists', this.model.get('id'), 'fotos'].join('/')) : [this.model.get('url'), 'fotos'].join('/')
      , queue = new Relicarium.Queue();

    var uploadForm = function () {
      return {
        "method": "post",
        "timeout": 0,
        "processData": false,
        "contentType": false,
        "url": url,
        "data": new FormData(),
        "context": this,
        "global": true
      };
    };

    collection.each(function (element, index, list) {
      queue.job(function (defer) {
        var form = uploadForm();
        form.data.append("foto", element.get("__file"));
        form.data.append("nota", element.get("legenda"));

        $.ajax(form).then(function () {
          $("#anexacao_" + element.cid).remove();
          defer.resolve();
        }, defer.reject);
      });
    }, this);

    if (collection.length == 0) {
      return $.Deferred().resolve();
    }

    return queue.dispatch();
  },
  "filaAnexos_xxx": function (position, collection) {
    var recursively = this.filaAnexos
      , _this = this;

    return new Promise(function (resolve, reject) {
      var key = position || 0
        , list = (collection === undefined) ? _this.model.get("rolEvidencias").clone() : collection
        , url = _this.model.has('id') ? adagio.environment.getEndpoint('checklists/' + _this.model.get('id') + '/fotos') : _this.model.get('url') + '/fotos';
/*
      // Promise
      if (list.length === 0) {
        resolve();
      }
      // Deferred
      else {
*/
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

        $.ajax(form)
        .then(function () {
          if (list.at(key)) {
            _this.$("#anexacao_" + list.at(key).cid).remove();
          } else {
            console.error("Undefined item on list", key);
          }

          console.log("Sent...", key);

          if (key + 1 < list.length) {
            console.log("Sending next...", (key + 1));
            recursively.call(_this, key + 1, list);
          } else {
            _this.model.get("rolEvidencias").reset();
            resolve();
          }
        /*
        }, function (e) {
          return reject(e);
        */
        }, reject);
      //}
    });
  },
  "verificarDetalhesVazios": function ()
  {
    var response = true;

    _.each(this.$("[name^=listagem]:checked"), function (element, index, list) {
      var $campo = this.$(element).parents("tr").find("input.form-control:text")
        , valorCampo = $campo.val().toString().trim();

      if (_.isEmpty(valorCampo)) {
        $campo.val(valorCampo).parents("tr").attr("class", "warning");
        response = false;
      } else {
        $campo.val(valorCampo).parents("tr").attr("class", "");
      }
    }, this);

    return response;
  },
  "coletarValores": function (jqXHR, settings) {
    var _this = this;

    if (this.verificarDetalhesVazios() === false) {
      var notification = new NotificationFx({
        "message": '<span class="icon pe-7s-attention"></span><p>Item reprovado sem detalhe especificado.</p>',
        "layout": 'bar',
        "effect": 'slidetop',
        "type": 'warning',
        "position": 'topright'
      });
      notification.show();
      return false;
    }

    this.$('[id^="legenda_"]').each(function (index, element) {
      try {
        var cid = element.id.split('_').pop()
          , desc = element.value;

        _this.model.get("rolEvidencias").get(cid).set("legenda", desc);
      } catch (excepts) {
        console.error(excepts);
      }
    });
  },
  "salvarChecklist": _.debounce(function (event) {
    try {
      event.preventDefault();
      event.stopPropagation();

      var _this = this
        , forms = this.$(".input-on-checklists").serialize()
        , retrieveId = null
        , retrieveUrl = null;

      $.ajax({
        "url": adagio.environment.getEndpoint("checklists"),
        "method": "post",
        "data": forms,
        "context": this,
        "beforeSend": this.coletarValores.bind(this),
      })
      .then(function (data, textStatus, jqXHR) {
        if (jqXHR.getResponseHeader("Location")) {
          retrieveUrl = jqXHR.getResponseHeader("Location");
          this.model.set("url", retrieveUrl);

          if (retrieveUrl.match(/[0-9]+$/)) {
            retrieveId = retrieveUrl.match(/[0-9]+$/).pop();
            this.model.set("id", parseInt(retrieveId));
          }
        }

        if (data.error) {
          for (var n in data.errors) {
            this.$('[name="' + n + '"]').closest(".form-group").attr("class", "form-group has-error");
            for (o in data.errors[n]) {
              this.$('[name="' + n + '"]').closest("form").prepend('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + data.errors[n][o] + '</div>');
            }
          }
        }

        return jqXHR;
      }, function (jqXHR, textStatus, errorThrown) {
        console.error(textStatus);
        return jqXHR;
      })
      .then(function (data, textStatus, jqXHR) {
        if ((this.model.has("id") && this.model.get("id") > 0) || (this.model.has("url") && this.model.get("url").length > 0)) {
          return this.filaAnexos(0)
                    .then(function (data, textStatus, jqXHR) {
                      window.location.hash = "#!/" + retrieveUrl.split('/').slice(-4).join('/');
                      // _this.model.get("rolEvidencias").reset();
                      // return _this.preencherEvidencias();
                      return null;
                    }, function (jqXHR, textStatus, errorThrown) {
                      return jqXHR;
                    });
        } else {
          return jqXHR;
        }
      }, function (jqXHR, textStatus, errorThrown) {
        console.error(textStatus);
        return jqXHR;
      });
    } catch (thrown) {
      console.error(thrown);
    } finally {
      //
    }
  }, 1000),
  "carregarFormulario": function (event) {
    event.preventDefault();
    event.stopPropagation();

    var $currentTarget = this.$("#inputTipo");

    if ($currentTarget.val() === "0") {
      this.$("#checklist-form").empty();
      this.$("#painelOcorrencias").hide();
      this.$("#painelEvidencias").hide();
      this.$("#painelMensagens").hide();
      this.$(".checklist-set").hide();
      this.alteraBotaoStatus();

      return event;
    }

    this.$(".checklist-set").show();

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
        } else {
          adagio.eventBus.trigger("checklist:edit", [$currentTarget.val()]);
        }
      });

    return event;
  },
  "template": _.template(`
  <div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-sm-4 text-right">
    <p class="lead operacao-autor"></p>
    </div><!-- /.col-xs-* -->
    <div class="col-xs-12 col-sm-4">
      <p class="lead"><small class="text-muted">criado por</small><br /><i class="fa fa-user"></i> <span id="nome-autor-registro"></span></p>
    </div><!-- /.col-xs-* -->
    <div class="col-xs-12 col-sm-4 text-right">
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
  </div><!-- /row -->
  <div class="row hidden-lg">&nbsp;</div>
  <div class="row">
    <div class="col-sm-12">
      <div class="adagio-notification"></div>
      <div id="area_alertas"></div>
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
            <div class="panel-heading">Feedbacks</div>
            <div class="row"><div class="col-xs-12"><textarea id="conteudoComentario" class="form-control" style="border-radius:0;"></textarea></div></div>
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
      })
      .off("changeDate")
      .on("changeDate", function (e) {
        _this.$('#inputTransportadora').trigger('change');
      });
    this.$(".ufs").off().on("change", function (event, extra) {
      var nome = this.id.split("_")
        , valor = this.value
        , alvo = ['#', nome[0], '_', 'id'].join('');

      if (valor !== "0") {
        _this.getJSON(adagio.environment.getRoot() + '/subdistritos?uf=' + valor).then(function (response) {
          _this.carregarLocais({
            "subdistrito": (extra ? extra : null),
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
        } else {
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
    console.log(this.model)

    this.comum(operacaoTipo);
    this.preencherFormulario();
    this.$("#painelMensagens").show();
    this.preencherEvidencias()
        .always(this.tratamentoStatus.bind(this))
        .always(function () {
          this.model.get("rolComentarios").fetch();
        });

    this.$('#inputVinculo').trigger('change');  // RENATO: Mudado a ordem de uma linha. Depois de ter criado um novo checklist, pode-se editar e visualizar tal.
    this.$('#inputTransportadora').trigger('change');
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
      return $.ajax({
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
          this.$("#receptaculoDeEvidencias").append('<tr><td><a href="#" class="a-album"' + datas + '>' + item.nome_arquivo + '</a></td>' + '<td>' + (item.nota_arquivo || 'Sem legenda') + '</td></tr>');
        }, this);
      });
    } catch (thrown) {
      console.error(thrown);
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
        this.model.get("rolEvidencias").off("add").on("add", this.adicionarEvidencia.bind(this), this);
        this.model.get("rolEvidencias").off("remove").on("remove", this.removerEvidencia.bind(this), this);
        this.model.get("rolEvidencias").off("reset").on("reset", function (collection, options) {
          console.info("Reset done for rolEvidencias");
        }, this);
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
        this.model.get("rolComentarios").off("add").on("add", this.incluirComentario, this);
        this.model.get("rolComentarios").off("sync").on("sync", function (model_or_collection, response, options) {
          //
        }, this);
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
        .getScript("/assets/js/relicarium.js", "js")
        .release();
    }
    catch (error) {
      console.error(error);
    }
  },
  "render": function () {
    this.$el.html(this.template(this.model)).attr("class", this.className);

    function checkPendingRequest() {
      if ($.active > 0) {
        window.setTimeout(checkPendingRequest, 500);
      } else {
        this.$("#carregar-formulario-completo").trigger("click");
      }
    };

    checkPendingRequest.call(this);

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
      <div class="col-sm-3"><div class="input-group">
      <input class="form-control" type="text" id="placas[<%= view.indice %>]" name="placas[<%= view.indice %>]" value="<%= view.portaPlaca %>">
      <span class="input-group-btn"><button class="btn btn-default averiguar-placa" type="button"><i class="fa fa-fw fa-search"></i></button></span>
      </div><p class="help-block">Placa Veículo</p></div>
      <!--
      <div class="col-sm-3"><input class="form-control" type="text" id="placas[<%= view.indice %>]" name="placas[<%= view.indice %>]" value="<%= view.portaPlaca %>"><p class="help-block">Placa Veículo</p></div>
      -->
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
    var self = this
      , vars = {};

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
    var self = this
      , vars = {};

    self.alteraBotaoStatus();

    if (this.model.has("autorNome")) {
      self.$("#nome-autor-registro").text(this.model.get("autorNome"));
    }

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
            "context": self,
            "data": {"status": vars.codigo}
          })
          .done(function () {
            vars.destino = "!" + adagio.environment.getTenancy('checklists/' + self.model.get('id'));

            if (vars.destino !== location.hash.substr(1)) {
              adagio.eventBus.trigger("navigate", vars.destino, {"trigger": true});
            } else {
              self.model.set("status", vars.codigo);
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
    var _this = this
      , origem_uf = this.model.get("dados").origem_uf || null
      , destino_uf = this.model.get("dados").destino_uf  || null;

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
      var _this = event.currentTarget
        , fragmento = '<option value="0">Selecionar...</option>';

      if (event.data.length === 0) {
        throw "vazio";
      }

      event.data.each(function (localidade) {
        var selecionado = event.subdistrito && localidade.get('codigo_subdistrito') == event.subdistrito ? " selected" : "";
        fragmento += '<option value="' + localidade.get('codigo_subdistrito') + '"' + selecionado + '>' + localidade.get('nome_distrito') + (localidade.get('nome_subdistrito') ? ' &#8212; ' + localidade.get('nome_subdistrito') : '') + '</option>';
      });

      _this.html(fragmento);
    } catch (error) {
      console.error(error);
    } finally {
      event.preventDefault();
    }
  },
  "followLocation": function () {
    return false;

    // It should have the control
    // console.log("auto-followLocation", (this.model.has('create') && this.model.get('create') === true));
    // return (this.model.has('create') && this.model.get('create') === true);
  },
  "notification": window.handling.notification
}
/*
    app.queue.job(function (defer) {
      var snackbar = $("#snackbar");
      snackbar.attr("class", "show alert alert-".concat(theme || "noir"));
      snackbar.text(message || "");
      setTimeout(function () {
        snackbar.attr("class", "");
        defer.resolve();
      }, 3000);
    }).dispatch();
*/