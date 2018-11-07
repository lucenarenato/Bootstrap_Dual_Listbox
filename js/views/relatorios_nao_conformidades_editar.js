{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-relatorios-nc-editar",
  "events": {
    "click .gerar-analitico": "analitico"
  },
  "analitico": function analitico(event) {
    event.preventDefault();
    event.stopPropagation();
    var $dom = this.$('form')
      , place = location.hash.split("/").slice(3);
    if (place && place[0] && place[1] && place[1] === "relatorios") {
      location = adagio.environment.getEndpoint(place[0].concat("/").concat(place[1]).concat("/analitico?").concat($dom.serialize()));
    }
    else if (place && place[0] && place[1] && place[1] !== "relatorios") {
      location = adagio.environment.getEndpoint(place[0].concat("/analitico?").concat($dom.serialize()));
    }
    else {
      alert("Algum erro ocorreu para localizar o recurso atual");
    }
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
      <p class="small text-muted text-uppercase"><strong>PERÍODO</strong></p>
      <div class="input-group input-daterange">
          <input type="text" class="form-control" name="periodo_inicio" value="<%= view.get('data') %>">
          <span class="input-group-addon">at&eacute;</span>
          <input type="text" class="form-control" name="periodo_fim" value="<%= view.get('data') %>">
      </div>
      </div>
    </div>
  </div>
  <div class="panel-footer">
  <button type="button" class="btn btn-default gerar-analitico"><span class="fa fa-fw fa-download" aria-hidden="true"></span> Gerar Relatório</button>
  <p class="pull-right"><a href="#!/naoConformidades/relatorios" class="btn btn-default"><span class="fa fa-fw fa-fast-backward"></span> Cancelar</a></p>
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