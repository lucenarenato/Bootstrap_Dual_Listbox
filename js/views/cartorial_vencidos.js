{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-cartorial-vencidos",
  "template": _.template(`
    <div class="container-fluid">
      <style>
        #enviar_por_email{border:none; background-color: #edeff0;}
        #enviar_por_email:hover{text-decoration: underline;}
      </style>
      <table class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th>Transportadora</th>
            <th>CPF/Placa</th>
            <th>Motorista/Ve&iacute;culo</th>
            <th>Documento</th>
            <th>Vencimento</th>
          </tr>
        </thead>

        <tbody>
          <% if (this.collection.qtdados == 0) { %>
            <tr>
              <td colspan="5" align="center">Nenhum documento</td>
            </tr>
          <% } %>

          <% for (var i = 0; i < this.collection.qtdados; i++) { %>
            <tr>
              <td><% print(this.collection.dados[i].nome.toUpperCase()); %></td>
              <td><%= this.collection.dados[i].pasta_id === 1 ? this.collection.dados[i].cpf_condutor : (this.collection.dados[i].pasta_id === 2 ? this.collection.dados[i].placa_veiculo : this.collection.dados[i].apelido) %></td>
              <td><%= this.collection.dados[i].modelo_veiculo || this.collection.dados[i].nome_condutor.toString().split(" ").shift() %></td>
              <td><a href="#!<%= window.adagio.environment.getTenancy("cartorial/"+this.collection.dados[i].id_cartorial_dado) %>"><%= this.collection.dados[i].titulo %></a></td>
              <td><%= (new Date(this.collection.dados[i].vencimento)).toISOString().slice(0,10).split("-").reverse().join("/") %></td>
            </tr>
          <% } %>
        </tbody>
      </table>
  </div>`),
	"initialize": function () {
		try {
			this.load("web").release();
		}
		catch (thrown) {
			console.error(thrown);
		}
		finally {
			//
		}
	},
  render: function () {
    this.$el.html(this.template()).attr("class", this.className);
  }
}