function module(t,e,i){var r,n,g;i.export({createHighlightWordsMessageRenderer:function(){return h}}),i.link("./helper",{highlightWords:function(t){r=t},getRegexHighlight:function(t){n=t},getRegexHighlightUrl:function(t){g=t}},0);var h=function(t){var e,i=t.wordsToHighlight.map((function(t){return{highlight:t,regex:n(t),urlRegex:g(t)}}));return function(t){var e;return(null===(e=t.html)||void 0===e?void 0:e.trim())?(t.html=r(t.html,i),t):t}}}
