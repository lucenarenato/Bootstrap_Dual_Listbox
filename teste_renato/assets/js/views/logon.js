{
	"tagName": "div",
	"id": 'adagio-user',
	"className": 'adagio-logon',
    "events" : {
        "submit #form-signin": function (event) {
            event.preventDefault();
            event.stopPropagation();

            var $dom = this.$(event.target),
                self = this;

            $.ajax({
                url: "/logon",
                method: "post",
                data: $dom.serialize(),
                dataType: "json"
            }).then(
            function(data, textStatus, jqXHR) {
                if (typeof data.access_token === "string" && data.access_token.length > 0) {
                    /*
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("profile_name", data.profile_name);
                    */
                    self.cookie.setItem("access_token", data.access_token);
                    self.cookie.setItem("profile_name", data.profile_name);
                    adagio.eventBus.trigger("navigate", "#", {"trigger": true});
                }
            },
            function(response, textStatus, errorThrown) {
                if (response.status === 500) {
                    //
                }
            });
        }
    },
	"template": _.template (`
    <div id="area_login" class="form-signin clearfix">
        <img src="/assets/images/klios_lil_white.png" style="float: left; padding: 0 20px 0 0;">
        <div class="title-login">Login</div>
        <small class="subtitle-login">Please enter your credentials to login.</small>
        <br><br><br>
        <% if(view.has('token') && view.get('isReset') === true) { %>
        <div class="alert alert-danger" role="alert">O <strong>token</strong> &eacute; inv&aacute;lido ou expirado.</div>
        <% } %>
        <form id="form-signin" action="/login" method="POST">
            <input type="text" name="usuario" class="form-control" placeholder="Usu&aacute;rio" required autofocus>
            <input type="password" name="senha" class="form-control" placeholder="Senha" required>
            <input type="submit" class="btn btn-lg btn-default btn-block" value="Autenticar" />
        </form>
    </div>
    <div id="area_others" style="background: #2f323b; color: #fff; padding: 50px 20px; margin-top: 20px;">
        <div class="title-login">Cadastro</div>
        <p>Se voc&ecirc; possui alguma credencial no <strong>ADAGIO</strong> pelo endere&ccedil;o de e-mail, mas n&atilde;o gerou senha ou precisa gerar uma nova senha.</p>
        <a href="#recovery" class="btn btn-lg btn-link btn-block">Cadastrar</a>
    </div>`,
    {"variable": "view"}),
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
            this.model.set("isReset", (location.hash.search(/reset/) === -1 ? false : true));
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