function module(e,t,i){let u,s,n,r;i.export({EditableSettingsContext:()=>o,useEditableSetting:()=>c,useEditableSettings:()=>l,useEditableSettingsGroupSections:()=>a,useEditableSettingsDispatch:()=>b}),i.link("react",{createContext(e){u=e},useContext(e){s=e},useMemo(e){n=e}},0),i.link("use-subscription",{useSubscription(e){r=e}},1);const o=u({queryEditableSetting:()=>({getCurrentValue:()=>void 0,subscribe:()=>()=>void 0}),queryEditableSettings:()=>({getCurrentValue:()=>[],subscribe:()=>()=>void 0}),queryGroupSections:()=>({getCurrentValue:()=>[],subscribe:()=>()=>void 0}),dispatch:()=>void 0}),c=e=>{const{queryEditableSetting:t}=s(o),i=n(()=>t(e),[t,e]);return r(i)},l=e=>{const{queryEditableSettings:t}=s(o),i=n(()=>t(null!=e?e:{}),[t,e]);return r(i)},a=e=>{const{queryGroupSections:t}=s(o),i=n(()=>t(e),[t,e]);return r(i)},b=()=>s(o).dispatch}

