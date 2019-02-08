{
	"tagName": "div",
	"id": 'adagio-user',
	"className": 'adagio-reuse',
    "events" : {
        "submit #form-signin": function (event) {
            event.preventDefault();
            event.stopPropagation();

            var $dom = this.$(event.target);

            $.ajax({
                "url": "/logon",
                "method": "post",
                "data": $dom.serialize(),
                "dataType": "json"
            }).then(
            function(data, textStatus, jqXHR) {
                if (typeof data.access_token === "string" && data.access_token.length > 0) {
                    localStorage.setItem("access_token", data.access_token);
                    adagio.eventBus.trigger("navigate", "", {"trigger": true});
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
    <style>
    .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    }
    .form-signin .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }
    .form-signin .form-control:focus {
    z-index: 2;
    }
    .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    }
    .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    }
    .profile-img {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    }
.colorgraph {
height: 5px;
border-top: 0;
background: #c4e17f;
border-radius: 5px;
background-image: -webkit-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
background-image: -moz-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
background-image: -o-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
background-image: linear-gradient(to right, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
}
    </style>
    <hr class="colorgraph" style="margin: 0;">
<br><br><br><br>
<img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="">
<form id="form-signin" class="form-signin" action="/login" method="POST">
    <input type="email" name="usuario" class="form-control" placeholder="Usu&aacute;rio" required autofocus>
    <input type="password" name="senha" class="form-control" placeholder="Senha" required>
    <input type="submit" class="btn btn-lg btn-default btn-block" value="Autenticar" />
</form>
<hr>
<form class="form-signin" action="" method="">
    <p>Para voc&ecirc; que possui algum v&iacute;nculo com o <strong>ADAGIO</strong> diretamente ou atrav&eacute;s dos nossos clientes, mas desconhece a sua senha:</p>
    <input type="submit" class="btn btn-lg btn-info btn-block" value="Cadastrar" />
</form>
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
		}
		catch (thrown) {
			console.error(thrown);
		}
		finally {
			return this;
		}
	}
}
