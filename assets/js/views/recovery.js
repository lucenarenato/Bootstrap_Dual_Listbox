{
  "tagName": "div",
  "id": 'adagio-user',
  "className": 'adagio-recovery',
  "events" : {
    "submit #form-recovery": function (event) {
      event.preventDefault();
      event.stopPropagation();
      var $dom = this.$(event.target);
      $.ajax({
        "url": "/password/email",
        "method": "post",
        "data": $dom.serialize()
      }).
      then(function(data, textStatus, jqXHR) {
        adagio.eventBus.trigger("navigate", "#logon", {"trigger": true});
      }, function(response, textStatus, errorThrown) {
        alert(textStatus);
      });
    }
  },
  "template": _.template(`
<div id="area_login" class="form-signin clearfix">
<img src="/assets/images/klios_lil_white.png" style="float: left; padding: 0 20px 0 0;">
<div class="title-login">Recupera&ccedil;&atilde;o</div>
<small class="subtitle-login">Inserir e-mail para gerar senha.</small>
<br><br><br>
<form id="form-recovery">
  <div class="form-group"><input type="email" name="email" class="form-control" placeholder="E-mail de usu&aacute;rio" required></div>
  <div class="form-group"><input type="submit" class="btn btn-lg btn-default btn-block" value="Enviar" /></div>
</form>
</div>
<div id="area_others" style="background: #2f323b; color: #fff; padding: 50px 20px; margin-top: 20px;">
  <div class="title-login">Desistiu?</div>
  <p>Pode cancelar o procedimento em tempo. Basta retornar para a tela de logon inicial. Deseja fazer isso?</p>
  <a href="#logon" class="btn btn-lg btn-link btn-block">Logon</a>
</div>
  `, {variable: 'adagio'}),
  "initialize": function () {
    try {
      this.load("userground").release();
    }
        catch (thrown) {
      console.error(thrown);
    }
  },
  "render": function (e) {
    try {
      if (this.$el.attr("class") === undefined) {
        this.$el.html(this.template(this.model)).attr("class", this.className);
      }
      else if (this.$el.attr("class") !== this.className) {
        this.$el.html(this.template(this.model)).attr("class", this.className);
      }
      else {
        //
      }
      var
        remainingHeight = $(window).height() - this.$("#area_others").outerHeight(),
        overHeight = this.$("#area_login").outerHeight() - this.$("#area_login").height() - 10;
      this.$("#area_login").css("min-height", (remainingHeight - overHeight));
    }
    catch (thrown) {
      console.error(thrown);
    }
    finally {
      return this;
    }
  }
}