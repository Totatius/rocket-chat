function module(e,n,t){var l,a,r,o,u,c,i,s,m,p,d,E,f,v,h,w,b,S,x,k,C,g,_,P,I,y,L,D,R,A;t.link("@babel/runtime/regenerator",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},1),t.export({EmailInboxEditWithData:function(){return M},default:function(){return F}}),t.link("react",{default:function(e){r=e},useCallback:function(e){o=e},useState:function(e){u=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){c=e}},1),t.link("@rocket.chat/fuselage",{Accordion:function(e){i=e},Button:function(e){s=e},ButtonGroup:function(e){m=e},TextInput:function(e){p=e},TextAreaInput:function(e){d=e},Field:function(e){E=e},ToggleSwitch:function(e){f=e},FieldGroup:function(e){v=e},Box:function(e){h=e},Margins:function(e){w=e}},2),t.link("../../../components/AutoCompleteDepartment",{AutoCompleteDepartment:function(e){b=e}},3),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){S=e}},4),t.link("../../../contexts/RouterContext",{useRoute:function(e){x=e}},5),t.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){k=e}},6),t.link("../../../components/Page",{default:function(e){C=e}},7),t.link("../../../hooks/useForm",{useForm:function(e){g=e}},8),t.link("../../../hooks/useEndpointAction",{useEndpointAction:function(e){_=e}},9),t.link("../../../../app/utils",{isEmail:function(e){P=e}},10),t.link("../../../hooks/useEndpointData",{useEndpointData:function(e){I=e}},11),t.link("../../../hooks/useAsyncState",{AsyncStatePhase:function(e){y=e}},12),t.link("./Skeleton",{FormSkeleton:function(e){L=e}},13),t.link("../../../components/DeleteWarningModal",{default:function(e){D=e}},14),t.link("../../../contexts/ModalContext",{useSetModal:function(e){R=e}},15),t.link("../../../hooks/useComponentDidUpdate",{useComponentDidUpdate:function(e){A=e}},16);var T={active:!0,name:"",email:"",description:"",senderInfo:"",department:"",smtpServer:"",smtpPort:587,smtpUsername:"",smtpPassword:"",smtpSecure:!1,imapServer:"",imapPort:993,imapUsername:"",imapPassword:"",imapSecure:!1},U=function(e){var n,t,l,a,r,o,u,c,i,s;if(!e)return T;var m=e.active,p=e.name,d=e.email,E=e.description,f=e.senderInfo,v=e.department,h=e.smtp,w=e.imap;return{active:null==m||m,name:null!=p?p:"",email:null!=d?d:"",description:null!=E?E:"",senderInfo:null!=f?f:"",department:null!=v?v:"",smtpServer:null!==(n=h.server)&&void 0!==n?n:"",smtpPort:null!==(t=h.port)&&void 0!==t?t:587,smtpUsername:null!==(l=h.username)&&void 0!==l?l:"",smtpPassword:null!==(a=h.password)&&void 0!==a?a:"",smtpSecure:null!==(r=h.secure)&&void 0!==r&&r,imapServer:null!==(o=w.server)&&void 0!==o?o:"",imapPort:null!==(u=w.port)&&void 0!==u?u:993,imapUsername:null!==(c=w.username)&&void 0!==c?c:"",imapPassword:null!==(i=w.password)&&void 0!==i?i:"",imapSecure:null!==(s=w.secure)&&void 0!==s&&s}};function M(e){var n=e.id,t=S(),l=I("email-inbox/"+n),a=l.value,o=l.error,u;return[l.phase].includes(y.LOADING)?r.createElement(L,null):o||!a?r.createElement(h,{mbs:"x16"},t("EmailInbox_not_found")):r.createElement(F,{id:n,data:a})}function F(e){var n=e.id,t=e.data,I=S(),y=k(),L=R(),T=u(),M=a(T,2),F=M[0],O=M[1],W=g(U(t)),B=W.values,G=W.handlers,j=W.hasUnsavedChanges,N=G.handleActive,H=G.handleName,V=G.handleEmail,Y=G.handleDescription,q=G.handleSenderInfo,z=G.handleDepartment,J=G.handleSmtpServer,K=G.handleSmtpPort,Q=G.handleSmtpUsername,X=G.handleSmtpPassword,Z=G.handleSmtpSecure,$=G.handleImapServer,ee=G.handleImapPort,ne=G.handleImapUsername,te=G.handleImapPassword,le=G.handleImapSecure,ae=B.active,re=B.name,oe=B.email,ue=B.description,ce=B.senderInfo,ie=B.department,se=B.smtpServer,me=B.smtpPort,pe=B.smtpUsername,de=B.smtpPassword,Ee=B.smtpSecure,fe=B.imapServer,ve=B.imapPort,he=B.imapUsername,we=B.imapPassword,be=B.imapSecure,Se=x("admin-email-inboxes"),xe=o((function(){return Se.push({})}),[Se]),ke=_("POST","email-inbox"),Ce=_("DELETE","email-inbox/"+n),ge=_("GET","email-inbox.search?email="+oe);A((function(){O(P(oe)?null:I("Validate_email_address"))}),[I,oe]),A((function(){!oe&&O(null)}),[oe]);var _e=c(function(){function e(){var e;return l.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.awrap(Ce());case 2:!0===(e=n.sent).success&&xe();case 4:case"end":return n.stop()}}return n}(),null,null,null,Promise)}return e}()),Pe=c((function(e){e.stopPropagation();var n=function(){function e(){return l.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.awrap(_e());case 3:y({type:"success",message:I("Removed")}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),y({type:"error",message:e.t0});case 9:L();case 10:case"end":return e.stop()}}return e}(),null,null,[[0,6]],Promise)}return e}();L(r.createElement(D,{onDelete:n,onCancel:function(){return L()}},I("You_will_not_be_able_to_recover_email_inbox")))})),Ie=c(function(){function e(){var e,t,a;return l.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:return e={server:se,port:parseInt(me),username:pe,password:de,secure:Ee},t={server:fe,port:parseInt(ve),username:he,password:we,secure:be},a={active:ae,name:re,email:oe,description:ue,senderInfo:ce,department:ie,smtp:e,imap:t},n&&(a._id=n),r.prev=4,r.next=7,l.awrap(ke(a));case 7:y({type:"success",message:I("Saved")}),xe(),r.next=14;break;case 11:r.prev=11,r.t0=r.catch(4),y({type:"error",message:r.t0});case 14:case"end":return r.stop()}}return r}(),null,null,[[4,11]],Promise)}return e}()),ye=c(function(){function e(){var e,t;return l.async(function(){function a(a){for(;;)switch(a.prev=a.next){case 0:if(oe||P(oe)){a.next=2;break}return a.abrupt("return");case 2:return a.next=4,l.awrap(ge());case 4:if(e=a.sent,(t=e.emailInbox)&&(!n||t._id!==n)){a.next=8;break}return a.abrupt("return");case 8:O(I("Email_already_exists"));case 9:case"end":return a.stop()}}return a}(),null,null,null,Promise)}return e}()),Le=j&&re&&oe&&P(oe)&&!F&&se&&me&&pe&&de&&fe&&ve&&he&&we;return r.createElement(C.ScrollableContentWithShadow,null,r.createElement(h,{maxWidth:"x600",w:"full",alignSelf:"center"},r.createElement(i,null,r.createElement(i.Item,{defaultExpanded:!0,title:I("Inbox_Info")},r.createElement(v,null,r.createElement(E,null,r.createElement(E.Label,{display:"flex",justifyContent:"space-between",w:"full"},I("Active"),r.createElement(f,{checked:ae,onChange:N}))),r.createElement(E,null,r.createElement(E.Label,null,I("Name"),"*"),r.createElement(E.Row,null,r.createElement(p,{value:re,onChange:H}))),r.createElement(E,null,r.createElement(E.Label,null,I("Email"),"*"),r.createElement(E.Row,null,r.createElement(p,{onBlur:ye,error:F,value:oe,onChange:V})),r.createElement(E.Error,null,I(F))),r.createElement(E,null,r.createElement(E.Label,null,I("Description")),r.createElement(E.Row,null,r.createElement(d,{value:ue,rows:4,onChange:Y}))),r.createElement(E,null,r.createElement(E.Label,null,I("Sender_Info")),r.createElement(E.Row,null,r.createElement(p,{value:ce,onChange:q,placeholder:I("Optional")})),r.createElement(E.Hint,null,I("Will_Appear_In_From"))),r.createElement(E,null,r.createElement(E.Label,null,I("Department")),r.createElement(E.Row,null,r.createElement(b,{value:ie,onChange:z})),r.createElement(E.Hint,null,I("Only_Members_Selected_Department_Can_View_Channel"))))),r.createElement(i.Item,{title:I("Configure_Outgoing_Mail_SMTP")},r.createElement(v,null,r.createElement(E,null,r.createElement(E.Label,null,I("Server"),"*"),r.createElement(E.Row,null,r.createElement(p,{value:se,onChange:J}))),r.createElement(E,null,r.createElement(E.Label,null,I("Port"),"*"),r.createElement(E.Row,null,r.createElement(p,{type:"number",value:me,onChange:K}))),r.createElement(E,null,r.createElement(E.Label,null,I("Username"),"*"),r.createElement(E.Row,null,r.createElement(p,{value:pe,onChange:Q}))),r.createElement(E,null,r.createElement(E.Label,null,I("Password"),"*"),r.createElement(E.Row,null,r.createElement(p,{type:"password",value:de,onChange:X}))),r.createElement(E,null,r.createElement(E.Label,{display:"flex",justifyContent:"space-between",w:"full"},I("Connect_SSL_TLS"),r.createElement(f,{checked:Ee,onChange:Z}))))),r.createElement(i.Item,{title:I("Configure_Incoming_Mail_IMAP")},r.createElement(v,null,r.createElement(E,null,r.createElement(E.Label,null,I("Server"),"*"),r.createElement(E.Row,null,r.createElement(p,{value:fe,onChange:$}))),r.createElement(E,null,r.createElement(E.Label,null,I("Port"),"*"),r.createElement(E.Row,null,r.createElement(p,{type:"number",value:ve,onChange:ee}))),r.createElement(E,null,r.createElement(E.Label,null,I("Username"),"*"),r.createElement(E.Row,null,r.createElement(p,{value:he,onChange:ne}))),r.createElement(E,null,r.createElement(E.Label,null,I("Password"),"*"),r.createElement(E.Row,null,r.createElement(p,{type:"password",value:we,onChange:te}))),r.createElement(E,null,r.createElement(E.Label,{display:"flex",justifyContent:"space-between",w:"full"},I("Connect_SSL_TLS"),r.createElement(f,{checked:be,onChange:le}))))),r.createElement(E,null,r.createElement(E.Row,null,r.createElement(m,{stretch:!0,w:"full"},r.createElement(s,{onClick:xe},I("Cancel")),r.createElement(s,{disabled:!Le,primary:!0,onClick:Ie},I("Save")))),r.createElement(E.Row,null,r.createElement(w,{blockStart:"x16"},r.createElement(m,{stretch:!0,w:"full"},n&&r.createElement(s,{primary:!0,danger:!0,onClick:Pe},I("Delete")))))))))}}

