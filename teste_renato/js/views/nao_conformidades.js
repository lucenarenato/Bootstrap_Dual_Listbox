{
	tagName: "div",
	id: "adagio-home",
	className: "adagio-naoConformidades",
	events: {
		"click .naoConformidades-sync": function(event) {
			var sincronizarNaoConformidades = _.debounce(this.sincronizarNaoConformidades, 300, true);
			return sincronizarNaoConformidades.call(this, event);
		},
		//
		"click .naoConformidade-add": "novoNaoConformidade",
		"click .naoConformidade-get": "abrirNaoConformidade",
		"change #lista_de_naoConformidades": "abrirNaoConformidade",
		"click .naoConformidade-set": function(event) {
				
			if($('#inputPlaca').val() == "")
			{
				alert("Informe a placa do veículo!");
			}
			else if($("#situacaoVeiculo").text() == "Placa Veículo"){
				alert("Consulte a situação do veículo!");
			}
			else if($("#situacaoVeiculo").text() == "Não localizado"){
				alert("Cadastre o veículo no CARTORIAL!");
			}
			else if($("#situacaoPessoa").text() == "Consultar situação"){
				alert("Consulte a situação do motorista!");
			}
			else if($("#situacaoPessoa").text() == "Não localizado"){
				alert("Cadastre o motorista no CARTORIAL!");
			}
			else{
				var salvarNaoConformidade = _.debounce(this.salvarNaoConformidade, 300, true);				

				return salvarNaoConformidade.call(this, event);
				
				
			}
			

		},
		"click .naoConformidade-remove": "apagarNaoConformidade",
		"click .naoConformidade-enviar": "enviarNaoConformidade",
		//
		"click #consultarPessoa": "averiguarDocumento",
		"click #consultarPlaca": "averiguarPlaca",
		"blur #inputDataFinal" : function(event) {
			if(!$('#inputDataInicio').val() == "" && !$('#inputDataFinal').val() == ""){
				this.timeDiff($('#inputDataInicio').val(), $('#inputDataFinal').val());

			}
		},
		"blur #inputDataInicio" : function(event) {
			if(!$('#inputDataInicio').val() == "" && !$('#inputDataFinal').val() == ""){
				this.timeDiff($('#inputDataInicio').val(), $('#inputDataFinal').val());

			}
		},

		"change .form-responsavelNc": function(event)
		{			
					  
			var $currentTarget = this.$(event.currentTarget); 
			       
			this.buscarMotivoNc($currentTarget.val());
			this.buscarDetalhamentoNc("0");

			if($currentTarget.val() == 1){
				$("#inputPoliticaAvaliacao").prop("disabled", true);
				$("#inputPoliticaAvaliacao").val("");
				$("#selectPoliticaAvaliacao").prop("disabled", true);
				$('#selectPoliticaAvaliacao').val("0");

				$("#inputPontuacao").prop("disabled", true);
				$("#inputPontuacao").val("");
			}
			else if($currentTarget.val() == 2){
				$("#inputPoliticaAvaliacao").prop("disabled", false);
				$("#selectPoliticaAvaliacao").prop("disabled", false);
				$("#inputPontuacao").prop("disabled", false);

			}

		},
		
		"change .form-tiposNc": function(event)
		{
		  
			var $currentTarget = this.$(event.currentTarget);	
		   
		  	this.buscarDetalhamentoNc($currentTarget.val());

		  	$("#inputDescricaoMotivo").val($("#inputMotivo option:selected").text());
		  	if($("#inputDescricaoMotivo").val() == "2.5 - Excesso de velocidade" || $("#inputDescricaoMotivo").val() == "2.6 - Excesso de velocidade na chuva"){
				$("#inputVelocidade").prop("disabled", false);
		  	}
		  	else{
				$("#inputVelocidade").prop("disabled", true);
				$("#inputVelocidade").val("");
			}	

			if($("#inputResponsavelNc").val() == 2)			{			
			
				if($("#inputDescricaoMotivo").val() == "2.7 - Infrações cometidas por desrespeito ao CTB, e/ou, emitidas por autoridades de trânsito"){
					$("#selectPoliticaAvaliacao").show();
					$("#inputPoliticaAvaliacao").hide();
					$("#selectPoliticaAvaliacao").prop("disabled", false);
					$("#inputPoliticaAvaliacao").prop("disabled", true);
					
				}
				else
				{ //alert($("#inputResponsavelNc").val())
					$("#inputPoliticaAvaliacao").show();
					$("#selectPoliticaAvaliacao").hide();
					$("#inputPoliticaAvaliacao").prop("disabled", false);
					$("#selectPoliticaAvaliacao").prop("disabled", true);
				}
			}
			
			  $('#inputPoliticaAvaliacao').val("");
			  $('#selectPoliticaAvaliacao').val("0");
		  	  $('#inputPontuacao').val("");	  
		  
		},

		"change .form-subtiposNc": function(event)
		{
		  
		  var $currentTarget = this.$(event.currentTarget);
		  //alert($currentTarget.val()); 
	
		  if($currentTarget.val() !== "0")
		  {         
			$.ajax({
			  url: adagio.environment.getEndpoint("subtiposNc/"+$currentTarget.val()),
			  //data: $currentTarget.val(),
			  //context: _this,
			  global: false
			}).done(function (retorno) {  
				if($("#inputDescricaoMotivo").val() != "2.7 - Infrações cometidas por desrespeito ao CTB, e/ou, emitidas por autoridades de trânsito")
				{   				
					if(retorno.dados[0].pontuacao == "1")
					{
						$('#inputPoliticaAvaliacao').val("Leve");
					}
					else if(retorno.dados[0].pontuacao == "3")
					{
						$('#inputPoliticaAvaliacao').val("Média");
					}
					if(retorno.dados[0].pontuacao == "5")
					{
						$('#inputPoliticaAvaliacao').val("Grave");
					}
					if(retorno.dados[0].pontuacao == "7")
					{
						$('#inputPoliticaAvaliacao').val("Gravíssima");					
					}
					$('#inputPontuacao').val(retorno.dados[0].pontuacao);
				} 
	
			}).fail(function (retorno) {
			  alert("Um erro ocorreu!");
			});  
		  }else{
			$('#inputPoliticaAvaliacao').val("");
			$('#inputPontuacao').val("");
			//$uf_selected = "";
		  }
		},

		"change .form-politicaAvaliacaoNc": function(event)
		{			
					  
			var $currentTarget = this.$(event.currentTarget); 
			       
			//alert($currentTarget.val());
			if($currentTarget.val() == "Leve")
			{
				$('#inputPontuacao').val("1");
			}
			else if($currentTarget.val() == "Média")
			{
				$('#inputPontuacao').val("3");
			}
			else if($currentTarget.val() == "Grave")
			{
				$('#inputPontuacao').val("5");
			}
			else if($currentTarget.val() == "Gravíssima")
			{
				$('#inputPontuacao').val("7");
			}
			else
			{
				$('#inputPontuacao').val("");
			}

		},

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

		"change #checkboxDataAtual": function(event)
		{
			if($("#checkboxDataAtual").is(':checked')){
				var dataHora = new Date();
				$("#inputDataInicio").val(dataHora.toLocaleString());				
			}
			else {
				$("#inputDataInicio").val("");
			}
		},


		//$("#inputDuracao").focus(function(){
			
	//	}); 
	},
	"evidenciaEmSelecao": _.template('<div id="anexacao_<%= fragment.cid %>" class="row">' +
	'<div  id="previsao_<%= fragment.cid %>" class="col-sm-6">' +
	'<div class="thumbnail"><img src="<%= fragment.image %>" name="imagem_evidencia" /></div>' +
	'</div>' +
	'<div class="col-sm-6"><p>Legenda</p>' +
	'<textarea name="legenda_evidencia" id="legenda_<%= fragment.cid %>" class="form-control"></textarea>' +
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

	"timeDiff": function(d1, d2) {

		dataInicio = moment(d1, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
		dataFinal = moment(d2, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

		data1 = new Date(dataInicio);
		data2 = new Date(dataFinal);

		dataHoraAtual = new Date();  

		//Validação das datas
		if(data1 > dataHoraAtual){
			alert("A Data / Hora Inicial deve ser menor que a  Data Atual!");
			$('#inputDataInicio').val("");
			$('#inputDuracao').val("");
		}
		else if(data2 > dataHoraAtual){
			alert("A Data / Hora Final deve ser menor que a Data Atual!");
			$('#inputDataFinal').val("");
			$('#inputDuracao').val("");

		}
		else if(data1 > data2){
			alert("A Data / Hora Final deve ser maior que a Data/Hora Início!");
			$('#inputDuracao').val("");
		}
		else if(data1 == "Invalid Date" || data2 == "Invalid Date"){
			alert("Data/Hora Início e/ou Data/Hora Final invalída(s)!");
			$('#inputDuracao').val("");
		}
		else{

			var diferencaDatas = moment(d2,"DD/MM/YYYY HH:mm:ss").diff(moment(d1,"DD/MM/YYYY HH:mm:ss"));
			
			var duracao = moment.duration(diferencaDatas);

			var duracaoFormatada = Math.floor(duracao.asHours()) + moment.utc(diferencaDatas).format(":mm:ss");

			this.$("#inputDuracao").val(duracaoFormatada);
				
			
		}

	},
	"enviarEmail": function (nc_id) {
		//alert(nc_id);
		$.ajax({
			"url": adagio.environment.getEndpoint("naoConformidades/notificador/" + nc_id),
			"method": "get",
			"context": this
    }).done(function (data, textStatus, jqXHR) {
			//alert("oi");
			//alert(jqXHR.getResponseHeader("Location"));
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
    });
    
		
	},
	"filaAnexos": function (nc_id=0, position, collection) {
//alert(key);
//alert(nc_id);
		var
		  recursively = this.filaAnexos,
		  _this = this;
	
		  //alert(_this.model.get('id'));
		return new Promise(function (resolve, reject) {
			console.log(_this.model.get("rolEvidencias"));
			console.log(collection);
		  var
			key = position || 0,
			list = (collection === undefined) ? _this.model.get("rolEvidencias") : collection,
			url = adagio.environment.getEndpoint('naoConformidades/' + nc_id + '/fotos');  
	
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
			  
			  //alert(_this.$("#legenda_" + list.at(key).cid).val());
			formData.append("foto", list.at(key).get("__file"));
	
			formData.append("nota", _this.$("#legenda_" + list.at(key).cid).val());
	
			form.data = formData;
			
	
			return Promise.resolve($.ajax(form))
			.then(function () {
				
			  _this.$("#anexacao_" + list.at(key).cid).remove();
			  	
			  if (key + 1 < list.length) {
				  
				return _this.filaAnexos.call(_this, nc_id, key + 1, list);
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
	"enviarNaoConformidade": function enviarNaoConformidade(event)
	{

		var self = event.currentTarget, local = {}, global = this;
		
		local.cid = global.$("input[name=cid]").val ();
			
	  try {
		var forms = this.$(".input-nc").serialize(); // .replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '');
  
		$.ajax({
		  "url": adagio.environment.getEndpoint("naoConformidades"),
		  "method": "post",
		  "data": forms,
		  "context": this
		})
		.done(function (data, textStatus, jqXHR) {
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
			if (data.id) {
				this.filaAnexos(data.id);
			} else {
				// ok
			}
			return jqXHR;
		})
		.done(function (data, textStatus, jqXHR) {			
        if (jqXHR.getResponseHeader("Location")) {
          this.model.set("url", jqXHR.getResponseHeader("Location"));
        }
        if (data.id) {
          this.enviarEmail(data.id);
        } else {
          // ok
        }
        return jqXHR;
		});
	
		//remover nc que está em cache do combobox
		global.NaoConformidades.remove (local.cid);
		global.storage.set ("naoConformidades", global.NaoConformidades.toJSON ());		
		//this.apagarNaoConformidade(local.cid);
	  } catch (thrown) {
		console.error(thrown);
	  } finally {
		event.preventDefault();
		event.stopPropagation();
	  }
	},
	itens: [],
	storage:
	{
		set: function (key, value)
		{
			if (!key || !value)
			return [];

			if (typeof value === "object")
			value = JSON.stringify(value);

			window.localStorage.setItem(key, value);

			return this.get(key);
		},
		get: function (key)
		{
			var value = window.localStorage.getItem(key);

			if (!value)
			return [];

			if (value[0] === "{" || value[0] === "[")
			value = JSON.parse(value);

			return value;
		},

	},

	apagarNaoConformidade: function apagarNaoConformidade(event) {
		var self = event.currentTarget, local = {}, global = this;

		local.cid = global.$("input[name=cid]").val ();
		

		global.NaoConformidades.remove (local.cid);
		global.storage.set ("naoConformidades", global.NaoConformidades.toJSON ());

		return window.location.reload ();
	},
	salvarNaoConformidade: function salvarNaoConformidade(event) {
		var self = event.currentTarget, local = {}, global = this;

		local.naoConformidades = {};
		local.naoConformidade = global.$el.find ("form").serializeArray ();

		_.each(local.naoConformidade, function (item) {
			match = (/([a-z]+)\[(.*?)\]/i).exec(item.name);
			if (match !== null) {
				// Create one new array object
				if (local.naoConformidades[match[1]] === undefined) local.naoConformidades[match[1]] = [];
				// Automatically keyed
				if (match[2].length === 0) match[2] = local.naoConformidades[match[1]].length;
				// Set it up
				local.naoConformidades[match[1]][match[2]] = item.value;
			}
			else if (item.name !== "cid")
				local.naoConformidades[item.name] = item.value;
			else
				local.cid = item.value;
				
		});
		
		global.itens = _.where(global.itens, {"tipo": local.naoConformidades.tipo});
		local.naoConformidades.itens = global.itens;

		// if (local.cid == "-1")
		if (global.NaoConformidades.get (local.cid) === undefined) {
			global.$("input[name=cid]").val(global.NaoConformidades.add(local.naoConformidades).cid);
		}
		else {
			// console.log (local.cid);
			global.NaoConformidades.get(local.cid).set(local.naoConformidades);
		}

		global.storage.set("naoConformidades", global.NaoConformidades.toJSON());
		//console.log(global.$("input[name=cid]").val ());		
		
		//return global.novoNaoConformidade(event);
		//alert(local.cid);

		$("#painelEvidencias").show();
		$("#rowEnviaNc").show();
		//$("#mostra-status").parent(".btn-group").show();
		
	},
	
	subviews: {
		"naoConformidades": Backbone.View.extend({
			template: _.template(`
			<% _.each (adagio.models, function (naoConformidade) { %>
			<a href="<%= location.hash %>" class="list-group-item naoConformidade-get" data-cid="<%= naoConformidade.cid %>">
			<p class="list-group-item-heading"><%= (naoConformidade.get ('placa_veiculo')) %></p>
			<p class="list-group-item-text"><ul class="listening-<%= naoConformidade.cid %>"></ul></p>
			</a>
			<% }); %>
			`, {variable: 'adagio'}),
			initialize: function (options) {
				this.options = options;
				this.listenTo(this.collection, 'add change remove', this.render);
				this.render();
			},
			render: function () {
				$("#lista_de_naoConformidades").html('<option value="0">Selecionar...</option>');
				this.collection.each(function (naoConformidade) {
					var option = `<option value="` + naoConformidade.cid + `">`+ (naoConformidade.get('placa_veiculo')) + `</option>`;
					$("#lista_de_naoConformidades").append(option);
				},
				this);
				//console.log($("#naoConformidade-get"));
				// this.$(".list-group-item").remove ();
				// this.$el.append (this.template (this.collection));
				return this;
			},
		}),
	},

	template: _.template(`
	<div class="container-fluid">
		<div class="row"><div class="col-xs-12">
<nav class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="<%= location.hash %>">Não Conformidades</a>
		</div>
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
			<form class="navbar-form navbar-left" role="search">
				<div class="form-group">
					<select class="form-control" id="lista_de_naoConformidades"></select>
				</div>
			</form>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#" class="naoConformidade-add">Novo</a></li>			
			</ul>
		</div>
	</div>
</nav>
	</div></div>

		<div class="row">
			<!--
			<div class="col-md-3">
				<p class="small text-muted text-uppercase"><strong>NaoConformidades</strong></p>
				<p>
					<a class="btn btn-default btn-sm naoConformidade-add">Novo</a>
					<a class="btn btn-outline btn-success btn-sm naoConformidades-sync">Sincronizar</a>
				</p>
				<div class="list-group naoConformidade-sidebar"></div>
			</div>
			-->
			<div class="col-xs-12">
				<div id="area_alertas"></div>
				<div class="panel panel-default">
					<div class="panel-body adagio-naoConformidade-form">
						<h3>Pronto para começar?</h3>
						<p>Antes de começar, é importante você fazer alguns testes para verificar se o seu navegador está bem configurado para suportar todos os recursos do sistema.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	`, {variable: 'adagio'}),

	templateQuestion: _.template(`
<form class="form-horizontal input-nc">
<p class="text-uppercase text-muted text-right small"><strong><%= new Date (adagio.attributes.timestamp && adagio.attributes.timestamp.length === 13 ? parseInt (adagio.attributes.timestamp) : _.now ()) %></strong></p>
<input name="timestamp" value="<%= (adagio.attributes.timestamp && adagio.attributes.timestamp.length === 13 ? parseInt (adagio.attributes.timestamp) : _.now ()) %>" type="hidden">
<input name="cid" value="<% print (adagio.cid === undefined ? -1 : adagio.cid) %>" type="hidden">
<input name="id" value="<%= adagio.get('id') %>" type="hidden">
<fieldset>
	<div class="form-group">
	<div class="row">
		<label for="inputResponsavelNc" class="col-sm-2 control-label">Responsável pela NC*</label>
		<div class="col-sm-2">
		<select name="responsavel_id" class="form-control form-responsavelNc" id="inputResponsavelNc">
			<option value="0">Selecionar...</option>
			<% this.responsavelNc.each (function (responsavel) { %>   
				<option class="oculto" <%= (parseInt (responsavel.id) === parseInt (adagio.attributes.responsavel_id) ? "selected" : "") %> value="<%= responsavel.id %>"><%= responsavel.attributes.responsavel.toString ().toUpperCase () %></option>
		  	<% }); %>
		</select>  
		</div>
		<label for="inputUf" class="col-sm-1 control-label">UF*</label>
		<div class="col-sm-2">  
			<select name="uf_id" class="form-control" id="inputUf">
				<option value="0">Selecionar...</option>
				<% this.ufs.each (function (uf) { %>   
					<option class="oculto" <%= (parseInt (uf.id) === parseInt (adagio.attributes.uf_id) ? "selected" : "") %> value="<%= uf.id %>"><%= uf.attributes.uf.toString ().toUpperCase () %></option>
				  <% }); %>
			</select>                   
		</div>
		<label for="inputTransportadora" class="col-sm-1 control-label">Transportadora*</label>
		<div class="col-sm-3">
			<select name="transportadora_id" class="form-control" id="inputTransportadora">
				<option value="0">Selecionar...</option>
				<% this.empresas.each (function (empresa) { %>
				<% if (empresa.get ('nome').search (/leiteira/i) !== -1) return false; %>
				<optgroup label="<%= empresa.get('nome') %>">
				<% _.each (empresa.get('dependentes'), function (dependente, uid) { %>
				<option <%= (parseInt (dependente.id) === parseInt (adagio.attributes.transportadora_id) ? "selected" : "") %> value="<%= dependente.id %>"><%= dependente.nome.toString ().toUpperCase () %></option>
				<% }); %>
				<% }); %>
				</optgroup>
			</select>
		</div>
		
	</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<div class="row">			
			<label for="inputRegiaoLeiteira" class="col-sm-2 control-label">Região Leiteira*</label>
			<div class="col-sm-2">
				<select name="regiao_leiteira_id" class="form-control" id="inputRegiaoLeiteira">
					<option value="0">Selecionar...</option>
					<% this.empresas.each (function (empresa) { %>
						<% if (empresa.get ('nome').search (/leiteira/i) !== -1) { %>
							<% _.each (empresa.attributes.dependentes, function (dependente) { %>
							<option <%= (parseInt (dependente.id) === parseInt (adagio.attributes.regiao_leiteira_id) ? "selected" : "") %> value="<%= dependente.id %>"><%= dependente.nome.toString ().toUpperCase () %></option>
							<% }); %>
						<% } %>
					<% }); %>
				</select>
			</div>
			<label for="inputPercurso" class="col-sm-1 control-label">Percurso*</label>
			<div class="col-sm-2">
				<select name="percurso_id" class="form-control" id="inputPercurso"><% _(["Selecionar...", "T1", "T2"]).each (function (tesao, i) { %><option <%= (i === parseInt (adagio.attributes.percurso_id) ? "selected" : "") %> value="<%= i %>"><%= tesao %></option><% }); %></select>
			</div>
			<label for="inputPlaca" class="col-sm-1 control-label">Veículo*</label>
			<div class="col-sm-3">
			<input name="placa_id" id="inputPlacaId" value="<% adagio.attributes.placa_id %>" type="hidden">
			<input id="inputPlaca" class="form-control" style="text-transform: uppercase" type="text" name="placa_veiculo" value="<%= adagio.attributes.placa_veiculo %>">
			<p class="help-block" id="situacaoVeiculo">Placa Ve&iacute;culo</p>
			<button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPlaca" data-model="inputPlaca">Buscar</button>
			</div>
		</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<div class="row">
			<label for="inputCPF" class="col-sm-2 control-label">CPF*</label>
			<div class="col-sm-3">
				<input name="cpf_id" id="inputCpfId" value="<% adagio.attributes.cpf_id %>" type="hidden">
				<input id="inputCPF" name="cpf_motorista" class="form-control" type="text" value="<%= adagio.attributes.cpf_motorista %>">
				<p class="help-block" id="situacaoPessoa">Consultar situação</p>
				<button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPessoa">Buscar</button>
			</div>
			<label for="inputMotorista" class="col-sm-1 control-label">Motorista</label>
			<div class="col-sm-4">
				<input id="inputMotorista" name="nome_motorista" class="form-control" type="text" value="<%= adagio.attributes.nome_motorista %>">
			</div>
			<div class="col-sm-2">
			<p class="help-block" nome="status_motorista" id="statusMotorista">Status</p>
			</div>
		</div>
	</div>
</fieldset>
<fieldset>
<div class="form-group">
	<div class="row">
		<label for="inputMotivo" class="col-sm-2 control-label">Motivo da NC*</label>
		<div class="col-sm-9">  
		<select name="motivo_id" class="form-control form-tiposNc" id="inputMotivo">
			<option value="0">Selecionar...</option>
		</select> 
		<input name="descricao_motivo" value="<% adagio.attributes.descricao_motivo %>" id="inputDescricaoMotivo" type="hidden">                  
	</div>
	</div>
</div>
</fieldset>
<fieldset>
<div class="form-group">
	<div class="row">
		<label for="inputDetalhamento" class="col-sm-2 control-label">Detalhamento NC*</label>
		<div class="col-sm-9">  
		<select name="detalhamento_id" class="form-control form-subtiposNc" id="inputDetalhamento">
			<option value="0">Selecionar...</option>
		</select>                   
	</div>
	</div>
</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<div class="row">
			<label for="inputDataInicio" class="col-sm-2 control-label">Data / Hora Início*</label>			
			<div class="col-sm-2">				
				<input name="dataInicio" type="text" id="inputDataInicio" class="form-control" placeholder="dd/mm/aaaa hh:mm:ss" value="<%= adagio.attributes.dataInicio %>"/>
				<div class="checkbox"><label><input type="checkbox" id="checkboxDataAtual"> <span class="text">Data Atual</span></label></div>					
			</div>
			<label for="inputDataFinal" class="col-sm-2 control-label">Data / Hora Final*</label>
			<div class="col-sm-2">			 	
				<input name="dataFinal" type="text" id="inputDataFinal" class="form-control" placeholder="dd/mm/aaaa hh:mm:ss" value="<%= adagio.attributes.dataFinal %>"/>
			</div>
			<label for="inputDuracao" class="col-sm-1 control-label">Duração*</label>
			<div class="col-sm-2">
				<input id="inputDuracao" name="duracao" class="form-control" type="text" placeholder="hh:mm:ss" value="<%= adagio.attributes.duracao %>" readonly>
			</div>
		</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<div class="row">
			<label for="inputVelocidade" class="col-sm-2 control-label">Velocidade K/H</label>
			<div class="col-sm-2">
				<input name="velocidade" type="text" id="inputVelocidade" class="form-control" disabled value="<%= adagio.attributes.velocidade %>" />
			</div>
			<label for="inputPoliticaAvaliacao" class="col-sm-2 control-label">Política de Avaliação</label>
			<div class="col-sm-2">
				<input id="inputPoliticaAvaliacao" name="politica_avaliacao" class="form-control" type="text" disabled value="<%= adagio.attributes.politica_avaliacao %>"/>
				<select name="politica_avaliacao" class="form-control form-politicaAvaliacaoNc" id="selectPoliticaAvaliacao" disabled>
					<option value="0">Selecionar</option>
					<option value="Leve">Leve</option>
					<option value="Média">Média</option>
					<option value="Grave">Grave</option>                      
					<option value="Gravíssima">Gravíssima</option>
				</select>			
			</div>
			<label for="inputPontuacao" class="col-sm-1 control-label">Pontuação</label>
			<div class="col-sm-2">
				<input id="inputPontuacao" name="pontuacao" class="form-control" type="text" disabled value="<%= adagio.attributes.pontuacao %>" />
			</div>
		</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<div class="row">
			<label for="inputPassword3" class="col-sm-2 control-label">Comentário</label>
			<div class="col-sm-9">
				<textarea class="form-control" id="inputComentario" name="comentario"><%= adagio.attributes.comentario %></textarea>
			</div>
		</div>
	</div>
</fieldset>
<div class="row">
	<div class="col-xs-12 col-sm-6">
		<div id="painelEvidencias" class="panel panel-default" style="display: none;">
			<div class="panel-heading">
				<h3 class="panel-title">Registros - Evidências</h3>
			</div>
			<form class="input-nc">
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
</div>
<div class="row">
<div class="col-sm-6"><button type="button" class="btn btn-default btn-block naoConformidade-set">Salvar</button></div>
<div class="col-sm-6"><button type="button" class="btn btn-danger btn-block naoConformidade-remove">Excluir</button></div>
</div>

<div id="rowEnviaNc" class="row" style="display: none;">
<hr>
<div class="col-sm-offset-10 col-sm-2">
	<button type="button" id="enviarNaoConformidade" class="btn btn-default btn-block naoConformidade-enviar">Enviar</button>
</div>
</div>

	</form>
	`,
	{variable: 'adagio'}),
	initialize: function ()
	{
		try {
			sessionStorage.clear();

			this
			.load("web")
			.getScript ("/jquery.maskedinput-master/src/jquery.maskedinput.js", "js")
			.getScript ("/moment-develop/min/moment.min.js", "js")			
			.release(); 
			
			if (this.model.has("rolEvidencias")) {
				this.model.get("rolEvidencias").reset();
			} else {
				this.model.set("rolEvidencias", new Backbone.Collection);
		
				this.model.get("rolEvidencias").off("add").on("add", this.adicionarEvidencia, this);
		
				this.model.get("rolEvidencias").off("remove").on("remove", this.removerEvidencia, this);
			}

		}
		catch (thrown) {
			console.error(thrown);
		}
		finally {
			//
		}
	},
	render: function ()
	{		
		/*jQuery(function($) {
			alert("oi");
			$.mask.definitions['~']='[+-]';
			$('#inputPlaca').mask('aaa-9999');
			$('#inputCPF').mask('999.999.999-99');
			$('#inputDataInicio').mask('99-99-9999 99:99');
			$('#inputDataFinal').mask('99-99-9999 99:99');
		});*/
		//console.log(this.model.attributes.create);

		var _this = this, local = {}, global = window;
		

		_this.NaoConformidade = Backbone.Model.extend({
			defaults:
			{
				timestamp: "",
				responsavel_id:0,
				uf_id:0,
				transportadora_id:0,
				regiao_leiteira_id:0,
				percurso_id:0,
				placa_veiculo: "",
				cpf_motorista: "",
				nome_motorista: "",				
				status_motorista: "",
				motivo_id:0,
				descricao_motivo: "",
				detalhamento_id:0,
				dataInicio: "",
				dataFinal:"",
				duracao: "",
				velocidade: "",
				politica_avaliacao: "",
				pontuacao: "",
				comentario: "",
				legenda_evidencia:"",
				imagem_evidencia:""			
				
			}
		});
		

		local.NaoConformidades = Backbone.Collection.extend({ model: _this.NaoConformidade });

		_this.NaoConformidades = new local.NaoConformidades(_this.storage.get("naoConformidades"));

		if (_this.$el.attr("class") === undefined) {
			// load
			_this.$el.html(_this.template(_this.model)).attr("class", _this.className);
			new _this.subviews.naoConformidades({el: _this.$(".naoConformidade-sidebar"), collection: _this.NaoConformidades});
		}
		else if (_this.$el.attr("class") !== _this.className) {
			// reload
			_this.$el.html(_this.template(_this.model)).attr("class", _this.className);
			new _this.subviews.naoConformidades({el: _this.$(".naoConformidade-sidebar"), collection: _this.NaoConformidades});
		}
		else {
			// already
		}

		//var innerForm = ['naoConformidades'].join('_');
		console.log(local.NaoConformidades);
		
		//_this
		//.__load(innerForm, {"model": _this.model, "collection": _this.collection});
		/*.then(function (loaded) {
			if (loaded.model.has('create') && loaded.model.get('create') === true) {
			  adagio.eventBus.trigger("naoConformidades:create");
			}
			else {
			  adagio.eventBus.trigger("naoConformidades:edit");
			}
		  });
		 
		  return _this;*/
		
	},

	novoNaoConformidade: function novoNaoConformidade(event)
	{

		
		event.preventDefault();
		event.stopPropagation();

		var self = event.currentTarget, strict = {}, _this = this, globals = window;

		strict.objectCaches = [
			new globals.objectCache('empresas', adagio.environment.getEndpoint('prestadores'), null, true),
			new globals.objectCache('ufs', adagio.environment.getEndpoint('ufs'), null, true),
			new globals.objectCache('responsavelNc', adagio.environment.getEndpoint('responsavelNc'), null, true),
			new globals.objectCache('tiposNc', adagio.environment.getEndpoint('tiposNc'), null, true),
			//new globals.objectCache("/jquery.maskedinput-master/src/jquery.maskedinput.js", "js"),
			//.getScript ("/jquery.maskedinput-master/src/jquery.maskedinput.js", "js")
			
		];

		$.when.apply(null, strict.objectCaches).then(function () {
			var args = Array.prototype.slice.call(arguments);

			for (var n in args) if (args[n] && args[n].instance)
			_this[args[n].instance] = args[n].get('collection');

			_this.itens = [];

			_this.naoConformidadeVazio = new _this.NaoConformidade();

			_this.$(".adagio-naoConformidade-form").html(_this.templateQuestion(_this.naoConformidadeVazio));
			_this.$("#lista_de_naoConformidades").val(0);
			_this.$("#area_alertas").html("");
			$("#painelEvidencias").hide();
			$("#rowEnviaNc").hide();
			$("#selectPoliticaAvaliacao").hide();

			jQuery(function($) {
				//alert("oi");
				//alert($('#inputPlaca').val());
				$.mask.definitions['~']='[+-]';
				$('#inputPlaca').mask('aaa-9999');
				$('#inputCPF').mask('999.999.999-99');
				$('#inputDataInicio').mask('99/99/9999 99:99:99');
				$('#inputDataFinal').mask('99/99/9999 99:99:99');
				//$('#inputDuracao').mask('999:99:99');
			});
			
		});

		return event;
	},

	abrirNaoConformidade: function abrirNaoConformidade(event)
	{
		try {
			$("#area_alertas").html("");

			
			event.preventDefault();
			event.stopPropagation();		

			
			var $currentTarget = this.$(event.currentTarget),
				strict = {},
				_this = this,
				globals = window,
				cid = $currentTarget.data("cid") || $currentTarget.val();
				//alert(cid);

			if (parseInt(cid) === 0) {
				throw new Error("None");
			}

			strict.objectCaches = [
				new globals.objectCache('empresas', adagio.environment.getEndpoint('prestadores'), null, true),
				new globals.objectCache('ufs', adagio.environment.getEndpoint('ufs'), null, true),
				new globals.objectCache('responsavelNc', adagio.environment.getEndpoint('responsavelNc'), null, true),
				new globals.objectCache('tiposNc', adagio.environment.getEndpoint('tiposNc'), null, true),

			];
			//console.log(strict);

		$.when.apply(null, strict.objectCaches).then(function () {	
					
			
			var args = Array.prototype.slice.call(arguments);

			for (var n in args) if (args[n] && args[n].instance)
			_this[args[n].instance] = args[n].get('collection');

			_this.itens = _this.NaoConformidades.get(cid).attributes.itens;
			console.log("abrirNaoConformidade", _this.itens);
			console.log("abrirNaoConformidade", _this.NaoConformidades.get(cid).attributes);

			

			_this.$(".adagio-naoConformidade-form").html(_this.templateQuestion(_this.NaoConformidades.get(cid)));
			if(_this.NaoConformidades.get(cid).attributes.placa_veiculo != ""){
				_this.averiguarPlaca(); 
			}
			if(_this.NaoConformidades.get(cid).attributes.cpf_motorista != ""){
				_this.averiguarDocumento(); 
			}
			     
			_this.buscarMotivoNc(_this.NaoConformidades.get(cid).attributes.responsavel_id, _this.NaoConformidades.get(cid).attributes.motivo_id);
			_this.buscarDetalhamentoNc(_this.NaoConformidades.get(cid).attributes.motivo_id, _this.NaoConformidades.get(cid).attributes.detalhamento_id);
			

			if(_this.NaoConformidades.get(cid).attributes.motivo_id == "17" || _this.NaoConformidades.get(cid).attributes.motivo_id == "18"){
				$("#inputVelocidade").prop("disabled", false);
			}
			else{
				$("#inputVelocidade").prop("disabled", true);
				$("#inputVelocidade").val("");
			}

			if(_this.NaoConformidades.get(cid).attributes.motivo_id == "19"){
				//alert(_this.NaoConformidades.get(cid).attributes.politica_avaliacao);
				$("#selectPoliticaAvaliacao").show();
				$("#inputPoliticaAvaliacao").hide();
				$("#selectPoliticaAvaliacao").prop("disabled", false);	
				$("#inputPoliticaAvaliacao").prop("disabled", true);

				$("#selectPoliticaAvaliacao").val(_this.NaoConformidades.get(cid).attributes.politica_avaliacao);				
			}
			else
			{
				$("#inputPoliticaAvaliacao").show();
				$("#selectPoliticaAvaliacao").hide();
				$("#inputPoliticaAvaliacao").prop("disabled", false);
				$("#selectPoliticaAvaliacao").prop("disabled", true);	
			}
			//alert(_this.NaoConformidades.get(cid).attributes.item_motivo);

			/*	if(this.model.attributes[0].item_motivo== "2.5" || this.model.attributes[0].item_motivo == "2.6"){
					$("#inputVelocidade").prop("disabled", false);
					}
					else{
					$("#inputVelocidade").prop("disabled", true);
				}	*/
				

				if(_this.NaoConformidades.get(cid).attributes.responsavel_id == 1){
					$("#inputPoliticaAvaliacao").prop("disabled", true);
					$("#inputPoliticaAvaliacao").val("");
					$("#selectPoliticaAvaliacao").prop("disabled", true);
					$('#selectPoliticaAvaliacao').val("0");
					
	
					$("#inputPontuacao").prop("disabled", true);
					$("#inputPontuacao").val("");
				}
				else if(_this.NaoConformidades.get(cid).attributes.responsavel_id == 2){
					//$("#inputPoliticaAvaliacao").prop("disabled", false);
	
					$("#inputPontuacao").prop("disabled", false);
	
				}	


			$("#painelEvidencias").show();
			$("#rowEnviaNc").show();
		
			jQuery(function($) {
				//alert("oi");
				//alert($('#inputPlaca').val());
				$.mask.definitions['~']='[+-]';
				$('#inputPlaca').mask('aaa-9999');
				$('#inputCPF').mask('999.999.999-99');
				$('#inputDataInicio').mask('99/99/9999 99:99:99');
				$('#inputDataFinal').mask('99/99/9999 99:99:99');
				//$('#inputDuracao').mask('999:99:99');
			});



		});

	}
	catch (caughtError) {
		console.error(caughtError);
	}
	finally {
		return event;
	}},

	averiguarDocumento: function averiguarDocumento(evento)
	{
		
		if(this.$("#inputCPF").val() == ""){
			alert("Informe um CPF!");
		}
		else{
			try {
				var parametro = this.$el.find("#inputCPF").val();
                parametro = parametro.replace(/[^\d]+/g,'');
				$.ajax({
					"url": adagio.environment.getEndpoint("naoConformidades/buscadocvencidoscpf/" + parametro),
					"method": "get",
					"dataType": "json",
					"context": this
				})
				.done(function (response) {
					var hashedUrl = response.model.url
						? response.model.url.replace(/client\/v[0-9]+\//, '#!/')
						: '';
					if (response.encontrado === false) {
						this.$("#inputCPF").parent().attr("class", "col-sm-3 has-error");
						this.$("#situacaoPessoa").text("Não localizado");
					}
					if (response.nome_condutor.length === 0) {
						this.$("#inputCPF").parent().attr("class", "col-sm-3 has-error");
						this.$("#situacaoPessoa").text("Não localizado");
					}
					else if (response.model.status_quo.vencimentos.length > 0) {
						this.$("#inputCPF").val(response.cpf).parent().attr("class", "col-sm-3 has-error");
						this.$("#situacaoPessoa").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.vencimentos.length + ' vencimentos</a>');
						
						_(response.dados).each(function (item) {
							this.$("#area_alertas").append(`<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>` + item.titulo + `</strong> em vencimento para ` + (new Date(item.vencimento).toISOString().slice(0, 10).split("-").reverse().join("/")) +
							`.</div>`);
							this.$('[data-documento="'+item.tipo+'"]').trigger("dblclick", [true]);
						},
						this);
					}
					else if (response.model.status_quo.ausentes.length > 0) {
						this.$("#inputCPF").parent().attr("class", "col-sm-3 has-warning");
						this.$("#situacaoPessoa").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.ausentes.length + ' ausências</a>');
					}
					else if (response.model.status_quo.pendentes.length > 0) {
						this.$("#inputCPF").parent().attr("class", "col-sm-3 has-warning");
						this.$("#situacaoPessoa").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.pendentes.length + ' pendências</a>');
					}
					else {
						this.$("#inputCPF").val(response.cpf).parent().attr("class", "col-sm-3 has-success");
						this.$("#situacaoPessoa").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Regular</a>');
					}
					this.$("#inputMotorista").val(response.nome_condutor);
					if(response.status_condutor === true){
					this.$("#statusMotorista").text("Ativo").parent().attr("class", "col-sm-1 has-success");
					//this.$("#statusMotorista").parent().attr("class", "col-sm-1 has-success")
					}
					else if(response.status_condutor === false){
						this.$("#statusMotorista").text("Inativo").parent().attr("class", "col-sm-1 has-error");
					}

					this.$("#inputCpfId").val(response.cpf_id);
					this.$('#inputCPF').mask('999.999.999-99');
				});
			}
			catch (caughtError) {
				console.error(caughtError);
			}
		}
	},
	averiguarPlaca: function averiguarPlaca(event)
	{
		if(this.$("#inputPlaca").val() == ""){
			alert("Informe uma placa!");
		}
		else{
			try {
				var parametro = this.$el.find("#inputPlaca").val();

				$.ajax({
					"url": adagio.environment.getEndpoint("naoConformidades/buscadocvencidosplaca/" + parametro),
					"method": "get",
					"dataType": "json",
					"context": this
				})
				.then(function (response) {
					var hashedUrl = response.model.url
						? response.model.url.replace(/client\/v[0-9]+\//, '#!/')
						: '';

					if (response.encontrado === false) {
						this.$("#inputPlaca").parent().attr("class", "col-sm-3 has-error");				
						this.$("#situacaoVeiculo").text("Não localizado");
					} else if (response.model.status_quo.vencimentos.length > 0) {
						this.$("#inputPlaca").parent().attr("class", "col-sm-3 has-error");	
						this.$("#situacaoVeiculo").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.vencimentos.length + ' vencimentos</a>');
						_(response.dados).each(function(item) {
							this.$("#area_alertas").append(`<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>` + item.titulo + `</strong> em vencimento para ` + (new Date(item.vencimento).toISOString().slice(0, 10).split("-").reverse().join("/")) +
							`.</div>`);
							console.log('[data-documento="'+item.tipo+'"]');
							this.$('[data-documento="'+item.tipo+'"]').trigger("dblclick", [true]);
						}, this);
					} else if (response.model.status_quo.ausentes.length > 0) {
						this.$("#inputPlaca").parent().attr("class", "col-sm-3 has-warning");	
						this.$("#situacaoVeiculo").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.ausentes.length + ' ausências</a>');
					} else if (response.model.status_quo.pendentes.length > 0) {
						this.$("#inputPlaca").parent().attr("class", "col-sm-3 has-warning");	
						this.$("#situacaoVeiculo").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> ' + response.model.status_quo.pendentes.length + ' pendências</a>');
					} else {
						this.$("#inputPlaca").parent().attr("class", "col-sm-3 has-success");	
						this.$("#situacaoVeiculo").html('<a href="' + hashedUrl + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Regular</a>');
					}

					//this.$("#inputPlaca").val(response.placa);
					this.$("#inputPlacaId").val(response.placa_id);
					this.$('#inputPlaca').mask('aaa-9999');

				});
			}
			catch (caughtError) {
				console.error(caughtError);
			}
		}
	},

	buscarMotivoNc: function buscarMotivoNc(responsavelNc ,  motivoNc = 0)
	{
		if(responsavelNc!== "0")
		{ 
			$.ajax({
				url: adagio.environment.getEndpoint("responsavelNc/"+responsavelNc),
				global: false
				}).done(function (retorno) {         
				
					var option = "";
					for(var i = 0; i < retorno.qtdados; i++){
						var selecionado = parseInt(retorno.dados[i].id) === parseInt(motivoNc)? " selected" : "";
						option += '<option '+selecionado+' value="'+ retorno.dados[i].id +'" class="dinamico" id="d'+ i +'">'+ retorno.dados[i].item +" - "+ retorno.dados[i].descricao +'</option>';
					}

					$("#inputMotivo .dinamico").remove();
					$("#inputMotivo").append(option);
					//$("#inputDetalhamento #d0").attr("selected", "selected");

			}).fail(function (retorno) {
				alert("Um erro ocorreu!");
			}); 
		}else{
			$("#inputMotivo .dinamico").remove();			
		} 
	},

	buscarDetalhamentoNc: function buscarDetalhamentoNc(motivoNc,  detalhamentoNc = 0)
	{ 	

		if(motivoNc !== "0")		
		{         

			$.ajax({
				url: adagio.environment.getEndpoint("tiposNc/"+motivoNc),
				global: false
				}).done(function (retorno) {          

					var option = "";
					for(var i = 0; i < retorno.qtdados; i++){
						var selecionado = parseInt(retorno.dados[i].id) === parseInt(detalhamentoNc)? " selected" : "";
						option += '<option'+selecionado+' value="'+ retorno.dados[i].id +'" class="dinamico" id="d'+ i +'">'+ retorno.dados[i].subitem +" - "+ retorno.dados[i].descricao +'</option>';
					}

					$("#inputDetalhamento .dinamico").remove();
					$("#inputDetalhamento").append(option);
					//$("#inputDetalhamento #d0").attr("selected", "selected");

			}).fail(function (retorno) {
				alert("Um erro ocorreu!");
			});  
		}else{
			$("#inputDetalhamento .dinamico").remove();
		}
	},

}