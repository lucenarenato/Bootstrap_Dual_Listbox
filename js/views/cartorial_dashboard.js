{
  tagName: "div",

	id: "adagio-home",

  className: "adagio-cartorial-dashboard",

  events: {
    "click #ck_vencidos" : function(){
      if(confirm("Deseja enviar uma relação de vencidos?") == true){
        $.ajax({
          url : "interfaces/cartorial/vencidos",
          method : "GET"
        }).done(function(retorno){
          alert(retorno);
        });
      }
    }
	},

	template: _.template (`
<style>
	a { color: #5c7995; }
	.space { padding: 10px 0 10px 0; }
</style>
    <div class="container-fluid">
      <div class="row"><!--ini row-->
        <div class="col-sm-12">
          <ul class="nav nav-pills">
              <!--li class="active"><a href="#!/cartorial/dashboard"><i class="fa fa-fw fa-tachometer"></i> <span>Dashboard</span></a></li-->
              <li><a href="#!/cartorial/create"><i class="fa fa-fw fa-plus"></i> <span>Novo</span></a></li>
              <li><a href="#!/cartorial/?page=1"><i class="fa fa-fw fa-inbox"></i> <span>Todos</span></a></li>
              <li class="pull-right" id="ck_vencidos" style="padding: 10px 15px; cursor: pointer;"><i class="fa fa-fw fa-bell"></i><span>Checar vencidos</span></li>
          </ul>
        </div>
      </div><!--fim row-->

      <div class="row space"></div>

      <div class="row"><!--ini row-->
        <div class="col-sm-12">
          Dashboard
        </div>
      </div><!--fim row-->

      <div class="row space"></div>
    </div>
	`),
	initialize: function ()
	{
		try
		{
			this.load ("board").release ();
		}
		catch (thrown)
		{
			console.error (thrown);
		}
		finally
		{
			//
		}
	},
	render: function ()
	{
		var _this = this, strict = {}, globals = window;
    // window.console.log (_this.model);
    //window.console.log (_this.collection);

		if (_this.$el.attr ("class") === undefined)
		{
      // load
			_this.$el.html (_this.template ()).attr ("class", _this.className);
		}
		else if (_this.$el.attr ("class") !== _this.className)
		{
			// reload
			_this.$el.html (_this.template ()).attr ("class", _this.className);
		}
		else
		{
			// already
		}
	}
}