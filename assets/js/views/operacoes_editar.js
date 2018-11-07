{
    tagName: "div",
    id: "adagio-home",
    className: "adagio-operacoes-edit",
    events: {
        "change select[name=tipo]": function selectNameTipo(event) {
            var $currentTarget = this.$(event.currentTarget),
                self = this;

            if ($currentTarget.val() !== "0") {
                self.$(".checklist-itens").removeAttr("disabled");
            }
            else {
                self.$(".checklist-itens").attr('disabled', 'disabled');
            }

            event.preventDefault();
        },
        "click .checklist-itens": "carregarItens",
        "click .checklist-set": "salvarChecklist",
        // "submit form#form-photos": "salvarFoto",
        "click #incluirPlaca": "incluirPlaca",
        "change #inputVinculo": "mostrarCnpj"
    },
    mostrarCnpj: function mostrarCnpj(event) {
        event.preventDefault();
        event.stopPropagation();

        var $dom = this.$(event.target),
            vars = {};

        vars.vinculo = parseInt($dom.val());

        if (vars.vinculo > 1) {
            this.$(".if-cnpj").show();
        }
        else {
            this.$(".if-cnpj").hide();
        }
    },
    incluirPlaca: function incluirPlaca(event)
    {
        try {
            var $el = this.$("#"+event.currentTarget.id),
                strict = {};

            strict.indice = this.$('[name^=placas]').length;
            strict.formulario = _.template(`
            <fieldset><div class="form-group">
                <label for="placas[<%= adagio.indice %>]" class="col-sm-3 control-label">Placa</label>
                <div class="col-sm-3"><input class="form-control" type="text" id="placas[<%= adagio.indice %>]" name="placas[<%= adagio.indice %>]" value=""><p class="help-block">Placa Veículo</p></div>
                <div class="col-sm-3"><input class="form-control" type="text" name="numeros[<%= adagio.indice %>]" value=""><p class="help-block">Número Frota</p></div>
                <div class="col-sm-3">
                    <select class="form-control autocategorias" name="categorias[<%= adagio.indice %>]">
                        <option value="0">Selecionar...</option>
                        <% adagio.autocategorias.each (function (vinculo) { %>
                        <option value="<%= vinculo.get ('id') %>"><%= vinculo.get ('autocategoria') %></option>
                        <% }); %>
                    </select>
                    <p class="help-block">Categoria Veículo</p>
                </div>
            </div></fieldset>
            `,
            {"variable": 'adagio'});

            $el.closest("fieldset").before(strict.formulario({"autocategorias": this.autocategorias, "indice": strict.indice}));
        }
        catch (thrown) {
            console.error(thrown);
        }
        finally {
            event.preventDefault();
            event.stopPropagation();
        }
    },
    salvarChecklist: function (event)
    {
        var tag = event.currentTarget, _this = this, strict = {}, globals = window;
        try {
            strict.forms = _this.$("form.form-datas").serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '');
            $.ajax({
                url: adagio.environment.getEndpoint('operacoes'),
                method: "POST",
                data: strict.forms
            }).done(function (response) {
                if (response.error) {
                    for (var n in response.errors) {
                        _this.$('[name="' + n + '"]').closest(".form-group").attr("class", "form-group has-error");
                        for (o in response.errors[n])
                            _this.$('[name="' + n + '"]').closest("form").prepend('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.errors[n][o] + '</div>');
                    }
                }
                else {
                    alert("Feito.");
                }
            });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            event.preventDefault();
        }
    },
    carregarFotos: function carregarFotos(event)
    {
        var self = this,
            fragmento = document.createDocumentFragment();

        this.collection.fotos.each(function (foto) {
            var item = Backbone.View.extend(this.subviews["operacoes_foto"]);

            fragmento.appendChild(new item({model: foto}).el);
        }, this);

        this.$("#fotos").append(fragmento);

        event.preventDefault();
    },
    /*
    salvarFoto: function (event)
    {
        var self = event.currentTarget, local = {}, global = this; event.preventDefault ();

        local.forms = new FormData (document.getElementById ("form-photos"));

        global.collection.fotos.create (null, { timeout: 15000, wait: true, processData: false, contentType: false, data: local.forms, success: function (collection, response, options)
        {
            global.$(self).closest ("form").find ("[class^=warning-]").empty ();

            if (response.error)
            {
                for (var n in response.errors)
                global.$(self).closest ("form").find ("[class^=warning-]").append ('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+response.errors[n]+'</div>');
            }
            else
            {
                global.fragmento = document.createDocumentFragment ();
                global.fragmento.appendChild (new Application.Model.Template.View['operacoes_foto']({ model: collection }).el);
                global.$("#fotos").append (global.fragmento);
            }
        }});
        return event.preventDefault ();
    },
    */
    storage:
    {
        set: function (key, value)
        {
            if (!key || !value)
            return [];

            if (typeof value === "object")
            value = JSON.stringify (value);

            window.localStorage.setItem (key, value);

            return this.get (key);
        },
        get: function (key)
        {
            var value = window.localStorage.getItem (key);

            if (!value)
            return [];

            if (value[0] === "{" || value[0] === "[")
            value = JSON.parse (value);

            return value;
        },

    },
    subviews:
    {
        "operacoes_foto": {
            tagName: "div",
            className: "col-sm-3",
            template: _.template('<div class="thumbnail">' +
            '<a href="#" class="a-album"><img src="/storage/<%= view.get("id") %>" alt="Imagem"<%= this.dataAsAttr %> /></a>' +
            '<div class="caption"><p><%= view.get("observacoes") %></p></div>' +
            '</div>',
            {variable: 'view'}),
            initialize: function (options) {
                return this.render();
            },
            render: function () {
                try {
                    var dataAsAttr = '';
                    this.model.attributes.update = adagio.environment.getEndpoint([
                        "operacoes", this.model.get("operacao"), "fotos", this.model.get("id")
                    ].join("/"));
                    _.each(this.model.attributes, function (value, key, list) {
                        // this.$el.find("img").data(key, value);
                        if (typeof value === 'string') {
                            dataAsAttr += ' data-' + key + '="' + value + '"';
                        }
                    }, this);
                    this.dataAsAttr = dataAsAttr;
                    this.$el.html(this.template(this.model));
                }
                catch (error) {
                    console.error(error);
                }
                finally {
                    this.listenTo(this.model, 'change', this.editing);
                    this.listenTo(this.model, 'destroy', this.erasing);

                    return this;
                }
            },
            editing: function () {
                try {
                    this.$el.find(".thumbnail").replaceWith(this.template(this.model));
                }
                catch (error) {
                    console.error(error);
                }
                finally {
                    return this;
                }
            },
            erasing: function () {
                return this;
            }
        },
        "checklist": Backbone.View.extend({
            tagName: "div",
            className: "col-lg-12",
            content: document.createDocumentFragment(),
            template: _.template(`
            <% var iterator = 1; %>

            <div class="row">
            <% _.each (adagio.collection, function (group, gindex) { %>

        <p><button class="btn btn-default btn-block" type="button" data-toggle="collapse" data-target="#collapseListGroup<%= gindex %>" aria-expanded="false" aria-controls="collapseExample"><div class="text-left"><%= _.first (group).categoria %></div></button></p>

        <div style="height: 0px;" aria-expanded="false" id="collapseListGroup<%= gindex %>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading<%= gindex %>">
            <div class="list-group">
            <% _.each (group, function (li, index) { %>
            <a data-toggle="collapse" href="#obs<%=iterator%>" aria-expanded="false" aria-controls="collapseExample" class="list-group-item checklist-item <%= (adagio.model.get (li.id) !== undefined ? 'list-group-item-warning' : '') %>" data-checklist="<%= li.id %>">
                <span class="label label-<%= (li.nivel == 4 ? 'danger' : (li.nivel >= 2 ? 'warning' : 'default')) %> hidden-xs"><%= li.nivel %></span>
                <%= li.ocorrencia %>
            </a>
            <div class="collapse" id="obs<%=iterator%>">
<div class="row">
    <div class="col-xs-4 text-right"><div class="checkbox"><label>
        <input class="checkbox-danger" type="checkbox" aria-label="..." name="itens[<%=iterator%>][id]" value="<%= li.id %>" <%= (adagio.model.get (li.id) !== undefined ? 'checked' : '') %>>
        <span class="text">Reprovado</span>
    </label></div></div>
    <div class="col-lg-8"><input class="form-control" name="itens[<%=iterator%>][observacoes]" value="<%= (adagio.model.get (li.id) !== undefined ? adagio.model.get (li.id).get ('observacoes') : '') %>" type="text"></div>
</div>
            </div>
            <% iterator++; %>
            <% }); %>
            </div>
        </div>

            <% }); %>
            </div>
            `, {variable: 'adagio'}),
            initialize: function (options)
            {
                this.options = options;
                this.listenTo(this.collection, 'add', this.render);
                this.render();
            },
            render: function ()
            {
                if (this.collection.length > 0 && this.collection.get(0).attributes[this.options.tesao] !== undefined)
                    this.$el.html(this.template({model: this.model, collection: this.collection.get(0).attributes[this.options.tesao]}));
                else
                    this.collection.fetch();
                return this;
            },
        }),
    },
    template: _.template(`
    <div class="container-fluid">
    <div class="row">
        <div class="col-xs-12 col-sm-6">
            <div class="btn-group">
                <button id="mostra-status" type="button" class="btn btn-default operacao-status">Carregando...</button>
                <button id="controle-status" type="button" class="btn btn-default operacao-status dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>
                <ul class="dropdown-menu" role="menu">
                <li><a href="#" class="codigo-status" data-codigo-status="1">Reprovado</a></li>
                <li><a href="#" class="codigo-status" data-codigo-status="3">Corrigido</a></li>
                <li><a href="#" class="codigo-status" data-codigo-status="5">Aprovado</a></li>
                </ul>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6">
            <p class="lead operacao-autor"></p>
        </div>
    </div><!-- /row -->
    <div class="row">
        <div class="col-sm-12">
            <div class="panel panel-default">
                <div class="panel-heading">INSPEÇÃO #<%= adagio.id %></div>
                <form class="form-horizontal panel-body form-datas">
                <input name="timestamp" value="<%= _.now () %>" type="hidden">
                <input name="id" value="<%= adagio.id %>" type="hidden">
<fieldset>
    <div class="form-group">
        <label for="inputTransportadora" class="col-sm-3 control-label">Transportadora</label>
        <div class="col-sm-9">
        <select name="transportadora" class="form-control" id="inputTransportadora">
            <option value="0">Selecionar...</option>
            <% this.empresas.each (function (empresa) { %>
            <% if (empresa.get ('nome').search (/leiteira/i) !== -1) return false; %>
            <optgroup label="<%= empresa.get('nome') %>">
            <% _.each (empresa.get('dependentes'), function (dependente, uid) { %>
            <option <%= (parseInt (dependente.id) === parseInt (adagio.attributes.grupo) ? "selected" : "") %> value="<%= dependente.id %>"><%= dependente.nome.toString ().toUpperCase () %></option>
            <% }); %>
            <% }); %>
            </optgroup>
        </select>
        </div>
    </div>
</fieldset>
<fieldset>
    <div class="form-group">
        <label for="inputOutroGrupo" class="col-sm-3 control-label">Região Leiteira</label>
        <div class="col-sm-9">
            <select name="outro_grupo" class="form-control" id="inputOutroGrupo">
                <option value="0">Selecionar...</option>
                <% this.empresas.each (function (empresa) { %>
                    <% if (empresa.get ('nome').search (/leiteira/i) !== -1) { %>
                        <% _.each (empresa.attributes.dependentes, function (dependente) { %>
                        <option <%= (parseInt (dependente.id) === parseInt (adagio.attributes.outro_grupo) ? "selected" : "") %> value="<%= dependente.id %>"><%= dependente.nome.toString ().toUpperCase () %></option>
                        <% }); %>
                    <% } %>
                <% }); %>
            </select>
        </div>
    </div>
</fieldset>
                <fieldset><div class="form-group">
                    <label for="inputVinculo" class="col-sm-3 control-label">Vínculo</label>
                    <div class="col-sm-3"><select name="vinculo" class="form-control" id="inputVinculo">
                    <% _(["Selecionar...", "Frota", "Agregado", "CIF"]).each (function (vinculo, i) { %><option <% print (i==adagio.attributes.vinculo?"selected":"") %> value="<%= i %>"><%= vinculo %></option>
                    <% }); %>
                    </select>
                    </div>
                    <label class="col-sm-3 control-label">Data
                    </label>
                    <div class="col-sm-3">
                        <div class="input-group date"><input name="data" class="form-control" type="text" placeholder="YYYY-MM-DD" value="<%=adagio.attributes.data%>" readonly><span class="input-group-addon"><i class="fa fa-fw fa-calendar"></i></span></div>
                    </div>
                </div></fieldset>
                <fieldset><div class="form-group">
                    <label for="nome_motorista" class="col-sm-3 control-label">Motorista</label>
                    <div class="col-sm-3"><input id="nome_motorista" name="nome_motorista" class="form-control" type="text" value="<%=adagio.attributes.nome_motorista%>"></div>
                    <label for="cpf_motorista" class="col-sm-3 control-label">CPF</label>
                    <div class="col-sm-3"><input id="cpf_motorista" name="cpf_motorista" class="form-control" type="text" value="<%=adagio.attributes.cpf_motorista%>"></div>
                </div></fieldset>
                <fieldset class="if-cnpj"><div class="form-group">
                    <label class="col-sm-3 control-label">Razão Social
                    </label>
                    <div class="col-sm-3"><input name="razao_motorista" class="form-control" type="text" value="<%= adagio.attributes.razao_motorista %>">
                    </div>
                    <label class="col-sm-3 control-label">CNPJ
                    </label>
                    <div class="col-sm-3"><input name="cnpj_motorista" class="form-control" type="text" value="<%= adagio.attributes.cnpj_motorista %>">
                    </div>
                </div></fieldset>
<fieldset>
    <div class="form-group">
        <label for="selectConfiguracao" class="col-sm-3 control-label">Configuração</label>
        <div class="col-sm-3">
            <select class="form-control" name="configuracao" id="selectConfiguracao">
            <% _(["Selecionar...", "Caminhão", "Caminhão e Reboque", "Bitrem", "Vanderléia", "Rodotrem", "Reboque", "Semirreboque"]).each (function (vinculo, i) { %>
                <option <%= (i === parseInt (adagio.attributes.configuracao) ? "selected" : "") %> value="<%= i %>"><%= vinculo %></option>
            <% }); %>
            </select>
        </div>
    </div>
</fieldset>
                <% var autocategorias = new Backbone.Collection ([{"id":5,"autocategoria":"CAMINHÃO SIMPLES"},{"id":11,"autocategoria":"CAMINHÃO TRUCK"},{"id":12,"autocategoria":"CAMINHÃO DIRECIONAL"},{"id":6,"autocategoria":"CAMINHÃO TRATOR"},{"id":8,"autocategoria":"SEMIRREBOQUE"},{"id":9,"autocategoria":"SEMIRREBOQUE LS"},{"id":10,"autocategoria":"REBOQUE"}]); %>
                <% var _this = this; _.each (adagio.get ('placas'), function (placa, i) { %>
                <fieldset><div class="form-group">
                    <label for="placas[<%= i %>]" class="col-sm-3 control-label">Placa</label>
                    <div class="col-sm-3"><input class="form-control" type="text" id="placas[<%= i %>]" name="placas[<%= i %>]" value="<%= placa.placa %>"><p class="help-block">Placa Veículo</p></div>
                    <div class="col-sm-3"><input class="form-control" type="text" name="numeros[<%= i %>]" value="<%= placa.pivot.numero %>"><p class="help-block">Número Frota</p></div>
                    <div class="col-sm-3">
                        <select class="form-control autocategorias" name="categorias[<%= i %>]">
                            <option value="0">Selecionar...</option>
                            <% autocategorias.each (function (vinculo) { %>
                            <option <%= (placa.pivot.autocategoria_id && vinculo.get ('id') === parseInt (placa.pivot.autocategoria_id) ? "selected" : "") %> value="<%= vinculo.get ('id') %>"><%= vinculo.get ('autocategoria') %></option>
                            <% }); %>
                        </select>
                        <p class="help-block">Categoria Veículo</p>
                    </div>
                </div></fieldset>
                <% }); %>
                <fieldset>
                    <div class="form-group"><div class="col-sm-3 col-sm-offset-9"><a href="#" class="btn btn-default btn-sm" id="incluirPlaca"><i class="fa fa-fw fa-plus"></i> Incluir placa</a></div></div>
                </fieldset>
                <fieldset><div class="form-group">
                    <label for="inputTipo" class="col-sm-3 control-label">Percurso
                    </label>
                    <div class="col-sm-3">
                        <select name="tipo" class="form-control" id="inputTipo"><% _(["Selecionar...", "T1", "T2"]).each (function (tesao, i) { %><option <%= (i === parseInt (adagio.attributes.tipo) ? "selected" : "") %> value="<%= i %>"><%= tesao %></option><% }); %></select>
                    </div>
                    <div class="col-sm-6"><button type="button" class="btn btn-default btn-block checklist-itens" disabled="disabled">Carregar lista</button>
                    </div>
                </div></fieldset>

<div class="form-group">
    <label for="origem_uf" class="col-sm-3 control-label">Origem</label>
    <div class="col-sm-3">
        <select name="origem_uf" class="form-control ufs" id="origem_uf">
            <option value="0">Selecionar...</option>
            <% this.subdistritos.each (function (subdistrito, i) { %>
            <option <%= (subdistrito.get ('uf') === parseInt (adagio.attributes.origem_uf) ? "selected" : "") %> value="<%= subdistrito.get ('uf') %>"><%= subdistrito.get ('nome_uf') %></option>
            <% }); %>
        </select>
    </div>
    <label for="origem_id" class="col-sm-3 control-label">Localidade</label>
    <div class="col-sm-3">
        <select name="origem_id" class="form-control" id="origem_id">
            <option value="0">Selecionar...</option>
            <% if (this['subdistritos.'+adagio.attributes.origem_uf]){ %>
            <% this['subdistritos.'+adagio.attributes.origem_uf].each (function (subdistrito, i) { %>
            <option <%= (subdistrito.get ('codigo_subdistrito') === adagio.attributes.origem_id ? "selected" : "") %> value="<%= subdistrito.get ('codigo_subdistrito') %>"><%= subdistrito.get ('nome_distrito') %><%= (subdistrito.get ('nome_subdistrito') ? ' &#8212; ' + subdistrito.get ('nome_subdistrito') : '') %></option>
            <% }); } %>
        </select>
    </div>
</div>
<div class="form-group show-on-t2" style="display: none;">
    <label for="destino_uf" class="col-sm-3 control-label">Destino</label>
    <div class="col-sm-3">
        <select name="destino_uf" class="form-control ufs" id="destino_uf">
            <option value="0">Selecionar...</option>
            <% this.subdistritos.each (function (subdistrito, i) { %>
            <option <%= (subdistrito.get ('uf') === parseInt (adagio.attributes.destino_uf) ? "selected" : "") %> value="<%= subdistrito.get ('uf') %>"><%= subdistrito.get ('nome_uf') %></option>
            <% }); %>
        </select>
    </div>
    <label for="destino_id" class="col-sm-3 control-label">Localidade</label>
    <div class="col-sm-3">
        <select name="destino_id" class="form-control" id="destino_id">
            <option value="0">Selecionar...</option>
            <% if (this['subdistritos.'+adagio.attributes.destino_uf]){ %>
            <% this['subdistritos.'+adagio.attributes.destino_uf].each (function (subdistrito, i) { %>
            <option <%= (subdistrito.get ('codigo_subdistrito') === adagio.attributes.destino_id ? "selected" : "") %> value="<%= subdistrito.get ('codigo_subdistrito') %>"><%= subdistrito.get ('nome_distrito') %><%= (subdistrito.get ('nome_subdistrito') ? ' &#8212; ' + subdistrito.get ('nome_subdistrito') : '') %></option>
            <% }); } %>
        </select>
    </div>
</div>
<div class="form-group show-on-t2" style="display: none;">
    <label for="posicao" class="col-sm-3 control-label">Posição atual</label>
    <div class="col-sm-3">
        <select name="posicao" class="form-control" id="posicao">
        <% _(["Selecionar...", "Origem", "Destino"]).each (function (vinculo, i) { %>
        <option <%= (i === parseInt (adagio.attributes.posicao) ? "selected" : "") %> value="<%= i %>"><%= vinculo %></option>
        <% }); %>
        </select>
    </div>
</div>
    <div class="col-sm-6 control-label"></div>
                <div class="row">
                </div>

                <div class="well">
                <p class="lead">NÃO CONFORMIDADES ENCONTRADAS (<span class="checklist-counted-ones"><%= adagio.attributes.itens.length %></span>) <span class="pull-right"><button type="button" class="btn btn-default" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="fa fa-fw fa-check-square-o"></i> Ver todas</button></span></p>
                </div>
<!-- Modal -->
<div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog modal-md">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
<h4 class="modal-title" id="myModalLabel">Lista de checagem</h4>
</div>
<div class="modal-body">
<div class="row"><div class="col-sm-12" id="checklistItens"></div></div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-primary" data-dismiss="modal">Concluir</button>
</div>
</div>
</div>
</div>
            <div class="row">
                <hr>
            </div>
            <div class="row">
                <div class="col-sm-6"><button type="button" class="btn btn-primary btn-block checklist-set">Salvar</button></div>
            </div>
        </form>
    </div>

<div class="clearfix"><br /></div>
<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">Fotografias</h3>
</div>
<div class="panel-body">
    <form id="filedrag" class="form-horizontal form-photos">
        <div class="warning-form-photos"></div>
        <div class="form-group">
            <div class="col-xs-12 col-sm-6"><input type="file" id="fileselect" name="fileselect[]" multiple="multiple" /></div>
            <div class="col-xs-12 col-sm-6" id="submitbutton"><button type="submit" class="btn btn-default btn-block">Upload</button></div>
        </div>
    </form>
</div>
<div class="panel-footer">
    <div id="progress"></div>
    <div id="messages">Por favor, envie apenas arquivos no formato de imagens válidas (jpg, jpeg, png, gif).</div>
</div>
</div>
            <div class="row" id="fotos"></div>
        </div>
    </div>
    </div>
    `, {variable: 'adagio'}),
    initialize: function ()
    {
        try {
            this.load("web").release();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            //
        }
    },
    render: function ()
    {
        var strict = {}, _this = this, globals = window;
        //
        strict.objectCaches = [
            new globals.objectCache('empresas', adagio.environment.getEndpoint('prestadores'), null, true),
            new globals.objectCache('autocategorias', adagio.environment.getRoot()+'/autocategorias'),
            new globals.objectCache('subdistritos', adagio.environment.getRoot()+'/subdistritos'),
            new globals.objectCache('subdistritos.'+this.collection.origem_uf, adagio.environment.getRoot()+'/subdistritos?uf='+this.collection.origem_uf),
            new globals.objectCache('subdistritos.'+this.collection.destino_uf, adagio.environment.getRoot()+'/subdistritos?uf='+this.collection.destino_uf),
        ];
        //
        $.when.apply(null, strict.objectCaches).then(function () {
            var args = Array.prototype.slice.call(arguments);

            for (var n in args)
                if (args[n] && args[n].instance)
                    _this[args[n].instance] = args[n].get('collection');

            if (_this.$el.attr("class") === undefined) {
                // load
                _this.$el.html(_this.template(new Backbone.Model(_this.collection))).attr("class", _this.className);
                _this.carregarItens({currentTarget: _this.$(".checklist-itens"), preventDefault: function (){}});
                //
                _this.collection.fotos = new Backbone.Collection();
                _this.collection.fotos.url = adagio.environment.getEndpoint('operacoes/'+_this.collection.id+'/fotos');
                _this.collection.fotos.fetch().done(function (response) {
                    _this.carregarFotos({currentTarget: _this.$("#fotos"), preventDefault: function (){}});
                });
            }
            else if (_this.$el.attr("class") !== _this.className) {
                // reload
                _this.$el.html(_this.template(new Backbone.Model(_this.collection))).attr("class", _this.className);
                _this.carregarItens({currentTarget: _this.$(".checklist-itens"), preventDefault: function (){}});
                //
                _this.collection.fotos = new Backbone.Collection();
                _this.collection.fotos.url = adagio.environment.getEndpoint('operacoes/'+_this.collection.id+'/fotos');
                _this.collection.fotos.fetch().done(function (response) {
                    _this.carregarFotos({currentTarget: _this.$("#fotos"), preventDefault: function (){}});
                });
            }
            else {
                // already
            }
            //
            _this.$('.date').datepicker({format: 'yyyy-mm-dd', startDate: '-3m', autoclose: true});
            //
            _this.$('[name=tipo]').off().on("change", function (event) {
                var valor = this.value;
                if (valor == "2") {
                    _this.$(".show-on-t2").show();
                }
                else {
                    _this.$(".show-on-t2").hide();
                    _this.$("select[name=destino_uf]").val(0);
                    _this.$("select[name=destino_id]").val(0);
                }
            });
            //
            _this.$(".ufs").off().on("change", function (event) {
                var nome = this.name.split("_"),
                    valor = this.value;

                var alvo = ['#', nome[0], '_', 'id'].join('');

                if (valor !== "0") {
                    new globals.objectCache('subdistritos.'+valor, adagio.environment.getRoot()+'/subdistritos?uf='+valor).done(function (response) {
                        _this.carregarLocais({data: response, currentTarget: _this.$(alvo), preventDefault: function (){}});
                    });
                }
            });
            //
            if (_this.collection.tipo === 2) {
                _this.$(".show-on-t2").show();
            }
            else {
                _this.$("select[name=destino_uf]").val(0);
                _this.$("select[name=destino_id]").val(0);
            }
            _this.$('#inputVinculo').trigger('change');
            // call initialization file
            if (window.File && window.FileList && window.FileReader) {
                _this.Init(_this);
            }
            //
            _this.$(".operacao-autor").html(
                "<small class='text-muted'><i class='fa fa-clock-o'></i> " + _this.collection.created_at.substr(-8) + "&nbsp;&mdash;&nbsp;" +
                "<i class='fa fa-calendar-o'></i> " + _this.collection.created_at.substr(8, 2) + "/" + _this.collection.created_at.substr (5, 2) + "/" + _this.collection.created_at.substr(0, 4) +
                "</small><br /><small><i class='fa fa-clock-o'></i> " + _this.collection.updated_at.substr(-8) +
                "&nbsp;&mdash;&nbsp;<i class='fa fa-calendar-o'></i> " + _this.collection.updated_at.substr(8, 2) + "/" + _this.collection.updated_at.substr(5, 2) + "/" + _this.collection.updated_at.substr(0, 4) +
                "</small>"
            );
            _this.tratamentoStatus();
        });
    },
    alteraBotaoStatus: function alteraBotaoStatus()
    {
        var self = this,
            vars = {};

        vars.statuses = ['Pendente', 'Reprovado', '', 'Corrigido', '', 'Aprovado'];
        vars.colors = ['btn-default', 'btn-danger', '', 'btn-warning', '', 'btn-success'];
        vars.status = vars.statuses[self.collection.status];
        vars.color = " " + vars.colors[self.collection.status];

        self.$("#mostra-status").text(vars.status);
        self.$(".operacao-status").each(function () {
            var dropdownlet = self.$(this).hasClass("dropdown-toggle") ? " dropdown-toggle" : "";
            self.$(this).attr("class", "operacao-status btn btn-md" + vars.color + dropdownlet);
        });
    },
    tratamentoStatus: function tratamentoStatus()
    {
        var self = this,
            vars = {};

        self.alteraBotaoStatus();

        $.ajax({
            url: adagio.environment.getEndpoint('operacoes/' + self.collection.id + '/statuses'),
            method: 'head',
            dataType: 'html',
        }).
        done(function () {
            console.info('Parabéns! Permissão para alteração de status do objeto encontrada.');

            self.$("#controle-status").removeAttr("disabled");
            self.$(".codigo-status").off().on("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                vars.codigo = parseInt(self.$(event.currentTarget).data("codigo-status"));

                if (self.model.get('status') !== vars.codigo)
                $.ajax({
                    url: adagio.environment.getEndpoint('operacoes/' + self.collection.id),
                    method: 'patch',
                    dataType: 'json',
                    data: {status: vars.codigo}
                }).
                done(function () {
                    vars.destino = "!" + adagio.environment.getTenancy('operacoes/' + self.collection.id + (vars.codigo === 0 ? '/edit' : ''));

                    if (vars.destino !== location.hash.substr(1)) {
                        adagio.eventBus.trigger("navigate", vars.destino, {"trigger": true});
                    } else {
                        self.collection.status = vars.codigo;
                        self.alteraBotaoStatus();
                    }
                });
                return false;
            });
        }).
        fail(function () {
            self.$("#controle-status").attr("disabled", "disabled");
        });
        return false;
    },
    carregarItens: function (event)
    {
        var self = event.currentTarget, local = {}, global = this;

        global.$("#checklistItens").empty();
        global.tesao = global.$("#inputTipo").val();

        if (global.tesao == 0)
        {
            global.$("#inputTipo").focus();
            return event.preventDefault();
        }

        local.ocorrencia = Backbone.Model.extend({
            defaults: { "id": 0, "ocorrencia": "", "pontuacao": 0, "nivel": 0, "tesoes": [], "categoria_id": 0 }
        });

        local.ocorrencias = Backbone.Collection.extend({
            url: adagio.environment.getEndpoint('ocorrencias'),
            model: local.ocorrencia,
            parse: function (data)
            {
                var indexes = [1, 2], indexedByTesoes = {};

                _.map(indexes, function (i) {
                    indexedByTesoes[i] = _.filter(data, function (line) {
                        return _.contains(line.tesoes, i);
                    });
                });

                delete data;

                _.each(indexedByTesoes, function (e, i) {
                    indexedByTesoes[i] = _.groupBy(e, function (obj) {
                        return obj.categoria_id;
                    });
                });

                return global.storage.set("ocorrencias", indexedByTesoes);
            }
        });

        if (global.Ocorrencias && typeof global.Ocorrencias === "object")
            global.Ocorrencias.reset(global.storage.get("ocorrencias"));
        else
            global.Ocorrencias = new local.ocorrencias(global.storage.get("ocorrencias"));

        new global.subviews.checklist({
            "el": global.$("#checklistItens"),
            "collection": global.Ocorrencias,
            "model": new Backbone.Collection(global.collection.itens),
            "tesao": global.tesao
        });

        return this;
    },
    carregarLocais: function (event)
    {
        try
        {
            var _this = event.currentTarget, strict = {}, globals = this;

            if (event.data.length === 0) throw "vazio";

            strict.fragmento = '<option value="0">Selecionar...</option>';

            event.data.get('collection').each(function (localidade) {
                strict.fragmento += '<option value="' + localidade.get('codigo_subdistrito') + '">' + localidade.get('nome_distrito') + (localidade.get('nome_subdistrito') ? ' &#8212; ' + localidade.get('nome_subdistrito') : '') + '</option>';
            });

            _this.html(strict.fragmento);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            event.preventDefault();
        }
    },
    $id: function (id)
    {
        return document.getElementById(id);
    },
    Output: function (foto)
    {
        var variaveis = {};

        variaveis.photo = Backbone.View.extend(this.subviews["operacoes_foto"]);
        variaveis.item = new variaveis.photo({model: foto});
        variaveis.fragmento = document.createDocumentFragment();
        // variaveis.item.delegateEvents();
        variaveis.fragmento.appendChild(variaveis.item.render().el);

        this.$("#fotos").append(variaveis.fragmento);
    },
    FileDragHover: function (event)
    {
        event.stopPropagation();
        event.preventDefault();
    },
    ParseFile: function (file, blob)
    {
        var _this = this;
        if (file.get('type').indexOf("image") == 0) {
            var reader = new FileReader();
            reader.onload = function(e) {
                file.set('base64', e.target.result);
                _this.Output(file);
            }
            reader.readAsDataURL(blob);
        }
        if (file.get ('type').indexOf ("text") == 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // Output ("<p><strong>" + file.name + ":</strong></p><pre>" + e.target.result.replace (/</g, "&lt;").replace (/>/g, "&gt;") + "</pre>");
            }
            reader.readAsText(blob);
        }
    },
  UploadFile: function uploadFile(event, file, blob) {
    try {
      var
        _this = this,
        $currentTarget = this.$(event.currentTarget),
        uploadFormData = new FormData();

      uploadFormData.append("foto", blob);

      return _this.collection.fotos.create(null, {
        "timeout": 60000,
        "wait": true,
        "processData": false,
        "contentType": false,
        "data": uploadFormData,
        "complete": function (jqXHR, textStatus) {
          var response = jqXHR.responseJSON;

          $currentTarget.closest("form").find("[class^=warning-]").empty();

          if (response.error) {
            for (var n in response.errors) {
              $currentTarget.closest("form").
              find("[class^=warning-]").
              append(
                '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                response.errors[n] +
                '</div>'
              );
            }
          }
          else {
            if (response.collection[0]) {
              file.set({"id": response.collection[0].model.arquivo, "operacao": _this.collection.id});
            }
          }
          _this.ParseFile(file, blob);
        }
      });
    }
    catch (error) {
      console.error(error);
    }
  },
  FileSelectHandler: function fileSelectHandler(event, _this) {
    var files = event.target.files || event.dataTransfer.files;
    for (var i = 0, f; f = files[i]; i++) {
      // if (f && f.type && f.type.search (/\bimage\//i) === -1) continue;
      model = new Backbone.Model(f);
      _this.UploadFile(event, model, f);
    }
    return _this.FileDragHover(event);
  },
  // initialize
  Init: function (_this) {
    var
      fileselect = _this.$id("fileselect"),
      filedrag = _this.$id("filedrag"),
      submitbutton = _this.$id("submitbutton");

    fileselect.addEventListener("change", function (event) {
      _this.FileSelectHandler(event, _this);
    },
    false);

    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // file drop
      // filedrag.addEventListener("dragover", _this.FileDragHover, false);
      // filedrag.addEventListener("dragleave", _this.FileDragHover, false);
      // filedrag.addEventListener("drop", _this.FileSelectHandler, false);
      filedrag.style.display = "block";
      // remove submit button
      submitbutton.style.display = "none";
    }
  }
}