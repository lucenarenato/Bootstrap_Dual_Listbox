{
	tagName: "div",
	id: "adagio-home",
	className: "adagio-naoConformidades_editar",
	events: {
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
			if($("#inputDescricaoMotivo").val() == "2.5 - Excesso de velocidade" || $("#inputDescricaoMotivo").val() == "2.6 - Excesso de velocidade na chuva")
			{
				$("#inputVelocidade").prop("disabled", false);
			}
			else{
				$("#inputVelocidade").prop("disabled", true);
				$("#inputVelocidade").val("");
			}	

			if($("#inputResponsavelNc").val() == 2)
			{				
				if($("#inputDescricaoMotivo").val() == "2.7 - Infrações cometidas por desrespeito ao CTB, e/ou, emitidas por autoridades de trânsito")
				{
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
		{			//alert("oi");
					  
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

	"enviarNaoConformidade": function enviarNaoConformidade(event)
	{

		var self = event.currentTarget, local = {}, global = this; 
		
		local.cid = global.$("input[name=cid]").val ();
			
	  try {
		var forms = global.$(".input-nc").serialize(); // .replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '');
  
		$.ajax({
		  "url": adagio.environment.getEndpoint("naoConformidades"),
		  "method": "post",
		  "data": forms,
		  "context": global
		})
		.done(function (data, textStatus, jqXHR) {
		  if (jqXHR.getResponseHeader("Location")) {
				global.model.set("url", jqXHR.getResponseHeader("Location"));
		  }
		  if (data.error) {
			for (var n in data.errors) {
			  global.$('[name="' + n + '"]').closest(".form-group").attr("class", "form-group has-error");
			  for (o in data.errors[n]) {
					global.$('[name="' + n + '"]').closest("form").prepend('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + data.errors[n][o] + '</div>');
			  }
			}
		  } else {
			// ok 
		  }
		  return jqXHR;
		});
		
		//tirar comentario depois para remover nc do combobox
		//global.NaoConformidades.remove (local.cid);
		//global.storage.set ("naoConformidades", global.NaoConformidades.toJSON ());
		//this.apagarNaoConformidade(local.cid);
	  } catch (thrown) {
		console.error(thrown);
	  } finally {
		event.preventDefault();
		event.stopPropagation();
	  }
	},
	carregarFotos: function carregarFotos(event)
	{
			var self = this,
					fragmento = document.createDocumentFragment();

			this.collection.fotos.each(function (foto) {
					var item = Backbone.View.extend(this.subviews["nao_conformidades_foto"]);

					fragmento.appendChild(new item({model: foto}).el);
			}, this);

			this.$("#fotos").append(fragmento);

			event.preventDefault();
	},

	subviews:
	{
			"nao_conformidades_foto": {
					tagName: "div",
					className: "col-sm-3",
					template: _.template('<div class="thumbnail">' +
					'<a href="#" class="a-album"><img src="/storage/<%= view.get("id") %>" alt="Imagem"<%= this.dataAsAttr %> /></a>' +
					'<div class="caption"><p><%= view.get("observacoes") %></p></div>' +
					'</div>',
					{variable: 'view'}),
					initialize: function (options) {
							return this.render();
					},
					render: function () {
							try {
									var dataAsAttr = '';
									this.model.attributes.update = adagio.environment.getEndpoint([
											"naoConformidades", this.model.get("naoConformidade"), "fotos", this.model.get("id")
									].join("/"));
									_.each(this.model.attributes, function (value, key, list) {
											// this.$el.find("img").data(key, value);
											if (typeof value === 'string') {
													dataAsAttr += ' data-' + key + '="' + value + '"';
											}
									}, this);
									this.dataAsAttr = dataAsAttr;
									this.$el.html(this.template(this.model));
							}
							catch (error) {
									console.error(error);
							}
							finally {
									this.listenTo(this.model, 'change', this.editing);
									this.listenTo(this.model, 'destroy', this.erasing);

									return this;
							}
					},
					editing: function () {
							try {
									this.$el.find(".thumbnail").replaceWith(this.template(this.model));
							}
							catch (error) {
									console.error(error);
							}
							finally {
									return this;
							}
					},
					erasing: function () {
							return this;
					}
			},
	},
	template: _.template(`
	<div class="container-fluid">
	<div class="row">
		<div class="col-xs-12">
			<div id="area_alertas"></div>
			<div class="adagio-notification"></div>
		</div>
	</div>
	<div class="row">

	</div><!-- /.col-xs-* -->
	<div class="col-xs-12 col-sm-6">
		<p class="lead nc-autor"></p>
	</div><!-- /.col-xs-* -->
	</div><!-- /row -->
	<div class="row">
	&nbsp;
	</div>
<form class="form-horizontal input-nc">
<input name="cid" value="<% print (adagio.cid === undefined ? -1 : adagio.cid) %>" type="hidden">
<input name="id" value="<%= adagio.attributes[0].id %>" type="hidden">
<fieldset>
	<div class="form-group">
	<div class="row">
		<label for="inputResponsavelNc" class="col-sm-2 control-label">Responsável pela NC*</label>
		<div class="col-sm-2">
		<select name="responsavel_id" class="form-control form-responsavelNc" id="inputResponsavelNc">
			<option value="0">Selecionar...</option>
			<% adagio.get('responsavelNcCol').each (function (responsavel) { %>   
				<option class="oculto" <%= (parseInt (responsavel.id) === parseInt (adagio.attributes[0].responsavel_id) ? "selected" : "") %> value="<%= responsavel.id %>"><%= responsavel.attributes.responsavel.toString ().toUpperCase () %></option>
		  	<% }); %>
		</select>  
		</div>
		<label for="inputUf" class="col-sm-1 control-label">UF*</label>
		<div class="col-sm-2">  
			<select name="uf_id" class="form-control" id="inputUf">
				<option value="0">Selecionar...</option>
				<% adagio.get('ufsCol').each (function (uf) { %>   
					<option class="oculto" <%= (parseInt (uf.id) === parseInt (adagio.attributes[0].uf_id) ? "selected" : "") %> value="<%= uf.id %>"><%= uf.attributes.uf.toString ().toUpperCase () %></option>
				  <% }); %>
			</select>                   
		</div>
		<label for="inputTransportadora" class="col-sm-1 control-label">Transportadora*</label>
		<div class="col-sm-3">
			<select name="transportadora_id" class="form-control" id="inputTransportadora">
				<option value="0">Selecionar...</option>
				<% adagio.get('gruposKit').each (function (frota) { %>
					<option  <%= (parseInt (frota.id) === parseInt (adagio.attributes[0].transportadora_id) ? "selected" : "") %> value="<%= frota.get('id') %>"><%= frota.get('nome').toString().toUpperCase() %></option>
					<% }); %>
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
					<% adagio.get('regioesKit').each (function (frota) { %>
            <option  <%= (parseInt (frota.id) === parseInt (adagio.attributes[0].regiao_leiteira_id) ? "selected" : "") %> value="<%= frota.get('id') %>"><%= frota.get('nome').toString().toUpperCase() %></option>
            <% }); %>
				</select>
			</div>
			<label for="inputPercurso" class="col-sm-1 control-label">Percurso*</label>
			<div class="col-sm-2">
				<select name="percurso_id" class="form-control" id="inputPercurso"><% _(["Selecionar...", "T1", "T2"]).each (function (tesao, i) { %><option <%= (i === parseInt (adagio.attributes[0].percurso_id) ? "selected" : "") %> value="<%= i %>"><%= tesao %></option><% }); %></select>
			</div>
			<label for="inputPlaca" class="col-sm-1 control-label">Veículo*</label>
			<div class="col-sm-3">
			<input name="placa_id" id="inputPlacaId" value="<% adagio.attributes[0].placa_id %>" type="hidden">
			<input id="inputPlaca" class="form-control" style="text-transform: uppercase" type="text" name="placa_veiculo" value="<%= adagio.attributes[0].placa_veiculo %>">
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
				<input name="cpf_id" id="inputCpfId" value="<% adagio.attributes[0].cpf_id %>" type="hidden">
				<input id="inputCPF" name="cpf_motorista" class="form-control" type="text" value="<%= adagio.attributes[0].cpf_motorista %>">
				<p class="help-block" id="situacaoPessoa">Consultar situação</p>
				<button type="button" class="btn btn-xs btn-outline btn-info btn-block" id="consultarPessoa">Buscar</button>
			</div>
			<label for="inputMotorista" class="col-sm-1 control-label">Motorista</label>
			<div class="col-sm-4">
				<input id="inputMotorista" name="nome_motorista" class="form-control" type="text" value="<%= adagio.attributes[0].nome_motorista %>">
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
				<input name="dataInicio" type="text" id="inputDataInicio" class="form-control" placeholder="dd/mm/aaaa hh:mm:ss" value="<%= adagio.attributes.data_inicio_formatada %>"/>
				<div class="checkbox"><label><input type="checkbox" id="checkboxDataAtual"> <span class="text">Data Atual</span></label></div>	
				</div>
			<label for="inputDataFinal" class="col-sm-2 control-label">Data / Hora Final*</label>
			<div class="col-sm-2">			 	
				<input name="dataFinal" type="text" id="inputDataFinal" class="form-control" placeholder="dd/mm/aaaa hh:mm:ss" value="<%= adagio.attributes.data_final_formatada %>"/>
			</div>
			<label for="inputDuracao" class="col-sm-1 control-label">Duração*</label>
			<div class="col-sm-2">
				<input id="inputDuracao" name="duracao" class="form-control" type="text" placeholder="hh:mm:ss" value="<%= adagio.attributes[0].duracao %>" readonly>
			</div>
		</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<div class="row">
			<label for="inputVelocidade" class="col-sm-2 control-label">Velocidade K/H</label>
			<div class="col-sm-2">
				<input name="velocidade" type="text" id="inputVelocidade" class="form-control" disabled value="<%= adagio.attributes[0].velocidade %>" />
			</div>
			<label for="inputPoliticaAvaliacao" class="col-sm-2 control-label">Política de Avaliação</label>
			<div class="col-sm-2">
				<input name="politica_avaliacao" type="text" id="inputPoliticaAvaliacao" class="form-control" disabled value="<%= adagio.attributes[0].politica_avaliacao %>"/>
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
				<input id="inputPontuacao" name="pontuacao" class="form-control" type="text" disabled value="<%= adagio.attributes[0].pontuacao %>" />
			</div>
		</div>
	</div>
</fieldset>
<fieldset>
	<div class="form-group">
		<div class="row">
			<label for="inputPassword3" class="col-sm-2 control-label">Comentário</label>
			<div class="col-sm-9">
				<textarea class="form-control" id="inputComentario" name="comentario"><%= adagio.attributes[0].comentario %></textarea>
			</div>
		</div>
	</div>
</fieldset>
</form>
<div class="clearfix"><br /></div>
<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">Registros - Evidências</h3>
	</div>
	<div class="panel-body">
		<form id="filedrag" class="form-horizontal form-photos">
				<div class="warning-form-photos"></div>
				<div class="form-group">
						<div class="col-xs-12 col-sm-6"><input type="file" id="fileselect" name="fileselect[]" multiple="multiple" /></div>
						<div class="col-xs-12 col-sm-6" id="submitbutton"><button type="submit" class="btn btn-default btn-block">Upload</button></div>
				</div>
		</form>
	</div>
	<div class="panel-footer">
		<div id="progress"></div>
		<div id="messages">Por favor, envie apenas arquivos no formato de imagens válidas (jpg, jpeg, png, gif).</div>
	</div>
</div>
					<div class="row" id="fotos"></div>
			</div>

<div id="rowEnviaNc" class="row">
<hr>
<div class="col-sm-offset-10 col-sm-2">
	<button type="button" id="enviarNaoConformidade" class="btn btn-default btn-block naoConformidade-enviar">Salvar</button>
</div>
</div>


	</div>
	`,
	{"variable": "adagio"}),		
	initialize: function ()
	{
		try {

			console.log(this.model);

			this
			
			.getJSON(adagio.environment.getEndpoint("prestadores"))
			.getJSON(adagio.environment.getEndpoint("responsavelNc"))
			.getJSON(adagio.environment.getEndpoint("ufs"))
			.getJSON(adagio.environment.getEndpoint("tiposNc"))
			.load("web")
			.getScript ("/jquery.maskedinput-master/src/jquery.maskedinput.js", "js")
			.getScript ("/moment-develop/min/moment.min.js", "js")
			.release(); 
			
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
		jQuery(function($) {
			//alert("oi");
			//alert($('#inputPlaca').val());
			$.mask.definitions['~']='[+-]';
			$('#inputPlaca').mask('aaa-9999');
			$('#inputCPF').mask('999.999.999-99');
			$('#inputDataInicio').mask('99/99/9999 99:99:99');
			$('#inputDataFinal').mask('99/99/9999 99:99:99');
			//$('#inputDuracao').mask('99:99:99');
		});
	//	console.log(this.model.attributes[0].responsavel_id);		
		
				// Method scopes
				var strict = {}, _this = this, globals = window;
				console.log(_this.model);
				//
				$.when.apply(null, strict.objectCaches).then(function () {
					var args = Array.prototype.slice.call(arguments);
		
					//for (var n in args) if (args[n] && args[n].instance)
					//_this[args[n].instance] = args[n].get('collection');
		
		
					_this.$el.html(_this.template(_this.model)).attr("class", _this.className);
		
					//
					_this.collection.fotos = new Backbone.Collection();
					//alert(_this.model.get('id'));
					//console.log(_this.collection);
					_this.collection.fotos.url = adagio.environment.getEndpoint('naoConformidades/'+_this.model.attributes[0].id+'/fotos');
					_this.collection.fotos.fetch().done(function (response) {
						//console.log(_this.collection);
						_this.carregarFotos({currentTarget: _this.$("#fotos"), preventDefault: function (){}});
					});

				

	/*	if (this.$el.attr("class") === undefined) {
			this.$el.html(this.template(this.model)).attr("class", this.className);
		}
		else if (this.$el.attr("class") !== this.className) {
			this.$el.html(this.template(this.model)).attr("class", this.className);
		}
		else {
			//
		}*/
		_this.buscarMotivoNc(_this.model.attributes[0].responsavel_id, _this.model.attributes[0].motivo_id);
		_this.buscarDetalhamentoNc(_this.model.attributes[0].motivo_id,_this.model.attributes[0].detalhamento_id);
		
		//alert($("#inputMotivo option:selected").text());
		if(_this.model.attributes[0].item_motivo == "2.5" || _this.model.attributes[0].item_motivo == "2.6"){
			$("#inputVelocidade").prop("disabled", false);
			}
			else{
			$("#inputVelocidade").prop("disabled", true);
			$("#inputVelocidade").val("");
		}
		
		if(_this.model.attributes[0].item_motivo == "2.7"){
			//alert(_this.model.attributes[0].politica_avaliacao);
			$("#selectPoliticaAvaliacao").show();
			$("#inputPoliticaAvaliacao").hide();
			$("#selectPoliticaAvaliacao").prop("disabled", false);	
			$("#inputPoliticaAvaliacao").prop("disabled", true);

			$("#selectPoliticaAvaliacao").val(_this.model.attributes[0].politica_avaliacao);				
		}
		else
		{
			$("#inputPoliticaAvaliacao").show();
			$("#selectPoliticaAvaliacao").hide();
			$("#inputPoliticaAvaliacao").prop("disabled", false);
			$("#selectPoliticaAvaliacao").prop("disabled", true);	
		}
		
		if(_this.model.attributes[0].responsavel_id == 1){
			$("#inputPoliticaAvaliacao").prop("disabled", true);
			$("#inputPoliticaAvaliacao").val("");
			$("#selectPoliticaAvaliacao").prop("disabled", true);
			$('#selectPoliticaAvaliacao').val("0");

			$("#inputPontuacao").prop("disabled", true);
			$("#inputPontuacao").val("");
		}
		else if(_this.model.attributes[0].responsavel_id == 2){
			$("#inputPoliticaAvaliacao").prop("disabled", false);

			$("#inputPontuacao").prop("disabled", false);

		}
		_this.averiguarPlaca(); 
		_this.averiguarDocumento();
		this.$('#inputDataInicio').mask('99/99/9999 99:99:99');
		this.$('#inputDataFinal').mask('99/99/9999 99:99:99');
		//this.$('#inputDuracao').mask('99:99:99');


		if (window.File && window.FileList && window.FileReader) {
		//	alert("oi");
			_this.Init(_this);
	}

	_this.$(".nc-autor").html(
      "<small class='text-muted'><i class='fa fa-clock-o'></i> " + _this.model.attributes[0].created_at.substr(-8) + "&nbsp;&mdash;&nbsp;" +
      "<i class='fa fa-calendar-o'></i> " + _this.model.attributes[0].created_at.substr(8, 2) + "/" + _this.model.attributes[0].created_at.substr(5, 2) + "/" + _this.model.attributes[0].created_at.substr(0, 4) +
      "</small><br /><small><i class='fa fa-clock-o'></i> " + _this.model.attributes[0].updated_at.substr(-8) +
      "&nbsp;&mdash;&nbsp;<i class='fa fa-calendar-o'></i> " + _this.model.attributes[0].updated_at.substr(8, 2) + "/" + _this.model.attributes[0].updated_at.substr(5, 2) + "/" + _this.model.attributes[0].updated_at.substr(0, 4) +
      "</small>"
		);
	});
		//var innerForm = ['naoConformidades'].join('_');
	//	console.log(local.NaoConformidades);
		
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
	$id: function (id)
	{
			return document.getElementById(id);
	},
	Output: function (foto)
	{
			var variaveis = {};

			variaveis.photo = Backbone.View.extend(this.subviews["nao_conformidades_foto"]);
			variaveis.item = new variaveis.photo({model: foto});
			variaveis.fragmento = document.createDocumentFragment();
			// variaveis.item.delegateEvents();
			variaveis.fragmento.appendChild(variaveis.item.render().el);

			this.$("#fotos").append(variaveis.fragmento);
	},
	FileDragHover: function (event)
	{
			event.stopPropagation();
			event.preventDefault();
	},
	ParseFile: function (file, blob)
	{
			var _this = this;
			if (file.get('type').indexOf("image") == 0) {
					var reader = new FileReader();
					reader.onload = function(e) {
							file.set('base64', e.target.result);
							_this.Output(file);
					}
					reader.readAsDataURL(blob);
			}
			if (file.get ('type').indexOf ("text") == 0) {
					var reader = new FileReader();
					reader.onload = function (e) {
							// Output ("<p><strong>" + file.name + ":</strong></p><pre>" + e.target.result.replace (/</g, "&lt;").replace (/>/g, "&gt;") + "</pre>");
					}
					reader.readAsText(blob);
			}
	},
UploadFile: function uploadFile(event, file, blob) {
	try {
		var
			_this = this,
			$currentTarget = this.$(event.currentTarget),
			uploadFormData = new FormData();

		uploadFormData.append("foto", blob);

		return _this.collection.fotos.create(null, {
			"timeout": 60000,
			"wait": true,
			"processData": false,
			"contentType": false,
			"data": uploadFormData,
			"complete": function (jqXHR, textStatus) {
				var response = jqXHR.responseJSON;

				$currentTarget.closest("form").find("[class^=warning-]").empty();

				if (response.error) {
					for (var n in response.errors) {
						$currentTarget.closest("form").
						find("[class^=warning-]").
						append(
							'<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
							response.errors[n] +
							'</div>'
						);
					}
				}
				else {
					if (response.collection) {
						console.log(response.collection[0]);
						console.log(_this.model.attributes[0].id);
						file.set({"id": response.collection[0].model.arquivo, "naoConformidade": _this.model.attributes[0].id});
					}
				}
				_this.ParseFile(file, blob);
			}
		});
	}
	catch (error) {
		console.error(error);
	}
},
FileSelectHandler: function fileSelectHandler(event, _this) {
	var files = event.target.files || event.dataTransfer.files;
	for (var i = 0, f; f = files[i]; i++) {
		// if (f && f.type && f.type.search (/\bimage\//i) === -1) continue;
		model = new Backbone.Model(f);
		_this.UploadFile(event, model, f);
	}
	return _this.FileDragHover(event);
},
// initialize
Init: function (_this) {
	var
		fileselect = _this.$id("fileselect"),
		filedrag = _this.$id("filedrag"),
		submitbutton = _this.$id("submitbutton");

	fileselect.addEventListener("change", function (event) {
		_this.FileSelectHandler(event, _this);
	},
	false);

	var xhr = new XMLHttpRequest();
	if (xhr.upload) {
		// file drop
		// filedrag.addEventListener("dragover", _this.FileDragHover, false);
		// filedrag.addEventListener("dragleave", _this.FileDragHover, false);
		// filedrag.addEventListener("drop", _this.FileSelectHandler, false);
		filedrag.style.display = "block";
		// remove submit button
		submitbutton.style.display = "none";
	}
},
    notification: window.handling.notification

}