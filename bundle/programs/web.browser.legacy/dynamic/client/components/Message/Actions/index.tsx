function module(n,t,e){var i,o,a,c,r,u,l;e.link("@babel/runtime/helpers/extends",{default:function(n){i=n}},0),e.export({Action:function(){return f}}),e.link("react",{default:function(n){o=n}},0),e.link("@rocket.chat/fuselage",{Icon:function(n){a=n},Button:function(n){c=n},ButtonGroup:function(n){r=n}},1),e.link("../../../contexts/TranslationContext",{useTranslation:function(n){u=n}},2),e.link("..",{Content:function(n){l=n}},3);var f=function(n){var t=n.id,e=n.icon,i=n.i18nLabel,r=n.label,l=n.mid,f=n.runAction,m=u();return o.createElement(c,{id:t,"data-mid":l,"data-actionlink":t,onClick:f,primary:!0,small:!0},e&&o.createElement(a,{name:e.replace("icon-","")}),i?m(i):r)},m=function(n){var t=n.actions,e=n.runAction;return(o.createElement(l,{width:"full",justifyContent:"center"},o.createElement(r,{align:"center"},t.map((function(n){return o.createElement(f,i({runAction:e,key:n.id},n))})))))};e.exportDefault(m)}

