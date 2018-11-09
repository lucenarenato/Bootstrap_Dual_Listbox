Application.Model.Template.View['anchor'] = Backbone.View.extend ({

	tagName: "div",

	id: 'adagio-layout',

	className: 'adagio-layout-anchor',

	template: _.template (`
	<style>
	body
	{
		background-color: #344a5f;
		color: #a7b9c9;
	}
	a
	{
		color: #a7b9c9;
	}
	</style>
	<div class="container-fluid">
	<div class="row">
		<div id="adagio-home"></div>
	</div>
	</div>
	`, {variable: 'adagio'}),

	initialize: function ()
	{
		var _this = this, strict = {}, globals = window;

		try
		{
			//
		}
		catch (error)
		{
			globals.console.error (error);
		}
		finally
		{
			_this.render ();
		}
	},

	render: function ()
	{
		var _this = this, strict = {}, globals = window;

		try
		{
			if ($("#" + _this.id).length && $("#" + _this.id).attr ("class") === undefined)
			{
				// be welcome
				$("#" + _this.id).replaceWith (_this.$el.html (_this.template (_this.model)));
			}
			else if ($("#" + _this.id).length && $("#" + _this.id).attr ("class") !== _this.className)
			{
				// you came back
				$("#" + _this.id).replaceWith (_this.$el.html (_this.template (_this.model)));
			}
			else
			{
				// did you go away?
			}
		}
		catch (error)
		{
			globals.console.error (error);
		}
		finally
		{
			return _this;
		}
	},

});
