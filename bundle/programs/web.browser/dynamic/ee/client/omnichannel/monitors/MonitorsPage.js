function module(e,t,n){let l,a,o,s,r,c,i,u,m,d,k,E,h,p,f,g,x,C,M,v;n.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},0),n.link("react",{default(e){a=e},useState(e){o=e},useMemo(e){s=e}},0),n.link("@rocket.chat/fuselage",{Button(e){r=e},Box(e){c=e},Callout(e){i=e},Field(e){u=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){m=e}},2),n.link("./MonitorsTable",{default(e){d=e}},3),n.link("../../../../client/components/Page",{default(e){k=e}},4),n.link("../../../../client/components/NotAuthorizedPage",{default(e){E=e}},5),n.link("../../../../client/components/PageSkeleton",{default(e){h=e}},6),n.link("../../../../client/hooks/useAsyncState",{AsyncStatePhase(e){p=e}},7),n.link("../../../../client/hooks/useEndpointData",{useEndpointData(e){f=e}},8),n.link("../../hooks/useHasLicense",{useHasLicense(e){g=e}},9),n.link("../../../../client/contexts/ServerContext",{useMethod(e){x=e}},10),n.link("../../../../client/components/AutoComplete",{UserAutoComplete(e){C=e}},11),n.link("../../../../client/contexts/ToastMessagesContext",{useToastMessageDispatch(e){M=e}},12),n.link("../../../../client/contexts/TranslationContext",{useTranslation(e){v=e}},13);const y=e=>"asc"===e?1:-1,P=(e,t)=>{let{text:n,itemsPerPage:a,current:o}=e,[r,c]=t;return s(()=>l({text:n,sort:JSON.stringify({[r]:y(c)})},a&&{count:a},{},o&&{offset:o}),[n,a,o,r,c])},b=()=>{const e=g("livechat-enterprise");return"loading"===e?a.createElement(h,null):e?a.createElement(D,null):a.createElement(E,null)},D=()=>{const e=v(),t=M(),[n,l]=o(()=>({current:0,itemsPerPage:25,text:""})),[s,E]=o(["name","asc"]),[h,g]=o(""),{value:y,phase:b,reload:D}=f("livechat/monitors.list",P(n,s)),S=x("livechat:addMonitor"),A=m(e=>{const[t,n]=s;E(t!==e?[e,"asc"]:[e,"asc"===n?"desc":"asc"])}),T=m(async()=>{try{await S(h),D(),g(""),t({type:"success",message:e("Monitor_added")})}catch(n){t({type:"error",message:n})}});return b===p.REJECTED?a.createElement(i,null,e("Error")):a.createElement(k,{flexDirection:"row"},a.createElement(k,null,a.createElement(k.Header,{title:e("Livechat_Monitors")}),a.createElement(k.Content,null,a.createElement(c,{display:"flex",flexDirection:"1"},a.createElement(u,null,a.createElement(u.Label,null,e("Username")),a.createElement(u.Row,null,a.createElement(C,{value:h,onChange:g}),a.createElement(r,{primary:!0,disabled:!h,onClick:T,mis:"x8"},e("Add"))))),a.createElement(d,{monitors:null==y?void 0:y.monitors,totalMonitors:null==y?void 0:y.total,params:n,onChangeParams:l,onHeaderClick:A,sort:s,onDelete:D}))))};n.exportDefault(b)}

