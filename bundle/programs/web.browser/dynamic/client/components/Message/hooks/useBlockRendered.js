function module(e,n,r){let t,c;r.export({useBlockRendered:()=>s}),r.link("react",{useRef(e){t=e},useEffect(e){c=e}},0);const s=()=>{const e=t();return c(()=>{e.current.dispatchEvent(new Event("rendered"))},[]),{className:"js-block-wrapper",ref:e}}}

