function module(e,t,n){let s,a,i,o,r,c,l,u,d,m,h;n.link("@babel/runtime/helpers/extends",{default(e){s=e}},0),n.link("react",{default(e){a=e},useMemo(e){i=e}},0),n.link("@rocket.chat/fuselage",{Sidebar(e){o=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){r=e}},2),n.link("../../../../app/ui-utils",{popover(e){c=e},modal(e){l=e}},3),n.link("../../../contexts/AuthorizationContext",{useAtLeastOnePermission(e){u=e},usePermission(e){d=e}},4),n.link("../../../contexts/SettingsContext",{useSetting(e){m=e}},5),n.link("../../../contexts/TranslationContext",{useTranslation(e){h=e}},6);const f=["create-c","create-p","create-d","start-discussion","start-discussion-other-user"],g=["create-c","create-p"],C=["start-discussion","start-discussion-other-user"],k=(e,t)=>c.open({columns:[{groups:[{items:t}]}],currentTarget:e.currentTarget,offsetVertical:e.currentTarget.clientHeight+10}),p=(e,t)=>r(n=>{n.preventDefault(),l.open({title:e,content:t,data:{onCreate(){l.close()}},modifier:"modal",showConfirmButton:!1,showCancelButton:!1,confirmOnEnter:!1})}),b=e=>{const t=h(),n=u(f),c=u(g),l=d("create-d"),b=u(C),D=p(t("Create_A_New_Channel"),"createChannel"),x=p(t("Direct_Messages"),"CreateDirectMessage"),_=p(t("Discussion_title"),"CreateDiscussion"),T=m("Discussion_enabled"),M=i(()=>[c&&{icon:"hashtag",name:t("Channel"),qa:"sidebar-create-channel",action:D},l&&{icon:"team",name:t("Direct_Messages"),qa:"sidebar-create-dm",action:x},T&&b&&{icon:"discussion",name:t("Discussion"),qa:"sidebar-create-discussion",action:_}].filter(Boolean),[c,l,b,D,x,_,T,t]),A=r(e=>{if(1===M.length)return M[0].action(e);k(e,M)});return n?a.createElement(o.TopBar.Action,s({},e,{icon:"edit-rounded",onClick:A})):null};n.exportDefault(b)}
