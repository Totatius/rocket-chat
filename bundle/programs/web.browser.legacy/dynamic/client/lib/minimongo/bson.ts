function module(e,r,t){var n,a;t.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){n=e}},0),t.export({getBSONType:function(){return o},compareBSONValues:function(){return i}}),t.link("./types",{BSONType:function(e){a=e}},0);var o=function(e){return"number"==typeof e?a.Double:"string"==typeof e?a.String:"boolean"==typeof e?a.Boolean:Array.isArray(e)?a.Array:null===e?a.Null:e instanceof RegExp?a.Regex:"function"==typeof e?a.JavaScript:e instanceof Date?a.Date:e instanceof Uint8Array?a.BinData:a.Object},c=function(e){switch(e){case a.Null:return 0;case a.Double:case a.Int:case a.Long:return 1;case a.String:case a.Symbol:return 2;case a.Object:return 3;case a.Array:return 4;case a.BinData:return 5;case a.ObjectId:return 6;case a.Boolean:return 7;case a.Date:case a.Timestamp:return 8;case a.Regex:return 9;case a.JavaScript:case a.JavaScriptWithScope:return 100;default:return-1}},i=function(e,r){var t,u;if(void 0===e)return void 0===r?0:-1;if(void 0===r)return 1;var s=o(e),l=c(s),p=o(r),f=c(p);if(l!==f)return l<f?-1:1;if(s!==p)throw Error("Missing type coercion logic in compareBSONValues");switch(s){case a.Double:return e-r;case a.String:return e.localeCompare(r);case a.Object:return i((t=Array.prototype.concat).call.apply(t,[[]].concat(n(Object.entries(e)))),(u=Array.prototype.concat).call.apply(u,[[]].concat(n(Object.entries(r)))));case a.Array:for(var g=0;;g++){if(g===e.length)return g===r.length?0:-1;if(g===r.length)return 1;var y=i(e[g],r[g]);if(0!==y)return y}case a.BinData:if(e.length!==r.length)return e.length-r.length;for(var S=0;S<e.length;S++)if(e[S]!==r[S])return e[S]<r[S]?-1:1;return 0;case a.Null:case a.Undefined:return 0;case a.ObjectId:return e.toHexString().localeCompare(r.toHexString());case a.Boolean:return Number(e)-Number(r);case a.Date:return e.getTime()-r.getTime();case a.Regex:throw Error("Sorting not supported on regular expression");case a.JavaScript:case a.JavaScriptWithScope:throw Error("Sorting not supported on Javascript code")}throw Error("Unknown type to sort")}}

