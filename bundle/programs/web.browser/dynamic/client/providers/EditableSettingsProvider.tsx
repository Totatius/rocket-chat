function module(e,t,n){let r,i,o,c,s,l,u,a,d,f,b,g;n.link("@babel/runtime/helpers/objectSpread2",{default(e){r=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){i=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){o=e}},0),n.link("meteor/mongo",{Mongo(e){c=e}},1),n.link("meteor/tracker",{Tracker(e){s=e}},2),n.link("react",{default(e){l=e},useEffect(e){u=e},useMemo(e){a=e},useRef(e){d=e}},3),n.link("../contexts/EditableSettingsContext",{EditableSettingsContext(e){f=e}},4),n.link("../contexts/SettingsContext",{useSettings(e){b=e}},5),n.link("./createReactiveSubscriptionFactory",{createReactiveSubscriptionFactory(e){g=e}},6);const p={},h=e=>{let{children:t,query:n=p}=e;const h=d(null),k=b(n),y=o(()=>(h.current||(h.current=new c.Collection(null)),h.current));u(()=>{const e=y();e.remove({_id:{$nin:k.map(e=>{let{_id:t}=e;return t})}});for(const t of k){const{_id:n}=t,o=i(t,["_id"]);e.upsert(n,{$set:r({},o),$unset:{changed:!0}})}},[y,k]);const m=a(()=>g(e=>{const t=y(),n=t.findOne(e);if(!n)return;if(n.blocked)return r({},n,{disabled:!0});if(!n.enableQuery)return r({},n,{disabled:!1});const i=[].concat("string"==typeof n.enableQuery?JSON.parse(n.enableQuery):n.enableQuery);return r({},n,{disabled:!i.every(e=>t.find(e).count()>0)})}),[y]),S=a(()=>g((function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return y().find(r({},"_id"in e&&{_id:{$in:e._id}},{},"group"in e&&{group:e.group},{},"section"in e&&(e.section?{section:e.section}:{$or:[{section:{$exists:!1}},{section:""}]}),{},"changed"in e&&{changed:e.changed}),{sort:{section:1,sorter:1,i18nLabel:1}}).fetch()})),[y]),_=a(()=>g(e=>Array.from(new Set(y().find({group:e},{fields:{section:1},sort:{section:1,sorter:1,i18nLabel:1}}).fetch().map(e=>{let{section:t}=e;return t||""})))),[y]),v=o(e=>{for(const t of e){const{_id:e}=t,n=i(t,["_id"]);e&&y().update(e,{$set:n})}s.flush()}),x=a(()=>({queryEditableSetting:m,queryEditableSettings:S,queryGroupSections:_,dispatch:v}),[m,S,_,v]);return l.createElement(f.Provider,{children:t,value:x})};n.exportDefault(h)}

