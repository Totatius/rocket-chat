function module(e,t,n){let l,a,i,o,r,c,u;n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.export({Action:()=>m}),n.link("react",{default(e){a=e}},0),n.link("@rocket.chat/fuselage",{Icon(e){i=e},Button(e){o=e},ButtonGroup(e){r=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation(e){c=e}},2),n.link("..",{Content(e){u=e}},3);const m=e=>{let{id:t,icon:n,i18nLabel:l,label:r,mid:u,runAction:m}=e;const d=c();return(a.createElement(o,{id:t,"data-mid":u,"data-actionlink":t,onClick:m,primary:!0,small:!0},n&&a.createElement(i,{name:n.replace("icon-","")}),l?d(l):r))},d=e=>{let{actions:t,runAction:n}=e;return(a.createElement(u,{width:"full",justifyContent:"center"},a.createElement(r,{align:"center"},t.map(e=>a.createElement(m,l({runAction:n,key:e.id},e))))))};n.exportDefault(d)}

