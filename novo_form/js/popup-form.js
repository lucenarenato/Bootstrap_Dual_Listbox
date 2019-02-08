document.addEventListener("touchstart", function() {}, false);
(function($) {
    "use strict";
    $(function() {
        var randNumber_1 = parseInt(Math.ceil(Math.random() * 15), 10);
        var randNumber_2 = parseInt(Math.ceil(Math.random() * 15), 10);
        humanCheckCaptcha(randNumber_1, randNumber_2);
    });

    function humanCheckCaptcha(randNumber_1, randNumber_2) {
        $("#humanCheckCaptchaBox").html("Solve The Math ");
        $("#firstDigit").html('<input name="mathfirstnum" id="mathfirstnum" class="form-control" type="text" value="' + randNumber_1 + '" readonly>');
        $("#secondDigit").html('<input name="mathsecondnum" id="mathsecondnum" class="form-control" type="text" value="' + randNumber_2 + '" readonly>');
    }
       
    $("#quoteForm").validator().on("submit", function(event) {
		var parametros =$(this).serialize();
        if (event.isDefaultPrevented()) {
            formError();
            submitQuoteFormActionMSG(false, "Por favor completa el formulario correctamente!");
        } else {
            event.preventDefault();
            var fname = $("#fname7").val();
            var email = $("#email7").val();
            var phone = $("#phone7").val();
            var service = $("#service").val();
            var probudget = $("#probudget").val();
            var priority = $('input[name=priority]:checked').val();
            var message = $("#message7").val();
            var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
            if (filter.test(phone)) {
                var validphone = 1;
            } else {
                var validphone = 0;
            }
            if (validphone > 0) {
                event.preventDefault();
                $.ajax({
                    type: "POST",
                    url: "form-process.php",
                    data: parametros,
                    success: function(text) {
                        if (text == "success") {
                            quoteFormSuccess();
                        } else {
                            formError();
                            submitQuoteFormActionMSG(false, text);
                        }
                    }
                });
            } else {
                submitQuoteFormActionMSG(false, "Ingresa un número de teléfono válido!!!");
                return false;
            }
        }
    });

    function submitQuoteFormActionMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgQuoteSubmit").removeClass().addClass(msgClasses).text(msg);
        return false;
    }

    function quoteFormSuccess() {
        submitQuoteFormActionMSG(true, "¡Tu solicitud de cotización ha sida enviado con éxito!");
    }
   

  

   

    function formError() {
        $(".help-block.with-errors").removeClass('hidden');
    }
})(jQuery);