{
  tagName: "div",
  id: "adagio-home",
  className: "monitoramento-6-editar",
  events: {
    "click #consultarPlaca": "averiguarPlaca",
    "click #consultarPessoa": "averiguarDocumento",  
    "click #salvar_monitoramento": "salvarDadosDocumento",    
    //"click #salvar_motorista": "salvarDadosMotorista",
    //"click #salvar_veiculo": "salvarDadosVeiculo",
  },

averiguarPlaca: function averiguarPlaca(event)
	{
		try {
      var $currentTarget = this.$(event.currentTarget);
      var retorno = true;

      if(event == 'placa_veiculo_principal_id'){
        referencia_placa =  'placa_veiculo_principal_id';
      }else if(event == 'placa_semireboque1_id'){
        referencia_placa = 'placa_semireboque1_id';
      }else if(event == 'placa_semireboque2_id'){
        referencia_placa = 'placa_semireboque2_id';
      }else{
        referencia_placa = $currentTarget.data('model');
      }
      			
				var referencia = referencia_placa,
        placa = this.$('#'+referencia).val(),
        //alert(referencia);
       // ordem = this.$('#'+referencia).attr('name').match(/placas\[([0-9])\]/),
        //alert(ordem);
				//frota = this.$('[name="numeros['+ordem[1]+']"]'),
			//	carro = this.$('[name="categorias['+ordem[1]+']"]'),
        reply = this.$('.pongs-'+referencia);
        
      if(!placa == "")
      {
        $.ajax({
          url: adagio.environment.getEndpoint("cartorial/buscadocvencidosplaca/" + placa),
          "async":false,
          method: "get",
          dataType: "json",
          context: this
        })
        .done(function (response) {
          if (response.encontrado === false) {
            this.$('#'+referencia).parent().attr("class", "col-sm-2 has-error");
            reply.text("Não localizado");
            this.$("#area_alertas_veiculos").html("");
            retorno = false;
           /* if(referencia == "placa_veiculo_principal_id"){
              valida_placa_principal = 0;
            }else if(referencia == "placa_semireboque1_id"){
              valida_placa_semireboque1 = 0;
            }else if(referencia == "placa_semireboque2_id"){
              valida_placa_semireboque2 = 0;
            }*/
          }
          else if (response.qtdados > 0) {
            this.$('#'+referencia).parent().attr("class", "col-sm-2 has-error");
            reply.text("Observações");
            _(response.dados).each(function(item) {
              this.$("#area_alertas_veiculos").append(`<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>` + item.titulo + `</strong> em vencimento para ` + (new Date(item.vencimento).toISOString().slice(0, 10).split("-").reverse().join("/")) +
              `.</div>`);
              console.log('[data-documento="'+item.tipo+'"]');
              this.$('[data-documento="'+item.tipo+'"]').trigger("dblclick", [true]);
            }, this);
            retorno = false;
            /*if(referencia == "placa_veiculo_principal_id"){
              valida_placa_principal = 0;
            }else if(referencia == "placa_semireboque1_id"){
              valida_placa_semireboque1 = 0;
            }else if(referencia == "placa_semireboque2_id"){
              valida_placa_semireboque2 = 0;
            }*/
          }
          else {
            this.$('#'+referencia).parent().attr("class", "col-sm-2 has-success");
            reply.text("Regular");
            this.$("#area_alertas_veiculos").html("");
            retorno = true;
           /* if(referencia == "placa_veiculo_principal_id"){
              valida_placa_principal = 1;
            }else if(referencia == "placa_semireboque1_id"){
              valida_placa_semireboque1 = 1;
            }else if(referencia == "placa_semireboque2_id"){
              valida_placa_semireboque2 = 1;
            }*/
          }
          //this.$('#'+referencia).val(response.placa);
        /*	frota.val(response.veiculo_frota);
          if (response.carro === 0) {
            //
          } else {
            carro.val(response.carro);

            if (parseInt(carro.val()) !== response.carro) {
              carro.val(0);
            }
          }*/
        });
      }else{
        this.$('#'+referencia).parent().attr("class", "col-sm-2 s_campos");
        reply.text("Placa Veículo");
      }
      return retorno;
		}
		catch (caughtError) {
			console.error(caughtError);
		}
	},

	averiguarDocumento: function averiguarDocumento()
	{
		try {
      var parametro = this.$el.find("#cpf_condutor_id").val();
      var retorno = true;
                  
      if(!parametro == "")
      {         
        $.ajax({
          "url": adagio.environment.getEndpoint("cartorial/buscadocvencidoscpf/" + parametro),
          "async":false,
          "method": "get",
          "dataType": "json",
          "context": this
        }).
        done(function (response) {
          if (response.nome_condutor === "") {
            this.$("#cpf_condutor_id").parent().attr("class", "col-sm-3 has-error");
            this.$("#situacaoPessoa").text("Não localizado");
            this.$("#area_alertas_motorista").html("");
            retorno =  false;            
          }
          else if (response.qtdados === 0) {
            this.$("#cpf_condutor_id").parent().attr("class", "col-sm-3 has-success");
            this.$("#situacaoPessoa").text("Localizado");
            this.$("#area_alertas_motorista").html("");
            retorno =  true;
          }
          else {
            this.$("#cpf_condutor_id").parent().attr("class", "col-sm-3 has-error");
            this.$("#situacaoPessoa").text("Ver observações");
            //this.$("#area_alertas").html("");
            _(response.dados).each(function (item) {
              this.$("#area_alertas_motorista").append(`<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>` + item.titulo + `</strong> em vencimento para ` + (new Date(item.vencimento).toISOString().slice(0, 10).split("-").reverse().join("/")) +
              `.</div>`);
              this.$('[data-documento="'+item.tipo+'"]').trigger("dblclick", [true]);
            },
            this);
            retorno =  false;
          }
          this.$("#nome_condutor_id").val(response.nome_condutor);
        });        
      }
      return retorno;
		}
		catch (caughtError) {
			console.error(caughtError);
		}
  },

  // form_documento
  salvarDadosDocumento: function salvarDadosDocumento(event) {

    if(this.averiguarPlaca('placa_veiculo_principal_id') & this.averiguarPlaca('placa_semireboque1_id') & ((!this.$el.find("#placa_semireboque2_id").val() == "" || this.$el.find("#placa_semireboque2_id").val() == "") && this.averiguarPlaca('placa_semireboque2_id')) & this.averiguarDocumento()){
        var tag = event.currentTarget, _this = this, strict = {}, globals = window;
        try {
            strict.forms = _this.$("form").serialize(); // .replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '');
            //alert(strict.forms);
            $.ajax({
                url: adagio.environment.getEndpoint('monitoramentos'),
                method: "post",
                data: strict.forms
            }).done(function (response) {
             // _this.$("#teste").clear();
                // console.log(response);                
                if (response.error) {                  
                    for (var n in response.errors) {
                      //alert(_this.$el.find("#inputRota").val()==);
                        /* if(n == 'trajeto_id' && _this.$el.find("#inputRota").val() == 0){
                           _this.$("#inputRota").parent().attr("class", "col-sm-3 has-error");
                         }*/
                         // n.replace(".","[");
                         // alert(n.replace(".","["));
                         m=n;
                         if(m.match(/\./)){
                           m = m.replace(".","[")+"]";  
                          // n = n+"]";                        
                         }
                          //alert(n);
                          //alert(_this.$('[name="' + n.replace(".","[") + '"]]'));
                           //alert(_this.$('[name="' + m + '"]').val());
                          
                        //if(_this.$('[name="' + m + '"]').val() == "" || _this.$('[name="' + m + '"]').val() == 0){
                         // alert(_this.$('[name="' + m + '"]').val());
                         //alert(m);
                         if(m == 'grupo_id' || m == 'trajeto_id' || m == 'pessoas[cpf_condutor]' || m == 'dados[tipo_carga_id]'){
                          _this.$('[name="' + m + '"]').parent().attr("class", " col-sm-3 has-error");
                         }else if(m == 'placas[principal]' || m == 'placas[semireboque1]' || m == 'dados[prev_inicio_viagem]' || m == 'dados[prev_fim_viagem]'){
                          _this.$('[name="' + m + '"]').parent().attr("class", " col-sm-2 has-error");
                         }else if(m == 'pessoas[nome_condutor]'){
                           _this.$('[name="' + m + '"]').parent().attr("class", " col-sm-6 has-error");
                         }else if(m == 'data'){
                          _this.$('[name="' + m + '"]').parent().attr("class", " input-group has-error");
                         }
                          //_this.$('[name="' + m + '"]').closest(".form-group").attr("class", "form-group has-error");
                        //}
                        for (o in response.errors[n]){
                         // alert(response.errors[n][o]);
                            _this.$('[name="' + m + '"]').closest("form").prepend('<div id="teste" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.errors[n][o] + '</div>');
                        }
                    }
                }
                else {
                    alert("Feito.");
                }
            });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            event.preventDefault();
        }

    }
  },

  template: _.template (`

  <div id="modalMonitoramento"></div>

    <div class="container-fluid">

      <div class="row off" id="box_monitoramento"><!--ini cadastro monitoramento-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input name="id" value="<%= view.get('id') %>" type="hidden">
                      <input type="hidden" name="formulario" value="monitoramento">
                        <div class="row">
                            <div class="col-sm-3">
                            <label for="inputTransportadora" class="control-label">Transportadora*</label>
                            <select name="grupo_id" class="form-control" id="inputTransportadora">
                                <option value="0">Selecionar...</option>
                                <% view.get('gruposKit').each (function (frota) { %>
                                <option <%= (frota.get('id') === parseInt(view.attributes.grupo_id) ? "selected" : "") %> value="<%= frota.get('id') %>"><%= frota.get('nome') %></option>
                              <% }); %>
                            </select>
                            </div>
                          <div class="col-sm-3">
                            <label class="control-label s_labels" for="inputRota">Rota*</label>
                            <select name="trajeto_id" class="form-control form-rota" id="inputRota">
                              <option value="0">Selecionar...</option>
                              <% view.get("trajetosCol").each(function (trajetos) { %>   
                              <option <%= (trajetos.get('id') === parseInt(view.attributes.trajeto_id) ? "selected" : "") %> value="<%= trajetos.get('id') %>"><%= trajetos.get('descricao') %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <%
                          var placa_principal;
                          var placas_semireboque = [];
                          var qtd_placas_veiculos = view.get("veiculos").models.length;

                          for(var i = 0; i < qtd_placas_veiculos; i++){
                            if(view.get("veiculos").models[i].attributes.categoria == 6){
                              placa_principal = view.get("veiculos").models[i].attributes.placa;
                            }else{
                              placas_semireboque.push(view.get("veiculos").models[i].attributes.placa);
                            }
                          }
                          %>
                          <div class="col-sm-2 s_campos">
                            <label class="control-label s_labels">Placa do Veículo Principal*</label>                            
                            <input name="placas[principal]" type="text" id="placa_veiculo_principal_id" value="<%= placa_principal%>" class="form-control" placeholder="placa veículo principal"/>
                            <p class="help-block pongs-placa_veiculo_principal_id">Placa Ve&iacute;culo</p><button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPlaca" data-model="placa_veiculo_principal_id">Buscar</button>
                            </div>
                          <div class="col-sm-2 s_campos">
                            <label class="control-label s_labels">Placa do Semireboque 1*</label>
                            <input name="placas[semireboque1]" type="text" id="placa_semireboque1_id" value="<%= placas_semireboque[0]%>" class="form-control" placeholder="placa semireboque 1"/>
                            <p class="help-block pongs-placa_semireboque1_id">Placa Ve&iacute;culo</p><button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPlaca" data-model="placa_semireboque1_id">Buscar</button>
                            </div>
                          <div class="col-sm-2 s_campos">
                            <label class="control-label s_labels">Placa do Semireboque 2</label>
                            <input name="placas[semireboque2]" type="text" id="placa_semireboque2_id" value="<%= placas_semireboque[1]%>" class="form-control" placeholder="placa semireboque 2"/>
                            <p class="help-block pongs-placa_semireboque2_id">Placa Ve&iacute;culo</p><button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPlaca" data-model="placa_semireboque2_id">Buscar</button>
                          </div>
                        </div>
                      <div class="row">
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">CPF do Condutor*</label>
                              <input name="pessoas[cpf_condutor]" type="text" id="cpf_condutor_id" value="<%=view.get("pessoas").models[0].attributes.cpf%>" class="form-control" placeholder="Digite o cpf do condutor"/>
                              <p class="help-block" id="situacaoPessoa">Consultar situação</p>
                              <button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPessoa">Buscar</button>
                          </div>
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Nome do Condutor*</label>
                              <input name="pessoas[nome_condutor]" type="text" id="nome_condutor_id" value="<%=view.get("pessoas").models[0].attributes.nome%>" class="form-control" placeholder="Digite o nome do condutor"/>
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">Telefone do Condutor</label>
                              <input name="dados[telefone_condutor]" type="text" id="telefone_condutor_id" value="<%= view.attributes.dados.telefone_condutor %>" class="form-control" placeholder="Digite o telefone do condutor" />
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3">
                            <label class="control-label s_labels" for="inputTipoCarga">Tipo de Carga*</label>
                            <select name="dados[tipo_carga_id]" class="form-control form-tipo-carga" id="inputTipoCarga">
                              <option value="0">Selecionar...</option>
                              <% view.get("tiposCargaCol").each(function (tiposCarga) { %>   
                              <option <%= (tiposCarga.get('id') === parseInt(view.attributes.dados.tipo_carga_id) ? "selected" : "") %> value="<%= tiposCarga.get('id') %>"><%= tiposCarga.get('descricao') %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">NF da Carga</label>
                              <input name="dados[nf_carga]" type="text" id="nf_carga_id" value="<%= view.attributes.dados.nf_carga %>" class="form-control" placeholder="Digite a nota fiscal da carga"/>
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">Valor da NF</label>
                              <input name="dados[valor_nf]" type="text" id="valor_nf_id" value="<%= view.attributes.dados.valor_nf %>" class="form-control" placeholder="Digite o valor da nf"/>
                          </div>
                      </div>                      
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Nome do Embarcador</label>
                              <input name="dados[nome_embarcador]" type="text" id="nome_embarcador_id" value="<%= view.attributes.dados.nome_embarcador %>" class="form-control" placeholder="Digite o nome do embarcador" />
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">CNPJ do Embarcador</label>
                              <input name="dados[cnpj_embarcador]" type="text" id="cnpj_embarcador_id" value="<%= view.attributes.dados.cnpj_embarcador %>" class="form-control" placeholder="Digite o cnpj do embarcador" />
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">N° do DACTE</label>
                              <input name="dados[numero_dacte]" type="text" id="numero_dacte_id" value="<%= view.attributes.dados.numero_dacte %>" class="form-control" placeholder="Digite o n° do dacte" />
                          </div>
                      </div> 
                      <div class="row">                                          
                        <div class="col-sm-2 s_campos">
                          <label class="control-label">Data de Lançamento da SM*</label>
                          <div class="input-group date"><input name="data" class="form-control" type="text" placeholder="DD-MM-AAAA" value="<%= view.attributes.data %>" readonly><span class="input-group-addon"><i class="fa fa-fw fa-calendar"></i></span></div>
                        </div>
                        <div class="col-sm-2 s_campos">
                            <label class="control-label s_labels">Previsão do Início da Viagem*</label>
                            <input name="dados[prev_inicio_viagem]" type="text" id="prev_inicio_viagem_id" value="<%= view.attributes.dados.prev_inicio_viagem %>" class="form-control" placeholder="DD-MM-AAAA HH:mm" />
                        </div>
                        <div class="col-sm-2 s_campos">
                            <label class="control-label s_labels">Previsão do Fim da Viagem*</label>
                            <input name="dados[prev_fim_viagem]" type="text" id="prev_fim_viagem_id" value="<%= view.attributes.dados.prev_fim_viagem %>" class="form-control" placeholder="DD-MM-AAAA HH:mm" />
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label s_labels">Destinatário da Mercadoria</label>
                            <input name="dados[destinatario_mercadoria]" type="text" id="destinatario_mercadoria_id" value="<%= view.attributes.dados.destinatario_mercadoria %>" class="form-control" placeholder="Digite o destinatário da mercadoria" />
                        </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-12 s_campos">
                              <label class="control-label s_labels">Observações</label>
                              <textarea class="form-control" name="dados[observacoes]" id="observacoes_id"><%= view.attributes.dados.observacoes %></textarea>
                          </div>
                      </div>                               
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_monitoramento">Salvar</button>
                          </div>
                      </fieldset>
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro monitoramento-->                            
    </div>
  `,
  {"variable": "view"}),
  initialize: function()
  {
    try {
      /*if (this.model.has("pessoas")) {
        console.log(this.model.get("pessoas").models);
        this.model.get("pessoas").each(function (pessoa) {
          console.log(pessoa.get("cpf"));
        });
      }*/
console.log(this.model.get("dados"));
      // sessionStorage.clear();
      this.getJSON(adagio.environment.getEndpoint("prestadores"))
        .getJSON(adagio.environment.getEndpoint("trajetos"))
        .getJSON(adagio.environment.getEndpoint("tiposCarga"))
        .load("web")
        .getScript("/jquery.maskedinput-master/src/jquery.maskedinput.js", "js")
        .getScript("/jquery-maskmoney-master/src/jquery.maskMoney.js", "js")
        .release();
    }
    catch (thrown) {
      console.error(thrown);
    }
  },
  render: function()
  {
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
      this.$('.date').datepicker({
        "format": "dd-mm-yyyy",
        "startDate": "-3m",
        "autoclose": true
      });
      //this.$('.date').datetimepicker({format: 'dd/mm/yyyy', language: 'pt-BR', autoclose: true});
      //$('#datetimepicker2').data("DateTimePicker").FUNCTION();
     // $('#datetimepicker2').datetimepicker({ format: 'DD/MM/YYYY HH:mm'});
      jQuery(function($) {
        //alert("oi");
        $.mask.definitions['~']='[+-]';
        $('#placa_veiculo_principal_id').mask('aaa-9999');
        $('#placa_semireboque1_id').mask('aaa-9999');
        $('#placa_semireboque2_id').mask('aaa-9999');
        $('#cpf_condutor_id').mask('999.999.999-99');
        $('#cnpj_embarcador_id').mask('99.999.999/9999-99');
        $('#prev_inicio_viagem_id').mask('99-99-9999 99:99');
        $('#prev_fim_viagem_id').mask('99-99-9999 99:99');
        $('#telefone_condutor_id').mask('(99) 9.9999-9999');
        $('#valor_nf_id').maskMoney({
         prefix: "R$:",
         decimal: ",",
         thousands: "."
        });
    });

   /* $(function () {
                $('#datetimepicker2').datetimepicker({
                    locale: 'ru'
                });
            });*/

    }
    catch (thrown) {
      console.error(thrown);
    }
    finally {
      return this;
    }
  },
  notification: window.handling.notification
}