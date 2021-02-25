function module(t,e,n){let o;n.export({getMomentCurrentLabel:()=>a}),n.link("moment",{default(t){o=t}},0);const a=()=>{const t=o(new Date).format("H");return"".concat(o(t,["H"]).format("hA"),"-").concat(o((parseInt(t)+1)%24,["H"]).format("hA"))}}

