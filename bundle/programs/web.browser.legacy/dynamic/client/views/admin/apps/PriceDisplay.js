function module(e,t,n){var r,i,c,o,u,a,l,p;n.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},1),n.link("react",{default:function(e){c=e},useMemo:function(e){o=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){u=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){a=e}},2),n.link("./helpers",{formatPricingPlan:function(e){l=e},formatPrice:function(e){p=e}},3);var f=function(e,t,n){if("subscription"===e){var r="Subscription";return t&&Array.isArray(t)&&0!==t.length?{type:r,price:l(t[0])}:{type:r,price:"-"}}return n>0?{type:"Paid",price:p(n)}:{type:"Free",price:"-"}};function s(e){var t=e.purchaseType,n=e.pricingPlans,l=e.price,p=e.showType,s=void 0===p||p,h=i(e,["purchaseType","pricingPlans","price","showType"]),y=a(),d=o((function(){return f(t,n,l)}),[t,n,l]),m=d.type,T=d.price;return c.createElement(u,r({display:"flex",flexDirection:"column"},h),s&&c.createElement(u,{color:"default",withTruncatedText:!0},y(m)),c.createElement(u,{color:"hint",withTruncatedText:!0},s||"Free"!==m?T:y(m)))}n.exportDefault(s)}

