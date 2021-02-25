function module(e,t,n){let r,u;n.export({useShortcutOpenMenu:()=>c}),n.link("react",{useEffect(e){r=e}},0),n.link("tinykeys",{default(e){u=e}},1);const c=e=>{r(()=>{const t=u(e.current,{Alt:e=>{var t;e.target.className.includes("rcx-sidebar-item")&&(e.preventDefault(),null===(t=e.target.querySelector("button"))||void 0===t||t.click())}});return()=>{t()}},[e])}}

