function module(e,t,l){let n,a,i,r,c,o,m,s,p,f,x;l.link("react",{default(e){n=e}},0),l.link("@rocket.chat/fuselage",{Box(e){a=e},Chip(e){i=e},Divider(e){r=e},Margins(e){c=e}},1),l.link("../../../components/avatar/AppAvatar",{default(e){o=e}},2),l.link("../../../components/ExternalLink",{default(e){m=e}},3),l.link("./PriceDisplay",{default(e){s=e}},4),l.link("./AppStatus",{default(e){p=e}},5),l.link("./AppMenu",{default(e){f=e}},6),l.link("../../../contexts/TranslationContext",{useTranslation(e){x=e}},7);const u=e=>{let{data:t}=e;const l=x(),{iconFileData:u="",name:E,author:{name:d,homepage:y,support:D},description:w,categories:h=[],version:g,price:k,purchaseType:S,pricingPlans:C,iconFileContent:F,installed:I,bundledIn:b}=t;return n.createElement(n.Fragment,null,n.createElement(a,{display:"flex",flexDirection:"row",mbe:"x20",w:"full"},n.createElement(o,{size:"x124",mie:"x20",iconFileContent:F,iconFileData:u}),n.createElement(a,{display:"flex",flexDirection:"column",justifyContent:"space-between",flexGrow:1},n.createElement(a,{fontScale:"h1"},E),n.createElement(a,{display:"flex",flexDirection:"row",color:"hint",alignItems:"center"},n.createElement(a,{fontScale:"p2",mie:"x4"},l("By_author",{author:d})),"|",n.createElement(a,{mis:"x4"},l("Version_version",{version:g}))),n.createElement(a,{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},n.createElement(a,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",marginInline:"neg-x8"},n.createElement(p,{app:t,marginInline:"x8"}),!I&&n.createElement(s,{purchaseType:S,pricingPlans:C,price:k,showType:!1,marginInline:"x8"})),I&&n.createElement(f,{app:t})))),n.createElement(r,null),n.createElement(a,{display:"flex",flexDirection:"column"},n.createElement(c,{block:"x12"},n.createElement(a,{fontScale:"s2"},l("Categories")),n.createElement(a,{display:"flex",flexDirection:"row"},h&&h.map(e=>n.createElement(i,{key:e,textTransform:"uppercase",mie:"x8"},n.createElement(a,{color:"hint"},e)))),n.createElement(a,{fontScale:"s2"},l("Contact")),n.createElement(a,{display:"flex",flexDirection:"row",flexGrow:1,justifyContent:"space-around",flexWrap:"wrap"},n.createElement(a,{display:"flex",flexDirection:"column",mie:"x12",flexGrow:1},n.createElement(a,{fontScale:"s1",color:"hint"},l("Author_Site")),n.createElement(m,{to:y})),n.createElement(a,{display:"flex",flexDirection:"column",flexGrow:1},n.createElement(a,{fontScale:"s1",color:"hint"},l("Support")),n.createElement(m,{to:D}))),n.createElement(a,{fontScale:"s2"},l("Details")),n.createElement(a,{display:"flex",flexDirection:"row"},w))),b&&n.createElement(n.Fragment,null,n.createElement(r,null),n.createElement(a,{display:"flex",flexDirection:"column"},n.createElement(c,{block:"x12"},n.createElement(a,{fontScale:"s2"},l("Bundles")),b.map(e=>n.createElement(a,{key:e.bundleId,display:"flex",flexDirection:"row",alignItems:"center"},n.createElement(a,{width:"x80",height:"x80",display:"flex",flexDirection:"row",justifyContent:"space-around",flexWrap:"wrap",flexShrink:0},e.apps.map(e=>n.createElement(o,{size:"x36",key:e.latest.name,iconFileContent:e.latest.iconFileContent,iconFileData:e.latest.iconFileData}))),n.createElement(a,{display:"flex",flexDirection:"column",mis:"x12"},n.createElement(a,{fontScale:"p2"},e.bundleName),e.apps.map(e=>n.createElement(a,{key:e.latest.name},e.latest.name,",")))))))))};l.exportDefault(u)}
