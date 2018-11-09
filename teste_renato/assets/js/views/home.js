{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-home",
  "events": {
    "click .task-more-feedback": function moreFeedback(event) {
      try {
        event.preventDefault();
        event.stopPropagation();

        var $currentTarget = this.$(event.currentTarget)
        , date = ($currentTarget.data("date").substr(8, 2) + "/" + $currentTarget.data("date").substr(5, 2) + "/" + $currentTarget.data("date").substr(0, 4))
        , forum = Backbone.View.extend(this.subviews.forum)
        /*
        , quote = Backbone.Collection.extend({
            "url": adagio.environment.getEndpoint("checklists/" + $currentTarget.data("id") + "/comentarios"),
            "parse": function (response) {
                return response.collection;
            }
          })
        */
        , quote = Backbone.Model.extend({
            "urlRoot": adagio.environment.getEndpoint("checklists/" + $currentTarget.data("id") + "/comentarios"),
            "parse": function (response) {
                return response.model.comentarios;
            }
        })
          , mater = Backbone.View.extend(this.subviews.mater)
          , alma = Backbone.Model.extend({
            "urlRoot": adagio.environment.getEndpoint("checklists/" + $currentTarget.data("id")),
            "parse": function (response) {
                return _.extendOwn(response.model, response.collection);
            }
          })
          , $body = $currentTarget.parents("body");

        this.model.set("forum", new forum({"el": this.$(".widget-feedbacks"), "collection": new quote}));
        this.model.set("mater", new mater({"el": this.$("#timeline-operacoes"), "model": new alma}));

        $body.find("#operacao-id").val($currentTarget.data("id"));
        $body.find("#operacao-score").text(parseFloat($currentTarget.data("score")) * 100);
        $body.find("#operacao-date").text(date);
        $body.find("#operacao-author").text($currentTarget.data("author"));
        $body.find("#operacao-status").text($currentTarget.data("status"));
        $body.find("#operacao-owner").text($currentTarget.data("owner").toUpperCase());
        $body.find("#definput").prop("disabled", false);
        $body.find("#definput").focus();
        $body.find("#operacao-link").attr("href", "#!" + adagio.environment.getTenancy("checklists/" + $currentTarget.data("id")));
      }
      catch (caughtThrown) {
        console.error(caughtThrown)
      }
    },
    "submit #to-comment": function toComment(event) {
      try {
        event.preventDefault();
        event.stopPropagation();
        var
          $currentTarget = this.$(event.currentTarget),
          url = adagio.environment.getEndpoint("checklists/" + $currentTarget.find("#operacao-id").val() + "/comentarios");
        if (parseInt($currentTarget.find("#operacao-id").val()) === 0) {
          throw "No selected order."
        }
        $.ajax({
          "context": this,
          "method": "POST",
          "dataType": "json",
          "url": url,
          "data": {
          "conteudo": $currentTarget.find("input:text").val()
          }
        }).
        done(function () {
          this.model.get("forum").collection.fetch();
        });
      }
      catch (caughtThrown) {
        console.error(caughtThrown);
      }
    },
    "click #to-review": function toReview(event) {
      try {
        event.preventDefault();
        event.stopPropagation();
        var
          $currentTarget = this.$(event.currentTarget),
          $body = $currentTarget.parents("body"),
          id = parseInt($body.find("#operacao-id").val());
        if (_.isNaN(id)) {
          throw "It finds nothing.";
        }
        else if (_.isNumber(id) && id === 0) {
          throw "It finds nothing.";
        }
        else {
          //
        }
        $.ajax({
          "url": adagio.environment.getEndpoint("checklists/" + id + "/statuses"),
          "method": 'get',
          "dataType": 'html',
          "context": this
        }).
        done(function (response) {
          this.$("form#operacao-review").html(response);
          this.$('#modal_for_tag').modal('show');
        });
      }
      catch (caughtThrown) {
        console.error(caughtThrown);
      }
    },
    "submit form#operacao-review": function (event) {
      try {
        event.preventDefault();
        event.stopPropagation();

        var $currentTarget = this.$(event.currentTarget)
          , $body = $currentTarget.parents("body")
          , id = parseInt($body.find("#operacao-id").val())
          , status = $currentTarget.find("select[name=status]").val();

        $.ajax({
          "url": adagio.environment.getEndpoint("checklists/" + id),
          "data": {"status": status},
          "method": "PATCH",
          "context": this,
          "beforeSend": function () {
            this.$('#modal_for_tag').modal('hide');
          }
        }).done(function (response) {
          location.hash = [location.hash.slice(1).split('?').shift(), '?_=', _.now()].join("")
        });
      }
      catch (caughtThrown) {
        console.error(caughtThrown);
      }
    },
  },
  "subviews": {
        "forum": {
            "tagName": "div",
            "className": "widget-feedbacks",
            "initialize": function () {
                this.listenTo(this.collection, "sync", this.render);
                this.collection.fetch();
            },
            "render": function () {
                _.each(this.$(".comment"), function (item) {
                    this.$(item).remove();
                }, this);
                this.$("#definput").val("");
                this.$el.parents(".widget-container").find("#badge-feedbacks").text(this.collection.length);

                _(this.collection.attributes).each(function (item, position) {
                    this.$el.find(".comment-input").before('<div class="comment">'+
                    '<img src="/images/forum-user.png" alt="" class="comment-avatar"><div class="comment-body"><div class="comment-text"><div class="comment-header">'+
                    '<a href="#" title="">' + item.usuario_nome + '</a><span>'+
                    (item.comentario_data.substr(8, 2) + "/" + item.comentario_data.substr(5, 2) + "/" + item.comentario_data.substr(0, 4) + "&nbsp;" + item.comentario_data.substr(10, 6))+'</span></div>'+
                    "<p>" + item.comentario_conteudo + "</p>" +
                    (_.reduce (item.anexos, function (midias, midia) {
                        return [midias, (midia.arquivo_tipo === "image"
                            ? ('<p><img class="img-responsive img-thumbnail" src="/storage/' + midia.arquivo_id + '" data-operacao-id="operacao_id" /></p>')
                            : ('<p><a class="btn btn-block btn-default btn-sm" target="_blank" href="/storage/' + midia.arquivo_id + '">VER ANEXO</a></p>')
                        )].join('');
                    }, '', item))+
                    '</div>'+
                    '</div>'+
                    '</div>');
                }, this);
            }
        },
        "mater": {
            "tagName": "ul",
            "id": "timeline-operacoes",
            "className": "timeline timeline-condensed",
            "initialize": function () {
                this.listenTo(this.model, "sync", this.render);
                this.model.fetch();
            },
            "collection": [
              {"id": "tipo", "label": "OPERAÇÃO", "icon": "pe-7s-way"},
              {"id": "nome_motorista", "label": "CONDUTOR", "icon": "pe-7s-user"},
              {"id": "cpf_motorista", "label": "DOCUMENTO", "icon": "pe-7s-wallet"},
            ],
            "render": function () {
                this.$el.closest(".widget").show();

                _.each(this.$("li"), function (item) {
                    this.$(item).remove();
                }, this);

                var dadosUteis = _.extend(this.model.attributes, this.model.get("dados"));

                _.each(this.collection, function (item, position) {
                  if (_.has(dadosUteis, item.id)) {
                    this.$el.append('<li>'+
                    '<div class="timeline-datetime">'+
                        '<span class="timeline-time"></span>'+
                        '<span class="timeline-date"></span>'+
                    '</div>'+
                    '<div class="timeline-badge blue">'+
                        '<i class="' + item.icon + '"></i>'+
                    '</div>'+
                    '<div class="timeline-panel">'+
                        '<div class="timeline-header">'+
                            '<span class="timeline-title">' + dadosUteis[item.id] + '</span>'+
                            '<p class="timeline-datetime">'+
                                '<small class="text-muted">'+
                                    '<span class="timeline-date">' + item.label + '</span>'+
                            '<span class="timeline-time"></span>'+
                                '</small>'+
                            '</p>'+
                        '</div>'+
                    '</div>'+
                '</li>');
                  }
                }, this);
                if (this.model.has("veiculos")) {
                  _.each(this.model.get("veiculos"), function (item, position) {
                    this.$el.append('<li>'+
                    '<div class="timeline-datetime">'+
                    '<span class="timeline-time"></span>'+
                    '<span class="timeline-date"></span>'+
                    '</div>'+
                    '<div class="timeline-badge blue">'+
                    '<i class="pe-7s-car"></i>'+
                    '</div>'+
                    '<div class="timeline-panel">'+
                    '<div class="timeline-header">'+
                    '<span class="timeline-title">' + (item.placa || '&nbsp;') + '</span>'+
                    '<p class="timeline-datetime">'+
                    '<small class="text-muted">'+
                    '<span class="timeline-date">TIPO #' + item.categoria + '</span>'+
                    '<span class="timeline-time"></span>'+
                    '</small>'+
                    '</p>'+
                    '</div>'+
                    '</div>'+
                    '</li>');
                  }, this);
                }
                if (this.model.has("ocorrencias")) {
                  _.each(this.model.get("ocorrencias"), function (item, position) {
                    this.$el.append('<li>'+
                    '<div class="timeline-datetime">'+
                    '<span class="timeline-time"></span>'+
                    '<span class="timeline-date"></span>'+
                    '</div>'+
                    '<div class="timeline-badge blue">'+
                    '<i class="pe-7s-attention"></i>'+
                    '</div>'+
                    '<div class="timeline-panel">'+
                    '<div class="timeline-header">'+
                    '<span class="timeline-title">' + (item.nota || '&nbsp;') + '</span>'+
                    '<p class="timeline-datetime">'+
                    '<small class="text-muted">'+
                    '<span class="timeline-date">INCONFORMIDADE #' + item.id + '</span>'+
                    '<span class="timeline-time"></span>'+
                    '</small>'+
                    '</p>'+
                    '</div>'+
                    '</div>'+
                    '</li>');
                  }, this);
                }
            }
        },
    },
    "template": _.template(`
    <div class="col-md-8">
        <div class="row">
            <div class="col-md-6">
<div class="widget-container">
  <div class="widget">
      <div class="row">
          <div class="col-lg-6 h-100 p-15 align-center"><div class="f-50"><%= this.collection.length %></div></div>
          <div class="col-lg-6 h-100 p-15">
              <div class="f-13 m-t-15">Feedbacks</div>
              <div class="f-13">Ociosos</div>
          </div>
      </div>
  </div>
    <div class="widget">
        <div class="f-14 p-10 border-bottom-1 border-muted b-400">&Uacute;ltimas intera&ccedil;&otilde;es</div>
        <ul class="tasks-list">
        <% this.collection.each(function(item) { %>
            <li>
                <span class="label label-danger"><%= item.get("apelido") %></span>
                <span class="task-title"><%= item.get("tipo") %>&nbsp;|&nbsp;<%= item.get("nome").split(" ").shift() %></span>
                <a href="#" class="task-more task-more-feedback" data-id="<%= item.get("id") %>" data-date="<%= item.get("data") %>" data-score="<%= item.get("pontuacao") %>" data-author="<%= item.escape("criador") %>" data-status="<%= item.get("status") %>" data-owner="<%= item.escape("proprietario") %>">
                    <i class="pe-7s-angle-right"></i>
                </a>
            </li>
        <% }, this) %>
        </ul>
    </div>
</div>
            </div>
            <div class="col-md-6">
<div class="widget-container">
<div class="widget p-15 h-100">
<div>
<div><div class="f-15 col"><span id="operacao-author">NENHUM SELECIONADO</span></div><div class="f-12 col pull-right"><span id="operacao-status"></span></div></div>
<strong class="f-15 m-t-5"><span id="operacao-owner">&nbsp;</span></strong>
</div>
<div class="m-t-10 f-13"><a id="to-review" class="text-primary" href="#">Alterar situação</a></div>
</div>
    <div class="widget" style="display:none;">
        <div class="f-13 p-10 border-bottom-1 border-muted b-400">Dados da inspe&ccedil;&atilde;o</div>
        <div class="p-10 p-l-15 p-r-15"><ul id="timeline-operacoes" class="timeline timeline-condensed"></ul></div>
    </div>
</div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
<div class="widget-container">
<div class="widget">
    <a id="operacao-link" href="#"><i class="pe-7s-upload widget-stat top right f-25 text-warning"></i></a>
    <div class="row">
<div class="col h-100 w-100 align-center bg-warning">
<i class="pe-7s-tools f-70 m-t-15"></i>
</div>
<div class="col w-m-100 h-100 p-l-20 p-10">
<div class=""><strong class="f-25 text-warning"><span id="operacao-score">0</span>%</strong></div><div class=""><strong class="f-15">de intolerância</strong></div><div cl/ss="f-12"><span id="operacao-date"></span></div>
</div>
    </div>
</div>
            <div class="widget widget-feedbacks">
                <div class="f-13 p-10 border-bottom-1 border-muted b-400">
                    Coment&aacute;rios registrados (<span id="badge-feedbacks">0</span>)
                </div>
                <div class="comment-input">
                    <form id="to-comment">
                    <input type="hidden" value="0" id="operacao-id">
                    <div class="form-group">
                        <input class="form-control" id="definput" placeholder="comentar algo" type="text" disabled="disabled">
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <form id="operacao-review"></form>
    `,
    {"variable": "view"}),
    "initialize": function () {
        try {
            this.load("web").release();
        }
        catch (error) {
            console.error(error);
        }
    },
    "render": function () {
        try {
            if (this.collection)
                this.$el.html(this.template(this.model)).attr("class", this.className);
            else
                this.$el.attr("class", this.className);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            return this;
        }
    }
}