function module(e,t,n){let o,a,l,s,r,c,i,d,u,k,m,h,T,x,_,p,f,g,A;n.link("@babel/runtime/helpers/extends",{default(e){o=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.link("@rocket.chat/fuselage",{Box(e){l=e},TextInput(e){s=e},Button(e){r=e},Field(e){c=e},FieldGroup(e){i=e},Margins(e){d=e},CheckBox(e){u=e}},0),n.link("@rocket.chat/fuselage-hooks",{useUniqueId(e){k=e}},1),n.link("react",{default(e){m=e},useCallback(e){h=e}},2),n.link("../../../contexts/ModalContext",{useSetModal(e){T=e}},3),n.link("../../../contexts/TranslationContext",{useTranslation(e){x=e}},4),n.link("../../../contexts/ServerContext",{useMethod(e){_=e}},5),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){p=e}},6),n.link("../../../contexts/UserContext",{useUserId(e){f=e}},7),n.link("../../../hooks/useForm",{useForm(e){g=e}},8),n.link("./InfoModal",{default(e){A=e}},9);const E={name:"",bypassTwoFactor:!1},C=e=>{let{onDidAddToken:t}=e,n=a(e,["onDidAddToken"]);const C=x(),I=_("personalAccessTokens:generateToken"),b=p(),F=T(),y=f(),{values:w,handlers:M,reset:P}=g(E),{name:B,bypassTwoFactor:D}=w,{handleName:U,handleBypassTwoFactor:v}=M,G=h(()=>F(null),[F]),S=h(async()=>{try{const e=await I({tokenName:B,bypassTwoFactor:D});F(m.createElement(A,{title:C("API_Personal_Access_Token_Generated"),content:m.createElement(l,{dangerouslySetInnerHTML:{__html:C("API_Personal_Access_Token_Generated_Text_Token_s_UserId_s",{token:e,userId:y})}}),confirmText:C("ok"),onConfirm:G})),P(),t()}catch(e){b({type:"error",message:e})}},[D,G,I,b,B,t,P,F,C,y]),L=k();return m.createElement(i,o({is:"form",marginBlock:"x8"},n),m.createElement(c,null,m.createElement(c.Row,null,m.createElement(d,{inlineEnd:"x4"},m.createElement(s,{value:B,onChange:U,placeholder:C("API_Add_Personal_Access_Token")})),m.createElement(r,{primary:!0,onClick:S},C("Add"))),m.createElement(c.Row,null,m.createElement(u,{id:L,checked:D,onChange:v}),m.createElement(c.Label,{htmlFor:L},C("Ignore")," ",C("Two Factor Authentication")))))};n.exportDefault(C)}
