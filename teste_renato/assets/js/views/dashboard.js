{
    "tagName": "div",
    "id": "adagio-home",
    "className": "adagio-dashboard",
    "events": {},
    "template": _.template(`
<div class="container-fluid">
<div class="row">
    <div class="col-lg-12">
        <div class="panel panel-white" style="margin-bottom: 0;">
            <div class="panel-heading">
                <h3 class="panel-title">&Uacute;ltimos 12 meses dispon&iacute;veis se houver</h3>
                <div class="panel-tools">
                    <a class="tools-action" href="#" data-toggle="collapse"><i class="pe-7s-angle-up"></i></a>
                    <a class="tools-action" href="#" data-toggle="dispose"><i class="pe-7s-close"></i></a>
                </div>
            </div>
            <div class="panel-body p-10">
                <div style="padding: 0px; position: relative;" class="h-150" id="chart3"><canvas height="150" width="417" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 417px; height: 150px;" class="flot-base"></canvas><canvas height="150" width="417" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 417px; height: 150px;" class="flot-overlay"></canvas></div>
                <div class="row bg-muted border-bottom-1 border-muted m-0 m-t-5">
                    <div class="col-lg-6 p-0">
                        <div class="p-10 p-l-15 p-r-15">
                            <span class="b-400 f-13 text-muted v-a-middle">TOTAL DE PLACAS &Uacute;NICAS</span>
                            <i class="pe-7s-car p-5 f-20 text-primary v-a-middle"></i>
                            <span class="b-400 f-15 v-a-middle"><%= adagio.get('placas') %></span>
                        </div>
                    </div>
                    <div class="col-lg-6 p-0">
                        <div class="p-10 p-l-15 p-r-15 pull-right">
                            <span class="b-400 f-13 text-muted v-a-middle">&nbsp;</span>
                            <i class="pe-7s-next-2 p-5 f-20 text-muted v-a-middle"></i>
                            <span class="b-400 f-15 v-a-middle">&nbsp;</span>
                        </div>
                    </div>
                </div>
                <div class="row align-center m-t-10">
                    <div class="col-lg-4">
                        <div class="widget m-0 m-t-15 p-15">
                            <div>
                                <div class="col"><i class="pe-7s-global text-danger f-35"></i></div>
                                <div class="col f-25"><span id="data_reprovacao">0</span>%</div>
                            </div>
                            <div class="f-15 p-5">Reprovação total</div>
                        </div>
                    </div>
                    <div class="col-lg-4 border-left-1 border-muted">
                        <div class="widget m-0 m-t-15 p-15">
                            <div>
                                <div class="col"><i class="pe-7s-refresh-2 text-primary f-35"></i></div>
                                <div class="col f-25"><span id="data_situacao">0</span>%</div>
                            </div>
                            <div class="f-15 p-5">Reprovação atual</div>
                        </div>
                    </div>
                    <div class="col-lg-4 border-left-1 border-muted">
                        <div class="widget m-0 m-t-15 p-15">
                            <div>
                                <div class="col"><i class="pe-7s-check text-info f-35"></i></div>
                                <div class="col f-25" id="data_viagens">0</div>
                            </div>
                            <div class="f-15 p-5">Viagens feitas</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="table-responsive" style="width: 100%;">
    <table class="table table-hover table-bordered">
        <thead class="flip-content">
            <tr>
                <th>Per&iacute;odo</th>
                <th>Opera&ccedil;&atilde;o</th>
                <th colspan="2">Total</th>
                <th colspan="2">Aprova&ccedil;&atilde;o</th>
                <th colspan="2">Corre&ccedil;&atilde;o</th>
                <th colspan="2">Reprova&ccedil;&atilde;o</th>
            </tr>
        </thead>
        <tbody id="tableness"></tbody>
    </table>
</div>
</div>
    `, {"variable": 'adagio'}),
    "initialize": function () {
        try {
            this.
                getScript("/sumea/chartist.js", "js").
                getScript("/sumea/chartist.css", "css").
                getScript("/assets/js/jquery.flot.min.js", "js").
                getScript("/assets/js/jquery.flot.tooltip.min.js", "js").
                getScript("/assets/js/jquery.flot.resize.min.js", "js").
                load("web").
                release();
        }
        catch (error) {
            console.error(error);
        }
    },
    "infoness": function () {
        this.model.set("mesAtual", this.model.get('periodo').first().get('ano_mes'));
        this.model.set("totalViagens",
        _.chain(this.model.get('periodo').models).
            map(function(item){ return item.attributes; }).
            reduce(function(score,increment){ return score+increment.total; }, 0).
            value()
        );

        this.model.set("percentualReprovacao",
            (
                (
                _.chain(this.model.get('periodo').models).
                map(function (item){ return item.attributes; }).
                where({status: 1}).
                reduce(function (score,increment){ return score+increment.total; }, 0).
                value() +
                _.chain(this.model.get('periodo').models).
                map(function (item){ return item.attributes; }).
                where({status: 3}).
                reduce(function (score,increment){ return score+increment.total; }, 0).
                value()
                ) /
                this.model.get("totalViagens") *
                100
            ).toFixed(2)
        );

        this.model.set("indiceReprovacao",
            (
                (
                _.chain(this.model.get('periodo').models).
                map(function(item){ return item.attributes; }).
                where({status: 1, ano_mes: this.model.get("mesAtual")}).
                reduce(function(score,increment){ return score+increment.total; }, 0).
                value() +
                _.chain(this.model.get('periodo').models).
                map(function(item){ return item.attributes; }).
                where({status: 3, ano_mes: this.model.get("mesAtual")}).
                reduce(function(score,increment){ return score+increment.total; }, 0).
                value()
                ) /
                _.chain(this.model.get('periodo').models).
                map(function(item){ return item.attributes; }).
                where({ano_mes: this.model.get("mesAtual")}).
                reduce(function(score,increment){ return score+increment.total; }, 0).
                value() *
                100
            ).toFixed(2)
        );

        this.$("#data_situacao").text(this.model.get("indiceReprovacao"));
        this.$("#data_reprovacao").text(this.model.get("percentualReprovacao"));
        this.$("#data_viagens").text(this.model.get("totalViagens"));
    },
    "tableness": function ()
    {
        var porMes= _.groupBy(this.model.get('periodo').models, function(item){ return item.get('ano_mes'); }),
            xMeses= _(porMes).keys().length;

        var reprovacoes = [],
            correcoes = [],
            aprovacoes = [],
            ofensas = [];

        for (var progressive in porMes) {
            var vA = _.chain(porMes[progressive]).
                map(function(item){ return item.attributes; }).
                where({status: 1}).
                reduce(function(score,increment){ return score+increment.total; }, 0).
                value();
            var xA = [parseFloat(progressive.replace("-", ".")), vA];
            var vB = _.chain(porMes[progressive]).
                map(function(item){ return item.attributes; }).
                where({status: 3}).
                reduce(function(score,increment){ return score+increment.total; }, 0).
                value();
            var xB = [parseFloat(progressive.replace("-", ".")), vB];
            reprovacoes.push(xA);
            correcoes.push(xB);
            ofensas.push([parseFloat(progressive.replace("-", ".")), vA+vB]);
            aprovacoes.push(
                [parseFloat(progressive.replace("-", ".")),
                _.chain(porMes[progressive]).
                    map(function(item){ return item.attributes; }).
                    where({status: 5}).
                    reduce(function(score,increment){ return score+increment.total; }, 0).
                    value()
                ]
            );
        }

        for (var mes in porMes) {
            var porTipo= _.groupBy(porMes[mes], function(item){ return item.get('tipo'); }),
                tipos= porTipo.length,
                totais= _.chain(porMes[mes]).
                    map(function(item){ return item.attributes; }).
                    reduce(function(score,increment){ return score+increment.total; }, 0).
                    value();

            for (var tipo in porTipo) {
                var porLinha= _.chain(porTipo[tipo]).
                map(function(item){ return item.attributes; }).
                value();

                var total= _.chain(porLinha).
                reduce(function(score,increment){ return score+increment.total; }, 0).
                value();

                var aprovados= _.chain(porLinha).
                where({status: 5}).
                reduce(function(score,increment){ return score+increment.total; }, 0).
                value();

                var corrigidos= _.chain(porLinha).
                where({status: 3}).
                reduce(function(score,increment){ return score+increment.total; }, 0).
                value();

                var reprovados= _.chain(porLinha).
                where({status: 1}).
                reduce(function(score,increment){ return score+increment.total; }, 0).
                value();

            this.$("#tableness").append("<tr>"+
                "<td>"+porLinha[0].ano_mes+"</td>"+
                "<td>"+porLinha[0].tipo+"</td>"+
                "<td>"+total+"</td>"+
                "<td>"+(total/totais*100).toFixed(2)+"%</td>"+
                "<td>"+aprovados+"</td>"+
                "<td>"+(aprovados/total*100).toFixed(2)+"%</td>"+
                "<td>"+corrigidos+"</td>"+
                "<td>"+(corrigidos/total*100).toFixed(2)+"%</td>"+
                "<td>"+reprovados+"</td>"+
                "<td>"+(reprovados/total*100).toFixed(2)+"%</td>"+
                "</tr>");
            }
        }
        this.model.set("mensalOfensa", ofensas);
        this.model.set("mensalReprovacao", reprovacoes);
        this.model.set("mensalCorrecao", correcoes);
        this.model.set("mensalAprovacao", aprovacoes);
    },
    "render": function ()
    {
        try {
            this.$el.html(this.template(this.model)).attr("class", this.className);
            this.tableness();
            this.infoness();

            var data1 = [
                {
                    label: "Rep+Cor",
                    data: this.model.get("mensalOfensa"),
                    color: '#27292c'
                },
                {
                    label: "Reprovados",
                    data: this.model.get("mensalReprovacao"),
                    color: '#cd4237'
                },
                {
                    label: "Corrigidos",
                    data: this.model.get("mensalCorrecao"),
                    color: '#FFC107'
                },
                {
                    label: "Aprovados",
                    data: this.model.get("mensalAprovacao"),
                    color: '#1dbc9c'
                }
            ];

            $.plot(this.$("#chart3"), data1, {
                series: {
                    stack: true,
                    lines: {
                        lineWidth: 1,
                        show: true,
                        fill: false,
                        fillColor: {
                            colors: [{opacity: 0}, {opacity: 0}]
                        },
                        steps: false,
                    },
                    curvedLines: {
                        apply: true,
                        active: true,
                        monotonicFit: true
                    },
                    shadowSize: 0
                },
                yaxis: {
                    tickLength: 0,
                    tickFormatter: function(val, axis) {
                        return "";
                    }
                },
                xaxis: {
                    tickLength: 0,
                    tickFormatter: function(val, axis) {
                        return "";
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: false,
                    borderWidth: 0,
                    aboveData: false
                },
                legend: {
                    noColumns: 3,
                    container: this.$("#chart3-legend")
                },
                tooltip: true,
                tooltipOpts: {
                    defaultTheme: false,
                    content: "<span>%s</span> em %x.2: <b>%y.2</b>"
                }
            });

        } catch (error) {
            console.error (error);
        }
        finally {
            return this;
        }
    }
}