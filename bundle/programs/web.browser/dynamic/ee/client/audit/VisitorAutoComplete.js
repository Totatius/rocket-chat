function module(e,t,l){let n,r,a,i,o,u,s,m;l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){r=e}},1),l.link("react",{default(e){a=e},useMemo(e){i=e},useState(e){o=e}},0),l.link("@rocket.chat/fuselage",{AutoComplete(e){u=e},Option(e){s=e}},1),l.link("../../../client/hooks/useEndpointData",{useEndpointData(e){m=e}},2);const c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{selector:JSON.stringify({term:e})}},d=a.memo(e=>{const[t,l]=o(""),{value:d}=m("livechat/visitors.autocomplete",i(()=>c(t),[t])),p=i(()=>d&&d.items.map(e=>({value:e._id,label:e.name}))||[],[d]);return a.createElement(u,n({},e,{filter:t,setFilter:l,renderSelected:e=>{let{label:t}=e;return(a.createElement(a.Fragment,null,t))},renderItem:e=>{let{value:t}=e,l=r(e,["value"]);return(a.createElement(s,n({key:t},l)))},options:p}))});l.exportDefault(d)}
