function module(e,t,l){let n,a,r,o,i,d,m,c,s,u,p,b,f,k,E,_,B,T,h;l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),l.link("react",{default(e){r=e},Suspense(e){o=e},useMemo(e){i=e}},0),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){d=e}},1),l.link("../../contexts/TranslationContext",{useTranslation(e){m=e}},2),l.link("./Header",{default(e){c=e}},3),l.link("./components/BlazeTemplate",{default(e){s=e}},4),l.link("../../contexts/UserContext",{useUserPreference(e){u=e}},5),l.link("./providers/RoomProvider",{default(e){p=e},useRoom(e){b=e}},6),l.link("./components/RoomTemplate",{RoomTemplate(e){f=e}},7),l.link("./providers/ToolboxProvider",{useTab(e){k=e},useTabBarOpen(e){E=e},useTabBarClose(e){_=e},useTabBarOpenUserInfo(e){B=e}},8),l.link("./components/VerticalBarOldActions",{default(e){T=e}},9),l.link("../../components/VerticalBar",{default(e){h=e}},10);const x=e=>{let{template:t}=e,l=a(e,["template"]);return(r.createElement(o,{fallback:r.createElement(h.Skeleton,null)},r.createElement(t,l)))},C=()=>{const e=m(),t=b(),l=k(),a=E(),o=_(),p=B(),h=u("hideFlexTab"),C=d(()=>!(!l||!l.template)),v=i(()=>({open:a,close:o,isOpen:C,openUserInfo:p}),[a,o,C,p]);return r.createElement(f,{"aria-label":e("Channel"),"data-qa-rc-room":t._id},r.createElement(f.Header,null,r.createElement(c,{room:t,rid:t._id})),r.createElement(f.Body,null,r.createElement(s,{onClick:h?o:void 0,name:"roomOld",tabBar:v,rid:t._id,_id:t._id})),l&&r.createElement(f.Aside,{"data-qa-tabbar-name":l.id},"string"==typeof l.template&&r.createElement(T,n({},l,{name:l.template,tabBar:v,rid:t._id,_id:t._id})),"string"!=typeof l.template&&r.createElement(x,{template:l.template,tabBar:v,rid:t._id,_id:t._id})))};function v(e){let{children:t}=e;return t}function O(e){let{children:t}=e;return t}function y(e){let{children:t}=e;return t}l.exportDefault(e=>r.createElement(p,{rid:e._id},r.createElement(C,null))),C.Header=c,C.Body=v,C.Footer=O,C.Aside=y}

