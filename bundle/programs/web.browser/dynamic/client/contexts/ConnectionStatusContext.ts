function module(t,e,n){let o,c;n.export({ConnectionStatusContext:()=>s,useConnectionStatus:()=>u}),n.link("react",{createContext(t){o=t},useContext(t){c=t}},0);const s=o({connected:!0,status:"connected",reconnect:()=>void 0}),u=()=>c(s)}

