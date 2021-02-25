function module(t,n,e){var a;e.export({getDateRange:function(){return r}}),e.link("moment",{default:function(t){a=t}},0);var r=function(){var t=a(new Date),n=a(new Date(t.year(),t.month(),t.date(),0,0,0)),e=a(new Date(t.year(),t.month(),t.date(),23,59,59));return{start:n.toISOString(),end:e.toISOString()}}}

