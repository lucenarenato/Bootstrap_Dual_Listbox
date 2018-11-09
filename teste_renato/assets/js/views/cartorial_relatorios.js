{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-cartorial-relatorios",
  "events": {
    "submit": "report",
    "click .gerar-analitico": "analitico"
  },
  "report": function report(event) {
    event.preventDefault();
    event.stopPropagation();
    var $dom = this.$(event.target);
    adagio.eventBus.trigger(
      "navigate",
      ['!' + adagio.environment.getTenancy() + '/cartorialrelatorio/' + $dom.find('#relatorio').val() + '?' + $dom.serialize()].join(''),
      {"trigger": true}
    );
    return false;
  },
  "analitico": function analitico(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.$('#inputCadastro').val() == '0') {
      alert('Selecione CONDUTOR ou CARRO para o tipo de dado a ser recuperado.');
      this.$('#inputCadastro').focus();
      return false;
    }
    var $dom = this.$('form');
    location = adagio.environment.getEndpoint('cartorialrelatorio/analitico?' + $dom.serialize());
    return false;
  },
  "template": _.template(`
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
      <h1 class="page-header margin-top-none">Relatório <small>Leading Indicators</small></h1>
<form>
<input type="hidden" name="bearer_token" value="<%= (this.cookie.getItem('access_token') || '') %>">
<div class="panel panel-default">
  <div class="panel-body">
    <div class="row">
      <div class="col-lg-4">
        <p class="small text-muted text-uppercase"><strong>OPERA&Ccedil;&Atilde;O</strong></p>
        <select name="tipo" id="relatorio" class="form-control">
        <option value="0">Todas</option>
<% view.get('tesoes').each (function (vinculo) { %>
  <option value="<%= vinculo.get ('id') %>"><%= vinculo.get ('tesao').toString ().toUpperCase () %></option>
<% }); %>
        </select>
      </div>
      <div class="col-lg-4">
      <p class="small text-muted text-uppercase"><strong>FILTRAR POR DATA (OPCIONAL)</strong></p>
      <div class="input-group input-daterange">
          <input type="text" class="form-control" name="periodo_inicio" value="<%= view.get('data') %>">
          <span class="input-group-addon">at&eacute;</span>
          <input type="text" class="form-control" name="periodo_fim" value="<%= view.get('data') %>">
      </div>
<hr>
      <p class="small text-muted text-uppercase"><strong>NATUREZA</strong></p>
      <div class="form-group">
        <select class="form-control" id="inputCadastro" name="tipo-cadastro">
          <option value="0">Selecionar...</option>
          <% this.model.get("pastas").each(function (pasta) { %>
          <option value="<%= pasta.get("id") %>"><%= pasta.get("titulo") %></option>
          <% }); %>
        </select>
      </div>
      </div>
      <div class="col-lg-4">
        <p class="small text-muted text-uppercase"><strong>REGIÃO LEITEIRA</strong></p>
        <select name="regiao_leiteira[]" multiple="" class="form-control" size="6" disabled>
<% view.get('regioes_leiteiras').each (function (vinculo) { %>
<option value="<%= vinculo.get ('id') %>"><%= vinculo.get ('nome').toString ().toUpperCase () %></option>
<% }); %>
        </select>
      </div>
    </div>
  </div>
  <div class="panel-footer">
  <button type="submit" class="btn btn-primary gerar-sintetico"><span class="fa fa-fw fa-send" aria-hidden="true"></span> Gerar Relatório</button>
  <button type="button" class="btn btn-default gerar-analitico"><span class="fa fa-fw fa-download" aria-hidden="true"></span> Gerar Analítico</button>
  <p class="pull-right"><a href="#!/operacoes/relatorios" class="btn btn-default"><span class="fa fa-fw fa-fast-backward"></span> Cancelar</a></p>
  </div>
</div>
</form>
      </div><!-- /.col-md-12 -->
    </div><!-- /.row -->
  </div><!-- /.container-fluid -->
  `,
  {"variable": "view"}),
  "initialize": function () {
    try {
      this.load("web").release();
    }
    catch (thrown) {
      console.error(thrown);
    }
  },
  "render": function () {
    var self = this;
    this.model.set("bearer_token", localStorage.getItem("access_token"));
    if (this.$el.attr("class") === undefined) {
      this.$el.html(this.template(this.model)).attr("class", this.className);
    }
    if (this.$el.attr("class") !== this.className) {
      this.$el.html(this.template(this.model)).attr("class", this.className);
    }
    $.fn.datepicker.dates['pt'] = {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      daysMin: ["Dm", "Sg", "Tr", "Qa", "Qi", "Sx", "Sb"],
      months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: "Today",
      clear: "Clear",
      format: "yyyy-mm-dd",
      titleFormat: "MM yyyy",
      weekStart: 0
    };
    this.$('.input-daterange input').each(function () {
      self.$(this).datepicker({language: 'pt', format: 'dd-mm-yyyy'}).on("changeDate", function (eventDate) {
        console.log(eventDate);
      });
    });
  },
  "notification": handling.notification
}