function module(e,t,n){let l,a,r,o,c,i,s,m,u,d,k,p;function E(e){let{reactions:t,onClick:n}=e;const r=u("UI_Use_Real_Name");return(l.createElement(k,null,l.createElement(a,null,Object.entries(t).map(e=>{let[t,{names:o=[],usernames:c}]=e;return(l.createElement(a,{key:t},l.createElement(a,{display:"flex",flexWrap:"wrap",overflowX:"hidden",mb:"x8"},l.createElement(d,{emojiHandle:t}),l.createElement(a,{paddingBlock:"x4",mis:"x4"},c.map((e,t)=>l.createElement(C,{key:e,displayName:r&&o[t]||e,username:e,onClick:n}))))))}))))}function C(e){let{username:t,onClick:n,displayName:o}=e;return(l.createElement(a,{marginInlineEnd:"x4","data-username":t,onClick:n,key:o},l.createElement(r,null,o)))}function f(e){let{rid:t,reactions:n,tabBar:a,onClose:r}=e;const u=m(),d=s(e=>{const{username:n}=e.currentTarget.dataset;n&&p({username:n,rid:t,target:e.currentTarget,open:e=>{e.preventDefault(),r(),a.openUserInfo(n)}})});return l.createElement(l.Fragment,null,l.createElement(o.Header,null,l.createElement(o.Title,null,u("Users_reacted")),l.createElement(o.Close,{onClick:r})),l.createElement(o.Content,{fontScale:"p1"},l.createElement(E,{reactions:n,onClick:d,onClose:r})),l.createElement(o.Footer,null,l.createElement(c,{align:"end"},l.createElement(i,{primary:!0,onClick:r},u("Ok")))))}n.export({Reactions:()=>E,Username:()=>C,default:()=>f}),n.link("react",{default(e){l=e}},0),n.link("@rocket.chat/fuselage",{Box(e){a=e},Tag(e){r=e},Modal(e){o=e},ButtonGroup(e){c=e},Button(e){i=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){s=e}},2),n.link("../../../../client/contexts/TranslationContext",{useTranslation(e){m=e}},3),n.link("../../../../client/contexts/SettingsContext",{useSetting(e){u=e}},4),n.link("../../../../client/components/Emoji",{default(e){d=e}},5),n.link("../../../../client/components/ScrollableContentWrapper",{default(e){k=e}},6),n.link("../../../ui/client/lib/UserCard",{openUserCard(e){p=e}},7)}

