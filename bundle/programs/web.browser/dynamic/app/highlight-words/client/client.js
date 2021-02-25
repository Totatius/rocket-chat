function module(e,t,g){let h,l,i;g.export({createHighlightWordsMessageRenderer:()=>r}),g.link("./helper",{highlightWords(e){h=e},getRegexHighlight(e){l=e},getRegexHighlightUrl(e){i=e}},0);const r=e=>{let{wordsToHighlight:t}=e;const g=t.map(e=>({highlight:e,regex:l(e),urlRegex:i(e)}));return e=>{var t;return(null===(t=e.html)||void 0===t?void 0:t.trim())?(e.html=h(e.html,g),e):e}}}

