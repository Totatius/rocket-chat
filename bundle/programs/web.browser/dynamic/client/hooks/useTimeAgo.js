function module(e,a,l){let s,t;l.export({useTimeAgo:()=>d,useShortTimeAgo:()=>n}),l.link("react",{useCallback(e){s=e}},0),l.link("moment",{default(e){t=e}},1);const d=()=>s(e=>t(e).calendar(null,{sameDay:"LT",lastWeek:"dddd LT",sameElse:"LL"}),[]),n=()=>s(e=>t(e).calendar(null,{sameDay:"LT",lastDay:"[Yesterday]",lastWeek:"dddd",sameElse(e){return this.isBefore(e,"year")?"LL":"MMM Do"}}),[])}

