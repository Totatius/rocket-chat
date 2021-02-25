function module(e,t,a){let l,n,o,r,s,c,i,u,m,g,d,h,E,b,k,_,p,f,y;a.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),a.link("react",{default(e){n=e},useState(e){o=e}},0),a.link("@rocket.chat/fuselage",{Box(e){r=e},Button(e){s=e},ButtonGroup(e){c=e},Field(e){i=e},FieldGroup(e){u=e},ToggleSwitch(e){m=e},Callout(e){g=e},Divider(e){d=e}},1),a.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){h=e}},2),a.link("../../../components/Page",{default(e){E=e}},3),a.link("../../../components/PageSkeleton",{default(e){b=e}},4),a.link("../../../contexts/TranslationContext",{useTranslation(e){k=e}},5),a.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){_=e}},6),a.link("../../../contexts/ServerContext",{useMethod(e){p=e}},7),a.link("../../../hooks/useMethodData",{useMethodData(e){f=e}},8),a.link("../../../hooks/useAsyncState",{AsyncStatePhase(e){y=e}},9);const T=[{action:"initialState"}],v=[{action:"list-pages"}],x=()=>{const e=k(),t=_(),{value:a,phase:l,reload:o}=f("livechat:facebook",T),{value:r,phase:s,reload:c}=f("livechat:facebook",v),{enabled:i,hasToken:u}=a||{enabled:!1,hasToken:!1},{pages:m}=r||{pages:[]},d=p("livechat:facebook"),x=h(async(e,a,l)=>{l(!a);try{const t=a?"unsubscribe":"subscribe";await d({action:t,page:e})}catch(n){t({type:"error",message:n}),l(a)}}),C=h(async()=>{try{await d({action:"disable"}),t({type:"success",message:e("Integration_disabled")}),o(),c()}catch(a){t({type:"error",message:a})}}),w=(e,t)=>{const a=window.open(e,"facebook-integration-oauth","width=600,height=400"),l=setInterval(()=>{(null==a?void 0:a.closed)&&(clearInterval(l),t())},300)},S=h(async()=>{try{const e=await d({action:"enable"});(null==e?void 0:e.url)?w(null==e?void 0:e.url,()=>{S()}):(o(),c())}catch(e){t({type:"error",message:e})}});return l===y.LOADING||s===y.LOADING?n.createElement(b,null):l===y.REJECTED?n.createElement(E,null,n.createElement(E.Header,{title:e("Edit_Custom_Field")}),n.createElement(E.ScrollableContentWithShadow,null,n.createElement(g,{type:"danger"},e("Error")))):(i&&u&&s===y.REJECTED&&S(),n.createElement(D,{pages:m,enabled:i,hasToken:u,onToggle:x,onRefresh:c,onDisable:C,onEnable:S}))},C=e=>{let{name:t,id:a,subscribed:l,onToggle:s,className:c}=e;const[u,g]=o(l),d=h(()=>s(a,u,g));return n.createElement(i,{className:c},n.createElement(r,{display:"flex",flexDirection:"row"},n.createElement(i.Label,null,t),n.createElement(i.Row,null,n.createElement(m,{checked:u,onChange:d}))))},w=e=>{let{pages:t,onToggle:a,className:o}=e;return(n.createElement(u,null,t.map(e=>n.createElement(C,l({key:e.id},e,{onToggle:a,className:o})))))},D=e=>{let{pages:t,enabled:a,hasToken:l,onToggle:o,onRefresh:i,onEnable:m,onDisable:g}=e;const h=k();return(n.createElement(E,null,n.createElement(E.Header,{title:h("Facebook")}),n.createElement(E.ScrollableContentWithShadow,null,n.createElement(r,{maxWidth:"x600",w:"full",alignSelf:"center"},!a&&n.createElement(n.Fragment,null,n.createElement(c,{stretch:!0,mb:"x8"},n.createElement(s,{primary:!0,onClick:m,disabled:!l},h("Enable"))),!l&&n.createElement(n.Fragment,null,n.createElement("p",null,h("You_have_to_set_an_API_token_first_in_order_to_use_the_integration")),n.createElement("p",null,h("Please_go_to_the_Administration_page_then_Livechat_Facebook")))),a&&n.createElement(n.Fragment,null,n.createElement(r,{fontScale:"h1",mbe:"x8"},h("Pages")),(null==t?void 0:t.length)?n.createElement(u,null,n.createElement(w,{pages:t,onToggle:o})):h("No_pages_yet_Try_hitting_Reload_Pages_button"),n.createElement(r,{w:"full",mb:"x16"},n.createElement(d,null)),n.createElement(c,{stretch:!0,vertical:!0},n.createElement(s,{onClick:i},h("Reload_Pages")),n.createElement(s,{danger:!0,onClick:g},h("Disable"))))))))};a.exportDefault(x)}

