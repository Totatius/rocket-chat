function module(e,t,n){var r,a,u,o,i,s,c,l,p,f,m,d,h,k,b,E,_,x,g,v,I,S,C,T,w,P,y,F,D,B,L,O;n.link("@babel/runtime/regenerator",{default:function(e){r=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},1),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){u=e}},2),n.link("@rocket.chat/fuselage",{Badge:function(e){o=e},Box:function(e){i=e},Button:function(e){s=e},ButtonGroup:function(e){c=e},Icon:function(e){l=e},Margins:function(e){p=e},Throbber:function(e){f=e},Tabs:function(e){m=e}},0),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){d=e},useSafely:function(e){h=e}},1),n.link("react",{default:function(e){k=e},useEffect:function(e){b=e},useState:function(e){E=e},useMemo:function(e){_=e}},2),n.link("underscore.string",{default:function(e){x=e}},3),n.link("meteor/meteor",{Meteor:function(e){g=e}},4),n.link("../../../components/Page",{default:function(e){v=e}},5),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){I=e}},6),n.link("../../../../app/importer/lib/ImporterProgressStep",{ProgressStep:function(e){S=e},ImportWaitingStates:function(e){C=e},ImportFileReadyStates:function(e){T=e},ImportPreparingStartedStates:function(e){w=e},ImportingStartedStates:function(e){P=e},ImportingErrorStates:function(e){y=e}},7),n.link("./useErrorHandler",{useErrorHandler:function(e){F=e}},8),n.link("../../../contexts/RouterContext",{useRoute:function(e){D=e}},9),n.link("../../../contexts/ServerContext",{useEndpoint:function(e){B=e}},10),n.link("./PrepareUsers",{default:function(e){L=e}},11),n.link("./PrepareChannels",{default:function(e){O=e}},12);var U=function(e,t){return new Promise((function(n,r){var a=function(){e().then((function(e){t(e)?n(e):setTimeout(a,1e3)}),r)};a()}))};function M(){var e=I(),t=F(),n=h(E(!0)),M=u(n,2),R=M[0],j=M[1],G=h(E(null)),H=u(G,2),W=H[0],N=H[1],A=h(E(null)),V=u(A,2),q=V[0],z=V[1],J=h(E(0)),K=u(J,2),Q=K[0],X=K[1],Y=E([]),Z=u(Y,2),$=Z[0],ee=Z[1],te=E([]),ne=u(te,2),re=ne[0],ae=ne[1],ue=h(E(!1)),oe=u(ue,2),ie=oe[0],se=oe[1],ce=_((function(){return $.filter((function(e){var t;return e.do_import})).length}),[$]),le=_((function(){return re.filter((function(e){var t;return e.do_import})).length}),[re]),pe=D("admin-import"),fe=D("admin-import-new"),me=D("admin-import-progress"),de=B("GET","getImportFileData"),he=B("GET","getCurrentImportOperation"),ke=B("POST","startImport");b((function(){var e=new g.Streamer("importers"),t=function(e){var t=e.rate;N(t)};return e.on("progress",t),function(){e.removeListener("progress",t)}}),[N]),b((function(){var n=function(){function n(){var n;return r.async(function(){function u(u){for(;;)switch(u.prev=u.next){case 0:return u.prev=0,u.next=3,r.awrap(U(de,(function(e){return e&&!e.waiting})));case 3:if(n=u.sent){u.next=8;break}return t(e("Importer_not_setup")),pe.push(),u.abrupt("return");case 8:if(!n.step){u.next=12;break}return t(e("Failed_To_Load_Import_Data")),pe.push(),u.abrupt("return");case 12:X(n.message_count),ee(n.users.map((function(e){return a({},e,{do_import:!0})}))),ae(n.channels.map((function(e){return a({},e,{do_import:!0})}))),j(!1),N(null),u.next=23;break;case 19:u.prev=19,u.t0=u.catch(0),t(u.t0,e("Failed_To_Load_Import_Data")),pe.push();case 23:case"end":return u.stop()}}return u}(),null,null,[[0,19]],Promise)}return n}(),u;(function(){function a(){var a,u;return r.async(function(){function o(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,r.awrap(U(he,(function(e){var t=e.operation;return t.valid&&!C.includes(t.status)})));case 3:if(a=o.sent,(u=a.operation).valid){o.next=8;break}return fe.push(),o.abrupt("return");case 8:if(!P.includes(u.status)){o.next=11;break}return me.push(),o.abrupt("return");case 11:if(u.status!==S.USER_SELECTION&&!w.includes(u.status)&&!T.includes(u.status)){o.next=15;break}return z(u.status),n(),o.abrupt("return");case 15:if(!y.includes(u.status)){o.next=19;break}return t(e("Import_Operation_Failed")),pe.push(),o.abrupt("return");case 19:if(u.status!==S.DONE){o.next=22;break}return pe.push(),o.abrupt("return");case 22:t(e("Unknown_Import_State")),pe.push(),o.next=30;break;case 26:o.prev=26,o.t0=o.catch(0),t(e("Failed_To_Load_Import_Data")),pe.push();case 30:case"end":return o.stop()}}return o}(),null,null,[[0,26]],Promise)}return a})()()}),[he,de,t,pe,me,fe,X,j,N,z,e]);var be=function(){pe.push()},Ee=function(){function n(){return r.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:return se(!0),n.prev=1,n.next=4,r.awrap(ke({input:{users:$,channels:re}}));case 4:me.push(),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(1),t(n.t0,e("Failed_To_Start_Import")),pe.push();case 11:case"end":return n.stop()}}return n}(),null,null,[[1,7]],Promise)}return n}(),_e=E("users"),xe=u(_e,2),ge=xe[0],ve=xe[1],Ie=_((function(){return function(e){return function(){return ve(e)}}}),[]),Se=d(q,100);return k.createElement(v,null,k.createElement(v.Header,{title:e("Importing_Data")},k.createElement(c,null,k.createElement(s,{ghost:!0,onClick:be},k.createElement(l,{name:"back"})," ",e("Back_to_imports")),k.createElement(s,{primary:!0,disabled:ie,onClick:Ee},e("Importer_Prepare_Start_Import")))),k.createElement(v.ScrollableContentWithShadow,null,k.createElement(i,{marginInline:"auto",marginBlock:"x24",width:"full",maxWidth:"590px"},k.createElement(i,{is:"h2",fontScale:"p2"},Se&&e(Se.replace("importer_","importer_status_"))),!R&&k.createElement(m,{flexShrink:0},k.createElement(m.Item,{disabled:0===ce,selected:"users"===ge,onClick:Ie("users")},e("Users")," ",k.createElement(o,null,ce)),k.createElement(m.Item,{selected:"channels"===ge,onClick:Ie("channels")},e("Channels")," ",k.createElement(o,null,le)),k.createElement(m.Item,{disabled:!0},e("Messages"),k.createElement(o,null,Q))),k.createElement(p,{block:"x24"},R&&k.createElement(k.Fragment,null,W?k.createElement(i,{display:"flex",justifyContent:"center",fontScale:"p1"},k.createElement(i,{is:"progress",value:(10*W).toFixed(0),max:"1000",marginInlineEnd:"x24"}),k.createElement(i,{is:"span"},x.numberFormat(W,0),"%")):k.createElement(f,{justifyContent:"center"})),!R&&"users"===ge&&k.createElement(L,{usersCount:ce,users:$,setUsers:ee}),!R&&"channels"===ge&&k.createElement(O,{channels:re,channelsCount:le,setChannels:ae})))))}n.exportDefault(M)}
