{
    tagName: "div",
    id: "adagio-home",
    className: "adagio-relatorios-resumo",
    events: {
        "submit": "updating"
    },
    updating: function(event)
    {
        event.preventDefault();
        event.stopPropagation();

        var $dom = this.$(event.target),
            vars = {};
            vars.id = $dom.find("input[name=operacao]").val();

        $.ajax ({
            url: "/interfaces/operacoes/" + vars.id,
            method: "patch",
            data: $dom.serialize(),
            dataType: "json",
        }).done(function(response)
        {
            $dom.parents("tr").hide();
        });

        return false;
    },
    template: _.template (`
<style>
.ct-label {
    color: inherit !important;
    font-size: 16px !important;
}
.ct-series-a .ct-bar {
    stroke: #e25759;
}
.ct-series-b .ct-bar {
    stroke: #2d7caa;
}
</style>
<div class="container-fluid">
<div class="row">
    <div class="col-sm-12">
        <h1 class="page-header margin-top-none">Leading Indicators <small>Inspeções</small></h1>
    </div>
</div>
<div class="row">
    <div class="col-lg-4">
        <div class="widget">
            <i class="pe-7s-bottom-arrow widget-stat bottom right f-20 text-danger"></i>
            <div class="row">
                <div class="col h-100 w-100 p-15 align-center bg-danger">
                    <span id="pieVolume" class="ep-chart" data-percent="0" data-toggle="easypiechart" data-barcolor="#fff" data-linewidth="3" data-size="70" data-lossless="yes"><span class="percent"></span></span>
                </div>
                <div class="col w-m-100 h-100 p-15">
                    <div class=""><strong class="f-15 text-danger">Volume</strong></div>
                    <div class="f-12 pieDesc">de inspe&ccedil;&otilde;es</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="widget">
            <i class="pe-7s-bottom-arrow widget-stat bottom right f-20 text-danger"></i>
            <div class="row">
                <div class="col h-100 w-100 p-15 align-center bg-danger">
                    <span id="pieReprovacao" class="ep-chart" data-percent="0" data-toggle="easypiechart" data-barcolor="#fff" data-linewidth="3" data-size="70" data-lossless="no"><span class="percent"></span></span>
                </div>
                <div class="col w-m-100 h-100 p-15">
                    <div class=""><strong class="f-15 text-danger">Reprova&ccedil;&atilde;o</strong></div>
                    <div class="f-12 pieDesc">de inspe&ccedil;&otilde;es</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="widget">
            <i class="pe-7s-bottom-arrow widget-stat bottom right f-20 text-danger"></i>
            <div class="row">
                <div class="col h-100 w-100 p-15 align-center bg-danger">
                    <span id="pieNcs" class="ep-chart" data-percent="0" data-toggle="easypiechart" data-barcolor="#fff" data-linewidth="3" data-size="70" data-lossless="no"><span class="percent"></span></span>
                </div>
                <div class="col w-m-100 h-100 p-15">
                    <div class=""><strong class="f-15 text-danger">Inconformidades</strong></div>
                    <div class="f-12 pieDesc">de inspe&ccedil;&otilde;es</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
<div class="page-header"><h4 class="header-text">Plantas de <%= adagio.get('inicio_mes_anterior') %> para <%= adagio.get('fim_mes_anterior') %></h4></div>
<div class="widget p-15" id="porPlantasAntigas">
<div class="row m-t-5"><div class="col-xs-2 f-13">Plantas</div><div class="col-xs-2 f-13">%</div>
<div class="col-xs-5 p-7"></div>
<div class="col-xs-1">A</div>
<div class="col-xs-1">R</div>
<div class="col-xs-1">T</div></div>
    </div>
</div>
        <div class="col-lg-6">
<div class="page-header"><h4 class="header-text">Plantas de <%= adagio.get('data_inicio') %> para <%= adagio.get('data_fim') %></h4></div>
<div class="widget p-15 bg-default" id="porPlantas">
<div class="row m-t-5"><div class="col-xs-2 f-13">Plantas</div><div class="col-xs-2 f-13">%</div>
<div class="col-xs-5 p-7"></div>
<div class="col-xs-1">A</div>
<div class="col-xs-1">R</div>
<div class="col-xs-1">T</div></div>
        </div></div>
        </div>

<div class="row">
    <div class="col-lg-6">
        <div class="page-header">
            <h4 class="header-text">Neg&oacute;cios de <%= adagio.get('inicio_mes_anterior') %> para <%= adagio.get('fim_mes_anterior') %></h4>
        </div>
        <div class="widget p-15" id="porTransportadorasAntigas">
            <div class="row m-t-5">
                <div class="col-xs-2 f-13">Neg&oacute;cios</div>
                <div class="col-xs-2 f-13">%</div>
                <div class="col-xs-5 p-7">&nbsp;</div>
                <div class="col-xs-1">A</div>
                <div class="col-xs-1">R</div>
                <div class="col-xs-1">T</div>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <div class="page-header">
            <h4 class="header-text">Neg&oacute;cios de <%= adagio.get('data_inicio') %> para <%= adagio.get('data_fim') %></h4>
        </div>
        <div class="widget p-15 bg-default" id="porTransportadoras">
            <div class="row m-t-5">
                <div class="col-xs-2 f-13">Neg&oacute;cios</div>
                <div class="col-xs-2 f-13">%</div>
                <div class="col-xs-5 p-7">&nbsp;</div>
                <div class="col-xs-1">A</div>
                <div class="col-xs-1">R</div>
                <div class="col-xs-1">T</div>
            </div>
        </div>
    </div>
</div>

<div class="row">
<div class="col-lg-12">
<div class="page-header">
    <h4 class="header-text">Mapeamento geral de <%= adagio.get ('data_inicio') %> para <%= adagio.get ('data_fim') %></h4>
</div>
<ul class="nav nav-tabs nav-justified" id="myTab5">
    <li class="active"><a data-toggle="tab" href="#tipo1" aria-expanded="true"><span>T1</span></a></li>
    <li class=""><a data-toggle="tab" href="#tipo2" aria-expanded="false"><span>T2</span></a></li>
    <li class=""><a data-toggle="tab" href="#tipon" aria-expanded="false"><span>Todos</span></a></li>
</ul>
<div class="tab-content">
    <div id="tipo1" class="tab-pane p-0 active">
        <div class="table-responsive" style="width: 100%;">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Transportadora</th>
                <th scope="col">Total</th>
                <th scope="col">N/C</th>
    <% adagio.get('regioes').each (function (regiao) { %>
        <th scope="col"><%= regiao.get ('apelido') %></th>
    <% }); %>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th scope="row">TOTAIS</th>
                    <td><strong><%= adagio.get('operacoes').reduce (function (memo, item){ return memo + (item.get('tipo')===1? item.get('totais'): 0); }, 0) %></strong></td>
                    <td><strong><%= adagio.get('operacoes').reduce (function (memo, item){ return memo + (item.get('tipo')===1? item.get('reprovados'): 0); }, 0) %></strong></td>
            <% adagio.get('regioes').each (function (regiao) { %>
            <% var aggregation = adagio.get('operacoes').where ({regiao_leiteira: regiao.get ('id'), tipo: 1}) %>
                <td><%= aggregation.reduce (function (memo, item){ return memo + item.get ('totais'); }, 0) %></td>
            <% }, this); %>
                </tr>
            </tfoot>
            <tbody>
    <% adagio.get('transportadoras').each (function (transportadora) { %>
    <% var grupo = adagio.get('operacoes').where ({grupo: transportadora.get ('transportadora'), tipo: 1}) %>
        <tr>
            <th scope="row"><%= transportadora.get ('nome_transportadora') %></th>
            <td><strong><%= grupo.reduce (function (memo, num) { if (num) return memo+num.get('totais'); else return memo + 0; }, 0) %></strong></td>
            <td><strong><%= grupo.reduce (function (memo, num) { if (num) return memo+num.get('reprovados'); else return memo + 0; }, 0) %></strong></td>
            <% adagio.get('regioes').each (function (regiao) { %>
            <% var aggregation = adagio.get('operacoes').where ({ regiao_leiteira: regiao.get ('id'), grupo: transportadora.get ('transportadora'), tipo: 1}) %>
                <td><%= aggregation.reduce (function (memo, item){ return memo + item.get ('totais'); }, 0) %></td>
            <% }, this); %>
        </tr>
    <% }, this); %>
            </tbody>
        </table>
        </div>
    </div>
    <div id="tipo2" class="tab-pane p-0">
        <div class="table-responsive" style="width: 100%;">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Transportadora</th>
                <th scope="col">Total</th>
                <th scope="col">N/C</th>
    <% adagio.get('regioes').each (function (regiao) { %>
        <th scope="col"><%= regiao.get ('apelido') %></th>
    <% }); %>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th scope="row">TOTAIS</th>
                    <td><strong><%= adagio.get('operacoes').reduce (function (memo, item){ return memo + (item.get('tipo')===2? item.get('totais'): 0); }, 0) %></strong></td>
                    <td><strong><%= adagio.get('operacoes').reduce (function (memo, item){ return memo + (item.get('tipo')===2? item.get('reprovados'): 0); }, 0) %></strong></td>
            <% adagio.get('regioes').each (function (regiao) { %>
            <% var aggregation = adagio.get('operacoes').where ({regiao_leiteira: regiao.get ('id'), tipo: 2}) %>
                <td><%= aggregation.reduce (function (memo, item){ return memo + item.get ('totais'); }, 0) %></td>
            <% }, this); %>
                </tr>
            </tfoot>
            <tbody>
    <% adagio.get('transportadoras').each (function (transportadora) { %>
    <% var grupo = adagio.get('operacoes').where ({grupo: transportadora.get ('transportadora'), tipo: 2}) %>
        <tr>
            <th scope="row"><%= transportadora.get ('nome_transportadora') %></th>
            <td><strong><%= grupo.reduce (function (memo, num) { if (num) return memo+num.get('totais'); else return memo + 0; }, 0) %></strong></td>
            <td><strong><%= grupo.reduce (function (memo, num) { if (num) return memo+num.get('reprovados'); else return memo + 0; }, 0) %></strong></td>
            <% adagio.get('regioes').each (function (regiao) { %>
            <% var aggregation = adagio.get('operacoes').where ({regiao_leiteira: regiao.get ('id'), grupo: transportadora.get ('transportadora'), tipo: 2}) %>
                <td><%= aggregation.reduce (function (memo, item){ return memo + item.get ('totais'); }, 0) %></td>
            <% }, this); %>
        </tr>
    <% }, this); %>
            </tbody>
        </table>
        </div>
    </div>
    <div id="tipon" class="tab-pane p-0">
        <div class="table-responsive" style="width: 100%;">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Transportadora</th>
                <th scope="col">Total</th>
                <th scope="col">N/C</th>
    <% adagio.get('regioes').each (function (regiao) { %>
        <th scope="col"><%= regiao.get ('apelido') %></th>
    <% }); %>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th scope="row">TOTAIS</th>
                    <td><strong><%= adagio.get('operacoes').reduce (function (memo, item){ return memo + item.get ('totais'); }, 0) %></strong></td>
                    <td><strong><%= adagio.get('operacoes').reduce (function (memo, item){ return memo + item.get ('reprovados'); }, 0) %></strong></td>
            <% adagio.get('regioes').each (function (regiao) { %>
            <% var aggregation = adagio.get('operacoes').where ({regiao_leiteira: regiao.get ('id')}) %>
                <td><%= aggregation.reduce (function (memo, item){ return memo + item.get ('totais'); }, 0) %></td>
            <% }, this); %>
                </tr>
            </tfoot>
            <tbody>
    <% adagio.get('transportadoras').each (function (transportadora) { %>
    <% var grupo = adagio.get('operacoes').where({grupo: transportadora.get ('transportadora')}) %>
        <tr>
            <th scope="row"><%= transportadora.get ('nome_transportadora') %></th>
            <td><strong><%= grupo.reduce (function (memo, num) { if (num) return memo+num.get('totais'); else return memo + 0; }, 0) %></strong></td>
            <td><strong><%= grupo.reduce (function (memo, num) { if (num) return memo+num.get('reprovados'); else return memo + 0; }, 0) %></strong></td>
            <% adagio.get('regioes').each (function (regiao) { %>
            <% var aggregation = adagio.get('operacoes').where ({regiao_leiteira: regiao.get('id'), grupo: transportadora.get('transportadora')}) %>
                <td><%= aggregation.reduce (function (memo, item){ return memo + item.get ('totais'); }, 0) %></td>
            <% }, this); %>
        </tr>
    <% }, this); %>
            </tbody>
        </table>
        </div>
    </div>
</div>
</div>
</div>
<hr>
<p class="lead">Itens de reprovação do checklist.</p>
<div class="panel panel-default">
    <div class="panel-heading">Ocorrências detectadas</div>
    <table class="table">
        <thead>
            <tr>
                <th>Detalhe</th>
                <th colspan="2">Atual</th>
                <th colspan="2">Anterior</th>
                <th><i class="fa fa-square text-danger margin-right-5"></i> <span class="margin-right-10">Proporção</span></th>
            </tr>
        </thead>
        <tbody id="inspecoesPorOcorrencia"></tbody>
    </table>
</div>

            </div><!-- /.col-md-12 -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
    `, {variable: 'adagio'}),
    initialize: function ()
    {
        try {
            this.
                getScript("/sumea/chartist.js", "js").
                getScript("/sumea/chartist.css", "css").
                getScript("/assets/js/jquery.flot.min.js", "js").
                getScript("/assets/js/jquery.flot.tooltip.min.js", "js").
                getScript("/assets/js/jquery.flot.resize.min.js", "js").
                getScript("/assets/js/jquery.easypiechart.min.js", "js").
                load("web").
                release();

        } catch (thrown) {
            console.error(thrown);

        }
        finally {
            //

        }
    },
    porPlantasAntigas: function ()
    {
        var linha,
            macro,
            plantas = _.chain(
            this.model.get('operacoes_antigas').reduce(function(cache, item) {
                var nome= item.get('apelido');
                    cache[nome]= cache[nome] || {"apelido": item.get('apelido'), "totais": 0, "reprovados": 0};

                cache[nome].nome= nome;
                cache[nome].totais+= item.get('totais');
                cache[nome].reprovados+= item.get('reprovados');

                return cache;
            },
            {})
        ).sortBy(function(item) {
            return item.totais;
        }).
        reverse().value ();

        macro = _(plantas).reduce(function(cache, item) {
            return cache+item.totais;
        }, 0);

        linha = _.template('<div class="row m-t-5"><div class="col-xs-2 f-13"><%= data.nome %></div><div class="col-xs-2 f-13">% <%= data.area %></div>'+
        '<div class="col-xs-5 p-7">'+
        '<div class="progress progress-xxs bg-default">'+
        '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="<%= data.p_aprovados %>" aria-valuemin="0" aria-valuemax="100" style="width:<%= data.p_aprovados %>%"></div>'+
        '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="<%= data.p_reprovados %>" aria-valuemin="0" aria-valuemax="100" style="width:<%= data.p_reprovados %>%"></div>'+
        '</div>'+
        '</div>'+
        '<div class="col-xs-1"><%= data.aprovados %></div>'+
        '<div class="col-xs-1"><%= data.reprovados %></div><div class="col-xs-1"><%= data.totais %></div></div>',
        {"variable": "data"});

        for (var planta in plantas) {
            var total= plantas[planta].totais,
                dado= {
                "nome": plantas[planta].nome,
                "area": (total/macro*100).toFixed(2),
                "reprovados": plantas[planta].reprovados,
                "p_reprovados": Number(Math.round((plantas[planta].reprovados/total*100)+'e3')+'e-3').toString(),
                "aprovados": (total-plantas[planta].reprovados),
                "p_aprovados": Number(Math.round(((total-plantas[planta].reprovados)/total*100)+'e3')+'e-3').toString(),
                "totais": total
                };
            this.$("#porPlantasAntigas").append(linha(dado));
        }

        return {
            total: macro
        }
    },
    porPlantas: function ()
    {
        var
        linha,
        plantas = _.chain(
            this.model.get('operacoes').reduce(function(cache, item) {
                var nome= item.get('apelido');
                    cache[nome]= cache[nome] || {"apelido": item.get('apelido'), "totais": 0, "reprovados": 0};

                cache[nome].nome= nome;
                cache[nome].totais+= item.get('totais');
                cache[nome].reprovados+= item.get('reprovados');

                return cache;
            },
            {})
        ).sortBy(function(item) {
            return item.totais;
        }).
        reverse().
        value(),
        plantasAntigas = this.model.get('operacoes_antigas').reduce(function(cache, item) {
            cache.reprovados = cache.reprovados+item.get('reprovados');
            cache.totais = cache.totais+item.get('totais');
            return cache;
        }, {reprovados: 0, totais: 0}),
        macro = _(plantas).reduce(function(cache, item) {
            return cache+item.totais;
        }, 0),
        contrario = _(plantas).reduce(function(cache, item) {
            return cache+item.reprovados;
        }, 0);

        linha = _.template('<div class="row m-t-5"><div class="col-xs-2 f-13"><%= data.nome %></div><div class="col-xs-2 f-13">% <%= data.area %></div>'+
        '<div class="col-xs-5 p-7">'+
        '<div class="progress progress-xxs bg-default">'+
        '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="<%= data.p_aprovados %>" aria-valuemin="0" aria-valuemax="100" style="width:<%= data.p_aprovados %>%"></div>'+
        '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="<%= data.p_reprovados %>" aria-valuemin="0" aria-valuemax="100" style="width:<%= data.p_reprovados %>%"></div>'+
        '</div>'+
        '</div>'+
        '<div class="col-xs-1"><%= data.aprovados %></div>'+
        '<div class="col-xs-1"><%= data.reprovados %></div><div class="col-xs-1"><%= data.totais %></div></div>',
        {"variable": "data"});

        for (var planta in plantas) {
            var total= plantas[planta].totais,
                dado= {
                "nome": plantas[planta].nome,
                "area": (total/macro*100).toFixed(2),
                "reprovados": plantas[planta].reprovados,
                "p_reprovados": Number(Math.round((plantas[planta].reprovados/total*100)+'e3')+'e-3').toString(),
                "aprovados": (total-plantas[planta].reprovados),
                "p_aprovados": Number(Math.round(((total-plantas[planta].reprovados)/total*100)+'e3')+'e-3').toString(),
                "totais": total
                };
            this.$("#porPlantas").append(linha(dado));
        }

        this.$("#pieVolume").data("percent", ((macro/plantasAntigas.totais)*100).toFixed(0).toString());
        this.$("#pieVolume").data("formula", [macro,'/',plantasAntigas.totais].join(''));
        this.$("#pieReprovacao").data("percent", ((contrario/plantasAntigas.reprovados)*100).toFixed(0).toString());
        this.$("#pieReprovacao").data("formula", [contrario,'/',plantasAntigas.reprovados].join(''));
    },
    porTransportadorasAntigas: function ()
    {
        var linha,
            macro,
            grupos= _.chain(
            this.model.get('operacoes_antigas').reduce(function(cache, item) {
                var nome= item.get('grupo');
                    cache[nome]= cache[nome] || {"apelido": item.get('grupo'), "totais": 0, "reprovados": 0};

                cache[nome].nome= nome;
                cache[nome].totais+= item.get('totais');
                cache[nome].reprovados+= item.get('reprovados');

                return cache;
            },
            {})
        ).sortBy(function(item) {
            return item.totais;
        }).
        reverse().value ();

        macro= _(grupos).reduce(function(cache, item) {
            return cache+item.totais;
        }, 0);

        linha = _.template('<div class="row m-t-5"><div class="col-xs-2 f-13"><%= data.nome %></div><div class="col-xs-2 f-13">% <%= data.area %></div>'+
        '<div class="col-xs-5 p-7">'+
        '<div class="progress progress-xxs bg-default">'+
        '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="<%= data.p_aprovados %>" aria-valuemin="0" aria-valuemax="100" style="width:<%= data.p_aprovados %>%"></div>'+
        '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="<%= data.p_reprovados %>" aria-valuemin="0" aria-valuemax="100" style="width:<%= data.p_reprovados %>%"></div>'+
        '</div>'+
        '</div>'+
        '<div class="col-xs-1"><%= data.aprovados %></div>'+
        '<div class="col-xs-1"><%= data.reprovados %></div><div class="col-xs-1"><%= data.totais %></div></div>',
        {"variable": "data"});

        for (var planta in grupos) {
            var total= grupos[planta].totais,
                dado= {
                "nome": this.model.get('transportadoras').findWhere({transportadora: grupos[planta].nome}).get('nome_transportadora').toString().substring(0,10),
                "area": (total/macro*100).toFixed(2),
                "reprovados": grupos[planta].reprovados,
                "p_reprovados": (grupos[planta].reprovados/total*100).toFixed(0),
                "aprovados": (total-grupos[planta].reprovados),
                "p_aprovados": ((total-grupos[planta].reprovados)/total*100).toFixed(0),
                "totais": total
                };
            this.$("#porTransportadorasAntigas").append(linha(dado));
        }
    },
    porTransportadoras: function ()
    {
        try {

        var linha,
            macro,
            grupos= _.chain(
            this.model.get('operacoes').reduce(function(cache, item) {
                var nome= item.get('grupo');
                    cache[nome]= cache[nome] || {"apelido": item.get('grupo'), "totais": 0, "reprovados": 0};

                cache[nome].nome= nome;
                cache[nome].totais+= item.get('totais');
                cache[nome].reprovados+= item.get('reprovados');

                return cache;
            },
            {})
        ).sortBy(function(item) {
            return item.totais;
        }).
        reverse().value ();

        macro= _(grupos).reduce(function(cache, item) {
            return cache+item.totais;
        }, 0);

        linha = _.template('<div class="row m-t-5"><div class="col-xs-2 f-13"><%= data.nome %></div><div class="col-xs-2 f-13">% <%= data.area %></div>'+
        '<div class="col-xs-5 p-7">'+
        '<div class="progress progress-xxs bg-default">'+
        '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="<%= data.p_aprovados %>" aria-valuemin="0" aria-valuemax="100" style="width:<%= data.p_aprovados %>%"></div>'+
        '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="<%= data.p_reprovados %>" aria-valuemin="0" aria-valuemax="100" style="width:<%= data.p_reprovados %>%"></div>'+
        '</div>'+
        '</div>'+
        '<div class="col-xs-1"><%= data.aprovados %></div>'+
        '<div class="col-xs-1"><%= data.reprovados %></div><div class="col-xs-1"><%= data.totais %></div></div>',
        {"variable": "data"});

        for (var planta in grupos) {
            var total= grupos[planta].totais,
                dado= {
                "nome": this.model.get('transportadoras').findWhere({transportadora: grupos[planta].nome}).get('nome_transportadora').toString().substring(0,10),
                "area": (total/macro*100).toFixed(2),
                "reprovados": grupos[planta].reprovados,
                "p_reprovados": Number(Math.round((grupos[planta].reprovados/total*100)+'e3')+'e-3').toString(),
                "aprovados": (total-grupos[planta].reprovados),
                "p_aprovados": Number(Math.round(((total-grupos[planta].reprovados)/total*100)+'e3')+'e-3').toString(),
                "totais": total
                };
            this.$("#porTransportadoras").append(linha(dado));
        }

        } catch (caughtException) {
            console.error(caughtException);

        }
    },
    getcolor: function(colorString)
    {
        var _default = '#27292c',
            primary = '#29c7ca',
            danger = '#cd4237',
            success = '#1dbc9c',
            warning = '#FFC107',
            info = '#34b5dc',
            inverse = '#55606e';

        switch(colorString) {
            case("default"):
                return _default;
            case("primary"):
                return primary;
            case("danger"):
                return danger;
            case("warning"):
                return warning;
            case("info"):
                return info;
            case("success"):
                return success;
            case("inverse"):
                return inverse;
            default:
                return colorString;
        }
    },
    pieChart: function()
    {
        try {
        var self = this,
            easypiecharts = this.$('.ep-chart'); // this.$('[data-toggle=easypiechart]');

        $.each(easypiecharts, function (key, item) {

            var barColor = self.getcolor(self.$(item).data('barcolor')) || '#29c7ca',
                trackColor = self.getcolor(self.$(item).data('trackcolor')) || false,
                scaleColor = self.getcolor(self.$(item).data('scalecolor')) || false,
                lineCap = self.$(item).data('linecap') || "round",
                lineWidth = self.$(item).data('linewidth') || 3,
                size = self.$(item).data('size') || 110,
                animate = self.$(item).data('animate') || false,
                lossless = self.$(item).data('lossless') || 'no',
                formula = self.$(item).data('formula') || '',
                percent,
                status,
                icon;

            self.$(this).easyPieChart({
                barColor: barColor,
                trackColor: trackColor,
                scaleColor: scaleColor,
                lineCap: lineCap,
                lineWidth: lineWidth,
                size: size,
                animate: animate
            });

            if (lossless==='yes') {
                percent = self.$(this).data('percent')-0;
                if (percent > 0) {
                    status = 'success';
                    icon = 'pe-7s-up-arrow';
                } else {
                    status = 'danger';
                    icon = 'pe-7s-bottom-arrow';
                }
            } else {
                percent = self.$(this).data('percent')-0;
                if (percent < 70) {
                    status = 'success';
                    icon = 'pe-7s-bottom-arrow';
                } else if (percent < 100) {
                    status = 'warning';
                    icon = 'pe-7s-bottom-arrow';
                } else {
                    status = 'danger';
                    icon = 'pe-7s-up-arrow';
                }
            }

            self.$(this).data('easyPieChart').update(percent);
            self.$(this).find('.percent').text(percent);
            self.$(this).find('.percent').css('line-height', size+'px');
            self.$(this).parent('div').attr("class", "col h-100 w-100 p-15 align-center bg-"+status);
            self.$(this).parent().parent().find('strong').attr("class", "f-15 text-"+status);
            self.$(this).parent().parent().parent().find('i').attr("class", icon+" widget-stat bottom right f-20 text-"+status);
            self.$(this).parent().parent().find('.pieDesc').append('<br>'+formula);

        });
        } catch(caughtException) {
            console.error(caughtException);
        }
    },
    render: function ()
    {
        try {

            this.$el.html(this.template(this.model)).attr("class", this.className);
            this.porPlantasAntigas();
            this.porPlantas();
            this.porTransportadorasAntigas();
            this.porTransportadoras();
            this.porOcorrencias();
            this.pieChart();

        } catch (caughtException) {

            console.error (caughtException);

        } finally {

            return this;

        }
    },
    porOcorrencias: function ()
    {
        var inspecoesPorOcorrencia= {};
            inspecoesPorOcorrencia.niveis= ['', 'text-info', 'text-orange', 'text-orange', 'text-danger'];
            inspecoesPorOcorrencia.tensoes= ['', 'Atenção', 'Irregular', 'Grave', 'Gravíssimo'];
            inspecoesPorOcorrencia.total= 0;
            inspecoesPorOcorrencia.saldo= this.model.get('ocorrencias').reduce (
                function(memo, num) { return memo + num.get('contador'); },
                0
            ),
            inspecoesPorOcorrencia.saldo= this.model.get('ocorrencias').reduce (
                function(memo, num) { return memo + num.get('contador'); },
                0
            );

        var porOcorrenciasAntigas = {};
            porOcorrenciasAntigas.saldo = this.model.get('ocorrencias_antigas').reduce(
                function(memo, num) { return memo + num.get('contador'); },
                0
            );

        this.$("#pieNcs").data("percent", ((inspecoesPorOcorrencia.saldo/porOcorrenciasAntigas.saldo)*100).toFixed(0).toString());
        this.$("#pieNcs").data("formula", [inspecoesPorOcorrencia.saldo,'/',porOcorrenciasAntigas.saldo].join(''));

var ocorrenciasId = _.union(
    this.model.get('ocorrencias').pluck('ocorrencia_id'),
    this.model.get('ocorrencias_antigas').pluck('ocorrencia_id')
);

var comunsId = _.intersection(
    this.model.get('ocorrencias').pluck('ocorrencia_id'),
    this.model.get('ocorrencias_antigas').pluck('ocorrencia_id')
);

var novosId = _.difference(
    this.model.get('ocorrencias').pluck('ocorrencia_id'),
    this.model.get('ocorrencias_antigas').pluck('ocorrencia_id')
);

var extintosId = _.difference(
    this.model.get('ocorrencias_antigas').pluck('ocorrencia_id'),
    this.model.get('ocorrencias').pluck('ocorrencia_id')
);

        this.model.get('ocorrencias').each(function (dado) {
            var ocorrencia = this.model.get('ocorrencias_antigas').findWhere({ocorrencia_id: dado.get('ocorrencia_id')}),
                sobre= ((dado.get('contador')/inspecoesPorOcorrencia.saldo)*100).toFixed(2).toString();

            if (ocorrencia === undefined) {
                taxa = '0.00';
                ocorrencia = {
                    attributes: {
                        contador: 0
                    }
                }
            } else {
                taxa = ((ocorrencia.get('contador')/porOcorrenciasAntigas.saldo)*100).toFixed(2).toString();
            }

            var totalidade = (
                (
                    (dado.get('contador')+ocorrencia.attributes.contador)
                    /(inspecoesPorOcorrencia.saldo+porOcorrenciasAntigas.saldo)
                )
                *100
            ).toFixed(2).toString();

            this.$('#inspecoesPorOcorrencia').append(`
            <tr class=`+(taxa==='0.00'?'warning':'')+`>
                <td>
                    <i class="fa fa-circle `+inspecoesPorOcorrencia.niveis[dado.get('nivel')]+` margin-right-5"></i>&nbsp;<strong>`+dado.get('ocorrencia')+`</strong>&nbsp;<small class="visible-lg-inline-block">`+inspecoesPorOcorrencia.tensoes[dado.get ('nivel')]+`</small>
                </td>
                <td>`+dado.get('contador')+`</td>
                <td>`+sobre+`%</td>
                <td>`+ocorrencia.attributes.contador+`</td>
                <td>`+taxa+`%</td>
                <td>
                    <div class="progress margin-bottom-none height-10">
                        <div class="progress-bar progress-bar-danger" style="width: `+totalidade+`%">
                        <span class="sr-only">`+totalidade+`%</span>
                        </div>
                    </div>
                </td>
            </tr>
            `);
        }, this);

        _(extintosId).each(function(item) {
            var ocorrencia = this.model.get('ocorrencias_antigas').findWhere({ocorrencia_id: item}).attributes,
                taxa = ((ocorrencia.contador/porOcorrenciasAntigas.saldo)*100).toFixed(2).toString(),
                totalidade = ((ocorrencia.contador/(inspecoesPorOcorrencia.saldo+porOcorrenciasAntigas.saldo))*100).toFixed(2).toString();

            this.$('#inspecoesPorOcorrencia').append(`
            <tr class="success">
                <td><i class="fa fa-circle `+inspecoesPorOcorrencia.niveis[ocorrencia.nivel]+` margin-right-5"></i>&nbsp;<strong>`+ocorrencia.ocorrencia+`</strong>&nbsp;<small>`+inspecoesPorOcorrencia.tensoes[ocorrencia.nivel]+`</small></td>
                <td>0</td>
                <td>0.00%</td>
                <td>`+ocorrencia.contador+`</td>
                <td>`+taxa+`%</td>
                <td>
                    <div class="progress margin-bottom-none height-10">
                        <div class="progress-bar progress-bar-danger" style="width: `+totalidade+`%">
                        <span class="sr-only">`+totalidade+`%</span>
                        </div>
                    </div>
                </td>
            </tr>
            `);

        }, this);

        this.$('#inspecoesPorOcorrencia').append(`<tr>
            <td><b>Totais</b></td>
            <td>`+inspecoesPorOcorrencia.saldo+`</td>
            <td>100.00%</td>
            <td>`+porOcorrenciasAntigas.saldo+`</td>
            <td>100.00%</td>
            <td>&nbsp;</td>
        </tr>`);

    },
    notification: handling.notification
}