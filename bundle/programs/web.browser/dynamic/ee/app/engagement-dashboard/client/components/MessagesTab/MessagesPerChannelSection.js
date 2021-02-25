function module(e,t,n){let l,a,r,s,o,i,c,m,u,d,E,g,h,p,b,_,f,S,y,x;function C(){const e=_(),t=p(()=>[["last 7 days",e("Last_7_days")],["last 30 days",e("Last_30_days")],["last 90 days",e("Last_90_days")]],[e]),[n,C]=b("last 7 days"),k=p(()=>{switch(n){case"last 7 days":return{start:g().set({hour:0,minute:0,second:0,millisecond:0}).subtract(7,"days"),end:g().set({hour:0,minute:0,second:0,millisecond:0}).subtract(1)};case"last 30 days":return{start:g().set({hour:0,minute:0,second:0,millisecond:0}).subtract(30,"days"),end:g().set({hour:0,minute:0,second:0,millisecond:0}).subtract(1)};case"last 90 days":return{start:g().set({hour:0,minute:0,second:0,millisecond:0}).subtract(90,"days"),end:g().set({hour:0,minute:0,second:0,millisecond:0}).subtract(1)}}},[n]),v=e=>C(e),w=p(()=>({start:k.start.toISOString(),end:k.end.toISOString()}),[k]),{value:D}=f("engagement-dashboard/messages/origin",w),{value:I}=f("engagement-dashboard/messages/top-five-popular-channels",w),[F,A]=p(()=>{if(!D||!I)return[];const e=D.origins.reduce((e,t)=>{let{messages:n,t:a}=t;return l({},e,{[a]:n})},{}),t=I.channels.reduce((e,t,n)=>{let{t:l,messages:a,name:r,usernames:s}=t;return[...e,{i:n,t:l,name:r||s.join(" × "),messages:a}]},[]);return[e,t]},[D,I]),P=()=>{const e=D.origins.map(e=>{let{t:t,messages:n}=e;return[t,n]});x(e,"MessagesPerChannelSection_start_".concat(w.start,"_end_").concat(w.end))};return h.createElement(y,{title:e("Where_are_the_messages_being_sent?"),filter:h.createElement(h.Fragment,null,h.createElement(c,{options:t,value:n,onChange:v}),h.createElement(E,{small:!0,mis:"x16",disabled:!D,onClick:P,"aria-label":e("Download_Info"),icon:"download"}))},h.createElement(s.Container,null,h.createElement(i,{inline:"neg-x12"},h.createElement(r,null,h.createElement(i,{inline:"x12"},h.createElement(s.Item,{grow:1,shrink:0,basis:"0"},h.createElement(r,null,h.createElement(s.Container,{alignItems:"center",wrap:"no-wrap"},F?h.createElement(r,null,h.createElement(s.Item,{grow:1,shrink:1},h.createElement(i,{inline:"x24"},h.createElement(r,{style:{position:"relative",height:300}},h.createElement(r,{style:{position:"absolute",width:"100%",height:"100%"}},h.createElement(a,{data:[{id:"d",label:e("Direct_Messages"),value:F.d,color:"#FFD031"},{id:"c",label:e("Private_Channels"),value:F.c,color:"#2DE0A5"},{id:"p",label:e("Public_Channels"),value:F.p,color:"#1D74F5"}],innerRadius:.6,colors:["#FFD031","#2DE0A5","#1D74F5"],enableRadialLabels:!1,enableSlicesLabels:!1,animate:!0,motionStiffness:90,motionDamping:15,theme:{axis:{ticks:{text:{fill:"#9EA2A8",fontFamily:'Inter, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Meiryo UI", Arial, sans-serif',fontSize:10,fontStyle:"normal",fontWeight:"600",letterSpacing:"0.2px",lineHeight:"12px"}}},tooltip:{container:{backgroundColor:"#1F2329",boxShadow:"0px 0px 12px rgba(47, 52, 61, 0.12), 0px 0px 2px rgba(47, 52, 61, 0.08)",borderRadius:2}}},tooltip:t=>{let{value:n}=t;return(h.createElement(r,{fontScale:"p2",color:"alternative"},e("Value_messages",{value:n})))}}))))),h.createElement(s.Item,{basis:"auto"},h.createElement(i,{block:"neg-x4"},h.createElement(r,null,h.createElement(i,{block:"x4"},h.createElement(r,{color:"info",fontScale:"p1"},h.createElement(S,{color:"#FFD031"}),e("Private_Chats")),h.createElement(r,{color:"info",fontScale:"p1"},h.createElement(S,{color:"#2DE0A5"}),e("Private_Channels")),h.createElement(r,{color:"info",fontScale:"p1"},h.createElement(S,{color:"#1D74F5"}),e("Public_Channels"))))))):h.createElement(m,{variant:"rect",height:300})))),h.createElement(s.Item,{grow:1,shrink:0,basis:"0"},h.createElement(r,null,h.createElement(i,{blockEnd:"x16"},A?h.createElement(r,{fontScale:"p1"},e("Most_popular_channels_top_5")):h.createElement(m,{width:"50%"})),A&&!A.length&&h.createElement(d,{fontScale:"p1",color:"info",style:{textAlign:"center"}},e("Not_enough_data")),(!A||!!A.length)&&h.createElement(u,null,h.createElement(u.Head,null,h.createElement(u.Row,null,h.createElement(u.Cell,null,"#"),h.createElement(u.Cell,null,e("Channel")),h.createElement(u.Cell,{align:"end"},e("Number_of_messages")))),h.createElement(u.Body,null,A&&A.map(e=>{let{i:t,t:n,name:l,messages:a}=e;return(h.createElement(u.Row,{key:t},h.createElement(u.Cell,null,t+1,"."),h.createElement(u.Cell,null,h.createElement(i,{inlineEnd:"x4"},"d"===n&&h.createElement(o,{name:"at"})||"c"===n&&h.createElement(o,{name:"lock"})||"p"===n&&h.createElement(o,{name:"hashtag"})),l),h.createElement(u.Cell,{align:"end"},a)))}),!A&&Array.from({length:5},(e,t)=>h.createElement(u.Row,{key:t},h.createElement(u.Cell,null,h.createElement(m,{width:"100%"})),h.createElement(u.Cell,null,h.createElement(m,{width:"100%"})),h.createElement(u.Cell,{align:"end"},h.createElement(m,{width:"100%"})))))))))))))}n.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},0),n.export({MessagesPerChannelSection:()=>C}),n.link("@nivo/pie",{ResponsivePie(e){a=e}},0),n.link("@rocket.chat/fuselage",{Box(e){r=e},Flex(e){s=e},Icon(e){o=e},Margins(e){i=e},Select(e){c=e},Skeleton(e){m=e},Table(e){u=e},Tile(e){d=e},ActionButton(e){E=e}},1),n.link("moment",{default(e){g=e}},2),n.link("react",{default(e){h=e},useMemo(e){p=e},useState(e){b=e}},3),n.link("../../../../../../client/contexts/TranslationContext",{useTranslation(e){_=e}},4),n.link("../../../../../../client/hooks/useEndpointData",{useEndpointData(e){f=e}},5),n.link("../data/LegendSymbol",{LegendSymbol(e){S=e}},6),n.link("../Section",{Section(e){y=e}},7),n.link("../../../../../../client/lib/download",{downloadCsvAs(e){x=e}},8)}

