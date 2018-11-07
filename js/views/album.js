{
    "tagName": "div",
    "id": "album",
    "template": _.template(`
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="row">
                <img src="/storage/<%= adagio.get('id') %>" style="width: 100%; height: auto;" />
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <h4>
                    <button type="button" class="btn btn-outline btn-default btn-block fecharAlbum"><i class="fa fa-times fa-lg"></i> fechar</button>
                </h4>
                <div class="adagio-notification"></div>
                <div class="panel panel-default">
                    <div class="panel-body">
                    <form id="form-album">
                        <div class="form-group">
                            <textarea class="form-control" name="observacoes"><%= adagio.get("observacoes") %></textarea>
                        </div>
                    </form>
                    </div>
                    <div class="panel-footer">
                        <div class="clearfix">
                            <!-- <a class="btn btn-default mostrarMetadados"><i class="fa fa-file-o"></i> Metadados</a> -->
                            <a class="btn btn-default excluirDocumento"><i class="fa fa-fw fa-times"></i> Excluir</a>
                            <a class="btn btn-primary salvarEdicao pull-right">Salvar</a>
                        </div>
                    </div>
                    <table id="album-metadados" class="table" style="display: none;">
                        <thead><tr><th>Metadado</th></tr></thead>
                        <tbody>
                            <% _.each (adagio.attributes, function (value, key) { %>
                            <%= (value && _.isObject (value) === false ? '<tr><td><abbr title="' + key + '">' + value +'</abbr></td></tr>' : '') %>
                            <% }); %>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `, {"variable": 'adagio'}),
    "events": {
        "click .fecharAlbum": function fecharAlbum(event) {
            event.stopPropagation();
            event.preventDefault();

            this.$el.empty().hide();
            $("body").css("overflow", "auto");
        },
        /*
        "click .mostrarMetadados": function (event)
        {
            event.stopPropagation ();
            event.preventDefault ();

            var _this = this,
                strict = {},
                globals = window,
                $currentTarget = this.$(event.currentTarget);

            _this.$el.find ("#album-metadados").toggle ();
        },
        */
        "click .salvarEdicao": function salvarEdicao(event) {
            event.stopPropagation();
            event.preventDefault();

            var strict = {};

            strict.formulario = this.$("form#form-album").serialize();

            $.ajax({
                "url": this.model.get('update'),
                "method": 'patch',
                "dataType": 'json',
                "data": strict.formulario,
                "cache": false,
                "context": this,
            }).
            done(function () {
                $('.a-album > img[src$="'+this.model.get('id')+'"]').parents('.thumbnail').find('.caption').find('p').text(this.$("form#form-album").find("[name=observacoes]").val());
            });
        },
        "click .excluirDocumento": function excluirDocumento(event) {
            event.stopPropagation();
            event.preventDefault();

            var vars = {};

            vars.formulario = this.$("form#form-album").serialize();
            vars.certeza = confirm("Você realmente deseja excluir esse documento arquivístico?");

            if (vars.certeza)
            $.ajax({
                "url": this.model.get('update'),
                "method": 'delete',
                "dataType": 'json',
                "data": vars.formulario,
                "cache": false,
                "context": this,
            })
            .done(function () {
                $('.a-album > img[src$="'+this.model.get('id')+'"]').parents('.thumbnail').parent('div').remove();
                $('.a-album[data-id="'+this.model.get('id')+'"]').parents('tr').remove();
                this.$el.empty().hide();
                $("body").css("overflow", "auto");
            });
        },
    },
	"initialize": function () {
        // Response
		return this.render();
	},
    "render": function () {
        try {
            this.$el.html(this.template(this.model)).attr("class", this.className);
            $("body").css("overflow", "hidden");
            this.$el.show();
        } catch (thrown) {
            console.error(thrown);
        } finally {
            var firstWithoutUpdate = !this.model.hasChanged("id") && !this.model.has("update"),
                withoutUpdate = this.model.hasChanged("id") && !this.model.hasChanged("update");

            // Detecting leak of field
            if (firstWithoutUpdate || withoutUpdate) {
                this.$(".excluirDocumento").prop("disabled", true).addClass("disabled");
                this.$(".salvarEdicao").prop("disabled", true).addClass("disabled");
                this.$("textarea[name=observacoes]").prop("disabled", true).addClass("disabled");
                this.model.unset("update");
            }

            // Chained response
            return this;
        }
    },
    "notification": window.handling.notification
}