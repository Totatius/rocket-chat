function module(e,r,n){n.export({createIssueLinksMessageRenderer:function(){return t}});var t=function(e){var r=e.template;return function(e){var n;return(null===(n=e.html)||void 0===n?void 0:n.trim())?(e.html=e.html.replace(/(?:^|\s|\n)(#[0-9]+)\b/g,(function(e,n){var t=r.replace("%s",n.substring(1));return e.replace(n,'<a href="'+t+'" target="_blank">'+n+"</a>")})),e):e}}}

