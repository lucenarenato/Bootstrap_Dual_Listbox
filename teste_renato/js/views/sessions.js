{
	"tagName": "div",
	"id": "adagio-home",
	"className": "adagio-sessions",
	"events": {
		"submit": "logIn"
	},
	"logIn": function(event)
	{
        event.preventDefault();
        event.stopPropagation();

		var $dom = this.$(event.target);

		$.ajax({
			"url": "/interfaces/sessions/login",
			"method": "post",
			"data": $dom.serialize(),
			"dataType": "json"
		}).then(function(data, textStatus, jqXHR) {
			// Redirect
			routing.navigate(data.uri, {"trigger": true});
		},
		function(response, textStatus, errorThrown) {

			if (response.status === 500) {
				// Reasign
			}
			else if (response.responseJSON && response.responseJSON.error) {

				$dom.find(".help-block").remove();
				_.each(response.responseJSON.errors, function(value, key) {

					$dom.find("[name="+key+"]").closest(".form-group").attr("class", "form-group has-error");
					_.each(value, function(error) {

					   $dom.find("[name="+key+"]").after('<span class="help-block">'+error+'</span>');

                    });
				});
			}
			else {
				//
			}

		});

		return false;
	},
	template: _.template (`
<div class="login animated">
	<form>
		<div class="membership-title">Possui uma conta?</div>
		<div class="membership-input">
			<input type="text" class="form-control" id="inputEmail3" name="documento" placeholder="E-mail">
			<input type="hidden" name="autenticidade">
		</div>
		<div class="membership-input">
			<input type="password" class="form-control" id="inputPassword3" name="password" placeholder="Senha">
		</div>
		<div class="row">
			<div class="col-lg-6">
				<div class="membership-input">
					<div class="checkbox">
						<label>
							<input type="checkbox">
							<span class="text">Lembrar</span>
						</label>
					</div>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="membership-forgot pull-right">
					<a href="#!/password/email">Esqueceu a senha?</a>
				</div>
			</div>
		</div>

		<div class="membership-submit">
			<input type="submit" class="btn btn-primary btn-lg btn-block" value="ENTRAR">
		</div>

		<div class="membership-signup">
			<div class="signup-title">Primeiro acesso?</div>
			<a href="#!/password/email">OBTENHA UMA SENHA DE ACESSO</a>
		</div>
	</form>
</div>
	`, {variable: 'adagio'}),
	"initialize": function (e)
	{
		try {
			this.load("entrance").release();

		} catch (thrown) {
			console.error(thrown);

		} finally {
            //

		}
	},
	"render": function ()
	{
		try {
			if (this.$el.attr("class") === undefined) {
                this.$el.html(this.template()).attr("class", this.className);

            } else if (this.$el.attr("class") !== this.className) {
                this.$el.html(this.template()).attr("class", this.className);

            } else {
                this.$el.html(this.template()).attr("class", this.className);

			}

		} catch (thrown) {
            console.error(thrown);

		} finally {
			return this;

		}
	}
}