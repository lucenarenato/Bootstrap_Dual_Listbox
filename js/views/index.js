{
	"tagName": "div",
	"id": 'adagio-user',
	"className": 'adagio-index',
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
                    routing.navigate("", {"trigger": true});
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
    </style>
<br><br>
<div class="text-center"><img src="/images/adagio_1.png" /></div>
<br><br>
<form id="form-signin" class="form-signin" action="/login" method="POST">
    <input type="submit" class="btn btn-lg btn-default btn-block" value="FEDERAL ST" />
    <input type="submit" class="btn btn-lg btn-default btn-block" value="RUMO SEGURO" />
    <input type="submit" class="btn btn-lg btn-default btn-block" value="SERRA VERDE" />
</form>
<hr>
<form class="form-signin" action="" method="">
    <input type="submit" class="btn btn-sm btn-danger btn-block" value="SAIR" />
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