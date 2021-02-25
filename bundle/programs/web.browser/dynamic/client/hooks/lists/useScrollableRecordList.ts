function module(e,t,l){let n,o;l.export({useScrollableRecordList:()=>u}),l.link("react",{useCallback(e){n=e},useEffect(e){o=e}},0);const c=25,u=function(e,t){let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:25;const c=n((l,n)=>{e.batchHandle(()=>t(l,n))},[e,t]);return o(()=>{c(0,null!=l?l:25)},[c,l]),{loadMoreItems:c,initialItemCount:l}}}

