Application.Model.Template.View['cartorial'] = Backbone.View.extend ({
  tagName: "div",

	id: "adagio-home",
	className: "adagio-cartorial",
  /*
	events: {
    "click #cartorial_dashboard" : function(){
      $(".cartorial_dashboard").css('display', 'block');
      $(".cartorial_novo").css('display', 'none');
      $(".cartorial_todos").css('display', 'none');
    },
    "click #cartorial_novo" : function(){
      $(".cartorial_dashboard").css('display', 'none');
      $(".cartorial_novo").css('display', 'block');
      $(".cartorial_todos").css('display', 'none');
    },
    "click #cartorial_todos" : function(){
      $(".cartorial_dashboard").css('display', 'none');
      $(".cartorial_novo").css('display', 'none');
      $(".cartorial_todos").css('display', 'block');
    },
    "click .novo_documento" : function(){
      $("#modal_documento").modal();
    },
    "click #selecionar_documento" : function(){
      $('#documento').click();
      $('#documento').change(function(){
        $("#nm_arquivo").html($('#documento').val());
      });
    },
    "click .car_salvar" : "salvarDadosMotorista",
	},
  */
  salvarDadosMotorista : function(event){
    //$('#_token').val(sessionStorage.getItem ('x-csrf-token'));
    $.ajax({
      url : "index.php/interfaces/cartorial",
      method : 'POST',
      data :  {
        car_nome : $('form #car_nome').val(),
        car_transportadora : $('form #car_transportadora').val(),
        car_nascimento : $('form #car_nascimento').val(),
        car_cpf : $('form #car_cpf').val(),
        car_rg : $('form #car_rg').val()
      }
    }).done(function(retorno){
      console.log(retorno);
    });
  },

  modalDocumentos: _.template(`
    <style>
      #nm_arquivo{margin-bottom:10px;}
      #documento{display: none;}
    </style>
    <div id="modal_documento" class="modal fade"><!--inicio modal-->
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Cadastro de documentos</h4>
          </div>

          <div class="modal-body">
            <form id="car_documentos">
              <div class="card-heading"></div>
              <div class="form-group">
                <label class="control-label">Descrição</label>
                <input name="desc" type="text" id="desc_doc" class="form-control"/>
              </div>

              <div class="form-group">
                <label class="control-label">Vencimento</label>
                <div class="input-group date">
                  <input name="vencimento" id="vencimento_doc" type="text" class="form-control" placeholder="YYYY-MM-DD" maxlength="10"/>
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-calendar"></i>
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label class="control-label">Observações</label>
                <textarea class="form-control" rows="3"></textarea>
              </div>

              <div class="form-group">
                <input type="file" id="documento" name="documento"/>
                <label class="control-label">Arquivo</label>
                <div id="nm_arquivo">Nenhum documento selecionado</div>
                <button type="button" id="selecionar_documento" class="btn btn-primary btn-group-justified">Escolher documento</button>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </div><!--fim modal-->
  `),

  listaCartorial: _.template(`
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Trasportadora</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <% for(var i = 0; i < this.collection.paginacao.qtdados; i++) { %>
        <tr>
          <td><% print(this.collection.dados[i].nome_condutor) %></td>
          <td><% print(this.collection.dados[i].cpf_condutor) %></td>
          <td><% print(this.collection.dados[i].transportadora) %></td>
          <td>
            <span class="pull-right">
              <button type="button" class="btn btn-xs btn-default">3 Docs</button>
              <button type="button" class="btn btn-xs btn-default">
                <a href="#!/cartorial/<% print(this.collection.dados[i].id_cartorial_dados) %>">
                  <i class="glyphicon glyphicon-list"></i>
                </a>
              </button>
              <button type="button" class="btn btn-xs btn-default novo_documento">
                <i class="glyphicon glyphicon-plus"></i>
              </button>
            </span>
          </td>
        </tr>
        <% } %>
      </tbody>
    </table>
  `),
	template: _.template (`
    <style>
      a {color: #5c7995;}
      .cartorial_dashboard {display: block;}
      .cartorial_novo {display: none;}
      .cartorial_todos {display: none;}
      .space{padding: 10px 0 10px 0;}
      .pagination{float: right; margin: 0 0 10px 0;}
      .s_campos{margin-bottom: 15px;}
      .s_labels{padding-bottom: 5px;}
    </style>

  	<div class="page-header page-header-compact context-skill-entity">
  		<div class="container">
  			<h1>Cartorial <span class="page-header-label">Aplicativo</span></h1>
  		</div>
  	</div>

    <div class="container">
      <div class="row"><!--ini row-->
        <div class="col-sm-12">
          <ul class="nav nav-tabs">
            	<li class="active" id="cartorial_dashboard"><a href="#!/cartorial/?tipo=dashboard"><i class="glyphicon glyphicon-dashboard"></i> <span>Dashboard</span></a></li>
              <li id="cartorial_novo"><a href="#!/cartorial/?tipo=novo"><i class="glyphicon glyphicon-plus"></i> <span>Novo</span></a></li>
              <li id="cartorial_todos"><a href="#!/cartorial/?tipo=todos&page=1"><i class="glyphicon glyphicon-inbox"></i> <span>Todos</span></a></li>
          </ul>
        </div>
      </div><!--fim row-->

      <div class="row space"></div>

      <div class="row cartorial_dashboard"><!--ini row-->
        <div class="col-sm-12">
          Dashboard
        </div>
      </div><!--fim row-->

      <div class="row cartorial_novo"><!--ini row-->
        <div class="card"><!--ini card -->
          <form class="form-horizontal card-detail" id="car_principal">
            <div class="card-heading"></div>

            <div class="row">
              <div class="col-sm-6 s_campos">
                <label class="control-label s_labels">Nome</label>
                <input name="nome" type="text" id="car_nome" class="form-control"/>
              </div>

              <div class="col-sm-6 s_campos">
                <label class="control-label s_labels">Transportadora</label>
                <input name="transportadora" type="text" id="car_transportadora" class="form-control"/>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 s_campos">
                <label class="control-label s_labels">Nascimento</label>
                <div class="input-group date">
                  <input name="nascimento" id="car_nascimento" type="text" class="form-control" placeholder="YYYY-MM-DD" maxlength="10"/>
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-calendar"></i>
                  </span>
                </div>
              </div>

              <div class="col-sm-3 s_campos">
                <label class="control-label s_labels">CPF</label>
                <input name="cpf" type="text" id="car_cpf" class="form-control" maxlength="11"/>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 s_campos">
                <label class="control-label s_labels">RG</label>
                <input name="rg" type="text" id="car_rg" class="form-control"/>
              </div>
            </div>

            <div class="row"><hr></div>

            <fieldset>
              <div class="col-sm-offset-11">
                <button type="button" class="btn btn-primary btn-block car_salvar">Salvar</button>
              </div>
            </fieldset>
          </form>
        </div><!--fim card-->
      </div><!--fim row-->

      <div class="row cartorial_todos"><!--ini row-->
        <div class="col-sm-12 listagem_cartorial"></div>
        <div class="col-sm-12 paginacao_cartorial">
          <nav>
            <ul class="pagination">

            </ul>
          </nav>
        </div>
      </div><!--fim row-->
    </div>
	`),

	initialize: function ()
	{
		var _this = this, strict = {}, globals = window;

		try
		{
			_this.charmer = new snakeCharmer (_this);
			_this.charmer.snake ("default", {});
			_this.charmer.summon ();
		}
		catch (error)
		{
			globals.console.error (error);
		}
		finally
		{
			//
		}
	},
  paginacao: function (){
    var _this = this, strict = {}, globals = window;

    var corpo = "";

    var page = parseInt(_this.collection.paginacao.page);
    var npage = parseInt(_this.collection.paginacao.npage);

    var inicio = (page > 1) ? page - 1 : 1; // não futricar
    var fim = 4; // não colocar menor que 3, número de páginas
    var n = (fim - 2);

    if(npage > fim){
      if(page > 1){
        fim = page + n;
      }

      if((npage - n) <= page){
        fim = npage;
        inicio = npage - (n + 1);
      }
    } else {
      fim = npage;
      inicio = 1;
    }

    for(i = inicio; i <= fim; i++){
      corpo += '<li id="id'+ i +'"><a href="#!'+adagio.environment.getTenancy('cartorial?tipo=todos&page='+ i) +'">' + i + '</a></li>';
    }

    $('.paginacao_cartorial .pagination').html(corpo).promise().done(function(){
      $('.paginacao_cartorial .pagination ' + '#id' + _this.collection.paginacao.page).attr('class', 'active');
    });

  },
	render: function ()
	{
		var _this = this, strict = {}, globals = window;

    // window.console.log (_this.model);
    //window.console.log (_this.collection);
    $(".listagem_cartorial").html(_this.listaCartorial());
    _this.paginacao();

		if (_this.$el.attr ("class") === undefined)
		{
      // load
			_this.$el.html (_this.template () + _this.modalDocumentos()).attr ("class", _this.className);
      $(".listagem_cartorial").html(_this.listaCartorial());
      _this.paginacao();
		}
		else if (_this.$el.attr ("class") !== _this.className)
		{
			// reload
			_this.$el.html (_this.template ()+_this.modalDocumentos()).attr ("class", _this.className);
      $(".listagem_cartorial").html(_this.listaCartorial());
      _this.paginacao();
		}
		else
		{
			// already
		}

    _this.$('.date').datepicker ({ format: 'yyyy-mm-dd', autoclose: true });

	}

});
