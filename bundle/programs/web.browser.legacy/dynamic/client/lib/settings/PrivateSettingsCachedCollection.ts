function module(n,e,t){var i,r,o,c,u,l,a;t.link("@babel/runtime/regenerator",{default:function(n){i=n}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(n){r=n}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(n){o=n}},2),t.link("@babel/runtime/helpers/createSuper",{default:function(n){c=n}},3),t.link("@babel/runtime/helpers/inheritsLoose",{default:function(n){u=n}},4),t.export({PrivateSettingsCachedCollection:function(){return s}}),t.link("../../../app/ui-cached-collection/client",{CachedCollection:function(n){l=n}},0),t.link("../../../app/notifications/client",{Notifications:function(n){a=n}},1);var s=function(n){u(l,n);var e=c(l),t;function l(){return n.call(this,{name:"private-settings",eventType:"onLogged"})||this}return l.prototype.setupListener=function(){function n(){var n=this;return i.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:a.onLogged(this.eventName,function(){function e(e,t){var c,u;return i.async(function(){function i(i){for(;;)switch(i.prev=i.next){case 0:c=t._id,u=o(t,["_id"]),n.log("record received",e,r({_id:c},u)),n.collection.upsert({_id:c},u),n.sync();case 4:case"end":return i.stop()}}return i}(),null,null,null,Promise)}return e}());case 1:case"end":return e.stop()}}return e}(),null,this,null,Promise)}return n}(),l.get=function(){function n(){return l.instance||(l.instance=new l),l.instance}return n}(),l}(l)}

