{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-crash",
	"template": _.template (`
	<div class="container-fluid">
	<div class="row">
	<div class="col-md-4 col-md-offset-4">
		<div class="clearfix">
			<img src="/images/klios_5.png" class="pull-left" title="KLIOS ADAGIO &copy; 2015. All rights reserved.">
			<h4 class="pull-right text-uppercase">Erro do servidor</h4>
		</div>
		<div class="panel">
			<div class="panel-body">
			<p>Isso é grave, pois algum erro interno do servidor ocorreu. Tente limpar a memória cache do seu navegador e refaça sua autenticação. Mas, se o problema persistir, contate o administrador de sistemas imediatamente.</p>
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
		catch (thrown)
		{
			console.error (thrown);
		}
		finally
		{
			return this;
		}
	}
}