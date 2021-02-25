function module(e,s,t){let n,l,o;t.export({useFileList:()=>a}),t.link("react",{useCallback(e){n=e}},0),t.link("../../hooks/useDataWithLoadMore",{useDataWithLoadMore(e){l=e}},1),t.link("../../../../../contexts/ServerContext",{useEndpoint(e){o=e}},2);const i={c:"channels.files",l:"channels.files",d:"im.files",p:"groups.files"},a=(e,s)=>{const t=o("GET",i[e]);return l(n(e=>t(e),[t]),s)}}

