function module(e,t,n){let a,l,r,s,o,i,c,u,m,f,k,x,p,E,d,h,b;n.link("@babel/runtime/helpers/extends",{default(e){a=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},1),n.export({AgentInfo:()=>S,Action:()=>g}),n.link("react",{default(e){r=e}},0),n.link("@rocket.chat/fuselage",{Box(e){s=e},Margins(e){o=e},Button(e){i=e},Icon(e){c=e},ButtonGroup(e){u=e}},1),n.link("use-subscription",{useSubscription(e){m=e}},2),n.link("../../../contexts/TranslationContext",{useTranslation(e){f=e}},3),n.link("../../../components/VerticalBar",{default(e){k=e}},4),n.link("../../room/contextualBar/UserInfo",{UserInfo(e){x=e}},5),n.link("../../../components/UserStatus",{UserStatus(e){p=e}},6),n.link("../../../components/Skeleton",{FormSkeleton(e){E=e}},7),n.link("../additionalForms",{formsSubscription(e){d=e}},8),n.link("../../../hooks/useEndpointData",{useEndpointData(e){h=e}},9),n.link("../../../hooks/useAsyncState",{AsyncStatePhase(e){b=e}},10);const S=r.memo((function e(t){let{uid:n,children:i}=t,c=l(t,["uid","children"]);const S=f(),{value:g,phase:A,error:I}=h("livechat/users/agent/".concat(n)),U=m(d),{useMaxChatsPerAgentDisplay:v=(()=>{})}=U,B=v();if(A===b.LOADING)return r.createElement(E,null);if(I||!g||!g.user)return r.createElement(s,{mbs:"x16"},S("User_not_found"));const{user:D}=g,{username:y,statusLivechat:C,status:L}=D;return r.createElement(k.ScrollableContent,a({p:"x24"},c),r.createElement(s,{alignSelf:"center"},r.createElement(x.Avatar,{size:"x332",username:y})),r.createElement(u,{mi:"neg-x4",flexShrink:0,flexWrap:"nowrap",withTruncatedText:!0,justifyContent:"center",flexShrink:0},i),r.createElement(o,{block:"x4"},r.createElement(s,{mb:"x2"},r.createElement(x.Username,{name:y,status:r.createElement(p,{status:L})})),C&&r.createElement(r.Fragment,null,r.createElement(x.Label,null,S("Livechat_status")),r.createElement(x.Info,null,S(C))),B&&r.createElement(B,{data:D})))})),g=e=>{let{icon:t,label:n}=e,s=l(e,["icon","label"]);return(r.createElement(i,a({title:n},s,{mi:"x4"}),r.createElement(c,{name:t,size:"x20",mie:"x4"}),n))};S.Action=g,n.exportDefault(S)}
