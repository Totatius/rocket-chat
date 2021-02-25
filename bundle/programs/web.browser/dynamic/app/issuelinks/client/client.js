function module(e,t,r){r.export({createIssueLinksMessageRenderer:()=>n});const n=e=>{let{template:t}=e;return e=>{var r;return(null===(r=e.html)||void 0===r?void 0:r.trim())?(e.html=e.html.replace(/(?:^|\s|\n)(#[0-9]+)\b/g,(e,r)=>{const n=t.replace("%s",r.substring(1));return e.replace(r,'<a href="'.concat(n,'" target="_blank">').concat(r,"</a>"))}),e):e}}}

