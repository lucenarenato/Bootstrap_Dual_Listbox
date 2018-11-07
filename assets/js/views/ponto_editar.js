{
    "tagName": "div",
    "id": "adagio-home",
    "className": "adagio-ponto-editar",
    "events": {
        "change .form-uf": function(event)
        {
          
          var $currentTarget = this.$(event.currentTarget);
         // alert('"'+event.currentTarget.id+'"');
          
         // alert($("#"+event.currentTarget.id+" option:selected").text());
            //alert($currentTarget.val());
          
    
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
            $uf_selected = 0;
          }
        },

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

    carregarMunicipio: function(uf_id, municipio_id, nome_uf){
        //if(uf_id == null){
        //    uf_id = 0;
        //}
        
        if(uf_id !== 0)
        {
           
            $.ajax({
                url: adagio.environment.getEndpoint("ufs/"+uf_id),
                //data: $currentTarget.val(),
                //context: _this,
                global: false
            }).done(function (retorno) {          
            
                var option = "";
                var uf_selecionado = null;

                for(var i = 0; i < retorno.qtdados; i++){
               // if(retorno.dados[i].municipio === municipio_id){
                //    uf_selecionado =  retorno.dados[i].nome_municipio;
               // }

                    var selecionado = retorno.dados[i].municipio === municipio_id? " selected" : "";

                    option += '<option' + selecionado +' value="'+ retorno.dados[i].nome_municipio +'" class="dinamico" id="d'+ i +'">'+ retorno.dados[i].nome_municipio +'</option>';
                }

                $($municipio_id+" .dinamico").remove();
                $($municipio_id).append(option);

              //alert(view.get("pontuavel").uf);

              $uf_selected = nome_uf;
  
            }).fail(function (retorno) {
                alert("Um erro ocorreu!");
            }); 
        }else{
            $($municipio_id+" .dinamico").remove();            
            $uf_selected = 0;
          } 
    },

    mostrarDadosCadastro: function () {
       // alert(this.model.get('ufs'))
        //alert(this.model.get('ponto').models[0].attributes.pontuavel_type);
       //alert(this.model.get("ufs")); //&& ufs.get('id') === parseInt(view.get("ponto").models[0].attributes.uf_id)

        if (this.model.get("ponto").pontuavel_type == "pontosAcionamento") {
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
           // $("#acionamento_uf_id").val(0);
    
            //alert(this.model.get("ufsCol")) ;
          }
          else if(this.model.get("ponto").pontuavel_type == "pontosCombustivel") {
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
            //$("#combustivel_uf_id").val(0);
          }
          else if(this.model.get("ponto").pontuavel_type == "pontosErb") {
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
            //$("#erb_uf_id").val(0);
          }
          else if(this.model.get("ponto").pontuavel_type == "pontosHospedagem") {
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
            //$("#hospedagem_uf_id").val(0);
          }
          else if(this.model.get("ponto").pontuavel_type == "pontosPedagio") {
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
            //$("#pedagio_uf_id").val(0);
          }
          else if(this.model.get("ponto").pontuavel_type == "pontosPolicia") {
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
            //$("#policia_uf_id").val(0);
          }
          else if(this.model.get("ponto").pontuavel_type == "pontosPrestador") {
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
            //$("#prestador_uf_id").val(0);
          }    
          else if(this.model.get("ponto").pontuavel_type == "pontosReferencia") {
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
            //$("#referencia_uf_id").val(0);
          }  
          else if(this.model.get("ponto").pontuavel_type == "pontosRisco") {
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
           // $("#risco_uf_id").val(0);
          } 
          else if(this.model.get("ponto").pontuavel_type == "pontosRodoviario") {
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
            //$("#rodoviario_uf_id").val(0);
          }
          else if(this.model.get("ponto").pontuavel_type == "pontosTransportadora") {
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
            //$("#transportadora_uf_id").val(0);
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
    
        return this;
    },
    template: _.template (`
    <style>
      a {color: #5c7995;}
      .space{padding: 10px 0 10px 0;}
      .s_campos{margin-bottom: 15px;}
      .s_labels{padding-bottom: 5px;}
      .erro{border-color : $FF0000;}
      .off{display: none;}
      .pontos_editar {padding: 10px 15px; cursor: pointer;}
    </style>

    <div id="modalPontos"></div>

    <div class="container-fluid">

      <div class="row off" id="box_pontos_acionamento"><!--ini cadastro pontos_acionamento-->
          <div class="col-sm-12"><!--ini row principal-->
              <div class="panel panel-default"><!--ini card -->
                  <form class="form-horizontal panel-body">
                      <input type="hidden" name="formulario" value="pontos_acionamento">
                      <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
                      <div class="row">
                          <div class="col-sm-8 s_campos">
                              <label class="control-label s_labels">Nome Central*</label>
                              <input name="nome_central" type="text" id="nome_central_id" value="<%=view.get("ponto").pontuavel.nome_central%>" class="form-control" placeholder="Digite o nome da central"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Latitude*</label>
                              <input name="latitude" type="text" maxlength= "10" id="latitude"  value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
                          </div>
                          <div class="col-sm-2 s_campos">
                              <label class="control-label s_labels">Longitude*</label>
                              <input name="longitude" type="text" maxlength= "10" id="longitude"  value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 s_campos">
                              <label class="control-label s_labels">Endereço</label>
                              <input name="endereco" type="text" id="endereco"  value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
                          </div>
                          <div class="col-sm-2">
                            <label class="control-label s_labels" for="uf">UF</label>
                            <select name="uf" class="form-control form-uf" id="acionamento_uf_id">
                              <option value="0">Selecionar...</option>
                              <% view.get("ufsCol").each (function (ufs) { %>   
                                <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
                        <%                      
                            var unidade_tracao;
                            var implementos = [];                       
                            view.get("veiculos").each(function (veiculo){ 
                                if(veiculo.attributes.categoria ==6 ){
                                    unidade_tracao = veiculo.attributes.placa;                              
                                }else{
                                    implementos.push(veiculo.attributes.placa);                               
                                }
                            });                    
                        %>        
                        <div class="col-sm-4 s_campos">
                        <label class="control-label s_labels">Unidade Tração</label>
                        <input name="placas[unidadeTracao]" type="text" id="inputTracao" value="<%= unidade_tracao%>" class="form-control" placeholder="Digite a placa do veículo"/>
                        <p class="help-block pongs-0">Placa Ve&iacute;culo</p>
                        </div>
                        <div class="col-sm-4 s_campos">
                        <label class="control-label s_labels">Implemento</label>
                        <input name="placas[implemento1]" type="text" id="primeiroImplemento"  value="<%=implementos[0]%>" class="form-control" placeholder="Digite a placa do veículo"/>
                        <p class="help-block pongs-0">Placa Ve&iacute;culo</p>
                        </div>
                        <div class="col-sm-4 s_campos">
                        <label class="control-label s_labels">Implemento</label>
                        <input name="placas[implemento2]" type="text" id="segundoImplemento" value="<%=implementos[1]%>" class="form-control" placeholder="Digite a placa do veículo"/>
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
                  <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
                  <div class="row">
                      <div class="col-sm-4 s_campos">
                          <label class="control-label s_labels">Nome*</label>
                          <input name="nome" type="text"  id="nome_id" value="<%=view.get("ponto").pontuavel.nome%>" class="form-control" placeholder="Digite o nome do Posto de Combustível"/>
                      </div>
                      <div class="col-sm-4 s_campos">
                      <label class="control-label s_labels">Descrição Local</label>
                      <input name="descricao" type="text" id="descricao_id" value="<%=view.get("ponto").pontuavel.descricao_local%>" class="form-control" placeholder="Digite a descrição do local"/>
                      </div>
                      <div class="col-sm-2 s_campos">
                          <label class="control-label s_labels">Latitude*</label>
                          <input name="latitude" type="text" maxlength= "10" id="latitude" value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
                      </div>
                      <div class="col-sm-2 s_campos">
                          <label class="control-label s_labels">Longitude*</label>
                          <input name="longitude" type="text" maxlength= "10" id="longitude" value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-sm-6 s_campos">
                          <label class="control-label s_labels">Endereço</label>
                          <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
                      </div>
                      <div class="col-sm-2">
                        <label class="control-label s_labels" for="uf">UF</label>
                        <select name="uf" class="form-control form-uf" id="combustivel_uf_id">
                          <option value="0">Selecionar...</option>
                          <% view.get("ufsCol").each (function (ufs) { %>   
                            <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
                  <% view.get('telefones').each(function (telefone, i){ %>
                    <fieldset>
                        <div class="form-group">
                            <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                            <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" name="ddd[<%= i %>]" value="<%= telefone.attributes.ddd %>"><p class="help-block">DDD</p></div>
                            <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength="16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.attributes.numero %>"><p class="help-block">Número</p></div>
                        </div>
                    </fieldset>
                  <% }); %> 
                  <fieldset>
                  <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefoneCombustivel"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
                  </fieldset>    
                  <% view.get('emails').each(function (email, i){ %>
                    <fieldset>
                        <div class="form-group">
                            <label for="emails[<%= i %>]" class="col-sm-1 control-label">E-mail</label>
                            <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.attributes.email %>"><p class="help-block">Endereço E-mail</p></div>
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
                  <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
                  <div class="row">
                      <div class="col-sm-4 s_campos">
                          <label class="control-label s_labels">Título*</label>
                          <input name="titulo" type="text" id="titulo_id" value="<%=view.get("ponto").pontuavel.titulo%>" class="form-control" placeholder="Digite o Título"/>
                      </div>
                      <div class="col-sm-4 s_campos">
                          <label class="control-label s_labels">Operadora*</label>
                          <input name="operadora" type="text" id="operadora_id" value="<%=view.get("ponto").pontuavel.operadora%>" class="form-control" placeholder="Digite a operadora"/>
                      </div>
                      <div class="col-sm-2 s_campos">
                          <label class="control-label s_labels">Latitude*</label>
                          <input name="latitude" type="text" id="latitude" value="<%=view.get("ponto").latitude%>" maxlength= "10" class="form-control" placeholder="Digite a latitude"/>
                      </div>
                      <div class="col-sm-2 s_campos">
                          <label class="control-label s_labels">Longitude*</label>
                          <input name="longitude" type="text" id="longitude" value="<%=view.get("ponto").longitude%>" maxlength= "10" class="form-control" placeholder="Digite a longitude"/>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-sm-4 s_campos">
                          <label class="control-label s_labels">Endereço*</label>
                          <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
                      </div>
                      <div class="col-sm-2">
                        <label class="control-label s_labels" for="uf">UF*</label>
                        <select name="uf" class="form-control form-uf" id="erb_uf_id">
                          <option value="0">Selecionar...</option>
                          <% view.get("ufsCol").each (function (ufs) { %>   
                            <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
                        <input name="bairro" type="text" id="bairro_id"  value="<%=view.get("ponto").pontuavel.bairro%>" class="form-control" placeholder="Digite o bairro"/>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6 s_campos">
                    <label class="control-label s_labels">Latitude Formatada*</label>
                    <input name="latitude_formatada" type="text" id="latitude_formatada_id" value="<%=view.get("ponto").pontuavel.latitude_formatada%>" class="form-control" placeholder="Digite a latitude formatada"/>
                    </div>
                    <div class="col-sm-6 s_campos">
                    <label class="control-label s_labels">Longitude Formatada*</label>
                    <input name="longitude_formatada" type="text" id="longitude_formatada_id" value="<%=view.get("ponto").pontuavel.longitude_formatada%>" class="form-control" placeholder="Digite a longitude formatada"/>
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
              <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
              <div class="row">
                  <div class="col-sm-8 s_campos">
                      <label class="control-label s_labels">Nome*</label>
                      <input name="nome" type="text" id="nome_id" value="<%=view.get("ponto").pontuavel.nome%>" class="form-control" placeholder="Digite o nome"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Latitude*</label>
                      <input name="latitude" type="text" maxlength= "10" id="latitude" value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Longitude*</label>
                      <input name="longitude" type="text" maxlength= "10" id="longitude" value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-6 s_campos">
                      <label class="control-label s_labels">Endereço</label>
                      <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>"class="form-control" placeholder="Digite o endereço"/>
                  </div>
                  <div class="col-sm-2">
                    <label class="control-label s_labels" for="uf">UF</label>
                    <select name="uf" class="form-control form-uf" id="hospedagem_uf_id">
                      <option value="0">Selecionar...</option>
                      <% view.get("ufsCol").each (function (ufs) { %>   
                        <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
              <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
              <div class="row">
                  <div class="col-sm-8 s_campos">
                      <label class="control-label s_labels">Descrição*</label>
                      <input name="descricao" type="text" id="descricao_id" value="<%=view.get("ponto").pontuavel.descricao%>" class="form-control" placeholder="Digite o nome"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Latitude*</label>
                      <input name="latitude" type="text" maxlength= "10" id="latitude" value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Longitude*</label>
                      <input name="longitude" type="text" maxlength= "10" id="longitude" value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-6 s_campos">
                      <label class="control-label s_labels">Endereço</label>
                      <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
                  </div>
                  <div class="col-sm-2">
                    <label class="control-label s_labels" for="uf">UF</label>
                    <select name="uf" class="form-control form-uf" id="pedagio_uf_id">
                      <option value="0">Selecionar...</option>
                      <% view.get("ufsCol").each (function (ufs) { %>   
                        <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
              <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
              <div class="row">
                  <div class="col-sm-4 s_campos">
                      <label class="control-label s_labels">Instituição*</label>
                      <input name="instituicao" type="text" id="instituicao_id" value="<%=view.get("ponto").pontuavel.instituicao%>" class="form-control" placeholder="Digite a instituição"/>
                  </div>
                  <div class="col-sm-4 s_campos">
                      <label class="control-label s_labels">Departamento</label>
                      <input name="departamento" type="text" id="departamento_id" value="<%=view.get("ponto").pontuavel.departamento%>" class="form-control" placeholder="Digite o departamento"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Latitude*</label>
                      <input name="latitude" type="text" maxlength= "10" id="latitude" value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Longitude*</label>
                      <input name="longitude" type="text" maxlength= "10" id="longitude" value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-5 s_campos">
                      <label class="control-label s_labels">Endereço</label>
                      <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
                  </div>
                  <div class="col-sm-2">
                    <label class="control-label s_labels" for="uf">UF</label>
                    <select name="uf" class="form-control form-uf" id="policia_uf_id">
                      <option value="0">Selecionar...</option>
                      <% view.get("ufsCol").each (function (ufs) { %>   
                        <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
                      <input name="cep" type="text" id="cep_id" value="<%=view.get("ponto").pontuavel.cep%>" class="form-control" placeholder="Digite o cep"/>
                  </div>
              </div>                      
              <% view.get('telefones').each(function (telefone, i){ %>
                <fieldset>
                    <div class="form-group">
                        <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                        <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" name="ddd[<%= i %>]" value="<%= telefone.attributes.ddd %>"><p class="help-block">DDD</p></div>
                        <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength="16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.attributes.numero %>"><p class="help-block">Número</p></div>
                    </div>
                </fieldset>
              <% }); %> 
              <fieldset>
              <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefonePolicia"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
              </fieldset>    
              <% view.get('emails').each(function (email, i){ %>
                <fieldset>
                    <div class="form-group">
                        <label for="emails[<%= i %>]" class="col-sm-1 control-label">E-mail</label>
                        <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.attributes.email %>"><p class="help-block">Endereço E-mail</p></div>
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
              <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
              <div class="row">
                  <div class="col-sm-8 s_campos">
                      <label class="control-label s_labels">Nome*</label>
                      <input name="nome" type="text" id="nome_id" value="<%=view.get("ponto").pontuavel.nome%>" class="form-control" placeholder="Digite o nome do prestador"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Latitude*</label>
                      <input name="latitude" type="text" maxlength= "10" id="latitude" value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Longitude*</label>
                      <input name="longitude" type="text" maxlength= "10" id="longitude" value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-6 s_campos">
                      <label class="control-label s_labels">Endereço</label>
                      <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
                  </div>
                  <div class="col-sm-2">
                    <label class="control-label s_labels" for="uf">UF</label>
                    <select name="uf" class="form-control form-uf" id="prestador_uf_id">
                      <option value="0">Selecionar...</option>
                      <% view.get("ufsCol").each (function (ufs) { %>   
                        <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
              <% view.get('telefones').each(function (telefone, i){ %>
                <fieldset>
                    <div class="form-group">
                        <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                        <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" name="ddd[<%= i %>]" value="<%= telefone.attributes.ddd %>"><p class="help-block">DDD</p></div>
                        <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength="16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.attributes.numero %>"><p class="help-block">Número</p></div>
                    </div>
                </fieldset>
              <% }); %> 
              <fieldset>
              <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefonePrestador"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
              </fieldset>    
              <% view.get('emails').each(function (email, i){ %>
                <fieldset>
                    <div class="form-group">
                        <label for="emails[<%= i %>]" class="col-sm-1 control-label">E-mail</label>
                        <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.attributes.email %>"><p class="help-block">Endereço E-mail</p></div>
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
          <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
          <div class="row">
              <div class="col-sm-4 s_campos">
                  <label class="control-label s_labels">Nome*</label>
                  <input name="nome" type="text" id="nome_id" value="<%=view.get("ponto").pontuavel.nome%>" class="form-control" placeholder="Digite o nome da referência"/>
              </div>
              <div class="col-sm-4 s_campos">
                <label class="control-label s_labels">Descrição</label>
                <input name="descricao" type="text" id="descricao_id" value="<%=view.get("ponto").pontuavel.descricao%>" class="form-control" placeholder="Digite a descrição da referência"/>
              </div>
              <div class="col-sm-2 s_campos">
                  <label class="control-label s_labels">Latitude*</label>
                  <input name="latitude" type="text" maxlength= "10" id="latitude" value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
              </div>
              <div class="col-sm-2 s_campos">
                  <label class="control-label s_labels">Longitude*</label>
                  <input name="longitude" type="text" maxlength= "10" id="longitude" value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
              </div>
          </div>
          <div class="row">
              <div class="col-sm-6 s_campos">
                  <label class="control-label s_labels">Endereço</label>
                  <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
              </div>
              <div class="col-sm-2">
                <label class="control-label s_labels" for="uf">UF</label>
                <select name="uf" class="form-control form-uf" id="referencia_uf_id">
                  <option value="0">Selecionar...</option>
                  <% view.get("ufsCol").each (function (ufs) { %>   
                    <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
                  <% }); %>v
                </select>                   
              </div>
              <div class="col-sm-4 s_campos">
                  <label class="control-label s_labels">Município</label>
                  <select name="municipio" class="form-control form-municipio" id="referencia_municipio_id">
                  <option value="0" class="oculto">Selecionar...</option>
                  </select>
              </div> 
          </div>                      
          <% view.get('telefones').each(function (telefone, i){ %>
            <fieldset>
                <div class="form-group">
                    <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                    <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" name="ddd[<%= i %>]" value="<%= telefone.attributes.ddd %>"><p class="help-block">DDD</p></div>
                    <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength="16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.attributes.numero %>"><p class="help-block">Número</p></div>
                </div>
            </fieldset>
          <% }); %> 
          <fieldset>
          <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefoneReferencia"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
          </fieldset>    
          <% view.get('emails').each(function (email, i){ %>
            <fieldset>
                <div class="form-group">
                    <label for="emails[<%= i %>]" class="col-sm-1 control-label">E-mail</label>
                    <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.attributes.email %>"><p class="help-block">Endereço E-mail</p></div>
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
                <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
                <div class="row">
                    <div class="col-sm-8 s_campos">
                        <label class="control-label s_labels">Descrição*</label>
                        <input name="descricao" type="text" id="descricao_id" value="<%=view.get("ponto").pontuavel.descricao%>" class="form-control" placeholder="Digite o nome"/>
                    </div>
                    <div class="col-sm-2 s_campos">
                        <label class="control-label s_labels">Latitude*</label>
                        <input name="latitude" type="text" maxlength= "10" id="latitude" value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
                    </div>
                    <div class="col-sm-2 s_campos">
                        <label class="control-label s_labels">Longitude*</label>
                        <input name="longitude" type="text" maxlength= "10" id="longitude" value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6 s_campos">
                        <label class="control-label s_labels">Endereço</label>
                        <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
                    </div>
                    <div class="col-sm-2">
                        <label class="control-label s_labels" for="uf">UF</label>
                        <select name="uf" class="form-control form-uf" id="risco_uf_id">
                            <option value="0">Selecionar...</option>
                            <% view.get("ufsCol").each (function (ufs) { %>   
                                <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
            <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
            <div class="row">
                <div class="col-sm-8 s_campos">
                    <label class="control-label s_labels">Descrição*</label>
                    <input name="descricao" type="text" id="descricao_id" value="<%=view.get("ponto").pontuavel.descricao%>" class="form-control" placeholder="Digite o nome"/>
                </div>
                <div class="col-sm-2 s_campos">
                    <label class="control-label s_labels">Latitude*</label>
                    <input name="latitude" type="text" maxlength= "10" id="latitude" value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
                </div>
                <div class="col-sm-2 s_campos">
                    <label class="control-label s_labels">Longitude*</label>
                    <input name="longitude" type="text" maxlength= "10" id="longitude" value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 s_campos">
                    <label class="control-label s_labels">Endereço</label>
                    <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
                </div>
                <div class="col-sm-2">
                    <label class="control-label s_labels" for="uf">UF</label>
                    <select name="uf" class="form-control form-uf" id="rodoviario_uf_id">
                        <option value="0">Selecionar...</option>
                        <% view.get("ufsCol").each (function (ufs) { %>   
                            <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
              <input name="id" value="<%= view.get("ponto").pontuavel_id %>" type="hidden">
              <div class="row">
                  <div class="col-sm-8 s_campos">
                      <label class="control-label s_labels">Nome*</label>
                      <input name="nome" type="text" id="nome_id" value="<%=view.get("ponto").pontuavel.nome%>" class="form-control" placeholder="Digite o nome da transportadora"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Latitude*</label>
                      <input name="latitude" type="text" maxlength= "10" id="latitude" value="<%=view.get("ponto").latitude%>" class="form-control" placeholder="Digite a latitude"/>
                  </div>
                  <div class="col-sm-2 s_campos">
                      <label class="control-label s_labels">Longitude*</label>
                      <input name="longitude" type="text" maxlength= "10" id="longitude" value="<%=view.get("ponto").longitude%>" class="form-control" placeholder="Digite a longitude"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-6 s_campos">
                      <label class="control-label s_labels">Endereço</label>
                      <input name="endereco" type="text" id="endereco" value="<%=view.get("ponto").pontuavel.endereco%>" class="form-control" placeholder="Digite o endereço"/>
                  </div>
                  <div class="col-sm-2">
                    <label class="control-label s_labels" for="uf">UF</label>
                    <select name="uf" class="form-control form-uf" id="transportadora_uf_id">
                      <option value="0">Selecionar...</option>
                      <% view.get("ufsCol").each (function (ufs) { %>   
                        <option <%= (ufs.get('id') === parseInt(view.get("uf")) ? "selected" : "") %> class="oculto" value="<%= ufs.get('id') %>"><%= ufs.get('uf') %></option>
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
              <% view.get('telefones').each(function (telefone, i){ %>
                <fieldset>
                    <div class="form-group">
                        <label for="telefones[<%= i %>]" class="col-sm-1 control-label">Telefone</label>
                        <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" name="ddd[<%= i %>]" value="<%= telefone.attributes.ddd %>"><p class="help-block">DDD</p></div>
                        <div class="col-sm-3"><input class="form-control numero_telefone" type="text" maxlength="16" id="telefones[<%= i %>]" name="telefones[<%= i %>]" value="<%= telefone.attributes.numero %>"><p class="help-block">Número</p></div>
                    </div>
                </fieldset>
              <% }); %> 
              <fieldset>
              <div class="form-group"><div class="col-sm-3 col-sm-offset-1"><a href="#" class="btn btn-default btn-sm" id="incluirTelefoneTransportadora"><i class="fa fa-fw fa-plus"></i> Incluir Telefone</a></div></div>
              </fieldset>    
              <%  view.get('emails').each(function (email, i){ %>
                <fieldset>
                    <div class="form-group">
                        <label for="emails[<%= i %>]" class="col-sm-1 control-label">E-mail</label>
                        <div class="col-sm-3"><input class="form-control" type="text" maxlength="2" id="emails[<%= i %>]" name="emails[<%= i %>]" value="<%= email.attributes.email %>"><p class="help-block">Endereço E-mail</p></div>
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
  `, {variable: 'view'}),
    initialize: function()
    {
        try {

            
           // alert(this.model.get("pontuavel_type"));
            //alert(this.model.get("veiculos").length);
            //console.log(this.model.get("veiculos"));
            //console.log(this.model.get("telefones"));
            //alert(this.model.get('telefones').models[0]);
            /*this.model.get('telefones').each(function (telefone){
                alert(telefone.attributes.ddd);
            });

            this.model.get ('telefones').forEach (function (telefone){
                console.log(telefone.attributes.ddd);

            });*/
            sessionStorage.clear();
            this
            .getJSON(adagio.environment.getEndpoint("ufs"))
           // .getJSON(adagio.environment.getEndpoint("ufs/"+this.model.get('uf').models[0].attributes.id))
            .load("web")
            //.getScript ("/jquery.maskedinput-master/lib/jquery-1.9.0.min.js", "js")
            .getScript ("/jquery.maskedinput-master/src/jquery.maskedinput.js", "js")
            .release(); 
        }
        catch(thrown) {
            console.error(thrown);
        }
        finally {
            //
        }
    },
    "render": function () {
        sessionStorage.clear();
       // alert(this.pontuavel_type);
      // alert(this.model.get("uf").models[0].attributes.id);
        
        this.$el.html(this.template(this.model)).attr("class", this.className);
        this.mostrarDadosCadastro();
        this.carregarMunicipio(this.model.get('uf'), this.model.get('municipio'), this.model.get('ponto').pontuavel.uf);
        
        //$uf_selected = this.model.get('ponto').pontuavel.uf;
        
        //alert($uf_selected);

        //this.listarTransportadoras().mostrarDadosCadastro().listarDocumentacoes().carregarDocumentos();

             //$unidade_tracao = "";
            // $implementos = [];
             //alert(this.model.get("pontuavel").get("veiculos"));
            
            /*this.model.get("pontuavel").veiculos.each(function (veiculo){ 
               // alert("oi");
                if(veiculo.attributes.categoria ==6 ){
                    $unidade_tracao = veiculo.attributes.placa;
                    alert($unidade_tracao);
                }else{
                    $implementos.push(veiculo.attributes.placa);
                    alert($implementos[0]);
                }
            });*/
        

        this.$('.date').datepicker({format: 'dd/mm/yyyy', language: 'pt-BR', autoclose: true});
        jQuery(function($) {
          //alert("oi");
          $.mask.definitions['~']='[+-]';
          $('#inputTracao').mask('aaa-9999');
          $('#primeiroImplemento').mask('aaa-9999');
          $('#segundoImplemento').mask('aaa-9999');
          $('#cep_id').mask('99999-999');
         // $('#telefone').mask('(99) 9999-9999');
         // $('#celular').mask('(99) 9.9999-9999');
      });
    },
    "notification": window.handling.notification
}