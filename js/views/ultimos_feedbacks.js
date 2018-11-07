{
	tagName: "div",
	id: "ultimos_feedbacks",
	className: "row",
	template: _.template (`
	<div class="listing"></div>
	<h4><a href="#" class="btn btn-outline btn-default btn-block btn-xs maisFeedbacks" role="button">ver mais</a></h4>
	`, {variable: 'adagio'}),
	events:
	{
		"click .enter": function (event)
		{
			event.stopPropagation ();
			event.preventDefault ();

			var _this = this,
				strict = {},
				globals = window,
				$currentTarget = this.$(event.currentTarget);

			globals.routing.navigate ("\!\/operacoes\/" + $currentTarget.data ("feedback-id"), {trigger: true});
		},
		"click .maisFeedbacks": "maisFeedbacks",
	},
	initialize: function ()
	{
		try
		{
			var _this = this,
				strict = {},
				globals = window;

			_this.collection = new Backbone.Collection ();

			_this.collection.parse = function (response)
			{
				_this.model.set (response.model);
				return response.collection;
			};

			_this.collection.comparator = function (a, b)
			{
				return a.get ('id') < b.get ('id');
			};

			_this.collection.url = "/interfaces/operacoes/feedbacks";

			_this.collection.on ("sync", function (response)
			{
				_this.threadedFeedbacks (response);
			});

			if (_this.daemon === undefined)
			{
				_this.daemon = new Daemon.safe (
					_this.collection, function ()
					{
						_this.collection.fetch ({
							"global": false,
							"error": function ()
							{
								_this.daemon.stop ();
							},
						});
					},
					30000);
				// _this.daemon.start ();
			}


		}
		catch (thrown)
		{
			console.error (thrown);
		}
		finally
		{
			this.release ();
		}
	},
	render: function ()
	{
		try
		{
			this.$el.html (this.template (this.model)).attr ("class", this.className);
			this.collection.fetch ({ global: false });
			this.daemon.start ();
		}
		catch (thrown)
		{
			console.error (thrown);
		}
		finally
		{
			return this;
		}
	},
	maisFeedbacks: function (event)
	{
		try
		{
			event.stopPropagation ();
			event.preventDefault ();

			var _this = this,
				strict = {},
				globals = window,
				$currentTarget = this.$(event.currentTarget);

			if (_this.model.get ("next_page_url") !== null)
				_this.model.set ("current_page", _this.model.get ("current_page") + 1);
		}
		catch (error)
		{
			globals.console.error (error);
		}
		finally
		{
			_this.collection.fetch ({ global: false, data: { page: _this.model.get ('current_page') } }).done (function ()
			{
				if (_this.model.get ("next_page_url") === null) $currentTarget.addClass ("disabled");
			});
		}
	},
	threadedFeedbacks: function (current_page)
	{
		try
		{
			var _this = this,
				strict = {},
				globals = window;

			strict.sandbox = document.createDocumentFragment ();
			strict.notify = document.createDocumentFragment ();

			_this.collection.each (function (model, index)
			{
				if (_this.$el.find ("#feedback_" + model.id).length === 0)
				{
					var item = Backbone.View.extend (_this.subviews["ultimos_feedbacks"]);
					strict.sandbox.appendChild ((new item ({model: model})).render ().el);
				}
			}, this);

			_this.collection.each (function (model, index)
			{
				if (_this.$el.parents ("body").find ("#feedback_notify_" + model.id).length === 0)
				{
					var itemList = Backbone.View.extend (_this.subviews["feedback-notify"])
					var notify = new itemList ({ model: model }),
						notify_separator = document.createElement ("li");

					notify_separator.className = "divider";
					strict.notify.appendChild (notify_separator);
					strict.notify.appendChild (notify.render ().el);
				}
			});

			this.$(".listing").append (strict.sandbox);
			_this.$el.parents ("body").find ("li.item-alerts").before (strict.notify);

			if (_this.$el.parents ("body").find (".total-feedbacks").length > 0)
				_this.$el.parents ("body").find (".total-feedbacks").text (_this.model.get ('total'));

			if (_this.$el.parents ("body").find (".total-inspecoes").length > 0)
				_this.$el.parents ("body").find (".total-inspecoes").text (_this.model.get ('numero_operacoes'));

			return true;
		}
		catch (error)
		{
			globals.console.error (error);
			return false;
		}
	},
	"subviews":
	{
		"feedback-notify":
		{
			tagName: "li",
			className: "media",
			template: _.template (`
			<a href="#!/operacoes/<%= feedback.get ('operacao_id') %>"><div><span><%= feedback.get ('nome_usuario') %><%= (feedback.get ('fotografias').length === 0 ? " fez um comentário." : " adicionou uma foto.") %></span></div></a>
			`, {variable: 'feedback'}),
			initialize: function ()
			{
				this.render ();
			},
			render: function ()
			{
				this.$el.html (this.template (this.model));
				this.$el.attr ("title", this.model.get ('updated_at'));
				this.$el.attr ("id", "feedback_notify_" + this.model.get ('id'));
				return this;
			}
		},
		"ultimos_feedbacks":
		{
			"tagName": "div",
			"className": "alert",
			"template": _.template (`
<h4>T<%= feedback.get ('percurso') %>: <%= feedback.get ('transportadora') %></h4>
<p>
<i class="fa fa-fw fa-user"></i> <%= feedback.get ('nome_usuario') %><br />
<i class="fa fa-fw fa-share-square-o"></i> <%= feedback.get ('updated_at') %><br />
</p>
<p><button type="button" class="btn btn-xs btn-block enter"><%= (feedback.get ('fotografias').length === 0 ? "Fez um comentário." : "Adicionou arquivos.") %></button></p>
			`, {"variable": 'feedback'}),
			"initialize": function ()
			{
				// this.render ();
			},
			"render": function ()
			{
				this.$el.html (this.template (this.model));
				this.$el.find ('button').data ('feedback-id', this.model.get ('operacao_id'));
				this.$el.attr ("id", "feedback_" + this.model.get ('id'));
				if (this.model.get ('situacao') === 1)
				{
					this.$el.addClass ('alert-danger');
					this.$el.find ('button').addClass ('btn-danger');
				}
				else
				{
					this.$el.addClass ('alert-success');
					this.$el.find ('button').addClass ('btn-default');
				}
				return this;
			}
		}
	}
}