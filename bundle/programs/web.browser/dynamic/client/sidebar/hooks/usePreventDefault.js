function module(e,t,n){let r;n.export({usePreventDefault:()=>l}),n.link("react",{useEffect(e){r=e}},0);const l=e=>(r(()=>{const{current:t}=e,n=e=>{[e.target.nodeName,e.target.parentElement.nodeName].includes("BUTTON")&&e.preventDefault()};return null==t||t.addEventListener("click",n),()=>null==t?void 0:t.addEventListener("click",n)},[e]),{ref:e})}

