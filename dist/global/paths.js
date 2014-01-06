(function() {
  var cache;

  cache = {};

  if (window.define == null) {
    window.define = function(name, deps, body) {
      var modules, result;
      modules = deps.map(function(d) {
        if (cache.hasOwnProperty(d)) {
          return cache[d];
        } else {
          if (d.slice(0, 2) === './') {
            return cache[d.slice(2)];
          } else {
            return null;
          }
        }
      });
      result = body.apply(null, modules);
      return cache[name] = result;
    };
  }

}).call(this);
;(function(){define("path",[],function(){var e;return e=function(t){var n,r,i,s,o;return n=t||[],o=function(e,t){var n;return n=e.slice(0,e.length),n.push(t),n},s=function(e){var t,n;return t=e.command,n=e.params,""+t+" "+n.join(" ")},i=function(e,t){var n,r,i,s;n=e.command,r=e.params,i=t[0],s=t[1];switch(n){case"M":return[r[0],r[1]];case"L":return[r[0],r[1]];case"H":return[r[0],s];case"V":return[i,r[0]];case"Z":return null;case"C":return[r[4],r[5]];case"S":return[r[2],r[3]];case"Q":return[r[2],r[3]];case"T":return[r[0],r[1]];case"A":return[r[5],r[6]]}},r=function(t){return e(o(n,t))},{moveto:function(e,t){return r({command:"M",params:[e,t]})},lineto:function(e,t){return r({command:"L",params:[e,t]})},hlineto:function(e){return r({command:"H",params:[e]})},vlineto:function(e){return r({command:"V",params:[e]})},closepath:function(){return r({command:"Z",params:[]})},curveto:function(e,t,n,i,s,o){return r({command:"C",params:[e,t,n,i,s,o]})},smoothcurveto:function(e,t,n,i){return r({command:"S",params:[e,t,n,i]})},qcurveto:function(e,t,n,i){return r({command:"Q",params:[e,t,n,i]})},smoothqcurveto:function(e,t){return r({command:"T",params:[e,t]})},arc:function(e,t,n,i,s,o,u){return r({command:"A",params:[e,t,n,i,s,o,u]})},print:function(){return n.map(s).join(" ")},points:function(){var e,t,r,s,o,u;r=[],t=[0,0],s=function(){var n;n=i(e,t),t=n;if(n)return r.push(n)};for(o=0,u=n.length;o<u;o++)e=n[o],s();return r}}},function(){return e()}})}).call(this),function(){define("ops",[],function(){var e,t,n,r,i,s,o,u,a,f;return a=function(e){return e.reduce(function(e,t){return e+t},0)},n=function(e){return e.reduce(function(e,t){return Math.min(e,t)})},t=function(e){return e.reduce(function(e,t){return Math.max(e,t)})},s=function(e,t){var n,r,i,s;return n=e[0],r=e[1],i=t[0],s=t[1],[n+i,r+s]},r=function(e,t){var n,r,i,s;return n=e[0],r=e[1],i=t[0],s=t[1],[n-i,r-s]},f=function(e,t){var n,r;return n=t[0],r=t[1],[e*n,e*r]},e=function(e){return f(1/e.length,e.reduce(s))},i=function(e,t){return f(e,[Math.sin(t),-Math.cos(t)])},u=function(e){return Math.floor(Math.random()*e)},o=function(){return"rgb("+u(256)+", "+u(256)+", "+u(256)+")"},{sum:a,min:n,max:t,plus:s,minus:r,times:f,average:e,on_circle:i,random_int:u,random_colors:o}})}.call(this),function(){define("bezier",["./path","./ops"],function(e,t){var n;return n=function(e,n){return t.minus(t.times(2,e),n)},function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;p=r.points,d=r.tension,d==null&&(d=.3),u=[],f=p.length;for(a=v=1,y=f-1;1<=y?v<=y:v>=y;a=1<=y?++v:--v)u.push(t.times(d,t.minus(p[a],p[a-1])));o=[t.plus(p[0],n(u[0],u[1]))];for(a=m=1,b=f-2;1<=b?m<=b:m>=b;a=1<=b?++m:--m)o.push(t.minus(p[a],t.average([u[a],u[a-1]])));return o.push(t.minus(p[f-1],n(u[f-2],u[f-3]))),i=o[0],s=o[1],l=p[0],c=p[1],h=(w=e()).moveto.apply(w,l).curveto(i[0],i[1],s[0],s[1],c[0],c[1]),{path:function(){S=[];for(var e=2,t=f-1;2<=t?e<=t:e>=t;2<=t?e++:e--)S.push(e);return S}.apply(this).reduce(function(e,t){var n,r;return n=o[t],r=p[t],e.smoothcurveto(n[0],n[1],r[0],r[1])},h),centroid:t.average(p)}}})}.call(this),function(){define("linear",[],function(){return function(e,t){var n,r,i,s;return n=e[0],r=e[1],i=t[0],s=t[1],function(e){return i+(s-i)*(e-n)/(r-n)}}})}.call(this),function(){var e=[].slice;define("sector",["./path","./ops"],function(t,n){return function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w;return a=r.center,v=r.r,i=r.R,m=r.start,c=r.end,s=n.plus(a,n.on_circle(i,m)),o=n.plus(a,n.on_circle(i,c)),u=n.plus(a,n.on_circle(v,c)),l=n.plus(a,n.on_circle(v,m)),d=(g=(y=(b=(w=t()).moveto.apply(w,s)).arc.apply(b,[i,i,0,0,1].concat(e.call(o)))).lineto.apply(y,u)).arc.apply(g,[v,v,0,0,0].concat(e.call(l))).closepath(),h=(m+c)/2,p=(v+i)/2,f=n.plus(a,n.on_circle(p,h)),{path:d,centroid:f}}})}.call(this),function(){define("pie",["./linear","./ops","./sector"],function(e,t,n){return function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b;a=r.data,s=r.accessor,o=r.center,h=r.r,i=r.R,u=r.colors,u==null&&(u=t.random_colors),g=function(){var e,t,n;n=[];for(e=0,t=a.length;e<t;e++)l=a[e],n.push(s(l));return n}(),p=t.sum(g),d=e([0,p],[0,2*Math.PI]),c=[],v=0;for(f=y=0,b=a.length;y<b;f=++y)l=a[f],m=g[f],c.push({item:l,color:u(f),sector:n({center:o,r:h,R:i,start:d(v),end:d(v+m)})}),v+=m;return c}})}.call(this),function(){define("polygon",["./path","./ops"],function(e,t){return function(n){var r,i,s,o,u,a,f;return u=n.points,r=n.closed,s=u.length,i=u[0],a=u.slice(1,+s+1||9e9),o=a.reduce(function(e,t){return e.lineto.apply(e,t)},(f=e()).moveto.apply(f,i)),{path:r?o.closepath():o,centroid:t.average(u)}}})}.call(this),function(){define("semi-regular-polygon",["./polygon","./ops"],function(e,t){return function(n){var r,i,s,o;return i=n.center,o=n.radii,r=2*Math.PI/o.length,s=o.map(function(e,n){return t.plus(i,t.on_circle(e,n*r))}),e({points:s,closed:!0})}})}.call(this),function(){define("radar",["./semi-regular-polygon","./ops"],function(e,t){var n,r,i,s,o;return s=function(e){return Math.floor(Math.random()*e)},o=function(){return"rgb("+s(256)+", "+s(256)+", "+s(256)+")"},n=function(e){var t,n,r,i,s,o,u,a,f,l;n=[],r=function(){var t,n,r;r=[];for(t=0,n=e.length;t<n;t++)i=e[t],r.push(Object.keys(i));return r}();for(o=0,a=e.length;o<a;o++){s=e[o],l=Object.keys(s);for(u=0,f=l.length;u<f;u++)t=l[u],n.indexOf(t)===-1&&n.push(t)}return n},i=function(e){var t,n,r,i,s;t={},r=function(e){return t[e]=function(t){return t[e]}};for(i=0,s=e.length;i<s;i++)n=e[i],r(n);return t},r=function(e,n){var r,i;return r=Object.keys(n),i=e.map(function(e){var i;return i=r.map(function(t){return n[t](e)}),t.max(i)}),t.max(i)},function(s){var o,u,a,f,l,c,h,p,d,v,m,g,y,b,w;return l=s.data,o=s.accessor,a=s.center,v=s.r,p=s.max,g=s.rings,f=s.colors,g==null&&(g=3),f==null&&(f=t.random_colors),o==null&&(o=i(n(l))),h=Object.keys(o),y=h.length,u=2*Math.PI/y,c=-1,p==null&&(p=r(l,o)),m=function(){w=[];for(var e=1;1<=g?e<=g:e>=g;1<=g?e++:e--)w.push(e);return w}.apply(this).map(function(t){var n,r,i,s;return n=v*t/g,e({center:a,radii:function(){s=[];for(var e=0,t=y-1;0<=t?e<=t:e>=t;0<=t?e++:e--)s.push(e);return s}.apply(this).map(function(e){return n})})}),d=l.map(function(t){return c+=1,{polygon:e({center:a,radii:h.map(function(e){return v*o[e](t)/p})}),item:t,color:f(c)}}),{polygons:d,rings:m}}})}.call(this),function(){define("line-chart-comp",["./linear","./ops"],function(e,t){var n;return n=function(e,n){var r,i,s,o,u;return s=function(){var t,i,s;s=[];for(t=0,i=e.length;t<i;t++)r=e[t],s.push(n(r));return s}(),o=s.sort(function(e,t){var n,r,i,s;return n=e[0],r=e[1],i=t[0],s=t[1],n-i}),u=o.map(function(e){return e[1]}),i=o.length,{points:o,xmin:o[0][0],xmax:o[i-1][0],ymin:t.min(u),ymax:t.max(u)}},function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E;return a=r.data,d=r.xaccessor,y=r.yaccessor,p=r.width,c=r.height,u=r.colors,o=r.closed,d==null&&(d=function(e){var t,n;return t=e[0],n=e[1],t}),y==null&&(y=function(e){var t,n;return t=e[0],n=e[1],n}),u==null&&(u=t.random_colors),l=function(e){return[d(e),y(e)]},i=function(){var e,t,r;r=[];for(e=0,t=a.length;e<t;e++)f=a[e],r.push(n(f,l));return r}(),m=t.min(i.map(function(e){return e.xmin})),v=t.max(i.map(function(e){return e.xmax})),w=t.min(i.map(function(e){return e.ymin})),b=t.max(i.map(function(e){return e.ymax})),o&&(w=Math.min(w,0),b=Math.max(b,0)),s=o?0:w,g=e([m,v],[0,p]),E=e([w,b],[c,0]),h=function(e){var t,n;return t=e[0],n=e[1],[g(t),E(n)]},{arranged:i,scale:h,xscale:g,yscale:E,base:s,colors:u}}})}.call(this),function(){define("smooth-line",["./bezier","./ops","./line-chart-comp"],function(e,t,n){return function(r){var i,s,o,u,a,f,l,c,h;return h=n(r),i=h.arranged,f=h.scale,l=h.xscale,c=h.yscale,o=h.colors,s=h.base,u=-1,a=i.map(function(n){var i,a,l,c,h,p;return l=n.points,p=n.xmin,h=n.xmax,c=l.map(f),u+=1,a=e({points:c}),i={path:a.path.lineto(f([h,s])).lineto(f([p,s])).closepath(),centroid:t.average([a.centroid,f([p,s]),f([h,s])])},{item:r.data[u],line:a,area:i,color:o(u)}}),{lines:a,xscale:l,yscale:c}}})}.call(this),function(){define("stock",["./polygon","./line-chart-comp"],function(e,t){return function(n){var r,i,s,o,u,a,f,l,c;return c=t(n),r=c.arranged,a=c.scale,f=c.xscale,l=c.yscale,s=c.colors,i=c.base,o=-1,u=r.map(function(t){var r,u,f,l,c;return r=t.points,c=t.xmin,l=t.xmax,u=r.map(a),r.push([l,i]),r.push([c,i]),f=r.map(a),o+=1,{item:n.data[o],line:e({points:u,closed:!1}),area:e({points:f,closed:!0}),color:s(o)}}),{polygons:u,xscale:f,yscale:l}}})}.call(this),function(){define("all",["./bezier","./linear","./ops","./path","./pie","./polygon","./radar","./sector","./semi-regular-polygon","./smooth-line","./stock"],function(e,t,n,r,i,s,o,u,a,f,l){return window.paths={Bezier:e,Linear:t,Ops:n,Path:r,Pie:i,Polygon:s,Radar:o,Sector:u,SemiRegularPolygon:a,SmoothLine:f,Stock:l}})}.call(this);