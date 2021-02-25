function module(e,n,t){var a,r,l,o,u,i,c,s,m,f,d,h,p,k,v,E,b,x,C,_,w,D,F,g,y,T;t.link("@babel/runtime/regenerator",{default:function(e){a=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},1),t.export({ContactEditWithData:function(){return P},ContactNewEdit:function(){return A}}),t.link("react",{default:function(e){l=e},useState:function(e){o=e},useMemo:function(e){u=e}},0),t.link("@rocket.chat/fuselage",{Field:function(e){i=e},TextInput:function(e){c=e},ButtonGroup:function(e){s=e},Button:function(e){m=e},Box:function(e){f=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){d=e}},2),t.link("use-subscription",{useSubscription:function(e){h=e}},3),t.link("../../contexts/TranslationContext",{useTranslation:function(e){p=e}},4),t.link("../../components/VerticalBar",{default:function(e){k=e}},5),t.link("../../hooks/useForm",{useForm:function(e){v=e}},6),t.link("../../../app/utils",{isEmail:function(e){E=e}},7),t.link("../../hooks/useComponentDidUpdate",{useComponentDidUpdate:function(e){b=e}},8),t.link("../../hooks/useEndpointAction",{useEndpointAction:function(e){x=e}},9),t.link("../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){C=e}},10),t.link("../../hooks/useEndpointData",{useEndpointData:function(e){_=e}},11),t.link("./Skeleton",{FormSkeleton:function(e){w=e}},12),t.link("../../components/CustomFieldsForm",{default:function(e){D=e}},13),t.link("../../../app/authorization",{hasAtLeastOnePermission:function(e){F=e}},14),t.link("../../hooks/useAsyncState",{AsyncStatePhase:function(e){g=e}},15),t.link("../../views/omnichannel/additionalForms",{formsSubscription:function(e){y=e}},16),t.link("../../components/helpers",{createToken:function(e){T=e}},17);var S={token:"",name:"",email:"",phone:"",username:""},G=function(e){var n;if(!e)return S;var t=e.contact,a=t.name,r=t.token,l=t.phone,o=t.visitorEmails,u=t.livechatData,i=t.contactManager;return{token:null!=r?r:"",name:null!=a?a:"",email:o?o[0].address:"",phone:l?l[0].phoneNumber:"",livechatData:null!=u?u:"",username:null!==(n=null==i?void 0:i.username)&&void 0!==n?n:""}};function P(e){var n=e.id,t=e.reload,a=e.close,r=p(),o=_("omnichannel/contact?contactId="+n),u=o.value,i=o.phase,c=o.error;return[i].includes(g.LOADING)?l.createElement(w,null):!c&&u&&u.contact?l.createElement(A,{id:n,data:u,reload:t,close:a}):l.createElement(f,{mbs:"x16"},r("Contact_not_found"))}function A(e){var n=e.id,t=e.data,f=e.reload,S=e.close,P=p(),A=function(){return F(["view-livechat-room-customfields","edit-livechat-room-customfields"])},L=v(G(t)),M=L.values,N=L.handlers,B,V=h(y).useContactManager,q,I=(void 0===V?function(){}:V)(),O=N.handleName,R=N.handleEmail,U=N.handlePhone,j=N.handleUsername,z=M.token,W=M.name,H=M.email,J=M.phone,K=M.username,Q=v({livechatData:M.livechatData}),X=Q.values,Y,Z=Q.handlers.handleLivechatData,$=X.livechatData,ee=o(),ne=r(ee,2),te=ne[0],ae=ne[1],re=o(),le=r(re,2),oe=le[0],ue=le[1],ie=o(),ce=r(ie,2),se=ce[0],me=ce[1],fe=o([]),de=r(fe,2),he=de[0],pe=de[1],ke=_("livechat/custom-fields"),ve=ke.value,Ee=ke.phase,be=function(e){var n={};return e.map((function(e){var t=e._id,a=e.label,r=e.visibility,l=e.options,o=e.scope,u=e.defaultValue,i=e.required;return"visible"===r&"visitor"===o&&(n[t]={label:a,type:l?"select":"text",required:i,defaultValue:u,options:l&&l.split(",").map((function(e){return e.trim()}))})})),n},xe=u((function(){return ve&&ve.customFields?be(ve.customFields):{}}),[ve]),Ce=x("POST","omnichannel/contact"),_e=x("GET","omnichannel/contact.search?email="+H),we=x("GET","omnichannel/contact.search?phone="+J),De=d(function(){function e(){var e,t;return a.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:if(E(H)){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,a.awrap(_e());case 4:if(e=r.sent,(t=e.contact)&&(!n||t._id!==n)){r.next=8;break}return r.abrupt("return",ue(null));case 8:ue(P("Email_already_exists"));case 9:case"end":return r.stop()}}return r}(),null,null,null,Promise)}return e}()),Fe=d(function(){function e(){var e,t;return a.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:if(J){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,a.awrap(we());case 4:if(e=r.sent,(t=e.contact)&&(!n||t._id!==n)){r.next=8;break}return r.abrupt("return",me(null));case 8:me(P("Phone_already_exists"));case 9:case"end":return r.stop()}}return r}(),null,null,null,Promise)}return e}()),ge=C();b((function(){ae(W?"":P("The_field_is_required",P("Name")))}),[P,W]),b((function(){ue(H&&!E(H)?P("Validate_email_address"):null)}),[P,H]),b((function(){!J&&me(null)}),[J]);var ye=d(function(){function e(e){var t,r;return a.async(function(){function l(l){for(;;)switch(l.prev=l.next){case 0:if(e.preventDefault(),t=!1,W||(ae(P("The_field_is_required","name")),t=!0),H&&!E(H)&&(ue(P("Validate_email_address")),t=!0),!t){l.next=6;break}return l.abrupt("return");case 6:return(r={name:W}).phone=J,r.email=H,r.customFields=$||{},r.contactManager=K?{username:K}:{},n?(r._id=n,r.token=z):r.token=T(),l.prev=12,l.next=15,a.awrap(Ce(r));case 15:ge({type:"success",message:P("Saved")}),f(),S(),l.next=23;break;case 20:l.prev=20,l.t0=l.catch(12),ge({type:"error",message:l.t0});case 23:case"end":return l.stop()}}return l}(),null,null,[[12,20]],Promise)}return e}()),Te=W&&!oe&&!se&&0===he.length;return[Ee].includes(g.LOADING)?l.createElement(w,null):l.createElement(l.Fragment,null,l.createElement(k.ScrollableContent,{is:"form"},l.createElement(i,null,l.createElement(i.Label,null,P("Name"),"*"),l.createElement(i.Row,null,l.createElement(c,{error:te,flexGrow:1,value:W,onChange:O})),l.createElement(i.Error,null,te)),l.createElement(i,null,l.createElement(i.Label,null,P("Email")),l.createElement(i.Row,null,l.createElement(c,{onBlur:De,error:oe,flexGrow:1,value:H,onChange:R})),l.createElement(i.Error,null,P(oe))),l.createElement(i,null,l.createElement(i.Label,null,P("Phone")),l.createElement(i.Row,null,l.createElement(c,{onBlur:Fe,error:se,flexGrow:1,value:J,onChange:U})),l.createElement(i.Error,null,P(se))),A()&&ve&&l.createElement(D,{jsonCustomFields:xe,customFieldsData:$,setCustomFieldsData:Z,setCustomFieldsError:pe}),I&&l.createElement(I,{value:K,handler:j})),l.createElement(k.Footer,null,l.createElement(s,{stretch:!0},l.createElement(m,{flexGrow:1,onClick:S},P("Cancel")),l.createElement(m,{mie:"none",flexGrow:1,onClick:ye,disabled:!Te,primary:!0},P("Save")))))}}

