(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72e87500"],{"13d5":function(t,e,i){"use strict";var n=i("23e7"),o=i("d58f").left,r=i("a640"),s=i("ae40"),c=r("reduce"),a=s("reduce",{1:0});n({target:"Array",proto:!0,forced:!c||!a},{reduce:function(t){return o(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"6cbc":function(t,e,i){"use strict";var n=i("cc9a"),o=i.n(n);o.a},9680:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),i("section",{staticClass:"order__accept"},[i("div",{staticClass:"order__accept-info"},[i("p",[i("font",[t._v("Имя:")]),t._v(" "+t._s(t.$attrs.info.name)+" ")],1),i("p",[i("font",[t._v("Телефон:")]),t._v(" "+t._s(t.$attrs.info.phone)+" ")],1),i("p",[i("font",[t._v("Адрес:")]),t._v(" ул. "+t._s(t.$attrs.info.street+" "+t.$attrs.info.house+",")+" кв. "+t._s(t.$attrs.info.appartment)+" ")],1),i("p",[i("font",[t._v("Подъезд:")]),t._v(" "+t._s(t.$attrs.info.porch)+" ")],1),i("p",[i("font",[t._v("Этаж:")]),t._v(" "+t._s(t.$attrs.info.floor)+" ")],1)]),i("div",{staticClass:"order__accept-discount"},[i("div",{staticClass:"input-field"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{id:"code",type:"text"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),i("label",{attrs:{for:"code"}},[t._v("Промокод")])]),t._l(t.filterDiscount,(function(e){return i("div",{key:e.id,staticClass:"order__accept-discount-item",on:{click:function(i){return t.clickItemHandler(e.id)}}},[i("p",[i("font",[t._v("Название:")]),t._v(" "+t._s(e.title)+" ")],1),t.clickItem===e.id?i("div",[i("p",[i("font",[t._v("Промокод:")]),t._v(" "+t._s(e.promocode)+" ")],1),i("p",[i("font",[t._v("Описание:")]),t._v(" "+t._s(e.description)+" ")],1),"order"===e.type?i("p",[i("font",[t._v("Тип:")]),t._v(" Скидка на заказ ")],1):t._e(),"position"===e.type?i("p",[i("font",[t._v("Тип:")]),t._v(" Скидка на позицию ")],1):t._e(),t._l(e.positions,(function(e){return i("p",{key:e.id},[i("font",[t._v("Название позиции:")]),t._v(" "+t._s(e.title)+" ")],1)})),i("p",[i("font",[t._v("Скидка:")]),t._v(" "+t._s(e.discount)+"% ")],1),i("button",{staticClass:"btn waves-effect waves-light",on:{click:function(i){return i.preventDefault(),t.applyDiscount(e)}}},[t._v(" Применить "),i("i",{staticClass:"material-icons right"},[t._v("add_circle_outline")])])],2):t._e()])}))],2),i("div",{staticClass:"order__accept-positions"},[t._l(t.positions,(function(e,n){return i("p",{key:e.id+n},[i("font",[t._v(t._s(e.title))]),t._v(" - "+t._s(e.price)+" руб ")],1)})),i("p",[i("font",[t._v(t._s(t.price)+" руб")])],1),i("button",{staticClass:"btn waves-effect waves-light left",on:{click:function(e){return e.preventDefault(),t.clickHandler(e)}}},[t._v("Оформить заказ")])],2)])])},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-subtitle"},[i("h4",[t._v("Подтверждение заказа")])])}],r=(i("4de4"),i("caad"),i("c975"),i("d81d"),i("13d5"),i("2532"),i("bf19"),i("5530")),s=(i("96cf"),i("1da1")),c={data:function(){return{code:"",discount:[],clickItem:"",positions:this.$attrs.order,price:this.$attrs.price}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("fetchDiscount");case 2:t.discount=e.sent,t.discount=t.discount.reverse();case 4:case"end":return e.stop()}}),e)})))()},computed:{filterDiscount:function(){var t=this,e=this.discount.filter((function(e){return e.promocode.includes(t.code)}));return e}},methods:{applyDiscount:function(t){var e=this;if("order"===t.type&&(this.price=this.price-this.price*+t.discount/100),"position"===t.type){for(var i=[],n=0;n<t.positions.length;n++)for(var o=0;o<this.positions.length;o++)if(t.positions[n].id===this.positions[o].id){i.push(this.positions[o]);break}if(console.log(i),0===i.length&&100===+t.discount)t.positions.map((function(t){e.positions.push(Object(r["a"])({},t,{price:0}))}));else if(i.length<t.positions.length&&100===+t.discount){for(var s=[],c=0;c<t.positions.length;c++){for(var a=!1,p=0;p<i.length;p++)t.positions[c].id===i[p].id&&(a=!0);a||s.push(t.positions[c])}console.log(s),s.map((function(t){e.positions.push(Object(r["a"])({},t,{price:0}))}));var u=i.map((function(t){return e.positions.indexOf(t)}));console.log(u),u.map((function(t){return e.positions[t].price=0})),this.price=this.positions.reduce((function(t,e){return t+ +e.price}),0)}else{var f=i.map((function(t){return e.positions.indexOf(t)}));console.log(f),f.map((function(i){e.positions[i].price>0?e.positions[i].price=+e.positions[i].price-+e.positions[i].price*+t.discount/100:e.positions[i].price=0})),this.price=this.positions.reduce((function(t,e){return t+ +e.price}),0)}}},clickItemHandler:function(t){this.clickItem!==t?this.clickItem=t:this.clickItem=""},clickHandler:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,i=Object(r["a"])({positions:t.positions},t.$attrs.info,{price:t.price,date:(new Date).toJSON()}),console.log(i),e.next=5,t.$store.dispatch("createOrder",i);case 5:t.$message("Заказ успешно оформлен"),t.$emit("update",[]),t.$emit("updateInfo",{}),t.$router.push("/"),e.next=13;break;case 11:e.prev=11,e.t0=e["catch"](0);case 13:case"end":return e.stop()}}),e,null,[[0,11]])})))()}}},a=c,p=(i("6cbc"),i("2877")),u=Object(p["a"])(a,n,o,!1,null,null,null);e["default"]=u.exports},bf19:function(t,e,i){"use strict";var n=i("23e7");n({target:"URL",proto:!0,enumerable:!0},{toJSON:function(){return URL.prototype.toString.call(this)}})},c975:function(t,e,i){"use strict";var n=i("23e7"),o=i("4d64").indexOf,r=i("a640"),s=i("ae40"),c=[].indexOf,a=!!c&&1/[1].indexOf(1,-0)<0,p=r("indexOf"),u=s("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:a||!p||!u},{indexOf:function(t){return a?c.apply(this,arguments)||0:o(this,t,arguments.length>1?arguments[1]:void 0)}})},cc9a:function(t,e,i){},d58f:function(t,e,i){var n=i("1c0b"),o=i("7b0b"),r=i("44ad"),s=i("50c4"),c=function(t){return function(e,i,c,a){n(i);var p=o(e),u=r(p),f=s(p.length),d=t?f-1:0,l=t?-1:1;if(c<2)while(1){if(d in u){a=u[d],d+=l;break}if(d+=l,t?d<0:f<=d)throw TypeError("Reduce of empty array with no initial value")}for(;t?d>=0:f>d;d+=l)d in u&&(a=i(a,u[d],d,p));return a}};t.exports={left:c(!1),right:c(!0)}}}]);
//# sourceMappingURL=chunk-72e87500.60692fc7.js.map