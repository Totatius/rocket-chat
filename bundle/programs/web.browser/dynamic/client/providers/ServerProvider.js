function module(e,t,n){let r,o,l,i,a;n.link("react",{default(e){r=e}},0),n.link("meteor/meteor",{Meteor(e){o=e}},1),n.link("../../app/utils",{Info(e){l=e}},2),n.link("../contexts/ServerContext",{ServerContext(e){i=e}},3),n.link("../../app/utils/client",{APIClient(e){a=e}},4);const s=e=>o.absoluteUrl(e),d=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new Promise((t,r)=>{o.call(e,...n,(e,n)=>{e?r(e):t(n)})})},u=function(e,t){const n=["get","post","delete"];if(!e||!n.includes(e.toLowerCase()))throw new Error('Invalid http method provided to "useEndpoint"');if(!t)throw new Error('Invalid endpoint provided to "useEndpoint"');for(var r=arguments.length,o=new Array(r>2?r-2:0),l=2;l<r;l++)o[l-2]=arguments[l];return"/"===t[0]?a[e.toLowerCase()](t.slice(1),...o):a.v1[e.toLowerCase()](t,...o)},c=(e,t,n)=>"/"===e[0]?a.upload(e.slice(1),t,n).promise:a.v1.upload(e,t,n).promise,p=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=o.StreamerCentral.instances[e]?o.StreamerCentral.instances[e]:new o.Streamer(e,t);return(e,t)=>(n.on(e,t),()=>{n.removeListener(e,t)})},v={info:l,absoluteUrl:s,callMethod:d,callEndpoint:u,uploadToEndpoint:c,getStream:p},m=e=>{let{children:t}=e;return(r.createElement(i.Provider,{children:t,value:v}))};n.exportDefault(m)}
