function module(e,n,t){var l,a,r,o,i,c,u,s,f,d,p,m,k,b,x,C,h;t.link("@babel/runtime/regenerator",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},2),t.link("@rocket.chat/fuselage",{Modal:function(e){o=e},Box:function(e){i=e},ButtonGroup:function(e){c=e},Button:function(e){u=e},Scrollable:function(e){s=e},Callout:function(e){f=e},Margins:function(e){d=e},Icon:function(e){p=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){m=e}},1),t.link("react",{default:function(e){k=e},useState:function(e){b=e}},2),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){x=e}},3),t.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){C=e}},4),t.link("../../../hooks/useEndpointAction",{useEndpointActionExperimental:function(e){h=e}},5);var E=function(e){var n=e.onClose,t=e.license,E=e.licenseStatus,g=r(e,["onClose","license","licenseStatus"]),v=x(),_=C(),y=b(t),T=a(y,2),w=T[0],P=T[1],S=b(!1),A=a(S,2),M=A[0],B=A[1],I=b(E),D=a(I,2),z=D[0],F=D[1],G=b(t),L=a(G,2),O=L[0],j=L[1],H=function(e){P(e.currentTarget.value)},R=O!==w,W=h("POST","licenses.add",v("Cloud_License_applied_successfully")),q=m(function(){function e(){var e;return l.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,l.awrap(navigator.clipboard.readText());case 3:e=n.sent,P(e),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),_({type:"error",message:v("Paste_error")+": "+n.t0});case 10:case"end":return n.stop()}}return n}(),null,null,[[0,7]],Promise)}return e}()),J=m(function(){function e(){var e;return l.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return B(!0),j(w),t.next=4,l.awrap(W({license:w}));case 4:if(!(e=t.sent).success){t.next=8;break}return n(),t.abrupt("return");case 8:B(!1),F("invalid");case 10:case"end":return t.stop()}}return t}(),null,null,null,Promise)}return e}());return k.createElement(o,g,k.createElement(o.Header,null,k.createElement(o.Title,null,v("Cloud_Apply_Offline_License")),k.createElement(o.Close,{onClick:n})),k.createElement(o.Content,null,k.createElement(i,{withRichContent:!0},k.createElement("p",null,v("Cloud_register_offline_finish_helper"))),k.createElement(i,{display:"flex",flexDirection:"column",alignItems:"stretch",paddingInline:"x16",pb:"x8",flexGrow:1,backgroundColor:"neutral-800",mb:"invalid"===z&&"x8"},k.createElement(d,{block:"x8"},k.createElement(s,{vertical:!0},k.createElement(i,{is:"textarea",height:"x108",fontFamily:"mono",fontScale:"p1",color:"alternative",style:{wordBreak:"break-all",resize:"none"},placeholder:v("Paste_here"),disabled:M,value:w,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",spellCheck:"false",onChange:H})),k.createElement(c,{align:"start"},k.createElement(u,{primary:!0,small:!0,disabled:M,onClick:q},k.createElement(p,{name:"clipboard"}),v("Paste"))))),"invalid"===z&&k.createElement(f,{type:"danger"},v("Cloud_Invalid_license"))),k.createElement(o.Footer,null,k.createElement(c,{align:"end"},k.createElement(u,{primary:!0,disabled:!R||M,onClick:J},v("Cloud_Apply_license")))))};t.exportDefault(E)}

