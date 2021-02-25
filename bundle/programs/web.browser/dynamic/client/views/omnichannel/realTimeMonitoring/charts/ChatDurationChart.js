function module(t,e,a){let n,r,l,s,i,o,c,u,h,d,k,f,m;a.link("@babel/runtime/helpers/extends",{default(t){n=t}},0),a.link("@babel/runtime/helpers/objectWithoutProperties",{default(t){r=t}},1),a.link("react",{default(t){l=t},useRef(t){s=t},useEffect(t){i=t}},0),a.link("./Chart",{default(t){o=t}},1),a.link("./useUpdateChartData",{useUpdateChartData(t){c=t}},2),a.link("../../../../contexts/TranslationContext",{useTranslation(t){u=t}},3),a.link("../../../../../app/livechat/client/lib/chartHandler",{drawLineChart(t){h=t}},4),a.link("./getMomentChartLabelsAndData",{getMomentChartLabelsAndData(t){d=t}},5),a.link("./getMomentCurrentLabel",{getMomentCurrentLabel(t){k=t}},6),a.link("../../../../hooks/useEndpointData",{useEndpointData(t){f=t}},7),a.link("../../../../hooks/useAsyncState",{AsyncStatePhase(t){m=t}},8);const[p,g]=d(),b=(t,e,a)=>h(t,e,[a("Avg_chat_duration"),a("Longest_chat_duration")],p,[g,g],{legends:!0,anim:!0,smallTicks:!0}),D=t=>{let{params:e,reloadRef:a}=t,h=r(t,["params","reloadRef"]);const d=u(),p=s(),g=s(),D=c({context:g,canvas:p,t:d,init:b}),{value:C,phase:v,reload:L}=f("livechat/analytics/dashboards/charts/timings",e);a.current.chatDurationChart=L;const{chatDuration:{avg:E,longest:x}}=null!=C?C:{chatDuration:{avg:0,longest:0}};return i(()=>{const t=async()=>{g.current=await b(p.current,g.current,d)};t()},[d]),i(()=>{if(v===m.RESOLVED){const t=k();D(t,[E,x])}},[E,x,v,d,D]),l.createElement(o,n({ref:p},h))};a.exportDefault(D)}

