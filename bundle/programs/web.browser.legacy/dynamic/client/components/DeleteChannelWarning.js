function module(e,n,t){var l,o,a,r,c,i,u;t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},0),t.link("react",{default:function(e){o=e}},0),t.link("@rocket.chat/fuselage",{Button:function(e){a=e},ButtonGroup:function(e){r=e},Icon:function(e){c=e},Modal:function(e){i=e}},1),t.link("../contexts/TranslationContext",{useTranslation:function(e){u=e}},2);var m=function(e){var n=e.onConfirm,t=e.onCancel,m=l(e,["onConfirm","onCancel"]),f=u();return o.createElement(i,m,o.createElement(i.Header,null,o.createElement(c,{color:"danger",name:"modal-warning",size:20}),o.createElement(i.Title,null,f("Are_you_sure")),o.createElement(i.Close,{onClick:t})),o.createElement(i.Content,{fontScale:"p1"},f("Delete_Room_Warning")),o.createElement(i.Footer,null,o.createElement(r,{align:"end"},o.createElement(a,{onClick:t},f("Cancel")),o.createElement(a,{primary:!0,danger:!0,onClick:n},f("Yes_delete_it")))))};t.exportDefault(m)}

