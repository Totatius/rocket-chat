function module(e,i,r){r.export({getUserEmailVerified:()=>d});const d=e=>{var i;return Array.isArray(e.emails)?null===(i=e.emails.find(e=>{let{verified:i}=e;return!!i}))||void 0===i?void 0:i.verified:void 0}}

