function module(t,a,e){let r,n;e.export({useUpdateChartData:()=>c}),e.link("@rocket.chat/fuselage-hooks",{useMutableCallback(t){r=t}},0),e.link("../../../../../app/livechat/client/lib/chartHandler",{updateChart(t){n=t}},1);const c=t=>{let{context:a,canvas:e,init:c,t:l}=t;return r(async(t,r)=>{a.current||(a.current=await c(e.current,a.current,l)),await n(a.current,t,r)})}}

