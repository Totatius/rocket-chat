function module(e,l,i){let n,o,a;i.export({useRole:()=>s}),i.link("react",{useCallback(e){n=e}},0),i.link("../../../../app/models/client",{Roles(e){o=e}},1),i.link("../../../hooks/useReactiveValue",{useReactiveValue(e){a=e}},2);const s=e=>a(n(()=>o.findOne({_id:e}),[e]))}

