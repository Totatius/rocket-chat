function module(e,t,n){var l,a,r,c,o,u,i,s,m,f,E,d,h,k,v,p,b,g,F,C,x,_,N,S;function y(){var e=c(["\n\tword-break: break-word;\n"]);return y=function(){return e},e}n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){a=e}},1),n.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},2),n.link("@babel/runtime/helpers/taggedTemplateLiteralLoose",{default:function(e){c=e}},3),n.export({ContactInfo:function(){return L}}),n.link("react",{default:function(e){o=e},useEffect:function(e){u=e},useState:function(e){i=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){s=e},Margins:function(e){m=e},ButtonGroup:function(e){f=e},Button:function(e){E=e},Icon:function(e){d=e}},1),n.link("@rocket.chat/css-in-js",{css:function(e){h=e}},2),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){k=e}},3),n.link("../../components/VerticalBar",{default:function(e){v=e}},4),n.link("../../components/UserCard",{default:function(e){p=e}},5),n.link("./Skeleton",{FormSkeleton:function(e){b=e}},6),n.link("../../hooks/useEndpointData",{useEndpointData:function(e){g=e}},7),n.link("../../contexts/TranslationContext",{useTranslation:function(e){F=e}},8),n.link("../../contexts/RouterContext",{useRoute:function(e){C=e}},9),n.link("../../../app/authorization",{hasPermission:function(e){x=e}},10),n.link("../../hooks/useFormatDate",{useFormatDate:function(e){_=e}},11),n.link("../../hooks/useAsyncState",{AsyncStatePhase:function(e){N=e}},12),n.link("../../../ee/client/omnichannel/ContactManager",{ContactManagerInfo:function(e){S=e}},13);var D=h(y()),I=function(e){return o.createElement(s,r({fontScale:"p2",color:"default"},e))},M=function(e){var t=e.className,n=a(e,["className"]);return(o.createElement(p.Info,r({className:[t,D],flexShrink:0},n)))},A=function(e){var t=e.id,n=e.value,l=F(),a=g("livechat/custom-fields/"+t),r=a.value,c=a.phase,u=a.error;if(c===N.LOADING)return o.createElement(b,null);if(u||!r||!r.customField)return o.createElement(s,{mbs:"x16"},l("Custom_Field_Not_Found"));var i=r.customField.label;return i&&o.createElement(s,null,o.createElement(I,null,i),o.createElement(M,null,n))};function L(e){var t=e.id,n=F(),a=C("omnichannel-directory"),r=g("livechat/custom-fields"),c=r.value,h=r.phase,p=i([]),y=l(p,2),D=y[0],L=y[1],B=_(),P=function(){return x("view-livechat-room-customfields")},T=k((function(){return a.push({tab:"contacts",context:"edit",id:t})}));u((function(){if(c){var e=c.customFields;L(e)}}),[c,h]);var j=g("omnichannel/contact?contactId="+t),w=j.value,G=j.phase,O=j.error,z,R=(w||{contact:{}}).contact,U=R.name,V=R.username,W=R.visitorEmails,q=R.phone,H=R.livechatData,J=R.ts,K=R.lastChat,Q=R.contactManager;if(G===N.LOADING)return o.createElement(b,null);if(O||!w||!w.contact)return o.createElement(s,{mbs:"x16"},n("Contact_not_found"));var X=function(e){var t=D.find((function(t){var n;return t._id===e}));return!(!t||"visible"!==t.visibility||"visitor"!==t.scope)};return(o.createElement(o.Fragment,null,o.createElement(v.ScrollableContent,{p:"x24"},o.createElement(m,{block:"x4"},V&&V!==U&&o.createElement(o.Fragment,null,o.createElement(I,null,n("Name")+" / "+n("Username")),o.createElement(M,null,U+"/"+V)),W&&W.length&&o.createElement(o.Fragment,null,o.createElement(I,null,n("Email")),o.createElement(M,null,W[0].address)),q&&q.length&&o.createElement(o.Fragment,null,o.createElement(I,null,n("Phone")),o.createElement(M,null,q[0].phoneNumber)),J&&o.createElement(o.Fragment,null,o.createElement(I,null,n("Created_at")),o.createElement(M,null,B(J))),K&&o.createElement(o.Fragment,null,o.createElement(I,null,n("Last_Chat")),o.createElement(M,null,B(K.ts))),P()&&H&&Object.keys(H).map((function(e){return X(e)&&H[e]&&o.createElement(A,{key:e,id:e,value:H[e]})})),Q&&o.createElement(o.Fragment,null,o.createElement(I,null,n("Contact_Manager")),o.createElement(S,{username:Q.username})))),o.createElement(v.Footer,null,o.createElement(f,{stretch:!0},o.createElement(E,{onClick:T},o.createElement(d,{name:"pencil",size:"x20"})," ",n("Edit"))))))}}

