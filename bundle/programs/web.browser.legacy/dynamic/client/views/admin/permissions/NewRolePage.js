function module(e,n,t){var a,o,r,u,c,s,l,i,f,m,k,p,x;t.link("@babel/runtime/regenerator",{default:function(e){a=e}},0),t.link("react",{default:function(e){o=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){r=e},FieldGroup:function(e){u=e},ButtonGroup:function(e){c=e},Button:function(e){s=e},Margins:function(e){l=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){i=e}},2),t.link("./RoleForm",{default:function(e){f=e}},3),t.link("../../../hooks/useForm",{useForm:function(e){m=e}},4),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){k=e}},5),t.link("../../../contexts/ServerContext",{useMethod:function(e){p=e}},6),t.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){x=e}},7);var d=function(){var e=k(),n=x(),t=m({name:"",description:"",scope:"Users",mandatory2fa:!1}),d=t.values,h=t.handlers,v=p("authorization:saveRole"),g=i(function(){function t(){return a.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.awrap(v(d));case 3:n({type:"success",message:e("Saved")}),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),n({type:"error",message:t.t0});case 9:case"end":return t.stop()}}return t}(),null,null,[[0,6]],Promise)}return t}());return o.createElement(r,{w:"full",alignSelf:"center",mb:"neg-x8"},o.createElement(l,{block:"x8"},o.createElement(u,null,o.createElement(f,{values:d,handlers:h})),o.createElement(c,{stretch:!0,w:"full"},o.createElement(s,{primary:!0,onClick:g},e("Save")))))};t.exportDefault(d)}
