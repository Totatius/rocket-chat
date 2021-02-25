function module(t,o,a){let n;a.export({getMomentChartLabelsAndData:()=>r}),a.link("moment",{default(t){n=t}},0);const r=()=>{const t=[],o=[],a=n().startOf("day");for(let r=a;r.diff(n(),"hours")<0;r.add(1,"hours")){const a=r.format("H");t.push("".concat(n(a,["H"]).format("hA"),"-").concat(n((parseInt(a)+1)%24,["H"]).format("hA"))),o.push(0)}return[t,o]}}

