function module(e,n,t){let l,o,a,i,r,s,c,u,d,m,k,f,p,x;t.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default(e){o=e}},1),t.export({default:()=>E}),t.link("react",{default(e){a=e},useCallback(e){i=e},useMemo(e){r=e}},0),t.link("@rocket.chat/fuselage",{Field(e){s=e},Box(e){c=e},Margins(e){u=e},Button(e){d=e}},1),t.link("../../../../contexts/TranslationContext",{useTranslation(e){m=e}},2),t.link("../../../../contexts/RouterContext",{useRoute(e){k=e}},3),t.link("../../../../hooks/useEndpointAction",{useEndpointAction(e){f=e}},4),t.link("../../../../hooks/useForm",{useForm(e){p=e}},5),t.link("../IncomingWebhookForm",{default(e){x=e}},6);const b={enabled:!1,channel:"",username:"",name:"",alias:"",avatarUrl:"",emoji:"",scriptEnabled:!1,script:""};function E(e){const n=m(),t=k("admin-integrations"),{values:E,handlers:h,reset:g}=p(b),w=r(()=>o({},E,{type:"webhook-incoming"}),[E]),y=f("POST","integrations.create",w,n("Integration_added")),C=i(async()=>{const e=await y();e.success&&t.push({context:"edit",type:"incoming",id:e.integration._id})},[t,y]),F=r(()=>a.createElement(s,null,a.createElement(s.Row,null,a.createElement(c,{display:"flex",flexDirection:"row",justifyContent:"space-between",w:"full"},a.createElement(u,{inlineEnd:"x4"},a.createElement(d,{flexGrow:1,type:"reset",onClick:g},n("Reset")),a.createElement(d,{mie:"none",flexGrow:1,onClick:C},n("Save")))))),[C,g,n]);return a.createElement(x,l({formValues:E,formHandlers:h,append:F},e))}}

