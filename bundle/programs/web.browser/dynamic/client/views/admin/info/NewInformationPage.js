function module(e,t,n){let l,a,i,o,r,c,s,m,u,d,f,p,_,E;n.link("@rocket.chat/fuselage",{Box(e){l=e},Button(e){a=e},ButtonGroup(e){i=e},Callout(e){o=e},Icon(e){r=e},Margins(e){c=e}},0),n.link("@rocket.chat/fuselage-hooks",{useResizeObserver(e){s=e}},1),n.link("react",{default(e){m=e}},2),n.link("../../../components/Page",{default(e){u=e}},3),n.link("./DeploymentCard",{default(e){d=e}},4),n.link("./UsageCard",{default(e){f=e}},5),n.link("./LicenseCard",{default(e){p=e}},6),n.link("../../../components/Card/Card",{DOUBLE_COLUMN_CARD_WIDTH(e){_=e}},7),n.link("../../../contexts/TranslationContext",{useTranslation(e){E=e}},8);const k=m.memo((function e(t){let{canViewStatistics:n,isLoading:k,info:g,statistics:C,instances:h,onClickRefreshButton:w,onClickDownloadInfo:x}=t;const b=E(),{ref:B,contentBoxSize:{inlineSize:D=_}={}}=s(),y=D<_;if(!g)return null;const L=C&&C.instanceCount>1&&!C.oplogEnabled;return(m.createElement(u,{"data-qa":"admin-info"},m.createElement(u.Header,{title:b("Info")},n&&m.createElement(i,null,m.createElement(a,{disabled:k,external:!0,type:"button",onClick:x},m.createElement(r,{name:"download"})," ",b("Download_Info")),m.createElement(a,{disabled:k,primary:!0,type:"button",onClick:w},m.createElement(r,{name:"reload"})," ",b("Refresh")))),m.createElement(u.ScrollableContentWithShadow,null,m.createElement(l,{marginBlock:"none",marginInline:"auto",width:"full"},L&&m.createElement(o,{type:"danger",title:b("Error_RocketChat_requires_oplog_tailing_when_running_in_multiple_instances"),marginBlockEnd:"x16"},m.createElement(l,{withRichContent:!0},m.createElement("p",null,b("Error_RocketChat_requires_oplog_tailing_when_running_in_multiple_instances_details")),m.createElement("p",null,m.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"https://rocket.chat/docs/installation/manual-installation/multiple-instances-to-improve-performance/#running-multiple-instances-per-host-to-improve-performance"},b("Click_here_for_more_info"))))),m.createElement(l,{display:"flex",flexDirection:"row",w:"full",flexWrap:"wrap",justifyContent:y?"center":"flex-start",ref:B},m.createElement(c,{all:"x8"},m.createElement(d,{info:g,statistics:C,instances:h,isLoading:k}),m.createElement(p,{statistics:C,isLoading:k}),m.createElement(f,{vertical:y,statistics:C,isLoading:k})))))))}));n.exportDefault(k)}

