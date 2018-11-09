{
  "tagName": "div",
  "id": "adagio-user",
  "className": "adagio-reset",
  "events": {
    "submit #form-reset": "reset",
  },
  "reset": function (event) {
    event.preventDefault();
    event.stopPropagation();
    var
      $dom = this.$(event.target),
      self = this;
    $.ajax({
      url: "/password/reset",
      method: "post",
      data: $dom.serialize(),
      dataType: "json"
    }).
    then(function (data, textStatus, jqXHR) {
      adagio.eventBus.trigger("navigate", "#logon", {"trigger": true});
    }, function (response, textStatus, errorThrown) {
      if (response.status === 201) {
        adagio.eventBus.trigger("navigate", "#logon", {"trigger": true});
      }
      else {
        alert("Um erro ocorreu. Certifique-se de que a senha contenha pelo menos quatro caracteres de letras e números.");
      }
    });
  },
  "template": _.template(`
<div id="area_login" class="form-signin clearfix">
  <img src="/assets/images/klios_lil_white.png" style="float: left; padding: 0 20px 0 0;">
  <div class="title-login">Nova senha</div>
  <small class="subtitle-login">Please enter your new password.</small>
  <br><br><br>
  <form id="form-reset">
    <input type="hidden" name="token" value="<%= view.get('token') %>">
    <div class="form-group"><input type="email" class="form-control" name="email" placeholder="E-mail" value="<%= view.get('email') %>" readonly="readonly"></div>
    <div class="form-group"><input type="password" class="form-control" name="password" placeholder="Senha"></div>
    <div class="form-group"><input type="password" class="form-control" name="password_confirmation" placeholder="Repetir senha"></div>
    <div class="form-group"><input type="submit" class="btn btn-lg btn-default btn-block" value="Salvar" /></div>
  </form>
</div>
<div id="area_others" style="background: #2f323b; color: #fff; padding: 50px 20px; margin-top: 20px;">
    <div class="title-login">Desistiu?</div>
    <p>Pode cancelar o procedimento em tempo. Basta retornar para a tela de logon inicial. Deseja fazer isso?</p>
    <a href="#logon" class="btn btn-lg btn-link btn-block">Logon</a>
</div>
  `, {"variable": "view"}),
  "initialize": function () {
    try {
      this.load("userground").release();
    }
    catch (error) {
      console.error(error);
    }
  },
  "render": function () {
    try {
      this.$el.html(this.template(this.model)).attr("class", this.className);
      var
        remainingHeight = $(window).height() - this.$("#area_others").outerHeight(),
        overHeight = this.$("#area_login").outerHeight() - this.$("#area_login").height() - 10;
      this.$("#area_login").css("min-height", (remainingHeight - overHeight));
    }
    catch (error) {
      console.error(error);
    }
    finally {
      return this;
    }
  }
}