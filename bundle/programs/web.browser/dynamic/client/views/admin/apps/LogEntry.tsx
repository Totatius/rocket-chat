function module(e,t,l){let n,r,a,o;l.link("@rocket.chat/fuselage",{Box(e){n=e}},0),l.link("react",{default(e){r=e}},1),l.link("../../../contexts/TranslationContext",{useTranslation(e){a=e}},2),l.link("../../../hooks/useHighlightedCode",{useHighlightedCode(e){o=e}},3);const i=e=>{let{severity:t,timestamp:l,caller:i,args:s}=e;const c=a();return(r.createElement(n,null,r.createElement(n,null,t,": ",l," ",c("Caller"),": ",i),r.createElement(n,{withRichContent:!0,width:"full"},r.createElement("pre",null,r.createElement("code",{dangerouslySetInnerHTML:{__html:o("json",JSON.stringify(s,null,2))}})))))};l.exportDefault(i)}

