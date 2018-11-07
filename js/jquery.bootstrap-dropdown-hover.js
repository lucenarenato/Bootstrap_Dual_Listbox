(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else if(typeof module==='object'&&module.exports){module.exports=function(root,jQuery){if(jQuery===undefined){if(typeof window!=='undefined'){jQuery=require('jquery');}
else{jQuery=require('jquery')(root);}}
factory(jQuery);return jQuery;};}else{factory(jQuery);}}(function($){var pluginName='bootstrapDropdownHover',defaults={clickBehavior:'sticky',hideTimeout:200},_hideTimeoutHandler,_hardOpened=false,_isTouchDevice=false;function BootstrapDropdownHover(element,options){this.element=$(element);this.settings=$.extend({},defaults,options,this.element.data());this._defaults=defaults;this._name=pluginName;this.init();}
function isTouchDevice(){var prefixes=' -webkit- -moz- -o- -ms- '.split(' ');var mq=function(query){return window.matchMedia(query).matches;};if(('ontouchstart'in window)||window.DocumentTouch&&document instanceof DocumentTouch){return true;}
var query=['(',prefixes.join('touch-enabled),('),'heartz',')'].join('');return mq(query);}
_isTouchDevice=isTouchDevice();function getParent($this){var selector=$this.attr('data-target');var $parent;if(!selector){selector=$this.attr('href');selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'');}
$parent=selector&&$(selector);if(!$parent||!$parent.length){$parent=$this.parent();}
return $parent;}
function bindEvents(dropdown){var $parent=getParent(dropdown.element);$('.dropdown-toggle, .dropdown-menu',$parent).on('mouseenter.dropdownhover',function(){if(_isTouchDevice){return;}
clearTimeout(_hideTimeoutHandler);if(!$parent.is('.open, .show')){_hardOpened=false;dropdown.element.dropdown('toggle');}});$('.dropdown-toggle, .dropdown-menu',$parent).on('mouseleave.dropdownhover',function(){if(_isTouchDevice){return;}
if(_hardOpened){return;}
_hideTimeoutHandler=setTimeout(function(){if($parent.is('.open, .show')){dropdown.element.dropdown('toggle');}},dropdown.settings.hideTimeout);});dropdown.element.on('click.dropdownhover',function(e){if(dropdown.settings.clickBehavior!=='link'&&_isTouchDevice){return;}
switch(dropdown.settings.clickBehavior){case 'default':return;case 'disable':e.preventDefault();e.stopImmediatePropagation();return;case 'link':e.stopImmediatePropagation();return;case 'sticky':if(_hardOpened){_hardOpened=false;}
else{_hardOpened=true;if($parent.is('.open, .show')){e.stopImmediatePropagation();e.preventDefault();}}
return;}});}
function removeEvents(dropdown){var $parent=getParent(dropdown.element);$('.dropdown-toggle, .dropdown-menu',$parent).off('.dropdownhover');$('.dropdown-toggle, .dropdown-menu',$parent).off('.dropdown');dropdown.element.off('.dropdownhover');$('body').off('.dropdownhover');}
BootstrapDropdownHover.prototype={init:function(){this.setClickBehavior(this.settings.clickBehavior);this.setHideTimeout(this.settings.hideTimeout);bindEvents(this);return this.element;},setClickBehavior:function(value){this.settings.clickBehavior=value;return this.element;},setHideTimeout:function(value){this.settings.hideTimeout=value;return this.element;},destroy:function(){clearTimeout(_hideTimeoutHandler);removeEvents(this);this.element.data('plugin_'+pluginName,null);return this.element;}};$.fn[pluginName]=function(options){var args=arguments;if(options===undefined||typeof options==='object'){if(!$.contains(document,$(this)[0])){$('[data-toggle="dropdown"]').each(function(index,item){$(item).bootstrapDropdownHover(options);});}
return this.each(function(){if(!$(this).hasClass('dropdown-toggle')||$(this).data('toggle')!=='dropdown'){$('[data-toggle="dropdown"]',this).each(function(index,item){$(item).bootstrapDropdownHover(options);});}else if(!$.data(this,'plugin_'+pluginName)){$.data(this,'plugin_'+pluginName,new BootstrapDropdownHover(this,options));}});}else if(typeof options==='string'&&options[0]!=='_'&&options!=='init'){var returns;this.each(function(){var instance=$.data(this,'plugin_'+pluginName);if(instance instanceof BootstrapDropdownHover&&typeof instance[options]==='function'){returns=instance[options].apply(instance,Array.prototype.slice.call(args,1));}});return returns!==undefined?returns:this;}};}));