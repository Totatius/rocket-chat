function module(e,t,s){let i;s.export({MessageList:()=>r}),s.link("./RecordList",{RecordList(e){i=e}},0);class r extends i{filter(e){return!0!==e._hidden}compare(e,t){return e.ts.getTime()-t.ts.getTime()}}}

