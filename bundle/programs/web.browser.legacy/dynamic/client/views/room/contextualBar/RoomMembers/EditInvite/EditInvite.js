function module(e,n,t){var l,a,o,c,i,r,u,s,k,m,f,x,E;t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},0),t.export({EditInvite:function(){return C}}),t.link("react",{default:function(e){a=e},useMemo:function(e){o=e},useState:function(e){c=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){i=e},Field:function(e){r=e},Select:function(e){u=e},Button:function(e){s=e},InputBox:function(e){k=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){m=e}},2),t.link("../../../../../contexts/TranslationContext",{useTranslation:function(e){f=e}},3),t.link("../../../../../components/VerticalBar",{default:function(e){x=e}},4),t.link("../../../providers/ToolboxProvider",{useTabBarClose:function(e){E=e}},5);var C=function(e){var n=e.onClickBack,t=e.onClickClose,l=e.onClickNewLink,c=e.days,m=e.setDays,E=e.maxUses,C=e.setMaxUses,d=f(),p=o((function(){return[[1,1],[7,7],[15,15],[30,30],[0,d("Never")]]}),[d]),v=o((function(){return[[5,5],[10,10],[25,25],[50,50],[100,100],[0,d("No_Limit")]]}),[d]);return a.createElement(a.Fragment,null,a.createElement(x.Header,null,n&&a.createElement(x.Back,{onClick:n}),a.createElement(x.Text,null,d("Invite_Users")),t&&a.createElement(x.Close,{onClick:t})),a.createElement(x.ScrollableContent,null,a.createElement(r,null,a.createElement(r.Label,{flexGrow:0},d("Expiration_(Days)")),a.createElement(r.Row,null,void 0===c?a.createElement(k.Skeleton,null):a.createElement(u,{value:c,onChange:m,options:p}))),a.createElement(r,{pb:"x16"},a.createElement(r.Label,{flexGrow:0},d("Max_number_of_uses")),a.createElement(r.Row,null,void 0===E?a.createElement(k.Skeleton,null):a.createElement(u,{value:E,onChange:C,options:v}))),a.createElement(i,{pb:"x16"},a.createElement(s,{primary:!0,onClick:l},d("Generate_New_Link")))))};t.exportDefault((function(e){var n=e.onClickBack,t=e.setParams,o=e.linkText,i=e.captionText,r=e.days,u=e.maxUses,s=E(),k=c(r),f=l(k,2),x=f[0],d=f[1],p=c(u),v=l(p,2),b=v[0],T=v[1],y=m((function(){t({days:x,maxUses:b})}));return a.createElement(C,{onClickBack:n,onClickClose:s,onClickNewLink:y,setDays:d,days:x,maxUses:b,setMaxUses:T,linkText:o,captionText:i})}))}

