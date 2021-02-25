function module(t,n,r){var e;r.export({getMomentCurrentLabel:function(){return o}}),r.link("moment",{default:function(t){e=t}},0);var o=function(){var t=e(new Date).format("H");return e(t,["H"]).format("hA")+"-"+e((parseInt(t)+1)%24,["H"]).format("hA")}}

