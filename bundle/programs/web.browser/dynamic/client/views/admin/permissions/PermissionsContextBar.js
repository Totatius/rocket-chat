function module(e,t,l){let n,a,o,u,i,r,c,s;l.link("react",{default(e){n=e}},0),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){a=e}},1),l.link("../../../contexts/RouterContext",{useRouteParameter(e){o=e},useRoute(e){u=e}},2),l.link("../../../contexts/TranslationContext",{useTranslation(e){i=e}},3),l.link("../../../components/VerticalBar",{default(e){r=e}},4),l.link("./NewRolePage",{default(e){c=e}},5),l.link("./EditRolePage",{default(e){s=e}},6);const d=()=>{const e=i(),t=o("_id"),l=o("context"),d=u("admin-permissions"),k=a(()=>{d.push({})});return l&&n.createElement(r,null,n.createElement(r.Header,null,"new"===l&&e("New_role"),"edit"===l&&e("Role_Editing"),n.createElement(r.Close,{onClick:k})),n.createElement(r.ScrollableContent,null,"new"===l&&n.createElement(c,null),"edit"===l&&n.createElement(s,{_id:t})))||null};l.exportDefault(d)}
