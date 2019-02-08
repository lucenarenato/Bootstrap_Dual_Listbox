{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-forbidden",
	"template": _.template (`
	<div class="container-fluid">
	<div class="row">
	<div class="col-md-4 col-md-offset-4">
		<div class="clearfix">
			<img src="/images/klios_5.png" class="pull-left" title="KLIOS ADAGIO &copy; 2015. All rights reserved.">
			<h4 class="pull-right text-uppercase">Acesso restrito</h4>
		</div>
		<div class="panel">
			<div class="panel-body">
			<p>Você não tem poder suficiente para acessar esse recurso. Caso isso venha a ser um equívoco, por favor contate o administrador de sistemas. Você pode optar por refazer a autenticação e tentar novamente.</p>
			</div>
			<div class="panel-footer"><a href="">Voltar &agrave; p&aacute;gina inicial</a></div>
		</div>
	</div>
	</div>
	</div>
	`,
	{
		"variable": 'adagio'
	}),
	"initialize": function ()
	{
		try
		{
			this.load ("screen");
			this.release ();
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
	"render": function ()
	{
		try
		{
			if (this.$el.attr ("class") === undefined)
			{
				this.$el.html (this.template ()).attr ("class", this.className);
			}
			else if (this.$el.attr ("class") !== this.className)
			{
				this.$el.html (this.template ()).attr ("class", this.className);
			}
			else
			{
				//
			}
		}
		catch (error)
		{
			//
		}
		finally
		{
			return this;
		}
	}
}