function module(n,e,t){var u,o;function r(n){var e=u();return o((function(){function t(t){e.current&&!e.current.contains(t.target)&&n(t)}return document.addEventListener("mousedown",t),function(){document.removeEventListener("mousedown",t)}}),[n]),e}t.export({useOutsideClick:function(){return r}}),t.link("react",{useRef:function(n){u=n},useEffect:function(n){o=n}},0)}

