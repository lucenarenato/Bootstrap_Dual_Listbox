{
  tagName: "div",
  id: "adagio-home",
  className: "ponto-novo",
  events: {
    "change #escolha_cadastro select": function()
    {
      var escolhaCadastro = this.$("#escolha_cadastro select").val();
      $uf_selected = "";

      if (escolhaCadastro == "1") {
        this.$("#box_pontos_acionamento").css("display", "block");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none");
        //$uf_id = "";
        $municipio_id = "#box_pontos_acionamento #acionamento_municipio_id";        
        $($municipio_id+" .dinamico").remove();
        $("#acionamento_uf_id").val(0);

        //alert(this.model.get("ufsCol")) ;
      }
      else if(escolhaCadastro == "2") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "block");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none");

        $municipio_id = "#box_pontos_combustivel #combustivel_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#combustivel_uf_id").val(0);
      }
      else if(escolhaCadastro == "3") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "block");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none");

        $municipio_id = "#box_pontos_erb #erb_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#erb_uf_id").val(0);
      }
      else if(escolhaCadastro == "4") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "block");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none");

        $municipio_id = "#box_pontos_hospedagem #hospedagem_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#hospedagem_uf_id").val(0);
      }
      else if(escolhaCadastro == "5") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "block");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");

        $municipio_id = "#box_pontos_pedagio #pedagio_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#pedagio_uf_id").val(0);
      }
      else if(escolhaCadastro == "6") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "block");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none"); 

        $municipio_id = "#box_pontos_policia #policia_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#policia_uf_id").val(0);
      }
      else if(escolhaCadastro == "7") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "block");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none");

        $municipio_id = "#box_pontos_prestador #prestador_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#prestador_uf_id").val(0);
      }    
      else if(escolhaCadastro == "8") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "block");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none");

        $municipio_id = "#box_pontos_referencia #referencia_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#referencia_uf_id").val(0);
      }  
      else if(escolhaCadastro == "9") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "block");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none");

        $municipio_id = "#box_pontos_risco #risco_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#risco_uf_id").val(0);
      } 
      else if(escolhaCadastro == "10") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "block");
        this.$("#box_pontos_transportadora").css("display", "none");
        
        $municipio_id = "#box_pontos_rodoviario #rodoviario_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#rodoviario_uf_id").val(0);
      }
      else if(escolhaCadastro == "11") {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "block");

        $municipio_id = "#box_pontos_transportadora #transportadora_municipio_id";
        $($municipio_id+" .dinamico").remove();
        $("#transportadora_uf_id").val(0);
      }                                   
      else {
        this.$("#box_pontos_acionamento").css("display", "none");
        this.$("#box_pontos_combustivel").css("display", "none");
        this.$("#box_pontos_erb").css("display", "none");
        this.$("#box_pontos_hospedagem").css("display", "none");
        this.$("#box_pontos_pedagio").css("display", "none");
        this.$("#box_pontos_policia").css("display", "none");
        this.$("#box_pontos_prestador").css("display", "none");
        this.$("#box_pontos_referencia").css("display", "none");
        this.$("#box_pontos_risco").css("display", "none");
        this.$("#box_pontos_rodoviario").css("display", "none");
        this.$("#box_pontos_transportadora").css("display", "none");
      }

    },

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
    "click #salvar_pontos_combustivel": "salvarDadosDocumento",
    "click #salvar_pontos_erb": "salvarDadosDocumento",
    "click #salvar_pontos_hospedagem": "salvarDadosDocumento",
    "click #salvar_pontos_pedagio": "salvarDadosDocumento",
    "click #salvar_pontos_policia": "salvarDadosDocumento",
    "click #salvar_pontos_prestador": "salvarDadosDocumento",
    "click #salvar_pontos_referencia": "salvarDadosDocumento",
    "click #salvar_pontos_risco": "salvarDadosDocumento",
    "click #salvar_pontos_rodoviario": "salvarDadosDocumento",
    "click #salvar_pontos_transportadora": "salvarDadosDocumento",
    "click #incluirTelefoneCombustivel": "incluirTelefoneCombustivel",
    "click #incluirEmailCombustivel": "incluirEmailCombustivel",
    "click #incluirTelefonePolicia": "incluirTelefonePolicia",
    "click #incluirEmailPolicia": "incluirEmailPolicia",
    "click #incluirTelefonePrestador": "incluirTelefonePrestador",
    "click #incluirEmailPrestador": "incluirEmailPrestador",
    "click #incluirTelefoneReferencia": "incluirTelefoneReferencia",
    "click #incluirEmailReferencia": "incluirEmailReferencia",
    "click #incluirTelefoneTransportadora": "incluirTelefoneTransportadora",
    "click #incluirEmailTransportadora": "incluirEmailTransportadora",        
    //"click #salvar_motorista": "salvarDadosMotorista",
    //"click #salvar_veiculo": "salvarDadosVeiculo",
  },

  incluirTelefoneCombustivel: function incluirTelefoneCombustivel(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=telefones]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="telefones[<%= adagio.indice %>]" class="col-sm-1 control-label">Telefone</label>
                <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" name="ddd[<%= adagio.indice %>]" value=""><p class="help-block">DDD</p></div>
                <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength= "16" id="telefones[<%= adagio.indice %>]" name="telefones[<%= adagio.indice %>]" value=""><p class="help-block">Número</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"numero_telefone": this.numero_telefone, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },

    incluirEmailCombustivel: function incluirEmailCombustivel(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=emails]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="emails[<%= adagio.indice %>]" class="col-sm-1 control-label">E-mail</label>
                <div class="col-sm-3"><input class="form-control email" type="text" id="emails[<%= adagio.indice %>]" name="emails[<%= adagio.indice %>]" value=""><p class="help-block">Endereço E-mail</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"email": this.email, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },

  incluirTelefonePolicia: function incluirTelefonePolicia(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=telefones]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="telefones[<%= adagio.indice %>]" class="col-sm-1 control-label">Telefone</label>
                <div class="col-sm-3"><input class="form-control" type="text" maxlength= "2" name="ddd[<%= adagio.indice %>]" value=""><p class="help-block">DDD</p></div>
                <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength= "16" id="telefones[<%= adagio.indice %>]" name="telefones[<%= adagio.indice %>]" value=""><p class="help-block">Número</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"numero_telefone": this.numero_telefone, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },

    incluirEmailPolicia: function incluirEmailPolicia(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=emails]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="emails[<%= adagio.indice %>]" class="col-sm-1 control-label">E-mail</label>
                <div class="col-sm-3"><input class="form-control email" type="text" id="emails[<%= adagio.indice %>]" name="emails[<%= adagio.indice %>]" value=""><p class="help-block">Endereço E-mail</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"email": this.email, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },

  incluirTelefonePrestador: function incluirTelefonePrestador(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=telefones]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="telefones[<%= adagio.indice %>]" class="col-sm-1 control-label">Telefone</label>
                <div class="col-sm-3"><input class="form-control" type="text" maxlength= "2" name="ddd[<%= adagio.indice %>]" value=""><p class="help-block">DDD</p></div>
                <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength= "16" id="telefones[<%= adagio.indice %>]" name="telefones[<%= adagio.indice %>]" value=""><p class="help-block">Número</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"numero_telefone": this.numero_telefone, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },

    incluirEmailPrestador: function incluirEmailPrestador(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=emails]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="emails[<%= adagio.indice %>]" class="col-sm-1 control-label">E-mail</label>
                <div class="col-sm-3"><input class="form-control email" type="text" id="emails[<%= adagio.indice %>]" name="emails[<%= adagio.indice %>]" value=""><p class="help-block">Endereço E-mail</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"email": this.email, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },  

  incluirTelefoneReferencia: function incluirTelefoneReferencia(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=telefones]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="telefones[<%= adagio.indice %>]" class="col-sm-1 control-label">Telefone</label>
                <div class="col-sm-3"><input class="form-control" type="text" maxlength= "2" name="ddd[<%= adagio.indice %>]" value=""><p class="help-block">DDD</p></div>
                <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength= "16" id="telefones[<%= adagio.indice %>]" name="telefones[<%= adagio.indice %>]" value=""><p class="help-block">Número</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"numero_telefone": this.numero_telefone, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },

    incluirEmailReferencia: function incluirEmailReferencia(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=emails]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="emails[<%= adagio.indice %>]" class="col-sm-1 control-label">E-mail</label>
                <div class="col-sm-3"><input class="form-control email" type="text" id="emails[<%= adagio.indice %>]" name="emails[<%= adagio.indice %>]" value=""><p class="help-block">Endereço E-mail</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"email": this.email, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },  

  incluirTelefoneTransportadora: function incluirTelefoneTransportadora(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=telefones]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="telefones[<%= adagio.indice %>]" class="col-sm-1 control-label">Telefone</label>
                <div class="col-sm-3"><input class="form-control" type="text" maxlength= "2" name="ddd[<%= adagio.indice %>]" value=""><p class="help-block">DDD</p></div>
                <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength= "16" id="telefones[<%= adagio.indice %>]" name="telefones[<%= adagio.indice %>]" value=""><p class="help-block">Número</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"numero_telefone": this.numero_telefone, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },

    incluirEmailTransportadora: function incluirEmailTransportadora(event)
  {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=emails]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="emails[<%= adagio.indice %>]" class="col-sm-1 control-label">E-mail</label>
                <div class="col-sm-3"><input class="form-control email" type="text" id="emails[<%= adagio.indice %>]" name="emails[<%= adagio.indice %>]" value=""><p class="help-block">Endereço E-mail</p></div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"email": this.email, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
  },  

  // form_documento
  salvarDadosDocumento: function salvarDadosDocumento(event) {
      //alert(this.$(event.currentTarget).closest("form").serialize());
    var dados =  this.$(event.currentTarget).closest("form").serialize()+'&uf_selected='+$uf_selected;
   // alert(this.$(event.currentTarget).;
    //alert($uf_selected);

    $.ajax({
      "url": adagio.environment.getEndpoint("ponto"),
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
                <option value="1">Ocorrência</option>
                <option value="2">Posto de Combustível</option>
                <option value="3">ERB</option>
                <option value="4">Hospedagem</option>
                <option value="5">Pedágio</option>
                <option value="6">Unidade Policial</option>
                <option value="7">Prestador FEDERAl ST</option>
                <option value="8">Ponto Notável</option>
                <option value="9">Risco de Parada e Pernoite</option>
                <option value="10">Risco Rodoviário</option>
                <option value="11">Transportadora</option>
              </select>
            </form>
          </div>
        </div>
      </div>

      <div class="row off" id="box_pontos_acionamento"><!--ini cadastro pontos_acionamento-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="pontos_acionamento">
                      <div class="row">
                          <div class="col-sm-8 s_campos">
                              <label class="control-label s_labels">Nome Central*</label>
                              <input name="nome_central" type="text" id="nome_central_id" class="form-control" placeholder="Digite o nome da central"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Latitude*</label>
                              <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Longitude*</label>
                              <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Endereço</label>
                              <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                          </div>
                          <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF</label>
                            <select name="uf" class="form-control form-uf" id="acionamento_uf_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Município</label>
                              <select name="municipio" class="form-control form-municipio" id="acionamento_municipio_id">
                              <option value="0" class="oculto">Selecionar...</option>
                              </select>
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-4 s_campos">
                        <label class="control-label s_labels">Unidade Tração</label>
                        <input name="placas[unidadeTracao]" type="text" id="inputTracao" class="form-control" placeholder="Digite a placa do veículo"/>
                        <p class="help-block pongs-0">Placa Ve&iacute;culo</p>
                        </div>
                        <div class="col-sm-4 s_campos">
                        <label class="control-label s_labels">Implemento</label>
                        <input name="placas[implemento1]" type="text" id="primeiroImplemento" class="form-control" placeholder="Digite a placa do veículo"/>
                        <p class="help-block pongs-0">Placa Ve&iacute;culo</p>
                        </div>
                        <div class="col-sm-4 s_campos">
                        <label class="control-label s_labels">Implemento</label>
                        <input name="placas[implemento2]" type="text" id="segundoImplemento" class="form-control" placeholder="Digite a placa do veículo"/>
                        <p class="help-block pongs-0">Placa Ve&iacute;culo</p>
                        </div>
                      </div>                
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_acionamento">Salvar</button>
                          </div>
                      </fieldset>
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro pontos_acionamento-->

      <div class="row off" id="box_pontos_combustivel"><!--ini cadastro pontos_combustivel-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="pontos_combustivel">
                      <div class="row">
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Nome*</label>
                              <input name="nome" type="text" id="nome_id" class="form-control" placeholder="Digite o nome do Posto de Combustível"/>
                          </div>
                          <div class="col-sm-4 s_campos">
                          <label class="control-label s_labels">Descrição Local</label>
                          <input name="descricao" type="text" id="descricao_id" class="form-control" placeholder="Digite a descrição do local"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Latitude*</label>
                              <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Longitude*</label>
                              <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Endereço</label>
                              <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                          </div>
                          <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF</label>
                            <select name="uf" class="form-control form-uf" id="combustivel_uf_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Município</label>
                              <select name="municipio" class="form-control form-municipio" id="combustivel_municipio_id">
                              <option value="0" class="oculto">Selecionar...</option>
                              </select>
                          </div>
                      </div>
                      <% var _this = this; _.each (adagio.get ('telefones'), function (telefone, i) { %>
                        <fieldset>
                            <div class="form-group">
                                <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                                <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" name="ddd[<%= i %>]" value="<%= telefone.ddd %>"><p class="help-block">DDD</p></div>
                                <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength="16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.numero %>"><p class="help-block">Número</p></div>
                            </div>
                        </fieldset>
                      <% }); %> 
                      <fieldset>
                        <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefoneCombustivel"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
                      </fieldset>      
                      <% var _this = this; _.each (adagio.get ('emails'), function (email, i) { %>
                        <fieldset>
                            <div class="form-group">
                                <label for="emails[<%= i %>]" class="col-sm-1 control-label">Email</label>                                
                                <div class="col-sm-3"><input class="form-control email" type="text" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.email %>"><p class="help-block">Endereço E-mail</p></div>
                            </div>
                        </fieldset>
                      <% }); %> 
                      <fieldset>
                        <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirEmailCombustivel"><i class="fa fa-fw fa-plus"></i> Incluir E-mail</a></div></div>
                      </fieldset>    
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_combustivel">Salvar</button>
                          </div>
                      </fieldset>
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro pontos_combustivel-->

      <div class="row off" id="box_pontos_erb"><!--ini cadastro pontos_erb-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="pontos_erb">
                      <div class="row">
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Título*</label>
                              <input name="titulo" type="text" id="titulo_id" class="form-control" placeholder="Digite o Título"/>
                          </div>
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Operadora*</label>
                              <input name="operadora" type="text" id="operadora_id" class="form-control" placeholder="Digite a operadora"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Latitude*</label>
                              <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Longitude*</label>
                              <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Endereço*</label>
                              <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                          </div>
                          <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF*</label>
                            <select name="uf" class="form-control form-uf" id="erb_uf_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">Município*</label>
                              <select name="municipio" class="form-control form-municipio" id="erb_municipio_id">
                              <option value="0" class="oculto">Selecionar...</option>
                              </select>
                          </div>
                          <div class="col-sm-3 s_campos">
                            <label class="control-label s_labels">Bairro*</label>
                            <input name="bairro" type="text" id="bairro_id" class="form-control" placeholder="Digite o bairro"/>
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6 s_campos">
                        <label class="control-label s_labels">Latitude Formatada*</label>
                        <input name="latitude_formatada" type="text" id="latitude_formatada_id" class="form-control" placeholder="Digite a latitude formatada"/>
                        </div>
                        <div class="col-sm-6 s_campos">
                        <label class="control-label s_labels">Longitude Formatada*</label>
                        <input name="longitude_formatada" type="text" id="longitude_formatada_id" class="form-control" placeholder="Digite a longitude formatada"/>
                        </div>
                      </div>                
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_erb">Salvar</button>
                          </div>
                      </fieldset>
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro pontos_erb-->

      <div class="row off" id="box_pontos_hospedagem"><!--ini cadastro pontos_hospedagem-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="pontos_hospedagem">
                      <div class="row">
                          <div class="col-sm-8 s_campos">
                              <label class="control-label s_labels">Nome*</label>
                              <input name="nome" type="text" id="nome_id" class="form-control" placeholder="Digite o nome"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Latitude*</label>
                              <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Longitude*</label>
                              <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Endereço</label>
                              <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                          </div>
                          <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF</label>
                            <select name="uf" class="form-control form-uf" id="hospedagem_uf_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Município</label>
                              <select name="municipio" class="form-control form-municipio" id="hospedagem_municipio_id">
                              <option value="0" class="oculto">Selecionar...</option>
                              </select>
                          </div>
                      </div>                            
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_hospedagem">Salvar</button>
                          </div>
                      </fieldset>
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro pontos_hospedagem--> 

      <div class="row off" id="box_pontos_pedagio"><!--ini cadastro pontos_pedagio-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="pontos_pedagio">
                      <div class="row">
                          <div class="col-sm-8 s_campos">
                              <label class="control-label s_labels">Descrição*</label>
                              <input name="descricao" type="text" id="descricao_id" class="form-control" placeholder="Digite o nome"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Latitude*</label>
                              <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Longitude*</label>
                              <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Endereço</label>
                              <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                          </div>
                          <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF</label>
                            <select name="uf" class="form-control form-uf" id="pedagio_uf_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Município</label>
                              <select name="municipio" class="form-control form-municipio" id="pedagio_municipio_id">
                              <option value="0" class="oculto">Selecionar...</option>
                              </select>
                          </div>
                      </div>                                   
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_pedagio">Salvar</button>
                          </div>
                      </fieldset>
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro pontos_pedagio-->     

      <div class="row off" id="box_pontos_policia"><!--ini cadastro pontos_policia-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="pontos_policia">
                      <div class="row">
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Instituição*</label>
                              <input name="instituicao" type="text" id="instituicao_id" class="form-control" placeholder="Digite a instituição"/>
                          </div>
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Departamento</label>
                              <input name="departamento" type="text" id="departamento_id" class="form-control" placeholder="Digite o departamento"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Latitude*</label>
                              <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Longitude*</label>
                              <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-5 s_campos">
                              <label class="control-label s_labels">Endereço</label>
                              <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                          </div>
                          <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF</label>
                            <select name="uf" class="form-control form-uf" id="policia_uf_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-3 s_campos">
                              <label class="control-label s_labels">Município</label>
                              <select name="municipio" class="form-control form-municipio" id="policia_municipio_id">
                              <option value="0" class="oculto">Selecionar...</option>
                              </select>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">CEP</label>
                              <input name="cep" type="text" id="cep_id" class="form-control" placeholder="Digite o cep"/>
                          </div>
                      </div>                      
                      <% var _this = this; _.each (adagio.get ('telefones'), function (telefone, i) { %>
                        <fieldset>
                            <div class="form-group">
                                <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                                <div class="col-sm-3"><input class="form-control" type="text" maxlength= "2" name="ddd[<%= i %>]" value="<%= telefone.ddd %>"><p class="help-block">DDD</p></div>
                                <div class="col-sm-3"><input class="form-control numero_telefone type="text" maxlength= "16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.numero %>"><p class="help-block">Número</p></div>
                            </div>
                        </fieldset>
                      <% }); %> 
                      <fieldset>
                        <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefonePolicia"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
                      </fieldset>      
                      <% var _this = this; _.each (adagio.get ('emails'), function (email, i) { %>
                        <fieldset>
                            <div class="form-group">
                                <label for="emails[<%= i %>]" class="col-sm-1 control-label">Email</label>                                
                                <div class="col-sm-3"><input class="form-control email" type="text" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.email %>"><p class="help-block">Endereço E-mail</p></div>
                            </div>
                        </fieldset>
                      <% }); %> 
                      <fieldset>
                        <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirEmailPolicia"><i class="fa fa-fw fa-plus"></i> Incluir E-mail</a></div></div>
                      </fieldset>                                        
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_policia">Salvar</button>
                          </div>
                      </fieldset>
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro pontos_policia-->  

      <div class="row off" id="box_pontos_prestador"><!--ini cadastro pontos_prestador-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="pontos_prestador">
                      <div class="row">
                          <div class="col-sm-8 s_campos">
                              <label class="control-label s_labels">Nome*</label>
                              <input name="nome" type="text" id="nome_id" class="form-control" placeholder="Digite o nome do prestador"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Latitude*</label>
                              <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Longitude*</label>
                              <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Endereço</label>
                              <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                          </div>
                          <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF</label>
                            <select name="uf" class="form-control form-uf" id="prestador_uf_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Município</label>
                              <select name="municipio" class="form-control form-municipio" id="prestador_municipio_id">
                              <option value="0" class="oculto">Selecionar...</option>
                              </select>
                          </div> 
                      </div>                      
                      <% var _this = this; _.each (adagio.get ('telefones'), function (telefone, i) { %>
                        <fieldset>
                            <div class="form-group">
                                <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                                <div class="col-sm-3"><input class="form-control" type="text" maxlength= "2" name="ddd[<%= i %>]" value="<%= telefone.ddd %>"><p class="help-block">DDD</p></div>
                                <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength= "16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.numero %>"><p class="help-block">Número</p></div>
                            </div>
                        </fieldset>
                      <% }); %> 
                      <fieldset>
                        <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefonePrestador"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
                      </fieldset>      
                      <% var _this = this; _.each (adagio.get ('emails'), function (email, i) { %>
                        <fieldset>
                            <div class="form-group">
                                <label for="emails[<%= i %>]" class="col-sm-1 control-label">Email</label>                                
                                <div class="col-sm-3"><input class="form-control email" type="text" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.email %>"><p class="help-block">Endereço E-mail</p></div>
                            </div>
                        </fieldset>
                      <% }); %> 
                      <fieldset>
                        <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirEmailPrestador"><i class="fa fa-fw fa-plus"></i> Incluir E-mail</a></div></div>
                      </fieldset>                 
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_prestador">Salvar</button>
                          </div>
                      </fieldset>
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro pontos_prestador-->  

      <div class="row off" id="box_pontos_referencia"><!--ini cadastro pontos_referencia-->
      <div class="col-sm-12"><!--ini row principal-->
          <div class="panel panel-default"><!--ini card -->
              <form class="form-horizontal panel-body">
                  <input type="hidden" name="formulario" value="pontos_referencia">
                  <div class="row">
                      <div class="col-sm-4 s_campos">
                          <label class="control-label s_labels">Nome*</label>
                          <input name="nome" type="text" id="nome_id" class="form-control" placeholder="Digite o nome da referência"/>
                      </div>
                      <div class="col-sm-4 s_campos">
                        <label class="control-label s_labels">Descrição</label>
                        <input name="descricao" type="text" id="descricao_id" class="form-control" placeholder="Digite a descrição da referência"/>
                      </div>
                      <div class="col-sm-2 s_campos">
                          <label class="control-label s_labels">Latitude*</label>
                          <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                      </div>
                      <div class="col-sm-2 s_campos">
                          <label class="control-label s_labels">Longitude*</label>
                          <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-sm-6 s_campos">
                          <label class="control-label s_labels">Endereço</label>
                          <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                      </div>
                      <div class="col-sm-2">
                        <label class="control-label s_labels" for="uf">UF</label>
                        <select name="uf" class="form-control form-uf" id="referencia_uf_id">
                          <option value="0">Selecionar...</option>
                          <% adagio.get("ufsCol").each (function (ufs) { %>   
                            <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                          <% }); %>
                        </select>                   
                      </div>
                      <div class="col-sm-4 s_campos">
                          <label class="control-label s_labels">Município</label>
                          <select name="municipio" class="form-control form-municipio" id="referencia_municipio_id">
                          <option value="0" class="oculto">Selecionar...</option>
                          </select>
                      </div> 
                  </div>                      
                  <% var _this = this; _.each (adagio.get ('telefones'), function (telefone, i) { %>
                    <fieldset>
                        <div class="form-group">
                            <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                            <div class="col-sm-3"><input class="form-control" type="text" maxlength= "2" name="ddd[<%= i %>]" value="<%= telefone.ddd %>"><p class="help-block">DDD</p></div>
                            <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength= "16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.numero %>"><p class="help-block">Número</p></div>
                        </div>
                    </fieldset>
                  <% }); %> 
                  <fieldset>
                    <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefoneReferencia"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
                  </fieldset>      
                  <% var _this = this; _.each (adagio.get ('emails'), function (email, i) { %>
                    <fieldset>
                        <div class="form-group">
                            <label for="emails[<%= i %>]" class="col-sm-1 control-label">Email</label>                                
                            <div class="col-sm-3"><input class="form-control email" type="text" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.email %>"><p class="help-block">Endereço E-mail</p></div>
                        </div>
                    </fieldset>
                  <% }); %> 
                  <fieldset>
                    <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirEmailReferencia"><i class="fa fa-fw fa-plus"></i> Incluir E-mail</a></div></div>
                  </fieldset>                 
                  <div class="row"><hr></div>
                  <fieldset>
                      <div class="col-sm-offset-11">
                          <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_referencia">Salvar</button>
                      </div>
                  </fieldset>
              </form>
          </div><!--fim card-->
      </div><!--fim row principal-->
  </div><!--fim cadastro pontos_referencia-->    

        <div class="row off" id="box_pontos_risco"><!--ini cadastro pontos_risco-->
            <div class="col-sm-12"><!--ini row principal-->
                <div class="panel panel-default"><!--ini card -->
                    <form class="form-horizontal panel-body">
                        <input type="hidden" name="formulario" value="pontos_risco">
                        <div class="row">
                            <div class="col-sm-8 s_campos">
                                <label class="control-label s_labels">Descrição*</label>
                                <input name="descricao" type="text" id="descricao_id" class="form-control" placeholder="Digite o nome"/>
                            </div>
                            <div class="col-sm-2 s_campos">
                                <label class="control-label s_labels">Latitude*</label>
                                <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                            </div>
                            <div class="col-sm-2 s_campos">
                                <label class="control-label s_labels">Longitude*</label>
                                <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 s_campos">
                                <label class="control-label s_labels">Endereço</label>
                                <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                            </div>
                            <div class="col-sm-2">
                                <label class="control-label s_labels" for="uf">UF</label>
                                <select name="uf" class="form-control form-uf" id="risco_uf_id">
                                    <option value="0">Selecionar...</option>
                                    <% adagio.get("ufsCol").each (function (ufs) { %>   
                                        <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                                    <% }); %>
                                </select>                   
                            </div>
                            <div class="col-sm-4 s_campos">
                                <label class="control-label s_labels">Município</label>
                                <select name="municipio" class="form-control form-municipio" id="risco_municipio_id">
                                    <option value="0" class="oculto">Selecionar...</option>
                                </select>
                            </div>
                        </div>                                   
                        <div class="row"><hr></div>
                        <fieldset>
                            <div class="col-sm-offset-11">
                                <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_risco">Salvar</button>
                            </div>
                        </fieldset>
                    </form>
                </div><!--fim card-->
            </div><!--fim row principal-->
        </div><!--fim cadastro pontos_risco--> 

    <div class="row off" id="box_pontos_rodoviario"><!--ini cadastro pontos_rodoviario-->
        <div class="col-sm-12"><!--ini row principal-->
            <div class="panel panel-default"><!--ini card -->
                <form class="form-horizontal panel-body">
                    <input type="hidden" name="formulario" value="pontos_rodoviario">
                    <div class="row">
                        <div class="col-sm-8 s_campos">
                            <label class="control-label s_labels">Descrição*</label>
                            <input name="descricao" type="text" id="descricao_id" class="form-control" placeholder="Digite o nome"/>
                        </div>
                        <div class="col-sm-2 s_campos">
                            <label class="control-label s_labels">Latitude*</label>
                            <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                        </div>
                        <div class="col-sm-2 s_campos">
                            <label class="control-label s_labels">Longitude*</label>
                            <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 s_campos">
                            <label class="control-label s_labels">Endereço</label>
                            <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF</label>
                            <select name="uf" class="form-control form-uf" id="rodoviario_uf_id">
                                <option value="0">Selecionar...</option>
                                <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                                <% }); %>
                            </select>                   
                        </div>
                        <div class="col-sm-4 s_campos">
                            <label class="control-label s_labels">Município</label>
                            <select name="municipio" class="form-control form-municipio" id="rodoviario_municipio_id">
                                <option value="0" class="oculto">Selecionar...</option>
                            </select>
                        </div>
                    </div>                                   
                    <div class="row"><hr></div>
                    <fieldset>
                        <div class="col-sm-offset-11">
                            <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_rodoviario">Salvar</button>
                        </div>
                    </fieldset>
                </form>
            </div><!--fim card-->
        </div><!--fim row principal-->
    </div><!--fim cadastro pontos_rodoviario--> 

      <div class="row off" id="box_pontos_transportadora"><!--ini cadastro pontos_transportadora-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="pontos_transportadora">
                      <div class="row">
                          <div class="col-sm-8 s_campos">
                              <label class="control-label s_labels">Nome*</label>
                              <input name="nome" type="text" id="nome_id" class="form-control" placeholder="Digite o nome da transportadora"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Latitude*</label>
                              <input name="latitude" type="text" maxlength= "10" id="latitude" class="form-control" placeholder="Digite a latitude"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Longitude*</label>
                              <input name="longitude" type="text" maxlength= "10" id="longitude" class="form-control" placeholder="Digite a longitude"/>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Endereço</label>
                              <input name="endereco" type="text" id="endereco" class="form-control" placeholder="Digite o endereço"/>
                          </div>
                          <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF</label>
                            <select name="uf" class="form-control form-uf" id="transportadora_uf_id">
                              <option value="0">Selecionar...</option>
                              <% adagio.get("ufsCol").each (function (ufs) { %>   
                                <option class="oculto" value="<%= ufs.id %>"><%= ufs.attributes.uf.toString ().toUpperCase () %></option>
                              <% }); %>
                            </select>                   
                          </div>
                          <div class="col-sm-4 s_campos">
                              <label class="control-label s_labels">Município</label>
                              <select name="municipio" class="form-control form-municipio" id="transportadora_municipio_id">
                              <option value="0" class="oculto">Selecionar...</option>
                              </select>
                          </div>
                      </div>                      
                      <% var _this = this; _.each (adagio.get ('telefones'), function (telefone, i) { %>
                        <fieldset>
                            <div class="form-group">
                                <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                                <div class="col-sm-3"><input class="form-control" type="text" maxlength= "2" name="ddd[<%= i %>]" value="<%= telefone.ddd %>"><p class="help-block">DDD</p></div>
                                <div class="col-sm-3"><input class="form-control numero_telefone type="text"maxlength= "16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.numero %>"><p class="help-block">Número</p></div>
                            </div>
                        </fieldset>
                      <% }); %> 
                      <fieldset>
                        <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefoneTransportadora"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
                      </fieldset>      
                      <% var _this = this; _.each (adagio.get ('emails'), function (email, i) { %>
                        <fieldset>
                            <div class="form-group">
                                <label for="emails[<%= i %>]" class="col-sm-1 control-label">Email</label>                                
                                <div class="col-sm-3"><input class="form-control email" type="email" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.email %>"><p class="help-block">Endereço E-mail</p></div>
                            </div>
                        </fieldset>
                      <% }); %> 
                      <fieldset>
                        <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirEmailTransportadora"><i class="fa fa-fw fa-plus"></i> Incluir E-mail</a></div></div>
                      </fieldset>                   
                      <div class="row"><hr></div>
                      <fieldset>
                          <div class="col-sm-offset-11">
                              <button type="button" class="btn btn-primary btn-block" id="salvar_pontos_transportadora">Salvar</button>
                          </div>
                      </fieldset>
                  </form>
              </div><!--fim card-->
          </div><!--fim row principal-->
      </div><!--fim cadastro pontos_transportadora-->                         

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
      this.$('.date').datepicker({format: 'dd/mm/yyyy', language: 'pt-BR', autoclose: true});
      jQuery(function($) {
        //alert("oi");
        $.mask.definitions['~']='[+-]';
        $('#inputTracao').mask('aaa-9999');
        $('#primeiroImplemento').mask('aaa-9999');
        $('#segundoImplemento').mask('aaa-9999');
        $('#cep_id').mask('99999-999');
        $('#telefone').mask('(99) 9999-9999');
        $('#celular').mask('(99) 9.9999-9999');
    });

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