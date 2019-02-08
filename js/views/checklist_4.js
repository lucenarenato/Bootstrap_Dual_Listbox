{
  "tagName": "div",
  "id": "checklist-form",
  "className": "checklist-form-t2",
  "template": _.template(`
<fieldset>
    <div class="form-group">
        <label for="inputTransportadora" class="col-sm-3 control-label">Frota</label>
        <div class="col-sm-3">
        <select name="grupo_id" class="form-control" id="inputTransportadora">
            <option value="0">Selecionar...</option>
            <% view.get('gruposKit').each (function (frota) { %>
            <option value="<%= frota.get('id') %>"><%= frota.get('nome').toString().toUpperCase() %></option>
            <% }); %>
        </select>
        </div>
        <label for="inputOutroGrupo" class="col-sm-3 control-label">Região Leiteira</label>
        <div class="col-sm-3">
            <select name="outro_grupo_id" class="form-control" id="inputOutroGrupo">
            <option value="0">Selecionar...</option>
            <% view.get('regioesKit').each (function (frota) { %>
            <option value="<%= frota.get('id') %>"><%= frota.get('nome').toString().toUpperCase() %></option>
            <% }); %>
            </select>
        </div>
    </div>
</fieldset>
                <fieldset><div class="form-group">
                    <label for="inputVinculo" class="col-sm-3 control-label">Vínculo</label>
                    <div class="col-sm-3"><select name="dados[vinculo]" class="form-control" id="inputVinculo">
                    <% _(["Selecionar...", "Frota", "Agregado", "CIF"]).each (function (vinculo, i) { %><option <% print (i==view.attributes.vinculo?"selected":"") %> value="<%= i %>"><%= vinculo %></option>
                    <% }); %>
                    </select>
                    </div>
                    <label class="col-sm-3 control-label">Data
                    </label>
                    <div class="col-sm-3">
                        <div class="input-group date"><input name="data" class="form-control" type="text" placeholder="YYYY-MM-DD" value="<%=view.attributes.data%>" readonly><span class="input-group-addon"><i class="fa fa-fw fa-calendar"></i></span></div>
                    </div>
                </div></fieldset>
                <fieldset><div class="form-group">
                    <label for="nome_motorista" class="col-sm-3 control-label">Motorista</label>
                    <div class="col-sm-3"><input id="nome_motorista" name="dados[nome_motorista]" class="form-control" type="text" value="<%=view.attributes.nome_motorista%>"></div>
                    <label for="cpf_motorista" class="col-sm-3 control-label">CPF</label>
                    <div class="col-sm-3"><input id="dados[cpf_motorista]" name="dados[cpf_motorista]" class="form-control" type="text" value="<%=view.attributes.cpf_motorista%>"></div>
                </div></fieldset>
                <fieldset class="if-cnpj"><div class="form-group">
                    <label class="col-sm-3 control-label">Razão Social
                    </label>
                    <div class="col-sm-3"><input name="dados[razao_motorista]" class="form-control" type="text" value="<%= view.attributes.razao_motorista %>">
                    </div>
                    <label class="col-sm-3 control-label">CNPJ
                    </label>
                    <div class="col-sm-3"><input name="dados[cnpj_motorista]" class="form-control" type="text" value="<%= view.attributes.cnpj_motorista %>">
                    </div>
                </div></fieldset>
<fieldset>
    <div class="form-group">
        <label for="selectConfiguracao" class="col-sm-3 control-label">Configuração</label>
        <div class="col-sm-3">
            <select class="form-control" name="dados[configuracao]" id="selectConfiguracao">
            <% _(["Selecionar...", "Caminhão", "Caminhão e Reboque", "Bitrem", "Vanderléia", "Rodotrem", "Reboque", "Semirreboque"]).each (function (vinculo, i) { %>
                <option <%= (i === parseInt(view.attributes.configuracao) ? "selected" : "") %> value="<%= i %>"><%= vinculo %></option>
            <% }); %>
            </select>
        </div>
    </div>
</fieldset>
                <% var autocategorias = new Backbone.Collection([{"id":5,"autocategoria":"CAMINHÃO SIMPLES"},{"id":11,"autocategoria":"CAMINHÃO TRUCK"},{"id":12,"autocategoria":"CAMINHÃO DIRECIONAL"},{"id":6,"autocategoria":"CAMINHÃO TRATOR"},{"id":8,"autocategoria":"SEMIRREBOQUE"},{"id":9,"autocategoria":"SEMIRREBOQUE LS"},{"id":10,"autocategoria":"REBOQUE"}]); %>
                <% var _this = this; _.each (view.get('placas'), function (placa, i) { %>
                <fieldset><div class="form-group">
                    <label for="placas[<%= i %>]" class="col-sm-3 control-label">Placa</label>
                    <div class="col-sm-3"><input class="form-control" type="text" id="placas[<%= i %>]" name="placas[<%= i %>]" value="<%= placa.placa %>"><p class="help-block">Placa Veículo</p></div>
                    <div class="col-sm-3"><input class="form-control" type="text" name="numeros[<%= i %>]" value="<%= placa.pivot.numero %>"><p class="help-block">Número Frota</p></div>
                    <div class="col-sm-3">
                        <select class="form-control autocategorias" name="categorias[<%= i %>]">
                            <option value="0">Selecionar...</option>
                            <% autocategorias.each(function (vinculo) { %>
                            <option <%= (placa.pivot.autocategoria_id && vinculo.get('id') === parseInt(placa.pivot.autocategoria_id) ? "selected" : "") %> value="<%= vinculo.get('id') %>"><%= vinculo.get('autocategoria') %></option>
                            <% }); %>
                        </select>
                        <p class="help-block">Categoria Veículo</p>
                    </div>
                </div></fieldset>
                <% }); %>
                <fieldset>
                    <div class="form-group"><div class="col-sm-3 col-sm-offset-9"><a href="#" class="btn btn-default btn-sm" id="incluirPlaca"><i class="fa fa-fw fa-plus"></i> Incluir placa</a></div></div>
                </fieldset>

<div class="form-group">
    <label for="origem_uf" class="col-sm-3 control-label">Origem</label>
    <div class="col-sm-3">
        <select name="dados[origem_uf]" class="form-control ufs" id="origem_uf">
            <option value="0">Selecionar...</option>
            <% view.get('subdistritosCol').each(function (subdistrito, i) { %>
            <option <%= (subdistrito.get('uf') === parseInt(view.attributes.origem_uf) ? "selected" : "") %> value="<%= subdistrito.get('uf') %>"><%= subdistrito.get('nome_uf') %></option>
            <% }); %>
        </select>
    </div>
    <label for="origem_id" class="col-sm-3 control-label">Localidade</label>
    <div class="col-sm-3">
        <select name="dados[origem_id]" class="form-control" id="origem_id">
            <option value="0">Selecionar...</option>
            <% if (view.get('subdistritosCol.' + view.attributes.origem_uf)) { %>
            <% view.get('subdistritosCol.'+view.attributes.origem_uf).each(function (subdistrito, i) { %>
            <option <%= (subdistrito.get('codigo_subdistrito') === view.attributes.origem_id ? "selected" : "") %> value="<%= subdistrito.get('codigo_subdistrito') %>"><%= subdistrito.get('nome_distrito') %><%= (subdistrito.get('nome_subdistrito') ? ' &#8212; ' + subdistrito.get('nome_subdistrito') : '') %></option>
            <% }); } %>
        </select>
    </div>
</div>

<div class="form-group">
    <label for="destino_uf" class="col-sm-3 control-label">Destino</label>
    <div class="col-sm-3">
        <select name="dados[destino_uf]" class="form-control ufs" id="destino_uf">
            <option value="0">Selecionar...</option>
            <% view.get('subdistritosCol').each(function (subdistrito, i) { %>
            <option <%= (subdistrito.get('uf') === parseInt(view.attributes.destino_uf) ? "selected" : "") %> value="<%= subdistrito.get('uf') %>"><%= subdistrito.get('nome_uf') %></option>
            <% }); %>
        </select>
    </div>
    <label for="destino_id" class="col-sm-3 control-label">Localidade</label>
    <div class="col-sm-3">
        <select name="dados[destino_id]" class="form-control" id="destino_id">
            <option value="0">Selecionar...</option>
            <% if (view.get('subdistritosCol.' + view.attributes.destino_uf)){ %>
            <% view.get('subdistritosCol.' + view.attributes.destino_uf).each(function (subdistrito, i) { %>
            <option <%= (subdistrito.get('codigo_subdistrito') === view.attributes.destino_id ? "selected" : "") %> value="<%= subdistrito.get('codigo_subdistrito') %>"><%= subdistrito.get('nome_distrito') %><%= (subdistrito.get('nome_subdistrito') ? ' &#8212; ' + subdistrito.get('nome_subdistrito') : '') %></option>
            <% }); } %>
        </select>
    </div>
</div>

<div class="form-group">
    <label for="posicao" class="col-sm-3 control-label">Posição atual</label>
    <div class="col-sm-3">
        <select name="dados[posicao]" class="form-control" id="posicao">
        <% _(["Selecionar...", "Origem", "Destino"]).each (function (vinculo, i) { %>
        <option <%= (i === parseInt (view.attributes.posicao) ? "selected" : "") %> value="<%= i %>"><%= vinculo %></option>
        <% }); %>
        </select>
    </div>
</div>`,
  {"variable": "view"}),
  "initialize": function ()
  {
    try {
      this.release();
    }
    catch (error) {
      console.error(error);
    }
  },
  "render": function ()
  {
    this.$el.html(this.template(this.model)).attr("class", this.className);

    return this;
  },
}