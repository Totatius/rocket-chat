function module(e,t,r){let n,o,a,l,c,i,s,u,m,d,h,f,g;function k(){const e=n(["\n        cursor: pointer;\n        background: var(--rxc-color-neutral-100, ",") !important;\n\n        &:hover,\n        &:focus {\n            background: var(--rxc-color-neutral-300, ",") !important;\n        }\n    "]);return k=function(){return e},e}function x(){const e=n(["\n        cursor: pointer;\n        background: var(--rxc-color-neutral-100, ",") !important;\n\n        &:hover,\n        &:focus {\n            background: var(--rxc-color-neutral-300, ",") !important;\n        }\n    "]);return x=function(){return e},e}r.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){n=e}},0),r.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){o=e}},1),r.link("@babel/runtime/helpers/extends",{default(e){a=e}},2),r.export({Retry:()=>b,Load:()=>E}),r.link("react",{default(e){l=e},memo(e){c=e},useState(e){i=e},useMemo(e){s=e}},0),r.link("@rocket.chat/fuselage",{Box(e){u=e},Icon(e){m=e}},1),r.link("@rocket.chat/css-in-js",{css(e){d=e}},2),r.link("@rocket.chat/fuselage-tokens/colors",{default(e){h=e}},3),r.link("../../../../contexts/TranslationContext",{useTranslation(e){f=e}},4),r.link("../context/AttachmentContext",{useAttachmentDimensions(e){g=e}},5);const p=e=>l.createElement(u,a({display:"flex",maxWidth:"full",flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center",borderRadius:"x2",borderWidth:"x2",borderStyle:"solid",borderColor:"neutral-200"},e)),b=e=>{let{retry:t}=e,r=o(e,["retry"]);const n=f(),c=d(x(),h.n100,h.n300);return l.createElement(p,a({className:c},r,{onClick:t}),l.createElement(m,{name:"refresh",color:"neutral-700",size:"x64"}),l.createElement(u,{fontScale:"h1",color:"default"},n("Retry")))},E=e=>{let{load:t}=e,r=o(e,["load"]);const n=f(),c=d(k(),h.n100,h.n300);return l.createElement(p,a({className:c},r,{onClick:t}),l.createElement(m,{name:"image",color:"neutral-700",size:"x64"}),l.createElement(u,{fontScale:"h1",color:"default"},n("Click_to_load")))},y=(e,t,r)=>{const n=t/e;return t>=e||Math.min(e,r.width)*n>r.height?{width:e*Math.min(t,r.height)/t,height:"auto"}:{width:Math.min(e,r.width),height:"auto"}},v=e=>{let{previewUrl:t,loadImage:r=!0,setLoadImage:n,src:c}=e,u=o(e,["previewUrl","loadImage","setLoadImage","src"]);const m=g(),{width:d=m.width,height:h=m.height}=u,[f,k]=i(!1),{setHasError:x,setHasNoError:v}=s(()=>({setHasError:()=>k(!0),setHasNoError:()=>k(!1)}),[]),w=y(d,h,m),C=t&&"url(".concat(t,") center center / cover no-repeat fixed");return r?f?l.createElement(b,a({},w,{retry:v})):l.createElement(p,a({className:"gallery-item",onError:x},t&&{style:{background:C}},w,{src:c,is:"img"})):l.createElement(E,a({},m,{load:n}))};r.exportDefault(c(v))}

