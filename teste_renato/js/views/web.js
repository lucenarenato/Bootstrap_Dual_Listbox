{
  "tagName": "div",
  "id": "adagio-layout",
  "className": "adagio-layout-board",
  "events": {
    "breadcrumbs:empty": function loadBreadcrumbs(event) {
      event.preventDefault();
      event.stopPropagation();
      if (this.$("ul.breadcrumb").length > 0) {
        this.$("ul.breadcrumb").empty();
      }
      return event;
    },
    "breadcrumbs:append": function loadBreadcrumbs(event, data) {
      event.preventDefault();
      event.stopPropagation();
      var $ul = this.$("ul.breadcrumb").empty();
      _.each(data, function (breadcrumb) {
          var
            li = breadcrumb.url === '' ? '<li class="active">' : '<li>',
            a = breadcrumb.url === '' ? '' : '<a href="#" data-href="' + breadcrumb.url + '">',
            _a = breadcrumb.url === '' ? '' : '</a>';
          this.append(li + a + '<i class="' + (breadcrumb.icon || 'pe-7s-browser') + '"></i> <span>' + breadcrumb.text + '</span>' + _a + '</li>');
        }, $ul
      );
      return event;
    },
    "click ul.breadcrumb a": function (event) {
        event.stopPropagation();
        event.preventDefault();
        this.route.set("uri", this.$(event.currentTarget).data("href"));
        return event;
    },
    "click a.links-logout": function doLogout(event) {
      try {
        event.stopPropagation();
        event.preventDefault();
        $.ajax({
          "url": "/logoff",
          "method": "head",
          "context": this
        })
        .always(function () {
          this.cookie.removeItem("access_token");
          sessionStorage.clear();
          adagio.eventBus.trigger("navigate", "#logon", {"trigger": true});
        });
      }
      catch (thrown) {
        console.error(thrown);
      }
    },
    "click a.a-album": function album(event) {
      try {
        event.stopPropagation();
        event.preventDefault();

        var
          data = {},
          $currentTarget = this.$(event.currentTarget).find("img").length === 1 ? this.$(event.currentTarget).find("img") : this.$(event.currentTarget);
        // Show metadatas disabled
        // if ($currentTarget.data("metadados")) { strict.collection = JSON.parse(atob($currentTarget.data("metadados"))); strict.model = _.first(strict.collection); }
        data.model = new Backbone.Model($currentTarget.data());
        this.__load("album", data);
      }
      catch (thrown) {
        console.error(thrown);
      }
    },
  },
  "template": _.template(`
<nav id="systemctl" class="navbar navbar-inverse navbar-fixed-top" style="z-index:1101;">
  <div class="container">
  <div class="navbar-header">
    <a class="navbar-brand" href="#">ADAGIO</a>
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#systemctl-collapse" aria-expanded="true">
    <span class="sr-only">Menu</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
    </button>
  </div>
  <div class="collapse navbar-collapse">
    <ul class="nav navbar-nav">
    <li><a href="#">RUMO SEGURO</a></li>
    <li class="active"><a href="#">ETC</a></li>
    </ul>
    <p class="navbar-text navbar-right">Logado como <a href="#" class="navbar-link">USER</a></p>
  </div>
  </div>
</nav>
<div class="sidebar menu collapse" id="systemctl-collapse">
  <div class="sidebar-menu">
    <ul class="menu"></ul>
  </div>
  <div class="sidebar-footer">
    <div class="footer-avatar">
      <img src="/images/forum-user.png" alt="Retrato" />
    </div>
    <div class="footer-user"><a href="#"><%= (this.cookie.getItem('profile_name') || 'Desconhecido') %></a></div>
    <div class="footer-links"><a href="#" class="links-logout"><i class="pe-7s-power"></i> <span>Log Off</span></a></div>
  </div>
</div>
    <!-- [4. Sidebar Form] -->
    <div class="sidebar form collapsed"></div>
    <!-- [5. Main Page Content] -->
    <div class="main-content">
      <div class="content-header">
        <ul class="breadcrumb"></ul>
        <ul class="header-actions">
          <li class="actions-stretch-menu" id="action-stretch-menu"><div class="icon"></div></li>
          <li id="action-settings"><a><i class="pe-7s-settings"></i></a></li>
          <li id="action-menu-collapse"><a><i class="pe-7s-menu"></i></a></li>
        </ul>
      </div>
      <!-- [5.3. Page Body] -->
      <div class="content-body body-full" style="padding-top:15px;">
      <div id="adagio-home"></div>
      </div>
      <div id="album" style="position:fixed;background-color:#edeff0;top:0;bottom:0;left:0;right:0;padding:0px;z-index:5000;overflow-y:auto;display:none;"></div>
  `,
  {"variable": "adagio"}),
  "initialize": function () {
    try {
      this.
        getScript("/assets/css/bootstrap.min.css", "css", "bootstrap").
        getScript("/assets/css/application.min.css", "css", "theme").
        getScript("/assets/css/theme.css", "css").
        getScript("/assets/css/font-awesome.min.css", "css").
        getScript("/assets/css/pe-icon-7-stroke.css", "css").
        getScript("/assets/css/bootstrap-datepicker3.min.css", "css").
        getScript("/assets/js/bootstrap-datepicker.min.js", "js").
        getScript("/assets/js/modernizr.js", "js").
        getScript("/assets/js/jquery.slimscroll.min.js", "js").
        getScript('/assets/js/notification.js', "js").
        release();
    }
    catch (error) {
      console.error(error);
    }
  },
  "menu": function () {
    return $.ajax({
      "url": [this.model.get("api_path"), 'pulse'].join("/"),
      "method": 'get',
      "dataType": 'json',
      "cache": true,
      "context": this
    }).
    done(this.loadMenu);
  },
  "render": function () {
    try {
      var
        renderChanged = this.$el.attr("class") !== this.className,
        menuChanged = true;
      if (renderChanged) {
        this.$el.html(this.template(this.model)).attr("class", this.className);
      }

      this.model.set("api_path", adagio.environment.getEndpoint());
      menuChanged = this.model.hasChanged("api_path");

      if (menuChanged === true) {
        this.menu().then(this.theme);
      }
      else if (renderChanged && menuChanged !== true) {
        this.menu().then(this.theme);
      }
      else {
        this.theme();
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      return this;
    }
  },
  "loadMenu": function loadMenu(data, textStatus, jqXHR) {
    var entity = this.generateLink((data.menu || []), "menu");
    this.$("ul.menu").empty().replaceWith(entity);
  },
  "generateLink": function generateLink(itens, className) {
    var link = className === undefined ? "<ul>" : "<ul class=" + className + ">",
      totalItens = itens.length;
    _(itens).each(function (item) {
      if (item.tipo === "hold") {
        link += "<li class='submenu-title'>";
      }
      else if (item.tipo === "avat") {
        link += '<li class="profile-picture">';
      }
      else if (item.tipo === "name") {
        link += '<li class="profile-name">';
      }
      else if (item.tipo === "titl") {
        link += '<li class="profile-title">';
      }
      else if (item.tipo === "divi") {
        link += '<li class="submenu-divider">';
      }
      else if (item.tipo === "buto") {
        link += '<li class="profile-follow">';
      }
      else if (item.tipo === "pres") {
        link += "<li class='submenu-title'>";
      }
      else if (item.tipo === "chek") {
        link += '<li style="padding-left:30px;color:#FFF;">';
      }
      else if (className === "menu" && totalItens === 1) {
        this.$('.sidebar.menu').removeClass('compact');
        link += "<li class='active open'>";
      }
      else if (className === "menu" && totalItens > 1) {
        this.$('.sidebar.menu').addClass('compact');
        link += "<li>";
      }
      else {
        link += "<li>";
      }
      if (item.tipo === "menu" && item.submenus && item.submenus.length > 0) {
        link += "<a><i class='"+item.icone+"'></i> <span>"+item.nome+"</span></a>";
      }
      else if (item.tipo === "avat") {
        link += '<a href="#"><img src="/assets/images/brands/' + item.nome + '.jpg" alt="Picture"></a>';
      }
      else if (item.tipo === "name") {
        link += '<a href="#"><span>' + item.nome + '</span></a>';
      }
      else if (item.tipo === "titl") {
        link += '<a href="#"><span>@' + item.nome.toLowerCase() + '</span></a>';
      }
      else if (item.tipo === "divi") {
        //
      }
      else if (item.tipo === "buto") {
        link += '<button class="btn btn-primary btn-block" onclick="location.href=\'' + item.destino + '\'">Acessar</button>';
      }
      else if (item.tipo === "hold") {
        link += "<span>"+item.nome+"</span>";
      }
      else if (item.tipo === "flag") {
        link += "<a href='"+item.destino+"'><span>"+item.nome+"</span><span class='"+item.icone+"'></span></a>";
      }
      else if (item.tipo === "pres") {
        link += '<span>'+item.nome+'</span></li><li><label class="p-l-30"><input class="'+item.icone+'" name="'+item.destino+'" checked="checked" type="checkbox"><span class="text"></span></label>';
      }
      else if (item.tipo === "chek") {
        link += '<label style="width:100%;font-size:1.15em;"><input type="checkbox" name="'+item.destino+'"> <span class="text">'+item.nome+'</span></label>';
      }
      else {
        link += "<a href='"+item.destino+"'><i class='"+item.icone+"'></i><span>"+item.nome+"</span></a>";
      }
      if (item.submenus && item.submenus.length > 0) {
        link += this.generateLink (item.submenus);
      }
      link += "</li>";
    }, this);
    link += "</ul>";
    return link;
  },
  "theme": function () {
var yima = function (self) {
  /*
  var _default = '#27292c';
  var primary = '#29c7ca';
  var danger = '#cd4237';
  var success = '#1dbc9c';
  var warning = '#FFC107';
  var info = '#34b5dc';
  var inverse = '#55606e';
  'default': '#29c7ca',
  'light-green': '#5bd2b8',
  'green': '#2cc491',
  'dark-green': '#00828c',
  'light-blue': '#26c1ff',
  'blue': '#0c9fd6',
  'velvet': '#8c5dad',
  'pink': '#e076ed',
  'red': '#ff5b57',
  'orange': '#f86e49',
  'light-orange': '#f07f7f',
  'yellow': '#ffd967'
  */

  var touchScrollSpeed = 80;

  function toggleFormSidebar(formName) {
    if ($('.sidebar.form').hasClass('collapsed'))
      $('.sidebar.form').removeClass('collapsed');
    else if ($('.sidebar.form').data('form') == formName)
      $('.sidebar.form').addClass('collapsed');

    $('.sidebar.form').data('form', formName);
  }
  return {
    init: function () {
      // Settings Form (Header Action)
      self.$('#action-settings a').off('click').on('click', function () {
        self.$(".sidebar.form").load("settings.html");
        toggleFormSidebar('Settings');
        self.$('#action-stretch-menu').removeClass('open');
      });
      //------------------------------------------------------------------
      //[Panel Dispose]
      //--
      $('.panel-tools .tools-action[data-toggle="dispose"]').on("click", function(event) {
        //Variables
        var disposeInterval = 300;

        event.preventDefault();

        //Get The Panel
        var panel = $(this).parents(".panel").eq(0);

        //Dispose Panel
        panel.hide(disposeInterval, function() {
          panel.remove();
        });
      });

      //------------------------------------------------------------------
      //[Panel Collpase]
      //--
      $('.panel-tools .tools-action[data-toggle="collapse"]').on("click", function(event) {
        //Variables
        var slideDownInterval = 300;
        var slideUpInterval = 200;
        var downIcon = "pe-7s-angle-down";
        var upIcon = "pe-7s-angle-up";


        event.preventDefault();

        //Get The Panel
        var panel = $(this).parents(".panel").eq(0);
        var body = panel.find(".panel-body");
        var icon = $(this).find("i");

        //Expand Panel
        if (panel.hasClass("collapsed")) {
          if (icon) {
            icon.addClass(upIcon).removeClass(downIcon);
          }
          panel.removeClass("collapsed");
          body.slideUp(0, function() {
            body.slideDown(slideDownInterval);
          });
          //Collpase Panel
        } else {
          if (icon) {
            icon.addClass(downIcon)
              .removeClass(upIcon);
          }
          body.slideUp(slideUpInterval, function() {
            panel.addClass("collapsed");
          });
        }
      });

      //------------------------------------------------------------------
      //[Panel Maximize]
      //--
      $('.panel-tools .tools-action[data-toggle="maximize"]').on("click", function(event) {
        event.preventDefault();

        //Get The Panel
        var panel = $(this).parents(".panel").eq(0);
        var icon = $(this).find("i").eq(0);
        var compressIcon = "pe-7s-power";
        var expandIcon = "pe-7s-expand1";

        //Minimize Panel
        if (panel.hasClass("maximized")) {
          if (icon) {
            icon.addClass(expandIcon).removeClass(compressIcon);
          }
          panel.removeClass("maximized");
          panel.find(".panel-body").css("height", "auto");

          //Maximize Panel
        } else {
          if (icon) {
            icon.addClass(compressIcon).removeClass(expandIcon);
          }
          panel.addClass("maximized");
          var windowHeight = $(window).height();
          var headerHeight = panel.find(".panel-heading").height();
          panel.find(".panel-body").height(windowHeight - headerHeight);
        }
      });

      //------------------------------------------------------------------
      //[Header Actions]
      //--
      self.$('#action-stretch-menu').off('click').on('click', function (e) {
        self.$('#action-stretch-menu').toggleClass('open');
      });

      //------------------------------------------------------------------
      //[Tooltip Init]
      //--
      /*
      $("[data-toggle=tooltip]").tooltip({
        html: true
      });
      */
    },
sidebarInit: function () {
  var slimScrolling = function () {
    var section = {
      "window": {},
      "header": {},
      "body": {}
    };

    section.body.height = document.documentElement.clientHeight;
    section.body.width = document.documentElement.clientWidth;
    section.header.height = function () {
      return self.$(".content-header").outerHeight() +
      (self.$(".content-nav").is(":visible") ?
        self.$(".content-nav").outerHeight() :
        0
      );
    };

    if (section.body.width < 601) {
      /*
      self.$('.open').each(function(position, item) {
        self.$(item).removeClass('open');
      });
      self.$('.compact-open').each(function(position, item) {
        self.$(item).removeClass('compact-open');
      });
      */
    }
    else if (section.body.width < 992) {
      if (self.$('.open').length === 0 && self.$('.compact-open').length === 0) {
        // self.$('.sidebar.menu').addClass('collapse');
      }
      // Useless self.$(".content-nav").hide();
      self.$('.open').each(function (position, item) {
        self.$(item).removeClass('open');
        self.$(item).addClass('compact-open');
      });
    }
    else if (section.body.width < 1051) {
      // Useless self.$('.sidebar.menu').removeClass('collapse');
      // Useless self.$(".content-nav").hide();
      self.$('.open').each(function (position, item) {
        self.$(item).removeClass('open');
        self.$(item).addClass('compact-open');
      });
    }
    else {
      // Useless self.$('.sidebar.menu').attr('class', 'sidebar menu compact');
      // Useless self.$('.sidebar.menu').removeClass('collapsed');
      // Useless self.$(".content-nav").hide();
      self.$('.compact-open').each(function (position, item) {
        self.$(item).removeClass('compact-open');
        self.$(item).addClass('open');
      });
    }

    var hasSmallerDevice = section.body.width > 767 ? false : true,
      hasCollapsed = self.$('.sidebar.menu').attr('aria-expanded') === "false" || self.$('.sidebar.menu').attr('aria-expanded') === undefined ? true : false,
      hasLeftMargin = self.$('.main-content').css('margin-left') === '0px' ? false : true;

    if (hasLeftMargin) {
      self.$('.sidebar.menu').
        attr('class', 'sidebar menu compact collapse in').
        removeAttr('style');
      self.$('.sidebar.menu').removeAttr('style');
      self.$('.sidebar.menu .sidebar-footer').removeAttr('style');
      self.$('.sidebar.menu .sidebar-menu .menu>li>ul').removeAttr('style');
    }
    else {
      self.$('.sidebar.menu').
        attr('class', 'sidebar menu collapse in').
        removeAttr('style');
      self.$('.sidebar.menu').css('width', section.body.width);
      self.$('.sidebar.menu .sidebar-footer').css('width', section.body.width);
      self.$('.sidebar.menu .sidebar-menu .menu>li>ul').css('width', section.body.width-95);
    }

    if (Modernizr.mq('(min-width: 768px)')) {
      self.$("#systemctl").hide();
      self.$(".sidebar").css("padding-top", "0px");
      self.$(".content-header").show();
      $("body").css("padding-top", "0px");
    }
    else {
      self.$("#systemctl").show();
      self.$(".sidebar").css("padding-top", "51px");
      self.$(".content-header").hide();
      $("body").css("padding-top", "51px");
    }

    if (self.$('.sidebar-menu .menu').parent('.slimScrollDiv').length > 0) {
      self.$('.sidebar-menu .menu').parent().replaceWith(self.$('.sidebar-menu .menu'));
    }

    self.$('.sidebar-menu .menu').slimscroll({
      "touchScrollStep": touchScrollSpeed,
      "height": (section.body.height - (self.$('#systemctl').is(":visible") ? self.$('#systemctl').outerHeight() : 0) - self.$('.sidebar-footer').outerHeight()),
      "position": 'left',
      "size": '4px',
      "color": '#29c7ca'
    });
  }
  slimScrolling();
  $(window).off('resize').on('resize', _.debounce(slimScrolling, 500));

//------------------------------------------------------------------
//[Sidebar Menu Click Handle]
//--
self.$('ul.menu > li > ul > li > a').off('click').on('click', _.debounce(function (event) {
  event.preventDefault();
  event.stopPropagation();
  var
    $currentTarget = self.$(this),
    variables = {};
  $currentTarget.parents("ul").children("li").removeClass("active");
  if ($currentTarget.attr("href") !== undefined) {
    variables.extra = $currentTarget.closest("ul").find("input").serialize();
    variables.appending = $currentTarget.attr("href").indexOf('?') === -1 ? (variables.extra.length === 0 ? '' : '?') : (variables.extra.length === 0 ? '' : '&');
    $currentTarget.parent("li").addClass('active');
    location.href = $currentTarget.attr("href")+variables.appending+variables.extra;
  }
  return false;
}, 500, true));

self.$('ul.menu > li > a').off('click').on('click', _.debounce(function (event) {
  event.preventDefault();
  event.stopPropagation();
  var
    $currentTarget = self.$(this),
    variables = {};
  if (!$currentTarget.is('li')) {
    $currentTarget = $currentTarget.parent('li');
  }
  variables.isOpen = $currentTarget.hasClass("open") ?
    true :
    ($currentTarget.hasClass("compact-open") ? true : false);
  if ($currentTarget.find("a").attr("href") !== undefined && !$currentTarget.hasClass('active')) {
    window.location.href = $currentTarget.find("a").attr("href");
    $currentTarget.closest(".sidebar-menu").find("li.active").removeClass("active");
    $currentTarget.addClass('active');
    // return;
  }

  /* if (($('.sidebar.menu').hasClass ('compact') || Modernizr.mq ('(max-width: 1050px)')) && !$('.sidebar.menu').hasClass ('over')) { target.toggleClass ('compact-open'); return; } */

  self.$('.sidebar.menu').removeClass('collapsed');
  self.$('.sidebar.menu').removeClass('over compact');
  self.$('.sidebar-menu .menu > li').removeClass('open');
  self.$('.sidebar-menu .menu > li').removeClass('compact-open');

  if ($currentTarget.find("ul").length === 0) {
    if (Modernizr.mq('(max-width: 600px)'))
      // Actually it is deprecated by now on.
      self.$('.sidebar.menu').addClass('over compact');
    else
      // It has no hierarchy, so it should be compacted.
      self.$('.sidebar.menu').addClass('compact');

    $currentTarget.addClass('open');
  }
  else {
    if (variables.isOpen === true && Modernizr.mq('(min-width: 600px) and (max-width: 1050px)')) {
      // Pop it down whenever it is simple screen
      $currentTarget.removeClass('compact-open');
    }
    else if (variables.isOpen === false && Modernizr.mq('(min-width: 600px) and (max-width: 1050px)')) {
      // Pop it up whenever it is simple screen
      $currentTarget.addClass('compact-open');
    }
    else if (variables.isOpen) {
      // Collapse it in whenever it is full screen
      self.$('.sidebar.menu').addClass('compact');
    }
    else {
      // Fill it out whenever it is full screen
      $currentTarget.addClass('open');
    }
  }

  return false;
}, 100, true));

//------------------------------------------------------------------
//[Sidebar Menu Collapse (Header Action)]
//--
self.$('#action-menu-collapse a').off('click').on('click', _.debounce(function () {
  if (Modernizr.mq('(max-width: 600px)')) {
    // $('.sidebar.menu').toggleClass('over');
    if (self.$('.content-nav').is(":hidden"))
      self.$(".content-nav").show();
  }
  else {
    self.$('.sidebar.menu').toggleClass('collapsed');

    if (self.$('.sidebar.menu').hasClass('collapsed'))
      self.$(".content-nav").show();
    else
      self.$(".content-nav").hide();
  }

  self.$('#action-stretch-menu').removeClass('open');

  var header = $(window).height() -
    self.$(".content-header").outerHeight(true) -
    (self.$(".content-nav").is(":visible") ? self.$(".content-nav").outerHeight(true) : 0);

  self.$(".content-body").css('min-height', header);
}, 500, true));
    },

    //------------------------------------------------------------------
    //[Sidebar Form (Header Action)]
    //--
    toggleFormSidebar: toggleFormSidebar
  };
}(this);
    yima.init();
    yima.sidebarInit();
  }
}