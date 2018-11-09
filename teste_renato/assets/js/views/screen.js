{
	"tagName": "div",
	"id": 'adagio-layout',
	"className": 'adagio-layout-screen',
	"template": _.template (`
	<div id="page-wrapper" class="background-page">
    <div id="adagio-home">
    </div>
	</div>
	`, {variable: 'adagio'}),
	"initialize": function ()
	{
		try
		{
			this.
				getScript ("/sumea/bootstrap.min.css", "css", "bootstrap").
				getScript ("/sumea/styles-theme.css", "css", "theme").
				release ();
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
	"render": function (e)
	{
		try
		{
			if (this.$el.attr ("class") === undefined)
			{
				this.$el.html (this.template (this.model)).attr ("class", this.className);
			}
			else if (this.$el.attr ("class") !== this.className)
			{
				this.$el.html (this.template (this.model)).attr ("class", this.className);
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