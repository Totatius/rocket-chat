function module(e,t,n){let l,a,u,o,s,i,r,c,p,d,m,k,f,g,P,E;function x(){const[e,t]=a(!0),n=o("manage-apps"),x=c("apps/is-enabled"),A=i("admin-apps-disabled");u(()=>{let e=!0;const l=async()=>{n&&(await x()?e&&t(!1):A.push())};return l(),()=>{e=!1}},[n,x,A]);const[h]=r(),C="admin-marketplace"===h,R=s("context"),v=s("id"),S=s("version");return n?e?l.createElement(d,null):l.createElement(P,null,!R&&C&&l.createElement(k,null)||!R&&!C&&l.createElement(f,null)||"details"===R&&l.createElement(m,{id:v,marketplaceVersion:S})||"logs"===R&&l.createElement(E,{id:v})||"install"===R&&l.createElement(g,null)):l.createElement(p,null)}n.link("react",{default(e){l=e},useState(e){a=e},useEffect(e){u=e}},0),n.link("../../../contexts/AuthorizationContext",{usePermission(e){o=e}},1),n.link("../../../contexts/RouterContext",{useRouteParameter(e){s=e},useRoute(e){i=e},useCurrentRoute(e){r=e}},2),n.link("../../../contexts/ServerContext",{useMethod(e){c=e}},3),n.link("../../../components/NotAuthorizedPage",{default(e){p=e}},4),n.link("../../../components/PageSkeleton",{default(e){d=e}},5),n.link("./AppDetailsPage",{default(e){m=e}},6),n.link("./MarketplacePage",{default(e){k=e}},7),n.link("./AppsPage",{default(e){f=e}},8),n.link("./AppInstallPage",{default(e){g=e}},9),n.link("./AppsProvider",{default(e){P=e}},10),n.link("./AppLogsPage",{default(e){E=e}},11),n.exportDefault(x)}

