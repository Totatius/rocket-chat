function module(e,t,n){var o,a,r,l,u,i,c,d;function s(){var e,t,n,s=u(),v=d("federation:getOverviewData",l((function(){return[]}),[]),1e4),f=v.value,E=v.phase,m=E===c.LOADING&&r.createElement(a,{variant:"text"})||E===c.REJECTED&&r.createElement(o,{color:"danger"},"Error")||(null==f?void 0:null===(e=f.data[0])||void 0===e?void 0:e.value),k=E===c.LOADING&&r.createElement(a,{variant:"text"})||E===c.REJECTED&&r.createElement(o,{color:"danger"},"Error")||(null==f?void 0:null===(t=f.data[1])||void 0===t?void 0:t.value),D=E===c.LOADING&&r.createElement(a,{variant:"text"})||E===c.REJECTED&&r.createElement(o,{color:"danger"},"Error")||(null==f?void 0:null===(n=f.data[2])||void 0===n?void 0:n.value);return r.createElement(i,{counters:[{count:m,description:s("Number_of_events")},{count:k,description:s("Number_of_federated_users")},{count:D,description:s("Number_of_federated_servers")}]})}n.link("@rocket.chat/fuselage",{Box:function(e){o=e},Skeleton:function(e){a=e}},0),n.link("react",{default:function(e){r=e},useMemo:function(e){l=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){u=e}},2),n.link("../../../components/data/CounterSet",{default:function(e){i=e}},3),n.link("../../../hooks/useAsyncState",{AsyncStatePhase:function(e){c=e}},4),n.link("../../../hooks/usePolledMethodData",{usePolledMethodData:function(e){d=e}},5),n.exportDefault(s)}
