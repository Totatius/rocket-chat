function module(e,t,r){let l,a,n,i,c,s,o,d,m,u,g,_,k,h,S,p,E,v,b,R,f,x,y;r.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),r.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},1),r.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},2),r.link("@rocket.chat/fuselage",{Box(e){i=e},CheckBox(e){c=e},Field(e){s=e},Icon(e){o=e},Margins(e){d=e},RadioButton(e){m=e}},0),r.link("@rocket.chat/fuselage-hooks",{useAutoFocus(e){u=e},useMergedRefs(e){g=e},useUniqueId(e){_=e}},1),r.link("react",{default(e){k=e},useRef(e){h=e},useState(e){S=e}},2),r.link("../../../contexts/ServerContext",{useMethod(e){p=e}},3),r.link("../../../contexts/SettingsContext",{useSettingsDispatch(e){E=e}},4),r.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){v=e}},5),r.link("../../../contexts/TranslationContext",{useTranslation(e){b=e}},6),r.link("../Pager",{Pager(e){R=e}},7),r.link("../SetupWizardState",{useSetupWizardContext(e){f=e}},8),r.link("../Step",{Step(e){x=e}},9),r.link("../StepHeader",{StepHeader(e){y=e}},10);const C=k.forwardRef((e,t)=>{let{children:r,label:c,selected:o,disabled:d}=e,u=n(e,["children","label","selected","disabled"]);const S=h(),p=g(t,S),E=_();return k.createElement(i,{className:["SetupWizard__RegisterServerStep-option",o&&"SetupWizard__RegisterServerStep-option--selected"].filter(Boolean).join(" "),display:"block",marginBlock:"x8",padding:"x24",color:o?"primary":"disabled",style:a({borderColor:"currentColor",borderRadius:2,borderWidth:2,cursor:"pointer"},d&&{opacity:.25}),onClick:()=>{S.current.click()}},k.createElement(s,null,k.createElement(s.Row,null,k.createElement(m,l({ref:p,id:E,checked:o,disabled:d},u)),k.createElement(s.Label,{htmlFor:E},c))),r)}),T=e=>k.createElement(i,l({is:"ul",marginBlock:"x16"},e)),w=e=>{let{children:t,icon:r}=e,a=n(e,["children","icon"]);return(k.createElement(i,l({is:"li",marginBlockEnd:"x8",display:"flex",alignItems:"center",color:"default"},a),"check"===r&&k.createElement(o,{name:"check",size:"x20",marginInlineEnd:"x8",color:"primary"}),"circle"===r&&k.createElement(o,{name:"circle",size:"x8",marginInlineStart:"x8",marginInlineEnd:"x12",color:"default"}),t))};function I(e){let{step:t,title:r,active:l}=e;const{canDeclineServerRegistration:a,goToPreviousStep:n,goToFinalStep:o}=f(),[m,g]=S(!0),[h,I]=S(!0),[P,B]=S(!1),A=b(),[M,F]=S(!1),W=E(),z=p("cloud:registerWorkspace"),D=v(),j=()=>{n()},q=async e=>{e.preventDefault(),F(!0);try{if(m&&!P)throw new Object({error:"Register_Server_Terms_Alert"});await W([{_id:"Statistics_reporting",value:m},{_id:"Apps_Framework_enabled",value:m},{_id:"Register_Server",value:m},{_id:"Allow_Marketing_Emails",value:h},{_id:"Cloud_Service_Agree_PrivacyTerms",value:P}]),m&&await z(),F(!1),o()}catch(t){D({type:"error",message:t}),F(!1)}},L=u(l),O=_(),H=_();return k.createElement(x,{active:l,working:M,onSubmit:q},k.createElement(y,{number:t,title:r}),k.createElement(d,{blockEnd:"x32"},k.createElement(i,null,k.createElement(i,{is:"p",fontScale:"s1",color:"hint",marginBlockEnd:"x16"},A("Register_Server_Info")),k.createElement(i,{display:"flex",flexDirection:"column"},k.createElement(C,{ref:L,"data-qa":"register-server",label:A("Register_Server_Registered"),name:"registerServer",value:"true",selected:m,onChange:e=>{let{currentTarget:{checked:t}}=e;g(t),I(t)}},k.createElement(T,null,k.createElement(w,{icon:"check"},A("Register_Server_Registered_Push_Notifications")),k.createElement(w,{icon:"check"},A("Register_Server_Registered_Livechat")),k.createElement(w,{icon:"check"},A("Register_Server_Registered_OAuth")),k.createElement(w,{icon:"check"},A("Register_Server_Registered_Marketplace"))),k.createElement(s,null,k.createElement(s.Row,null,k.createElement(c,{id:H,name:"optInMarketingEmails",value:"true",disabled:!m,checked:h,onChange:e=>{let{currentTarget:{checked:t}}=e;I(t)}}),k.createElement(s.Label,{htmlFor:H},A("Register_Server_Opt_In"))))),k.createElement(C,{"data-qa":"register-server-standalone",label:A("Register_Server_Standalone"),name:"registerServer",value:"false",disabled:!a,selected:!m,onChange:e=>{let{currentTarget:{checked:t}}=e;g(!t),I(!t),B(!t)}},k.createElement(T,null,k.createElement(w,{icon:"circle"},A("Register_Server_Standalone_Service_Providers")),k.createElement(w,{icon:"circle"},A("Register_Server_Standalone_Update_Settings")),k.createElement(w,{icon:"circle"},A("Register_Server_Standalone_Own_Certificates")))),k.createElement(d,{all:"x16"},k.createElement(s,null,k.createElement(s.Row,null,k.createElement(c,{id:O,name:"agreeTermsAndPrivacy","data-qa":"agree-terms-and-privacy",disabled:!m,checked:P,onChange:e=>{let{currentTarget:{checked:t}}=e;B(t)}}),k.createElement(s.Label,{htmlFor:O},A("Register_Server_Registered_I_Agree")," ",k.createElement("a",{href:"https://rocket.chat/terms"},A("Terms"))," & ",k.createElement("a",{href:"https://rocket.chat/privacy"},A("Privacy_Policy"))))))))),k.createElement(R,{disabled:M,onBackClick:j}))}r.exportDefault(I)}
