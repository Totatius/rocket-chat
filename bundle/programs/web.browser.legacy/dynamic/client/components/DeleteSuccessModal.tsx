function module(e,n,t){var l,o,c,r,a,i,u;t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},0),t.link("react",{default:function(e){o=e}},0),t.link("@rocket.chat/fuselage",{Button:function(e){c=e},ButtonGroup:function(e){r=e},Icon:function(e){a=e},Modal:function(e){i=e}},1),t.link("../contexts/TranslationContext",{useTranslation:function(e){u=e}},2);var f=function(e){var n=e.children,t=e.onClose,f=l(e,["children","onClose"]),m=u();return o.createElement(i,f,o.createElement(i.Header,null,o.createElement(a,{color:"success",name:"checkmark-circled",size:20}),o.createElement(i.Title,null,m("Deleted")),o.createElement(i.Close,{onClick:t})),o.createElement(i.Content,{fontScale:"p1"},n),o.createElement(i.Footer,null,o.createElement(r,{align:"end"},o.createElement(c,{primary:!0,onClick:t},m("Ok")))))};t.exportDefault(f)}

