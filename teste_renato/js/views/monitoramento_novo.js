{
  tagName: "div",
  id: "adagio-home",
  className: "monitoracao-novo",
  events: {
    "change .form-uf": function(event)
    {
      
      var $currentTarget = this.$(event.currentTarget);
     // alert('"'+event.currentTarget.id+'"');
      
     // alert($("#"+event.currentTarget.id+" option:selected").text());

      

      if($currentTarget.val() !== "0")
      {         
        $.ajax({
          url: adagio.environment.getEndpoint("ufs/"+$currentTarget.val()),
          //data: $currentTarget.val(),
          //context: _this,
          global: false
        }).done(function (retorno) {          
          
          var option = "";
            for(var i = 0; i < retorno.qtdados; i++){
              option += '<option value="'+ retorno.dados[i].nome_municipio +'" class="dinamico" id="d'+ i +'">'+ retorno.dados[i].nome_municipio +'</option>';
            }

            //$("#box_acionamento #acionamento_municipio_id .oculto").css("display", "none");
            //alert($municipio_id);
            $($municipio_id+" .dinamico").remove();
            $($municipio_id).append(option);
            $($municipio_id+" #d0").attr("selected", "selected");

            $uf_selected = $("#"+event.currentTarget.id+" option:selected").text();

        }).fail(function (retorno) {
          alert("Um erro ocorreu!");
        });  
      }else{
        $($municipio_id+" .dinamico").remove();
        $uf_selected = "";
      }
    },

    "click #salvar_documento": "salvarDadosDocumento",
    "click #salvar_pontos_acionamento": "salvarDadosDocumento",        
    //"click #salvar_motorista": "salvarDadosMotorista",
    //"click #salvar_veiculo": "salvarDadosVeiculo",
  },

  // form_documento
  salvarDadosDocumento: function salvarDadosDocumento(event) {
    var dados =  this.$(event.currentTarget).closest("form").serialize()+'&uf_selected='+$uf_selected;
   // alert(this.$(event.currentTarget).;
    //alert($uf_selected);

    $.ajax({
      "url": adagio.environment.getEndpoint("atlante"),
      "method": "POST",
      "data": dados,
      "context": this
    }).
    then(function (data, textStatus, jqXHR) {
      return jqXHR;
    },
    function (jqXHR, textStatus, errorThrown) {
      alert("Um erro ocorreu!");
      return jqXHR;
    });
  },

  template: _.template (`

  <div id="modalMonitoracao"></div>

    <div class="container-fluid">

      <div class="row off" id="box_monitoracao"><!--ini cadastro monitoracao-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="monitoracao">
                        <div class="row">
                          <div class="col-sm-6">
                            <label class="control-label s_labels" for="rota">Rota*</label>
                            <select name="rota" class="form-control form-rota" id="rota_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-6">
                            <label class="control-label s_labels" for="rota">Transportadora*</label>
                            <select name="transportadora" class="form-control form-transportadora" id="transportadora_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                        </div>
                      <div class="row">
                        <div class="col-sm-4 s_campos">
                            <label class="control-label s_labels">Placa do Veículo Principal*</label>
                            <input name="placas[0]" type="text" id="placa_veiculo_principal_id" class="form-control" placeholder="Digite a placa do veículo principal"/>
                            <p class="help-block pongs-0">Placa Ve&iacute;culo</p>
                        </div>
                        <div class="col-sm-4 s_campos">
                            <label class="control-label s_labels">Placa do Semireboque 1*</label>
                            <input name="placas[1]" type="text" id="placa_semireboque1_id" class="form-control" placeholder="Digite a placa do semireboque 1"/>
                            <p class="help-block pongs-0">Placa Ve&iacute;culo</p>
                        </div>
                        <div class="col-sm-4 s_campos">
                            <label class="control-label s_labels">Placa do Semireboque 2</label>
                            <input name="placas[2]" type="text" id="placa_semireboque2_id" class="form-control" placeholder="Digite a placa do semireboque 2"/>
                            <p class="help-block pongs-0">Placa Ve&iacute;culo</p>
                        </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Nome do Condutor*</label>
                              <input name="nome_condutor" type="text" id="nome_condutor_id" class="form-control" placeholder="Digite o nome do condutor"/>
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">CPF do Condutor*</label>
                              <input name="cpf_condutor" type="text" id="cpf_condutor_id" class="form-control" placeholder="Digite o cpf do condutor"/>
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">Telefone do Condutor*</label>
                              <input name="telefone_condutor" type="text" id="telefone_condutor_id" class="form-control" placeholder="Digite o telefone do condutor"/>
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label s_labels" for="rota">Tipo de Carga*</label>
                            <select name="tipo-carga" class="form-control form-tipo-carga" id="tipo_carga_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">NF da Carga</label>
                              <input name="nf_carga" type="text" id="nf_carga_id" class="form-control" placeholder="Digite a nota fiscal da carga"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Valor da NF</label>
                              <input name="valor_nf" type="text" id="valor_nf_id" class="form-control" placeholder="Digite o valor da nf"/>
                          </div>
                          <div class="col-sm-5">
                              <label class="control-label s_labels">Destinatário da Mercadoria</label>
                              <input name="destinatario_mercadoria" type="text" id="destinatario_mercadoria_id" class="form-control" placeholder="Digite o destinatário da mercadoria"/>                
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3 s_campos">
                            <label class="control-label s_labels">Previsão do Início da Viagem*</label>
                            <input name="prev_inicio_viagem" type="text" id="prev_inicio_viagem_id" class="form-control" placeholder="DD/MM/AAAA HH:mm"/>
                        </div>
                        <div class="col-sm-3 s_campos">
                            <label class="control-label s_labels">Previsão do Encerramento da Viagem*</label>
                            <input name="prev_fim_viagem" type="text" id="prev_fim_viagem_id" class="form-control" placeholder="DD/MM/AAAA HH:mm"/>
                        </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Login do Sistema de Telemetria*</label>
                              <input name="login_telemetria" type="text" id="login_telemetria_id" class="form-control" placeholder="Digite o login do sistema de telemetria"/>
                          </div>
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Senha do Sistema de Telemetria*</label>
                              <input name="senha_telemetria" type="text" id="senha_telemetria" class="form-control" placeholder="Digite a senha do sistema da telemetria"/>
                          </div>
                      </div>  
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Nome do Embarcador*</label>
                              <input name="nome_embarcador" type="text" id="nome_embarcador_id" class="form-control" placeholder="Digite o nome do embarcador"/>
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">CNPJ do Embarcador*</label>
                              <input name="cnpj_embarcador" type="text" id="cnpj_embarcador_id" class="form-control" placeholder="Digite o cnpj do embarcador"/>
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">N° do Dacte*</label>
                              <input name="numero_dacte" type="text" id="numero_dacte_id" class="form-control" placeholder="Digite o n° do dacte"/>
                          </div>
                      </div> 
                      <div class="row">
                          <div class="col-sm-12 s_campos">
                              <label class="control-label s_labels">Observações</label>
                              <textarea class="form-control" name="observacoes_id" id="observacoes_id"></textarea>
                          </div>
                      </div>                                
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_monitoracao">Salvar</button>
                          </div>
                      </fieldset>                    
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro monitoracao-->                            
    </div>
  `, {variable: 'adagio'}),
  initialize: function()
  {
    try {
      sessionStorage.clear();
      this
      .getJSON(adagio.environment.getEndpoint("ufs"))
      .load("web")
      //.getScript ("/jquery.maskedinput-master/lib/jquery-1.9.0.min.js", "js")
      .getScript ("/jquery.maskedinput-master/src/jquery.maskedinput.js", "js")
      //.getScript ("/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js", "js")
      //.getScript ("/datetimepicker-master/build/jquery.datetimepicker.full.js", "js")
      //.getScript ("/datetimepicker-master/build/jquery.datetimepicker.full.min.js", "js")
      //.getScript ("/bootstrap-datetimepicker-master/src/js/bootstrap-datetimepicker.js", "js")
      //.getScript ("/bootstrap-datetimepicker-master/build/js/bootstrap-datetimepicker.min.js", "js")
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
        $('#prev_inicio_viagem_id').mask('99/99/9999 99:99');
        $('#prev_fim_viagem_id').mask('99/99/9999 99:99');
        $('#celular').mask('(99) 9.9999-9999');
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