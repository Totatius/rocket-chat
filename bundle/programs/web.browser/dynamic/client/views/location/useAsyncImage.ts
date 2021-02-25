function module(e,t,r){let n,s;r.export({useAsyncImage:()=>c}),r.link("react",{useEffect(e){n=e}},0),r.link("../../hooks/useAsyncState",{useAsyncState(e){s=e}},1);const c=e=>{const{value:t,resolve:r,reject:c,reset:o}=s();return n(()=>{if(o(),!e)return;const t=new Image;t.addEventListener("load",()=>{r(t.src)}),t.addEventListener("error",e=>{c(e.error)}),t.src=e},[e,r,c,o]),t}}

