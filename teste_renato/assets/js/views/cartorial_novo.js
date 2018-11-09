{
  tagName: "div",
  id: "adagio-home",
  className: "adagio-cartorial-novo",
  events: {
    "change #escolha_cadastro select": function () {
      var escolhaCadastro = this.$("#escolha_cadastro select").val();
      if (escolhaCadastro === "1") {
        this.$("#box_motorista").css("display", "block");
        this.$("#box_veiculo").css("display", "none");
        this.$("#form_documento").css("display", "none");
        this.$("#form_transportadora").css("display", "none");
        this.$("#box_colaborador").css("display", "none");
        this.$("#box_empresa").css("display", "none");
      }
      else if (escolhaCadastro === "2") {
        this.$("#box_motorista").css("display", "none");
        this.$("#box_veiculo").css("display", "block");
        this.$("#form_documento").css("display", "none");
        this.$("#form_transportadora").css("display", "none");
        this.$("#box_colaborador").css("display", "none");
        this.$("#box_empresa").css("display", "none");
      }
      else if (escolhaCadastro === "3") {
        this.$("#box_motorista").css("display", "none");
        this.$("#box_veiculo").css("display", "none");
        this.$("#form_documento").css("display", "block");
        this.$("#form_transportadora").css("display", "none");
        this.$("#box_colaborador").css("display", "none");
        this.$("#box_empresa").css("display", "none");
      }
      else if (escolhaCadastro === "4") {
        this.$("#box_motorista").css("display", "none");
        this.$("#box_veiculo").css("display", "none");
        this.$("#form_documento").css("display", "none");
        this.$("#form_transportadora").css("display", "block");
        this.$("#box_colaborador").css("display", "none");
        this.$("#box_empresa").css("display", "none");
      }
      else if (escolhaCadastro === "5") {
        this.$("#box_motorista").css("display", "none");
        this.$("#box_veiculo").css("display", "none");
        this.$("#form_documento").css("display", "none");
        this.$("#form_transportadora").css("display", "none");
        this.$("#box_colaborador").css("display", "block");
        this.$("#box_empresa").css("display", "none");
      }
      else if (escolhaCadastro === "6") {
        this.$("#box_motorista").css("display", "none");
        this.$("#box_veiculo").css("display", "none");
        this.$("#form_documento").css("display", "none");
        this.$("#form_transportadora").css("display", "none");
        this.$("#box_colaborador").css("display", "none");
        this.$("#box_empresa").css("display", "block");
      }
      else {
        this.$("#box_motorista").css("display", "none");
        this.$("#box_veiculo").css("display", "none");
        this.$("#form_documento").css("display", "none");
        this.$("#form_transportadora").css("display", "none");
      }
    },
    "change #box_veiculo #tipo": function()
    {
      if (this.$("#box_veiculo #tipo").val() == "6") {
        this.$("#box_veiculo #cx_tanque").css("display", "none");
      }
      else {
        this.$("#box_veiculo #cx_tanque").css("display", "block");
      }
    },
    "change .form-trecho": function(event)
    {
      var $currentTarget = this.$(event.currentTarget);

      if ($currentTarget.val() === "T2") {
        $currentTarget.parents("form").find(".form-planta").val(0).prop("disabled", true);
      }
      else if ($currentTarget.val() === "T1") {
        $currentTarget.parents("form").find(".form-planta").val(0).prop("disabled", false);
      }
      else {
        //
      }
  },
  "click #salvar_documento": "salvarDadosDocumento",
  "click #salvar_motorista": "salvarDadosDocumento",
  "click #salvar_veiculo": "salvarDadosDocumento",
  "submit .form-transportadora": "salvarDadosDocumento",
  "keyup #box_veiculo #busca_regiao_leiteira": function(event) {
      if (event.which == 13 || event.which == 32 && $("#box_veiculo #busca_regiao_leiteira").val().length >= 3){
        $.ajax({
          url : "/" + this.model.get("api_path") + "/cartorial/regiaoleiteiraget/"+$("#box_veiculo #busca_regiao_leiteira").val()
        }).done(function(retorno){
            var option = "";
            for(var i = 0; i < retorno.qtdados; i++){
              option += '<option value="'+ retorno.dados[i].codigo_subdistrito +'" class="dinamico" id="d'+ i +'">'+ retorno.dados[i].nome_distrito +'</option>';
            }

            $("#box_veiculo #regiao_leiteira_id .oculto").css("display", "none");
            $("#box_veiculo #regiao_leiteira_id .dinamico").remove();
            $("#box_veiculo #regiao_leiteira_id").append(option);
            $("#box_veiculo #regiao_leiteira_id #d0").attr("selected", "selected");
        });
      }
      if (event.which == 8 && $("#box_veiculo #busca_regiao_leiteira").val().length < 3){
        $("#box_veiculo #regiao_leiteira_id .dinamico").remove();
        $("#box_veiculo #regiao_leiteira_id .oculto").css("display", "block");
      }

    },

    "keyup #box_motorista #busca_regiao_leiteira" : function(event){
      if(event.which == 13 || event.which == 32 && $("#box_motorista #busca_regiao_leiteira").val().length >= 3) {
        $.ajax({
          url : "/" + this.model.get("api_path") + "/cartorial/regiaoleiteiraget/"+$("#box_motorista #busca_regiao_leiteira").val()
        }).done(function(retorno){
            var option = "";
            for(var i = 0; i < retorno.qtdados; i++){
              option += '<option value="'+ retorno.dados[i].codigo_subdistrito +'" class="dinamico" id="d'+ i +'">'+ retorno.dados[i].nome_distrito +'</option>';
            }

            $("#box_motorista #regiao_leiteira_id .oculto").css("display", "none");
            $("#box_motorista #regiao_leiteira_id .dinamico").remove();
            $("#box_motorista #regiao_leiteira_id").append(option);
            $("#box_motorista #regiao_leiteira_id #d0").attr("selected", "selected");
        });
      }
      if(event.which == 8 && $("#box_motorista #busca_regiao_leiteira").val().length < 3){
        $("#box_motorista #regiao_leiteira_id .dinamico").remove();
        $("#box_motorista #regiao_leiteira_id .oculto").css("display", "block");
      }

    },

    "click #cpf_condutor" : function(){
      $('#box_motorista #cpf_condutor').css('border-color', '');
    },

    // mascara campo telefone
    "keypress #celular": function() {
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
    }
  },
    "validarCPF": function(cpf) {
      cpf = cpf.replace(/[^\d]+/g,'');
      if(cpf == '') return false;
      // Elimina CPFs invalidos conhecidos
      if (cpf.length != 11 ||
          cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999")
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
    },
    "listarTransportadoras": function ()
    {
      this.$('.transportadora').html('<option value="0">TERCEIRO</option>');
      this.$('.form-grupo').html('<option value="0">Selecionar...</option>');
      this.$('.form-planta').html('<option value="0">Selecionar...</option>');
      this.model.get("gruposKit").each(function (grupo) {
        this.$('.form-grupo').append('<option value=' + grupo.get('id') + '>' + grupo.get('nome').toString().toUpperCase() + '</option>');
      }, this);
      this.model.get("regioesKit").each(function (grupo) {
        this.$('.form-planta').append('<option value=' + grupo.get('id') + '>' + grupo.get('nome').toString().toUpperCase() + '</option>');
      }, this);
      this.model.get("prestadoresCol").each(function (grupo) {
        this.$('.transportadora').append('<option value=' + grupo.get('id') + '>' + grupo.get('nome').toString().toUpperCase() + '</option>');
      }, this);
    },
  /*
  salvarDadosMotorista : function(event) {
    var trecho = this.$("#box_motorista .form-trecho").val();
    var grupo = this.$("#motorista_grupo").val();
    // var transportadora_id = $("#motorista_transportadora_id").val();
    var vinculo = $("#box_motorista #vinculo").val();
    var regiao_leiteira_id = this.$("#box_motorista .form-planta").val();
    var nome_condutor = $("#box_motorista #nome_condutor").val();
    var rg_condutor = $("#box_motorista #rg_condutor").val();
    var cpf_condutor = $("#box_motorista #cpf_condutor").val();
    var funcao = $("#box_motorista #funcao").val();
    var nascimento_condutor = $("#box_motorista #nascimento_condutor").val();
    var celular = $("#box_motorista #celular").val();
    var contratacao = $("#box_motorista #contratacao").val();
    var uf = $("#box_motorista #uf").val();

    if(
      trecho == "" || grupo == "0" || (trecho === "T1" && regiao_leiteira_id == "0") ||
      nome_condutor == "" || rg_condutor == "" || cpf_condutor == "" ||
      funcao == "" || nascimento_condutor == "" ||
      celular == "" || vinculo == "" || uf == ""
    ){
      alert("Campos com asterisco (*), devem ser preenchidos.");
      return false;
    }

    if (this.validarCPF(this.$('#box_motorista #cpf_condutor').val()) === false) {
      alert("Coloque um CPF válido!");
      this.$("#box_motorista #cpf_condutor").css("border-color", "#FF0000").focus();
      return false;
    }

    $.ajax({
      url: "/" + this.model.get("api_path") + "/cartorial",
      method: 'POST',
      data: {
        "formulario": "motorista",
        "trecho": trecho,
        "grupo": grupo,
        "vinculo": vinculo,
        "regiao": regiao_leiteira_id,
        "nome": nome_condutor,
        "rg": rg_condutor,
        "cpf": cpf_condutor,
        "funcao": funcao,
        "nascimento": nascimento_condutor,
        "celular": celular,
        "contratacao": contratacao,
        "uf": uf
      }
    }).done(function(retorno){
      window.location.href = "#!/cartorial/?page=1";
    }).fail(function(retorno) {
      alert("Um erro ocorreu!");
    });
  },
  */
  // form_documento
  salvarDadosDocumento: function salvarDadosDocumento(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    var dados = this.$(event.currentTarget).closest("form").serialize();
    $.ajax({
      "url": adagio.environment.getEndpoint("cartorial"),
      "method": "POST",
      "data": dados,
      "context": this
    })
    .then(function (data, textStatus, jqXHR) {
      return jqXHR;
    }, function (jqXHR, textStatus, errorThrown) {
      alert("Um erro ocorreu!");
      return jqXHR;
    });
  },
  /*
  salvarDadosVeiculo: function() {
    var trecho = this.$("#box_veiculo .form-trecho").val(),
      grupo = this.$("#veiculo_grupo").val(),
      // transportadora_id = this.$("#veiculo_transportadora_id").val(),
      vinculo = $("#box_veiculo #vinculo").val(),
      regiao_leiteira_id = this.$("#box_veiculo .form-planta").val(),
      marca_veiculo = $("#box_veiculo #marca_veiculo").val(),
      modelo_veiculo = $("#box_veiculo #modelo_veiculo").val(),
      ano_veiculo = $("#box_veiculo #ano_veiculo").val(),
      inicio_operacao = $("#box_veiculo #inicio_operacao").val(),
      renavam = $("#box_veiculo #renavam").val(),
      placa_veiculo = $("#box_veiculo #placa_veiculo").val(),
      numero_tanque = $("#box_veiculo #numero_tanque").val(),
      proprietario_tanque_id = $("#box_veiculo #proprietario_tanque_id").val(),
      tipo = $("#box_veiculo #tipo").val();

    //validação
    if(
      trecho == "" || grupo == "0" || (trecho === "T1" && regiao_leiteira_id == "0") ||
      marca_veiculo == "" || modelo_veiculo == "" || ano_veiculo == "" ||
      inicio_operacao == "" || renavam == "" || placa_veiculo == "" || tipo == "" ||
      proprietario_tanque_id == "" || vinculo == ""
    ){
      alert("Campos com asterisco (*), devem ser preenchidos.");
      return false;
    }

    // passagem de valores para o controller
    $.ajax({
      url: "/" + this.model.get("api_path") + "/cartorial",
      method: "POST",
      data: {
        "formulario": "veiculo",
        "trecho": trecho,
        // "transportadora": transportadora_id,
        "grupo": grupo,
        "vinculo": vinculo,
        "regiao": regiao_leiteira_id,
        "marca": marca_veiculo,
        "modelo": modelo_veiculo,
        "ano": ano_veiculo,
        "iniciooperacao": inicio_operacao,
        "renavam": renavam,
        "placa": placa_veiculo,
        "numerotanque": numero_tanque,
        "proprietariotanque": proprietario_tanque_id,
        "tipo": tipo
      }
    }).done(function(retorno){
      if(retorno == "true"){
        alert("Dados do veículo inseridos.");
        window.location.href = "#!/cartorial/?page=1";
      } else {
        alert(retorno);
      }
    });
  },
  */
    template: _.template (`
    <style>
      a {color: #5c7995;}
      .space{padding: 10px 0 10px 0;}
      .s_campos{margin-bottom: 15px;}
      .s_labels{padding-bottom: 5px;}
      .erro{border-color : $FF0000;}
      .off{display: none;}
      .verificar_vencidos {padding: 10px 15px; cursor: pointer;}
    </style>

    <div id="modalVencidos"></div>

    <div class="container-fluid">
      <div class="row" id="escolha_cadastro">
        <div class="col-sm-12">
          <div class="panel">
            <form class="form-horizontal panel-body">
              <h4>Escolha o tipo do cadastro</h4>
              <select class="form-control">
                <option value="0">Selecionar...</option>
                <% adagio.get("pastas").each(function (pasta) { %>
                <option value="<%= pasta.get("id") %>"><%= pasta.get("titulo") %></option>
                <% }); %>
              </select>
            </form>
          </div>
        </div>
      </div>

<div class="row off" id="form_documento">
  <div class="col-sm-12">
  <div class="panel panel-default">
  <form class="form-horizontal panel-body">
    <input type="hidden" value="documento" name="formulario">
    <div class="row">

      <div class="col-sm-4 s_campos">
        <label for="form_documento_grupos" class="control-label s_labels">Grupos*</label>
        <select name="grupos[]" class="form-control form-grupo" id="form_documento_grupos" multiple size="10" required></select>
      </div>

      <div class="col-sm-8 s_campos">
        <div class="row">
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.TIPO-->
            <!--------------TIPOS.ID-->
            <label class="control-label s_labels" for="documento_tipo">Esp&eacute;cie</label>
            <select id="documento_tipo" class="form-control form-tipo" name="tipo">
              <option value="0" class="oculto">Selecionar...</option>
              <option value="29" class="oculto">Ap&oacute;lice RCTR-C</option>
              <option value="30" class="oculto">Ap&oacute;lice RC Ambiental</option>
              <option value="31" class="oculto">Ap&oacute;lice ALL RISKS/LMI</option>
            </select>
          </div>
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.#28-->
            <!---------------CODIGO-->
            <label class="control-label s_labels" for="susep">SUSEP</label>
            <input type="number" class="form-control form-susep" id="susep" name="susep">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.#16-->
            <!----------RG_CONDUTOR-->
            <label class="control-label s_labels" for="apolice">Ap&oacute;lice</label>
            <input type="number" class="form-control form-apolice" name="apolice" id="apolice">
          </div>
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.#13-->
            <!--------NOME_CONDUTOR-->
            <label class="control-label s_labels" for="seguradora">Seguradora</label>
            <input type="text" class="form-control form-seguradora" id="seguradora" name="seguradora">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.#14-->
            <!--------------CELULAR-->
            <label class="control-label s_labels" for="indenizacao">Indeniza&ccedil;&atilde;o</label>
            <input type="number" class="form-control form-indenizacao" name="indenizacao" id="indenizacao">
          </div>
          <div class="col-sm-6 s_campos">
            <!--CARTORIAL_DADOS.#19-->
            <!---------------CHASSI-->
            <label class="control-label s_labels" for="cnpj">CNPJ</label>
            <input type="number" class="form-control form-cnpj" id="cnpj" name="cnpj">
          </div>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-xs-12">
        <p class="text-right">
          <button type="button" class="btn btn-primary" id="salvar_documento">Salvar</button>
        </p>
      </div>
    </div>
  </form>
  </div>
  </div>
</div>

<div class="row off" id="form_transportadora">
<div class="col-sm-12">
<div class="panel panel-default">
<form class="form-horizontal panel-body form-transportadora">
  <input type="hidden" value="transportadora" name="formulario">
  <div class="row">

    <div class="col-sm-4 s_campos">
      <label for="form_documento_grupos" class="control-label s_labels">Grupos*</label>
      <select name="grupos[]" class="form-control form-grupo" id="form_documento_grupos" multiple size="10" required></select>
    </div>

    <div class="col-sm-8 s_campos">
      <div class="row">
        <div class="col-sm-6 s_campos">
          <!--CARTORIAL_DADOS.TIPO-->
          <!--------------TIPOS.ID-->
          <label class="control-label s_labels" for="transportadora_titulo">Raz&atilde;o Social</label>
          <input type="text" id="transportadora_titulo" class="form-control" name="titulo" required>
        </div>
        <div class="col-sm-6 s_campos">
          <!--CARTORIAL_DADOS.#28-->
          <!---------------CODIGO-->
          <label class="control-label s_labels" for="transportadora_cnpj">CNPJ</label>
          <input pattern="[0-9]{11,14}" class="form-control" id="transportadora_cnpj" name="cnpj" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 s_campos">
          <!--CARTORIAL_DADOS.#16-->
          <!----------RG_CONDUTOR-->
          <label class="control-label s_labels" for="transportadora_endereco">Endere&ccedil;o</label>
          <input type="text" class="form-control" name="endereco" id="transportadora_endereco">
        </div>
        <div class="col-sm-6 s_campos">
          <!--CARTORIAL_DADOS.#13-->
          <!--------NOME_CONDUTOR-->
          <label class="control-label s_labels" for="transportadora_telefone">Telefone</label>
          <input type="text" class="form-control" id="transportadora_telefone" name="telefone">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 s_campos">
          <!--CARTORIAL_DADOS.#14-->
          <!--------------CELULAR-->
          <label class="control-label s_labels" for="transportadora_responsavel">Representante</label>
          <input type="text" class="form-control" name="responsavel" id="transportadora_responsavel">
        </div>
        <div class="col-sm-6 s_campos">
          <!--CARTORIAL_DADOS.#19-->
          <!---------------CHASSI-->
          <label class="control-label s_labels" for="cnpj">E-mail</label>
          <input type="email" class="form-control" id="transportadora_email" name="email">
        </div>
      </div>
    </div>

  </div>
  <div class="row">
    <div class="col-xs-12">
      <p class="text-right">
        <button type="submit" class="btn btn-primary" id="salvar_transportadora">Salvar</button>
      </p>
    </div>
  </div>
</form>
</div>
</div>
</div>

      <div class="row off" id="box_motorista"><!--ini cadastro motorista-->
        <div class="col-sm-12"><!--ini row principal-->
          <div class="panel panel-default"><!--ini card -->
            <form class="form-horizontal panel-body">
              <input type="hidden" name="formulario" value="motorista">
              <div class="row">
<div class="col-sm-2 s_campos">
  <label class="control-label s_labels">Opera&ccedil;&atilde;o*</label>
  <select id="motorista_trecho" class="form-control form-trecho" name="operacao">
  <option value="0">Selecionar...</option>
  <% adagio.get("operacoes").each(function (operacao) { %>
  <option value="<%= operacao.get("id") %>"><%= operacao.get("titulo") %></option>
  <% }); %>
  </select>
</div>

<div class="col-sm-5 s_campos">
  <label for="motorista_grupo" class="control-label s_labels">Grupo*</label>
  <select name="grupos[]" class="form-control form-grupo" id="motorista_grupo"></select>
</div>

<div class="col-sm-5 s_campos">
  <label class="control-label s_labels">Planta</label>
  <select id="motorista_regiao_leiteira_id" class="form-control form-planta" name="regiao_leiteira_id"></select>
</div>

              </div>
              <div class="row">

                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Vínculo Frota*</label>
                  <select class="form-control" id="vinculo" name="vinculo">
                    <option value="">---------</option>
                    <option value="1">Próprio</option>
                    <option value="2">Agregado</option>
                  </select>
                </div>

                <div class="col-sm-6 s_campos">
                  <label class="control-label s_labels">Nome*</label>
                  <input name="nome_condutor" type="text" id="nome_condutor" class="form-control" placeholder="Digite o nome"/>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">RG*</label>
                  <input name="rg_condutor" type="text" id="rg_condutor" maxlength="11" class="form-control" placeholder="Digite o RG"/>
                </div>

                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">CPF*</label>
                  <input name="cpf_condutor" type="text" id="cpf_condutor" class="form-control" maxlength="11" placeholder="Digite o CPF"/>
                </div>

                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Função*</label>
                  <select class="form-control" id="funcao" name="funcao">
                    <option value="">--</option>
                    <option value="1">Motorista</option>
                  </select>
                </div>

                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">UF*</label>
                  <select class="form-control" id="uf" name="uf">
                    <option value="">--</option>
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
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Nascimento*</label>
                  <div class="input-group date">
                    <input name="nascimento_condutor" id="nascimento_condutor" type="text" class="form-control" placeholder="DD/MM/AAAA" maxlength="10" readonly="readonly"/>
                    <span class="input-group-addon">
                      <i class="fa fa-fw fa-calendar"></i>
                    </span>
                  </div>
                </div>

                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Celular*</label>
                  <input name="celular" type="text" id="celular" class="form-control" placeholder="Digite o celular" maxlength="14"/>
                </div>

                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Contratação</label>
                  <div class="input-group date">
                    <input name="contratacao" id="contratacao" type="text" class="form-control" placeholder="DD/MM/AAAA" maxlength="10" readonly="readonly"/>
                    <span class="input-group-addon">
                      <i class="fa fa-fw fa-calendar"></i>
                    </span>
                  </div>
                </div>

              </div>

              <div class="row"><hr></div>

              <fieldset>
                <div class="col-sm-offset-11">
                  <button type="button" class="btn btn-primary btn-block" id="salvar_motorista">Salvar</button>
                </div>
              </fieldset>
            </form>
          </div><!--fim card-->
        </div><!--fim row principal-->
      </div><!--fim cadastro motorista-->

      <div class="row off" id="box_veiculo"><!--ini cadastro veículo-->
        <div class="col-sm-12"><!--ini row principal-->
          <div class="panel panel-default"><!--ini card-->
            <form class="form-horizontal panel-body">
              <input type="hidden" name="formulario" value="veiculo">
              <div class="row">
                <div class="col-sm-2 s_campos">
                  <label class="control-label s_labels">Opera&ccedil;&atilde;o*</label>
                  <select id="veiculo_trecho" name="operacao" class="form-control form-trecho">
  <option value="0">Selecionar...</option>
  <% adagio.get("operacoes").each(function (operacao) { %>
  <option value="<%= operacao.get("id") %>"><%= operacao.get("titulo") %></option>
  <% }); %>
                  </select>
                </div>

<div class="col-sm-5 s_campos">
  <label for="veiculo_grupo" class="control-label s_labels">Grupo*</label>
  <select name="grupos[]" class="form-control form-grupo" id="veiculo_grupo"></select>
</div>

<div class="col-sm-5 s_campos">
  <label class="control-label s_labels">Planta</label>
  <select id="veiculo_regiao_leiteira_id" class="form-control form-planta" name="regiao"></select>
</div>
              </div>
              <div class="row">

                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Vínculo Frota*</label>
                  <select class="form-control" id="vinculo" name="vinculo">
                    <option value="">--</option>
                    <option value="1">Próprio</option>
                    <option value="2">Agregado</option>
                  </select>
                </div>

                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Início da operação*</label>
                  <div class="input-group date">
                    <input name="inicio_operacao" id="inicio_operacao" type="text" class="form-control" placeholder="DD/MM/AAAA" maxlength="10" readonly="readonly"/>
                    <span class="input-group-addon">
                      <i class="fa fa-fw fa-calendar"></i>
                    </span>
                  </div>
                </div>
                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">RENAVAM*</label>
                  <input name="renavam" id="renavam" type="text" class="form-control" maxlength="11" placeholder="Digite o RENAVAM"/>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Marca do ve&iacute;culo*</label>
                  <input name="marca_veiculo" type="text" id="marca_veiculo" class="form-control" placeholder="Digite a marca"/>
                </div>
                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Modelo do ve&iacute;culo*</label>
                  <input name="modelo_veiculo" type="text" id="modelo_veiculo" class="form-control" placeholder="Digite o modelo"/>
                </div>
                <div class="col-sm-3 s_campos">
                  <label class="control-label s_labels">Ano do modelo*</label>
                  <input name="ano_veiculo" type="text" id="ano_veiculo" class="form-control" placeholder="Digite o ano" maxlength="4"/>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-6 s_campos">
                  <label class="control-label s_labels">Proprietário do tanque*</label>
                  <select class="form-control transportadora" id="proprietario_tanque_id" name="proprietariotanque">
                    <option value="">--</option>
                    <!--conteudo dinâmico-->
                  </select>
                </div>

                <div class="col-sm-2 s_campos">
                  <label class="control-label s_labels">Placa*</label>
                  <input name="placa_veiculo" id="placa_veiculo" type="text" class="form-control" placeholder="Digite a placa" maxlength="7"/>
                </div>

                <div class="col-sm-2 s_campos">
                  <label class="control-label s_labels">Tipo*</label>
                  <select class="form-control" id="tipo" name="tipo">
                    <option value="0">--</option>
                    <option value="5">Toco</option>
                    <option value="11">Trucado</option>
                    <option value="12">Bidirecional</option>                      
                    <option value="6">Cavalo Mec&acirc;nico</option>
                    <option value="10">Reboque</option>
                    <option value="8">Semirreboque</option>
                    <option value="9">Vanderl&eacute;ia</option>
                  </select>
                </div>

                <div class="col-sm-2 s_campos" id="cx_tanque">
                  <label class="control-label s_labels">Número do tanque</label>
                  <input name="numero_tanque" id="numero_tanque" type="text" class="form-control" placeholder="Digite o n° tanque"/>
                </div>

              </div>

              <div class="row"><hr></div>

              <fieldset>
                <div class="col-sm-offset-11">
                  <button type="button" class="btn btn-primary btn-block" id="salvar_veiculo">Salvar</button>
                </div>
              </fieldset>
            </form>
          </div><!--fim card-->
        </div><!--fim row principal-->
      </div><!--fim cadastro veículo-->
    </div>
    `, {"variable": "adagio"}),
    initialize: function ()
    {
        try {
            this.getJSON(adagio.environment.getEndpoint("prestadores")).load("web").release();
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
            this.$('.date').datepicker({format: 'dd/mm/yyyy', language: 'pt-BR', autoclose: true});
            this.listarTransportadoras();
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