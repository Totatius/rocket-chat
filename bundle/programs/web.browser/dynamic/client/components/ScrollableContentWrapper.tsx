function module(e,l,r){let t,o,i,a,n,s,c;r.link("@babel/runtime/helpers/objectSpread2",{default(e){t=e}},0),r.link("react",{default(e){o=e},useMemo(e){i=e},memo(e){a=e},forwardRef(e){n=e}},0),r.link("simplebar-react",{default(e){s=e}},1),r.link("simplebar/src/simplebar.css"),r.link("../hooks/useDir",{useDir(e){c=e}},2);const d={height:"100%",flexGrow:1,overflowY:"auto",willChange:"transform",width:"100%"},u=n((e,l)=>{let{onScroll:r,children:a,style:n}=e;const u=c(),f=i(()=>t({},n,{},d),[n]);return o.createElement(s,{"data-simplebar-direction":u,direction:u,style:f,scrollableNodeProps:{ref:l,onScroll:r},children:a})});r.exportDefault(a(u))}

