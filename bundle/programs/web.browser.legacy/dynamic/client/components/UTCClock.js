function module(n,e,t){var o,i,u;t.export({UTCClock:function(){return c},LocalTime:function(){return f}}),t.link("react",{default:function(n){o=n}},0),t.link("../hooks/useTimezoneTime",{useTimezoneTime:function(n){i=n}},1),t.link("../contexts/TranslationContext",{useTranslation:function(n){u=n}},2);var r=function(n){var e;return i(n,1e4)+" (UTC "+n+")"},c=o.memo((function(n){var e=n.utcOffset;return r(e)})),f=o.memo((function(n){var e=n.utcOffset,t,o;return u()("Local_Time_time",{time:r(e)})}))}

