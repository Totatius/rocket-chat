function module(t,o,r){let n;r.export({createLookupFunction:()=>p}),r.link("./comparisons",{isEmptyArray(t){n=t}},0);const e=t=>null==t,i=t=>null!=t&&("object"==typeof t||"function"==typeof t),c=(t,o)=>Array.isArray(t)||o,p=t=>{const[o,r]=t.split(/\.(.+)/);if(!r)return t=>e(t)||!i(t)?[void 0]:[t[o]];const u=p(r),s=/^\d+(\.|$)/.test(r);return t=>{if(e(t)||!i(t))return[void 0];const r=t[o];if(n(r))return[void 0];const p=c(r,s)?r:[r];return Array.prototype.concat.apply([],p.map(u))}}}
