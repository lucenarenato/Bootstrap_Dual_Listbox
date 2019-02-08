{
    "tagName": "div",
    "id": "adagio-home",
    "className": "adagio-cartorial-ver",
    "remover_carga": function (event) {
        event.preventDefault();
        event.stopPropagation();
        $.ajax({
            "method": "delete",
            "context": this,
            "url": adagio.environment.getEndpoint("cartorial/" + this.model.get("dados").id_cartorial_dado + "/container/" + this.$(event.currentTarget).val())
        })
        .done(function (res) {
            this.$(event.currentTarget).parent("td").parent("tr").remove();
        })
        .fail(function (res) {
            //
        });
        return false;
    },
    "carregar_container": function () {
        if (this.model.get("dados").pasta_id !== 4) {
            return false;
        }
        else {
            this.$("#lista_cadastros").show();
        }
        return $
        .ajax({
            "method": "get",
            "context": this,
            "url": adagio.environment.getEndpoint("cartorial/" + this.model.get("dados").id_cartorial_dado + "/container")
        })
        .done(function (data, textStatus, jqXHR) {
            if (data.length === 0) {
                this.$("#container-table").html('<tr><td colspan="6"><div class="well well-sm">Vazio</div></td></tr>');
            }
            else {
                this.$("#container-table").empty();
                _.each(data, function (item) {
                    this.$("#container-table").append('<tr><td>' + item.id + '</td><td>' + item.identificacao + '</td><td>' + item.created_at + '</td><td class="text-right"><a href="#!' + adagio.environment.getTenancy("cartorial/" + item.id) + '" class="btn btn-xs btn-default"><i class="fa fa-fw fa-list"></i></a> <button title="Reprovar documento" type="button" class="btn btn-xs btn-default desrelacionar_com" value="' + item.id + '"><i class="fa fa-fw fa-times"></i></button></td></tr>');
                }, this);
                this.$(".desrelacionar_com").off("click").on("click", this.remover_carga.bind(this));
            }
            return jqXHR;
        })
        .fail(function (res) {
            //
        });
    },
    "events": {
        "click #relacionar_com": function (event) {
            event.preventDefault();
            event.stopPropagation();
            $.ajax({
                "data": {
                    "material": this.$("#a_ser_relacionado").val()
                },
                "method": "post",
                "context": this,
                "url": adagio.environment.getEndpoint("cartorial/" + this.model.get("dados").id_cartorial_dado + "/container")
            })
            .done(function (res) {
                this.$("#a_ser_relacionado").val("");
                this.carregar_container();
            })
            .fail(function (res) {
                //
            });
            return false;
        },
        "keyup #celular": function () {
        var cel = this.$("#celular").val().length;
        if (cel === 1) {
            this.$("#celular").val("("+this.$("#celular").val());
        }
        if (cel === 3) {
            this.$("#celular").val(this.$("#celular").val()+")");
        }
        if (cel === 9) {
            this.$("#celular").val(this.$("#celular").val()+"-");
        }
        },
        "keyup #box_veiculo #busca_regiao_leiteira": function (event) {
            if (event.which == 13 || event.which == 32 && $("#box_veiculo #busca_regiao_leiteira").val().length >= 3) {
                $.ajax({
                    url : adagio.environment.getEndpoint()+"/cartorial/regiaoleiteiraget/"+$("#box_veiculo #busca_regiao_leiteira").val()
                }).
                done(function (retorno) {
                    var option = "";
                    for (var i = 0; i < retorno.qtdados; i++) {
                        option += '<option value="'+ retorno.dados[i].codigo_subdistrito +'" class="dinamico" id="d'+ i +'">'+ retorno.dados[i].nome_distrito +'</option>';
                    }
                    $("#box_veiculo #regiao_leiteira_id optgroup .oculto").css("display", "none");
                    $("#box_veiculo #regiao_leiteira_id optgroup .dinamico").remove();
                    $("#box_veiculo #regiao_leiteira_id optgroup").append(option);
                    $("#box_veiculo #regiao_leiteira_id optgroup #d0").attr("selected", "selected");
                });
            }
            if (event.which == 8 && $("#box_veiculo #busca_regiao_leiteira").val().length < 3) {
                $("#box_veiculo #regiao_leiteira_id optgroup .dinamico").remove();
                $("#box_veiculo #regiao_leiteira_id optgroup .oculto").css("display", "block");
            }
        },
        "change #box_veiculo #tipo": function () {
            if ($("#box_veiculo #tipo").val() == "4") {
                $("#box_veiculo #cx_tanque").css("display", "none");
            }
            else {
                $("#box_veiculo #cx_tanque").css("display", "block");
            }
        },
        "keyup #box_motorista #busca_regiao_leiteira": function (event) {
            if (event.which == 13 || event.which == 32 && $("#box_motorista #busca_regiao_leiteira").val().length >= 3) {
                $.ajax({
                    url : adagio.environment.getEndpoint()+"/cartorial/regiaoleiteiraget/"+$("#box_motorista #busca_regiao_leiteira").val()
                }).
                done(function (retorno) {
                    var option = "";
                    for (var i = 0; i < retorno.qtdados; i++) {
                        option += '<option value="'+ retorno.dados[i].codigo_subdistrito +'" class="dinamico" id="d'+ i +'">'+ retorno.dados[i].nome_distrito +'</option>';
                    }
                    $("#box_motorista #regiao_leiteira_id optgroup .oculto").css("display", "none");
                    $("#box_motorista #regiao_leiteira_id optgroup .dinamico").remove();
                    $("#box_motorista #regiao_leiteira_id optgroup").append(option);
                    $("#box_motorista #regiao_leiteira_id optgroup #d0").attr("selected", "selected");
                });
            }
            if (event.which == 8 && $("#box_motorista #busca_regiao_leiteira").val().length < 3) {
                $("#box_motorista #regiao_leiteira_id optgroup .dinamico").remove();
                $("#box_motorista #regiao_leiteira_id optgroup .oculto").css("display", "block");
            }
        },
        "change #box_motorista #cpf_condutor": function () {
            function validarCPF(cpf) {
                cpf = cpf.replace(/[^\d]+/g,'');
                if (cpf == '') return false;
                // Elimina CPFs invalidos conhecidos
                if (
                    cpf.length != 11 ||
                    cpf == "00000000000" ||
                    cpf == "11111111111" ||
                    cpf == "22222222222" ||
                    cpf == "33333333333" ||
                    cpf == "44444444444" ||
                    cpf == "55555555555" ||
                    cpf == "66666666666" ||
                    cpf == "77777777777" ||
                    cpf == "88888888888" ||
                    cpf == "99999999999"
                )
                    return false;
                    // Valida 1o digito
                    add = 0;
                    for (i=0; i < 9; i ++)
                            add += parseInt(cpf.charAt(i)) * (10 - i);
                            rev = 11 - (add % 11);
                            if (rev == 10 || rev == 11)
                                    rev = 0;
                            if (rev != parseInt(cpf.charAt(9)))
                                    return false;
                    // Valida 2o digito
                    add = 0;
                    for (i = 0; i < 10; i ++)
                            add += parseInt(cpf.charAt(i)) * (11 - i);
                    rev = 11 - (add % 11);
                    if (rev == 10 || rev == 11)
                            rev = 0;
                    if (rev != parseInt(cpf.charAt(10)))
                            return false;
                    return true;
            }

            if(validarCPF($('#box_motorista #cpf_condutor').val()) == false){
                $("#box_motorista #cpf_condutor").css("border-color", "#FF0000");
                alert("Coloque um CPF válido!");
                $('#box_motorista #cpf_condutor').val("");
            }
        },
        "click #box_motorista #cpf_condutor": function () {
            this.$('#box_motorista #cpf_condutor').css('border-color', '');
        },
        "click #lista_documentos .col1 button": function (event) {
            $.ajax({
                url: adagio.environment.getEndpoint()+"/cartorialDoc/create",
                method: "GET",
                data: {
                    id_cartorial_dado: this.model.get('dados').id_cartorial_dado,
                    titulo: this.$(event.currentTarget).val()
                }
            }).
            done(function (retorno) {
                $('#modalDoc').html(retorno);
                $("#modal_documento").modal();
                $(".date").on("show", function () {
                    $('div[class^="datepicker-"]').find("table").removeClass("table-condensed");
                });
            });
        },
        "click .col6 .ativarfoto": function ativarFoto(event) {
            var
                id = this.model.get('dados').id_cartorial_dado,
                $currentTarget = this.$(event.currentTarget),
                documentoTipo = $currentTarget.data('documentoTipo'),
                resource = [adagio.environment.getEndpoint("cartorialDoc/ativarfoto"), id].join('/'),
                submeter = confirm("Deseja fazer isso realmente?"),
                self = this;
            if (submeter === true) {
                $.ajax({
                    url: resource,
                    method: "PATCH",
                    data: {"documento_tipo": documentoTipo}
                }).done(function (retorno) {
                    self.route.set({
                        "uri": [location.hash.slice(1), '?_=', _.now()].join("")
                    });
                });
            }
            event.preventDefault();
            event.stopPropagation();
        },
        "click #inaplicar_documento": _.debounce(function (event) {
            var
                documento = this.$("#id_cartorial_dado").val(),
                tipo = this.$("#titulo").val(),
                submeter = confirm("Deseja fazer isso realmente?"),
                self = this;
            if (submeter === true) {
                $.ajax({
                    "url": adagio.environment.getEndpoint("cartorialDoc"),
                    "method": "POST",
                    "context": this,
                    "data": {
                        'documento': documento,
                        'tipo': tipo,
                        'desativar': 1
                    }
                }).
                done(function (resposta) {
                    this.$("#modal_documento").one('hidden.bs.modal', function (e) {
                        self.route.set({"uri": [location.hash.slice(1), '?_=', _.now()].join("")});
                    });
                    this.$("#modal_documento").modal('hide');
                });
            }
            return evento;
        }, 300, true),
        "click #salvar_transportadora": _.debounce(function (event) {
            var dados = this.$('#form_transportadora').serialize();
            $.ajax({
                "context": this,
                "url": adagio.environment.getEndpoint("cartorial/" + this.model.get('dados').id_cartorial_dado),
                "method": "put",
                "data": dados
            })
            .done(function (retorno) {
                alert("Dados atualizados.");
            })
            .fail(function (retorno) {
                alert("Um erro ocorreu!");
            });
        }, 300, true),
        "click #salvar_documento": _.debounce(function (event) {
            var dados = this.$('#form_documento').serialize();
            $.ajax({
                "context": this,
                "url": adagio.environment.getEndpoint("cartorial/" + this.model.get('dados').id_cartorial_dado),
                "method": "put",
                "data": dados
            })
            .done(function (retorno) {
                alert("Dados atualizados.");
            })
            .fail(function (retorno) {
                alert("Um erro ocorreu!");
            });
        }, 300, true),
        "click #salvar_motorista": function() {
            var dados = this.$('#box_motorista').serialize();
            $.ajax({
                "context": this,
                "url": adagio.environment.getEndpoint("cartorial/") + this.model.get('dados').id_cartorial_dado,
                "method": "put",
                "data": dados
            })
            .done(function (retorno) {
                alert("Dados atualizados.");
            })
            .fail(function (retorno) {
                alert("Um erro ocorreu!");
            });
        },
        "click #salvar_veiculo" : function() {
            var dados = this.$('#box_veiculo').serialize();
            $.ajax({
                "context": this,
                "url": adagio.environment.getEndpoint("cartorial/") + this.model.get('dados').id_cartorial_dado,
                "method": "put",
                "data": dados
            })
            .done(function (retorno) {
                alert("Dados atualizados.");
            })
            .fail(function (retorno) {
                alert("Um erro ocorreu!");
            });
        },
        "click .open_modal_foto": function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.currentTarget.value === "string" && event.currentTarget.value.length > 0) {
                window.open("/storage/" + event.currentTarget.value);
            }
            return event;
        },
        "click .open_modal_foto_edicao": function (event) {
            event.preventDefault();
            event.stopPropagation();
            var $currentTarget = this.$(event.currentTarget);
            if ($currentTarget.val() == "") {
                $currentTarget.val(0);
                console.info({
                    "id_cartorial_dado": this.model.get('dados').id_cartorial_dado,
                    "tipo": $currentTarget.data("documentoTipo")
                });
            }
            $.ajax({
                "context": this,
                "url": adagio.environment.getEndpoint("cartorialDoc/" + $currentTarget.val()),
                "method": "GET",
                "data": {
                    "id_cartorial_dado": this.model.get('dados').id_cartorial_dado,
                    "tipo": $currentTarget.data("documentoTipo")
                }
            }).
            done(function (retorno) {
                this.$('#modalDoc').html(retorno);
                this.$("#modal_documento").modal();
            });
            return event;
        },
        "click .array-op": function (event) {
            event.preventDefault();
            event.stopPropagation();
            var
                $currentTarget = this.$(event.currentTarget),
                datas = $currentTarget.data(),
                self = this,
                reload = function () {
                    return $.ajax({
                        "global": true,
                        "context": self,
                        "url": [adagio.environment.getEndpoint("cartorialDoc"), datas.hash].join('/'),
                        "method": "GET",
                        "data": {
                            "id_cartorial_dado": self.model.get('dados').id_cartorial_dado,
                            "tipo": $currentTarget.data('tipo')
                        }
                    }).
                    done(function (response) {
                        self.$(".modal-content").replaceWith($(response).find(".modal-content").get(0));
                        self.$("#modal_documento").off('hidden.bs.modal').one('hidden.bs.modal', function (e) {
                            self.route.set({"uri": [location.hash.slice(1), '?_=', _.now()].join("")});
                        });
                    });
                };
            $.ajax({
                "global": true,
                "context": this,
                "url": [adagio.environment.getEndpoint("cartorialDoc"), datas.hash].join('/'),
                "method": "PUT",
                "data": datas
            }).
            then(function (data, textStatus, jqXHR) {
                reload();
            });
        },
        "click #editar_documento": function () {
            var
                titulo = this.$("#modal_documento #titulo").val(),
                vencimento = this.$("#modal_documento #vencimento").val(),
                descricao = this.$("#modal_documento #descricao").val(),
                idarquivo = this.$("#modal_documento #id_arquivo").val(),
                self = this;
            if (titulo == "" || vencimento == "" || idarquivo == "") {
                alert("Os campos: Titulo e Descrição devem ser preenchidos.");
                return false;
            }
            $.ajax({
                "url": adagio.environment.getEndpoint("cartorialDoc/") + this.$('#id_arquivo').val(),
                "method": "PUT",
                "data": {
                    'titulo': titulo,
                    'vencimento': vencimento,
                    'descricao': descricao,
                    'idarquivo': idarquivo
                },
                "context": this
            }).then(function (retorno) {
                if (retorno == "true") {
                    this.$("#modal_documento").one('hidden.bs.modal', function(e) {
                        self.route.set({"uri": [location.hash.slice(1), '?_=', _.now()].join("")});
                    });
                    this.$("#modal_documento").modal('hide');
                }
            });
        },
        "click #adicionar_documento": _.debounce(function (event) {
            var
                titulo = $("#modal_documento #titulo").val(),
                vencimento = $("#modal_documento #vencimento").val(),
                documento = $("#modal_documento #documento").val(),
                idcartorialdado = $("#modal_documento #id_cartorial_dado").val(),
                self = this;

            if (titulo == 1 || titulo == 2 || titulo == 3 || titulo == 4 || titulo == 5) {
                if (titulo == "" || vencimento == "" || documento == "" || idcartorialdado == "") {
                    alert("Os campos: Titulo, Vencimento e Arquivo devem ser preenchidos.");
                    return false;
                }
            }
            if (titulo == "" || documento == "" || idcartorialdado == "") {
                alert("Os campos: Titulo e Arquivo devem ser preenchidos.");
                return false;
            }
            var fd = new FormData(document.getElementById("car_documentos"));
            $.ajax({
                "url": adagio.environment.getEndpoint("cartorialDoc"),
                "type": "POST",
                "context": this,
                "data": fd,
                "processData": false,
                "contentType": false,
                "global": true,
                "beforeSend": function (jqXHR, settings) {
                    $("#adicionar_documento").prop("disabled", true);
                    $("#inaplicar_documento").prop("disabled", true);
                }
            })
            .done(function (data, textStatus, jqXHR) {
                if (data.error === false) {
                    this.$("#modal_documento").one('hidden.bs.modal', function (e) {
                        self.route.set({"uri": [location.hash.slice(1), '?_=', _.now()].join("")});
                    });
                    this.$("#modal_documento").modal('hide');
                } else {
                    $("#adicionar_documento").prop("disabled", false);
                    $("#inaplicar_documento").prop("disabled", false);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                $("#adicionar_documento").prop("disabled", false);
                $("#inaplicar_documento").prop("disabled", false);

                var notification = new NotificationFx({
                    "message": '<span class="icon pe-7s-help2"></span><p>' + jqXHR.statusText + ' (' + jqXHR.status + ')'  + '</p>',
                    "layout": 'bar',
                    "effect": 'slidetop',
                    "type": 'danger',
                    "position": 'topright'
                });

                notification.show();
            });
        }, 300, true)
    },
    "listarTransportadoras": function ()
    {
      this.$('.transportadora').html('<option value="0">TERCEIRO</option>');

      this.$('.form-grupo').html('<option value="0">Selecionar...</option>');

      this.$('.form-planta').html('<option value="0">Selecionar...</option>');

      this.model.get("gruposKit").each(function (grupo) {
        var selecionado = this.model.get('dados').grupos.indexOf(grupo.get('id')) !== -1 ? " selected" : "";

        this.$('.form-grupo').append('<option' + selecionado + ' value=' + grupo.get('id') + '>' + grupo.get('nome').toString().toUpperCase() + '</option>');
      }, this);

      this.model.get("regioesKit").each(function (grupo) {
        var selecionado = parseInt(this.model.get("dados").regiao_leiteira_id) === grupo.get('id')
          ? " selected"
          : "";

        this.$('.form-planta').append('<option' + selecionado + ' value=' + grupo.get('id') + '>' + grupo.get('nome').toString().toUpperCase() + '</option>');
      }, this);

      this.model.get("prestadoresCol").each(function (grupo) {
        var selecionado = parseInt(this.model.get("dados").proprietario_tanque_id) === grupo.get('id')
          ? " selected"
          : "";

        this.$('.transportadora').append('<option' + selecionado + ' value=' + grupo.get('id') + '>' + grupo.get('nome').toString().toUpperCase() + '</option>');
      }, this);

      return this;
    },
    mostrarDadosCadastro: function () {
        if (this.model.attributes.dados.pasta_id === 1) {
            this.$("#box_motorista").css("display", "block");
            this.$("#box_veiculo").css("display", "none");
            this.$("#form_documento").css("display", "none");
            this.$("#form_transportadora").css("display", "none");
        }
        else if (this.model.attributes.dados.pasta_id === 2) {
            this.$("#box_veiculo").css("display", "block");
            this.$("#box_motorista").css("display", "none");
            this.$("#form_documento").css("display", "none");
            this.$("#form_transportadora").css("display", "none");
        }
        else if (this.model.attributes.dados.pasta_id === 3) {
            this.$("#box_veiculo").css("display", "none");
            this.$("#box_motorista").css("display", "none");
            this.$("#form_documento").css("display", "block");
            this.$("#form_transportadora").css("display", "none");
        }
        else if (this.model.attributes.dados.pasta_id === 4) {
            this.$("#box_veiculo").css("display", "none");
            this.$("#box_motorista").css("display", "none");
            this.$("#form_documento").css("display", "none");
            this.$("#form_transportadora").css("display", "block");
        }
        else {
            //
        }
        return this;
    },
    "template": _.template(`
<style>
    .space { padding: 10px 0 10px 0; }
    .s_campos{margin-bottom: 15px;}
    .s_labels{padding-bottom: 5px;}
    .off{display: none;}
    #lista_documentos .col1 button{border:0; background-color: #FFFFFF; padding: 0;}
    .col1 span:hover{text-decoration: underline;}
</style>

<div id="modalDoc"></div>

<div class="container-fluid">
    <div class="row>
        <div class="col-xs-12">
            <div class="adagio-notification"></div>
            <%= this.model.attributes.duplicado === true ? '<div class="alert alert-warning" role="alert">Existe uma duplica&ccedil;&atilde;o para essa ficha.</div>' : '' %>
        </div>
    </div>
</div>

<div class="container-fluid"><!--ini container-fluid-->
    <div class="row cartorial_ver"><!--ini row-->
        <div class="col-sm-12"><!--ini col-sm-12 -->
            <div class="panel panel-default"><!--ini card-->
                <input type="hidden" class="id_cartorial_dado" name="id_cartorial_dado" value="<%=this.model.attributes.dados.id_cartorial_dado%>"/>

<form class="form-horizontal panel-body off" id="form_documento">
    <input type="hidden" name="formulario" value="documento">
        <div class="row">
            <div class="col-sm-4 s_campos">
                <label for="form_documento_grupos" class="control-label s_labels">Grupos*</label>
                <select name="grupos[]" class="form-control form-grupo" id="form_documento_grupos" multiple size="12" required></select>
            </div>

    <div class="col-sm-8 s_campos">
        <div class="row">
            <div class="col-sm-6 s_campos">
                <!--CARTORIAL_DADOS.TIPO-->
                <!--------------TIPOS.ID-->
                <label class="control-label s_labels" for="documento_tipo">Esp&eacute;cie</label>
                <select id="documento_tipo" class="form-control form-tipo disabled" name="tipo" disabled>
                <option value="0" class="oculto">Selecionar...</option>
                <option value="29" class="oculto" <%=(this.model.attributes.dados.tipo===29?" selected":"")%>>Ap&oacute;lice RCTR-C</option>
                <option value="30" class="oculto" <%=(this.model.attributes.dados.tipo===30?" selected":"")%>>Ap&oacute;lice RC Ambiental</option>
                <option value="31" class="oculto" <%=(this.model.attributes.dados.tipo===31?" selected":"")%>>Ap&oacute;lice ALL RISKS/LMI</option>
                </select>
            </div>
            <div class="col-sm-6 s_campos">
                <!--CARTORIAL_DADOS.#28-->
                <!---------------CODIGO-->
                <label class="control-label s_labels" for="susep">SUSEP</label>
                <input type="text" class="form-control form-susep" id="susep" name="susep" value="<% print(this.model.attributes.dados.codigo) %>">
            </div>
        </div>
        <div class="row">
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.#16-->
            <!----------RG_CONDUTOR-->
            <label class="control-label s_labels" for="apolice">Ap&oacute;lice</label>
            <input type="text" class="form-control form-apolice" name="apolice" id="apolice" value="<% print(this.model.attributes.dados.rg_condutor) %>">
          </div>
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.#13-->
            <!--------NOME_CONDUTOR-->
            <label class="control-label s_labels" for="seguradora">Seguradora</label>
            <input type="text" class="form-control form-seguradora" id="seguradora" name="seguradora" value="<% print(this.model.attributes.dados.nome_condutor) %>">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.#14-->
            <!--------------CELULAR-->
            <label class="control-label s_labels" for="indenizacao">Indeniza&ccedil;&atilde;o</label>
            <input type="number" class="form-control form-indenizacao" name="indenizacao" id="indenizacao" value="<% print(this.model.attributes.dados.celular) %>">
          </div>
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.#19-->
            <!---------------CHASSI-->
            <label class="control-label s_labels" for="cnpj">CNPJ</label>
            <input type="text" class="form-control form-cnpj" id="cnpj" name="cnpj" value="<% print(this.model.attributes.dados.chassi) %>">
          </div>
        </div>
      </div>

    </div>
    <hr>
    <div class="col-sm-offset-11">
        <button type="button" class="btn btn-primary btn-block" id="salvar_documento">Salvar</button>
    </div>
</form>

<form class="form-horizontal panel-body off" id="form_transportadora">
<input type="hidden" name="formulario" value="transportadora">
    <div class="row">
        <div class="col-sm-4 s_campos">
            <label for="form_documento_grupos" class="control-label s_labels">Grupos*</label>
            <select name="grupos[]" class="form-control form-grupo" id="form_documento_grupos" multiple size="12" required></select>
        </div>

<div class="col-sm-8 s_campos">
<div class="row">
<div class="col-sm-6 s_campos">
  <!--CARTORIAL_DADOS.TIPO-->
  <!--------------TIPOS.ID-->
  <label class="control-label s_labels" for="transportadora_titulo">Raz&atilde;o Social</label>
  <input type="text" id="transportadora_titulo" class="form-control" name="titulo" value="<%= view.get("dados").nome_condutor %>" required>
</div>
<div class="col-sm-6 s_campos">
  <!--CARTORIAL_DADOS.#28-->
  <!---------------CODIGO-->
  <label class="control-label s_labels" for="transportadora_cnpj">CNPJ</label>
  <input pattern="[0-9]{11,14}" class="form-control" id="transportadora_cnpj" name="cnpj" value="<%= view.get("dados").cpf_condutor %>" required>
</div>
</div>
<div class="row">
<div class="col-sm-6 s_campos">
  <!--CARTORIAL_DADOS.#16-->
  <!----------RG_CONDUTOR-->
  <label class="control-label s_labels" for="transportadora_endereco">Endere&ccedil;o</label>
  <input type="text" class="form-control" name="endereco" id="transportadora_endereco" value="<%= view.get("dados").modelo_veiculo %>">
</div>
<div class="col-sm-6 s_campos">
  <!--CARTORIAL_DADOS.#13-->
  <!--------NOME_CONDUTOR-->
  <label class="control-label s_labels" for="transportadora_telefone">Telefone</label>
  <input type="text" class="form-control" id="transportadora_telefone" name="telefone" value="<%= view.get("dados").celular %>">
</div>
</div>
<div class="row">
<div class="col-sm-6 s_campos">
  <!--CARTORIAL_DADOS.#14-->
  <!--------------CELULAR-->
  <label class="control-label s_labels" for="transportadora_responsavel">Representante</label>
  <input type="text" class="form-control" name="responsavel" id="transportadora_responsavel" value="<%= view.get("dados").marca_veiculo %>">
</div>
<div class="col-sm-6 s_campos">
  <!--CARTORIAL_DADOS.#19-->
  <!---------------CHASSI-->
  <label class="control-label s_labels" for="cnpj">E-mail</label>
  <input type="email" class="form-control" id="transportadora_email" name="email" value="<%= view.get("dados").codigo %>">
</div>
</div>
  </div>

</div>

<div class="col-sm-offset-11">
    <button type="button" class="btn btn-primary btn-block" id="salvar_transportadora">Salvar</button>
</div>
<div class="row"><hr></div>

<div class="row">
    <div class="col-lg-6">
        <p class="text-muted text-justify">Voc&ecirc; pode (ou deve) associar um ou mais condutores e carros a essa transportadora. &Eacute; importante garantir a consist&ecirc;ncia dos dados. No caso de d&uacute;vidas, procure suporte.</p>
    </div><!-- /.col-lg-6 -->
    <div class="col-lg-6">
        <label class="control-label s_labels" for="cnpj">Pesquisar & adicionar carro e/ou condutor (placa ou CPF)</label>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Placa ou CPF" id="a_ser_relacionado">
            <span class="input-group-btn"><button class="btn btn-default" id="relacionar_com" type="button">Inserir</button></span>
        </div><!-- /input-group -->
    </div><!-- /.col-lg-6 -->
</div><!-- /.row -->

</form>

                        <form class="form-horizontal panel-body off" id="box_motorista">
                            <input type="hidden" value="motorista" name="formulario">
                            <div class="row">
                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Percurso*</label>
                                    <select name="operacao" id="trecho" class="form-control">
                                    <option value="0">Selecionar...</option>
                                    <% view.get("operacoes").each(function (operacao) { %>
                                    <option value="<%= operacao.get("id") %>"<%= (view.get("dados").tesao_id === operacao.get("id") ? " selected" : "") %>><%= operacao.get("titulo") %></option>
                                    <% }); %>
                                    </select>
                                </div>

                                <div class="col-sm-6 s_campos">
                                    <label class="control-label s_labels">Frota*</label>
                                    <select id="motorista_grupo" class="form-control form-grupo" name="grupos[]"></select>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Vínculo Frota*</label>
                                    <select class="form-control" id="vinculo" name="vinculo">
                                        <option value="<% print(this.model.attributes.dados.vinculo); %>"><% print(this.model.attributes.vinculo); %></option>
                                        <optgroup label="Disponíveis">
                                            <option value="1">Próprio</option>
                                            <option value="2">Agregado</option>
                                        </optgroup>
                                    </select>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Planta*</label>
    <select name="regiao_leiteira_id" id="regiao_leiteira_id" class="form-control form-planta"></select>
                                </div>

                                <div class="col-sm-6 s_campos">
                                    <label class="control-label s_labels">Nome*</label>
                                    <input name="nome_condutor"  id="nome_condutor" type="text" class="form-control" placeholder="Digite o nome" value="<% print(this.model.attributes.dados.nome_condutor) %>"/>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Rela&ccedil;&atilde;o</label>
                                    <p class="form-control-static"><%= this.model.attributes.dados.pessoa_juridica || "-" %></p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">RG*</label>
                                    <input name="rg_condutor" type="text" id="rg_condutor" maxlength="11" class="form-control" placeholder="Digite o RG" value="<% print(this.model.attributes.dados.rg_condutor) %>"/>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">CPF*</label>
                                    <p class="form-control-static"><%= this.model.attributes.dados.cpf_condutor %></p>
                                    <input name="cpf_condutor" type="hidden" id="cpf_condutor" value="<% print(this.model.attributes.dados.cpf_condutor) %>">
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Função*</label>
                                    <select class="form-control" id="funcao" name="funcao">
                                        <option value="<%= parseInt(this.model.get('dados').funcao) %>"><%= this.model.get('funcao') %></option>
                                        <optgroup label="Disponíveis">
                                            <option value="1">Motorista</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">UF*</label>
                                    <select class="form-control" id="uf" name="uf">
                                        <option value="<% print(this.model.attributes.dados.uf) %>"><% print(this.model.attributes.dados.uf) %></option>
                                        <optgroup label="Disponíveis">
                                            <option value="AC">AC</option>
                                            <option value="AL">AL</option>
                                            <option value="AP">AP</option>
                                            <option value="AM">AM</option>
                                            <option value="BA">BA</option>
                                            <option value="CE">CE</option>
                                            <option value="DF">DF</option>
                                            <option value="ES">ES</option>
                                            <option value="GO">GO</option>
                                            <option value="MA">MA</option>
                                            <option value="MT">MT</option>
                                            <option value="MS">MS</option>
                                            <option value="MG">MG</option>
                                            <option value="PA">PA</option>
                                            <option value="PB">PB</option>
                                            <option value="PR">PR</option>
                                            <option value="PE">PE</option>
                                            <option value="PI">PI</option>
                                            <option value="RJ">RJ</option>
                                            <option value="RN">RN</option>
                                            <option value="RS">RS</option>
                                            <option value="RO">RO</option>
                                            <option value="RR">RR</option>
                                            <option value="SC">SC</option>
                                            <option value="SP">SP</option>
                                            <option value="SE">SE</option>
                                            <option value="TO">TO</option>
                                        </optgroup>
                                    </select>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Nascimento*</label>
                                    <div class="input-group date">
                                        <input name="nascimento_condutor" id="nascimento_condutor" type="text" class="form-control" placeholder="DD/MM/AAAA" maxlength="10" readonly="readonly" value="<% print(this.model.attributes.nascimento_condutor) %>"/>
                                        <span class="input-group-addon">
                                            <i class="fa fa-fw fa-calendar"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Celular*</label>
                                    <input name="celular" type="text" id="celular" class="form-control" placeholder="Digite o celular" value="<% print(this.model.attributes.dados.celular) %>" maxlength="14"/>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Contratação</label>
                                    <div class="input-group date">
                                        <input name="contratacao" id="contratacao" type="text" class="form-control" placeholder="DD/MM/AAAA" maxlength="10" readonly="readonly" value="<% print(this.model.attributes.contratacao) %>"/>
                                        <span class="input-group-addon">
                                            <i class="fa fa-fw fa-calendar"></i>
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <hr>

                            <div class="col-sm-offset-11">
                                <button type="button" class="btn btn-primary btn-block" id="salvar_motorista">Salvar</button>
                            </div>

                        </form>

                        <form class="form-horizontal panel-body off" id="box_veiculo">
                            <input type="hidden" name="formulario" value="veiculo">
                            <div class="row">
                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Percurso*</label>
                                    <select name="operacao" id="trecho" class="form-control">
                                    <option value="0">Selecionar...</option>
                                    <% view.get("operacoes").each(function (operacao) { %>
                                    <option value="<%= operacao.get("id") %>"<%= (view.get("dados").tesao_id === operacao.get("id") ? " selected" : "") %>><%= operacao.get("titulo") %></option>
                                    <% }); %>
                                    </select>
                                </div>

                                <div class="col-sm-6 s_campos">
                                    <label class="control-label s_labels">Frota*</label>
                                    <select class="form-control form-grupo" id="veiculo_grupo" name="grupos[]"></select>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Vínculo Frota*</label>
                                    <select class="form-control" id="vinculo" name="vinculo">
                                        <option value="<% print(this.model.attributes.dados.vinculo); %>"><% print(this.model.attributes.vinculo); %></option>
                                        <optgroup label="Disponíveis">
                                            <option value="1">Próprio</option>
                                            <option value="2">Agregado</option>
                                        </optgroup>
                                    </select>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Planta*</label>
                                    <select name="regiao_leiteira_id" id="regiao_leiteira_id" class="form-control form-planta"></select>
                                </div>
                                <div class="col-sm-6 s_campos">
                                    <label class="control-label s_labels">Marca*</label>
                                    <input name="marca_veiculo" id="marca_veiculo" type="text" class="form-control" placeholder="Digite a marca" value="<% print(this.model.attributes.dados.marca_veiculo) %>"/>
                                </div>
                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Rela&ccedil;&atilde;o</label>
                                    <p class="form-control-static"><%= this.model.attributes.dados.pessoa_juridica || "-" %></p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Modelo*</label>
                                    <input name="modelo_veiculo" id="modelo_veiculo" type="text" class="form-control" placeholder="Digite o modelo" value="<% print(this.model.attributes.dados.modelo_veiculo) %>"/>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Ano*</label>
                                    <input name="ano_veiculo" id="ano_veiculo" type="text" class="form-control" placeholder="Digite o ano" maxlength="4" value="<% print(this.model.attributes.dados.ano_veiculo) %>"/>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">Início opera&ccedil;&atilde;o*</label>
                                    <div class="input-group date">
                                        <input name="inicio_operacao" id="inicio_operacao" type="text" class="form-control" maxlength="10" readonly="readonly" placeholder="DD/MM/AAAA" value="<% print(this.model.attributes.inicio_operacao) %>"/>
                                        <span class="input-group-addon">
                                            <i class="fa fa-fw fa-calendar"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="col-sm-3 s_campos">
                                    <label class="control-label s_labels">RENAVAM*</label>
                                    <input name="renavam" id="renavam" type="text" class="form-control" maxlength="11" placeholder="Digite o renavam" value="<% print(this.model.attributes.dados.renavam) %>"/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6 s_campos">
                                    <label class="control-label s_labels">Propriet&aacute;rio do tanque*</label>
                                    <select class="form-control transportadora" id="proprietario_tanque_id" name="proprietario_tanque_id">
                                    </select>
                                </div>

                                <div class="col-sm-2 s_campos">
                                    <label class="control-label s_labels">Placa*</label>
                                    <p class="form-control-static"><%= this.model.attributes.dados.placa_veiculo %></p>
                                    <input name="placa_veiculo" id="placa_veiculo" type="hidden" value="<% print(this.model.attributes.dados.placa_veiculo) %>">
                                </div>

                                <div class="col-sm-2 s_campos">
                                    <label class="control-label s_labels">Tipo*</label>
                                    <select name="tipo" id="tipo" class="form-control">
                                        <option value="<%= this.model.attributes.dados.tipo %>"><%= this.model.attributes.tipo %></option>
                                        <optgroup label="Disponíveis">
                                            <option value="5">Toco</option>
                                            <option value="11">Trucado</option>
                                            <option value="12">Bidirecional</option>											
                                            <option value="6">Cavalo Mec&acirc;nico</option>
                                            <option value="10">Reboque</option>
                                            <option value="8">Semirreboque</option>
                                            <option value="9">Vanderl&eacute;ia</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div class="col-sm-2 s_campos" id="cx_tanque">
                                    <label class="control-label s_labels">C&oacute;digo do tanque</label>
                                    <input name="numero_tanque" id="numero_tanque" type="text" class="form-control" placeholder="Digite o n° tanque" value="<% print(this.model.attributes.dados.codigo) %>"/>
                                </div>
                            </div>

                            <hr>

                            <div class="col-sm-offset-11">
                                <button type="button" class="btn btn-primary btn-block" id="salvar_veiculo">Salvar</button>
                            </div>

                        </form>

                    <table class="table" id="lista_cadastros" style="display: none;">
                        <thead><tr>
                            <th>ID</th>
                            <th>Cadastro</th>
                            <th>Registro</th>
                            <th>&nbsp;</th>
                        </tr></thead>
                        <tbody id="container-table">
                        <tr><td colspan="6"><div class="well well-sm">Vazio</div></td></tr>
                        </tbody>
                    </table>

                    <table class="table" id="lista_documentos">
                        <thead>
                            <tr>
                                <th>Tipo Documento</th>
                                <th>Situação</th>
                                <th>Vencimento</th>
                                <th>Dias</th>
                                <th>Cadastro</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    </div><!--fim card-->
                </div><!--fim col-sm-12-->
            </div><!--fim row-->
        </div><!--fim container-fluid-->
    `,
    {"variable": "view"}),
    initialize: function() {
        try {
            this.getJSON(adagio.environment.getEndpoint("prestadores")).load("web").release();
        }
        catch(thrown) {
            console.error(thrown);
        }
        finally {
            //
        }
    },
    listarDocumentacoes: function()
    {
        var trWithTd = {"nodes": []};

        this.model.get("documentacoes").each(function (documentacao) {
            var template = _.template(
            `<tr id="doc<%= id %>">
                <td class="col1"><button type="button" value="<%= id %>"><i class="fa fa-fw fa-file"></i> <span><%= nome %></span></button></td>
                <td class="col2"><span class="text-muted">Não cadastrado</span></td>
                <td class="col3">-</td>
                <td class="col4">-</td>
                <td class="col5">-</td>
                <td class="col6">&nbsp;</td>
            </tr>`);

            this.nodes.push(template(documentacao.attributes));
        }, trWithTd);

        this.$("#lista_documentos").find("tbody").append(trWithTd.nodes.join(''));

        return this;
    },
    carregarDocumentos: function carregarDocumentos() {
        // console.log(this.model.get('arrDoc').pluck("tipo"));

        this.model.get('arrDoc').each(function (documento, i) {
            var $tr = this.$("#doc" + documento.attributes.tipo);

            // console.log($tr);

            if (documento.get('pendencia') === documento.get('vencimento')) {
                //
            }
            else if (documento.get('created_at') === null) {
                // $tr.find(".col2").html("<span class='label label-inverse'>Inaplicável</span>");
                $tr.find(".col2").parent("tr").addClass("active");
                // return null;
            }
            else {
                //
            }

            if (documento.attributes.aprovado === -1) {
                $tr.find(".col2").html("<span class='label label-danger'>Reprovado</span>");
            }
            else if (documento.attributes.pendencia === null && documento.attributes.aprovado === 1) {
                if (documento.get('created_at') === null) {
                    $tr.find(".col2").html("<span class='label label-inverse'>Inaplicável</span>");
                }
                else {
                    $tr.find(".col2").html("<span class='label label-success'>Cadastrado</span>");
                }
            }
            else {
                $tr.find(".col2").html("<span class='label label-warning'>Pendente</span>");
            }
            if (documento.attributes.pendencia === documento.get('vencimento') && documento.get('vencimento') !== "") {
                this.$("#doc"+documento.attributes.tipo+" .col3").text('Analisando').addClass('text-danger');
            }
            else if (documento.get('vencimento') !== "") {
                this.$("#doc"+documento.attributes.tipo+" .col3").html(documento.get('vencimento'));
            }
            else if (documento.get('vencimento') === "" && parseInt(documento.get('id')) > 0) {
                this.$("#doc"+documento.attributes.tipo+" .col3").html('<span class="label label-info">Não possui</span>');
            }
            else {
                //
            }

            //
            var varDias = documento.get('diasVencimento').days;
            if (varDias == 0) {
                if (documento.get('pendencia') === documento.get('vencimento')) {
                    //
                }
                else if (documento.get('created_at') === null) {
                    //
                }
                else if (documento.get('aprovado') === -1) {
                    $tr.find(".col4").html('<span class="label label-danger">Vencido</span>');
                }
                else if (documento.get('vencimento') !== "") {
                    $tr.find(".col4").html('<span class="label label-danger">Vencido</span>');
                }
                else {
                    $tr.find(".col4").html('<span class="label label-info">Não possui</span>');
                }
            }
            else {
                if (documento.get('pendencia') === documento.get('vencimento')) {
                    //
                }
                else if (documento.get('aprovado') === -1) {
                    //
                }
                else if (varDias > 30) {
                    $tr.find(".col4").html('<span class="label label-success">'+varDias+' dia(s)</span>');
                }
                else if (varDias <= 30) {
                    $tr.find(".col4").html('<span class="label label-warning">'+varDias+' dia(s)</span>');
                }
                else {
                    //
                }
            }

            if (documento.attributes.created_at === null) {
                $tr.find(".col5").html('-');
            }
            else {
                $tr.find(".col5").html(documento.get('created_at'));
            }

            var habilitar_expresso = documento.get('aprovado') === 1 ?
                '<button title="Reprovar documento" type="button" class="btn btn-xs btn-default ativarfoto" value=""><i class="fa fa-fw fa-times"></i></button>' :
                '<button title="Aprovar documento" type="button" class="btn btn-xs btn-default ativarfoto" value=""><i class="fa fa-fw fa-check"></i></button>';
            var abrir_arquivo = (documento.get('created_at') === null) ?
                '&nbsp;' :
                '<button title="Visualizar documento" type="button" class="btn btn-xs btn-default open_modal_foto" value=""><i class="fa fa-fw fa-picture-o"></i></button>&nbsp;';
            var acoes = '<span class="pull-right">'+
                abrir_arquivo+
                '<button title="Editar documento" type="button" class="btn btn-xs btn-default open_modal_foto_edicao" value=""><i class="fa fa-fw fa-list"></i></button>&nbsp;'+
                habilitar_expresso+
                '</span>';

            $tr.find(".col6").html(acoes);
            $tr.find(".col6 .open_modal_foto").attr("value", documento.get('sha256'));
            $tr.find(".col6 .open_modal_foto_edicao").attr("value", documento.get('sha256')).data("documentoTipo", documento.get('tipo'));
            $tr.find(".col6 .ativarfoto").attr("value", documento.get('sha256')).data("documentoTipo", documento.get('tipo'));
        },
        this);

        return this;
    },
    "render": function () {
        this.$el.html(this.template(this.model)).attr("class", this.className);

        this.listarTransportadoras().mostrarDadosCadastro().listarDocumentacoes().carregarDocumentos();

        if (this.$("#box_veiculo #tipo").val() == "4") {
            this.$("#box_veiculo #cx_tanque").css("display", "none");
        }

        this.$('.date').datepicker({
            format: 'dd/mm/yyyy',
            language: 'pt-BR',
            autoclose: true
        });

        this.carregar_container();
    },
    "notification": window.handling.notification
}