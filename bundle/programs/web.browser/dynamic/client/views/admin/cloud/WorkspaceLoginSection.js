function module(e,t,n){let o,a,c,l,r,s,i,u,d,h,g,m;function y(e){let{onRegisterStatusChange:t}=e,n=a(e,["onRegisterStatusChange"]);const y=h(),p=m(),k=g("cloud:checkUserLoggedIn"),f=g("cloud:getOAuthAuthorizationUrl"),C=g("cloud:logout"),w=g("cloud:disconnectWorkspace"),[E,x]=s(u(!1)),[b,_]=s(u(!0)),S=async()=>{_(!0);try{const e=await f();window.location.href=e}catch(e){p({type:"error",message:e})}finally{_(!1)}},D=async()=>{_(!0);try{await C();const e=await k();x(e)}catch(e){p({type:"error",message:e})}finally{_(!1)}},R=async()=>{_(!0);try{const e=await w();if(!e)throw Error(y("An error occured disconnecting"));p({type:"success",message:y("Disconnected")})}catch(e){p({type:"error",message:e})}finally{await(t&&t()),_(!1)}};return d(()=>{const e=async()=>{_(!0);try{const e=await k();x(e)}catch(e){p({type:"error",message:e})}finally{_(!1)}};e()},[k,p,_,x]),i.createElement(c,o({is:"section"},n),i.createElement(c,{withRichContent:!0,color:"neutral-800"},i.createElement("p",null,y("Cloud_workspace_connected"))),i.createElement(r,null,E?i.createElement(l,{primary:!0,danger:!0,disabled:b,onClick:D},y("Cloud_logout")):i.createElement(l,{primary:!0,disabled:b,onClick:S},y("Cloud_login_to_cloud"))),i.createElement(c,{withRichContent:!0,color:"neutral-800"},i.createElement("p",null,y("Cloud_workspace_disconnect"))),i.createElement(r,null,i.createElement(l,{primary:!0,danger:!0,disabled:b,onClick:R},y("Disconnect"))))}n.link("@babel/runtime/helpers/extends",{default(e){o=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.link("@rocket.chat/fuselage",{Box(e){c=e},Button(e){l=e},ButtonGroup(e){r=e}},0),n.link("@rocket.chat/fuselage-hooks",{useSafely(e){s=e}},1),n.link("react",{default(e){i=e},useState(e){u=e},useEffect(e){d=e}},2),n.link("../../../contexts/TranslationContext",{useTranslation(e){h=e}},3),n.link("../../../contexts/ServerContext",{useMethod(e){g=e}},4),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){m=e}},5),n.exportDefault(y)}

