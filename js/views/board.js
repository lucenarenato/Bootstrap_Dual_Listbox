{
	"tagName": "div",
	"id": "adagio-layout",
	"className": "adagio-layout-board",
	"events":
	{
		"click li > a[id!='sidebar_toggle']": function (event)
		{
			try
			{
				// ul.nav a
				// .addClass ('active').parent ().parent ().addClass ('in').parent ();
				// if (element.is ('li')) element.addClass ('active');

				var $currentTarget = this.$(event.currentTarget),
					_this = this;

				if ($currentTarget.parents ("#adagio-sidebar").length === 0 &&
					$currentTarget.attr ("href") &&
					$currentTarget.attr ("href").search ("^#") === 0)
					_this.$("#adagio-sidebar").empty ();

				$.map (_this.$("a[href^='#']"), function (item)
				{
					if (_this.$(item).attr ("href").search ("^#") !== -1)
					{
						_this.$(item).removeClass ("active");
						_this.$(item).closest ("li").removeClass ("active");
					}
				});

				if ($currentTarget.attr ("href") && $currentTarget.attr ("href") === "#")
				{
					$currentTarget.addClass ("active");
					$currentTarget.closest ("li").addClass ("active");
				}
				else if ($currentTarget.attr ("href") && $currentTarget.attr ("href").search ("^#") === 0)
					$.map (_this.$("a[href='" + $currentTarget.attr ("href") + "']"), function (item)
					{
						$(item).addClass ("active");
						$(item).closest ("li").addClass ("active");
					});
				else
				{
					//
				}
			}
			catch (error)
			{
				console.error (error);
			}
		},
		"click a.a-album": function (event)
		{
			try
			{
				var strict = {},
					$currentTarget = this.$(event.currentTarget).find ("img");

				if ($currentTarget.data ("metadados"))
				{
					strict.collection = JSON.parse (atob ($currentTarget.data ("metadados")));
					strict.model = _.first (strict.collection);
				}
				else
				{
					strict.collection = {};
					strict.model = {};
				}

				strict.model.fonte = $currentTarget.attr ("src");
				strict.model.descricao = $currentTarget.data ("descricao");

				this.__load ("album", strict);
			}
			catch (thrown)
			{
				console.error (thrown);
			}
			finally
			{
				event.stopPropagation ();
				event.preventDefault ();
			}
		},
	},
	"template": _.template (`
<div id="wrapper">
	<div class="clearfix">
		<div id="main_sidebar">
			<div class="sidebar_inner">
				<div class="sidebar-custom navbar-inverse sidebar" role="navigation">
					<div class="sidebar-nav navbar-collapse">
						<div class="side_logo text-center sidebar-background">
							<a class="current-parent current" href="#!/home">
								<img src="/images/safety_3.png" alt="Big Logo" class="hide_el sidebar-logo-center">
								<img src="/images/klios_5.png" alt="Small Logo" class="show_el slim-sidebar-logo-center">
							</a>
						</div>
						<ul class="nav in" id="side-menu">
							<li class="small-text-menu hide_el">Navega&ccedil;&atilde;o</li>
							<li><a href="#!/home" data-toggle="side_tooltip" data-placement="right" title="Principal"><i class="fa fa-home fa-fw"></i> <span class="menu_title">Principal</span></a></li>
							<li><a href="#checklists" data-toggle="side_tooltip" data-placement="right" title="Checklists"><i class="fa fa-columns fa-fw"></i> <span class="menu_title">Checklists</span></a></li>
							<li><a href="javascript:void(0)" data-toggle="side_tooltip_offset" data-placement="right" title="Inspeções"><span class="fa arrow"></span><i class="fa fa-line-chart fa-fw"></i> <span class="menu_title">Inspeções</span></a>
								<ul class="nav nav-second-level collapse" aria-expanded="false">
									<li><a href="#!/operacoes?tipo=aprovados">Aprovados</a></li>
									<li><a href="#!/operacoes?tipo=corrigidos">Corrigidos</a></li>
									<li><a href="#!/operacoes?tipo=reprovados">Reprovados</a></li>
									<li><a href="#!/operacoes?tipo=todos">Todos</a></li>
								</ul>
							</li>
							<li><a href="#!/usuarios" data-toggle="side_tooltip" data-placement="right" title="Usuários"><i class="fa fa-columns fa-fw"></i> <span class="menu_title">Usuários</span></a></li>
							<!--
							<li><a href="#!/recursos" data-toggle="side_tooltip" data-placement="right" title="Recursos"><i class="fa fa-sitemap fa-fw"></i> <span class="menu_title">Recursos</span></a></li>
							-->
							<li><a href="#!/cartorial" data-toggle="side_tooltip" data-placement="right" title="Cartorial"><i class="fa fa-trello fa-fw"></i> <span class="menu_title">Cartorial</span></a></li>
							<li><hr class="hr-sidebar-inverse margin-bottom-none"></li>
							<div class="list-group" id="adagio-sidebar"></div>
							<li><hr class="hr-sidebar-inverse margin-bottom-none"></li>
							<li class="bandwith-paddings">
								<br />
								<p class="text-uppercase hide_el bandwith-mini-header">Disponibilidade <span class="pull-right bandwith-mini-percent"><strong>100%</strong></span></p>
								<div class="progress hide_el bandwith-height-3">
									<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"><span class="sr-only">100% Completo</span></div>
								</div>
								<input type="hidden" name="timestamp" value="<%= _.now () %>" />
							</li>
						</ul>
					</div>
				<!-- /.sidebar-collapse -->
				</div>
			<!-- /.navbar-static-side -->
			</div>
		</div>
		<div id="main-content">
			<!-- START Navbar Default -->
			<nav class="navbar navbar-default navbar-static-top hidden-xs">
				<div class="navbar-header">
					<div class="container-fluid">
						<div class="navbar-header hidden-lg hidden-md hidden-sm">
						</div>
					</div>
				</div>
				<!-- /.navbar-header -->
				<ul class="nav navbar-top-links navbar-left hidden-xs">
					<li>
						<a id="sidebar_toggle" href="#">
							<i class="fa fa-bars fa-fw fa-lg"></i>
						</a>
					</li>
				</ul>
				<ul class="nav navbar-top-links navbar-right in">
					<li>
						<a href="javascript:window.history.back();">
						<i class="fa fa-chevron-left fa-fw fa-lg"></i> Voltar
						</a>
					</li>
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown" href="http://sumea.webkom.co/app/pages/index.html#"><i class="fa fa-envelope fa-lg"></i><!-- <i class="fa fa-circle text-danger small icon-notification"></i> --></a>
						<ul class="dropdown-menu dropdown-tasks">
							<li class="dropdown-header">Você tem 0 mensagens</li>
							<li class="divider"></li>
							<li><a class="text-center" href="#">Ver todas <i class="fa fa-angle-right"></i></a></li>
						</ul>
					</li>
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"><i class="fa fa-bell fa-lg"></i><!-- <i class="fa fa-circle text-info small icon-notification"></i> --></a>
						<ul class="dropdown-menu dropdown-alerts">
							<li class="dropdown-header">Você tem <span class="total-feedbacks">0</span> notificações</li>
							<li class="divider item-alerts"></li>
							<li><a class="text-center maisFeedbacks" href="#">Ver mais <i class="fa fa-angle-right"></i></a></li>
				</ul>
			</li>
			<li>
			<a class="nav-brand dropdown dropdown-toggle active" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="https://erp.klios.com.br/images/klios_5.png" class="img-circle avatar-height-20" alt="Menu"> <span class="caret"></span></a>
			<ul class="dropdown-menu">
				<li class="dropdown-header">Logado</li>
				<li role="separator" class="divider"></li>
				<li><a href="#"><i class="fa fa-user margin-right-5"></i> Perfil</a>
				</li>
				<li><a href="#"><i class="fa fa-gear margin-right-5"></i> Configurações</a>
				</li>
				<li><a href="#"><i class="fa fa-question-circle margin-right-5"></i> Ajuda</a>
				</li>
				<li role="separator" class="divider"></li>
				<li><a href="#!/sessions/logout"><i class="fa fa-sign-out margin-right-5"></i> Log Off</a>
				</li>
			</ul>
		</li>
		<!--  Avatar END -->
		<!-- /.dropdown -->
		<!-- START Avatar -->
		<!--  Avatar END -->
	</ul>
	<!-- /.navbar-top-links -->
</nav>
<!-- START Navbar Inverse -->
<nav class="navbar navbar-inverse navbar-static-top hidden-lg hidden-md hidden-sm">
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-i-tz5">
			<i class="fa fa-list"></i>
		</button>
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-user">
		<span class="sr-only">Toggle navigation</span><i class="fa fa-fw fa-cog"></i>
		</button>
		<div class="container-fluid">
			<div class="navbar-header hidden-lg hidden-md hidden-sm" style="vertical-align: middle;">
				<a class="navbar-brand" href="#!/home"><img alt="KLIOS" src="/images/klios_6.png"></a>
			</div>
		</div>
	</div>
	<!-- /.navbar-header -->
	<div id="navbar-i-tz5" class="navbar-collapse">
		<ul class="nav navbar-nav menu hidden-lg hidden-sm hidden-md in">
			<li><a href="#!/home">Principal</a></li>
			<li><a href="#checklists">Checklists</a></li>
			<li><a href="#!/operacoes">Operações</a></li>
		</ul>
	</div>
	<!-- Start Menu Mobile "User", "Messages" and "Notifications -->
	<div id="navbar-user" class="navbar-collapse">
		<ul class="nav navbar-nav menu hidden-lg hidden-sm hidden-md">
			<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Usuário <span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li class="dropdown-header text-center"><small>Logado</small></li>
					<li class="divider divider-background"></li>
					<li><a href="#"><i class="fa fa-user margin-right-5"></i> Perfil</a></li>
					<li><a href="#"><i class="fa fa-gear margin-right-5"></i> Configurações</a></li>
					<li><a href="#"><i class="fa fa-question-circle margin-right-5"></i> Ajuda</a></li>
					<li><a href="#!/sessions/logout"><i class="fa fa-sign-out margin-right-5"></i> Log Off</a></li>
					<li class="divider divider-background"></li>
				</ul>
			</li>
		</ul>
	</div>
	<!-- /.navbar-top-links -->
</nav>
	<div id="page-wrapper" style="min-height: 588px;">
		<div id="adagio-home"></div>
	</div>
	<footer id="main_footer">
		<p class="text-muted small">
		<a href="javascript:window.history.back();"><i class="fa fa-chevron-left fa-fw fa-lg"></i> Voltar</a>
		<span class="text-muted pull-right">ADAGIO, KLIOS &copy; 2015</span>
		</p>
	</footer>
				</div>
			</div>
		</div>
<div id="album" style="position:fixed;background-color:#edeff0;top:0;bottom:0;left:0;right:0;padding:0px;z-index:5000;overflow-y:auto;display:none;"></div>
<!--
<script src="/sumea/chartist-settings.js"></script>
-->
	`,
	{
		"variable": 'adagio'
	}),
	initialize: function ()
	{
		try
		{
			this.getScript ("/sumea/bootstrap.min.css", "css", "theme");
			this.getScript ("/sumea/styles-theme.css", "css");
			this.getScript ("/sumea/metisMenu.min.css", "css");
			this.getScript ("/sumea/metisMenu.min.js", "js");
			this.release ();
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
				this.$el.html (this.template (this.model)).attr ("class", this.className);
				this.custom ();
			}
			else if (this.$el.attr ("class") !== this.className)
			{
				this.$el.html (this.template (this.model)).attr ("class", this.className);
				this.custom ();
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
	},
	"custom": function ()
	{
		var $body = $('body');

		$('#side-menu').metisMenu ();
		var adjusting = function ()
		{
			topOffset = 50;
			width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;

			if (width < 768)
			{
				$('div.navbar-collapse').addClass ('collapse');
				topOffset = 100; // 2-row-menu
			}
			else
			{
				$('div.navbar-collapse').removeClass('collapse');
			}

			height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
			height = height - topOffset;

			if (height < 1) height = 1;
			if (height > topOffset)
			{
				$("#page-wrapper").css ("min-height", (height) + "px");
			}
		};

		adjusting ();

		$(window).one ("resize", adjusting);

		$('#sidebar_toggle').off ().on ('click', function (e)
		{
			e.preventDefault ();
			$body.toggleClass ('small_sidebar');

			if ($body.hasClass ('small_sidebar'))
			{
				// $('#side-menu').find("li").has("ul").children("a").off("click.metisMenu").removeData("metisMenu");
			}
			else
			{
				$('#side-menu').metisMenu ();
			}

			if ($body.hasClass ('small_sidebar'))
			{
				$('#side-menu [data-toggle="side_tooltip"]').tooltip ({
					animation: false
				});

				$('#side-menu [data-toggle="side_tooltip_offset"]').tooltip ({
					animation: false
				});

				$("[data-toggle=side_tooltip_offset]").hover (function ()
				{
					$('.tooltip').css ('left',parseInt ($('.tooltip').css ('left')) + 160 + 'px')
				});
			}
			else
			{
				$('#side-menu [data-toggle="side_tooltip"]').tooltip ('destroy');
				$('#side-menu [data-toggle="side_tooltip_offset"]').tooltip ('destroy');
			}
		});
	}
}