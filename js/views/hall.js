{
  "tagName": "div",
  "id": "adagio-home",
  "className": "adagio-hall",
  "template": _.template('', {"variable": "view"}),
  "initialize": function initialize() {
    try {
      this.load("web").release();
    }
    catch (error) {
      console.error(error);
    }
  },
  "render": function render() {
    try {
      this.$el.html(this.template(this.model)).attr("class", this.className);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      return this;
    }
  }
}