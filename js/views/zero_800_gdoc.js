{
    "tagName": "div",
    "id": "adagio-home",
    "className": "adagio-zero800-gdoc",
    // "template": 'Aqui',
    "initialize": function () {
        try{
            this.load("web").release();
        }
        catch (error) {
            console.error(error);
        }
    },
    "render": function(){
        this.$el.html('<iframe style="width:100%; height:100%; position: absolute !important;" src="https://goo.gl/forms/y8z0pASpCKeBKGCv2"></iframe>');
        return this;
    },
}