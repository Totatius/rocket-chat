function module(e,t,r){let n,i,l,c,a,o,p,s;r.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),r.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){i=e}},1),r.link("react",{default(e){l=e},useMemo(e){c=e}},0),r.link("@rocket.chat/fuselage",{Box(e){a=e}},1),r.link("../../../contexts/TranslationContext",{useTranslation(e){o=e}},2),r.link("./helpers",{formatPricingPlan(e){p=e},formatPrice(e){s=e}},3);const u=(e,t,r)=>{if("subscription"===e){const e="Subscription";return t&&Array.isArray(t)&&0!==t.length?{type:e,price:p(t[0])}:{type:e,price:"-"}}return r>0?{type:"Paid",price:s(r)}:{type:"Free",price:"-"}};function f(e){let{purchaseType:t,pricingPlans:r,price:p,showType:s=!0}=e,f=i(e,["purchaseType","pricingPlans","price","showType"]);const h=o(),{type:y,price:d}=c(()=>u(t,r,p),[t,r,p]);return l.createElement(a,n({display:"flex",flexDirection:"column"},f),s&&l.createElement(a,{color:"default",withTruncatedText:!0},h(y)),l.createElement(a,{color:"hint",withTruncatedText:!0},s||"Free"!==y?d:h(y)))}r.exportDefault(f)}

