{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-checklists-relatorios",
	"events": {
		"submit": "report",
	},
	"report": function (event) {
		event.preventDefault();
		event.stopPropagation();

		var $dom = this.$(event.target);

		// adagio.eventBus.trigger("navigate", '#!/operacoes/relatorios/resumo?' + $dom.serialize (), {trigger: true});

		return false;
	},
	"template": _.template(`
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4">
<div class="list-group">
<a href="#!/operacoes/relatorios/0/edit" class="list-group-item">Leading Indicators</a>
</div>
			</div><!-- /.col-md-4 -->
			<div class="col-md-8">
			</div><!-- /.col-md-8 -->
		</div><!-- /.row -->
	</div><!-- /.container-fluid -->
	`,
	{"variable": "adagio"}),
	"initialize": function () {
		try {
			this.load("web").release();
		}
		catch (thrown) {
			console.error(thrown);
		}
	},
	"render": function () {
		if (true) {
			this.$el.attr("class", this.className);
			adagio.eventBus.trigger("navigate", '!' + adagio.environment.getTenancy('checklists/relatorios/0/edit'), {"trigger": true});
		}
		else if (this.$el.attr("class") === undefined) {
			this.$el.html(this.template(this.model)).attr("class", this.className);
		}
		else if (this.$el.attr("class") !== this.className) {
			this.$el.html(this.template(this.model)).attr("class", this.className);
		}
		else {
			//
		}
		return this;
	},
	"notification": handling.notification
}