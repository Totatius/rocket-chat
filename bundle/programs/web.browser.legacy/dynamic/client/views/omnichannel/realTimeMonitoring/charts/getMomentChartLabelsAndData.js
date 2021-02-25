function module(t,r,a){var n;a.export({getMomentChartLabelsAndData:function(){return o}}),a.link("moment",{default:function(t){n=t}},0);var o=function(){for(var t=[],r=[],a,o=n().startOf("day");o.diff(n(),"hours")<0;o.add(1,"hours")){var f=o.format("H");t.push(n(f,["H"]).format("hA")+"-"+n((parseInt(f)+1)%24,["H"]).format("hA")),r.push(0)}return[t,r]}}

