{
	tagName: "div",
	id: "adagio-home",
	className: "adagio-nao-conformidades-ver",
	events: {
		"click #salvarRecurso": "salvarRecurso",
		"click #salvarRetornoNc": "salvarRetornoNc",
		"click #salvarDeferimentoNc": "salvarDeferimentoNc",
		"click #salvarIndeferimentoNc": "salvarIndeferimentoNc",
		"click .mostrar-recursos": "mostrarRecursos",
		"click .mostrar-retornoNc": "mostrarRetornoNc",
		"click .to-edit": "editarNaoConformidade",
		"click #enviarEmailRecurso": "enviarEmailRecurso",	
		"click #enviarEmailRetornoNc": "enviarEmailRetornoNcAssinada",
		"click #enviarEmailDeferimento": "enviarEmailDeferimento",
		"click #enviarEmailInDeferimento": "enviarEmailInDeferimento"	
	},
	editarNaoConformidade: function editarNaoConformidade(event)
	{ 
		event.preventDefault();
		adagio.eventBus.trigger("navigate", location.hash + '/edit', {trigger: true});
	},
	enviarEmailRecurso: function (event)
	{ 
		event.stopPropagation();
		event.preventDefault();

		if(this.recursos.length > 0){
			//alert("oi");

			if(this.model.get('status_nc') === 1){
				this.tratamentoStatus(isEmRecurso = true);
			}

			$.ajax({
				"url": adagio.environment.getEndpoint("naoConformidades/notificador/" + this.model.attributes.id),
				//"async":false,
				"method": "get",
				"context": this,
				"data": {"tipoNotificador": 'recurso'}
			}).done(function (data, textStatus, jqXHR) {
				//alert("oi");
				//alert(jqXHR);
			if (jqXHR.getResponseHeader("Location")) {
				//this.model.set("url", jqXHR.getResponseHeader("Location"));
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
	}
	else
	{
		alert("Selecione um arquivo!");
	}

	return this;
},
enviarEmailRetornoNcAssinada: function (event)
	{ //console.log(this.model.attributes.id);
		//alert(this.model.attributes.id);      
					  //alert(nc_id);

		if(this.retornoNc.length > 0){

			this.tratamentoStatusRecurso(isRetornoNc = true);

			$.ajax({
				"url": adagio.environment.getEndpoint("naoConformidades/notificador/" + this.model.attributes.id),
				//"async":false,
				"method": "get",
				"context": this,
				"data": {"tipoNotificador": 'ncAssinada'}
			}).done(function (data, textStatus, jqXHR) {
				//alert("oi");
				//alert(jqXHR);
			if (jqXHR.getResponseHeader("Location")) {
				//this.model.set("url", jqXHR.getResponseHeader("Location"));
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
	}
	else
	{
		alert("Selecione um arquivo!");
	}
},

enviarEmailDeferimento: function (event)
{ 
	if(this.deferimentoNc.length > 0){
		this.alterarStatusRecurso(3);
		this.enviarEmailStatus('deferimento');
	}
	else
	{
		alert("Insira ao menos um comentário!");
	}
},

enviarEmailInDeferimento: function (event)
{ 
	if(this.indeferimentoNc.length > 0){
		this.alterarStatusRecurso(4);
		this.enviarEmailStatus('indeferimento');
	}
	else
	{
		alert("Insira ao menos um comentário!");
	}
},

mostrarRecursos: function mostrarRecursos(event)
    {
		event.preventDefault();
		
		//console.log(this.$(".numeros-recursos"));

		// if body hasClass small_sidebar | obsolete
		
		/*if (this.$(".nao-conformidade-col-left label").hasClass("hidden-xs") === false) {
            this.$(".nao-conformidade-col-left label").addClass("hidden-xs");
            this.$(".nao-conformidade-col-left").attr("class", "col-md-12 nao-conformidade-col-left");
			this.$(".nao-conformidade-col-right").attr("class", "visible-xs-block nao-conformidade-col-right");
			this.$(".nao-conformidade-col-right-retorno").attr("class", "visible-xs-block nao-conformidade-col-right-retorno");
            this.$('#sidebar_toggle').trigger('click');
        }
        else {
            this.$(".nao-conformidade-col-left label").removeClass("hidden-xs");
            this.$(".nao-conformidade-col-left").attr("class", "col-md-7 nao-conformidade-col-left");
			this.$(".nao-conformidade-col-right").attr("class", "col-md-5 nao-conformidade-col-right");
			this.$(".nao-conformidade-col-right-retorno").attr("class", "visible-xs-block nao-conformidade-col-right-retorno");
            this.$('#sidebar_toggle').trigger('click');
		}	*/
		
		$("#divRecurso").toggle("slow");

		$("#divRetorno").hide("slow");

		setTimeout(function() { $("#conteudoRecurso").focus(); }, 0); 
  			
		$('html, body').animate({
			scrollTop: $('#divRecurso').offset().top
		}, 700);
	},
	mostrarRetornoNc: function mostrarRetornoNc(event)
    {
        //event.preventDefault();

        // if body hasClass small_sidebar | obsolete
		/*if (this.$(".nao-conformidade-col-left label").hasClass("hidden-xs") === false) {
            this.$(".nao-conformidade-col-left label").addClass("hidden-xs");
            this.$(".nao-conformidade-col-left").attr("class", "col-md-12 nao-conformidade-col-left");
			this.$(".nao-conformidade-col-right-retorno").attr("class", "visible-xs-block nao-conformidade-col-right-retorno");
			this.$(".nao-conformidade-col-right").attr("class", "visible-xs-block nao-conformidade-col-right");
            this.$('#sidebar_toggle').trigger('click');
        }
        else {
            this.$(".nao-conformidade-col-left label").removeClass("hidden-xs");
            this.$(".nao-conformidade-col-left").attr("class", "col-md-7 nao-conformidade-col-left");
			this.$(".nao-conformidade-col-right-retorno").attr("class", "col-md-5 nao-conformidade-col-right-retorno");
			this.$(".nao-conformidade-col-right").attr("class", "visible-xs-block nao-conformidade-col-right");
            this.$('#sidebar_toggle').trigger('click');
		}*/		

		$("#divRetorno").toggle("slow");
		$("#divRecurso").hide("slow");

				
		//$("#conteudoRetornoNc").focus();
		setTimeout(function() { $("#conteudoRetornoNc").focus(); }, 0); 
  			
		$('html, body').animate({
			scrollTop: $('#divRetorno').offset().top
		}, 700);
	},

	mostrarDivStatusRecurso: function mostrarDivStatusRecurso(codigoStatus)
    {
		//event.preventDefault();
		//alert(codigoStatus);
		if(codigoStatus == 3){
			$("#divDeferimento").toggle("slow");
			$("#divIndeferimento").hide("slow");

			setTimeout(function() { $("#conteudoDeferimentoNc").focus(); }, 0); 
				
			$('html, body').animate({
				scrollTop: $('#divDeferimento').offset().top
			}, 700);
		}
		else if(codigoStatus == 4){
			$("#divIndeferimento").toggle("slow");
			$("#divDeferimento").hide("slow");

			setTimeout(function() { $("#conteudoIndeferimentoNc").focus(); }, 0); 
				
			$('html, body').animate({
				scrollTop: $('#divIndeferimento').offset().top
			}, 700);
		}
	
	},
	storage:
	{
		set: function (key, value) {
			if (!key || !value) return [];

			if (typeof value === "object") value = JSON.stringify(value);

			window.localStorage.setItem(key, value);

			return this.get(key);
		},
		get: function (key) {
			var value = localStorage.getItem(key);

			if (!value) return [];

			if (value[0] === "{" || value[0] === "[") value = JSON.parse(value);

			return value;
		},
	},

	"subviews":
	{
		"nao_conformidades_foto":
		{
			tagName: "div",
			className: "col-sm-3",
			template: _.template('<div class="thumbnail">' +
			'<a href="#" class="a-album"><img src="/storage/<%= view.get("id") %>" alt="Imagem" /></a>' +
			'<div class="caption"><p><%= view.get("observacoes") %></p></div>' +
			'</div>',
			{variable: 'view'}),
			initialize: function (options) {
				
				return this.render();
			},
			render: function () {
				try {
					
					//src="/storage/<%= view.get("id") %>"
					//alert(["naoConformidades", this.model.get("id_nao_conformidade"), "fotos", this.model.get("hash_arquivo")].join("/"));
				
					
					this.$el.html(this.template(this.model));
					this.model.attributes.update = adagio.environment.getEndpoint(
					["naoConformidades", this.model.get("naoConformidade"), "fotos", this.model.get("id")].join("/")
					);

					_.each(this.model.attributes, function (value, key, list) {
						
						this.$el.find("img").data(key, value);
					},
					this);



					/*this.$el.html(this.template(this.model));
					this.model.attributes.update = adagio.environment.getEndpoint(
					["operacoes", this.model.get("operacao"), "fotos", this.model.get("id")].join("/")
					);

					_.each(this.model.attributes, function (value, key, list) {
						this.$el.find("img").data(key, value);
					},
					this);*/
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
				//alert("oi");
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
				//alert("oi");
				return this;
			}
		},
	},
	template: _.template(`
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12 col-sm-3">
					<div class="btn-group">
						<button id="mostra-status-nc" type="button" class="btn btn-default nc-status">Carregando...</button>
						<button id="controle-status-nc" type="button" class="btn btn-default nc-status dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>
						<ul class="dropdown-menu" role="menu">	
							<li><a href="#" class="status-nc" data-status-nc="4">Cancelar</a></li>
							<li><a href="#" class="to-edit">Editar</a></li>
						</ul>
					</div>
					<div class="btn-group">
						<button id="mostra-status-recurso" type="button" class="btn btn-default recurso-status">Carregando...</button>
						<button id="controle-status-recurso" type="button" class="btn btn-default recurso-status dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>
						<ul class="dropdown-menu" role="menu">											
								<li><a href="#" class="status-recurso" data-status-recurso="3">Deferir</a></li>
								<li><a href="#" class="status-recurso" data-status-recurso="4">Indeferir</a></li>						
						</ul>
					</div>					
				</div>
				<div class="col-xs-12 col-sm-3">
					<p class="lead nao-conformidade-autor"></p>
				</div>
				<div class="col-xs-12 col-sm-3">
				<button type="button" class="btn btn-info mostrar-recursos" data-toggle="button" aria-pressed="false" autocomplete="off"><i class="fa fa-fw fa-comment"></i> Recursos</button>
				<button type="button" class="btn btn-info mostrar-retornoNc" data-toggle="button" aria-pressed="false" autocomplete="off"><i class="fa fa-fw fa-comment"></i> Retorno NC Assinada</button>
				</div>
			</div><!-- /row -->
			<hr>
			<div class="row">
				<div class="col-sm-12 col-md-12 nao-conformidade-col-left">					
					<div class=""></div>
					<form class="form-horizontal form-datas">
						<input name="timestamp" value="<%= _.now() %>" type="hidden">
						<input name="id" value="<%= adagio.attributes.id %>" type="hidden">
						<fieldset>
							<div class="form-group">
								<label class="col-sm-2 strong control-label"><b>NC Nº</b></label>
								<div class="col-sm-3"><p class="form-control-static strong text-danger">#<%= adagio.attributes.id%></p></div>
							</div>
						</fieldset>
						
						
						<fieldset>
							<div class="form-group">
								
								<label class="col-sm-2 strong control-label"><b>RESPONSÁVEL PELA NC</b></label>
								<div class="col-sm-3"><p class="form-control-static"><%= adagio.attributes.responsavel%></p></div>
								<label class="col-sm-1 control-label"><b>UF</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.uf%></p></div>
								<label class="col-sm-2 control-label"><b>TRANSPORTADORA</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.transportadora%></p></div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group">
								<label class="col-sm-2 control-label"><b>REGIÃO LEITEIRA</b></label>
								<div class="col-sm-3"><p class="form-control-static"><%= adagio.attributes.regiaoLeiteira%></p></div>
								<label class="col-sm-1 control-label"><b>PERCURSO</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.percurso%></p></div>
								<label class="col-sm-2 control-label"><b>VEÍCULO</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.veiculo%></p></div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group">
							<thead>
								<label class="col-sm-2 control-label"><b>CPF</b></label>
								</thead>
								<div class="col-sm-3"><p class="form-control-static"><%= adagio.attributes.cpf%></p></div>
								<label class="col-sm-1 control-label"><b>MOTORISTA</b></label>
								<div class="col-sm-4"><p class="form-control-static"><%= adagio.attributes.motorista%></p></div>
									<% if (adagio.attributes.statusMotorista == true) { %>
										<div class="col-sm-2 has-success"><p class="help-block">ATIVO</p></div>
									<% } else if (adagio.attributes.statusMotorista == false){%>
										<div class="col-sm-2 has-error"><p class="help-block">INATIVO</p></div>
									<% }%>
								</div>
						</fieldset>
						<fieldset>
							<div class="form-group">
								<label class="col-sm-2 control-label"><b>MOTIVO DA NC</b></label>
								<div class="col-sm-10"><p class="form-control-static"><%= adagio.attributes.motivo%></p></div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group">
								<label class="col-sm-2 control-label"><b>DETALHAMENTO DA NC</b></label>
								<div class="col-sm-10"><p class="form-control-static"><%= adagio.attributes.detalhamento%></p></div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group">
								<label class="col-sm-2 control-label"><b>DATA/HORA INÍCIO</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.dataInicioFormatada%></p></div>
								<label class="col-sm-2 control-label"><b>DATA/HORA FINAL</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.dataFinalFormatada%></p></div>
								<label class="col-sm-2 control-label"><b>DURAÇÃO</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.duracao%></p></div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group">
								<label class="col-sm-2 control-label"><b>VELOCIDADE KM/H</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.velocidade%></p></div>
								<label class="col-sm-2 control-label"><b>POLÍTICA DE AVALIAÇÃO</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.politica_avaliacao%></p></div>
								<label class="col-sm-2 control-label"><b>PONTUAÇÃO</b></label>
								<div class="col-sm-2"><p class="form-control-static"><%= adagio.attributes.pontuacao%></p></div>
							</div>
						</fieldset>
						<fieldset>
							<div class="form-group">
								<label class="col-sm-2 control-label"><b>COMENTÁRIO</b></label>
								<div class="col-sm-10"><p class="form-control-static"><%= adagio.attributes.comentario%></p></div>
							</div>
						</fieldset>
					</form>
					<div class="clearfix"><br /></div>
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">Registros - Evidências <span class="badge primary"><span class="numeros-resultados">0</span></span></h3>
						</div>
						<div class="panel-footer">
							As fotografias só podem ser inseridas quando o documento ainda está em construção/pendente. Depois de finalizado, as novas fotografias só podem ser inseridas por meio de <kbd>recurso</kbd> para ratificação e/ou retificação de algo.
						</div>
					</div>
					<div id="fotos" class="row"></div>
				</div><!-- /col-sm-12 -->
			</div><!-- /row -->
			<div class="row">
				<div id="divRecurso" class="col-sm-12 col-md-12 nao-conformidade-col-right" style="display:none">

					<form id="form-recursos" class="">
					<div id="nao-conformidade-panel-recuso" class="panel panel-default">
					<div class="panel-heading">
					<div class="panel-title">RECURSO <span class="badge primary pull-right"></span></div></div>
					<div class="panel-body" style="padding: 0 !important;">
					<div class="warning-recursos"></div>
					<div class="form-group" style="margin-bottom: 0 !important;"><textarea class="form-control" id="conteudoRecurso" style="border-radius: 0 !important;"></textarea></div>
					</div>
					<ul class="list-group">
					<li class="list-group-item"><div class="form-group"><input type="file" id="uploadArquivoRecurso" multiple></div></li>
					</ul>
					<div class="panel-footer clearfix text-right">
					<p>Por favor, envie apenas arquivos no formato de imagens válidas (jpg, jpeg, png, gif).</p>					
					<p class="pull-left"><span id="id_files_on_hover_recursos" class="files-on-hover">0</span> arquivos na fila</p>
					<button id="salvarRecurso" type="button" class="btn btn-default data-teor="0">Salvar</button>
					</div>
					</div>
					<div id="holderArquivoRecurso" style="display: none;"></div>
					</form>
					<div id="recursos"></div>
					<div class="panel-footer clearfix text-right">
					<p>Certifique-se que o seu recurso está completo e com evidências antes de enviar!</p>
					<button id="enviarEmailRecurso" type="button" class="btn btn-default">Enviar Recurso</button>
					</div>

				</div><!-- col-md-4 -->
			</div><!-- /row -->
			<div class="row">
					<div id="divRetorno" class="col-sm-12 col-md-12 nao-conformidade-col-right-retorno" style="display:none">
				
					<form id="form-retornoNc" class="">
					<div id="nao-conformidade-panel-retornoNc" class="panel panel-default">
					<div class="panel-heading">
					<div class="panel-title">Retorno NC Assinada <span class="badge primary pull-right"></span></div></div>
					<div class="panel-body" style="padding: 0 !important;">
					<div class="warning-retornoNc"></div>
					<div class="form-group" style="margin-bottom: 0 !important;"><textarea class="form-control" id="conteudoRetornoNc" style="border-radius: 0 !important;"></textarea></div>
					</div>
					<ul class="list-group">
					<li class="list-group-item"><div class="form-group"><input type="file" id="uploadArquivoRetornoNc" multiple></div></li>
					</ul>
					<div class="panel-footer clearfix text-right">
					<p>Por favor, envie apenas arquivos no formato de imagens válidas (jpg, jpeg, png, gif).</p>
					<p class="pull-left"><span id="id_files_on_hover_retorno" class="files-on-hover">0</span> arquivos na fila</p>					
					<button id="salvarRetornoNc" type="button" class="btn btn-default data-teor="0">Salvar</button>
					</div>
					</div>
					<div id="holderArquivoRetornoNc" style="display: none;"></div>
					</form>
					<div id="retornoNc"></div>
					<div class="panel-footer clearfix text-right">
					<p>Certifique-se que o seu retorno de NC está completo e com evidências antes de enviar!</p>
					<button id="enviarEmailRetornoNc" type="button" class="btn btn-default">Enviar Retorno NC</button>
					</div>					
	
				</div><!-- col-md-4 -->
					
			</div><!-- /row -->
			<div class="row">
				<div id="divDeferimento" class="col-sm-12 col-md-12" style="display:none">
				
					<form id="form-deferimentoNc" class="">
					<div id="nao-conformidade-panel-deferimento" class="panel panel-default">
					<div class="panel-heading">
					<div class="panel-title">Deferimento <span class="badge primary pull-right"></span></span></div></div>
					<div class="panel-body" style="padding: 0 !important;">
					<div class="warning-deferimento"></div>
					<div class="form-group" style="margin-bottom: 0 !important;"><textarea class="form-control" id="conteudoDeferimentoNc" style="border-radius: 0 !important;"></textarea></div>
					</div>
					<ul class="list-group">
					<li class="list-group-item"><div class="form-group"><input type="file" id="uploadArquivoDeferimentoNc" multiple></div></li>
					</ul>
					<div class="panel-footer clearfix text-right">
					<p>Por favor, envie apenas arquivos no formato de imagens válidas (jpg, jpeg, png, gif).</p>
					<p class="pull-left"><span id="id_files_on_hover_deferimento" class="files-on-hover">0</span> arquivos na fila</p>					
					<button id="salvarDeferimentoNc" type="button" class="btn btn-default data-teor="0">Salvar</button>
					</div>
					</div>
					<div id="holderArquivoDeferimentoNc" style="display: none;"></div>
					</form>
					<div id="deferimentoNc"></div>
					<div class="panel-footer clearfix text-right">
					<p>Certifique-se que o seu Deferimento está completo e com evidências antes de enviar!</p>
					<button id="enviarEmailDeferimento" type="button" class="btn btn-default">Enviar Deferimento</button>
					</div>
	
				</div><!-- col-md-4 -->
			</div><!-- /row -->
			<div class="row">
				<div id="divIndeferimento" class="col-sm-12 col-md-12" style="display:none">
			
					<form id="form-indeferimentoNc" class="">
					<div id="nao-conformidade-panel-indeferimento" class="panel panel-default">
					<div class="panel-heading">
					<div class="panel-title">Indeferimento <span class="badge primary pull-right"></span></div></div>
					<div class="panel-body" style="padding: 0 !important;">
					<div class="warning-indeferimento"></div>
					<div class="form-group" style="margin-bottom: 0 !important;"><textarea class="form-control" id="conteudoIndeferimentoNc" style="border-radius: 0 !important;"></textarea></div>
					</div>
					<ul class="list-group">
					<li class="list-group-item"><div class="form-group"><input type="file" id="uploadArquivoIndeferimentoNc" multiple></div></li>
					</ul>
					<div class="panel-footer clearfix text-right">
					<p>Por favor, envie apenas arquivos no formato de imagens válidas (jpg, jpeg, png, gif).</p>
					<p class="pull-left"><span id="id_files_on_hover_indeferimento" class="files-on-hover">0</span> arquivos na fila</p>					
					<button id="salvarIndeferimentoNc" type="button" class="btn btn-default data-teor="0">Salvar</button>
					</div>
					</div>
					<div id="holderArquivoIndeferimentoNc" style="display: none;"></div>
					</form>
					<div id="indeferimentoNc"></div>
					<div class="panel-footer clearfix text-right">
					<p>Certifique-se que o seu Indeferimento está completo e com evidências antes de enviar!</p>
					<button id="enviarEmailInDeferimento" type="button" class="btn btn-default">Enviar Indeferimento</button>
					</div>

				</div><!-- col-md-4 -->
			</div><!-- /row -->
		</div><!-- /container -->
`, {variable: 'adagio'}),
	// version: 1,
	initialize: function ()
	{
		try {
			
			this.version = 1;

			this.getJSON(adagio.environment.getEndpoint("prestadores"))
				.load("web")
				.release();
		} catch (error) {
			console.error(error);
		} finally {
			//
		}
	},
	render: function ()
	{
		try {
			
		// Method scopes
		var strict = {}, _this = this, globals = window;
		//console.log(globals);
		//
		$.when.apply(null, strict.objectCaches).then(function () {
			var args = Array.prototype.slice.call(arguments);

			for (var n in args) if (args[n] && args[n].instance)
			_this[args[n].instance] = args[n].get('collection');


			_this.$el.html(_this.template(_this.model)).attr("class", _this.className);

			//
			_this.collection.fotos = new Backbone.Collection();
			//alert(_this.model.get('id'));
			//console.log(_this.collection);
			_this.collection.fotos.url = adagio.environment.getEndpoint('naoConformidades/'+_this.model.get('id')+'/fotos');
			_this.collection.fotos.fetch().done(function (response) {
				//console.log(_this.collection);
				_this.carregarFotos({currentTarget: _this.$("#fotos"), preventDefault: function (){}});
			});
			// Recursos
			if (_this.recursos === undefined) {
				// Object collection
				_this.recursos = new (Backbone.Collection.extend({
				parse: function (response)
				{	// It updates the caller view model and its collection
					_.extend(_this.model, response.model);
					return (response.collection ? response.collection : []);
				}
				}))();
				// Event listen
				_this.listenTo(_this.recursos, 'sync', function () {
					_this.carregarRecursos({currentTarget: _this.$("#recursos"), preventDefault: function (){}});
					return false;
				});
			}
			// Web service
			_this.recursos.url = adagio.environment.getEndpoint('naoConformidades/'+_this.model.get('id')+'/recursos');
			// Update
			_this.recursos.fetch().done(function ()
			{	// TODO
				// setInterval
			});
			//

			// RetornoNc
			if (_this.retornoNc === undefined) {
				// Object collection
				_this.retornoNc = new (Backbone.Collection.extend({
				parse: function (response)
				{	// It updates the caller view model and its collection
					_.extend(_this.model, response.model);
					return (response.collection ? response.collection : []);
				}
				}))();
				// Event listen
				_this.listenTo(_this.retornoNc, 'sync', function () {
					_this.carregarRetornoNc({currentTarget: _this.$("#retornoNc"), preventDefault: function (){}});
					return false;
				});
			}
			// Web service
			_this.retornoNc.url = adagio.environment.getEndpoint('naoConformidades/'+_this.model.get('id')+'/retornoNc');
			// Update
			_this.retornoNc.fetch().done(function ()
			{	// TODO
				// setInterval
			});
			//

			// DeferimentoNc
			if (_this.deferimentoNc === undefined) {
				// Object collection
				_this.deferimentoNc = new (Backbone.Collection.extend({
				parse: function (response)
				{	// It updates the caller view model and its collection
					_.extend(_this.model, response.model);
					return (response.collection ? response.collection : []);
				}
				}))();
				// Event listen
				_this.listenTo(_this.deferimentoNc, 'sync', function () {
					_this.carregarDeferimentoNc({currentTarget: _this.$("#deferimentoNc"), preventDefault: function (){}});
					return false;
				});
			}
			// Web service
			_this.deferimentoNc.url = adagio.environment.getEndpoint('naoConformidades/'+_this.model.get('id')+'/deferimentoNc');
			// Update
			_this.deferimentoNc.fetch().done(function ()
			{	// TODO
				// setInterval
			});
			//

			// IndeferimentoNc
			if (_this.indeferimentoNc === undefined) {
				// Object collection
				_this.indeferimentoNc = new (Backbone.Collection.extend({
				parse: function (response)
				{	// It updates the caller view model and its collection
					_.extend(_this.model, response.model);
					return (response.collection ? response.collection : []);
				}
				}))();
				// Event listen
				_this.listenTo(_this.indeferimentoNc, 'sync', function () {
					_this.carregarIndeferimentoNc({currentTarget: _this.$("#indeferimentoNc"), preventDefault: function (){}});
					return false;
				});
			}
			// Web service
			_this.indeferimentoNc.url = adagio.environment.getEndpoint('naoConformidades/'+_this.model.get('id')+'/indeferimentoNc');
			// Update
			_this.indeferimentoNc.fetch().done(function ()
			{	// TODO
				// setInterval
			});
			//

			_this.$(".nao-conformidade-autor").html(_this.model.get('autorNome') + "<br /><small>" + "<i class='fa fa-clock-o'></i> " + _this.model.get('created_at').substr(-8) +
				" &mdash; " + "<i class='fa fa-calendar-o'></i> " + _this.model.get('created_at').substr(8, 2) + "/" + _this.model.get('created_at').substr(5, 2) + "/" + _this.model.get('created_at').substr(0, 4) +
				"</small>");
			_this.tratamentoStatus();
			_this.tratamentoStatusRecurso();

			//verifica se o usuário é transportador
			if(_this.model.get('papelUsuario') == 1 || _this.model.get('papelUsuario') === 6 )
			{
				_this.$("#salvarRecurso").removeAttr("disabled");
				_this.$("#enviarEmailRecurso").removeAttr("disabled");
				_this.$("#salvarRetornoNc").removeAttr("disabled");
				_this.$("#enviarEmailRetornoNc").removeAttr("disabled");
			}
			else{
				_this.$("#salvarRecurso").attr("disabled", "disabled");
				_this.$("#enviarEmailRecurso").attr("disabled", "disabled");
				_this.$("#salvarRetornoNc").attr("disabled", "disabled");
				_this.$("#enviarEmailRetornoNc").attr("disabled", "disabled");
			}

			//verifica se o usuário é gerente ou assistente
			if(_this.model.get('papelUsuario') === 2 || _this.model.get('papelUsuario') === 3
				|| _this.model.get('papelUsuario') === 4 || _this.model.get('papelUsuario') === 6)
			{
				_this.$("#salvarDeferimentoNc").removeAttr("disabled");
				_this.$("#enviarEmailDeferimento").removeAttr("disabled");
				_this.$("#salvarIndeferimentoNc").removeAttr("disabled");
				_this.$("#enviarEmailIndeferimento").removeAttr("disabled");
			}
			else{
				_this.$("#salvarDeferimentoNc").attr("disabled", "disabled");
				_this.$("#enviarEmailDeferimento").attr("disabled", "disabled");
				_this.$("#salvarIndeferimentoNc").attr("disabled", "disabled");
				_this.$("#enviarEmailIndeferimento").attr("disabled", "disabled");
			}			
			
		});

		} catch (caughtThrown) {
			console.error(caughtThrown);
		}
	},

	alterarStatusRecurso : function alterarStatusRecurso(codigoStatus){
		//alert("ola");
		var
		self = this,
		vars = {};
		//alert(parseInt(codigoStatus));

		//self.alteraBotaoStatusRecurso();

		vars.codigo = parseInt(codigoStatus);
		//alert(vars.codigo);
		//alert(self.model.get('status_recurso'));

		if (self.model.get('status_recurso') !== vars.codigo) {
				
			$.ajax({
			"url": adagio.environment.getEndpoint('naoConformidades/' + self.model.attributes.id),
			"method": 'patch',
			"dataType": 'json',
			"data": {"status_nc": self.model.attributes.status_nc,
					"status_recurso": vars.codigo,
					"tipo_status":'recurso'
					}
			})
			.done(function () {
			vars.destino = "!" + adagio.environment.getTenancy('naoConformidades/' + self.model.get('id') + (vars.codigo === 0 ? '/edit' : ''));
				
			if (vars.destino !== location.hash.substr(1)) {
				adagio.eventBus.trigger("navigate", vars.destino, {"trigger": true});
			} else {
				
				self.model.set("status_recurso", vars.codigo);
				//alert(self.model.attributes.status_nc);					
				self.alteraBotaoStatusRecurso();
				if(vars.codigo === 3 && self.model.attributes.status_nc === 1 ){
					self.model.set("status_nc", 2);
					self.alteraBotaoStatus();
				}
				else if(vars.codigo === 4 && self.model.attributes.status_nc != 3){
					self.model.set("status_nc", 1);
					self.alteraBotaoStatus();
				}
				
				adagio.eventBus.trigger("navigate", location.hash, {trigger: true});
				
			}
			//if(vars.codigo === 3 || vars.codigo === 4){
				//alert(vars.codigo+"oi");
					//self.enviarEmailStatus();
				//}	
			});
			
		}
		
		return false;
	},

alteraBotaoStatusRecurso: function alteraBotaoStatusRecurso()
	{
		//alert("oi");

		var
			self = this,
			vars = {};
			//alert(self.model.attributes.status_recurso);

		
		vars.statuses = ['', 'Aguardando', 'Acatado', 'Deferido', 'Indeferido'];
		vars.colors = ['', 'btn-default', 'btn-success', 'btn-warning', 'btn-danger'];
		vars.status = vars.statuses[self.model.attributes.status_recurso];
		vars.color = " " + vars.colors[self.model.attributes.status_recurso];

		//alert(vars.statuses[self.model.attributes.status_recurso]);
		//alert(" " + vars.colors[self.model.attributes.status_recurso]);

		self.$("button#mostra-status-recurso").text(vars.status);

		self.$(".recurso-status").each(function () {
			var dropdownlet = self.$(this).hasClass("dropdown-toggle") ? " dropdown-toggle" : "";
			self.$(this).attr("class", "recurso-status btn btn-md" + vars.color + dropdownlet);
		});	
		//alert(vars.status);
		//alert(parseInt(self.$(event.currentTarget).data("status-recurso")));
		//alert(self.model.get('status_recurso'));
		
	},

	tratamentoStatusRecurso: function tratamentoStatusRecurso(isRetornoNc =  false)
	{
		//alert("oi");
		
	var
		self = this,
		vars = {};
		//alert(parseInt(self.$(event.currentTarget).data("status-recurso")));

	self.alteraBotaoStatusRecurso();

	if(isRetornoNc){
		//alert("ioi");
		vars.codigo = 2;

		if (self.model.get('status_recurso') !== vars.codigo) {
			$.ajax({
			"url": adagio.environment.getEndpoint('naoConformidades/' + self.model.attributes.id),
			"method": 'patch',
			"dataType": 'json',
			"data": {"status_nc": self.model.attributes.status_nc,
					 "status_recurso": vars.codigo,
					 "tipo_status":'recurso'
					}
			})
			.done(function () {
			vars.destino = "!" + adagio.environment.getTenancy('naoConformidades/' + self.model.get('id') + (vars.codigo === 0 ? '/edit' : ''));
				
			if (vars.destino !== location.hash.substr(1)) {
				adagio.eventBus.trigger("navigate", vars.destino, {"trigger": true});
			} else {
				
				self.model.set("status_recurso", vars.codigo);
				//alert(self.model.attributes.status_nc);
				self.alteraBotaoStatusRecurso();
				
				/*if(vars.codigo === 3 && self.model.attributes.status_nc === 1){
					self.model.set("status_nc", 2);
					self.alteraBotaoStatus();
				}				
				else if((vars.codigo === 1 || vars.codigo === 2 || vars.codigo === 4) && self.model.attributes.status_nc != 3){
					self.model.set("status_nc", 1);
					self.alteraBotaoStatus();
				}*/

				if(vars.codigo === 2 && self.model.attributes.status_nc != 3){
					self.model.set("status_nc", 1);
					self.alteraBotaoStatus();
				}
				
				adagio.eventBus.trigger("navigate", location.hash, {trigger: true});
				
			}
			});
		}
		return false;
	}
	else{	
		//console.log(self.model.get('papelUsuario'));
	
		//$.ajax({
			//"url": adagio.environment.getEndpoint('naoConformidades/' + self.model.attributes.id + '/statusesRecurso'),
			//"method": 'head',
			//"dataType": 'html',
		//})
		//.done(function () {
		//	console.info('Parabéns! Permissão para alteração de status do objeto encontrada.');
		if(self.model.get('papelUsuario') === 2 || self.model.get('papelUsuario') === 4
            || self.model.get('papelUsuario') === 6)
		{
			self.$("#controle-status-recurso").removeAttr("disabled");
			self.$(".status-recurso").off().on("click", function (event) {
			event.preventDefault();

			//console.log(self.$(".status-recurso"));
			//console.log(self.$(event.currentTarget));
			//alert(self.isRetornoNc);

			vars.codigo = parseInt(self.$(event.currentTarget).data("status-recurso"));
			
			if(vars.codigo == 3 || vars.codigo == 4){
				self.mostrarDivStatusRecurso(vars.codigo);
			}
			else{			

			if (self.model.get('status_recurso') !== vars.codigo) {
				
				$.ajax({
				"url": adagio.environment.getEndpoint('naoConformidades/' + self.model.attributes.id),
				"method": 'patch',
				"dataType": 'json',
				"data": {"status_nc": self.model.attributes.status_nc,
						"status_recurso": vars.codigo,
						"tipo_status":'recurso'
						}
				})
				.done(function () {
				vars.destino = "!" + adagio.environment.getTenancy('naoConformidades/' + self.model.get('id') + (vars.codigo === 0 ? '/edit' : ''));
					
				if (vars.destino !== location.hash.substr(1)) {
					adagio.eventBus.trigger("navigate", vars.destino, {"trigger": true});
				} else {
					
					self.model.set("status_recurso", vars.codigo);
					//alert(self.model.attributes.status_nc);					
					self.alteraBotaoStatusRecurso();
					/*if(vars.codigo === 3 && self.model.attributes.status_nc === 1){
						self.model.set("status_nc", 2);
						self.alteraBotaoStatus();
					}
					else if((vars.codigo === 1 || vars.codigo === 2 || vars.codigo === 4) && self.model.attributes.status_nc != 3){
						self.model.set("status_nc", 1);
						self.alteraBotaoStatus();
					}*/

					if((vars.codigo === 1 || vars.codigo === 2) && (self.model.attributes.status_nc != 3 && self.model.attributes.status_nc != 4)){
						self.model.set("status_nc", 1);
						self.alteraBotaoStatus();
					}
					
					adagio.eventBus.trigger("navigate", location.hash, {trigger: true});
					
				}
				/*if(vars.codigo === 3 || vars.codigo === 4){
					//alert(vars.codigo+"oi");
						self.enviarEmailStatus();
				}*/	
				});
				
			}
		}

			return false;
			});
		}
		else
		{
			self.$("#controle-status-recurso").attr("disabled", "disabled");
		}
		//})
		//.fail(function () {
		//	self.$("#controle-status-recurso").attr("disabled", "disabled");
		//});
	}

	return false;
	},

	enviarEmailStatus: function (statusNc)
	{ //console.log(this.model.attributes.id);
		//alert(statusNc);      
			  		//alert(nc_id);
		$.ajax({
			"url": adagio.environment.getEndpoint("naoConformidades/notificador/" + this.model.attributes.id),
			//"async":false,
			"method": "get",
			"context": this,
			"data": {"tipoNotificador": statusNc}
    	}).done(function (data, textStatus, jqXHR) {
			//alert("oi");
			//alert(jqXHR);
		  if (jqXHR.getResponseHeader("Location")) {
			//this.model.set("url", jqXHR.getResponseHeader("Location"));
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
alteraBotaoStatus: function alteraBotaoStatus()
	{
		var
			self = this,
			vars = {};
			//alert(self.model.attributes.status_nc);

		
		vars.statuses = ['', 'Ativo', 'Deferido', 'Expirado', 'Cancelado', 'Em recurso'];
		vars.colors = ['', 'btn-default', 'btn-warning', 'btn-danger', 'btn-danger', 'btn-warning'];
		vars.status = vars.statuses[self.model.attributes.status_nc];
		vars.color = " " + vars.colors[self.model.attributes.status_nc];

		self.$("button#mostra-status-nc").text(vars.status);

		self.$(".nc-status").each(function () {
			var dropdownlet = self.$(this).hasClass("dropdown-toggle") ? " dropdown-toggle" : "";
			self.$(this).attr("class", "nc-status btn btn-md" + vars.color + dropdownlet);
		});		
},
tratamentoStatus: function tratamentoStatus(isEmRecurso =  false)
	{
	var
		self = this,
		vars = {};

	self.alteraBotaoStatus();
	//alert("oi2");
	//alert("oi");

	//$.ajax({
	//	"url": adagio.environment.getEndpoint('naoConformidades/' + self.model.attributes.id + '/statuses'),
	//	"method": 'head',
	//	"dataType": 'html',
//	})
	//.done(function () {
		//console.info('Parabéns! Permissão para alteração de status do objeto encontrada.');
		//alert(self.model.get('papelUsuario'));
		//alert(self.model.get('IdUsuario'));
		//alert(self.model.get('autor_id'));

	if(isEmRecurso){
		//alert("ioi");
		vars.codigo = 5;

		if (self.model.get('status_nc') !== vars.codigo) {
			$.ajax({
			"url": adagio.environment.getEndpoint('naoConformidades/' + self.model.attributes.id),
			"method": 'patch',
			"dataType": 'json',
			"data": {"status_nc": vars.codigo,
					 "status_recurso": self.model.attributes.status_recurso,
					 "tipo_status":'nc'
					}
			})
			.done(function () {
				vars.destino = "!" + adagio.environment.getTenancy('naoConformidades/' + self.model.get('id') + (vars.codigo === 0 ? '/edit' : ''));
					
				if (vars.destino !== location.hash.substr(1)) {
					adagio.eventBus.trigger("navigate", vars.destino, {"trigger": true});
				} else {
					
					self.model.set("status_nc", vars.codigo);
					//alert(self.model.attributes.status_nc);
					self.alteraBotaoStatus();
					adagio.eventBus.trigger("navigate", location.hash, {trigger: true});
				}
			});
		}
		return false;
	}
	else{	

		if((self.model.get('papelUsuario') === 3 || self.model.get('IdUsuario') === self.model.get('autor_id'))
			|| (self.model.get('papelUsuario') === 2 || self.model.get('papelUsuario') === 4
                || self.model.get('papelUsuario') === 6))
		{
			
			self.$("#controle-status-nc").removeAttr("disabled");
			self.$(".status-nc").off().on("click", function (event) {
			event.preventDefault();

			//alert(self.model.get('autor_id'));

			console.log(self.$(".status-nc"));
			console.log(self.$(event.currentTarget).data("status-nc"));
			

			
			vars.codigo = parseInt(self.$(event.currentTarget).data("status-nc"));

			//alert(vars.codigo);



			if (self.model.get('status_nc') !== vars.codigo) {
				//alert(vars.codigo);
				$.ajax({
				"url": adagio.environment.getEndpoint('naoConformidades/' + self.model.attributes.id),
				"method": 'patch',
				"dataType": 'json',
				"data": {"status_nc": vars.codigo,
						"status_recurso": self.model.attributes.status_recurso,
						"tipo_status":'nc'
						}
				})
				.done(function () {
				vars.destino = "!" + adagio.environment.getTenancy('naoConformidades/' + self.model.get('id') + (vars.codigo === 0 ? '/edit' : ''));
					
				if (vars.destino !== location.hash.substr(1)) {
					adagio.eventBus.trigger("navigate", vars.destino, {"trigger": true});
				} else {
					
					self.model.set("status_nc", vars.codigo);
					//alert(self.model.attributes.status_nc);
					self.alteraBotaoStatus();
					adagio.eventBus.trigger("navigate", location.hash, {trigger: true});
				}
				});
			}

			return false;
			});
		}
		else{
			self.$("#controle-status-nc").attr("disabled", "disabled");
		}
	}
	//})
	//.fail(function () {
	//	self.$("#controle-status-nc").attr("disabled", "disabled");
	//});

	return false;
	},
	carregarRecursos: function carregarRecursos(event)
	{
		
		try {
			var $this = event.currentTarget,
				strict = {},
				_this = this;

			this.recursosFormData = new FormData(document.getElementById("form-recursos"));

			if (parseInt(_this.$(".numeros-recursos").text()) === _this.recursos.length) {
				throw 'No new recurso found to rewrite the present DOM at here on ' + _.now() + ' timestamp.';
			}

            $this.html('');
			strict.fragmento = '';

			_this.recursos.each(function (recurso) {
				console.log(recurso);
				strict.fragmento = `
				<div class="well well-sm">
					<div class="row"><div class="col-xs-12">
						<strong class="text-primary">` + recurso.get('usuario').nome + `</strong><br />
						<small>` + (recurso.get('data_criacao') ? recurso.get('data_criacao') : 'Recente') + `</small><br />` +
						(recurso.get('conteudo') && recurso.get('conteudo').length > 0 ? '<p>'+recurso.get('conteudo')+'</p>' : '<p></p>') +
					`</div></div>
					<div class="row">`;

				_.each(recurso.get('midias'), function (midia) {

					var mostrar = midia.unidade === 'image' ?
					'<a href="#" class="a-album"><image src="/storage/' + midia.sha256 + '" class="img-thumbnail" data-id="'+midia.sha256+'" /></a>' :
					'<p><a href="/storage/' + midia.sha256 + '" class="btn btn-default btn-md"><i class="fa fa-file-pdf-o"></i> PDF</a></p>';

					strict.fragmento += '<div class="col-xs-6 col-sm-4">' + mostrar + '</div>';
				});
				strict.fragmento += '</div></div>';
				$this.prepend(strict.fragmento);
			});

			this.$(".numeros-recursos").text(this.recursos.length);

            if (this.recursos.length > 0) {
				$("#divRecurso").show("slow");
            }

			this.holderArquivoRecurso = function holderArquivoRecurso (files) {
			_.each(files, function (arquivo, indice) {
				indice += this.$(".file-to-upload").length;

				var reader = new FileReader();
				reader.onload = _(function (event) {
					var miniatura = `<div class="thumbnail">` +
						(arquivo.type.search(/^image\//i) === 0 ?
						`<a href="#"><img src="` + event.target.result + `" alt="Imagem" class="file-to-upload"></a>` :
						``) +
						`<div class="caption">` + arquivo.name + `</div>
						</div>`;
					this.$("#holderArquivoRecurso").prepend(miniatura);
					this.$("#holderArquivoRecurso").show();
					this.recursosFormData.append('arquivos[' + indice + ']', arquivo);
					this.$('.files-on-hover').text(indice + 1);
				}).bind(this);
				reader.readAsDataURL(arquivo);
			}, this);
			}

			this.$("#uploadArquivoRecurso").get(0).onchange = _(function (event) {
				this.holderArquivoRecurso(event.target.files);
			}).bind(this);
		}
		catch (error) {
			window.console.error(error);
		}
		finally {
			return event.preventDefault();
		}
	},
	salvarRecurso: function (event)
	{

		//alert(this.$('#id_files_on_hover_recursos').text());
		if(this.$('#id_files_on_hover_recursos').text() > 0){
			event.stopPropagation();
			event.preventDefault();

			var $currentTarget = this.$(event.currentTarget),
				locals = {};

			locals.forms = this.recursosFormData;
			locals.forms.append('conteudo', $currentTarget.parents('form').find('[id=conteudoRecurso]').val());
			locals.forms.append('teor', $currentTarget.data("teor"));

			this.recursos.create(null, {
				"context": this,
				"timeout": 0,
				"wait": true,
				"processData": false,
				"contentType": false,
				"data": locals.forms,
				"success": function (collection, response, options) {
					$currentTarget.closest("form").find(".form-control").val('');
					$currentTarget.closest("form").find("[class^=warning-]").empty();
					if (response && response.error) {
						for (var n in response.errors) {
							$currentTarget.closest("form")
								.find("[class^=warning-]")
								.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.errors[n] + '</div>');
						}
					}
				},
				"error": function (collection, response, options) {
					$currentTarget.closest("form").find(".form-control").val('');
					$currentTarget.closest("form").find("[class^=warning-]").empty();
					if (response.responseJSON && response.responseJSON.error) {
						for (var n in response.responseJSON.errors) {
							$currentTarget.closest("form")
								.find("[class^=warning-]")
								.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.responseJSON.errors[n] + '</div>');
						}
					}
				},
				"complete": function () {
					this.recursos.fetch();
					this.recursosFormData = new FormData(document.getElementById("form-recursos"));
					this.$('#holderArquivoRecurso').empty();
					this.$('#uploadArquivoRecurso').val('');
					this.$('.files-on-hover').text('0');
				}
			});
			return this;
			}
		else{
			alert("Selecione um arquivo!");
		}
	},
	carregarRetornoNc: function carregarRetornoNc(event)
	{
		//alert("oi");
		try {
			var $this = event.currentTarget,
				strict = {},
				_this = this;

			this.retornoNcFormData = new FormData(document.getElementById("form-retornoNc"));

			if (parseInt(_this.$(".numeros-retornoNc").text()) === _this.retornoNc.length) {
				throw 'No new recurso found to rewrite the present DOM at here on ' + _.now() + ' timestamp.';
			}

            $this.html('');
			strict.fragmento = '';

			_this.retornoNc.each(function (retorno) {
				strict.fragmento = `
				<div class="well well-sm">
					<div class="row"><div class="col-xs-12">
						<strong class="text-primary">` + retorno.get('usuario').nome + `</strong><br />
						<small>` + (retorno.get('data_criacao') ? retorno.get('data_criacao') : 'Recente') + `</small><br />` +
						(retorno.get('conteudo') && retorno.get('conteudo').length > 0 ? '<p>'+retorno.get('conteudo')+'</p>' : '<p></p>') +
					`</div></div>
					<div class="row">`;

				_.each(retorno.get('midias'), function (midia) {

					var mostrar = midia.unidade === 'image' ?
					'<a href="#" class="a-album"><image src="/storage/' + midia.sha256 + '" class="img-thumbnail" data-id="'+midia.sha256+'" /></a>' :
					'<p><a href="/storage/' + midia.sha256 + '" class="btn btn-default btn-md"><i class="fa fa-file-pdf-o"></i> PDF</a></p>';

					strict.fragmento += '<div class="col-xs-6 col-sm-4">' + mostrar + '</div>';
				});
				strict.fragmento += '</div></div>';
				$this.prepend(strict.fragmento);
			});

			this.$(".numeros-retornoNc").text(this.retornoNc.length);

            if (this.retornoNc.length > 0) {
				$("#divRetorno").show("slow");
            }

			this.holderArquivoRetornoNc = function holderArquivoRetornoNc (files) {
			_.each(files, function (arquivo, indice) {
				indice += this.$(".file-to-upload").length;

				var reader = new FileReader();
				reader.onload = _(function (event) {
					var miniatura = `<div class="thumbnail">` +
						(arquivo.type.search(/^image\//i) === 0 ?
						`<a href="#"><img src="` + event.target.result + `" alt="Imagem" class="file-to-upload"></a>` :
						``) +
						`<div class="caption">` + arquivo.name + `</div>
						</div>`;
					this.$("#holderArquivoRetornoNc").prepend(miniatura);
					this.$("#holderArquivoRetornoNc").show();
					this.retornoNcFormData.append('arquivos[' + indice + ']', arquivo);
					this.$('.files-on-hover').text(indice + 1);
				}).bind(this);
				reader.readAsDataURL(arquivo);
			}, this);
			}

			this.$("#uploadArquivoRetornoNc").get(0).onchange = _(function (event) {
				this.holderArquivoRetornoNc(event.target.files);
			}).bind(this);
		}
		catch (error) {
			window.console.error(error);
		}
		finally {
			return event.preventDefault();
		}
	},
	salvarRetornoNc: function (event)
	{
		//alert(this.retornoNc.length);
		if(this.$('#id_files_on_hover_retorno').text() > 0)
		{
			event.stopPropagation();
			event.preventDefault();

			var $currentTarget = this.$(event.currentTarget),
				locals = {};

			locals.forms = this.retornoNcFormData;
			locals.forms.append('conteudo', $currentTarget.parents('form').find('[id=conteudoRetornoNc]').val());
			locals.forms.append('teor', $currentTarget.data("teor"));

			this.retornoNc.create(null, {
				"context": this,
				"timeout": 0,
				"wait": true,
				"processData": false,
				"contentType": false,
				"data": locals.forms,
				"success": function (collection, response, options) {
					$currentTarget.closest("form").find(".form-control").val('');
					$currentTarget.closest("form").find("[class^=warning-]").empty();
					if (response && response.error) {
						for (var n in response.errors) {
							$currentTarget.closest("form")
								.find("[class^=warning-]")
								.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.errors[n] + '</div>');
						}
					}
				},
				"error": function (collection, response, options) {
					$currentTarget.closest("form").find(".form-control").val('');
					$currentTarget.closest("form").find("[class^=warning-]").empty();
					if (response.responseJSON && response.responseJSON.error) {
						for (var n in response.responseJSON.errors) {
							$currentTarget.closest("form")
								.find("[class^=warning-]")
								.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.responseJSON.errors[n] + '</div>');
						}
					}
				},
				"complete": function () {
					//console.log(this.$('#holderArquivoRetornoNc'));
					//console.log(this.$('#uploadArquivoRetornoNc'));
					//console.log(this.$('.files-on-hover'));

					//alert(this.$('#id_files-on-hover-retorno').text());
					this.retornoNc.fetch();
					this.retornoNcFormData = new FormData(document.getElementById("form-retornoNc"));
					/*if(this.$('#id_files_on_hover_retorno').text() > 0){
						//alert("oi2");
						this.tratamentoStatusRecurso(isRetornoNc = true);
						this.enviarEmailRetornoNcAssinada();

					}*/
					this.$('#holderArquivoRetornoNc').empty();
					this.$('#uploadArquivoRetornoNc').val('');
					this.$('.files-on-hover').text('0');
					
				}
			});
			return this;}
		else
		{
			alert("Selecione um arquivo!");
		}
	},

	carregarDeferimentoNc: function carregarDeferimentoNc(event)
	{
		//alert("oi");
		try {
			var $this = event.currentTarget,
				strict = {},
				_this = this;

			this.deferimentoNcFormData = new FormData(document.getElementById("form-deferimentoNc"));

			if (parseInt(_this.$(".numeros-deferimentoNc").text()) === _this.deferimentoNc.length) {
				throw 'No new recurso found to rewrite the present DOM at here on ' + _.now() + ' timestamp.';
			}

            $this.html('');
			strict.fragmento = '';

			_this.deferimentoNc.each(function (deferimento) {
				strict.fragmento = `
				<div class="well well-sm">
					<div class="row"><div class="col-xs-12">
						<strong class="text-primary">` + deferimento.get('usuario').nome + `</strong><br />
						<small>` + (deferimento.get('data_criacao') ? deferimento.get('data_criacao') : 'Recente') + `</small><br />` +
						(deferimento.get('conteudo') && deferimento.get('conteudo').length > 0 ? '<p>'+deferimento.get('conteudo')+'</p>' : '<p></p>') +
					`</div></div>
					<div class="row">`;

				_.each(deferimento.get('midias'), function (midia) {

					var mostrar = midia.unidade === 'image' ?
					'<a href="#" class="a-album"><image src="/storage/' + midia.sha256 + '" class="img-thumbnail" data-id="'+midia.sha256+'" /></a>' :
					'<p><a href="/storage/' + midia.sha256 + '" class="btn btn-default btn-md"><i class="fa fa-file-pdf-o"></i> PDF</a></p>';

					strict.fragmento += '<div class="col-xs-6 col-sm-4">' + mostrar + '</div>';
				});
				strict.fragmento += '</div></div>';
				$this.prepend(strict.fragmento);
			});

			this.$(".numeros-deferimentoNc").text(this.deferimentoNc.length);

            if (this.deferimentoNc.length > 0) {
				$("#divDeferimento").show("slow");
            }

			this.holderArquivoDeferimentoNc = function holderArquivoDeferimentoNc (files) {
			_.each(files, function (arquivo, indice) {
				indice += this.$(".file-to-upload").length;

				var reader = new FileReader();
				reader.onload = _(function (event) {
					var miniatura = `<div class="thumbnail">` +
						(arquivo.type.search(/^image\//i) === 0 ?
						`<a href="#"><img src="` + event.target.result + `" alt="Imagem" class="file-to-upload"></a>` :
						``) +
						`<div class="caption">` + arquivo.name + `</div>
						</div>`;
					this.$("#holderArquivoDeferimentoNc").prepend(miniatura);
					this.$("#holderArquivoDeferimentoNc").show();
					this.deferimentoNcFormData.append('arquivos[' + indice + ']', arquivo);
					this.$('.files-on-hover').text(indice + 1);
				}).bind(this);
				reader.readAsDataURL(arquivo);
			}, this);
			}

			this.$("#uploadArquivoDeferimentoNc").get(0).onchange = _(function (event) {
				this.holderArquivoDeferimentoNc(event.target.files);
			}).bind(this);
		}
		catch (error) {
			window.console.error(error);
		}
		finally {
			return event.preventDefault();
		}
	},

	salvarDeferimentoNc: function (event)
	{
		//alert(this.retornoNc.length);
		event.stopPropagation();
		event.preventDefault();

		var $currentTarget = this.$(event.currentTarget),
			locals = {};

		locals.forms = this.deferimentoNcFormData;
		locals.forms.append('conteudo', $currentTarget.parents('form').find('[id=conteudoDeferimentoNc]').val());
		locals.forms.append('teor', $currentTarget.data("teor"));

		this.deferimentoNc.create(null, {
			"context": this,
			"timeout": 0,
			"wait": true,
			"processData": false,
			"contentType": false,
			"data": locals.forms,
			"success": function (collection, response, options) {
				$currentTarget.closest("form").find(".form-control").val('');
				$currentTarget.closest("form").find("[class^=warning-]").empty();
				if (response && response.error) {
					for (var n in response.errors) {
						$currentTarget.closest("form")
							.find("[class^=warning-]")
							.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.errors[n] + '</div>');
					}
				}
			},
			"error": function (collection, response, options) {
				$currentTarget.closest("form").find(".form-control").val('');
				$currentTarget.closest("form").find("[class^=warning-]").empty();
				if (response.responseJSON && response.responseJSON.error) {
					for (var n in response.responseJSON.errors) {
						$currentTarget.closest("form")
							.find("[class^=warning-]")
							.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.responseJSON.errors[n] + '</div>');
					}
				}
			},
			"complete": function () {
				//console.log(this.$('#holderArquivoRetornoNc'));
				//console.log(this.$('#uploadArquivoRetornoNc'));
				//console.log(this.$('.files-on-hover'));

				//alert(this.$('#id_files-on-hover-retorno').text());
            	this.deferimentoNc.fetch();
				this.deferimentoNcFormData = new FormData(document.getElementById("form-deferimentoNc"));
				/*if(this.$('#id_files_on_hover_deferimento').text() > 0){
					//alert("oi2");
					//this.tratamentoStatusRecurso(isRetornoNc = true);
					//this.enviarEmailRetornoNcAssinada();
					this.alterarStatusRecurso(3);

				}*/
            	this.$('#holderArquivoDeferimentoNc').empty();
            	this.$('#uploadArquivoDeferimentoNc').val('');
				this.$('.files-on-hover').text('0');
				
			}
		});
		return this;
	},

	carregarIndeferimentoNc: function carregarIndeferimentoNc(event)
	{
		//alert("oi");
		try {
			var $this = event.currentTarget,
				strict = {},
				_this = this;

			this.indeferimentoNcFormData = new FormData(document.getElementById("form-indeferimentoNc"));

			if (parseInt(_this.$(".numeros-indeferimentoNc").text()) === _this.indeferimentoNc.length) {
				throw 'No new recurso found to rewrite the present DOM at here on ' + _.now() + ' timestamp.';
			}

            $this.html('');
			strict.fragmento = '';

			_this.indeferimentoNc.each(function (indeferimento) {
				strict.fragmento = `
				<div class="well well-sm">
					<div class="row"><div class="col-xs-12">
						<strong class="text-primary">` + indeferimento.get('usuario').nome + `</strong><br />
						<small>` + (indeferimento.get('data_criacao') ? indeferimento.get('data_criacao') : 'Recente') + `</small><br />` +
						(indeferimento.get('conteudo') && indeferimento.get('conteudo').length > 0 ? '<p>'+indeferimento.get('conteudo')+'</p>' : '<p></p>') +
					`</div></div>
					<div class="row">`;

				_.each(indeferimento.get('midias'), function (midia) {

					var mostrar = midia.unidade === 'image' ?
					'<a href="#" class="a-album"><image src="/storage/' + midia.sha256 + '" class="img-thumbnail" data-id="'+midia.sha256+'" /></a>' :
					'<p><a href="/storage/' + midia.sha256 + '" class="btn btn-default btn-md"><i class="fa fa-file-pdf-o"></i> PDF</a></p>';

					strict.fragmento += '<div class="col-xs-6 col-sm-4">' + mostrar + '</div>';
				});
				strict.fragmento += '</div></div>';
				$this.prepend(strict.fragmento);
			});

			this.$(".numeros-indeferimentoNc").text(this.indeferimentoNc.length);

            if (this.indeferimentoNc.length > 0) {
				$("#divIndeferimento").show("slow");
            }

			this.holderArquivoIndeferimentoNc = function holderArquivoIndeferimentoNc (files) {
			_.each(files, function (arquivo, indice) {
				indice += this.$(".file-to-upload").length;

				var reader = new FileReader();
				reader.onload = _(function (event) {
					var miniatura = `<div class="thumbnail">` +
						(arquivo.type.search(/^image\//i) === 0 ?
						`<a href="#"><img src="` + event.target.result + `" alt="Imagem" class="file-to-upload"></a>` :
						``) +
						`<div class="caption">` + arquivo.name + `</div>
						</div>`;
					this.$("#holderArquivoIndeferimentoNc").prepend(miniatura);
					this.$("#holderArquivoIndeferimentoNc").show();
					this.indeferimentoNcFormData.append('arquivos[' + indice + ']', arquivo);
					this.$('.files-on-hover').text(indice + 1);
				}).bind(this);
				reader.readAsDataURL(arquivo);
			}, this);
			}

			this.$("#uploadArquivoIndeferimentoNc").get(0).onchange = _(function (event) {
				this.holderArquivoIndeferimentoNc(event.target.files);
			}).bind(this);
		}
		catch (error) {
			window.console.error(error);
		}
		finally {
			return event.preventDefault();
		}
	},

	salvarIndeferimentoNc: function (event)
	{
		//alert(this.retornoNc.length);
		event.stopPropagation();
		event.preventDefault();

		var $currentTarget = this.$(event.currentTarget),
			locals = {};

		locals.forms = this.indeferimentoNcFormData;
		locals.forms.append('conteudo', $currentTarget.parents('form').find('[id=conteudoIndeferimentoNc]').val());
		locals.forms.append('teor', $currentTarget.data("teor"));

		this.indeferimentoNc.create(null, {
			"context": this,
			"timeout": 0,
			"wait": true,
			"processData": false,
			"contentType": false,
			"data": locals.forms,
			"success": function (collection, response, options) {
				$currentTarget.closest("form").find(".form-control").val('');
				$currentTarget.closest("form").find("[class^=warning-]").empty();
				if (response && response.error) {
					for (var n in response.errors) {
						$currentTarget.closest("form")
							.find("[class^=warning-]")
							.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.errors[n] + '</div>');
					}
				}
			},
			"error": function (collection, response, options) {
				$currentTarget.closest("form").find(".form-control").val('');
				$currentTarget.closest("form").find("[class^=warning-]").empty();
				if (response.responseJSON && response.responseJSON.error) {
					for (var n in response.responseJSON.errors) {
						$currentTarget.closest("form")
							.find("[class^=warning-]")
							.append('<div class="alert alert-danger alert-dismissible" role="alert" style="margin-bottom:0 !important; border-radius:0 !important;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.responseJSON.errors[n] + '</div>');
					}
				}
			},
			"complete": function () {
				//console.log(this.$('#holderArquivoRetornoNc'));
				//console.log(this.$('#uploadArquivoRetornoNc'));
				//console.log(this.$('.files-on-hover'));

				//alert(this.$('#id_files-on-hover-retorno').text());
            	this.indeferimentoNc.fetch();
				this.indeferimentoNcFormData = new FormData(document.getElementById("form-indeferimentoNc"));
				/*if(this.$('#id_files_on_hover_indeferimento').text() > 0){
					//alert("oi2");
					//this.tratamentoStatusRecurso(isRetornoNc = true);
					//this.enviarEmailRetornoNcAssinada();
					this.alterarStatusRecurso(4);

				}*/
            	this.$('#holderArquivoIndeferimentoNc').empty();
            	this.$('#uploadArquivoIndeferimentoNc').val('');
				this.$('.files-on-hover').text('0');
				
			}
		});
		return this;
	},

	"carregarFotos": function carregarFotos(evento)
	{
		try {
			if (this.collection.fotos.length === 0) {
				throw new Error("No photo found.");
			}

			var fragmento = document.createDocumentFragment();

			this.$("[role=listbox]").empty();
			this.$("ol.carousel-indicators").empty();

			this.collection.fotos.each(function (foto, index) {
				var item = Backbone.View.extend(this.subviews["nao_conformidades_foto"]),
					ativo = index === 0 ? ' active' : '';

				fragmento.appendChild(new item({model: foto}).el);
				//console.log(foto.get ('hash_arquivo'));

				this.$("[role=listbox]").append('<div class="item' + ativo + '"><img src="/storage/' + foto.get ('id') + '" /><div class="carousel-caption">' + (foto.get ('observacoes') || "") + '</div></div>');
				this.$("ol.carousel-indicators").append('<li data-target="#carousel-example-generic" data-slide-to="' + index + '" class="' + ativo + '"></li>');
			},
			this);

			this.$("#fotos").append(fragmento);
			this.$(".numeros-resultados").text(this.$("#fotos").find(".thumbnail").length);

			if (this.$("#fotos").find(".thumbnail").length === 0)
				this.$("#fotos").parent("div").hide();
			else
				this.$("#fotos").closest(".row").parent("div").show();
		}
		catch (thrown) {
			console.info(thrown);
		}
		finally {
			event.preventDefault();
		}
	}
}