function module(e,n,t){let u,o;function r(e){const n=u();return o(()=>{function t(t){n.current&&!n.current.contains(t.target)&&e(t)}return document.addEventListener("mousedown",t),()=>{document.removeEventListener("mousedown",t)}},[e]),n}t.export({useOutsideClick:()=>r}),t.link("react",{useRef(e){u=e},useEffect(e){o=e}},0)}

