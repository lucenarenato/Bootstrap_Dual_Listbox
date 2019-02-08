{
	tagName: "div",
	id: 'adagio-layout',
	className: 'adagio-layout-default',
	events: {
		"click a": function (event)
		{
			var self = event.currentTarget;
			var local = {};
			var global = this;

			global.$(self).closest ("ul").children ("li").each (function (index, element)
			{
				global.$(element).removeClass ("active");
			});

			global.$(self).parent ("li").toggleClass ("active");

			return true;
		}
	},

	template: _.template (`
	<link rel="stylesheet" href="/css/bootstrap.min.css">
	<style>
	html {
		position: relative;
		min-height: 100%;
	}
	body {
		margin-bottom: 80px;
	}
	.footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 80px;
		background-color: #344a5f;
	}
	.footer img {
		opacity: 0.5;
		filter: alpha(opacity=60);
	}
	#adagio-home
	{
		margin-bottom: 60px;
	}
	.navbar-static-top
	{
		margin-bottom: 0;
	}
	</style>

	<nav class="navbar navbar-default navbar-static-top">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
			<a class="navbar-brand" href="#!/home">ADAGIO</a>
		</div>
		<div class="adagio-menubar collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#!/sessions/logout"><i class="s1utility s1utility-logout"></i> Sair</a></li>
			</ul>
		</div>
	</div>
	</nav>

	<div style="padding-top: 0px;"></div>

	<div id="adagio-home"></div>

	<footer class="footer">
		<div class="container">
		<div class="row">
			<div class="col-md-10 col-xs-8 col-sm-8"><p></p></div>
			<div class="col-md-2 col-xs-4 col-sm-4"><p></p><img src="/images/klios_3.png" class="img-responsive"></div>
		</div>
		</div>
	</footer>
	`, {variable: 'adagio'}),

	initialize: function ()
	{
		try
		{
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

	render: function ()
	{
		try
		{
			var _this = this, strict = {}, globals = window;

			if ($("#" + _this.id).length && $("#" + _this.id).attr ("class") === undefined)
			{
				$("#" + _this.id).replaceWith (_this.$el.html (_this.template (_this.model)));
			}
			else if ($("#" + _this.id).length && $("#" + _this.id).attr ("class") !== _this.className)
			{
				$("#" + _this.id).replaceWith (_this.$el.html (_this.template (_this.model)));
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