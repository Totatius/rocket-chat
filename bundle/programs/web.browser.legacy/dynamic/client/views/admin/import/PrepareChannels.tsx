function module(e,n,t){var r,a,l,c,i,o,u,m,s,f;t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},1),t.link("@rocket.chat/fuselage",{CheckBox:function(e){l=e},Table:function(e){c=e},Tag:function(e){i=e},Pagination:function(e){o=e}},0),t.link("react",{default:function(e){u=e},useState:function(e){m=e},useCallback:function(e){s=e}},1),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){f=e}},2);var d=function(e){var n=e.channels,t=e.channelsCount,d=e.setChannels,h=f(),g=m(0),p=a(g,2),E=p[0],_=p[1],C=m(25),k=a(C,2),v=k[0],b=k[1],P=s((function(e){var n=e.count,t=e.current,r=e.itemsPerPage;return h("Showing_results_of",t+1,Math.min(t+r,n),n)}),[h]),w=s((function(){return h("Items_per_page:")}),[h]);return n.length?u.createElement(u.Fragment,null,u.createElement(c,null,u.createElement(c.Head,null,u.createElement(c.Row,null,u.createElement(c.Cell,{width:"x36"},u.createElement(l,{checked:t>0,indeterminate:t>0&&t!==n.length,onChange:function(){d((function(e){var n=e.some((function(e){var n=e.is_archived,t=e.do_import;return n&&t})),a;return 0===t?e.map((function(e){return r({},e,{do_import:!0})})):n?e.map((function(e){return e.is_archived?r({},e,{do_import:!1}):e})):e.map((function(e){return r({},e,{do_import:!1})}))}))}})),u.createElement(c.Cell,{is:"th"},h("Name")),u.createElement(c.Cell,{is:"th",align:"end"}))),u.createElement(c.Body,null,n.slice(E,E+v).map((function(e){return u.createElement(c.Row,{key:e.channel_id},u.createElement(c.Cell,{width:"x36"},u.createElement(l,{checked:e.do_import,onChange:function(n){var t=n.currentTarget.checked;d((function(n){return n.map((function(n){return n===e?r({},n,{do_import:t}):n}))}))}})),u.createElement(c.Cell,null,e.name),u.createElement(c.Cell,{align:"end"},e.is_archived&&u.createElement(i,{variant:"danger"},h("Importer_Archived"))))})))),u.createElement(o,{current:E,itemsPerPage:v,itemsPerPageLabel:w,showingResultsLabel:P,count:n.length||0,onSetItemsPerPage:b,onSetCurrent:_})):null};t.exportDefault(d)}

