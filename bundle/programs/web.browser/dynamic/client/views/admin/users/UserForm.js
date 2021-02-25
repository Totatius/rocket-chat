function module(e,l,n){let t,a,r,o,m,c,s,i,u,d,E,f,w,h,x,p,C,g,b,R;function k(e){let{formValues:l,formHandlers:n,availableRoles:k,append:S,prepend:v}=e,_=a(e,["formValues","formHandlers","availableRoles","append","prepend"]);const G=C(),[y,F]=c(!1),{name:D,username:I,email:L,verified:j,statusText:P,bio:T,nickname:z,password:V,setRandomPassword:B,requirePasswordChange:N,roles:q,customFields:M,joinDefaultChannels:W,sendWelcomeEmail:H}=l,{handleName:J,handleUsername:U,handleEmail:A,handleVerified:K,handleStatusText:O,handleBio:Q,handleNickname:X,handlePassword:Y,handleSetRandomPassword:Z,handleRequirePasswordChange:$,handleRoles:ee,handleCustomFields:le,handleJoinDefaultChannels:ne,handleSendWelcomeEmail:te}=n,ae=o(e=>F(e),[]);return r.createElement(b.ScrollableContent,t({is:"form",onSubmit:o(e=>e.preventDefault(),[])},_),r.createElement(p,null,v,m(()=>r.createElement(s,null,r.createElement(s.Label,null,G("Name")),r.createElement(s.Row,null,r.createElement(i,{flexGrow:1,value:D,onChange:J}))),[G,D,J]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,G("Username")),r.createElement(s.Row,null,r.createElement(i,{flexGrow:1,value:I,onChange:U,addon:r.createElement(h,{name:"at",size:"x20"})}))),[G,I,U]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,G("Email")),r.createElement(s.Row,null,r.createElement(i,{flexGrow:1,value:L,error:!g(L)&&L.length>0?"error":void 0,onChange:A,addon:r.createElement(h,{name:"mail",size:"x20"})})),r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",mbs:"x4"},r.createElement(f,null,G("Verified")),r.createElement(w,{checked:j,onChange:K})))),[G,L,A,j,K]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,G("StatusMessage")),r.createElement(s.Row,null,r.createElement(i,{flexGrow:1,value:P,onChange:O,addon:r.createElement(h,{name:"edit",size:"x20"})}))),[G,P,O]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,G("Bio")),r.createElement(s.Row,null,r.createElement(u,{rows:3,flexGrow:1,value:T,onChange:Q,addon:r.createElement(h,{name:"edit",size:"x20",alignSelf:"center"})}))),[T,Q,G]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,G("Nickname")),r.createElement(s.Row,null,r.createElement(i,{flexGrow:1,value:z,onChange:X,addon:r.createElement(h,{name:"edit",size:"x20",alignSelf:"center"})}))),[z,X,G]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,G("Password")),r.createElement(s.Row,null,r.createElement(d,{autoComplete:"off",flexGrow:1,value:V,onChange:Y,addon:r.createElement(h,{name:"key",size:"x20"})}))),[G,V,Y]),m(()=>r.createElement(s,null,r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},r.createElement(f,null,G("Require_password_change")),r.createElement(w,{disabled:B,checked:B||N,onChange:$})))),[G,B,N,$]),m(()=>r.createElement(s,null,r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},r.createElement(f,null,G("Set_random_password_and_send_by_email")),r.createElement(w,{checked:B,onChange:Z})))),[G,B,Z]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,G("Roles")),r.createElement(s.Row,null,r.createElement(E,{options:k,value:q,onChange:ee,placeholder:G("Select_role"),flexShrink:1}))),[k,ee,q,G]),m(()=>ne&&r.createElement(s,null,r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},r.createElement(f,null,G("Join_default_channels")),r.createElement(w,{checked:W,onChange:ne})))),[ne,G,W]),m(()=>te&&r.createElement(s,null,r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},r.createElement(f,null,G("Send_welcome_email")),r.createElement(w,{checked:H,onChange:te})))),[te,G,H]),y&&r.createElement(r.Fragment,null,r.createElement(x,null),r.createElement(f,{fontScale:"s2"},G("Custom_Fields"))),r.createElement(R,{onLoadFields:ae,customFieldsData:M,setCustomFieldsData:le}),S))}n.link("@babel/runtime/helpers/extends",{default(e){t=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.export({default:()=>k}),n.link("react",{default(e){r=e},useCallback(e){o=e},useMemo(e){m=e},useState(e){c=e}},0),n.link("@rocket.chat/fuselage",{Field(e){s=e},TextInput(e){i=e},TextAreaInput(e){u=e},PasswordInput(e){d=e},MultiSelectFiltered(e){E=e},Box(e){f=e},ToggleSwitch(e){w=e},Icon(e){h=e},Divider(e){x=e},FieldGroup(e){p=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation(e){C=e}},2),n.link("../../../../app/utils/lib/isEmail.js",{isEmail(e){g=e}},3),n.link("../../../components/VerticalBar",{default(e){b=e}},4),n.link("../../../components/CustomFieldsForm",{default(e){R=e}},5)}
