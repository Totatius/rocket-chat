function module(e,n,t){var l,a,r,c,u,o,i,s,m,f,p,E,d,h,x,k,b;function C(e){var n=e.close,t=e.onChange,C=r(e,["close","onChange"]),g=h(),w=o(""),y=a(w,2),j=y[0],v=y[1],R=o(""),T=a(R,2),F=T[0],I=T[1],L=o(),S=a(L,2),A=S[0],B=S[1],D=o(""),U=a(D,2),_=U[0],P=U[1],N=u(function(){function e(e){return l.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:B(e),P(URL.createObjectURL(e));case 2:case"end":return n.stop()}}return n}(),null,null,null,Promise)}return e}(),[B]),q=k("emoji-custom.create",{},g("Custom_Emoji_Added_Successfully")),z=u(function(){function e(){var e,a;return l.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:return(e=new FormData).append("emoji",A),e.append("name",j),e.append("aliases",F),r.next=6,l.awrap(q(e));case 6:(a=r.sent).success&&(t(),n());case 8:case"end":return r.stop()}}return r}(),null,null,null,Promise)}return e}(),[A,j,F,q,t,n]),G=x(N,"emoji"),M,O=a(G,1)[0];return c.createElement(b.ScrollableContent,C,c.createElement(E,null,c.createElement(E.Label,null,g("Name")),c.createElement(E.Row,null,c.createElement(p,{value:j,onChange:function(e){return v(e.currentTarget.value)},placeholder:g("Name")}))),c.createElement(E,null,c.createElement(E.Label,null,g("Aliases")),c.createElement(E.Row,null,c.createElement(p,{value:F,onChange:function(e){return I(e.currentTarget.value)},placeholder:g("Aliases")}))),c.createElement(E,null,c.createElement(E.Label,{alignSelf:"stretch",display:"flex",justifyContent:"space-between",alignItems:"center"},g("Custom_Emoji"),c.createElement(s,{square:!0,onClick:O},c.createElement(d,{name:"upload",size:"x20"}))),_&&c.createElement(i,{display:"flex",flexDirection:"row",mi:"neg-x4",justifyContent:"center"},c.createElement(f,{inline:"x4"},c.createElement(i,{is:"img",style:{objectFit:"contain"},w:"x120",h:"x120",src:_})))),c.createElement(E,null,c.createElement(E.Row,null,c.createElement(m,{stretch:!0,w:"full"},c.createElement(s,{onClick:n},g("Cancel")),c.createElement(s,{primary:!0,onClick:z},g("Save"))))),c.createElement(E,null,c.createElement(E.Row,null,c.createElement(m,{stretch:!0,w:"full"},c.createElement(s,{primary:!0,danger:!0},c.createElement(d,{name:"trash",mie:"x4"}),g("Delete"))))))}t.link("@babel/runtime/regenerator",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},2),t.link("react",{default:function(e){c=e},useCallback:function(e){u=e},useState:function(e){o=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){i=e},Button:function(e){s=e},ButtonGroup:function(e){m=e},Margins:function(e){f=e},TextInput:function(e){p=e},Field:function(e){E=e},Icon:function(e){d=e}},1),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){h=e}},2),t.link("../../../hooks/useFileInput",{useFileInput:function(e){x=e}},3),t.link("../../../hooks/useEndpointUpload",{useEndpointUpload:function(e){k=e}},4),t.link("../../../components/VerticalBar",{default:function(e){b=e}},5),t.exportDefault(C)}
