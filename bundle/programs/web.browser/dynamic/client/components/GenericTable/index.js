function module(e,t,l){let n,r,a,o,i,u,c,s,d,m,f,g,h,k,p,b,E,P;l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectSpread2",{default(e){r=e}},1),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},2),l.link("@rocket.chat/fuselage",{Box(e){o=e},Pagination(e){i=e},Table(e){u=e},Tile(e){c=e}},0),l.link("@rocket.chat/fuselage-hooks",{useDebouncedValue(e){s=e}},1),l.link("react",{default(e){d=e},useState(e){m=e},useEffect(e){f=e},useCallback(e){g=e},forwardRef(e){h=e}},2),l.link("react-keyed-flatten-children",{default(e){k=e}},3),l.link("../../contexts/TranslationContext",{useTranslation(e){p=e}},4),l.link("./HeaderCell",{default(e){b=e}},5),l.link("./LoadingRow",{default(e){E=e}},6),l.link("../ScrollableContentWrapper",{default(e){P=e}},7);const x=(e,t)=>{let{children:l,fixed:h=!0,header:b,params:x="",renderFilter:w,renderRow:S,results:y,setParams:C=(()=>{}),total:_}=e,R=a(e,["children","fixed","header","params","renderFilter","renderRow","results","setParams","total"]);const F=p(),[T,j]=m(x),[v,H]=m(25),[L,A]=m(0),B=s(T,500);f(()=>{C(r({},B,{current:L,itemsPerPage:v}))},[B,L,v,C]);const D=g(()=>{const e=k(b);return Array.from({length:10},(t,l)=>d.createElement(E,{key:l,cols:e.length}))},[b]),I=g(e=>{let{count:t,current:l,itemsPerPage:n}=e;return F("Showing_results_of",l+1,Math.min(l+n,t),t)},[F]),W=g(()=>F("Items_per_page:"),[F]);return d.createElement(d.Fragment,null,"function"==typeof w?w(r({onChange:j},R)):null,y&&!y.length?d.createElement(c,{fontScale:"p1",elevation:"0",color:"info",textAlign:"center"},F("No_data_found")):d.createElement(d.Fragment,null,d.createElement(o,{mi:"neg-x24",pi:"x24",flexShrink:1,flexGrow:1,ref:t,overflow:"hidden"},d.createElement(P,null,d.createElement(u,{fixed:h,sticky:!0},b&&d.createElement(u.Head,null,d.createElement(u.Row,null,b)),d.createElement(u.Body,null,S&&(y?y.map((e,t)=>d.createElement(S,n({key:e._id||t},e))):d.createElement(D,null)),l&&(y?y.map(l):d.createElement(D,null)))))),d.createElement(i,{divider:!0,current:L,itemsPerPage:v,itemsPerPageLabel:W,showingResultsLabel:I,count:_||0,onSetItemsPerPage:H,onSetCurrent:A})))};l.exportDefault(Object.assign(h(x),{HeaderCell:b}))}

