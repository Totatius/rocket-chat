function module(e,t,l){let a,n,s,i,o,r,c,u,d,m,h,k,p,E,b,C,v,f,g,x,F,S,y,_;l.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},0),l.link("react",{default(e){n=e},useCallback(e){s=e},useState(e){i=e}},0),l.link("@rocket.chat/fuselage",{Box(e){o=e},Button(e){r=e},Icon(e){c=e},ButtonGroup(e){u=e},Callout(e){d=e},FieldGroup(e){m=e}},1),l.link("use-subscription",{useSubscription(e){h=e}},2),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){k=e}},3),l.link("./CustomFieldsForm",{default(e){p=e}},4),l.link("../../../components/Page",{default(e){E=e}},5),l.link("../../../components/PageSkeleton",{default(e){b=e}},6),l.link("../../../contexts/TranslationContext",{useTranslation(e){C=e}},7),l.link("../../../contexts/RouterContext",{useRouteParameter(e){v=e},useRoute(e){f=e}},8),l.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){g=e}},9),l.link("../../../contexts/ServerContext",{useMethod(e){x=e}},10),l.link("../additionalForms",{formsSubscription(e){F=e}},11),l.link("../../../hooks/useForm",{useForm(e){S=e}},12),l.link("../../../hooks/useEndpointData",{useEndpointData(e){y=e}},13),l.link("../../../hooks/useAsyncState",{AsyncStatePhase(e){_=e}},14);const D=e=>({id:e._id,field:e._id,label:e.label,scope:e.scope,visibility:"visible"===e.visibility,regexp:e.regexp}),w=e=>{let{reload:t}=e;const l=C(),a=v("id"),{value:s,phase:i,error:o}=y("livechat/custom-fields/".concat(a));return i===_.LOADING?n.createElement(b,null):s&&s.success&&s.customField&&!o?n.createElement(A,{customField:s.customField,id:a,reload:t}):n.createElement(E,null,n.createElement(E.Header,{title:l("Edit_Custom_Field")}),n.createElement(E.ScrollableContentWithShadow,null,n.createElement(d,{type:"danger"},l("Error"))))},A=e=>{let{customField:t,id:l,reload:d}=e;const b=C(),v=g(),[y,_]=i({}),{useCustomFieldsAdditionalForm:w=(()=>{})}=h(F),A=w(),B=f("omnichannel-customfields"),M=s(()=>{B.push({})},[B]),{values:P,handlers:T,hasUnsavedChanges:G}=S(D(t)),R=x("livechat:saveCustomField"),{hasError:W,data:H,hasUnsavedChanges:I}=y,{label:U,field:j}=P,z=!W&&U&&j&&(I||G),L=k(async()=>{try{await R(l,a({},H,{},P,{visibility:P.visibility?"visible":"hidden"})),v({type:"success",message:b("Saved")}),d(),B.push({})}catch(e){v({type:"error",message:e})}}),N=k(e=>{_(a({},y,{},e))});return n.createElement(E,null,n.createElement(E.Header,{title:b("Edit_Custom_Field")},n.createElement(u,{align:"end"},n.createElement(r,{onClick:M},n.createElement(c,{size:"x16",name:"back"}),b("Back")),n.createElement(r,{primary:!0,onClick:L,disabled:!z},b("Save")))),n.createElement(E.ScrollableContentWithShadow,null,n.createElement(o,{maxWidth:"x600",w:"full",alignSelf:"center"},n.createElement(m,null,n.createElement(p,{values:P,handlers:T}),A&&n.createElement(A,{onChange:N,state:P,data:t})))))};l.exportDefault(w)}
