function module(e,t,l){let n,o,a,i;l.export({AudioAttachment:()=>c}),l.link("react",{default(e){n=e}},0),l.link("../hooks/useCollapse",{useCollapse(e){o=e}},1),l.link("../Attachment",{Attachment(e){a=e}},2),l.link("../context/AttachmentContext",{useMediaUrl(e){i=e}},3);const c=e=>{let{title:t,audio_url:l,audio_type:c,collapsed:r=!1,audio_size:s,description:u,title_link:d,title_link_download:m}=e;const[E,p]=o(r),k=i();return n.createElement(a,null,n.createElement(a.Row,null,n.createElement(a.Title,null,t),s&&n.createElement(a.Size,{size:s}),p,m&&d&&n.createElement(a.Download,{title:t,href:d})),!E&&n.createElement(a.Content,{border:"none"},n.createElement("audio",{controls:!0},n.createElement("source",{src:k(l),type:c})),u&&n.createElement(a.Details,{is:"figcaption"},u)))}}

