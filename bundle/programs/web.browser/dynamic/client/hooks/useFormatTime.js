function module(e,t,n){let o,r,s,c;n.export({useFormatTime:()=>a}),n.link("react",{useCallback(e){o=e}},0),n.link("moment",{default(e){r=e}},1),n.link("../contexts/UserContext",{useUserPreference(e){s=e}},2),n.link("../contexts/SettingsContext",{useSetting(e){c=e}},3);const m=["h:mm A","H:mm"],a=()=>{const e=s("clockMode",!1),t=c("Message_TimeFormat"),n=m[e-1]||t;return o(o=>{switch(e){case 1:case 2:return r(o).format(n);default:return r(o).format(t)}},[e,t,n])}}
