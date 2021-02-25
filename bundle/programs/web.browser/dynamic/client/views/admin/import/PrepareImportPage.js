function module(e,t,r){let n,a,s,l,o,i,u,c,m,p,d,h,E,_,f,g,k,I,S,x,C,b,T,v,y,w,F,P,D,B;r.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),r.link("@rocket.chat/fuselage",{Badge(e){a=e},Box(e){s=e},Button(e){l=e},ButtonGroup(e){o=e},Icon(e){i=e},Margins(e){u=e},Throbber(e){c=e},Tabs(e){m=e}},0),r.link("@rocket.chat/fuselage-hooks",{useDebouncedValue(e){p=e},useSafely(e){d=e}},1),r.link("react",{default(e){h=e},useEffect(e){E=e},useState(e){_=e},useMemo(e){f=e}},2),r.link("underscore.string",{default(e){g=e}},3),r.link("meteor/meteor",{Meteor(e){k=e}},4),r.link("../../../components/Page",{default(e){I=e}},5),r.link("../../../contexts/TranslationContext",{useTranslation(e){S=e}},6),r.link("../../../../app/importer/lib/ImporterProgressStep",{ProgressStep(e){x=e},ImportWaitingStates(e){C=e},ImportFileReadyStates(e){b=e},ImportPreparingStartedStates(e){T=e},ImportingStartedStates(e){v=e},ImportingErrorStates(e){y=e}},7),r.link("./useErrorHandler",{useErrorHandler(e){w=e}},8),r.link("../../../contexts/RouterContext",{useRoute(e){F=e}},9),r.link("../../../contexts/ServerContext",{useEndpoint(e){P=e}},10),r.link("./PrepareUsers",{default(e){D=e}},11),r.link("./PrepareChannels",{default(e){B=e}},12);const L=(e,t)=>new Promise((r,n)=>{const a=()=>{e().then(e=>{t(e)?r(e):setTimeout(a,1e3)},n)};a()});function O(){const e=S(),t=w(),[r,O]=d(_(!0)),[U,M]=d(_(null)),[R,j]=d(_(null)),[G,H]=d(_(0)),[W,N]=_([]),[V,q]=_([]),[z,A]=d(_(!1)),J=f(()=>W.filter(e=>{let{do_import:t}=e;return t}).length,[W]),K=f(()=>V.filter(e=>{let{do_import:t}=e;return t}).length,[V]),Q=F("admin-import"),X=F("admin-import-new"),Y=F("admin-import-progress"),Z=P("GET","getImportFileData"),$=P("GET","getCurrentImportOperation"),ee=P("POST","startImport");E(()=>{const e=new k.Streamer("importers"),t=e=>{let{rate:t}=e;M(t)};return e.on("progress",t),()=>{e.removeListener("progress",t)}},[M]),E(()=>{const r=async()=>{try{const r=await L(Z,e=>e&&!e.waiting);if(!r)return t(e("Importer_not_setup")),void Q.push();if(r.step)return t(e("Failed_To_Load_Import_Data")),void Q.push();H(r.message_count),N(r.users.map(e=>n({},e,{do_import:!0}))),q(r.channels.map(e=>n({},e,{do_import:!0}))),O(!1),M(null)}catch(r){t(r,e("Failed_To_Load_Import_Data")),Q.push()}},a=async()=>{try{const{operation:n}=await L($,e=>{let{operation:t}=e;return t.valid&&!C.includes(t.status)});if(!n.valid)return void X.push();if(v.includes(n.status))return void Y.push();if(n.status===x.USER_SELECTION||T.includes(n.status)||b.includes(n.status))return j(n.status),void r();if(y.includes(n.status))return t(e("Import_Operation_Failed")),void Q.push();if(n.status===x.DONE)return void Q.push();t(e("Unknown_Import_State")),Q.push()}catch(n){t(e("Failed_To_Load_Import_Data")),Q.push()}};a()},[$,Z,t,Q,Y,X,H,O,M,j,e]);const te=()=>{Q.push()},re=async()=>{A(!0);try{await ee({input:{users:W,channels:V}}),Y.push()}catch(r){t(r,e("Failed_To_Start_Import")),Q.push()}},[ne,ae]=_("users"),se=f(()=>e=>()=>ae(e),[]),le=p(R,100);return h.createElement(I,null,h.createElement(I.Header,{title:e("Importing_Data")},h.createElement(o,null,h.createElement(l,{ghost:!0,onClick:te},h.createElement(i,{name:"back"})," ",e("Back_to_imports")),h.createElement(l,{primary:!0,disabled:z,onClick:re},e("Importer_Prepare_Start_Import")))),h.createElement(I.ScrollableContentWithShadow,null,h.createElement(s,{marginInline:"auto",marginBlock:"x24",width:"full",maxWidth:"590px"},h.createElement(s,{is:"h2",fontScale:"p2"},le&&e(le.replace("importer_","importer_status_"))),!r&&h.createElement(m,{flexShrink:0},h.createElement(m.Item,{disabled:0===J,selected:"users"===ne,onClick:se("users")},e("Users")," ",h.createElement(a,null,J)),h.createElement(m.Item,{selected:"channels"===ne,onClick:se("channels")},e("Channels")," ",h.createElement(a,null,K)),h.createElement(m.Item,{disabled:!0},e("Messages"),h.createElement(a,null,G))),h.createElement(u,{block:"x24"},r&&h.createElement(h.Fragment,null,U?h.createElement(s,{display:"flex",justifyContent:"center",fontScale:"p1"},h.createElement(s,{is:"progress",value:(10*U).toFixed(0),max:"1000",marginInlineEnd:"x24"}),h.createElement(s,{is:"span"},g.numberFormat(U,0),"%")):h.createElement(c,{justifyContent:"center"})),!r&&"users"===ne&&h.createElement(D,{usersCount:J,users:W,setUsers:N}),!r&&"channels"===ne&&h.createElement(B,{channels:V,channelsCount:K,setChannels:q})))))}r.exportDefault(O)}

