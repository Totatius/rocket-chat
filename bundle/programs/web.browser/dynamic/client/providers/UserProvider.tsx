function module(e,t,r){let i,n,o,s,c,l,u,a,d;r.link("meteor/meteor",{Meteor(e){i=e}},0),r.link("react",{default(e){n=e},useMemo(e){o=e}},1),r.link("../../app/utils/client",{getUserPreference(e){s=e}},2),r.link("../contexts/UserContext",{UserContext(e){c=e}},3),r.link("../hooks/useReactiveValue",{useReactiveValue(e){l=e}},4),r.link("./createReactiveSubscriptionFactory",{createReactiveSubscriptionFactory(e){u=e}},5),r.link("../../app/models/client",{Subscriptions(e){a=e},Rooms(e){d=e}},6);const f=()=>i.userId(),p=()=>i.user(),m=(e,t)=>new Promise((r,n)=>{i.loginWithPassword(e,t,e=>{e?n(e):r()})}),k=e=>{let{children:t}=e;const r=l(f),i=l(p),k=o(()=>({userId:r,user:i,loginWithPassword:m,queryPreference:u((e,t)=>s(r,e,t)),querySubscription:u((e,t)=>a.findOne(e,{fields:t})),queryRoom:u((e,t)=>d.findOne(e,{fields:t})),querySubscriptions:u((e,t)=>(r?a:d).find(e,t).fetch())}),[r,i]);return n.createElement(c.Provider,{children:t,value:k})};r.exportDefault(k)}

