function module(e,t,l){let a,r,n,o,s,i,c,u,x,f;l.link("@babel/runtime/helpers/extends",{default(e){a=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){r=e}},1),l.link("@rocket.chat/fuselage",{Box(e){n=e},Icon(e){o=e},Button(e){s=e},Scrollable(e){i=e}},0),l.link("react",{default(e){c=e},useCallback(e){u=e}},1),l.link("../contexts/TranslationContext",{useTranslation(e){x=e}},2),l.link("../contexts/ToastMessagesContext",{useToastMessageDispatch(e){f=e}},3);const p=e=>c.createElement(n,{fontFamily:"mono",alignSelf:"center",fontScale:"p1",style:{wordBreak:"break-all"},mie:"x4",flexGrow:1,maxHeight:"x108"},e),m=e=>{let{text:t,wrapper:l=p}=e,m=r(e,["text","wrapper"]);const d=x(),k=f(),g=u(()=>{try{navigator.clipboard.writeText(t),k({type:"success",message:d("Copied")})}catch(e){k({type:"error",message:e})}},[k,d,t]);return c.createElement(n,a({display:"flex",flexDirection:"row",justifyContent:"stretch",alignItems:"flex-start",flexGrow:1,padding:"x16",backgroundColor:"surface",width:"full"},m),c.createElement(i,{vertical:!0},l(t)),c.createElement(s,{ghost:!0,square:!0,small:!0,flexShrink:0,onClick:g,title:d("Copy")},c.createElement(o,{name:"copy",size:"x20"})))};l.exportDefault(m)}
