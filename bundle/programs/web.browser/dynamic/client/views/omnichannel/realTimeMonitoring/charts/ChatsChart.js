function module(e,t,a){let n,l,s,r,u,o,c,i,d,h,p;a.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),a.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},1),a.link("react",{default(e){s=e},useRef(e){r=e},useEffect(e){u=e}},0),a.link("./Chart",{default(e){o=e}},1),a.link("../../../../contexts/TranslationContext",{useTranslation(e){c=e}},2),a.link("../../../../../app/livechat/client/lib/chartHandler",{drawDoughnutChart(e){i=e}},3),a.link("./useUpdateChartData",{useUpdateChartData(e){d=e}},4),a.link("../../../../hooks/useEndpointData",{useEndpointData(e){h=e}},5),a.link("../../../../hooks/useAsyncState",{AsyncStatePhase(e){p=e}},6);const f=["Open","Queued","Closed"],k={open:0,queued:0,closed:0},C=(e,t,a)=>i(e,a("Chats"),t,f,Object.values(k)),b=e=>{let{params:t,reloadRef:a}=e,i=l(e,["params","reloadRef"]);const f=c(),b=r(),D=r(),m=d({context:D,canvas:b,t:f,init:C}),{value:E,phase:v,reload:x}=h("livechat/analytics/dashboards/charts/chats",t);a.current.chatsChart=x;const{open:y,queued:O,closed:R}=null!=E?E:k;return u(()=>{const e=async()=>{D.current=await C(b.current,D.current,f)};e()},[f]),u(()=>{v===p.RESOLVED&&(m(f("Open"),[y]),m(f("Closed"),[R]),m(f("Queued"),[O]))},[R,y,O,v,f,m]),s.createElement(o,n({ref:b},i))};a.exportDefault(b)}
