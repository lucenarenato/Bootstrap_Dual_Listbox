{
	tagName: "div",
	id: "adagio-home",
	className: "adagio-password",
	events: {
		"submit": "recovering",
	},
	recovering: function (event)
	{
        event.preventDefault ();
        event.stopPropagation ();

		var $dom = this.$(event.target);

		$.ajax ({
			url: "/interfaces/password/email",
			method: "post",
			data: $dom.serialize (),
			dataType: "json",
		}).done (function (response)
		{
			//
		}).error (function (response)
		{
			$dom.find ("input"). val ('');
		});

		return false;
	},
	template: _.template (`
<div class="login animated">
	<form>
		<div class="membership-title">Recuperar senha</div>
		<div class="membership-input">
			<input type="email" class="form-control" id="exampleInputPassword1" name="email" placeholder="Inserir e-mail...">
		</div>
		<div class="membership-submit">
			<input type="submit" class="btn btn-primary btn-lg btn-block" value="Solicitar nova senha">
		</div>
		<div class="membership-signup">
			<div class="signup-title">Isso foi um engano?</div>
			<a href="#!/sessions">VOLTAR PARA O LOGON</a>
		</div>
	</form>
</div>
	`, {variable: 'adagio'}),
	initialize: function ()
	{
		try
		{
			this.load ("entrance").release ();
		}
		catch (error)
		{
			console.error (error);
		}
		finally
		{
            //
		}
	},
	render: function ()
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
            console.error (error);
		}
		finally
		{
			return this;
		}
	}
}