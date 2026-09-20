var Xc=Object.defineProperty;var qc=(r,e,t)=>e in r?Xc(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ht=(r,e,t)=>(qc(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var In=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function jc(r){if(r.__esModule)return r;var e=r.default;if(typeof e=="function"){var t=function n(){if(this instanceof n){var i=[null];i.push.apply(i,arguments);var s=Function.bind.apply(e,i);return new s}return e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(r).forEach(function(n){var i=Object.getOwnPropertyDescriptor(r,n);Object.defineProperty(t,n,i.get?i:{enumerable:!0,get:function(){return r[n]}})}),t}var Ws={},Yc={get exports(){return Ws},set exports(r){Ws=r}};(function(r,e){(function(t,n){r.exports=n()})(In,function(){var t=function(){function n(f){return o.appendChild(f.dom),f}function i(f){for(var g=0;g<o.children.length;g++)o.children[g].style.display=g===f?"block":"none";s=f}var s=0,o=document.createElement("div");o.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",o.addEventListener("click",function(f){f.preventDefault(),i(++s%o.children.length)},!1);var a=(performance||Date).now(),l=a,c=0,h=n(new t.Panel("FPS","#0ff","#002")),u=n(new t.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=n(new t.Panel("MB","#f08","#201"));return i(0),{REVISION:16,dom:o,addPanel:n,showPanel:i,begin:function(){a=(performance||Date).now()},end:function(){c++;var f=(performance||Date).now();if(u.update(f-a,200),f>l+1e3&&(h.update(1e3*c/(f-l),100),l=f,c=0,d)){var g=performance.memory;d.update(g.usedJSHeapSize/1048576,g.jsHeapSizeLimit/1048576)}return f},update:function(){a=this.end()},domElement:o,setMode:i}};return t.Panel=function(n,i,s){var o=1/0,a=0,l=Math.round,c=l(window.devicePixelRatio||1),h=80*c,u=48*c,d=3*c,f=2*c,g=3*c,m=15*c,p=74*c,v=30*c,S=document.createElement("canvas");S.width=h,S.height=u,S.style.cssText="width:80px;height:48px";var A=S.getContext("2d");return A.font="bold "+9*c+"px Helvetica,Arial,sans-serif",A.textBaseline="top",A.fillStyle=s,A.fillRect(0,0,h,u),A.fillStyle=i,A.fillText(n,d,f),A.fillRect(g,m,p,v),A.fillStyle=s,A.globalAlpha=.9,A.fillRect(g,m,p,v),{dom:S,update:function(x,w){o=Math.min(o,x),a=Math.max(a,x),A.fillStyle=s,A.globalAlpha=1,A.fillRect(0,0,h,m),A.fillStyle=i,A.fillText(l(x)+" "+n+" ("+l(o)+"-"+l(a)+")",d,f),A.drawImage(S,g+c,m,p-c,v,g,m,p-c,v),A.fillRect(g+p-c,m,c,v),A.fillStyle=s,A.globalAlpha=.9,A.fillRect(g+p-c,m,c,l((1-x/w)*v))}}},t})})(Yc);class Kc{constructor(){this.instance=new Ws,this.instance.showPanel(3),this.active=!1,this.max=40,this.ignoreMaxed=!0,this.activate()}activate(){this.active=!0,document.body.appendChild(this.instance.dom)}deactivate(){this.active=!1,document.body.removeChild(this.instance.dom)}setRenderPanel(e){this.render={},this.render.context=e,this.render.extension=this.render.context.getExtension("EXT_disjoint_timer_query_webgl2"),this.render.panel=this.instance.addPanel(new Ws.Panel("Render (ms)","#f8f","#212")),(!(typeof WebGL2RenderingContext<"u"&&e instanceof WebGL2RenderingContext)||!this.render.extension)&&this.deactivate()}beforeRender(){if(!this.active)return;this.queryCreated=!1;let e=!1;if(this.render.query){e=this.render.context.getQueryParameter(this.render.query,this.render.context.QUERY_RESULT_AVAILABLE);const t=this.render.context.getParameter(this.render.extension.GPU_DISJOINT_EXT);if(e&&!t){const n=this.render.context.getQueryParameter(this.render.query,this.render.context.QUERY_RESULT),i=Math.min(n/1e3/1e3,this.max);i===this.max&&this.ignoreMaxed||this.render.panel.update(i,this.max)}}(e||!this.render.query)&&(this.queryCreated=!0,this.render.query=this.render.context.createQuery(),this.render.context.beginQuery(this.render.extension.TIME_ELAPSED_EXT,this.render.query))}afterRender(){this.active&&this.queryCreated&&this.render.context.endQuery(this.render.extension.TIME_ELAPSED_EXT)}update(){this.active&&this.instance.update()}destroy(){this.deactivate()}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class $t{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),$t.nextNameID=$t.nextNameID||0,this.$name.id=`lil-gui-name-${++$t.nextNameID}`,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Qc extends $t{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function jr(r){let e,t;return(e=r.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const $c={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:jr,toHexString:jr},ss={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},eh={isPrimitive:!1,match:Array.isArray,fromHexString(r,e,t=1){const n=ss.fromHexString(r);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([r,e,t],n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return ss.toHexString(i)}},th={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,e,t=1){const n=ss.fromHexString(r);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r,g:e,b:t},n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return ss.toHexString(i)}},nh=[$c,ss,eh,th];function ih(r){return nh.find(e=>e.match(r))}class sh extends $t{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=ih(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=jr(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class or extends $t{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class rh extends $t{constructor(e,t,n,i,s,o){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let v=parseFloat(this.$input.value);isNaN(v)||(this._stepExplicit&&(v=this._snap(v)),this.setValue(this._clamp(v)))},t=v=>{const S=parseFloat(this.$input.value);isNaN(S)||(this._snapClampSetValue(S+v),this.$input.value=this.getValue())},n=v=>{v.code==="Enter"&&this.$input.blur(),v.code==="ArrowUp"&&(v.preventDefault(),t(this._step*this._arrowKeyMultiplier(v))),v.code==="ArrowDown"&&(v.preventDefault(),t(this._step*this._arrowKeyMultiplier(v)*-1))},i=v=>{this._inputFocused&&(v.preventDefault(),t(this._step*this._normalizeMouseWheel(v)))};let s=!1,o,a,l,c,h;const u=5,d=v=>{o=v.clientX,a=l=v.clientY,s=!0,c=this.getValue(),h=0,window.addEventListener("mousemove",f),window.addEventListener("mouseup",g)},f=v=>{if(s){const S=v.clientX-o,A=v.clientY-a;Math.abs(A)>u?(v.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(S)>u&&g()}if(!s){const S=v.clientY-l;h-=S*this._step*this._arrowKeyMultiplier(v),c+h>this._max?h=this._max-c:c+h<this._min&&(h=this._min-c),this._snapClampSetValue(c+h)}l=v.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",g)},m=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",i,{passive:!1}),this.$input.addEventListener("mousedown",d),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(v,S,A,x,w)=>(v-S)/(A-S)*(w-x)+x,t=v=>{const S=this.$slider.getBoundingClientRect();let A=e(v,S.left,S.right,this._min,this._max);this._snapClampSetValue(A)},n=v=>{this._setDraggingStyle(!0),t(v.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=v=>{t(v.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let o=!1,a,l;const c=v=>{v.preventDefault(),this._setDraggingStyle(!0),t(v.touches[0].clientX),o=!1},h=v=>{v.touches.length>1||(this._hasScrollBar?(a=v.touches[0].clientX,l=v.touches[0].clientY,o=!0):c(v),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=v=>{if(o){const S=v.touches[0].clientX-a,A=v.touches[0].clientY-l;Math.abs(S)>Math.abs(A)?c(v):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else v.preventDefault(),t(v.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},f=this._callOnFinishChange.bind(this),g=400;let m;const p=v=>{if(Math.abs(v.deltaX)<Math.abs(v.deltaY)&&this._hasScrollBar)return;v.preventDefault();const A=this._normalizeMouseWheel(v)*this._step;this._snapClampSetValue(this.getValue()+A),this.$input.value=this.getValue(),clearTimeout(m),m=setTimeout(f,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",p,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class oh extends $t{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(s=>{const o=document.createElement("option");o.innerHTML=s,this.$select.appendChild(o)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class ah extends $t{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const lh=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function ch(r){const e=document.createElement("style");e.innerHTML=r;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Ko=!1;class Mo{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",injectStyles:o=!0,touchStyles:a=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{(l.code==="Enter"||l.code==="Space")&&(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),a&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Ko&&o&&(ch(lh),Ko=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation())}add(e,t,n,i,s){if(Object(n)===n)return new oh(this,e,t,n);const o=e[t];switch(typeof o){case"number":return new rh(this,e,t,n,i,s);case"boolean":return new Qc(this,e,t);case"string":return new ah(this,e,t);case"function":return new or(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new sh(this,e,t,n)}addFolder(e){return new Mo({parent:this,title:e})}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof or||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof or)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}class hh{constructor(){this.instance=new Mo({width:320,title:"debug"});const e=window.document.styleSheets[0];e.insertRule(`
            .lil-gui .lil-gui > .children
            {
                border: none;
                margin-left: var(--folder-indent);
                border-left: 2px solid var(--widget-color);
            }
        `,e.cssRules.length),e.insertRule(`
            .lil-gui.root > .children > .lil-gui > .title
            {
                border-width: 1px 0 0 0;
            }
        `,e.cssRules.length),this.tree={},this.tree.folder=this.instance,this.tree.children={}}getFolder(e){const t=e.split("/");let n=this.tree;for(const i of t){let s=n.children[i];s||(s={},s.folder=n.folder.addFolder(i),s.folder.close(),s.children={}),n.children[i]=s,n=s}return n.folder}}const Mi=class{static getInstance(){return Mi.instance}constructor(){if(Mi.instance)return Mi.instance;Mi.instance=this,this.active=!1,location.hash==="#debug"&&this.activate()}activate(){this.active||(this.active=!0,this.ui=new hh,this.stats=new Kc)}};let vn=Mi;Ht(vn,"instance");class uh{constructor(){this.start=Date.now()/1e3,this.current=this.start,this.elapsed=0,this.delta=16/1e3}update(){const e=Date.now()/1e3;this.delta=e-this.current,this.elapsed+=this.delta,this.current=e,this.delta>60/1e3&&(this.delta=60/1e3)}}var Ln={},dh={get exports(){return Ln},set exports(r){Ln=r}},Ti=typeof Reflect=="object"?Reflect:null,Qo=Ti&&typeof Ti.apply=="function"?Ti.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)},Us;Ti&&typeof Ti.ownKeys=="function"?Us=Ti.ownKeys:Object.getOwnPropertySymbols?Us=function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Us=function(e){return Object.getOwnPropertyNames(e)};function fh(r){console&&console.warn&&console.warn(r)}var Gl=Number.isNaN||function(e){return e!==e};function Be(){Be.init.call(this)}dh.exports=Be;Ln.once=vh;Be.EventEmitter=Be;Be.prototype._events=void 0;Be.prototype._eventsCount=0;Be.prototype._maxListeners=void 0;var $o=10;function Ys(r){if(typeof r!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof r)}Object.defineProperty(Be,"defaultMaxListeners",{enumerable:!0,get:function(){return $o},set:function(r){if(typeof r!="number"||r<0||Gl(r))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+r+".");$o=r}});Be.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0};Be.prototype.setMaxListeners=function(e){if(typeof e!="number"||e<0||Gl(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this};function Jl(r){return r._maxListeners===void 0?Be.defaultMaxListeners:r._maxListeners}Be.prototype.getMaxListeners=function(){return Jl(this)};Be.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i=e==="error",s=this._events;if(s!==void 0)i=i&&s.error===void 0;else if(!i)return!1;if(i){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var l=s[e];if(l===void 0)return!1;if(typeof l=="function")Qo(l,this,t);else for(var c=l.length,h=jl(l,c),n=0;n<c;++n)Qo(h[n],this,t);return!0};function Wl(r,e,t,n){var i,s,o;if(Ys(t),s=r._events,s===void 0?(s=r._events=Object.create(null),r._eventsCount=0):(s.newListener!==void 0&&(r.emit("newListener",e,t.listener?t.listener:t),s=r._events),o=s[e]),o===void 0)o=s[e]=t,++r._eventsCount;else if(typeof o=="function"?o=s[e]=n?[t,o]:[o,t]:n?o.unshift(t):o.push(t),i=Jl(r),i>0&&o.length>i&&!o.warned){o.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=r,a.type=e,a.count=o.length,fh(a)}return r}Be.prototype.addListener=function(e,t){return Wl(this,e,t,!1)};Be.prototype.on=Be.prototype.addListener;Be.prototype.prependListener=function(e,t){return Wl(this,e,t,!0)};function ph(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function Zl(r,e,t){var n={fired:!1,wrapFn:void 0,target:r,type:e,listener:t},i=ph.bind(n);return i.listener=t,n.wrapFn=i,i}Be.prototype.once=function(e,t){return Ys(t),this.on(e,Zl(this,e,t)),this};Be.prototype.prependOnceListener=function(e,t){return Ys(t),this.prependListener(e,Zl(this,e,t)),this};Be.prototype.removeListener=function(e,t){var n,i,s,o,a;if(Ys(t),i=this._events,i===void 0)return this;if(n=i[e],n===void 0)return this;if(n===t||n.listener===t)--this._eventsCount===0?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if(typeof n!="function"){for(s=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){a=n[o].listener,s=o;break}if(s<0)return this;s===0?n.shift():mh(n,s),n.length===1&&(i[e]=n[0]),i.removeListener!==void 0&&this.emit("removeListener",e,a||t)}return this};Be.prototype.off=Be.prototype.removeListener;Be.prototype.removeAllListeners=function(e){var t,n,i;if(n=this._events,n===void 0)return this;if(n.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):n[e]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete n[e]),this;if(arguments.length===0){var s=Object.keys(n),o;for(i=0;i<s.length;++i)o=s[i],o!=="removeListener"&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(t=n[e],typeof t=="function")this.removeListener(e,t);else if(t!==void 0)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this};function Xl(r,e,t){var n=r._events;if(n===void 0)return[];var i=n[e];return i===void 0?[]:typeof i=="function"?t?[i.listener||i]:[i]:t?gh(i):jl(i,i.length)}Be.prototype.listeners=function(e){return Xl(this,e,!0)};Be.prototype.rawListeners=function(e){return Xl(this,e,!1)};Be.listenerCount=function(r,e){return typeof r.listenerCount=="function"?r.listenerCount(e):ql.call(r,e)};Be.prototype.listenerCount=ql;function ql(r){var e=this._events;if(e!==void 0){var t=e[r];if(typeof t=="function")return 1;if(t!==void 0)return t.length}return 0}Be.prototype.eventNames=function(){return this._eventsCount>0?Us(this._events):[]};function jl(r,e){for(var t=new Array(e),n=0;n<e;++n)t[n]=r[n];return t}function mh(r,e){for(;e+1<r.length;e++)r[e]=r[e+1];r.pop()}function gh(r){for(var e=new Array(r.length),t=0;t<e.length;++t)e[t]=r[t].listener||r[t];return e}function vh(r,e){return new Promise(function(t,n){function i(o){r.removeListener(e,s),n(o)}function s(){typeof r.removeListener=="function"&&r.removeListener("error",i),t([].slice.call(arguments))}Yl(r,e,s,{once:!0}),e!=="error"&&Ah(r,i,{once:!0})})}function Ah(r,e,t){typeof r.on=="function"&&Yl(r,"error",e,t)}function Yl(r,e,t,n){if(typeof r.on=="function")n.once?r.once(e,t):r.on(e,t);else if(typeof r.addEventListener=="function")r.addEventListener(e,function i(s){n.once&&r.removeEventListener(e,i),t(s)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof r)}class xh{constructor(){this.game=it.getInstance(),this.state=Ge.getInstance(),this.events=new Ln,this.setKeys(),this.setPointer(),this.events.on("debugDown",()=>{location.hash==="#debug"?location.hash="":location.hash="debug",location.reload()})}setKeys(){this.keys={},this.keys.map=[{codes:["ArrowUp","KeyW"],name:"forward"},{codes:["ArrowRight","KeyD"],name:"strafeRight"},{codes:["ArrowDown","KeyS"],name:"backward"},{codes:["ArrowLeft","KeyA"],name:"strafeLeft"},{codes:["ShiftLeft","ShiftRight"],name:"boost"},{codes:["KeyP"],name:"pointerLock"},{codes:["KeyV"],name:"cameraMode"},{codes:["KeyB"],name:"debug"},{codes:["KeyF"],name:"fullscreen"},{codes:["Space"],name:"jump"},{codes:["ControlLeft","KeyC"],name:"crouch"}],this.keys.down={};for(const e of this.keys.map)this.keys.down[e.name]=!1;this.keys.findPerCode=e=>this.keys.map.find(t=>t.codes.includes(e)),window.addEventListener("keydown",e=>{const t=this.keys.findPerCode(e.code);t&&(this.events.emit("keyDown",t.name),this.events.emit(`${t.name}Down`),this.keys.down[t.name]=!0)}),window.addEventListener("keyup",e=>{const t=this.keys.findPerCode(e.code);t&&(this.events.emit("keyUp",t.name),this.events.emit(`${t.name}Up`),this.keys.down[t.name]=!1)})}setPointer(){this.pointer={},this.pointer.down=!1,this.pointer.deltaTemp={x:0,y:0},this.pointer.delta={x:0,y:0},this.pointer.previous={x:0,y:0},window.addEventListener("pointerdown",e=>{this.pointer.down=!0,this.pointer.previous.x=e.clientX,this.pointer.previous.y=e.clientY}),window.addEventListener("pointermove",e=>{if(!this.pointer.down)return;const t=typeof e.movementX=="number"&&e.movementX!==0?e.movementX:e.clientX-this.pointer.previous.x,n=typeof e.movementY=="number"&&e.movementY!==0?e.movementY:e.clientY-this.pointer.previous.y;this.pointer.previous.x=e.clientX,this.pointer.previous.y=e.clientY,this.pointer.deltaTemp.x+=t,this.pointer.deltaTemp.y+=n}),window.addEventListener("pointerup",()=>{this.pointer.down=!1})}update(){this.pointer.delta.x=this.pointer.deltaTemp.x,this.pointer.delta.y=this.pointer.deltaTemp.y,this.pointer.deltaTemp.x=0,this.pointer.deltaTemp.y=0}}class yh{constructor(){this.game=it.getInstance(),this.state=Ge.getInstance(),this.controls=this.state.controls,this.domElement=this.game.domElement,this.width=null,this.height=null,this.smallestSide=null,this.biggestSide=null,this.pixelRatio=null,this.clampedPixelRatio=null,this.setPointerLock(),this.setFullscreen(),this.controls.events.on("pointerLockDown",()=>{this.pointerLock.toggle()}),this.controls.events.on("fullscreenDown",()=>{this.fullscreen.toggle()}),this.resize()}setPointerLock(){this.pointerLock={},this.pointerLock.active=!1,this.pointerLock.toggle=()=>{this.pointerLock.active?this.pointerLock.deactivate():this.pointerLock.activate()},this.pointerLock.activate=()=>{this.domElement.requestPointerLock()},this.pointerLock.deactivate=()=>{document.exitPointerLock()},document.addEventListener("pointerlockchange",()=>{this.pointerLock.active=!!document.pointerLockElement})}setFullscreen(){this.fullscreen={},this.fullscreen.active=!1,this.fullscreen.toggle=()=>{this.fullscreen.active?this.fullscreen.deactivate():this.fullscreen.activate()},this.fullscreen.activate=()=>{this.domElement.requestFullscreen()},this.fullscreen.deactivate=()=>{document.exitFullscreen()},document.addEventListener("fullscreenchange",()=>{this.fullscreen.active=!!document.fullscreenElement})}normalise(e){const t=Math.min(this.width,this.height);return{x:e.x/t,y:e.y/t}}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.smallestSide=this.width<this.height?this.width:this.height,this.biggestSide=this.width>this.height?this.width:this.height,this.pixelRatio=window.devicePixelRatio,this.clampedPixelRatio=Math.min(this.pixelRatio,2)}}class Sh{constructor(){this.game=it.getInstance(),this.state=Ge.getInstance(),this.debug=vn.getInstance(),this.autoUpdate=!0,this.timeProgress=0,this.progress=0,this.duration=15,this.setDebug()}update(){const e=this.state.time;this.autoUpdate&&(this.timeProgress+=e.delta/this.duration,this.progress=this.timeProgress%1)}setDebug(){if(!this.debug.active)return;const e=this.debug.ui.getFolder("state/dayCycle");e.add(this,"autoUpdate"),e.add(this,"progress").min(0).max(1).step(.001),e.add(this,"duration").min(5).max(100).step(1)}}class Mh{constructor(){this.game=it.getInstance(),this.state=Ge.getInstance(),this.theta=Math.PI*.8,this.phi=Math.PI*.45,this.position={x:0,y:0,z:0}}update(){const t=-(this.state.day.progress+.25)*Math.PI*2;this.phi=(Math.sin(t)*.3+.5)*Math.PI,this.theta=(Math.cos(t)*.3+.5)*Math.PI;const n=Math.sin(this.phi);this.position.x=n*Math.sin(this.theta),this.position.y=Math.cos(this.phi),this.position.z=n*Math.cos(this.theta)}}var bh=1e-6,At=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var r=0,e=arguments.length;e--;)r+=arguments[e]*arguments[e];return Math.sqrt(r)});function wh(){var r=new At(9);return At!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[5]=0,r[6]=0,r[7]=0),r[0]=1,r[4]=1,r[8]=1,r}function Kl(){var r=new At(16);return At!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=0,r[12]=0,r[13]=0,r[14]=0),r[0]=1,r[5]=1,r[10]=1,r[15]=1,r}function _h(r,e,t){var n=Math.sin(t),i=Math.cos(t),s=e[4],o=e[5],a=e[6],l=e[7],c=e[8],h=e[9],u=e[10],d=e[11];return e!==r&&(r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=e[3],r[12]=e[12],r[13]=e[13],r[14]=e[14],r[15]=e[15]),r[4]=s*i+c*n,r[5]=o*i+h*n,r[6]=a*i+u*n,r[7]=l*i+d*n,r[8]=c*i-s*n,r[9]=h*i-o*n,r[10]=u*i-a*n,r[11]=d*i-l*n,r}function Th(r,e,t){var n=Math.sin(t),i=Math.cos(t),s=e[0],o=e[1],a=e[2],l=e[3],c=e[8],h=e[9],u=e[10],d=e[11];return e!==r&&(r[4]=e[4],r[5]=e[5],r[6]=e[6],r[7]=e[7],r[12]=e[12],r[13]=e[13],r[14]=e[14],r[15]=e[15]),r[0]=s*i-c*n,r[1]=o*i-h*n,r[2]=a*i-u*n,r[3]=l*i-d*n,r[8]=s*n+c*i,r[9]=o*n+h*i,r[10]=a*n+u*i,r[11]=l*n+d*i,r}function Eh(r,e){return r[0]=e[12],r[1]=e[13],r[2]=e[14],r}function Ch(r,e){var t=e[0],n=e[1],i=e[2],s=e[4],o=e[5],a=e[6],l=e[8],c=e[9],h=e[10];return r[0]=Math.hypot(t,n,i),r[1]=Math.hypot(s,o,a),r[2]=Math.hypot(l,c,h),r}function Ph(r,e){var t=new At(3);Ch(t,e);var n=1/t[0],i=1/t[1],s=1/t[2],o=e[0]*n,a=e[1]*i,l=e[2]*s,c=e[4]*n,h=e[5]*i,u=e[6]*s,d=e[8]*n,f=e[9]*i,g=e[10]*s,m=o+h+g,p=0;return m>0?(p=Math.sqrt(m+1)*2,r[3]=.25*p,r[0]=(u-f)/p,r[1]=(d-l)/p,r[2]=(a-c)/p):o>h&&o>g?(p=Math.sqrt(1+o-h-g)*2,r[3]=(u-f)/p,r[0]=.25*p,r[1]=(a+c)/p,r[2]=(d+l)/p):h>g?(p=Math.sqrt(1+h-o-g)*2,r[3]=(d-l)/p,r[0]=(a+c)/p,r[1]=.25*p,r[2]=(u+f)/p):(p=Math.sqrt(1+g-o-h)*2,r[3]=(a-c)/p,r[0]=(d+l)/p,r[1]=(u+f)/p,r[2]=.25*p),r}function Lh(r,e,t,n){var i=e[0],s=e[1],o=e[2],a=n[0],l=n[1],c=n[2],h=i-t[0],u=s-t[1],d=o-t[2],f=h*h+u*u+d*d;f>0&&(f=1/Math.sqrt(f),h*=f,u*=f,d*=f);var g=l*d-c*u,m=c*h-a*d,p=a*u-l*h;return f=g*g+m*m+p*p,f>0&&(f=1/Math.sqrt(f),g*=f,m*=f,p*=f),r[0]=g,r[1]=m,r[2]=p,r[3]=0,r[4]=u*p-d*m,r[5]=d*g-h*p,r[6]=h*m-u*g,r[7]=0,r[8]=h,r[9]=u,r[10]=d,r[11]=0,r[12]=i,r[13]=s,r[14]=o,r[15]=1,r}function Wt(){var r=new At(3);return At!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0),r}function Hs(r){var e=new At(3);return e[0]=r[0],e[1]=r[1],e[2]=r[2],e}function Rh(r){var e=r[0],t=r[1],n=r[2];return Math.hypot(e,t,n)}function Zt(r,e,t){var n=new At(3);return n[0]=r,n[1]=e,n[2]=t,n}function rs(r,e){return r[0]=e[0],r[1]=e[1],r[2]=e[2],r}function En(r,e,t){return r[0]=e[0]+t[0],r[1]=e[1]+t[1],r[2]=e[2]+t[2],r}function zh(r,e,t){return r[0]=e[0]-t[0],r[1]=e[1]-t[1],r[2]=e[2]-t[2],r}function Ih(r,e,t){return r[0]=e[0]*t,r[1]=e[1]*t,r[2]=e[2]*t,r}function ni(r,e){return r[0]=-e[0],r[1]=-e[1],r[2]=-e[2],r}function Ql(r,e){var t=e[0],n=e[1],i=e[2],s=t*t+n*n+i*i;return s>0&&(s=1/Math.sqrt(s)),r[0]=e[0]*s,r[1]=e[1]*s,r[2]=e[2]*s,r}function Zs(r,e){return r[0]*e[0]+r[1]*e[1]+r[2]*e[2]}function Jn(r,e,t){var n=e[0],i=e[1],s=e[2],o=t[0],a=t[1],l=t[2];return r[0]=i*l-s*a,r[1]=s*o-n*l,r[2]=n*a-i*o,r}function kh(r,e,t){var n=e[0],i=e[1],s=e[2],o=t[3]*n+t[7]*i+t[11]*s+t[15];return o=o||1,r[0]=(t[0]*n+t[4]*i+t[8]*s+t[12])/o,r[1]=(t[1]*n+t[5]*i+t[9]*s+t[13])/o,r[2]=(t[2]*n+t[6]*i+t[10]*s+t[14])/o,r}function Dh(r,e,t){var n=t[0],i=t[1],s=t[2],o=t[3],a=e[0],l=e[1],c=e[2],h=i*c-s*l,u=s*a-n*c,d=n*l-i*a,f=i*d-s*u,g=s*h-n*d,m=n*u-i*h,p=o*2;return h*=p,u*=p,d*=p,f*=2,g*=2,m*=2,r[0]=a+h+f,r[1]=l+u+g,r[2]=c+d+m,r}function ea(r,e){var t=r[0],n=r[1],i=r[2],s=e[0],o=e[1],a=e[2],l=Math.sqrt(t*t+n*n+i*i),c=Math.sqrt(s*s+o*o+a*a),h=l*c,u=h&&Zs(r,e)/h;return Math.acos(Math.min(Math.max(u,-1),1))}var Nh=zh,$l=Rh;(function(){var r=Wt();return function(e,t,n,i,s,o){var a,l;for(t||(t=3),n||(n=0),i?l=Math.min(i*t+n,e.length):l=e.length,a=n;a<l;a+=t)r[0]=e[a],r[1]=e[a+1],r[2]=e[a+2],s(r,r,o),e[a]=r[0],e[a+1]=r[1],e[a+2]=r[2];return e}})();function Oh(){var r=new At(4);return At!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0,r[3]=0),r}function Fh(r,e){var t=e[0],n=e[1],i=e[2],s=e[3],o=t*t+n*n+i*i+s*s;return o>0&&(o=1/Math.sqrt(o)),r[0]=t*o,r[1]=n*o,r[2]=i*o,r[3]=s*o,r}(function(){var r=Oh();return function(e,t,n,i,s,o){var a,l;for(t||(t=4),n||(n=0),i?l=Math.min(i*t+n,e.length):l=e.length,a=n;a<l;a+=t)r[0]=e[a],r[1]=e[a+1],r[2]=e[a+2],r[3]=e[a+3],s(r,r,o),e[a]=r[0],e[a+1]=r[1],e[a+2]=r[2],e[a+3]=r[3];return e}})();function Yr(){var r=new At(4);return At!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0),r[3]=1,r}function Bh(r,e,t){t=t*.5;var n=Math.sin(t);return r[0]=n*e[0],r[1]=n*e[1],r[2]=n*e[2],r[3]=Math.cos(t),r}function ar(r,e,t,n){var i=e[0],s=e[1],o=e[2],a=e[3],l=t[0],c=t[1],h=t[2],u=t[3],d,f,g,m,p;return f=i*l+s*c+o*h+a*u,f<0&&(f=-f,l=-l,c=-c,h=-h,u=-u),1-f>bh?(d=Math.acos(f),g=Math.sin(d),m=Math.sin((1-n)*d)/g,p=Math.sin(n*d)/g):(m=1-n,p=n),r[0]=m*i+p*l,r[1]=m*s+p*c,r[2]=m*o+p*h,r[3]=m*a+p*u,r}function Uh(r,e){var t=e[0]+e[4]+e[8],n;if(t>0)n=Math.sqrt(t+1),r[3]=.5*n,n=.5/n,r[0]=(e[5]-e[7])*n,r[1]=(e[6]-e[2])*n,r[2]=(e[1]-e[3])*n;else{var i=0;e[4]>e[0]&&(i=1),e[8]>e[i*3+i]&&(i=2);var s=(i+1)%3,o=(i+2)%3;n=Math.sqrt(e[i*3+i]-e[s*3+s]-e[o*3+o]+1),r[i]=.5*n,n=.5/n,r[3]=(e[s*3+o]-e[o*3+s])*n,r[s]=(e[s*3+i]+e[i*3+s])*n,r[o]=(e[o*3+i]+e[i*3+o])*n}return r}var ec=Fh;(function(){var r=Wt(),e=Zt(1,0,0),t=Zt(0,1,0);return function(n,i,s){var o=Zs(i,s);return o<-.999999?(Jn(r,e,i),$l(r)<1e-6&&Jn(r,t,i),Ql(r,r),Bh(n,r,Math.PI),n):o>.999999?(n[0]=0,n[1]=0,n[2]=0,n[3]=1,n):(Jn(r,i,s),n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=1+o,ec(n,n))}})();(function(){var r=Yr(),e=Yr();return function(t,n,i,s,o,a){return ar(r,n,o,a),ar(e,i,s,a),ar(t,r,e,2*a*(1-a)),t}})();(function(){var r=wh();return function(e,t,n,i){return r[0]=n[0],r[3]=n[1],r[6]=n[2],r[1]=i[0],r[4]=i[1],r[7]=i[2],r[2]=-t[0],r[5]=-t[1],r[8]=-t[2],ec(e,Uh(e,r))}})();function bo(){var r=new At(8);return At!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0,r[4]=0,r[5]=0,r[6]=0,r[7]=0),r[3]=1,r}function Hh(r,e,t){var n=t[0]*.5,i=t[1]*.5,s=t[2]*.5,o=e[0],a=e[1],l=e[2],c=e[3];return r[0]=o,r[1]=a,r[2]=l,r[3]=c,r[4]=n*c+i*l-s*a,r[5]=i*c+s*o-n*l,r[6]=s*c+n*a-i*o,r[7]=-n*o-i*a-s*l,r}function tc(r,e){var t=Yr();Ph(t,e);var n=new At(3);return Eh(n,e),Hh(r,t,n),r}function ta(r,e){return r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=e[3],r[4]=e[4],r[5]=e[5],r[6]=e[6],r[7]=e[7],r}class Vh{constructor(e){this.state=Ge.getInstance(),this.viewport=this.state.viewport,this.controls=this.state.controls,this.player=e,this.active=!1,this.gameUp=Zt(0,1,0),this.position=Wt(),this.quaternion=bo(),this.distance=15,this.phi=Math.PI*.45,this.theta=-Math.PI*.25,this.aboveOffset=2,this.phiLimits={min:.1,max:Math.PI-.1}}activate(){this.active=!0}deactivate(){this.active=!1}update(){if(!this.active)return;if(this.controls.pointer.down||this.viewport.pointerLock.active){const a=this.viewport.normalise(this.controls.pointer.delta);this.phi-=a.y*2,this.theta-=a.x*2,this.phi<this.phiLimits.min&&(this.phi=this.phiLimits.min),this.phi>this.phiLimits.max&&(this.phi=this.phiLimits.max)}const e=Math.sin(this.phi)*this.distance,t=Zt(e*Math.sin(this.theta),Math.cos(this.phi)*this.distance,e*Math.cos(this.theta));En(this.position,this.player.position.current,t);const n=Zt(this.player.position.current[0],this.player.position.current[1]+this.aboveOffset,this.player.position.current[2]),i=Kl();Lh(i,this.position,n,this.gameUp),tc(this.quaternion,i);const o=this.state.chunks.getElevationForPosition(this.position[0],this.position[2]);o&&this.position[1]<o+1&&(this.position[1]=o+1)}}class Gh{constructor(e){this.game=it.getInstance(),this.state=Ge.getInstance(),this.viewport=this.state.viewport,this.time=this.state.time,this.controls=this.state.controls,this.player=e,this.active=!1,this.gameUp=Zt(0,1,0),this.defaultForward=Zt(0,0,1),this.forward=Hs(this.defaultForward),this.rightward=Wt(),this.upward=Wt(),this.backward=Wt(),this.leftward=Wt(),this.downward=Wt(),Jn(this.rightward,this.gameUp,this.forward),Jn(this.upward,this.forward,this.rightward),ni(this.backward,this.forward),ni(this.leftward,this.rightward),ni(this.downward,this.upward),this.position=Zt(40,10,40),this.quaternion=bo(),this.rotateX=-Math.PI*.15,this.rotateY=Math.PI*.25,this.rotateXLimits={min:-Math.PI*.5,max:Math.PI*.5}}activate(e=null,t=null){if(this.active=!0,e!==null&&t!==null){rs(this.position,e);const n=Hs(this.defaultForward);Dh(n,n,t);const i=Hs(n);i[1]=0,this.rotateY=ea(this.defaultForward,i),Zs(n,Zt(1,0,0))<0&&(this.rotateY*=-1),this.rotateX=ea(n,i),Zs(n,Zt(0,1,0))>0&&(this.rotateX*=-1)}}deactivate(){this.active=!1}update(){if(!this.active)return;if(this.controls.pointer.down||this.viewport.pointerLock.active){const i=this.viewport.normalise(this.controls.pointer.delta);this.rotateX-=i.y*2,this.rotateY-=i.x*2,this.rotateX<this.rotateXLimits.min&&(this.rotateX=this.rotateXLimits.min),this.rotateX>this.rotateXLimits.max&&(this.rotateX=this.rotateXLimits.max)}const e=Kl();Th(e,e,this.rotateY),_h(e,e,this.rotateX),tc(this.quaternion,e),rs(this.forward,this.defaultForward),kh(this.forward,this.forward,e),Jn(this.rightward,this.gameUp,this.forward),Jn(this.upward,this.forward,this.rightward),ni(this.backward,this.forward),ni(this.leftward,this.rightward),ni(this.downward,this.upward);const t=Wt();this.controls.keys.down.forward&&En(t,t,this.backward),this.controls.keys.down.backward&&En(t,t,this.forward),this.controls.keys.down.strafeRight&&En(t,t,this.rightward),this.controls.keys.down.strafeLeft&&En(t,t,this.leftward),this.controls.keys.down.jump&&En(t,t,this.upward),this.controls.keys.down.crouch&&En(t,t,this.downward);const n=(this.controls.keys.down.boost?30:10)*this.time.delta;Ql(t,t),Ih(t,t,n),En(this.position,this.position,t)}}var tt;let na=(tt=class{constructor(e){this.game=it.getInstance(),this.state=Ge.getInstance(),this.controls=this.state.controls,this.player=e,this.position=Wt(),this.quaternion=bo(),this.mode=tt.MODE_THIRDPERSON,this.thirdPerson=new Vh(this.player),this.fly=new Gh(this.player),this.mode===tt.MODE_THIRDPERSON?this.thirdPerson.activate():this.mode===tt.MODE_FLY&&this.fly.activate(),this.controls.events.on("cameraModeDown",()=>{this.mode===tt.MODE_THIRDPERSON?(this.mode=tt.MODE_FLY,this.fly.activate(this.position,this.quaternion),this.thirdPerson.deactivate()):this.mode===tt.MODE_FLY&&(this.mode=tt.MODE_THIRDPERSON,this.fly.deactivate(),this.thirdPerson.activate())}),this.setDebug()}update(){this.thirdPerson.update(),this.fly.update(),this.mode===tt.MODE_THIRDPERSON?(rs(this.position,this.thirdPerson.position),ta(this.quaternion,this.thirdPerson.quaternion)):this.mode===tt.MODE_FLY&&(rs(this.position,this.fly.position),ta(this.quaternion,this.fly.quaternion))}setDebug(){const e=this.game.debug;if(!e.active)return;e.ui.getFolder("state/player/view").add(this,"mode",{MODE_THIRDPERSON:tt.MODE_THIRDPERSON,MODE_FLY:tt.MODE_FLY}).onChange(()=>{this.mode===tt.MODE_THIRDPERSON?(this.fly.deactivate(),this.thirdPerson.activate()):this.mode===tt.MODE_FLY&&(this.fly.activate(this.position,this.quaternion),this.thirdPerson.deactivate())})}},Ht(tt,"MODE_THIRDPERSON",1),Ht(tt,"MODE_FLY",2),tt),Jh=class{constructor(){this.game=it.getInstance(),this.state=Ge.getInstance(),this.time=this.state.time,this.controls=this.state.controls,this.rotation=0,this.inputSpeed=10,this.inputBoostSpeed=30,this.speed=0,this.position={},this.position.current=Zt(10,0,1),this.position.previous=Hs(this.position.current),this.position.delta=Wt(),this.camera=new na(this)}update(){if(this.camera.mode!==na.MODE_FLY&&(this.controls.keys.down.forward||this.controls.keys.down.backward||this.controls.keys.down.strafeLeft||this.controls.keys.down.strafeRight)){this.rotation=this.camera.thirdPerson.theta,this.controls.keys.down.forward?this.controls.keys.down.strafeLeft?this.rotation+=Math.PI*.25:this.controls.keys.down.strafeRight&&(this.rotation-=Math.PI*.25):this.controls.keys.down.backward?this.controls.keys.down.strafeLeft?this.rotation+=Math.PI*.75:this.controls.keys.down.strafeRight?this.rotation-=Math.PI*.75:this.rotation-=Math.PI:this.controls.keys.down.strafeLeft?this.rotation+=Math.PI*.5:this.controls.keys.down.strafeRight&&(this.rotation-=Math.PI*.5);const n=this.controls.keys.down.boost?this.inputBoostSpeed:this.inputSpeed,i=Math.sin(this.rotation)*this.time.delta*n,s=Math.cos(this.rotation)*this.time.delta*n;this.position.current[0]-=i,this.position.current[2]-=s}Nh(this.position.delta,this.position.current,this.position.previous),rs(this.position.previous,this.position.current),this.speed=$l(this.position.delta),this.camera.update();const t=this.state.chunks.getElevationForPosition(this.position.current[0],this.position.current[2]);t?this.position.current[1]=t:this.position.current[1]=0}};var Kr={},Wh={get exports(){return Kr},set exports(r){Kr=r}};(function(r){(function(e,t,n){function i(l){var c=this,h=a();c.next=function(){var u=2091639*c.s0+c.c*23283064365386963e-26;return c.s0=c.s1,c.s1=c.s2,c.s2=u-(c.c=u|0)},c.c=1,c.s0=h(" "),c.s1=h(" "),c.s2=h(" "),c.s0-=h(l),c.s0<0&&(c.s0+=1),c.s1-=h(l),c.s1<0&&(c.s1+=1),c.s2-=h(l),c.s2<0&&(c.s2+=1),h=null}function s(l,c){return c.c=l.c,c.s0=l.s0,c.s1=l.s1,c.s2=l.s2,c}function o(l,c){var h=new i(l),u=c&&c.state,d=h.next;return d.int32=function(){return h.next()*4294967296|0},d.double=function(){return d()+(d()*2097152|0)*11102230246251565e-32},d.quick=d,u&&(typeof u=="object"&&s(u,h),d.state=function(){return s(h,{})}),d}function a(){var l=4022871197,c=function(h){h=String(h);for(var u=0;u<h.length;u++){l+=h.charCodeAt(u);var d=.02519603282416938*l;l=d>>>0,d-=l,d*=l,l=d>>>0,d-=l,l+=d*4294967296}return(l>>>0)*23283064365386963e-26};return c}t&&t.exports?t.exports=o:n&&n.amd?n(function(){return o}):this.alea=o})(In,r,!1)})(Wh);var Qr={},Zh={get exports(){return Qr},set exports(r){Qr=r}};(function(r){(function(e,t,n){function i(a){var l=this,c="";l.x=0,l.y=0,l.z=0,l.w=0,l.next=function(){var u=l.x^l.x<<11;return l.x=l.y,l.y=l.z,l.z=l.w,l.w^=l.w>>>19^u^u>>>8},a===(a|0)?l.x=a:c+=a;for(var h=0;h<c.length+64;h++)l.x^=c.charCodeAt(h)|0,l.next()}function s(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l}function o(a,l){var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(typeof h=="object"&&s(h,c),u.state=function(){return s(c,{})}),u}t&&t.exports?t.exports=o:n&&n.amd?n(function(){return o}):this.xor128=o})(In,r,!1)})(Zh);var $r={},Xh={get exports(){return $r},set exports(r){$r=r}};(function(r){(function(e,t,n){function i(a){var l=this,c="";l.next=function(){var u=l.x^l.x>>>2;return l.x=l.y,l.y=l.z,l.z=l.w,l.w=l.v,(l.d=l.d+362437|0)+(l.v=l.v^l.v<<4^(u^u<<1))|0},l.x=0,l.y=0,l.z=0,l.w=0,l.v=0,a===(a|0)?l.x=a:c+=a;for(var h=0;h<c.length+64;h++)l.x^=c.charCodeAt(h)|0,h==c.length&&(l.d=l.x<<10^l.x>>>4),l.next()}function s(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l.v=a.v,l.d=a.d,l}function o(a,l){var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(typeof h=="object"&&s(h,c),u.state=function(){return s(c,{})}),u}t&&t.exports?t.exports=o:n&&n.amd?n(function(){return o}):this.xorwow=o})(In,r,!1)})(Xh);var eo={},qh={get exports(){return eo},set exports(r){eo=r}};(function(r){(function(e,t,n){function i(a){var l=this;l.next=function(){var h=l.x,u=l.i,d,f;return d=h[u],d^=d>>>7,f=d^d<<24,d=h[u+1&7],f^=d^d>>>10,d=h[u+3&7],f^=d^d>>>3,d=h[u+4&7],f^=d^d<<7,d=h[u+7&7],d=d^d<<13,f^=d^d<<9,h[u]=f,l.i=u+1&7,f};function c(h,u){var d,f=[];if(u===(u|0))f[0]=u;else for(u=""+u,d=0;d<u.length;++d)f[d&7]=f[d&7]<<15^u.charCodeAt(d)+f[d+1&7]<<13;for(;f.length<8;)f.push(0);for(d=0;d<8&&f[d]===0;++d);for(d==8?f[7]=-1:f[d],h.x=f,h.i=0,d=256;d>0;--d)h.next()}c(l,a)}function s(a,l){return l.x=a.x.slice(),l.i=a.i,l}function o(a,l){a==null&&(a=+new Date);var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(h.x&&s(h,c),u.state=function(){return s(c,{})}),u}t&&t.exports?t.exports=o:n&&n.amd?n(function(){return o}):this.xorshift7=o})(In,r,!1)})(qh);var to={},jh={get exports(){return to},set exports(r){to=r}};(function(r){(function(e,t,n){function i(a){var l=this;l.next=function(){var h=l.w,u=l.X,d=l.i,f,g;return l.w=h=h+1640531527|0,g=u[d+34&127],f=u[d=d+1&127],g^=g<<13,f^=f<<17,g^=g>>>15,f^=f>>>12,g=u[d]=g^f,l.i=d,g+(h^h>>>16)|0};function c(h,u){var d,f,g,m,p,v=[],S=128;for(u===(u|0)?(f=u,u=null):(u=u+"\0",f=0,S=Math.max(S,u.length)),g=0,m=-32;m<S;++m)u&&(f^=u.charCodeAt((m+32)%u.length)),m===0&&(p=f),f^=f<<10,f^=f>>>15,f^=f<<4,f^=f>>>13,m>=0&&(p=p+1640531527|0,d=v[m&127]^=f+p,g=d==0?g+1:0);for(g>=128&&(v[(u&&u.length||0)&127]=-1),g=127,m=4*128;m>0;--m)f=v[g+34&127],d=v[g=g+1&127],f^=f<<13,d^=d<<17,f^=f>>>15,d^=d>>>12,v[g]=f^d;h.w=p,h.X=v,h.i=g}c(l,a)}function s(a,l){return l.i=a.i,l.w=a.w,l.X=a.X.slice(),l}function o(a,l){a==null&&(a=+new Date);var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(h.X&&s(h,c),u.state=function(){return s(c,{})}),u}t&&t.exports?t.exports=o:n&&n.amd?n(function(){return o}):this.xor4096=o})(In,r,!1)})(jh);var no={},Yh={get exports(){return no},set exports(r){no=r}};(function(r){(function(e,t,n){function i(a){var l=this,c="";l.next=function(){var u=l.b,d=l.c,f=l.d,g=l.a;return u=u<<25^u>>>7^d,d=d-f|0,f=f<<24^f>>>8^g,g=g-u|0,l.b=u=u<<20^u>>>12^d,l.c=d=d-f|0,l.d=f<<16^d>>>16^g,l.a=g-u|0},l.a=0,l.b=0,l.c=-1640531527,l.d=1367130551,a===Math.floor(a)?(l.a=a/4294967296|0,l.b=a|0):c+=a;for(var h=0;h<c.length+20;h++)l.b^=c.charCodeAt(h)|0,l.next()}function s(a,l){return l.a=a.a,l.b=a.b,l.c=a.c,l.d=a.d,l}function o(a,l){var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(typeof h=="object"&&s(h,c),u.state=function(){return s(c,{})}),u}t&&t.exports?t.exports=o:n&&n.amd?n(function(){return o}):this.tychei=o})(In,r,!1)})(Yh);var io={},Kh={get exports(){return io},set exports(r){io=r}};const Qh={},$h=Object.freeze(Object.defineProperty({__proto__:null,default:Qh},Symbol.toStringTag,{value:"Module"})),eu=jc($h);(function(r){(function(e,t,n){var i=256,s=6,o=52,a="random",l=n.pow(i,s),c=n.pow(2,o),h=c*2,u=i-1,d;function f(x,w,E){var P=[];w=w==!0?{entropy:!0}:w||{};var y=v(p(w.entropy?[x,A(t)]:x??S(),3),P),T=new g(P),z=function(){for(var G=T.g(s),J=l,k=0;G<c;)G=(G+k)*i,J*=i,k=T.g(1);for(;G>=h;)G/=2,J/=2,k>>>=1;return(G+k)/J};return z.int32=function(){return T.g(4)|0},z.quick=function(){return T.g(4)/4294967296},z.double=z,v(A(T.S),t),(w.pass||E||function(G,J,k,R){return R&&(R.S&&m(R,T),G.state=function(){return m(T,{})}),k?(n[a]=G,J):G})(z,y,"global"in w?w.global:this==n,w.state)}function g(x){var w,E=x.length,P=this,y=0,T=P.i=P.j=0,z=P.S=[];for(E||(x=[E++]);y<i;)z[y]=y++;for(y=0;y<i;y++)z[y]=z[T=u&T+x[y%E]+(w=z[y])],z[T]=w;(P.g=function(G){for(var J,k=0,R=P.i,F=P.j,X=P.S;G--;)J=X[R=u&R+1],k=k*i+X[u&(X[R]=X[F=u&F+J])+(X[F]=J)];return P.i=R,P.j=F,k})(i)}function m(x,w){return w.i=x.i,w.j=x.j,w.S=x.S.slice(),w}function p(x,w){var E=[],P=typeof x,y;if(w&&P=="object")for(y in x)try{E.push(p(x[y],w-1))}catch{}return E.length?E:P=="string"?x:x+"\0"}function v(x,w){for(var E=x+"",P,y=0;y<E.length;)w[u&y]=u&(P^=w[u&y]*19)+E.charCodeAt(y++);return A(w)}function S(){try{var x;return d&&(x=d.randomBytes)?x=x(i):(x=new Uint8Array(i),(e.crypto||e.msCrypto).getRandomValues(x)),A(x)}catch{var w=e.navigator,E=w&&w.plugins;return[+new Date,e,E,e.screen,A(t)]}}function A(x){return String.fromCharCode.apply(0,x)}if(v(n.random(),t),r.exports){r.exports=f;try{d=eu}catch{}}else n["seed"+a]=f})(typeof self<"u"?self:In,[],Math)})(Kh);var tu=Kr,nu=Qr,iu=$r,su=eo,ru=to,ou=no,$n=io;$n.alea=tu;$n.xor128=nu;$n.xorwow=iu;$n.xorshift7=su;$n.xor4096=ru;$n.tychei=ou;var au=$n;function lu(){return new Worker(""+new URL("Terrain-537569b0.js",import.meta.url).href)}let cu=class{constructor(e,t,n,i,s,o,a){this.terrains=e,this.id=t,this.size=n,this.x=i,this.z=s,this.precision=o,this.elevationOffset=a,this.halfSize=this.size*.5,this.ready=!1,this.renderInstance=null,this.events=new Ln}create(e){this.positions=e.positions,this.normals=e.normals,this.indices=e.indices,this.texture=e.texture,this.uv=e.uv,this.ready=!0,this.events.emit("ready")}getElevationForPosition(e,t){if(!this.ready)return;const n=this.terrains.subdivisions,i=n+1,s=this.size/n,o=e-this.x+this.halfSize,a=t-this.z+this.halfSize,l=o/s%1,c=a/s%1,h=Math.floor(o/s),u=Math.floor(a/s),d=h+1,f=u+1,g=l<c?h:h+1,m=l<c?u+1:u,p=(u*i+h)*3,v=(m*i+g)*3,S=(f*i+d)*3,A=l<c?1-c:1-l,x=l<c?-(l-c):l-c,w=1-A-x,E=this.positions[p+1],P=this.positions[v+1],y=this.positions[S+1];return E*A+P*x+y*w}destroy(){this.events.emit("destroy")}};var ft;let hu=(ft=class{constructor(){this.game=it.getInstance(),this.state=Ge.getInstance(),this.debug=vn.getInstance(),this.seed=this.game.seed+"b",this.random=new au(this.seed),this.subdivisions=40,this.lacunarity=2.05,this.persistence=.45,this.maxIterations=6,this.baseFrequency=.003,this.baseAmplitude=180,this.power=2,this.elevationOffset=1,this.segments=this.subdivisions+1,this.iterationsFormula=ft.ITERATIONS_FORMULA_POWERMIX,this.lastId=0,this.terrains=new Map,this.events=new Ln,this.iterationsOffsets=[];for(let e=0;e<this.maxIterations;e++)this.iterationsOffsets.push([(this.random()-.5)*2e5,(this.random()-.5)*2e5]);this.setWorkers(),this.setDebug()}setWorkers(){this.worker=lu(),this.worker.onmessage=e=>{const t=this.terrains.get(e.data.id);t&&t.create(e.data)}}getIterationsForPrecision(e){if(this.iterationsFormula===ft.ITERATIONS_FORMULA_MAX)return this.maxIterations;if(this.iterationsFormula===ft.ITERATIONS_FORMULA_MIN)return Math.floor((this.maxIterations-1)*e)+1;if(this.iterationsFormula===ft.ITERATIONS_FORMULA_MIX)return Math.round((this.maxIterations*e+this.maxIterations)/2);if(this.iterationsFormula===ft.ITERATIONS_FORMULA_POWERMIX)return Math.round((this.maxIterations*(1-Math.pow(1-e,2))+this.maxIterations)/2)}create(e,t,n,i){const s=this.lastId++,o=this.getIterationsForPrecision(i),a=new cu(this,s,e,t,n,i);return this.terrains.set(a.id,a),this.worker.postMessage({id:a.id,x:t,z:n,seed:this.seed,subdivisions:this.subdivisions,size:e,lacunarity:this.lacunarity,persistence:this.persistence,iterations:o,baseFrequency:this.baseFrequency,baseAmplitude:this.baseAmplitude,power:this.power,elevationOffset:this.elevationOffset,iterationsOffsets:this.iterationsOffsets}),this.events.emit("create",a),a}destroyTerrain(e){const t=this.terrains.get(e);t&&(t.destroy(),this.terrains.delete(e))}recreate(){for(const[e,t]of this.terrains){const n=this.getIterationsForPrecision(t.precision);this.worker.postMessage({id:t.id,size:t.size,x:t.x,z:t.z,seed:this.seed,subdivisions:this.subdivisions,lacunarity:this.lacunarity,persistence:this.persistence,iterations:n,baseFrequency:this.baseFrequency,baseAmplitude:this.baseAmplitude,power:this.power,elevationOffset:this.elevationOffset,iterationsOffsets:this.iterationsOffsets})}}setDebug(){if(!this.debug.active)return;const e=this.debug.ui.getFolder("state/terrains");e.add(this,"subdivisions").min(1).max(400).step(1).onFinishChange(()=>this.recreate()),e.add(this,"lacunarity").min(1).max(5).step(.01).onFinishChange(()=>this.recreate()),e.add(this,"persistence").min(0).max(1).step(.01).onFinishChange(()=>this.recreate()),e.add(this,"maxIterations").min(1).max(10).step(1).onFinishChange(()=>this.recreate()),e.add(this,"baseFrequency").min(0).max(.01).step(1e-4).onFinishChange(()=>this.recreate()),e.add(this,"baseAmplitude").min(0).max(500).step(.1).onFinishChange(()=>this.recreate()),e.add(this,"power").min(1).max(10).step(1).onFinishChange(()=>this.recreate()),e.add(this,"elevationOffset").min(-10).max(10).step(1).onFinishChange(()=>this.recreate()),e.add(this,"iterationsFormula",{max:ft.ITERATIONS_FORMULA_MAX,min:ft.ITERATIONS_FORMULA_MIN,mix:ft.ITERATIONS_FORMULA_MIX,powerMix:ft.ITERATIONS_FORMULA_POWERMIX}).onFinishChange(()=>this.recreate())}},Ht(ft,"ITERATIONS_FORMULA_MAX",1),Ht(ft,"ITERATIONS_FORMULA_MIN",2),Ht(ft,"ITERATIONS_FORMULA_MIX",3),Ht(ft,"ITERATIONS_FORMULA_POWERMIX",4),ft),uu=class{constructor(e,t,n,i,s,o,a,l){this.state=Ge.getInstance(),this.id=e,this.chunks=t,this.parent=n,this.quadPosition=i,this.size=s,this.x=o,this.z=a,this.depth=l,this.precision=this.depth/this.chunks.maxDepth,this.maxSplit=this.depth===this.chunks.maxDepth,this.splitted=!1,this.splitting=!1,this.unsplitting=!1,this.needsCheck=!0,this.terrainNeedsUpdate=!0,this.neighbours=new Map,this.children=new Map,this.ready=!1,this.final=!1,this.halfSize=s*.5,this.quarterSize=this.halfSize*.5,this.bounding={xMin:this.x-this.halfSize,xMax:this.x+this.halfSize,zMin:this.z-this.halfSize,zMax:this.z+this.halfSize},this.events=new Ln,this.check(),this.splitted||this.createFinal(),this.testReady()}check(){if(!this.needsCheck)return;this.needsCheck=!1,this.chunks.underSplitDistance(this.size,this.x,this.z)?!this.maxSplit&&!this.splitted&&this.split():this.splitted&&this.unsplit();for(const[t,n]of this.children)n.check()}update(){this.final&&this.terrainNeedsUpdate&&this.neighbours.size===4&&(this.createTerrain(),this.terrainNeedsUpdate=!1);for(const[e,t]of this.children)t.update()}setNeighbours(e,t,n,i){this.neighbours.set("n",e),this.neighbours.set("e",t),this.neighbours.set("s",n),this.neighbours.set("w",i)}testReady(){if(this.splitted){let e=0;for(const[t,n]of this.children)n.ready&&e++;e===4&&this.setReady()}else this.terrain&&this.terrain.ready&&this.setReady()}setReady(){if(!this.ready){if(this.ready=!0,this.splitting&&(this.splitting=!1,this.destroyFinal()),this.unsplitting){this.unsplitting=!1;for(const[e,t]of this.children)t.destroy();this.children.clear()}this.events.emit("ready")}}unsetReady(){this.ready&&(this.ready=!1,this.events.emit("unready"))}split(){this.splitting=!0,this.splitted=!0,this.unsetReady();const e=this.chunks.create(this,"ne",this.halfSize,this.x+this.quarterSize,this.z-this.quarterSize,this.depth+1);this.children.set("ne",e);const t=this.chunks.create(this,"nw",this.halfSize,this.x-this.quarterSize,this.z-this.quarterSize,this.depth+1);this.children.set("nw",t);const n=this.chunks.create(this,"sw",this.halfSize,this.x-this.quarterSize,this.z+this.quarterSize,this.depth+1);this.children.set("sw",n);const i=this.chunks.create(this,"se",this.halfSize,this.x+this.quarterSize,this.z+this.quarterSize,this.depth+1);this.children.set("se",i);for(const[s,o]of this.children)o.events.on("ready",()=>{this.testReady()})}unsplit(){this.splitted&&(this.splitted=!1,this.unsplitting=!0,this.unsetReady(),this.createFinal())}createTerrain(){this.destroyTerrain(),this.terrain=this.state.terrains.create(this.size,this.x,this.z,this.precision),this.terrain.events.on("ready",()=>{this.testReady()})}destroyTerrain(){this.terrain&&this.state.terrains.destroyTerrain(this.terrain.id)}createFinal(){this.final||(this.final=!0,this.terrainNeedsUpdate=!0)}destroyFinal(){this.final&&(this.final=!1,this.terrainNeedsUpdate=!1,this.destroyTerrain())}destroy(){for(const[e,t]of this.children)t.off("ready");if(this.splitted)this.unsplit();else if(this.unsplitting){for(const[e,t]of this.children)t.destroy();this.children.clear()}this.destroyFinal(),this.events.emit("destroy")}isInside(e,t){return e>this.bounding.xMin&&e<this.bounding.xMax&&t>this.bounding.zMin&&t<this.bounding.zMax}getChildChunkForPosition(e,t){if(!this.splitted)return this;for(const[n,i]of this.children)if(i.isInside(e,t))return i.getChildChunkForPosition(e,t);return!1}},du=class{constructor(){this.state=Ge.getInstance(),this.minSize=64,this.maxDepth=4,this.maxSize=this.minSize*Math.pow(2,this.maxDepth),this.splitRatioPerSize=1.3,this.lastId=0,this.events=new Ln,this.mainChunks=new Map,this.allChunks=new Map,this.playerChunkKey=null,this.check()}check(){for(const[t,n]of this.allChunks)n.needsCheck=!0;const e=this.getMainChunksCoordinates();for(const[t,n]of this.mainChunks)e.find(i=>i.key===t)||(n.destroy(),this.mainChunks.delete(t));for(const t of e)if(!this.mainChunks.has(t.key)){const n=this.create(null,null,this.maxSize,t.x,t.z,0);this.mainChunks.set(t.key,n)}for(const[t,n]of this.mainChunks)n.check();this.updateAllNeighbours()}update(){const e=this.state.player,t=`${Math.round(e.position.current[0]/this.minSize*2+.5)}${Math.round(e.position.current[2]/this.minSize*2+.5)}`;t!==this.playerChunkKey&&(this.playerChunkKey=t,this.check());for(const[n,i]of this.mainChunks)i.update()}create(e,t,n,i,s,o){const a=this.lastId++,l=new uu(a,this,e,t,n,i,s,o);return this.allChunks.set(a,l),this.events.emit("create",l),l}updateAllNeighbours(){for(const[t,n]of this.mainChunks){const i=t.split(","),s=parseFloat(i[0]),o=parseFloat(i[1]),a=`${s},${o-1}`,l=`${s+1},${o}`,c=`${s},${o+1}`,h=`${s-1},${o}`,u=this.mainChunks.get(a)??!1,d=this.mainChunks.get(l)??!1,f=this.mainChunks.get(c)??!1,g=this.mainChunks.get(h)??!1;n.setNeighbours(u,d,f,g)}const e=[...this.allChunks.values()].filter(t=>t.depth>0).sort((t,n)=>t.depth-n.depth);for(const t of e){let n=!1,i=!1,s=!1,o=!1;if(t.quadPosition==="sw")n=t.parent.children.get("nw");else if(t.quadPosition==="se")n=t.parent.children.get("ne");else{const a=t.parent.neighbours.get("n");a&&(a.splitted?n=a.children.get(t.quadPosition==="nw"?"sw":"se"):n=a)}if(t.quadPosition==="nw")i=t.parent.children.get("ne");else if(t.quadPosition==="sw")i=t.parent.children.get("se");else{const a=t.parent.neighbours.get("e");a&&(a.splitted?i=a.children.get(t.quadPosition==="ne"?"nw":"sw"):i=a)}if(t.quadPosition==="nw")s=t.parent.children.get("sw");else if(t.quadPosition==="ne")s=t.parent.children.get("se");else{const a=t.parent.neighbours.get("s");a&&(a.splitted?s=a.children.get(t.quadPosition==="sw"?"nw":"ne"):s=a)}if(t.quadPosition==="ne")o=t.parent.children.get("nw");else if(t.quadPosition==="se")o=t.parent.children.get("sw");else{const a=t.parent.neighbours.get("w");a&&(a.splitted?o=a.children.get(t.quadPosition==="nw"?"ne":"se"):o=a)}t.setNeighbours(n,i,s,o)}}getMainChunksCoordinates(){const e=this.state.player,t=Math.round(e.position.current[0]/this.maxSize),n=Math.round(e.position.current[2]/this.maxSize),i=[{x:t,z:n},{x:t,z:n+1},{x:t+1,z:n+1},{x:t+1,z:n},{x:t+1,z:n-1},{x:t,z:n-1},{x:t-1,z:n-1},{x:t-1,z:n},{x:t-1,z:n+1}];for(const s of i)s.coordinatesX=s.x,s.coordinatesZ=s.z,s.key=`${s.x},${s.z}`,s.x*=this.maxSize,s.z*=this.maxSize;return i}underSplitDistance(e,t,n){const i=this.state.player;return Math.hypot(i.position.current[0]-t,i.position.current[2]-n)<e*this.splitRatioPerSize}getChildChunkForPosition(e,t){for(const[n,i]of this.mainChunks)if(i.isInside(e,t))return i}getDeepestChunkForPosition(e,t){const n=this.getChildChunkForPosition(e,t);return n?n.getChildChunkForPosition(e,t):!1}getElevationForPosition(e,t){const n=this.getDeepestChunkForPosition(e,t);return!n||!n.terrain?!1:n.terrain.getElevationForPosition(e,t)}};const bi=class{static getInstance(){return bi.instance}constructor(){if(bi.instance)return bi.instance;bi.instance=this,this.time=new uh,this.controls=new xh,this.viewport=new yh,this.day=new Sh,this.sun=new Mh,this.player=new Jh,this.terrains=new hu,this.chunks=new du}resize(){this.viewport.resize()}update(){this.time.update(),this.controls.update(),this.day.update(),this.sun.update(),this.player.update(),this.chunks.update()}};let Ge=bi;Ht(Ge,"instance");/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wo="149",fu=0,ia=1,pu=2,nc=1,mu=2,Qi=3,xn=0,Ct=1,pn=2,Pn=0,Zn=1,so=2,sa=3,ro=4,gu=5,vi=100,vu=101,Au=102,ra=103,oa=104,xu=200,yu=201,Su=202,Mu=203,ic=204,sc=205,bu=206,wu=207,_u=208,Tu=209,Eu=210,Cu=0,Pu=1,Lu=2,oo=3,Ru=4,zu=5,Iu=6,ku=7,rc=0,Du=1,Nu=2,An=0,Ou=1,Fu=2,Bu=3,Uu=4,Hu=5,_o=300,Pi=301,Li=302,ao=303,lo=304,Ks=306,Rn=1e3,Et=1001,Xs=1002,ut=1003,co=1004,Vs=1005,vt=1006,oc=1007,jn=1008,Yn=1009,Vu=1010,Gu=1011,ac=1012,Ju=1013,Wn=1014,mn=1015,os=1016,Wu=1017,Zu=1018,Ei=1020,Xu=1021,It=1023,qu=1024,ju=1025,Xn=1026,Ri=1027,Yu=1028,Ku=1029,Qu=1030,$u=1031,ed=1033,lr=33776,cr=33777,hr=33778,ur=33779,aa=35840,la=35841,ca=35842,ha=35843,td=36196,ua=37492,da=37496,fa=37808,pa=37809,ma=37810,ga=37811,va=37812,Aa=37813,xa=37814,ya=37815,Sa=37816,Ma=37817,ba=37818,wa=37819,_a=37820,Ta=37821,dr=36492,nd=36283,Ea=36284,Ca=36285,Pa=36286,id=2200,sd=2201,rd=2202,as=2300,zi=2301,fr=2302,xi=2400,yi=2401,qs=2402,To=2500,od=2501,ad=0,lc=1,ho=2,Kn=3e3,Ne=3001,ld=3200,cd=3201,cc=0,hd=1,Yt="srgb",ls="srgb-linear",pr=7680,ud=519,uo=35044,La="300 es",fo=1035;class ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ra=1234567;const es=Math.PI/180,cs=180/Math.PI;function qt(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gt[r&255]+gt[r>>8&255]+gt[r>>16&255]+gt[r>>24&255]+"-"+gt[e&255]+gt[e>>8&255]+"-"+gt[e>>16&15|64]+gt[e>>24&255]+"-"+gt[t&63|128]+gt[t>>8&255]+"-"+gt[t>>16&255]+gt[t>>24&255]+gt[n&255]+gt[n>>8&255]+gt[n>>16&255]+gt[n>>24&255]).toLowerCase()}function dt(r,e,t){return Math.max(e,Math.min(t,r))}function Eo(r,e){return(r%e+e)%e}function dd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function fd(r,e,t){return r!==e?(t-r)/(e-r):0}function ts(r,e,t){return(1-t)*r+t*e}function pd(r,e,t,n){return ts(r,e,1-Math.exp(-t*n))}function md(r,e=1){return e-Math.abs(Eo(r,e*2)-e)}function gd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function vd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Ad(r,e){return r+Math.floor(Math.random()*(e-r+1))}function xd(r,e){return r+Math.random()*(e-r)}function yd(r){return r*(.5-Math.random())}function Sd(r){r!==void 0&&(Ra=r);let e=Ra+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Md(r){return r*es}function bd(r){return r*cs}function po(r){return(r&r-1)===0&&r!==0}function hc(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function js(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function wd(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*h,l*u,l*d,a*c);break;case"YZY":r.set(l*d,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*d,a*h,a*c);break;case"XZX":r.set(a*h,l*g,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*g,a*c);break;case"ZYZ":r.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function gn(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ue(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var _d=Object.freeze({__proto__:null,DEG2RAD:es,RAD2DEG:cs,ceilPowerOfTwo:hc,clamp:dt,damp:pd,degToRad:Md,denormalize:gn,euclideanModulo:Eo,floorPowerOfTwo:js,generateUUID:qt,inverseLerp:fd,isPowerOfTwo:po,lerp:ts,mapLinear:dd,normalize:Ue,pingpong:md,radToDeg:bd,randFloat:xd,randFloatSpread:yd,randInt:Ad,seededRandom:Sd,setQuaternionFromProperEuler:wd,smootherstep:vd,smoothstep:gd});class oe{constructor(e=0,t=0){oe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kt{constructor(){kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,i,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],m=i[0],p=i[3],v=i[6],S=i[1],A=i[4],x=i[7],w=i[2],E=i[5],P=i[8];return s[0]=o*m+a*S+l*w,s[3]=o*p+a*A+l*E,s[6]=o*v+a*x+l*P,s[1]=c*m+h*S+u*w,s[4]=c*p+h*A+u*E,s[7]=c*v+h*x+u*P,s[2]=d*m+f*S+g*w,s[5]=d*p+f*A+g*E,s[8]=d*v+f*x+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=u*m,e[1]=(i*c-h*n)*m,e[2]=(a*n-i*o)*m,e[3]=d*m,e[4]=(h*t-i*l)*m,e[5]=(i*s-a*t)*m,e[6]=f*m,e[7]=(n*l-c*t)*m,e[8]=(o*t-n*s)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(mr.makeScale(e,t)),this}rotate(e){return this.premultiply(mr.makeRotation(-e)),this}translate(e,t){return this.premultiply(mr.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const mr=new kt;function uc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function hs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function qn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const gr={[Yt]:{[ls]:qn},[ls]:{[Yt]:Gs}},St={legacyMode:!0,get workingColorSpace(){return ls},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,e,t){if(this.legacyMode||e===t||!e||!t)return r;if(gr[e]&&gr[e][t]!==void 0){const n=gr[e][t];return r.r=n(r.r),r.g=n(r.g),r.b=n(r.b),r}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)}},dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},et={r:0,g:0,b:0},Vt={h:0,s:0,l:0},gs={h:0,s:0,l:0};function vr(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}function vs(r,e){return e.r=r.r,e.g=r.g,e.b=r.b,e}class Ae{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,St.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=St.workingColorSpace){return this.r=e,this.g=t,this.b=n,St.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=St.workingColorSpace){if(e=Eo(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=vr(o,s,e+1/3),this.g=vr(o,s,e),this.b=vr(o,s,e-1/3)}return St.toWorkingColorSpace(this,i),this}setStyle(e,t=Yt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,St.toWorkingColorSpace(this,t),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,St.toWorkingColorSpace(this,t),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){const l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,h=parseFloat(s[3])/100;return n(s[4]),this.setHSL(l,c,h,t)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,St.toWorkingColorSpace(this,t),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,St.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=Yt){const n=dc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=Gs(e.r),this.g=Gs(e.g),this.b=Gs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return St.fromWorkingColorSpace(vs(this,et),e),dt(et.r*255,0,255)<<16^dt(et.g*255,0,255)<<8^dt(et.b*255,0,255)<<0}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=St.workingColorSpace){St.fromWorkingColorSpace(vs(this,et),t);const n=et.r,i=et.g,s=et.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=St.workingColorSpace){return St.fromWorkingColorSpace(vs(this,et),t),e.r=et.r,e.g=et.g,e.b=et.b,e}getStyle(e=Yt){return St.fromWorkingColorSpace(vs(this,et),e),e!==Yt?`color(${e} ${et.r} ${et.g} ${et.b})`:`rgb(${et.r*255|0},${et.g*255|0},${et.b*255|0})`}offsetHSL(e,t,n){return this.getHSL(Vt),Vt.h+=e,Vt.s+=t,Vt.l+=n,this.setHSL(Vt.h,Vt.s,Vt.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vt),e.getHSL(gs);const n=ts(Vt.h,gs.h,t),i=ts(Vt.s,gs.s,t),s=ts(Vt.l,gs.l,t);return this.setHSL(n,i,s),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}Ae.NAMES=dc;let ii;class fc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ii===void 0&&(ii=hs("canvas")),ii.width=e.width,ii.height=e.height;const n=ii.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ii}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=hs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=qn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qn(t[n]/255)*255):t[n]=qn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class pc{constructor(e=null){this.isSource=!0,this.uuid=qt(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Ar(i[o].image)):s.push(Ar(i[o]))}else s=Ar(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ar(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?fc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Td=0;class nt extends ei{constructor(e=nt.DEFAULT_IMAGE,t=nt.DEFAULT_MAPPING,n=Et,i=Et,s=vt,o=jn,a=It,l=Yn,c=nt.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=qt(),this.name="",this.source=new pc(e),this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_o)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rn:e.x=e.x-Math.floor(e.x);break;case Et:e.x=e.x<0?0:1;break;case Xs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rn:e.y=e.y-Math.floor(e.y);break;case Et:e.y=e.y<0?0:1;break;case Xs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}nt.DEFAULT_IMAGE=null;nt.DEFAULT_MAPPING=_o;nt.DEFAULT_ANISOTROPY=1;class He{constructor(e=0,t=0,n=0,i=1){He.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],m=l[2],p=l[6],v=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-m)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+m)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(c+1)/2,x=(f+1)/2,w=(v+1)/2,E=(h+d)/4,P=(u+m)/4,y=(g+p)/4;return A>x&&A>w?A<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(A),i=E/n,s=P/n):x>w?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=E/i,s=y/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=P/s,i=y/s),this.set(n,i,s,t),this}let S=Math.sqrt((p-g)*(p-g)+(u-m)*(u-m)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(u-m)/S,this.z=(d-h)/S,this.w=Math.acos((c+f+v-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yn extends ei{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new He(0,0,e,t),this.scissorTest=!1,this.viewport=new He(0,0,e,t);const i={width:e,height:t,depth:1};this.texture=new nt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:vt,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new pc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mc extends nt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ut,this.minFilter=ut,this.wrapR=Et,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ed extends nt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ut,this.minFilter=ut,this.wrapR=Et,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],g=s[o+2],m=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=m;return}if(u!==m||l!==d||c!==f||h!==g){let p=1-a;const v=l*d+c*f+h*g+u*m,S=v>=0?1:-1,A=1-v*v;if(A>Number.EPSILON){const w=Math.sqrt(A),E=Math.atan2(w,v*S);p=Math.sin(p*E)/w,a=Math.sin(a*E)/w}const x=a*S;if(l=l*p+d*x,c=c*p+f*x,h=h*p+g*x,u=u*p+m*x,p===1-a){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(za.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(za.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=l*t+o*i-a*n,h=l*n+a*t-s*i,u=l*i+s*n-o*t,d=-s*t-o*n-a*i;return this.x=c*l+d*-s+h*-a-u*-o,this.y=h*l+d*-o+u*-s-c*-a,this.z=u*l+d*-a+c*-o-h*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xr.copy(this).projectOnVector(e),this.sub(xr)}reflect(e){return this.sub(xr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xr=new C,za=new jt;class Di{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.length;l<c;l+=3){const h=e[l],u=e[l+1],d=e[l+2];h<t&&(t=h),u<n&&(n=u),d<i&&(i=d),h>s&&(s=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.count;l<c;l++){const h=e.getX(l),u=e.getY(l),d=e.getZ(l);h<t&&(t=h),u<n&&(n=u),d<i&&(i=d),h>s&&(s=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){const s=n.attributes.position;for(let o=0,a=s.count;o<a;o++)Fn.fromBufferAttribute(s,o).applyMatrix4(e.matrixWorld),this.expandByPoint(Fn)}else n.boundingBox===null&&n.computeBoundingBox(),yr.copy(n.boundingBox),yr.applyMatrix4(e.matrixWorld),this.union(yr);const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hi),As.subVectors(this.max,Hi),si.subVectors(e.a,Hi),ri.subVectors(e.b,Hi),oi.subVectors(e.c,Hi),Sn.subVectors(ri,si),Mn.subVectors(oi,ri),Bn.subVectors(si,oi);let t=[0,-Sn.z,Sn.y,0,-Mn.z,Mn.y,0,-Bn.z,Bn.y,Sn.z,0,-Sn.x,Mn.z,0,-Mn.x,Bn.z,0,-Bn.x,-Sn.y,Sn.x,0,-Mn.y,Mn.x,0,-Bn.y,Bn.x,0];return!Sr(t,si,ri,oi,As)||(t=[1,0,0,0,1,0,0,0,1],!Sr(t,si,ri,oi,As))?!1:(xs.crossVectors(Sn,Mn),t=[xs.x,xs.y,xs.z],Sr(t,si,ri,oi,As))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return Fn.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(an),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const an=[new C,new C,new C,new C,new C,new C,new C,new C],Fn=new C,yr=new Di,si=new C,ri=new C,oi=new C,Sn=new C,Mn=new C,Bn=new C,Hi=new C,As=new C,xs=new C,Un=new C;function Sr(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Un.fromArray(r,s);const a=i.x*Math.abs(Un.x)+i.y*Math.abs(Un.y)+i.z*Math.abs(Un.z),l=e.dot(Un),c=t.dot(Un),h=n.dot(Un);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Cd=new Di,Vi=new C,Mr=new C;class Ni{constructor(e=new C,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Cd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vi.subVectors(e,this.center);const t=Vi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Vi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vi.copy(e.center).add(Mr)),this.expandByPoint(Vi.copy(e.center).sub(Mr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ln=new C,br=new C,ys=new C,bn=new C,wr=new C,Ss=new C,_r=new C;class Co{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ln.copy(this.direction).multiplyScalar(t).add(this.origin),ln.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){br.copy(e).add(t).multiplyScalar(.5),ys.copy(t).sub(e).normalize(),bn.copy(this.origin).sub(br);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ys),a=bn.dot(this.direction),l=-bn.dot(ys),c=bn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const m=1/h;u*=m,d*=m,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(u).add(this.origin),i&&i.copy(ys).multiplyScalar(d).add(br),f}intersectSphere(e,t){ln.subVectors(e.center,this.origin);const n=ln.dot(this.direction),i=ln.dot(ln)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return a<0&&l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ln)!==null}intersectTriangle(e,t,n,i,s){wr.subVectors(t,e),Ss.subVectors(n,e),_r.crossVectors(wr,Ss);let o=this.direction.dot(_r),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;bn.subVectors(this.origin,e);const l=a*this.direction.dot(Ss.crossVectors(bn,Ss));if(l<0)return null;const c=a*this.direction.dot(wr.cross(bn));if(c<0||l+c>o)return null;const h=-a*bn.dot(_r);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ee{constructor(){Ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,i,s,o,a,l,c,h,u,d,f,g,m,p){const v=this.elements;return v[0]=e,v[4]=t,v[8]=n,v[12]=i,v[1]=s,v[5]=o,v[9]=a,v[13]=l,v[2]=c,v[6]=h,v[10]=u,v[14]=d,v[3]=f,v[7]=g,v[11]=m,v[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ee().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ai.setFromMatrixColumn(e,0).length(),s=1/ai.setFromMatrixColumn(e,1).length(),o=1/ai.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,m=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-m*c,t[9]=-a*l,t[2]=m-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,m=c*u;t[0]=d+m*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=m+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,m=c*u;t[0]=d-m*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=m-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,m=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+m,t[1]=l*u,t[5]=m*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,m=a*c;t[0]=l*h,t[4]=m-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-m*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,m=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+m,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=m*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Pd,e,Ld)}lookAt(e,t,n){const i=this.elements;return Rt.subVectors(e,t),Rt.lengthSq()===0&&(Rt.z=1),Rt.normalize(),wn.crossVectors(n,Rt),wn.lengthSq()===0&&(Math.abs(n.z)===1?Rt.x+=1e-4:Rt.z+=1e-4,Rt.normalize(),wn.crossVectors(n,Rt)),wn.normalize(),Ms.crossVectors(Rt,wn),i[0]=wn.x,i[4]=Ms.x,i[8]=Rt.x,i[1]=wn.y,i[5]=Ms.y,i[9]=Rt.y,i[2]=wn.z,i[6]=Ms.z,i[10]=Rt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],m=n[6],p=n[10],v=n[14],S=n[3],A=n[7],x=n[11],w=n[15],E=i[0],P=i[4],y=i[8],T=i[12],z=i[1],G=i[5],J=i[9],k=i[13],R=i[2],F=i[6],X=i[10],Q=i[14],W=i[3],$=i[7],q=i[11],pe=i[15];return s[0]=o*E+a*z+l*R+c*W,s[4]=o*P+a*G+l*F+c*$,s[8]=o*y+a*J+l*X+c*q,s[12]=o*T+a*k+l*Q+c*pe,s[1]=h*E+u*z+d*R+f*W,s[5]=h*P+u*G+d*F+f*$,s[9]=h*y+u*J+d*X+f*q,s[13]=h*T+u*k+d*Q+f*pe,s[2]=g*E+m*z+p*R+v*W,s[6]=g*P+m*G+p*F+v*$,s[10]=g*y+m*J+p*X+v*q,s[14]=g*T+m*k+p*Q+v*pe,s[3]=S*E+A*z+x*R+w*W,s[7]=S*P+A*G+x*F+w*$,s[11]=S*y+A*J+x*X+w*q,s[15]=S*T+A*k+x*Q+w*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],m=e[7],p=e[11],v=e[15];return g*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+m*(+t*l*f-t*c*d+s*o*d-i*o*f+i*c*h-s*l*h)+p*(+t*c*u-t*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+v*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],m=e[13],p=e[14],v=e[15],S=u*p*c-m*d*c+m*l*f-a*p*f-u*l*v+a*d*v,A=g*d*c-h*p*c-g*l*f+o*p*f+h*l*v-o*d*v,x=h*m*c-g*u*c+g*a*f-o*m*f-h*a*v+o*u*v,w=g*u*l-h*m*l-g*a*d+o*m*d+h*a*p-o*u*p,E=t*S+n*A+i*x+s*w;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/E;return e[0]=S*P,e[1]=(m*d*s-u*p*s-m*i*f+n*p*f+u*i*v-n*d*v)*P,e[2]=(a*p*s-m*l*s+m*i*c-n*p*c-a*i*v+n*l*v)*P,e[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*P,e[4]=A*P,e[5]=(h*p*s-g*d*s+g*i*f-t*p*f-h*i*v+t*d*v)*P,e[6]=(g*l*s-o*p*s-g*i*c+t*p*c+o*i*v-t*l*v)*P,e[7]=(o*d*s-h*l*s+h*i*c-t*d*c-o*i*f+t*l*f)*P,e[8]=x*P,e[9]=(g*u*s-h*m*s-g*n*f+t*m*f+h*n*v-t*u*v)*P,e[10]=(o*m*s-g*a*s+g*n*c-t*m*c-o*n*v+t*a*v)*P,e[11]=(h*a*s-o*u*s-h*n*c+t*u*c+o*n*f-t*a*f)*P,e[12]=w*P,e[13]=(h*m*i-g*u*i+g*n*d-t*m*d-h*n*p+t*u*p)*P,e[14]=(g*a*i-o*m*i-g*n*l+t*m*l+o*n*p-t*a*p)*P,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*P,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,g=s*u,m=o*h,p=o*u,v=a*u,S=l*c,A=l*h,x=l*u,w=n.x,E=n.y,P=n.z;return i[0]=(1-(m+v))*w,i[1]=(f+x)*w,i[2]=(g-A)*w,i[3]=0,i[4]=(f-x)*E,i[5]=(1-(d+v))*E,i[6]=(p+S)*E,i[7]=0,i[8]=(g+A)*P,i[9]=(p-S)*P,i[10]=(1-(d+m))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=ai.set(i[0],i[1],i[2]).length();const o=ai.set(i[4],i[5],i[6]).length(),a=ai.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Gt.copy(this);const c=1/s,h=1/o,u=1/a;return Gt.elements[0]*=c,Gt.elements[1]*=c,Gt.elements[2]*=c,Gt.elements[4]*=h,Gt.elements[5]*=h,Gt.elements[6]*=h,Gt.elements[8]*=u,Gt.elements[9]*=u,Gt.elements[10]*=u,t.setFromRotationMatrix(Gt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o){const a=this.elements,l=2*s/(t-e),c=2*s/(n-i),h=(t+e)/(t-e),u=(n+i)/(n-i),d=-(o+s)/(o-s),f=-2*o*s/(o-s);return a[0]=l,a[4]=0,a[8]=h,a[12]=0,a[1]=0,a[5]=c,a[9]=u,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=f,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,o){const a=this.elements,l=1/(t-e),c=1/(n-i),h=1/(o-s),u=(t+e)*l,d=(n+i)*c,f=(o+s)*h;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-u,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=-2*h,a[14]=-f,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ai=new C,Gt=new Ee,Pd=new C(0,0,0),Ld=new C(1,1,1),wn=new C,Ms=new C,Rt=new C,Ia=new Ee,ka=new jt;class Qs{constructor(e=0,t=0,n=0,i=Qs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ia.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ia,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ka.setFromEuler(this),this.setFromQuaternion(ka,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qs.DEFAULT_ORDER="XYZ";class gc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Rd=0;const Da=new C,li=new jt,cn=new Ee,bs=new C,Gi=new C,zd=new C,Id=new jt,Na=new C(1,0,0),Oa=new C(0,1,0),Fa=new C(0,0,1),kd={type:"added"},Ba={type:"removed"};class je extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=qt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=je.DEFAULT_UP.clone();const e=new C,t=new Qs,n=new jt,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ee},normalMatrix:{value:new kt}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=je.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new gc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.multiply(li),this}rotateOnWorldAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.premultiply(li),this}rotateX(e){return this.rotateOnAxis(Na,e)}rotateY(e){return this.rotateOnAxis(Oa,e)}rotateZ(e){return this.rotateOnAxis(Fa,e)}translateOnAxis(e,t){return Da.copy(e).applyQuaternion(this.quaternion),this.position.add(Da.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Na,e)}translateY(e){return this.translateOnAxis(Oa,e)}translateZ(e){return this.translateOnAxis(Fa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bs.copy(e):bs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Gi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cn.lookAt(Gi,bs,this.up):cn.lookAt(bs,Gi,this.up),this.quaternion.setFromRotationMatrix(cn),i&&(cn.extractRotation(i.matrixWorld),li.setFromRotationMatrix(cn),this.quaternion.premultiply(li.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(kd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ba)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Ba)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(cn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectsByProperty(e,t);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,e,zd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,Id,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}je.DEFAULT_UP=new C(0,1,0);je.DEFAULT_MATRIX_AUTO_UPDATE=!0;je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jt=new C,hn=new C,Tr=new C,un=new C,ci=new C,hi=new C,Ua=new C,Er=new C,Cr=new C,Pr=new C;class fn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Jt.subVectors(e,t),i.cross(Jt);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Jt.subVectors(i,t),hn.subVectors(n,t),Tr.subVectors(e,t);const o=Jt.dot(Jt),a=Jt.dot(hn),l=Jt.dot(Tr),c=hn.dot(hn),h=hn.dot(Tr),u=o*c-a*a;if(u===0)return s.set(-2,-1,-1);const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,un),un.x>=0&&un.y>=0&&un.x+un.y<=1}static getUV(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,un),l.set(0,0),l.addScaledVector(s,un.x),l.addScaledVector(o,un.y),l.addScaledVector(a,un.z),l}static isFrontFacing(e,t,n,i){return Jt.subVectors(n,t),hn.subVectors(e,t),Jt.cross(hn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),Jt.cross(hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return fn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return fn.getUV(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;ci.subVectors(i,n),hi.subVectors(s,n),Er.subVectors(e,n);const l=ci.dot(Er),c=hi.dot(Er);if(l<=0&&c<=0)return t.copy(n);Cr.subVectors(e,i);const h=ci.dot(Cr),u=hi.dot(Cr);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(ci,o);Pr.subVectors(e,s);const f=ci.dot(Pr),g=hi.dot(Pr);if(g>=0&&f<=g)return t.copy(s);const m=f*c-l*g;if(m<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(hi,a);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return Ua.subVectors(s,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Ua,a);const v=1/(p+m+d);return o=m*v,a=d*v,t.copy(n).addScaledVector(ci,o).addScaledVector(hi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let Dd=0;class en extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=qt(),this.name="",this.type="Material",this.blending=Zn,this.side=xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=ic,this.blendDst=sc,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=oo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ud,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pr,this.stencilZFail=pr,this.stencilZPass=pr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zn&&(n.blending=this.blending),this.side!==xn&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Xt extends en{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Qe=new C,ws=new oe;class Je{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=uo,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ws.fromBufferAttribute(this,t),ws.applyMatrix3(e),this.setXY(t,ws.x,ws.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Qe.fromBufferAttribute(this,t),Qe.applyMatrix3(e),this.setXYZ(t,Qe.x,Qe.y,Qe.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Qe.fromBufferAttribute(this,t),Qe.applyMatrix4(e),this.setXYZ(t,Qe.x,Qe.y,Qe.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qe.fromBufferAttribute(this,t),Qe.applyNormalMatrix(e),this.setXYZ(t,Qe.x,Qe.y,Qe.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qe.fromBufferAttribute(this,t),Qe.transformDirection(e),this.setXYZ(t,Qe.x,Qe.y,Qe.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ue(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ue(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ue(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ue(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ue(t,this.array),n=Ue(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ue(t,this.array),n=Ue(n,this.array),i=Ue(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ue(t,this.array),n=Ue(n,this.array),i=Ue(i,this.array),s=Ue(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==uo&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class vc extends Je{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ac extends Je{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ze extends Je{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Nd=0;const Ft=new Ee,Lr=new je,ui=new C,zt=new Di,Ji=new Di,ht=new C;class st extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=qt(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(uc(e)?Ac:vc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new kt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ft.makeRotationFromQuaternion(e),this.applyMatrix4(Ft),this}rotateX(e){return Ft.makeRotationX(e),this.applyMatrix4(Ft),this}rotateY(e){return Ft.makeRotationY(e),this.applyMatrix4(Ft),this}rotateZ(e){return Ft.makeRotationZ(e),this.applyMatrix4(Ft),this}translate(e,t,n){return Ft.makeTranslation(e,t,n),this.applyMatrix4(Ft),this}scale(e,t,n){return Ft.makeScale(e,t,n),this.applyMatrix4(Ft),this}lookAt(e){return Lr.lookAt(e),Lr.updateMatrix(),this.applyMatrix4(Lr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ui).negate(),this.translate(ui.x,ui.y,ui.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ze(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];zt.setFromBufferAttribute(s),this.morphTargetsRelative?(ht.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(ht),ht.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(ht)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ji.setFromBufferAttribute(a),this.morphTargetsRelative?(ht.addVectors(zt.min,Ji.min),zt.expandByPoint(ht),ht.addVectors(zt.max,Ji.max),zt.expandByPoint(ht)):(zt.expandByPoint(Ji.min),zt.expandByPoint(Ji.max))}zt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)ht.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(ht));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ht.fromBufferAttribute(a,c),l&&(ui.fromBufferAttribute(e,c),ht.add(ui)),i=Math.max(i,n.distanceToSquared(ht))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let z=0;z<a;z++)c[z]=new C,h[z]=new C;const u=new C,d=new C,f=new C,g=new oe,m=new oe,p=new oe,v=new C,S=new C;function A(z,G,J){u.fromArray(i,z*3),d.fromArray(i,G*3),f.fromArray(i,J*3),g.fromArray(o,z*2),m.fromArray(o,G*2),p.fromArray(o,J*2),d.sub(u),f.sub(u),m.sub(g),p.sub(g);const k=1/(m.x*p.y-p.x*m.y);isFinite(k)&&(v.copy(d).multiplyScalar(p.y).addScaledVector(f,-m.y).multiplyScalar(k),S.copy(f).multiplyScalar(m.x).addScaledVector(d,-p.x).multiplyScalar(k),c[z].add(v),c[G].add(v),c[J].add(v),h[z].add(S),h[G].add(S),h[J].add(S))}let x=this.groups;x.length===0&&(x=[{start:0,count:n.length}]);for(let z=0,G=x.length;z<G;++z){const J=x[z],k=J.start,R=J.count;for(let F=k,X=k+R;F<X;F+=3)A(n[F+0],n[F+1],n[F+2])}const w=new C,E=new C,P=new C,y=new C;function T(z){P.fromArray(s,z*3),y.copy(P);const G=c[z];w.copy(G),w.sub(P.multiplyScalar(P.dot(G))).normalize(),E.crossVectors(y,G);const k=E.dot(h[z])<0?-1:1;l[z*4]=w.x,l[z*4+1]=w.y,l[z*4+2]=w.z,l[z*4+3]=k}for(let z=0,G=x.length;z<G;++z){const J=x[z],k=J.start,R=J.count;for(let F=k,X=k+R;F<X;F+=3)T(n[F+0]),T(n[F+1]),T(n[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,s=new C,o=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),m=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),o.fromBufferAttribute(t,p),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ht.fromBufferAttribute(e,t),ht.normalize(),e.setXYZ(t,ht.x,ht.y,ht.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let m=0,p=l.length;m<p;m++){a.isInterleavedBufferAttribute?f=l[m]*a.data.stride+a.offset:f=l[m]*h;for(let v=0;v<h;v++)d[g++]=c[f++]}return new Je(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new st,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ha=new Ee,di=new Co,Rr=new Ni,Wi=new C,Zi=new C,Xi=new C,zr=new C,_s=new C,Ts=new oe,Es=new oe,Cs=new oe,Ir=new C,Ps=new C;class We extends je{constructor(e=new st,t=new Xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){_s.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(zr.fromBufferAttribute(u,e),o?_s.addScaledVector(zr,h):_s.addScaledVector(zr.sub(t),h))}t.add(_s)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(s),e.ray.intersectsSphere(Rr)===!1)||(Ha.copy(s).invert(),di.copy(e.ray).applyMatrix4(Ha),n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1))return;let o;const a=n.index,l=n.attributes.position,c=n.attributes.uv,h=n.attributes.uv2,u=n.groups,d=n.drawRange;if(a!==null)if(Array.isArray(i))for(let f=0,g=u.length;f<g;f++){const m=u[f],p=i[m.materialIndex],v=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let A=v,x=S;A<x;A+=3){const w=a.getX(A),E=a.getX(A+1),P=a.getX(A+2);o=Ls(this,p,e,di,c,h,w,E,P),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=m.materialIndex,t.push(o))}}else{const f=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let m=f,p=g;m<p;m+=3){const v=a.getX(m),S=a.getX(m+1),A=a.getX(m+2);o=Ls(this,i,e,di,c,h,v,S,A),o&&(o.faceIndex=Math.floor(m/3),t.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let f=0,g=u.length;f<g;f++){const m=u[f],p=i[m.materialIndex],v=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let A=v,x=S;A<x;A+=3){const w=A,E=A+1,P=A+2;o=Ls(this,p,e,di,c,h,w,E,P),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=m.materialIndex,t.push(o))}}else{const f=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let m=f,p=g;m<p;m+=3){const v=m,S=m+1,A=m+2;o=Ls(this,i,e,di,c,h,v,S,A),o&&(o.faceIndex=Math.floor(m/3),t.push(o))}}}}function Od(r,e,t,n,i,s,o,a){let l;if(e.side===Ct?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===xn,a),l===null)return null;Ps.copy(a),Ps.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ps);return c<t.near||c>t.far?null:{distance:c,point:Ps.clone(),object:r}}function Ls(r,e,t,n,i,s,o,a,l){r.getVertexPosition(o,Wi),r.getVertexPosition(a,Zi),r.getVertexPosition(l,Xi);const c=Od(r,e,t,n,Wi,Zi,Xi,Ir);if(c){i&&(Ts.fromBufferAttribute(i,o),Es.fromBufferAttribute(i,a),Cs.fromBufferAttribute(i,l),c.uv=fn.getUV(Ir,Wi,Zi,Xi,Ts,Es,Cs,new oe)),s&&(Ts.fromBufferAttribute(s,o),Es.fromBufferAttribute(s,a),Cs.fromBufferAttribute(s,l),c.uv2=fn.getUV(Ir,Wi,Zi,Xi,Ts,Es,Cs,new oe));const h={a:o,b:a,c:l,normal:new C,materialIndex:0};fn.getNormal(Wi,Zi,Xi,h.normal),c.face=h}return c}class fs extends st{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(u,2));function g(m,p,v,S,A,x,w,E,P,y,T){const z=x/P,G=w/y,J=x/2,k=w/2,R=E/2,F=P+1,X=y+1;let Q=0,W=0;const $=new C;for(let q=0;q<X;q++){const pe=q*G-k;for(let N=0;N<F;N++){const j=N*z-J;$[m]=j*S,$[p]=pe*A,$[v]=R,c.push($.x,$.y,$.z),$[m]=0,$[p]=0,$[v]=E>0?1:-1,h.push($.x,$.y,$.z),u.push(N/P),u.push(1-q/y),Q+=1}}for(let q=0;q<y;q++)for(let pe=0;pe<P;pe++){const N=d+pe+F*q,j=d+pe+F*(q+1),ne=d+(pe+1)+F*(q+1),ie=d+(pe+1)+F*q;l.push(N,j,ie),l.push(j,ne,ie),W+=6}a.addGroup(f,W,T),f+=W,d+=Q}}static fromJSON(e){return new fs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ii(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function bt(r){const e={};for(let t=0;t<r.length;t++){const n=Ii(r[t]);for(const i in n)e[i]=n[i]}return e}function Fd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function xc(r){return r.getRenderTarget()===null&&r.outputEncoding===Ne?Yt:ls}const Bd={clone:Ii,merge:bt};var Ud=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends en{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ud,this.fragmentShader=Hd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ii(e.uniforms),this.uniformsGroups=Fd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}let yc=class extends je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};class wt extends yc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=cs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cs*2*Math.atan(Math.tan(es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(es*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fi=-90,pi=1;class Vd extends je{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new wt(fi,pi,e,t);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const s=new wt(fi,pi,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const o=new wt(fi,pi,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(0,1,0),this.add(o);const a=new wt(fi,pi,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(0,-1,0),this.add(a);const l=new wt(fi,pi,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new wt(fi,pi,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,o,a,l,c]=this.children,h=e.getRenderTarget(),u=e.toneMapping,d=e.xr.enabled;e.toneMapping=An,e.xr.enabled=!1;const f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,o),e.setRenderTarget(n,3),e.render(t,a),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=f,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(h),e.toneMapping=u,e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class Sc extends nt{constructor(e,t,n,i,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Pi,super(e,t,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gd extends yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Sc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:vt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new fs(5,5,5),s=new Tt({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:Pn});s.uniforms.tEquirect.value=t;const o=new We(i,s),a=t.minFilter;return t.minFilter===jn&&(t.minFilter=vt),new Vd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const kr=new C,Jd=new C,Wd=new kt;class Hn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=kr.subVectors(n,t).cross(Jd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const n=e.delta(kr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(n).multiplyScalar(s).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Wd.getNormalMatrix(e),i=this.coplanarPoint(kr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new Ni,Rs=new C;class Po{constructor(e=new Hn,t=new Hn,n=new Hn,i=new Hn,s=new Hn,o=new Hn){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],u=n[7],d=n[8],f=n[9],g=n[10],m=n[11],p=n[12],v=n[13],S=n[14],A=n[15];return t[0].setComponents(a-i,u-l,m-d,A-p).normalize(),t[1].setComponents(a+i,u+l,m+d,A+p).normalize(),t[2].setComponents(a+s,u+c,m+f,A+v).normalize(),t[3].setComponents(a-s,u-c,m-f,A-v).normalize(),t[4].setComponents(a-o,u-h,m-g,A-S).normalize(),t[5].setComponents(a+o,u+h,m+g,A+S).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(mi)}intersectsSprite(e){return mi.center.set(0,0,0),mi.radius=.7071067811865476,mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Rs.x=i.normal.x>0?e.max.x:e.min.x,Rs.y=i.normal.y>0?e.max.y:e.min.y,Rs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Rs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Mc(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Zd(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,f=r.createBuffer();r.bindBuffer(h,f),r.bufferData(h,u,d),c.onUploadCallback();let g;if(u instanceof Float32Array)g=5126;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(u instanceof Int16Array)g=5122;else if(u instanceof Uint32Array)g=5125;else if(u instanceof Int32Array)g=5124;else if(u instanceof Int8Array)g=5120;else if(u instanceof Uint8Array)g=5121;else if(u instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:f,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,u){const d=h.array,f=h.updateRange;r.bindBuffer(u,c),f.count===-1?r.bufferSubData(u,0,d):(t?r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,i(c,h)):u.version<c.version&&(s(u.buffer,c,h),u.version=c.version)}return{get:o,remove:a,update:l}}class zn extends st{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],m=[],p=[];for(let v=0;v<h;v++){const S=v*d-o;for(let A=0;A<c;A++){const x=A*u-s;g.push(x,-S,0),m.push(0,0,1),p.push(A/a),p.push(1-v/l)}}for(let v=0;v<l;v++)for(let S=0;S<a;S++){const A=S+c*v,x=S+c*(v+1),w=S+1+c*(v+1),E=S+1+c*v;f.push(A,x,E),f.push(x,w,E)}this.setIndex(f),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(m,3)),this.setAttribute("uv",new Ze(p,2))}static fromJSON(e){return new zn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Xd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Yd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Qd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$d="vec3 transformed = vec3( position );",ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tf=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,nf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,df=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,ff=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,pf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mf=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Af=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sf=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,bf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ef=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,If=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Df=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Of=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Ff=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Uf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,Gf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Jf=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Xf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Yf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Kf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$f=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ep=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ip=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,rp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,ap=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,lp=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,fp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,pp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,mp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,gp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ap=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,xp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Tp=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ep=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Rp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ip=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Np=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Op=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Fp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Bp=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Up=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Hp=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Vp=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Gp=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Jp=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,Wp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Qp=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$p=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,em=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,sm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,om=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,am=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,um=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Am=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ym=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mm=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,wm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_m=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,_e={alphamap_fragment:Xd,alphamap_pars_fragment:qd,alphatest_fragment:jd,alphatest_pars_fragment:Yd,aomap_fragment:Kd,aomap_pars_fragment:Qd,begin_vertex:$d,beginnormal_vertex:ef,bsdfs:tf,iridescence_fragment:nf,bumpmap_pars_fragment:sf,clipping_planes_fragment:rf,clipping_planes_pars_fragment:of,clipping_planes_pars_vertex:af,clipping_planes_vertex:lf,color_fragment:cf,color_pars_fragment:hf,color_pars_vertex:uf,color_vertex:df,common:ff,cube_uv_reflection_fragment:pf,defaultnormal_vertex:mf,displacementmap_pars_vertex:gf,displacementmap_vertex:vf,emissivemap_fragment:Af,emissivemap_pars_fragment:xf,encodings_fragment:yf,encodings_pars_fragment:Sf,envmap_fragment:Mf,envmap_common_pars_fragment:bf,envmap_pars_fragment:wf,envmap_pars_vertex:_f,envmap_physical_pars_fragment:Of,envmap_vertex:Tf,fog_vertex:Ef,fog_pars_vertex:Cf,fog_fragment:Pf,fog_pars_fragment:Lf,gradientmap_pars_fragment:Rf,lightmap_fragment:zf,lightmap_pars_fragment:If,lights_lambert_fragment:kf,lights_lambert_pars_fragment:Df,lights_pars_begin:Nf,lights_toon_fragment:Ff,lights_toon_pars_fragment:Bf,lights_phong_fragment:Uf,lights_phong_pars_fragment:Hf,lights_physical_fragment:Vf,lights_physical_pars_fragment:Gf,lights_fragment_begin:Jf,lights_fragment_maps:Wf,lights_fragment_end:Zf,logdepthbuf_fragment:Xf,logdepthbuf_pars_fragment:qf,logdepthbuf_pars_vertex:jf,logdepthbuf_vertex:Yf,map_fragment:Kf,map_pars_fragment:Qf,map_particle_fragment:$f,map_particle_pars_fragment:ep,metalnessmap_fragment:tp,metalnessmap_pars_fragment:np,morphcolor_vertex:ip,morphnormal_vertex:sp,morphtarget_pars_vertex:rp,morphtarget_vertex:op,normal_fragment_begin:ap,normal_fragment_maps:lp,normal_pars_fragment:cp,normal_pars_vertex:hp,normal_vertex:up,normalmap_pars_fragment:dp,clearcoat_normal_fragment_begin:fp,clearcoat_normal_fragment_maps:pp,clearcoat_pars_fragment:mp,iridescence_pars_fragment:gp,output_fragment:vp,packing:Ap,premultiplied_alpha_fragment:xp,project_vertex:yp,dithering_fragment:Sp,dithering_pars_fragment:Mp,roughnessmap_fragment:bp,roughnessmap_pars_fragment:wp,shadowmap_pars_fragment:_p,shadowmap_pars_vertex:Tp,shadowmap_vertex:Ep,shadowmask_pars_fragment:Cp,skinbase_vertex:Pp,skinning_pars_vertex:Lp,skinning_vertex:Rp,skinnormal_vertex:zp,specularmap_fragment:Ip,specularmap_pars_fragment:kp,tonemapping_fragment:Dp,tonemapping_pars_fragment:Np,transmission_fragment:Op,transmission_pars_fragment:Fp,uv_pars_fragment:Bp,uv_pars_vertex:Up,uv_vertex:Hp,uv2_pars_fragment:Vp,uv2_pars_vertex:Gp,uv2_vertex:Jp,worldpos_vertex:Wp,background_vert:Zp,background_frag:Xp,backgroundCube_vert:qp,backgroundCube_frag:jp,cube_vert:Yp,cube_frag:Kp,depth_vert:Qp,depth_frag:$p,distanceRGBA_vert:em,distanceRGBA_frag:tm,equirect_vert:nm,equirect_frag:im,linedashed_vert:sm,linedashed_frag:rm,meshbasic_vert:om,meshbasic_frag:am,meshlambert_vert:lm,meshlambert_frag:cm,meshmatcap_vert:hm,meshmatcap_frag:um,meshnormal_vert:dm,meshnormal_frag:fm,meshphong_vert:pm,meshphong_frag:mm,meshphysical_vert:gm,meshphysical_frag:vm,meshtoon_vert:Am,meshtoon_frag:xm,points_vert:ym,points_frag:Sm,shadow_vert:Mm,shadow_frag:bm,sprite_vert:wm,sprite_frag:_m},te={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new kt},uv2Transform:{value:new kt},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new kt}}},Kt={basic:{uniforms:bt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.fog]),vertexShader:_e.meshbasic_vert,fragmentShader:_e.meshbasic_frag},lambert:{uniforms:bt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Ae(0)}}]),vertexShader:_e.meshlambert_vert,fragmentShader:_e.meshlambert_frag},phong:{uniforms:bt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30}}]),vertexShader:_e.meshphong_vert,fragmentShader:_e.meshphong_frag},standard:{uniforms:bt([te.common,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.roughnessmap,te.metalnessmap,te.fog,te.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_e.meshphysical_vert,fragmentShader:_e.meshphysical_frag},toon:{uniforms:bt([te.common,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.gradientmap,te.fog,te.lights,{emissive:{value:new Ae(0)}}]),vertexShader:_e.meshtoon_vert,fragmentShader:_e.meshtoon_frag},matcap:{uniforms:bt([te.common,te.bumpmap,te.normalmap,te.displacementmap,te.fog,{matcap:{value:null}}]),vertexShader:_e.meshmatcap_vert,fragmentShader:_e.meshmatcap_frag},points:{uniforms:bt([te.points,te.fog]),vertexShader:_e.points_vert,fragmentShader:_e.points_frag},dashed:{uniforms:bt([te.common,te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_e.linedashed_vert,fragmentShader:_e.linedashed_frag},depth:{uniforms:bt([te.common,te.displacementmap]),vertexShader:_e.depth_vert,fragmentShader:_e.depth_frag},normal:{uniforms:bt([te.common,te.bumpmap,te.normalmap,te.displacementmap,{opacity:{value:1}}]),vertexShader:_e.meshnormal_vert,fragmentShader:_e.meshnormal_frag},sprite:{uniforms:bt([te.sprite,te.fog]),vertexShader:_e.sprite_vert,fragmentShader:_e.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_e.background_vert,fragmentShader:_e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:_e.backgroundCube_vert,fragmentShader:_e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_e.cube_vert,fragmentShader:_e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_e.equirect_vert,fragmentShader:_e.equirect_frag},distanceRGBA:{uniforms:bt([te.common,te.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_e.distanceRGBA_vert,fragmentShader:_e.distanceRGBA_frag},shadow:{uniforms:bt([te.lights,te.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:_e.shadow_vert,fragmentShader:_e.shadow_frag}};Kt.physical={uniforms:bt([Kt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new oe(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null}}]),vertexShader:_e.meshphysical_vert,fragmentShader:_e.meshphysical_frag};const zs={r:0,b:0,g:0};function Tm(r,e,t,n,i,s,o){const a=new Ae(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(p,v){let S=!1,A=v.isScene===!0?v.background:null;A&&A.isTexture&&(A=(v.backgroundBlurriness>0?t:e).get(A));const x=r.xr,w=x.getSession&&x.getSession();w&&w.environmentBlendMode==="additive"&&(A=null),A===null?m(a,l):A&&A.isColor&&(m(A,1),S=!0),(r.autoClear||S)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),A&&(A.isCubeTexture||A.mapping===Ks)?(h===void 0&&(h=new We(new fs(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:Ii(Kt.backgroundCube.uniforms),vertexShader:Kt.backgroundCube.vertexShader,fragmentShader:Kt.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,P,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.toneMapped=A.encoding!==Ne,(u!==A||d!==A.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=A,d=A.version,f=r.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new We(new zn(2,2),new Tt({name:"BackgroundMaterial",uniforms:Ii(Kt.background.uniforms),vertexShader:Kt.background.vertexShader,fragmentShader:Kt.background.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=A.encoding!==Ne,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=A,d=A.version,f=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function m(p,v){p.getRGB(zs,xc(r)),n.buffers.color.setClear(zs.r,zs.g,zs.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(p,v=1){a.set(p),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,m(a,l)},render:g}}function Em(r,e,t,n){const i=r.getParameter(34921),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=p(null);let c=l,h=!1;function u(R,F,X,Q,W){let $=!1;if(o){const q=m(Q,X,F);c!==q&&(c=q,f(c.object)),$=v(R,Q,X,W),$&&S(R,Q,X,W)}else{const q=F.wireframe===!0;(c.geometry!==Q.id||c.program!==X.id||c.wireframe!==q)&&(c.geometry=Q.id,c.program=X.id,c.wireframe=q,$=!0)}W!==null&&t.update(W,34963),($||h)&&(h=!1,y(R,F,X,Q),W!==null&&r.bindBuffer(34963,t.get(W).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(R){return n.isWebGL2?r.bindVertexArray(R):s.bindVertexArrayOES(R)}function g(R){return n.isWebGL2?r.deleteVertexArray(R):s.deleteVertexArrayOES(R)}function m(R,F,X){const Q=X.wireframe===!0;let W=a[R.id];W===void 0&&(W={},a[R.id]=W);let $=W[F.id];$===void 0&&($={},W[F.id]=$);let q=$[Q];return q===void 0&&(q=p(d()),$[Q]=q),q}function p(R){const F=[],X=[],Q=[];for(let W=0;W<i;W++)F[W]=0,X[W]=0,Q[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:X,attributeDivisors:Q,object:R,attributes:{},index:null}}function v(R,F,X,Q){const W=c.attributes,$=F.attributes;let q=0;const pe=X.getAttributes();for(const N in pe)if(pe[N].location>=0){const ne=W[N];let ie=$[N];if(ie===void 0&&(N==="instanceMatrix"&&R.instanceMatrix&&(ie=R.instanceMatrix),N==="instanceColor"&&R.instanceColor&&(ie=R.instanceColor)),ne===void 0||ne.attribute!==ie||ie&&ne.data!==ie.data)return!0;q++}return c.attributesNum!==q||c.index!==Q}function S(R,F,X,Q){const W={},$=F.attributes;let q=0;const pe=X.getAttributes();for(const N in pe)if(pe[N].location>=0){let ne=$[N];ne===void 0&&(N==="instanceMatrix"&&R.instanceMatrix&&(ne=R.instanceMatrix),N==="instanceColor"&&R.instanceColor&&(ne=R.instanceColor));const ie={};ie.attribute=ne,ne&&ne.data&&(ie.data=ne.data),W[N]=ie,q++}c.attributes=W,c.attributesNum=q,c.index=Q}function A(){const R=c.newAttributes;for(let F=0,X=R.length;F<X;F++)R[F]=0}function x(R){w(R,0)}function w(R,F){const X=c.newAttributes,Q=c.enabledAttributes,W=c.attributeDivisors;X[R]=1,Q[R]===0&&(r.enableVertexAttribArray(R),Q[R]=1),W[R]!==F&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,F),W[R]=F)}function E(){const R=c.newAttributes,F=c.enabledAttributes;for(let X=0,Q=F.length;X<Q;X++)F[X]!==R[X]&&(r.disableVertexAttribArray(X),F[X]=0)}function P(R,F,X,Q,W,$){n.isWebGL2===!0&&(X===5124||X===5125)?r.vertexAttribIPointer(R,F,X,W,$):r.vertexAttribPointer(R,F,X,Q,W,$)}function y(R,F,X,Q){if(n.isWebGL2===!1&&(R.isInstancedMesh||Q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;A();const W=Q.attributes,$=X.getAttributes(),q=F.defaultAttributeValues;for(const pe in $){const N=$[pe];if(N.location>=0){let j=W[pe];if(j===void 0&&(pe==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),pe==="instanceColor"&&R.instanceColor&&(j=R.instanceColor)),j!==void 0){const ne=j.normalized,ie=j.itemSize,O=t.get(j);if(O===void 0)continue;const be=O.buffer,ue=O.type,de=O.bytesPerElement;if(j.isInterleavedBufferAttribute){const le=j.data,Ve=le.stride,we=j.offset;if(le.isInstancedInterleavedBuffer){for(let ye=0;ye<N.locationSize;ye++)w(N.location+ye,le.meshPerAttribute);R.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ye=0;ye<N.locationSize;ye++)x(N.location+ye);r.bindBuffer(34962,be);for(let ye=0;ye<N.locationSize;ye++)P(N.location+ye,ie/N.locationSize,ue,ne,Ve*de,(we+ie/N.locationSize*ye)*de)}else{if(j.isInstancedBufferAttribute){for(let le=0;le<N.locationSize;le++)w(N.location+le,j.meshPerAttribute);R.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let le=0;le<N.locationSize;le++)x(N.location+le);r.bindBuffer(34962,be);for(let le=0;le<N.locationSize;le++)P(N.location+le,ie/N.locationSize,ue,ne,ie*de,ie/N.locationSize*le*de)}}else if(q!==void 0){const ne=q[pe];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(N.location,ne);break;case 3:r.vertexAttrib3fv(N.location,ne);break;case 4:r.vertexAttrib4fv(N.location,ne);break;default:r.vertexAttrib1fv(N.location,ne)}}}}E()}function T(){J();for(const R in a){const F=a[R];for(const X in F){const Q=F[X];for(const W in Q)g(Q[W].object),delete Q[W];delete F[X]}delete a[R]}}function z(R){if(a[R.id]===void 0)return;const F=a[R.id];for(const X in F){const Q=F[X];for(const W in Q)g(Q[W].object),delete Q[W];delete F[X]}delete a[R.id]}function G(R){for(const F in a){const X=a[F];if(X[R.id]===void 0)continue;const Q=X[R.id];for(const W in Q)g(Q[W].object),delete Q[W];delete X[R.id]}}function J(){k(),h=!0,c!==l&&(c=l,f(c.object))}function k(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:J,resetDefaultState:k,dispose:T,releaseStatesOfGeometry:z,releaseStatesOfProgram:G,initAttributes:A,enableAttribute:x,disableUnusedAttributes:E}}function Cm(r,e,t,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,h){r.drawArrays(s,c,h),t.update(h,s,1)}function l(c,h,u){if(u===0)return;let d,f;if(i)d=r,f="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),f="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[f](s,c,h,u),t.update(h,s,u)}this.setMode=o,this.render=a,this.renderInstances=l}function Pm(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(P){if(P==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r instanceof WebGL2RenderingContext;let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(34930),d=r.getParameter(35660),f=r.getParameter(3379),g=r.getParameter(34076),m=r.getParameter(34921),p=r.getParameter(36347),v=r.getParameter(36348),S=r.getParameter(36349),A=d>0,x=o||e.has("OES_texture_float"),w=A&&x,E=o?r.getParameter(36183):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:p,maxVaryings:v,maxFragmentUniforms:S,vertexTextures:A,floatFragmentTextures:x,floatVertexTextures:w,maxSamples:E}}function Lm(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Hn,a=new kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,m=u.clipIntersection,p=u.clipShadows,v=r.get(u);if(!i||g===null||g.length===0||s&&!p)s?h(null):c();else{const S=s?0:n,A=S*4;let x=v.clippingState||null;l.value=x,x=h(g,d,A,f);for(let w=0;w!==A;++w)x[w]=t[w];v.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const m=u!==null?u.length:0;let p=null;if(m!==0){if(p=l.value,g!==!0||p===null){const v=f+m*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(p===null||p.length<v)&&(p=new Float32Array(v));for(let A=0,x=f;A!==m;++A,x+=4)o.copy(u[A]).applyMatrix4(S,a),o.normal.toArray(p,x),p[x+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,p}}function Rm(r){let e=new WeakMap;function t(o,a){return a===ao?o.mapping=Pi:a===lo&&(o.mapping=Li),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===ao||a===lo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Gd(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class $s extends yc{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Si=4,Va=[.125,.215,.35,.446,.526,.582],Gn=20,Dr=new $s,Ga=new Ae;let Nr=null;const Vn=(1+Math.sqrt(5))/2,gi=1/Vn,Ja=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,Vn,gi),new C(0,Vn,-gi),new C(gi,0,Vn),new C(-gi,0,Vn),new C(Vn,gi,0),new C(-Vn,gi,0)];class Wa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Nr=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nr),e.scissorTest=!1,Is(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===Li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nr=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:vt,minFilter:vt,generateMipmaps:!1,type:os,format:It,encoding:Kn,depthBuffer:!1},i=Za(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Za(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zm(s)),this._blurMaterial=Im(s,e,t)}return i}_compileMaterial(e){const t=new We(this._lodPlanes[0],e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,n,i){const a=new wt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Ga),h.toneMapping=An,h.autoClear=!1;const f=new Xt({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),g=new We(new fs,f);let m=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,m=!0):(f.color.copy(Ga),m=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(a.up.set(0,l[v],0),a.lookAt(c[v],0,0)):S===1?(a.up.set(0,0,l[v]),a.lookAt(0,c[v],0)):(a.up.set(0,l[v],0),a.lookAt(0,0,c[v]));const A=this._cubeSize;Is(i,S*A,v>2?A:0,A,A),h.setRenderTarget(i),m&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Pi||e.mapping===Li;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=qa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xa());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new We(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Is(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Ja[(i-1)%Ja.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new We(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Gn-1),m=s/g,p=isFinite(s)?1+Math.floor(h*m):Gn;p>Gn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Gn}`);const v=[];let S=0;for(let P=0;P<Gn;++P){const y=P/m,T=Math.exp(-y*y/2);v.push(T),P===0?S+=T:P<p&&(S+=2*T)}for(let P=0;P<v.length;P++)v[P]=v[P]/S;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=v,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:A}=this;d.dTheta.value=g,d.mipInt.value=A-n;const x=this._sizeLods[i],w=3*x*(i>A-Si?i-A+Si:0),E=4*(this._cubeSize-x);Is(t,w,E,3*x,2*x),l.setRenderTarget(t),l.render(u,Dr)}}function zm(r){const e=[],t=[],n=[];let i=r;const s=r-Si+1+Va.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Si?l=Va[o-r+Si-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,m=3,p=2,v=1,S=new Float32Array(m*g*f),A=new Float32Array(p*g*f),x=new Float32Array(v*g*f);for(let E=0;E<f;E++){const P=E%3*2/3-1,y=E>2?0:-1,T=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];S.set(T,m*g*E),A.set(d,p*g*E);const z=[E,E,E,E,E,E];x.set(z,v*g*E)}const w=new st;w.setAttribute("position",new Je(S,m)),w.setAttribute("uv",new Je(A,p)),w.setAttribute("faceIndex",new Je(x,v)),e.push(w),i>Si&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Za(r,e,t){const n=new yn(r,e,t);return n.texture.mapping=Ks,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Is(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Im(r,e,t){const n=new Float32Array(Gn),i=new C(0,1,0);return new Tt({name:"SphericalGaussianBlur",defines:{n:Gn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Xa(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function qa(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Lo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function km(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ao||l===lo,h=l===Pi||l===Li;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Wa(r)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Wa(r));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Dm(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Nm(r,e,t,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],34962);const f=u.morphAttributes;for(const g in f){const m=f[g];for(let p=0,v=m.length;p<v;p++)e.update(m[p],34962)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let m=0;if(f!==null){const S=f.array;m=f.version;for(let A=0,x=S.length;A<x;A+=3){const w=S[A+0],E=S[A+1],P=S[A+2];d.push(w,E,E,P,P,w)}}else{const S=g.array;m=g.version;for(let A=0,x=S.length/3-1;A<x;A+=3){const w=A+0,E=A+1,P=A+2;d.push(w,E,E,P,P,w)}}const p=new(uc(d)?Ac:vc)(d,1);p.version=m;const v=s.get(u);v&&e.remove(v),s.set(u,p)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Om(r,e,t,n){const i=n.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,f){r.drawElements(s,f,a,d*l),t.update(f,s,1)}function u(d,f,g){if(g===0)return;let m,p;if(i)m=r,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,f,a,d*l,g),t.update(f,s,g)}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u}function Fm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case 4:t.triangles+=a*(s/3);break;case 1:t.lines+=a*(s/2);break;case 3:t.lines+=a*(s-1);break;case 2:t.lines+=a*s;break;case 0:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Bm(r,e){return r[0]-e[0]}function Um(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Hm(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new He,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u,d){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,m=g!==void 0?g.length:0;let p=s.get(h);if(p===void 0||p.count!==m){let F=function(){k.dispose(),s.delete(h),h.removeEventListener("dispose",F)};p!==void 0&&p.texture.dispose();const A=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,w=h.morphAttributes.color!==void 0,E=h.morphAttributes.position||[],P=h.morphAttributes.normal||[],y=h.morphAttributes.color||[];let T=0;A===!0&&(T=1),x===!0&&(T=2),w===!0&&(T=3);let z=h.attributes.position.count*T,G=1;z>e.maxTextureSize&&(G=Math.ceil(z/e.maxTextureSize),z=e.maxTextureSize);const J=new Float32Array(z*G*4*m),k=new mc(J,z,G,m);k.type=mn,k.needsUpdate=!0;const R=T*4;for(let X=0;X<m;X++){const Q=E[X],W=P[X],$=y[X],q=z*G*4*X;for(let pe=0;pe<Q.count;pe++){const N=pe*R;A===!0&&(o.fromBufferAttribute(Q,pe),J[q+N+0]=o.x,J[q+N+1]=o.y,J[q+N+2]=o.z,J[q+N+3]=0),x===!0&&(o.fromBufferAttribute(W,pe),J[q+N+4]=o.x,J[q+N+5]=o.y,J[q+N+6]=o.z,J[q+N+7]=0),w===!0&&(o.fromBufferAttribute($,pe),J[q+N+8]=o.x,J[q+N+9]=o.y,J[q+N+10]=o.z,J[q+N+11]=$.itemSize===4?o.w:1)}}p={count:m,texture:k,size:new oe(z,G)},s.set(h,p),h.addEventListener("dispose",F)}let v=0;for(let A=0;A<f.length;A++)v+=f[A];const S=h.morphTargetsRelative?1:1-v;d.getUniforms().setValue(r,"morphTargetBaseInfluence",S),d.getUniforms().setValue(r,"morphTargetInfluences",f),d.getUniforms().setValue(r,"morphTargetsTexture",p.texture,t),d.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let m=n[h.id];if(m===void 0||m.length!==g){m=[];for(let x=0;x<g;x++)m[x]=[x,0];n[h.id]=m}for(let x=0;x<g;x++){const w=m[x];w[0]=x,w[1]=f[x]}m.sort(Um);for(let x=0;x<8;x++)x<g&&m[x][1]?(a[x][0]=m[x][0],a[x][1]=m[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(Bm);const p=h.morphAttributes.position,v=h.morphAttributes.normal;let S=0;for(let x=0;x<8;x++){const w=a[x],E=w[0],P=w[1];E!==Number.MAX_SAFE_INTEGER&&P?(p&&h.getAttribute("morphTarget"+x)!==p[E]&&h.setAttribute("morphTarget"+x,p[E]),v&&h.getAttribute("morphNormal"+x)!==v[E]&&h.setAttribute("morphNormal"+x,v[E]),i[x]=P,S+=P):(p&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),v&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),i[x]=0)}const A=h.morphTargetsRelative?1:1-S;d.getUniforms().setValue(r,"morphTargetBaseInfluence",A),d.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function Vm(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);return i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const bc=new nt,wc=new mc,_c=new Ed,Tc=new Sc,ja=[],Ya=[],Ka=new Float32Array(16),Qa=new Float32Array(9),$a=new Float32Array(4);function Oi(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=ja[i];if(s===void 0&&(s=new Float32Array(i),ja[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function rt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function ot(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function er(r,e){let t=Ya[e];t===void 0&&(t=new Int32Array(e),Ya[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Gm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Jm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;r.uniform2fv(this.addr,e),ot(t,e)}}function Wm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rt(t,e))return;r.uniform3fv(this.addr,e),ot(t,e)}}function Zm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;r.uniform4fv(this.addr,e),ot(t,e)}}function Xm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),ot(t,e)}else{if(rt(t,n))return;$a.set(n),r.uniformMatrix2fv(this.addr,!1,$a),ot(t,n)}}function qm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),ot(t,e)}else{if(rt(t,n))return;Qa.set(n),r.uniformMatrix3fv(this.addr,!1,Qa),ot(t,n)}}function jm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),ot(t,e)}else{if(rt(t,n))return;Ka.set(n),r.uniformMatrix4fv(this.addr,!1,Ka),ot(t,n)}}function Ym(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Km(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;r.uniform2iv(this.addr,e),ot(t,e)}}function Qm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rt(t,e))return;r.uniform3iv(this.addr,e),ot(t,e)}}function $m(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;r.uniform4iv(this.addr,e),ot(t,e)}}function eg(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function tg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;r.uniform2uiv(this.addr,e),ot(t,e)}}function ng(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rt(t,e))return;r.uniform3uiv(this.addr,e),ot(t,e)}}function ig(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;r.uniform4uiv(this.addr,e),ot(t,e)}}function sg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||bc,i)}function rg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||_c,i)}function og(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Tc,i)}function ag(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||wc,i)}function lg(r){switch(r){case 5126:return Gm;case 35664:return Jm;case 35665:return Wm;case 35666:return Zm;case 35674:return Xm;case 35675:return qm;case 35676:return jm;case 5124:case 35670:return Ym;case 35667:case 35671:return Km;case 35668:case 35672:return Qm;case 35669:case 35673:return $m;case 5125:return eg;case 36294:return tg;case 36295:return ng;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return sg;case 35679:case 36299:case 36307:return rg;case 35680:case 36300:case 36308:case 36293:return og;case 36289:case 36303:case 36311:case 36292:return ag}}function cg(r,e){r.uniform1fv(this.addr,e)}function hg(r,e){const t=Oi(e,this.size,2);r.uniform2fv(this.addr,t)}function ug(r,e){const t=Oi(e,this.size,3);r.uniform3fv(this.addr,t)}function dg(r,e){const t=Oi(e,this.size,4);r.uniform4fv(this.addr,t)}function fg(r,e){const t=Oi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function pg(r,e){const t=Oi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function mg(r,e){const t=Oi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function gg(r,e){r.uniform1iv(this.addr,e)}function vg(r,e){r.uniform2iv(this.addr,e)}function Ag(r,e){r.uniform3iv(this.addr,e)}function xg(r,e){r.uniform4iv(this.addr,e)}function yg(r,e){r.uniform1uiv(this.addr,e)}function Sg(r,e){r.uniform2uiv(this.addr,e)}function Mg(r,e){r.uniform3uiv(this.addr,e)}function bg(r,e){r.uniform4uiv(this.addr,e)}function wg(r,e,t){const n=this.cache,i=e.length,s=er(t,i);rt(n,s)||(r.uniform1iv(this.addr,s),ot(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||bc,s[o])}function _g(r,e,t){const n=this.cache,i=e.length,s=er(t,i);rt(n,s)||(r.uniform1iv(this.addr,s),ot(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||_c,s[o])}function Tg(r,e,t){const n=this.cache,i=e.length,s=er(t,i);rt(n,s)||(r.uniform1iv(this.addr,s),ot(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Tc,s[o])}function Eg(r,e,t){const n=this.cache,i=e.length,s=er(t,i);rt(n,s)||(r.uniform1iv(this.addr,s),ot(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||wc,s[o])}function Cg(r){switch(r){case 5126:return cg;case 35664:return hg;case 35665:return ug;case 35666:return dg;case 35674:return fg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return vg;case 35668:case 35672:return Ag;case 35669:case 35673:return xg;case 5125:return yg;case 36294:return Sg;case 36295:return Mg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return _g;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return Eg}}class Pg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=lg(t.type)}}class Lg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=Cg(t.type)}}class Rg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Or=/(\w+)(\])?(\[|\.)?/g;function el(r,e){r.seq.push(e),r.map[e.id]=e}function zg(r,e,t){const n=r.name,i=n.length;for(Or.lastIndex=0;;){const s=Or.exec(n),o=Or.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){el(t,c===void 0?new Pg(a,r,e):new Lg(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new Rg(a),el(t,u)),t=u}}}class Js{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);zg(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function tl(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}let Ig=0;function kg(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Dg(r){switch(r){case Kn:return["Linear","( value )"];case Ne:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function nl(r,e,t){const n=r.getShaderParameter(e,35713),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+kg(r.getShaderSource(e),o)}else return i}function Ng(r,e){const t=Dg(e);return"vec4 "+r+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function Og(r,e){let t;switch(e){case Ou:t="Linear";break;case Fu:t="Reinhard";break;case Bu:t="OptimizedCineon";break;case Uu:t="ACESFilmic";break;case Hu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Fg(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter($i).join(`
`)}function Bg(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ug(r,e){const t={},n=r.getProgramParameter(e,35721);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function $i(r){return r!==""}function il(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function mo(r){return r.replace(Hg,Vg)}function Vg(r,e){const t=_e[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return mo(t)}const Gg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rl(r){return r.replace(Gg,Jg)}function Jg(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function ol(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Wg(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===nc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===mu?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Qi&&(e="SHADOWMAP_TYPE_VSM"),e}function Zg(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Pi:case Li:e="ENVMAP_TYPE_CUBE";break;case Ks:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xg(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Li:e="ENVMAP_MODE_REFRACTION";break}return e}function qg(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case rc:e="ENVMAP_BLENDING_MULTIPLY";break;case Du:e="ENVMAP_BLENDING_MIX";break;case Nu:e="ENVMAP_BLENDING_ADD";break}return e}function jg(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Yg(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Wg(t),c=Zg(t),h=Xg(t),u=qg(t),d=jg(t),f=t.isWebGL2?"":Fg(t),g=Bg(s),m=i.createProgram();let p,v,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=[g].filter($i).join(`
`),p.length>0&&(p+=`
`),v=[f,g].filter($i).join(`
`),v.length>0&&(v+=`
`)):(p=[ol(t),"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($i).join(`
`),v=[f,ol(t),"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?_e.tonemapping_pars_fragment:"",t.toneMapping!==An?Og("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",_e.encodings_pars_fragment,Ng("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($i).join(`
`)),o=mo(o),o=il(o,t),o=sl(o,t),a=mo(a),a=il(a,t),a=sl(a,t),o=rl(o),a=rl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["#define varying in",t.glslVersion===La?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===La?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const A=S+p+o,x=S+v+a,w=tl(i,35633,A),E=tl(i,35632,x);if(i.attachShader(m,w),i.attachShader(m,E),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),r.debug.checkShaderErrors){const T=i.getProgramInfoLog(m).trim(),z=i.getShaderInfoLog(w).trim(),G=i.getShaderInfoLog(E).trim();let J=!0,k=!0;if(i.getProgramParameter(m,35714)===!1){J=!1;const R=nl(i,w,"vertex"),F=nl(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,35715)+`

Program Info Log: `+T+`
`+R+`
`+F)}else T!==""?console.warn("THREE.WebGLProgram: Program Info Log:",T):(z===""||G==="")&&(k=!1);k&&(this.diagnostics={runnable:J,programLog:T,vertexShader:{log:z,prefix:p},fragmentShader:{log:G,prefix:v}})}i.deleteShader(w),i.deleteShader(E);let P;this.getUniforms=function(){return P===void 0&&(P=new Js(i,m)),P};let y;return this.getAttributes=function(){return y===void 0&&(y=Ug(i,m)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.name=t.shaderName,this.id=Ig++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=E,this}let Kg=0;class Qg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new $g(e),t.set(e,n)),n}}class $g{constructor(e){this.id=Kg++,this.code=e,this.usedTimes=0}}function ev(r,e,t,n,i,s,o){const a=new gc,l=new Qg,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y,T,z,G,J){const k=G.fog,R=J.geometry,F=y.isMeshStandardMaterial?G.environment:null,X=(y.isMeshStandardMaterial?t:e).get(y.envMap||F),Q=X&&X.mapping===Ks?X.image.height:null,W=g[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const $=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,q=$!==void 0?$.length:0;let pe=0;R.morphAttributes.position!==void 0&&(pe=1),R.morphAttributes.normal!==void 0&&(pe=2),R.morphAttributes.color!==void 0&&(pe=3);let N,j,ne,ie;if(W){const Ve=Kt[W];N=Ve.vertexShader,j=Ve.fragmentShader}else N=y.vertexShader,j=y.fragmentShader,l.update(y),ne=l.getVertexShaderID(y),ie=l.getFragmentShaderID(y);const O=r.getRenderTarget(),be=y.alphaTest>0,ue=y.clearcoat>0,de=y.iridescence>0;return{isWebGL2:h,shaderID:W,shaderName:y.type,vertexShader:N,fragmentShader:j,defines:y.defines,customVertexShaderID:ne,customFragmentShaderID:ie,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,instancing:J.isInstancedMesh===!0,instancingColor:J.isInstancedMesh===!0&&J.instanceColor!==null,supportsVertexTextures:d,outputEncoding:O===null?r.outputEncoding:O.isXRRenderTarget===!0?O.texture.encoding:Kn,map:!!y.map,matcap:!!y.matcap,envMap:!!X,envMapMode:X&&X.mapping,envMapCubeUVHeight:Q,lightMap:!!y.lightMap,aoMap:!!y.aoMap,emissiveMap:!!y.emissiveMap,bumpMap:!!y.bumpMap,normalMap:!!y.normalMap,objectSpaceNormalMap:y.normalMapType===hd,tangentSpaceNormalMap:y.normalMapType===cc,decodeVideoTexture:!!y.map&&y.map.isVideoTexture===!0&&y.map.encoding===Ne,clearcoat:ue,clearcoatMap:ue&&!!y.clearcoatMap,clearcoatRoughnessMap:ue&&!!y.clearcoatRoughnessMap,clearcoatNormalMap:ue&&!!y.clearcoatNormalMap,iridescence:de,iridescenceMap:de&&!!y.iridescenceMap,iridescenceThicknessMap:de&&!!y.iridescenceThicknessMap,displacementMap:!!y.displacementMap,roughnessMap:!!y.roughnessMap,metalnessMap:!!y.metalnessMap,specularMap:!!y.specularMap,specularIntensityMap:!!y.specularIntensityMap,specularColorMap:!!y.specularColorMap,opaque:y.transparent===!1&&y.blending===Zn,alphaMap:!!y.alphaMap,alphaTest:be,gradientMap:!!y.gradientMap,sheen:y.sheen>0,sheenColorMap:!!y.sheenColorMap,sheenRoughnessMap:!!y.sheenRoughnessMap,transmission:y.transmission>0,transmissionMap:!!y.transmissionMap,thicknessMap:!!y.thicknessMap,combine:y.combine,vertexTangents:!!y.normalMap&&!!R.attributes.tangent,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,vertexUvs:!!y.map||!!y.bumpMap||!!y.normalMap||!!y.specularMap||!!y.alphaMap||!!y.emissiveMap||!!y.roughnessMap||!!y.metalnessMap||!!y.clearcoatMap||!!y.clearcoatRoughnessMap||!!y.clearcoatNormalMap||!!y.iridescenceMap||!!y.iridescenceThicknessMap||!!y.displacementMap||!!y.transmissionMap||!!y.thicknessMap||!!y.specularIntensityMap||!!y.specularColorMap||!!y.sheenColorMap||!!y.sheenRoughnessMap,uvsVertexOnly:!(y.map||y.bumpMap||y.normalMap||y.specularMap||y.alphaMap||y.emissiveMap||y.roughnessMap||y.metalnessMap||y.clearcoatNormalMap||y.iridescenceMap||y.iridescenceThicknessMap||y.transmission>0||y.transmissionMap||y.thicknessMap||y.specularIntensityMap||y.specularColorMap||y.sheen>0||y.sheenColorMap||y.sheenRoughnessMap)&&!!y.displacementMap,fog:!!k,useFog:y.fog===!0,fogExp2:k&&k.isFogExp2,flatShading:!!y.flatShading,sizeAttenuation:y.sizeAttenuation,logarithmicDepthBuffer:u,skinning:J.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:pe,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&z.length>0,shadowMapType:r.shadowMap.type,toneMapping:y.toneMapped?r.toneMapping:An,physicallyCorrectLights:r.physicallyCorrectLights,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===pn,flipSided:y.side===Ct,useDepthPacking:!!y.depthPacking,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:y.extensions&&y.extensions.derivatives,extensionFragDepth:y.extensions&&y.extensions.fragDepth,extensionDrawBuffers:y.extensions&&y.extensions.drawBuffers,extensionShaderTextureLOD:y.extensions&&y.extensions.shaderTextureLOD,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const z in y.defines)T.push(z),T.push(y.defines[z]);return y.isRawShaderMaterial===!1&&(v(T,y),S(T,y),T.push(r.outputEncoding)),T.push(y.customProgramCacheKey),T.join()}function v(y,T){y.push(T.precision),y.push(T.outputEncoding),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.combine),y.push(T.vertexUvs),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function S(y,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.map&&a.enable(4),T.matcap&&a.enable(5),T.envMap&&a.enable(6),T.lightMap&&a.enable(7),T.aoMap&&a.enable(8),T.emissiveMap&&a.enable(9),T.bumpMap&&a.enable(10),T.normalMap&&a.enable(11),T.objectSpaceNormalMap&&a.enable(12),T.tangentSpaceNormalMap&&a.enable(13),T.clearcoat&&a.enable(14),T.clearcoatMap&&a.enable(15),T.clearcoatRoughnessMap&&a.enable(16),T.clearcoatNormalMap&&a.enable(17),T.iridescence&&a.enable(18),T.iridescenceMap&&a.enable(19),T.iridescenceThicknessMap&&a.enable(20),T.displacementMap&&a.enable(21),T.specularMap&&a.enable(22),T.roughnessMap&&a.enable(23),T.metalnessMap&&a.enable(24),T.gradientMap&&a.enable(25),T.alphaMap&&a.enable(26),T.alphaTest&&a.enable(27),T.vertexColors&&a.enable(28),T.vertexAlphas&&a.enable(29),T.vertexUvs&&a.enable(30),T.vertexTangents&&a.enable(31),T.uvsVertexOnly&&a.enable(32),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.physicallyCorrectLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.specularIntensityMap&&a.enable(15),T.specularColorMap&&a.enable(16),T.transmission&&a.enable(17),T.transmissionMap&&a.enable(18),T.thicknessMap&&a.enable(19),T.sheen&&a.enable(20),T.sheenColorMap&&a.enable(21),T.sheenRoughnessMap&&a.enable(22),T.decodeVideoTexture&&a.enable(23),T.opaque&&a.enable(24),y.push(a.mask)}function A(y){const T=g[y.type];let z;if(T){const G=Kt[T];z=Bd.clone(G.uniforms)}else z=y.uniforms;return z}function x(y,T){let z;for(let G=0,J=c.length;G<J;G++){const k=c[G];if(k.cacheKey===T){z=k,++z.usedTimes;break}}return z===void 0&&(z=new Yg(r,T,y,s),c.push(z)),z}function w(y){if(--y.usedTimes===0){const T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),y.destroy()}}function E(y){l.remove(y)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:A,acquireProgram:x,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:P}}function tv(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function nv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function al(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ll(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,m,p){let v=r[e];return v===void 0?(v={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:m,group:p},r[e]=v):(v.id=u.id,v.object=u,v.geometry=d,v.material=f,v.groupOrder=g,v.renderOrder=u.renderOrder,v.z=m,v.group=p),e++,v}function a(u,d,f,g,m,p){const v=o(u,d,f,g,m,p);f.transmission>0?n.push(v):f.transparent===!0?i.push(v):t.push(v)}function l(u,d,f,g,m,p){const v=o(u,d,f,g,m,p);f.transmission>0?n.unshift(v):f.transparent===!0?i.unshift(v):t.unshift(v)}function c(u,d){t.length>1&&t.sort(u||nv),n.length>1&&n.sort(d||al),i.length>1&&i.sort(d||al)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function iv(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new ll,r.set(n,[o])):i>=s.length?(o=new ll,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function sv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Ae};break;case"SpotLight":t={position:new C,direction:new C,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new C,halfWidth:new C,halfHeight:new C};break}return r[e.id]=t,t}}}function rv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let ov=0;function av(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function lv(r,e){const t=new sv,n=rv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let h=0;h<9;h++)i.probe.push(new C);const s=new C,o=new Ee,a=new Ee;function l(h,u){let d=0,f=0,g=0;for(let G=0;G<9;G++)i.probe[G].set(0,0,0);let m=0,p=0,v=0,S=0,A=0,x=0,w=0,E=0,P=0,y=0;h.sort(av);const T=u!==!0?Math.PI:1;for(let G=0,J=h.length;G<J;G++){const k=h[G],R=k.color,F=k.intensity,X=k.distance,Q=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)d+=R.r*F*T,f+=R.g*F*T,g+=R.b*F*T;else if(k.isLightProbe)for(let W=0;W<9;W++)i.probe[W].addScaledVector(k.sh.coefficients[W],F);else if(k.isDirectionalLight){const W=t.get(k);if(W.color.copy(k.color).multiplyScalar(k.intensity*T),k.castShadow){const $=k.shadow,q=n.get(k);q.shadowBias=$.bias,q.shadowNormalBias=$.normalBias,q.shadowRadius=$.radius,q.shadowMapSize=$.mapSize,i.directionalShadow[m]=q,i.directionalShadowMap[m]=Q,i.directionalShadowMatrix[m]=k.shadow.matrix,x++}i.directional[m]=W,m++}else if(k.isSpotLight){const W=t.get(k);W.position.setFromMatrixPosition(k.matrixWorld),W.color.copy(R).multiplyScalar(F*T),W.distance=X,W.coneCos=Math.cos(k.angle),W.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),W.decay=k.decay,i.spot[v]=W;const $=k.shadow;if(k.map&&(i.spotLightMap[P]=k.map,P++,$.updateMatrices(k),k.castShadow&&y++),i.spotLightMatrix[v]=$.matrix,k.castShadow){const q=n.get(k);q.shadowBias=$.bias,q.shadowNormalBias=$.normalBias,q.shadowRadius=$.radius,q.shadowMapSize=$.mapSize,i.spotShadow[v]=q,i.spotShadowMap[v]=Q,E++}v++}else if(k.isRectAreaLight){const W=t.get(k);W.color.copy(R).multiplyScalar(F),W.halfWidth.set(k.width*.5,0,0),W.halfHeight.set(0,k.height*.5,0),i.rectArea[S]=W,S++}else if(k.isPointLight){const W=t.get(k);if(W.color.copy(k.color).multiplyScalar(k.intensity*T),W.distance=k.distance,W.decay=k.decay,k.castShadow){const $=k.shadow,q=n.get(k);q.shadowBias=$.bias,q.shadowNormalBias=$.normalBias,q.shadowRadius=$.radius,q.shadowMapSize=$.mapSize,q.shadowCameraNear=$.camera.near,q.shadowCameraFar=$.camera.far,i.pointShadow[p]=q,i.pointShadowMap[p]=Q,i.pointShadowMatrix[p]=k.shadow.matrix,w++}i.point[p]=W,p++}else if(k.isHemisphereLight){const W=t.get(k);W.skyColor.copy(k.color).multiplyScalar(F*T),W.groundColor.copy(k.groundColor).multiplyScalar(F*T),i.hemi[A]=W,A++}}S>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=te.LTC_FLOAT_1,i.rectAreaLTC2=te.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=te.LTC_HALF_1,i.rectAreaLTC2=te.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;const z=i.hash;(z.directionalLength!==m||z.pointLength!==p||z.spotLength!==v||z.rectAreaLength!==S||z.hemiLength!==A||z.numDirectionalShadows!==x||z.numPointShadows!==w||z.numSpotShadows!==E||z.numSpotMaps!==P)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=S,i.point.length=p,i.hemi.length=A,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=E+P-y,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=y,z.directionalLength=m,z.pointLength=p,z.spotLength=v,z.rectAreaLength=S,z.hemiLength=A,z.numDirectionalShadows=x,z.numPointShadows=w,z.numSpotShadows=E,z.numSpotMaps=P,i.version=ov++)}function c(h,u){let d=0,f=0,g=0,m=0,p=0;const v=u.matrixWorldInverse;for(let S=0,A=h.length;S<A;S++){const x=h[S];if(x.isDirectionalLight){const w=i.directional[d];w.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(v),d++}else if(x.isSpotLight){const w=i.spot[g];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(v),w.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(v),g++}else if(x.isRectAreaLight){const w=i.rectArea[m];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(v),a.identity(),o.copy(x.matrixWorld),o.premultiply(v),a.extractRotation(o),w.halfWidth.set(x.width*.5,0,0),w.halfHeight.set(0,x.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),m++}else if(x.isPointLight){const w=i.point[f];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(v),f++}else if(x.isHemisphereLight){const w=i.hemi[p];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(v),p++}}}return{setup:l,setupView:c,state:i}}function cl(r,e){const t=new lv(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function cv(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new cl(r,e),t.set(s,[l])):o>=a.length?(l=new cl(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class hv extends en{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ld,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class uv extends en{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new C,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const dv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function pv(r,e,t){let n=new Po;const i=new oe,s=new oe,o=new He,a=new hv({depthPacking:cd}),l=new uv,c={},h=t.maxTextureSize,u={[xn]:Ct,[Ct]:xn,[pn]:pn},d=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:dv,fragmentShader:fv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new st;g.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new We(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nc,this.render=function(x,w,E){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||x.length===0)return;const P=r.getRenderTarget(),y=r.getActiveCubeFace(),T=r.getActiveMipmapLevel(),z=r.state;z.setBlending(Pn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);for(let G=0,J=x.length;G<J;G++){const k=x[G],R=k.shadow;if(R===void 0){console.warn("THREE.WebGLShadowMap:",k,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;i.copy(R.mapSize);const F=R.getFrameExtents();if(i.multiply(F),s.copy(R.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/F.x),i.x=s.x*F.x,R.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/F.y),i.y=s.y*F.y,R.mapSize.y=s.y)),R.map===null){const Q=this.type!==Qi?{minFilter:ut,magFilter:ut}:{};R.map=new yn(i.x,i.y,Q),R.map.texture.name=k.name+".shadowMap",R.camera.updateProjectionMatrix()}r.setRenderTarget(R.map),r.clear();const X=R.getViewportCount();for(let Q=0;Q<X;Q++){const W=R.getViewport(Q);o.set(s.x*W.x,s.y*W.y,s.x*W.z,s.y*W.w),z.viewport(o),R.updateMatrices(k,Q),n=R.getFrustum(),A(w,E,R.camera,k,this.type)}R.isPointLightShadow!==!0&&this.type===Qi&&v(R,E),R.needsUpdate=!1}p.needsUpdate=!1,r.setRenderTarget(P,y,T)};function v(x,w){const E=e.update(m);d.defines.VSM_SAMPLES!==x.blurSamples&&(d.defines.VSM_SAMPLES=x.blurSamples,f.defines.VSM_SAMPLES=x.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),x.mapPass===null&&(x.mapPass=new yn(i.x,i.y)),d.uniforms.shadow_pass.value=x.map.texture,d.uniforms.resolution.value=x.mapSize,d.uniforms.radius.value=x.radius,r.setRenderTarget(x.mapPass),r.clear(),r.renderBufferDirect(w,null,E,d,m,null),f.uniforms.shadow_pass.value=x.mapPass.texture,f.uniforms.resolution.value=x.mapSize,f.uniforms.radius.value=x.radius,r.setRenderTarget(x.map),r.clear(),r.renderBufferDirect(w,null,E,f,m,null)}function S(x,w,E,P,y,T){let z=null;const G=E.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(G!==void 0)z=G;else if(z=E.isPointLight===!0?l:a,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const J=z.uuid,k=w.uuid;let R=c[J];R===void 0&&(R={},c[J]=R);let F=R[k];F===void 0&&(F=z.clone(),R[k]=F),z=F}return z.visible=w.visible,z.wireframe=w.wireframe,T===Qi?z.side=w.shadowSide!==null?w.shadowSide:w.side:z.side=w.shadowSide!==null?w.shadowSide:u[w.side],z.alphaMap=w.alphaMap,z.alphaTest=w.alphaTest,z.map=w.map,z.clipShadows=w.clipShadows,z.clippingPlanes=w.clippingPlanes,z.clipIntersection=w.clipIntersection,z.displacementMap=w.displacementMap,z.displacementScale=w.displacementScale,z.displacementBias=w.displacementBias,z.wireframeLinewidth=w.wireframeLinewidth,z.linewidth=w.linewidth,E.isPointLight===!0&&z.isMeshDistanceMaterial===!0&&(z.referencePosition.setFromMatrixPosition(E.matrixWorld),z.nearDistance=P,z.farDistance=y),z}function A(x,w,E,P,y){if(x.visible===!1)return;if(x.layers.test(w.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&y===Qi)&&(!x.frustumCulled||n.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,x.matrixWorld);const G=e.update(x),J=x.material;if(Array.isArray(J)){const k=G.groups;for(let R=0,F=k.length;R<F;R++){const X=k[R],Q=J[X.materialIndex];if(Q&&Q.visible){const W=S(x,Q,P,E.near,E.far,y);r.renderBufferDirect(E,null,G,W,x,X)}}}else if(J.visible){const k=S(x,J,P,E.near,E.far,y);r.renderBufferDirect(E,null,G,k,x,null)}}const z=x.children;for(let G=0,J=z.length;G<J;G++)A(z[G],w,E,P,y)}}function mv(r,e,t){const n=t.isWebGL2;function i(){let L=!1;const B=new He;let Y=null;const ae=new He(0,0,0,0);return{setMask:function(he){Y!==he&&!L&&(r.colorMask(he,he,he,he),Y=he)},setLocked:function(he){L=he},setClear:function(he,De,lt,mt,kn){kn===!0&&(he*=mt,De*=mt,lt*=mt),B.set(he,De,lt,mt),ae.equals(B)===!1&&(r.clearColor(he,De,lt,mt),ae.copy(B))},reset:function(){L=!1,Y=null,ae.set(-1,0,0,0)}}}function s(){let L=!1,B=null,Y=null,ae=null;return{setTest:function(he){he?be(2929):ue(2929)},setMask:function(he){B!==he&&!L&&(r.depthMask(he),B=he)},setFunc:function(he){if(Y!==he){switch(he){case Cu:r.depthFunc(512);break;case Pu:r.depthFunc(519);break;case Lu:r.depthFunc(513);break;case oo:r.depthFunc(515);break;case Ru:r.depthFunc(514);break;case zu:r.depthFunc(518);break;case Iu:r.depthFunc(516);break;case ku:r.depthFunc(517);break;default:r.depthFunc(515)}Y=he}},setLocked:function(he){L=he},setClear:function(he){ae!==he&&(r.clearDepth(he),ae=he)},reset:function(){L=!1,B=null,Y=null,ae=null}}}function o(){let L=!1,B=null,Y=null,ae=null,he=null,De=null,lt=null,mt=null,kn=null;return{setTest:function(qe){L||(qe?be(2960):ue(2960))},setMask:function(qe){B!==qe&&!L&&(r.stencilMask(qe),B=qe)},setFunc:function(qe,rn,Ot){(Y!==qe||ae!==rn||he!==Ot)&&(r.stencilFunc(qe,rn,Ot),Y=qe,ae=rn,he=Ot)},setOp:function(qe,rn,Ot){(De!==qe||lt!==rn||mt!==Ot)&&(r.stencilOp(qe,rn,Ot),De=qe,lt=rn,mt=Ot)},setLocked:function(qe){L=qe},setClear:function(qe){kn!==qe&&(r.clearStencil(qe),kn=qe)},reset:function(){L=!1,B=null,Y=null,ae=null,he=null,De=null,lt=null,mt=null,kn=null}}}const a=new i,l=new s,c=new o,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,m=[],p=null,v=!1,S=null,A=null,x=null,w=null,E=null,P=null,y=null,T=!1,z=null,G=null,J=null,k=null,R=null;const F=r.getParameter(35661);let X=!1,Q=0;const W=r.getParameter(7938);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),X=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),X=Q>=2);let $=null,q={};const pe=r.getParameter(3088),N=r.getParameter(2978),j=new He().fromArray(pe),ne=new He().fromArray(N);function ie(L,B,Y){const ae=new Uint8Array(4),he=r.createTexture();r.bindTexture(L,he),r.texParameteri(L,10241,9728),r.texParameteri(L,10240,9728);for(let De=0;De<Y;De++)r.texImage2D(B+De,0,6408,1,1,0,6408,5121,ae);return he}const O={};O[3553]=ie(3553,3553,1),O[34067]=ie(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),be(2929),l.setFunc(oo),pt(!1),Nt(ia),be(2884),xt(Pn);function be(L){d[L]!==!0&&(r.enable(L),d[L]=!0)}function ue(L){d[L]!==!1&&(r.disable(L),d[L]=!1)}function de(L,B){return f[L]!==B?(r.bindFramebuffer(L,B),f[L]=B,n&&(L===36009&&(f[36160]=B),L===36160&&(f[36009]=B)),!0):!1}function le(L,B){let Y=m,ae=!1;if(L)if(Y=g.get(B),Y===void 0&&(Y=[],g.set(B,Y)),L.isWebGLMultipleRenderTargets){const he=L.texture;if(Y.length!==he.length||Y[0]!==36064){for(let De=0,lt=he.length;De<lt;De++)Y[De]=36064+De;Y.length=he.length,ae=!0}}else Y[0]!==36064&&(Y[0]=36064,ae=!0);else Y[0]!==1029&&(Y[0]=1029,ae=!0);ae&&(t.isWebGL2?r.drawBuffers(Y):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Y))}function Ve(L){return p!==L?(r.useProgram(L),p=L,!0):!1}const we={[vi]:32774,[vu]:32778,[Au]:32779};if(n)we[ra]=32775,we[oa]=32776;else{const L=e.get("EXT_blend_minmax");L!==null&&(we[ra]=L.MIN_EXT,we[oa]=L.MAX_EXT)}const ye={[xu]:0,[yu]:1,[Su]:768,[ic]:770,[Eu]:776,[_u]:774,[bu]:772,[Mu]:769,[sc]:771,[Tu]:775,[wu]:773};function xt(L,B,Y,ae,he,De,lt,mt){if(L===Pn){v===!0&&(ue(3042),v=!1);return}if(v===!1&&(be(3042),v=!0),L!==gu){if(L!==S||mt!==T){if((A!==vi||E!==vi)&&(r.blendEquation(32774),A=vi,E=vi),mt)switch(L){case Zn:r.blendFuncSeparate(1,771,1,771);break;case so:r.blendFunc(1,1);break;case sa:r.blendFuncSeparate(0,769,0,1);break;case ro:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Zn:r.blendFuncSeparate(770,771,1,771);break;case so:r.blendFunc(770,1);break;case sa:r.blendFuncSeparate(0,769,0,1);break;case ro:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}x=null,w=null,P=null,y=null,S=L,T=mt}return}he=he||B,De=De||Y,lt=lt||ae,(B!==A||he!==E)&&(r.blendEquationSeparate(we[B],we[he]),A=B,E=he),(Y!==x||ae!==w||De!==P||lt!==y)&&(r.blendFuncSeparate(ye[Y],ye[ae],ye[De],ye[lt]),x=Y,w=ae,P=De,y=lt),S=L,T=!1}function Dt(L,B){L.side===pn?ue(2884):be(2884);let Y=L.side===Ct;B&&(Y=!Y),pt(Y),L.blending===Zn&&L.transparent===!1?xt(Pn):xt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),a.setMask(L.colorWrite);const ae=L.stencilWrite;c.setTest(ae),ae&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Fe(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?be(32926):ue(32926)}function pt(L){z!==L&&(L?r.frontFace(2304):r.frontFace(2305),z=L)}function Nt(L){L!==fu?(be(2884),L!==G&&(L===ia?r.cullFace(1029):L===pu?r.cullFace(1028):r.cullFace(1032))):ue(2884),G=L}function $e(L){L!==J&&(X&&r.lineWidth(L),J=L)}function Fe(L,B,Y){L?(be(32823),(k!==B||R!==Y)&&(r.polygonOffset(B,Y),k=B,R=Y)):ue(32823)}function sn(L){L?be(3089):ue(3089)}function Ut(L){L===void 0&&(L=33984+F-1),$!==L&&(r.activeTexture(L),$=L)}function _(L,B,Y){Y===void 0&&($===null?Y=33984+F-1:Y=$);let ae=q[Y];ae===void 0&&(ae={type:void 0,texture:void 0},q[Y]=ae),(ae.type!==L||ae.texture!==B)&&($!==Y&&(r.activeTexture(Y),$=Y),r.bindTexture(L,B||O[L]),ae.type=L,ae.texture=B)}function M(){const L=q[$];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function H(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{r.compressedTexImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ee(){try{r.texSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function se(){try{r.texSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function re(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{r.texStorage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ge(){try{r.texStorage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xe(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ce(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(L){j.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),j.copy(L))}function fe(L){ne.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),ne.copy(L))}function Ie(L,B){let Y=u.get(B);Y===void 0&&(Y=new WeakMap,u.set(B,Y));let ae=Y.get(L);ae===void 0&&(ae=r.getUniformBlockIndex(B,L.name),Y.set(L,ae))}function Xe(L,B){const ae=u.get(B).get(L);h.get(B)!==ae&&(r.uniformBlockBinding(B,ae,L.__bindingPointIndex),h.set(B,ae))}function at(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},$=null,q={},f={},g=new WeakMap,m=[],p=null,v=!1,S=null,A=null,x=null,w=null,E=null,P=null,y=null,T=!1,z=null,G=null,J=null,k=null,R=null,j.set(0,0,r.canvas.width,r.canvas.height),ne.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:be,disable:ue,bindFramebuffer:de,drawBuffers:le,useProgram:Ve,setBlending:xt,setMaterial:Dt,setFlipSided:pt,setCullFace:Nt,setLineWidth:$e,setPolygonOffset:Fe,setScissorTest:sn,activeTexture:Ut,bindTexture:_,unbindTexture:M,compressedTexImage2D:H,compressedTexImage3D:K,texImage2D:xe,texImage3D:ce,updateUBOMapping:Ie,uniformBlockBinding:Xe,texStorage2D:Z,texStorage3D:ge,texSubImage2D:ee,texSubImage3D:se,compressedTexSubImage2D:Se,compressedTexSubImage3D:re,scissor:ve,viewport:fe,reset:at}}function gv(r,e,t,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,u=i.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const p=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(_,M){return v?new OffscreenCanvas(_,M):hs("canvas")}function A(_,M,H,K){let ee=1;if((_.width>K||_.height>K)&&(ee=K/Math.max(_.width,_.height)),ee<1||M===!0)if(typeof HTMLImageElement<"u"&&_ instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&_ instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&_ instanceof ImageBitmap){const se=M?js:Math.floor,Se=se(ee*_.width),re=se(ee*_.height);m===void 0&&(m=S(Se,re));const Z=H?S(Se,re):m;return Z.width=Se,Z.height=re,Z.getContext("2d").drawImage(_,0,0,Se,re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+_.width+"x"+_.height+") to ("+Se+"x"+re+")."),Z}else return"data"in _&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+_.width+"x"+_.height+")."),_;return _}function x(_){return po(_.width)&&po(_.height)}function w(_){return a?!1:_.wrapS!==Et||_.wrapT!==Et||_.minFilter!==ut&&_.minFilter!==vt}function E(_,M){return _.generateMipmaps&&M&&_.minFilter!==ut&&_.minFilter!==vt}function P(_){r.generateMipmap(_)}function y(_,M,H,K,ee=!1){if(a===!1)return M;if(_!==null){if(r[_]!==void 0)return r[_];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+_+"'")}let se=M;return M===6403&&(H===5126&&(se=33326),H===5131&&(se=33325),H===5121&&(se=33321)),M===33319&&(H===5126&&(se=33328),H===5131&&(se=33327),H===5121&&(se=33323)),M===6408&&(H===5126&&(se=34836),H===5131&&(se=34842),H===5121&&(se=K===Ne&&ee===!1?35907:32856),H===32819&&(se=32854),H===32820&&(se=32855)),(se===33325||se===33326||se===33327||se===33328||se===34842||se===34836)&&e.get("EXT_color_buffer_float"),se}function T(_,M,H){return E(_,H)===!0||_.isFramebufferTexture&&_.minFilter!==ut&&_.minFilter!==vt?Math.log2(Math.max(M.width,M.height))+1:_.mipmaps!==void 0&&_.mipmaps.length>0?_.mipmaps.length:_.isCompressedTexture&&Array.isArray(_.image)?M.mipmaps.length:1}function z(_){return _===ut||_===co||_===Vs?9728:9729}function G(_){const M=_.target;M.removeEventListener("dispose",G),k(M),M.isVideoTexture&&g.delete(M)}function J(_){const M=_.target;M.removeEventListener("dispose",J),F(M)}function k(_){const M=n.get(_);if(M.__webglInit===void 0)return;const H=_.source,K=p.get(H);if(K){const ee=K[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&R(_),Object.keys(K).length===0&&p.delete(H)}n.remove(_)}function R(_){const M=n.get(_);r.deleteTexture(M.__webglTexture);const H=_.source,K=p.get(H);delete K[M.__cacheKey],o.memory.textures--}function F(_){const M=_.texture,H=n.get(_),K=n.get(M);if(K.__webglTexture!==void 0&&(r.deleteTexture(K.__webglTexture),o.memory.textures--),_.depthTexture&&_.depthTexture.dispose(),_.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++)r.deleteFramebuffer(H.__webglFramebuffer[ee]),H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer[ee]);else{if(r.deleteFramebuffer(H.__webglFramebuffer),H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&r.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let ee=0;ee<H.__webglColorRenderbuffer.length;ee++)H.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(H.__webglColorRenderbuffer[ee]);H.__webglDepthRenderbuffer&&r.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(_.isWebGLMultipleRenderTargets)for(let ee=0,se=M.length;ee<se;ee++){const Se=n.get(M[ee]);Se.__webglTexture&&(r.deleteTexture(Se.__webglTexture),o.memory.textures--),n.remove(M[ee])}n.remove(M),n.remove(_)}let X=0;function Q(){X=0}function W(){const _=X;return _>=l&&console.warn("THREE.WebGLTextures: Trying to use "+_+" texture units while this GPU supports only "+l),X+=1,_}function $(_){const M=[];return M.push(_.wrapS),M.push(_.wrapT),M.push(_.wrapR||0),M.push(_.magFilter),M.push(_.minFilter),M.push(_.anisotropy),M.push(_.internalFormat),M.push(_.format),M.push(_.type),M.push(_.generateMipmaps),M.push(_.premultiplyAlpha),M.push(_.flipY),M.push(_.unpackAlignment),M.push(_.encoding),M.join()}function q(_,M){const H=n.get(_);if(_.isVideoTexture&&sn(_),_.isRenderTargetTexture===!1&&_.version>0&&H.__version!==_.version){const K=_.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ue(H,_,M);return}}t.bindTexture(3553,H.__webglTexture,33984+M)}function pe(_,M){const H=n.get(_);if(_.version>0&&H.__version!==_.version){ue(H,_,M);return}t.bindTexture(35866,H.__webglTexture,33984+M)}function N(_,M){const H=n.get(_);if(_.version>0&&H.__version!==_.version){ue(H,_,M);return}t.bindTexture(32879,H.__webglTexture,33984+M)}function j(_,M){const H=n.get(_);if(_.version>0&&H.__version!==_.version){de(H,_,M);return}t.bindTexture(34067,H.__webglTexture,33984+M)}const ne={[Rn]:10497,[Et]:33071,[Xs]:33648},ie={[ut]:9728,[co]:9984,[Vs]:9986,[vt]:9729,[oc]:9985,[jn]:9987};function O(_,M,H){if(H?(r.texParameteri(_,10242,ne[M.wrapS]),r.texParameteri(_,10243,ne[M.wrapT]),(_===32879||_===35866)&&r.texParameteri(_,32882,ne[M.wrapR]),r.texParameteri(_,10240,ie[M.magFilter]),r.texParameteri(_,10241,ie[M.minFilter])):(r.texParameteri(_,10242,33071),r.texParameteri(_,10243,33071),(_===32879||_===35866)&&r.texParameteri(_,32882,33071),(M.wrapS!==Et||M.wrapT!==Et)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(_,10240,z(M.magFilter)),r.texParameteri(_,10241,z(M.minFilter)),M.minFilter!==ut&&M.minFilter!==vt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const K=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===ut||M.minFilter!==Vs&&M.minFilter!==jn||M.type===mn&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===os&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(r.texParameterf(_,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function be(_,M){let H=!1;_.__webglInit===void 0&&(_.__webglInit=!0,M.addEventListener("dispose",G));const K=M.source;let ee=p.get(K);ee===void 0&&(ee={},p.set(K,ee));const se=$(M);if(se!==_.__cacheKey){ee[se]===void 0&&(ee[se]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ee[se].usedTimes++;const Se=ee[_.__cacheKey];Se!==void 0&&(ee[_.__cacheKey].usedTimes--,Se.usedTimes===0&&R(M)),_.__cacheKey=se,_.__webglTexture=ee[se].texture}return H}function ue(_,M,H){let K=3553;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(K=35866),M.isData3DTexture&&(K=32879);const ee=be(_,M),se=M.source;t.bindTexture(K,_.__webglTexture,33984+H);const Se=n.get(se);if(se.version!==Se.__version||ee===!0){t.activeTexture(33984+H),r.pixelStorei(37440,M.flipY),r.pixelStorei(37441,M.premultiplyAlpha),r.pixelStorei(3317,M.unpackAlignment),r.pixelStorei(37443,0);const re=w(M)&&x(M.image)===!1;let Z=A(M.image,re,!1,h);Z=Ut(M,Z);const ge=x(Z)||a,xe=s.convert(M.format,M.encoding);let ce=s.convert(M.type),ve=y(M.internalFormat,xe,ce,M.encoding,M.isVideoTexture);O(K,M,ge);let fe;const Ie=M.mipmaps,Xe=a&&M.isVideoTexture!==!0,at=Se.__version===void 0||ee===!0,L=T(M,Z,ge);if(M.isDepthTexture)ve=6402,a?M.type===mn?ve=36012:M.type===Wn?ve=33190:M.type===Ei?ve=35056:ve=33189:M.type===mn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Xn&&ve===6402&&M.type!==ac&&M.type!==Wn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=Wn,ce=s.convert(M.type)),M.format===Ri&&ve===6402&&(ve=34041,M.type!==Ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=Ei,ce=s.convert(M.type))),at&&(Xe?t.texStorage2D(3553,1,ve,Z.width,Z.height):t.texImage2D(3553,0,ve,Z.width,Z.height,0,xe,ce,null));else if(M.isDataTexture)if(Ie.length>0&&ge){Xe&&at&&t.texStorage2D(3553,L,ve,Ie[0].width,Ie[0].height);for(let B=0,Y=Ie.length;B<Y;B++)fe=Ie[B],Xe?t.texSubImage2D(3553,B,0,0,fe.width,fe.height,xe,ce,fe.data):t.texImage2D(3553,B,ve,fe.width,fe.height,0,xe,ce,fe.data);M.generateMipmaps=!1}else Xe?(at&&t.texStorage2D(3553,L,ve,Z.width,Z.height),t.texSubImage2D(3553,0,0,0,Z.width,Z.height,xe,ce,Z.data)):t.texImage2D(3553,0,ve,Z.width,Z.height,0,xe,ce,Z.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Xe&&at&&t.texStorage3D(35866,L,ve,Ie[0].width,Ie[0].height,Z.depth);for(let B=0,Y=Ie.length;B<Y;B++)fe=Ie[B],M.format!==It?xe!==null?Xe?t.compressedTexSubImage3D(35866,B,0,0,0,fe.width,fe.height,Z.depth,xe,fe.data,0,0):t.compressedTexImage3D(35866,B,ve,fe.width,fe.height,Z.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(35866,B,0,0,0,fe.width,fe.height,Z.depth,xe,ce,fe.data):t.texImage3D(35866,B,ve,fe.width,fe.height,Z.depth,0,xe,ce,fe.data)}else{Xe&&at&&t.texStorage2D(3553,L,ve,Ie[0].width,Ie[0].height);for(let B=0,Y=Ie.length;B<Y;B++)fe=Ie[B],M.format!==It?xe!==null?Xe?t.compressedTexSubImage2D(3553,B,0,0,fe.width,fe.height,xe,fe.data):t.compressedTexImage2D(3553,B,ve,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(3553,B,0,0,fe.width,fe.height,xe,ce,fe.data):t.texImage2D(3553,B,ve,fe.width,fe.height,0,xe,ce,fe.data)}else if(M.isDataArrayTexture)Xe?(at&&t.texStorage3D(35866,L,ve,Z.width,Z.height,Z.depth),t.texSubImage3D(35866,0,0,0,0,Z.width,Z.height,Z.depth,xe,ce,Z.data)):t.texImage3D(35866,0,ve,Z.width,Z.height,Z.depth,0,xe,ce,Z.data);else if(M.isData3DTexture)Xe?(at&&t.texStorage3D(32879,L,ve,Z.width,Z.height,Z.depth),t.texSubImage3D(32879,0,0,0,0,Z.width,Z.height,Z.depth,xe,ce,Z.data)):t.texImage3D(32879,0,ve,Z.width,Z.height,Z.depth,0,xe,ce,Z.data);else if(M.isFramebufferTexture){if(at)if(Xe)t.texStorage2D(3553,L,ve,Z.width,Z.height);else{let B=Z.width,Y=Z.height;for(let ae=0;ae<L;ae++)t.texImage2D(3553,ae,ve,B,Y,0,xe,ce,null),B>>=1,Y>>=1}}else if(Ie.length>0&&ge){Xe&&at&&t.texStorage2D(3553,L,ve,Ie[0].width,Ie[0].height);for(let B=0,Y=Ie.length;B<Y;B++)fe=Ie[B],Xe?t.texSubImage2D(3553,B,0,0,xe,ce,fe):t.texImage2D(3553,B,ve,xe,ce,fe);M.generateMipmaps=!1}else Xe?(at&&t.texStorage2D(3553,L,ve,Z.width,Z.height),t.texSubImage2D(3553,0,0,0,xe,ce,Z)):t.texImage2D(3553,0,ve,xe,ce,Z);E(M,ge)&&P(K),Se.__version=se.version,M.onUpdate&&M.onUpdate(M)}_.__version=M.version}function de(_,M,H){if(M.image.length!==6)return;const K=be(_,M),ee=M.source;t.bindTexture(34067,_.__webglTexture,33984+H);const se=n.get(ee);if(ee.version!==se.__version||K===!0){t.activeTexture(33984+H),r.pixelStorei(37440,M.flipY),r.pixelStorei(37441,M.premultiplyAlpha),r.pixelStorei(3317,M.unpackAlignment),r.pixelStorei(37443,0);const Se=M.isCompressedTexture||M.image[0].isCompressedTexture,re=M.image[0]&&M.image[0].isDataTexture,Z=[];for(let B=0;B<6;B++)!Se&&!re?Z[B]=A(M.image[B],!1,!0,c):Z[B]=re?M.image[B].image:M.image[B],Z[B]=Ut(M,Z[B]);const ge=Z[0],xe=x(ge)||a,ce=s.convert(M.format,M.encoding),ve=s.convert(M.type),fe=y(M.internalFormat,ce,ve,M.encoding),Ie=a&&M.isVideoTexture!==!0,Xe=se.__version===void 0||K===!0;let at=T(M,ge,xe);O(34067,M,xe);let L;if(Se){Ie&&Xe&&t.texStorage2D(34067,at,fe,ge.width,ge.height);for(let B=0;B<6;B++){L=Z[B].mipmaps;for(let Y=0;Y<L.length;Y++){const ae=L[Y];M.format!==It?ce!==null?Ie?t.compressedTexSubImage2D(34069+B,Y,0,0,ae.width,ae.height,ce,ae.data):t.compressedTexImage2D(34069+B,Y,fe,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?t.texSubImage2D(34069+B,Y,0,0,ae.width,ae.height,ce,ve,ae.data):t.texImage2D(34069+B,Y,fe,ae.width,ae.height,0,ce,ve,ae.data)}}}else{L=M.mipmaps,Ie&&Xe&&(L.length>0&&at++,t.texStorage2D(34067,at,fe,Z[0].width,Z[0].height));for(let B=0;B<6;B++)if(re){Ie?t.texSubImage2D(34069+B,0,0,0,Z[B].width,Z[B].height,ce,ve,Z[B].data):t.texImage2D(34069+B,0,fe,Z[B].width,Z[B].height,0,ce,ve,Z[B].data);for(let Y=0;Y<L.length;Y++){const he=L[Y].image[B].image;Ie?t.texSubImage2D(34069+B,Y+1,0,0,he.width,he.height,ce,ve,he.data):t.texImage2D(34069+B,Y+1,fe,he.width,he.height,0,ce,ve,he.data)}}else{Ie?t.texSubImage2D(34069+B,0,0,0,ce,ve,Z[B]):t.texImage2D(34069+B,0,fe,ce,ve,Z[B]);for(let Y=0;Y<L.length;Y++){const ae=L[Y];Ie?t.texSubImage2D(34069+B,Y+1,0,0,ce,ve,ae.image[B]):t.texImage2D(34069+B,Y+1,fe,ce,ve,ae.image[B])}}}E(M,xe)&&P(34067),se.__version=ee.version,M.onUpdate&&M.onUpdate(M)}_.__version=M.version}function le(_,M,H,K,ee){const se=s.convert(H.format,H.encoding),Se=s.convert(H.type),re=y(H.internalFormat,se,Se,H.encoding);n.get(M).__hasExternalTextures||(ee===32879||ee===35866?t.texImage3D(ee,0,re,M.width,M.height,M.depth,0,se,Se,null):t.texImage2D(ee,0,re,M.width,M.height,0,se,Se,null)),t.bindFramebuffer(36160,_),Fe(M)?d.framebufferTexture2DMultisampleEXT(36160,K,ee,n.get(H).__webglTexture,0,$e(M)):(ee===3553||ee>=34069&&ee<=34074)&&r.framebufferTexture2D(36160,K,ee,n.get(H).__webglTexture,0),t.bindFramebuffer(36160,null)}function Ve(_,M,H){if(r.bindRenderbuffer(36161,_),M.depthBuffer&&!M.stencilBuffer){let K=33189;if(H||Fe(M)){const ee=M.depthTexture;ee&&ee.isDepthTexture&&(ee.type===mn?K=36012:ee.type===Wn&&(K=33190));const se=$e(M);Fe(M)?d.renderbufferStorageMultisampleEXT(36161,se,K,M.width,M.height):r.renderbufferStorageMultisample(36161,se,K,M.width,M.height)}else r.renderbufferStorage(36161,K,M.width,M.height);r.framebufferRenderbuffer(36160,36096,36161,_)}else if(M.depthBuffer&&M.stencilBuffer){const K=$e(M);H&&Fe(M)===!1?r.renderbufferStorageMultisample(36161,K,35056,M.width,M.height):Fe(M)?d.renderbufferStorageMultisampleEXT(36161,K,35056,M.width,M.height):r.renderbufferStorage(36161,34041,M.width,M.height),r.framebufferRenderbuffer(36160,33306,36161,_)}else{const K=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let ee=0;ee<K.length;ee++){const se=K[ee],Se=s.convert(se.format,se.encoding),re=s.convert(se.type),Z=y(se.internalFormat,Se,re,se.encoding),ge=$e(M);H&&Fe(M)===!1?r.renderbufferStorageMultisample(36161,ge,Z,M.width,M.height):Fe(M)?d.renderbufferStorageMultisampleEXT(36161,ge,Z,M.width,M.height):r.renderbufferStorage(36161,Z,M.width,M.height)}}r.bindRenderbuffer(36161,null)}function we(_,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,_),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),q(M.depthTexture,0);const K=n.get(M.depthTexture).__webglTexture,ee=$e(M);if(M.depthTexture.format===Xn)Fe(M)?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,K,0,ee):r.framebufferTexture2D(36160,36096,3553,K,0);else if(M.depthTexture.format===Ri)Fe(M)?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,K,0,ee):r.framebufferTexture2D(36160,33306,3553,K,0);else throw new Error("Unknown depthTexture format")}function ye(_){const M=n.get(_),H=_.isWebGLCubeRenderTarget===!0;if(_.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");we(M.__webglFramebuffer,_)}else if(H){M.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(36160,M.__webglFramebuffer[K]),M.__webglDepthbuffer[K]=r.createRenderbuffer(),Ve(M.__webglDepthbuffer[K],_,!1)}else t.bindFramebuffer(36160,M.__webglFramebuffer),M.__webglDepthbuffer=r.createRenderbuffer(),Ve(M.__webglDepthbuffer,_,!1);t.bindFramebuffer(36160,null)}function xt(_,M,H){const K=n.get(_);M!==void 0&&le(K.__webglFramebuffer,_,_.texture,36064,3553),H!==void 0&&ye(_)}function Dt(_){const M=_.texture,H=n.get(_),K=n.get(M);_.addEventListener("dispose",J),_.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=M.version,o.memory.textures++);const ee=_.isWebGLCubeRenderTarget===!0,se=_.isWebGLMultipleRenderTargets===!0,Se=x(_)||a;if(ee){H.__webglFramebuffer=[];for(let re=0;re<6;re++)H.__webglFramebuffer[re]=r.createFramebuffer()}else{if(H.__webglFramebuffer=r.createFramebuffer(),se)if(i.drawBuffers){const re=_.texture;for(let Z=0,ge=re.length;Z<ge;Z++){const xe=n.get(re[Z]);xe.__webglTexture===void 0&&(xe.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&_.samples>0&&Fe(_)===!1){const re=se?M:[M];H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,H.__webglMultisampledFramebuffer);for(let Z=0;Z<re.length;Z++){const ge=re[Z];H.__webglColorRenderbuffer[Z]=r.createRenderbuffer(),r.bindRenderbuffer(36161,H.__webglColorRenderbuffer[Z]);const xe=s.convert(ge.format,ge.encoding),ce=s.convert(ge.type),ve=y(ge.internalFormat,xe,ce,ge.encoding,_.isXRRenderTarget===!0),fe=$e(_);r.renderbufferStorageMultisample(36161,fe,ve,_.width,_.height),r.framebufferRenderbuffer(36160,36064+Z,36161,H.__webglColorRenderbuffer[Z])}r.bindRenderbuffer(36161,null),_.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),Ve(H.__webglDepthRenderbuffer,_,!0)),t.bindFramebuffer(36160,null)}}if(ee){t.bindTexture(34067,K.__webglTexture),O(34067,M,Se);for(let re=0;re<6;re++)le(H.__webglFramebuffer[re],_,M,36064,34069+re);E(M,Se)&&P(34067),t.unbindTexture()}else if(se){const re=_.texture;for(let Z=0,ge=re.length;Z<ge;Z++){const xe=re[Z],ce=n.get(xe);t.bindTexture(3553,ce.__webglTexture),O(3553,xe,Se),le(H.__webglFramebuffer,_,xe,36064+Z,3553),E(xe,Se)&&P(3553)}t.unbindTexture()}else{let re=3553;(_.isWebGL3DRenderTarget||_.isWebGLArrayRenderTarget)&&(a?re=_.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(re,K.__webglTexture),O(re,M,Se),le(H.__webglFramebuffer,_,M,36064,re),E(M,Se)&&P(re),t.unbindTexture()}_.depthBuffer&&ye(_)}function pt(_){const M=x(_)||a,H=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let K=0,ee=H.length;K<ee;K++){const se=H[K];if(E(se,M)){const Se=_.isWebGLCubeRenderTarget?34067:3553,re=n.get(se).__webglTexture;t.bindTexture(Se,re),P(Se),t.unbindTexture()}}}function Nt(_){if(a&&_.samples>0&&Fe(_)===!1){const M=_.isWebGLMultipleRenderTargets?_.texture:[_.texture],H=_.width,K=_.height;let ee=16384;const se=[],Se=_.stencilBuffer?33306:36096,re=n.get(_),Z=_.isWebGLMultipleRenderTargets===!0;if(Z)for(let ge=0;ge<M.length;ge++)t.bindFramebuffer(36160,re.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+ge,36161,null),t.bindFramebuffer(36160,re.__webglFramebuffer),r.framebufferTexture2D(36009,36064+ge,3553,null,0);t.bindFramebuffer(36008,re.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,re.__webglFramebuffer);for(let ge=0;ge<M.length;ge++){se.push(36064+ge),_.depthBuffer&&se.push(Se);const xe=re.__ignoreDepthValues!==void 0?re.__ignoreDepthValues:!1;if(xe===!1&&(_.depthBuffer&&(ee|=256),_.stencilBuffer&&(ee|=1024)),Z&&r.framebufferRenderbuffer(36008,36064,36161,re.__webglColorRenderbuffer[ge]),xe===!0&&(r.invalidateFramebuffer(36008,[Se]),r.invalidateFramebuffer(36009,[Se])),Z){const ce=n.get(M[ge]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,ce,0)}r.blitFramebuffer(0,0,H,K,0,0,H,K,ee,9728),f&&r.invalidateFramebuffer(36008,se)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),Z)for(let ge=0;ge<M.length;ge++){t.bindFramebuffer(36160,re.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+ge,36161,re.__webglColorRenderbuffer[ge]);const xe=n.get(M[ge]).__webglTexture;t.bindFramebuffer(36160,re.__webglFramebuffer),r.framebufferTexture2D(36009,36064+ge,3553,xe,0)}t.bindFramebuffer(36009,re.__webglMultisampledFramebuffer)}}function $e(_){return Math.min(u,_.samples)}function Fe(_){const M=n.get(_);return a&&_.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function sn(_){const M=o.render.frame;g.get(_)!==M&&(g.set(_,M),_.update())}function Ut(_,M){const H=_.encoding,K=_.format,ee=_.type;return _.isCompressedTexture===!0||_.isVideoTexture===!0||_.format===fo||H!==Kn&&(H===Ne?a===!1?e.has("EXT_sRGB")===!0&&K===It?(_.format=fo,_.minFilter=vt,_.generateMipmaps=!1):M=fc.sRGBToLinear(M):(K!==It||ee!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",H)),M}this.allocateTextureUnit=W,this.resetTextureUnits=Q,this.setTexture2D=q,this.setTexture2DArray=pe,this.setTexture3D=N,this.setTextureCube=j,this.rebindTextures=xt,this.setupRenderTarget=Dt,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=le,this.useMultisampledRTT=Fe}function vv(r,e,t){const n=t.isWebGL2;function i(s,o=null){let a;if(s===Yn)return 5121;if(s===Wu)return 32819;if(s===Zu)return 32820;if(s===Vu)return 5120;if(s===Gu)return 5122;if(s===ac)return 5123;if(s===Ju)return 5124;if(s===Wn)return 5125;if(s===mn)return 5126;if(s===os)return n?5131:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Xu)return 6406;if(s===It)return 6408;if(s===qu)return 6409;if(s===ju)return 6410;if(s===Xn)return 6402;if(s===Ri)return 34041;if(s===fo)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Yu)return 6403;if(s===Ku)return 36244;if(s===Qu)return 33319;if(s===$u)return 33320;if(s===ed)return 36249;if(s===lr||s===cr||s===hr||s===ur)if(o===Ne)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===lr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===cr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ur)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===lr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===cr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===hr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ur)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===aa||s===la||s===ca||s===ha)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===aa)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===la)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ca)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ha)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===td)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ua||s===da)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===ua)return o===Ne?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===da)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===fa||s===pa||s===ma||s===ga||s===va||s===Aa||s===xa||s===ya||s===Sa||s===Ma||s===ba||s===wa||s===_a||s===Ta)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===fa)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===pa)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ma)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ga)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===va)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Aa)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===xa)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ya)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Sa)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ma)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ba)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===wa)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===_a)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ta)return o===Ne?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===dr)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===dr)return o===Ne?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===nd||s===Ea||s===Ca||s===Pa)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===dr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Ea)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ca)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Pa)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ei?n?34042:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class Av extends wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Qt extends je{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xv={type:"move"};class Fr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const m of e.hand.values()){const p=t.getJointPose(m,n),v=this._getHandJoint(c,m);p!==null&&(v.matrix.fromArray(p.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.jointRadius=p.radius),v.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(xv)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class yv extends nt{constructor(e,t,n,i,s,o,a,l,c,h){if(h=h!==void 0?h:Xn,h!==Xn&&h!==Ri)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Xn&&(n=Wn),n===void 0&&h===Ri&&(n=Ei),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ut,this.minFilter=l!==void 0?l:ut,this.flipY=!1,this.generateMipmaps=!1}}class Sv extends ei{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const m=t.getContextAttributes();let p=null,v=null;const S=[],A=[],x=new Set,w=new Map,E=new wt;E.layers.enable(1),E.viewport=new He;const P=new wt;P.layers.enable(2),P.viewport=new He;const y=[E,P],T=new Av;T.layers.enable(1),T.layers.enable(2);let z=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let j=S[N];return j===void 0&&(j=new Fr,S[N]=j),j.getTargetRaySpace()},this.getControllerGrip=function(N){let j=S[N];return j===void 0&&(j=new Fr,S[N]=j),j.getGripSpace()},this.getHand=function(N){let j=S[N];return j===void 0&&(j=new Fr,S[N]=j),j.getHandSpace()};function J(N){const j=A.indexOf(N.inputSource);if(j===-1)return;const ne=S[j];ne!==void 0&&ne.dispatchEvent({type:N.type,data:N.inputSource})}function k(){i.removeEventListener("select",J),i.removeEventListener("selectstart",J),i.removeEventListener("selectend",J),i.removeEventListener("squeeze",J),i.removeEventListener("squeezestart",J),i.removeEventListener("squeezeend",J),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",R);for(let N=0;N<S.length;N++){const j=A[N];j!==null&&(A[N]=null,S[N].disconnect(j))}z=null,G=null,e.setRenderTarget(p),f=null,d=null,u=null,i=null,v=null,pe.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){s=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){a=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(N){c=N},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(N){if(i=N,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",J),i.addEventListener("selectstart",J),i.addEventListener("selectend",J),i.addEventListener("squeeze",J),i.addEventListener("squeezestart",J),i.addEventListener("squeezeend",J),i.addEventListener("end",k),i.addEventListener("inputsourceschange",R),m.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const j={antialias:i.renderState.layers===void 0?m.antialias:!0,alpha:m.alpha,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,j),i.updateRenderState({baseLayer:f}),v=new yn(f.framebufferWidth,f.framebufferHeight,{format:It,type:Yn,encoding:e.outputEncoding,stencilBuffer:m.stencil})}else{let j=null,ne=null,ie=null;m.depth&&(ie=m.stencil?35056:33190,j=m.stencil?Ri:Xn,ne=m.stencil?Ei:Wn);const O={colorFormat:32856,depthFormat:ie,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(O),i.updateRenderState({layers:[d]}),v=new yn(d.textureWidth,d.textureHeight,{format:It,type:Yn,depthTexture:new yv(d.textureWidth,d.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:m.stencil,encoding:e.outputEncoding,samples:m.antialias?4:0});const be=e.properties.get(v);be.__ignoreDepthValues=d.ignoreDepthValues}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),pe.setContext(i),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function R(N){for(let j=0;j<N.removed.length;j++){const ne=N.removed[j],ie=A.indexOf(ne);ie>=0&&(A[ie]=null,S[ie].disconnect(ne))}for(let j=0;j<N.added.length;j++){const ne=N.added[j];let ie=A.indexOf(ne);if(ie===-1){for(let be=0;be<S.length;be++)if(be>=A.length){A.push(ne),ie=be;break}else if(A[be]===null){A[be]=ne,ie=be;break}if(ie===-1)break}const O=S[ie];O&&O.connect(ne)}}const F=new C,X=new C;function Q(N,j,ne){F.setFromMatrixPosition(j.matrixWorld),X.setFromMatrixPosition(ne.matrixWorld);const ie=F.distanceTo(X),O=j.projectionMatrix.elements,be=ne.projectionMatrix.elements,ue=O[14]/(O[10]-1),de=O[14]/(O[10]+1),le=(O[9]+1)/O[5],Ve=(O[9]-1)/O[5],we=(O[8]-1)/O[0],ye=(be[8]+1)/be[0],xt=ue*we,Dt=ue*ye,pt=ie/(-we+ye),Nt=pt*-we;j.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(Nt),N.translateZ(pt),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert();const $e=ue+pt,Fe=de+pt,sn=xt-Nt,Ut=Dt+(ie-Nt),_=le*de/Fe*$e,M=Ve*de/Fe*$e;N.projectionMatrix.makePerspective(sn,Ut,_,M,$e,Fe)}function W(N,j){j===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(j.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(i===null)return;T.near=P.near=E.near=N.near,T.far=P.far=E.far=N.far,(z!==T.near||G!==T.far)&&(i.updateRenderState({depthNear:T.near,depthFar:T.far}),z=T.near,G=T.far);const j=N.parent,ne=T.cameras;W(T,j);for(let O=0;O<ne.length;O++)W(ne[O],j);T.matrixWorld.decompose(T.position,T.quaternion,T.scale),N.matrix.copy(T.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale);const ie=N.children;for(let O=0,be=ie.length;O<be;O++)ie[O].updateMatrixWorld(!0);ne.length===2?Q(T,E,P):T.projectionMatrix.copy(E.projectionMatrix)},this.getCamera=function(){return T},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(N){l=N,d!==null&&(d.fixedFoveation=N),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=N)},this.getPlanes=function(){return x};let $=null;function q(N,j){if(h=j.getViewerPose(c||o),g=j,h!==null){const ne=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ie=!1;ne.length!==T.cameras.length&&(T.cameras.length=0,ie=!0);for(let O=0;O<ne.length;O++){const be=ne[O];let ue=null;if(f!==null)ue=f.getViewport(be);else{const le=u.getViewSubImage(d,be);ue=le.viewport,O===0&&(e.setRenderTargetTextures(v,le.colorTexture,d.ignoreDepthValues?void 0:le.depthStencilTexture),e.setRenderTarget(v))}let de=y[O];de===void 0&&(de=new wt,de.layers.enable(O),de.viewport=new He,y[O]=de),de.matrix.fromArray(be.transform.matrix),de.projectionMatrix.fromArray(be.projectionMatrix),de.viewport.set(ue.x,ue.y,ue.width,ue.height),O===0&&T.matrix.copy(de.matrix),ie===!0&&T.cameras.push(de)}}for(let ne=0;ne<S.length;ne++){const ie=A[ne],O=S[ne];ie!==null&&O!==void 0&&O.update(ie,j,c||o)}if($&&$(N,j),j.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:j.detectedPlanes});let ne=null;for(const ie of x)j.detectedPlanes.has(ie)||(ne===null&&(ne=[]),ne.push(ie));if(ne!==null)for(const ie of ne)x.delete(ie),w.delete(ie),n.dispatchEvent({type:"planeremoved",data:ie});for(const ie of j.detectedPlanes)if(!x.has(ie))x.add(ie),w.set(ie,j.lastChangedTime),n.dispatchEvent({type:"planeadded",data:ie});else{const O=w.get(ie);ie.lastChangedTime>O&&(w.set(ie,ie.lastChangedTime),n.dispatchEvent({type:"planechanged",data:ie}))}}g=null}const pe=new Mc;pe.setAnimationLoop(q),this.setAnimationLoop=function(N){$=N},this.dispose=function(){}}}function Mv(r,e){function t(m,p){p.color.getRGB(m.fogColor.value,xc(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,v,S,A){p.isMeshBasicMaterial||p.isMeshLambertMaterial?i(m,p):p.isMeshToonMaterial?(i(m,p),h(m,p)):p.isMeshPhongMaterial?(i(m,p),c(m,p)):p.isMeshStandardMaterial?(i(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,A)):p.isMeshMatcapMaterial?(i(m,p),f(m,p)):p.isMeshDepthMaterial?i(m,p):p.isMeshDistanceMaterial?(i(m,p),g(m,p)):p.isMeshNormalMaterial?i(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?a(m,p,v,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function i(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===Ct&&(m.bumpScale.value*=-1)),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===Ct&&m.normalScale.value.negate()),p.specularMap&&(m.specularMap.value=p.specularMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=r.physicallyCorrectLights!==!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity);let S;p.map?S=p.map:p.specularMap?S=p.specularMap:p.displacementMap?S=p.displacementMap:p.normalMap?S=p.normalMap:p.bumpMap?S=p.bumpMap:p.roughnessMap?S=p.roughnessMap:p.metalnessMap?S=p.metalnessMap:p.alphaMap?S=p.alphaMap:p.emissiveMap?S=p.emissiveMap:p.clearcoatMap?S=p.clearcoatMap:p.clearcoatNormalMap?S=p.clearcoatNormalMap:p.clearcoatRoughnessMap?S=p.clearcoatRoughnessMap:p.iridescenceMap?S=p.iridescenceMap:p.iridescenceThicknessMap?S=p.iridescenceThicknessMap:p.specularIntensityMap?S=p.specularIntensityMap:p.specularColorMap?S=p.specularColorMap:p.transmissionMap?S=p.transmissionMap:p.thicknessMap?S=p.thicknessMap:p.sheenColorMap?S=p.sheenColorMap:p.sheenRoughnessMap&&(S=p.sheenRoughnessMap),S!==void 0&&(S.isWebGLRenderTarget&&(S=S.texture),S.matrixAutoUpdate===!0&&S.updateMatrix(),m.uvTransform.value.copy(S.matrix));let A;p.aoMap?A=p.aoMap:p.lightMap&&(A=p.lightMap),A!==void 0&&(A.isWebGLRenderTarget&&(A=A.texture),A.matrixAutoUpdate===!0&&A.updateMatrix(),m.uv2Transform.value.copy(A.matrix))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function a(m,p,v,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=S*.5,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let A;p.map?A=p.map:p.alphaMap&&(A=p.alphaMap),A!==void 0&&(A.matrixAutoUpdate===!0&&A.updateMatrix(),m.uvTransform.value.copy(A.matrix))}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v;p.map?v=p.map:p.alphaMap&&(v=p.alphaMap),v!==void 0&&(v.matrixAutoUpdate===!0&&v.updateMatrix(),m.uvTransform.value.copy(v.matrix))}function c(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.roughness.value=p.roughness,m.metalness.value=p.metalness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap)),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),m.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===Ct&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap)),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap)}function f(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){m.referencePosition.value.copy(p.referencePosition),m.nearDistance.value=p.nearDistance,m.farDistance.value=p.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function bv(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(35375):0;function l(S,A){const x=A.program;n.uniformBlockBinding(S,x)}function c(S,A){let x=i[S.id];x===void 0&&(g(S),x=h(S),i[S.id]=x,S.addEventListener("dispose",p));const w=A.program;n.updateUBOMapping(S,w);const E=e.render.frame;s[S.id]!==E&&(d(S),s[S.id]=E)}function h(S){const A=u();S.__bindingPointIndex=A;const x=r.createBuffer(),w=S.__size,E=S.usage;return r.bindBuffer(35345,x),r.bufferData(35345,w,E),r.bindBuffer(35345,null),r.bindBufferBase(35345,A,x),x}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const A=i[S.id],x=S.uniforms,w=S.__cache;r.bindBuffer(35345,A);for(let E=0,P=x.length;E<P;E++){const y=x[E];if(f(y,E,w)===!0){const T=y.__offset,z=Array.isArray(y.value)?y.value:[y.value];let G=0;for(let J=0;J<z.length;J++){const k=z[J],R=m(k);typeof k=="number"?(y.__data[0]=k,r.bufferSubData(35345,T+G,y.__data)):k.isMatrix3?(y.__data[0]=k.elements[0],y.__data[1]=k.elements[1],y.__data[2]=k.elements[2],y.__data[3]=k.elements[0],y.__data[4]=k.elements[3],y.__data[5]=k.elements[4],y.__data[6]=k.elements[5],y.__data[7]=k.elements[0],y.__data[8]=k.elements[6],y.__data[9]=k.elements[7],y.__data[10]=k.elements[8],y.__data[11]=k.elements[0]):(k.toArray(y.__data,G),G+=R.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(35345,T,y.__data)}}r.bindBuffer(35345,null)}function f(S,A,x){const w=S.value;if(x[A]===void 0){if(typeof w=="number")x[A]=w;else{const E=Array.isArray(w)?w:[w],P=[];for(let y=0;y<E.length;y++)P.push(E[y].clone());x[A]=P}return!0}else if(typeof w=="number"){if(x[A]!==w)return x[A]=w,!0}else{const E=Array.isArray(x[A])?x[A]:[x[A]],P=Array.isArray(w)?w:[w];for(let y=0;y<E.length;y++){const T=E[y];if(T.equals(P[y])===!1)return T.copy(P[y]),!0}}return!1}function g(S){const A=S.uniforms;let x=0;const w=16;let E=0;for(let P=0,y=A.length;P<y;P++){const T=A[P],z={boundary:0,storage:0},G=Array.isArray(T.value)?T.value:[T.value];for(let J=0,k=G.length;J<k;J++){const R=G[J],F=m(R);z.boundary+=F.boundary,z.storage+=F.storage}if(T.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),T.__offset=x,P>0){E=x%w;const J=w-E;E!==0&&J-z.boundary<0&&(x+=w-E,T.__offset=x)}x+=z.storage}return E=x%w,E>0&&(x+=w-E),S.__size=x,S.__cache={},this}function m(S){const A={boundary:0,storage:0};return typeof S=="number"?(A.boundary=4,A.storage=4):S.isVector2?(A.boundary=8,A.storage=8):S.isVector3||S.isColor?(A.boundary=16,A.storage=12):S.isVector4?(A.boundary=16,A.storage=16):S.isMatrix3?(A.boundary=48,A.storage=48):S.isMatrix4?(A.boundary=64,A.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),A}function p(S){const A=S.target;A.removeEventListener("dispose",p);const x=o.indexOf(A.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[A.id]),delete i[A.id],delete s[A.id]}function v(){for(const S in i)r.deleteBuffer(i[S]);o=[],i={},s={}}return{bind:l,update:c,dispose:v}}function wv(){const r=hs("canvas");return r.style.display="block",r}function Ec(r={}){this.isWebGLRenderer=!0;const e=r.canvas!==void 0?r.canvas:wv(),t=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,o=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,a=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,l=r.powerPreference!==void 0?r.powerPreference:"default",c=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1;let h;t!==null?h=t.getContextAttributes().alpha:h=r.alpha!==void 0?r.alpha:!1;let u=null,d=null;const f=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=Kn,this.physicallyCorrectLights=!1,this.toneMapping=An,this.toneMappingExposure=1;const m=this;let p=!1,v=0,S=0,A=null,x=-1,w=null;const E=new He,P=new He;let y=null,T=e.width,z=e.height,G=1,J=null,k=null;const R=new He(0,0,T,z),F=new He(0,0,T,z);let X=!1;const Q=new Po;let W=!1,$=!1,q=null;const pe=new Ee,N=new oe,j=new C,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ie(){return A===null?G:1}let O=t;function be(b,D){for(let U=0;U<b.length;U++){const I=b[U],V=e.getContext(I,D);if(V!==null)return V}return null}try{const b={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:a,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wo}`),e.addEventListener("webglcontextlost",ve,!1),e.addEventListener("webglcontextrestored",fe,!1),e.addEventListener("webglcontextcreationerror",Ie,!1),O===null){const D=["webgl2","webgl","experimental-webgl"];if(m.isWebGL1Renderer===!0&&D.shift(),O=be(D,b),O===null)throw be(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ue,de,le,Ve,we,ye,xt,Dt,pt,Nt,$e,Fe,sn,Ut,_,M,H,K,ee,se,Se,re,Z,ge;function xe(){ue=new Dm(O),de=new Pm(O,ue,r),ue.init(de),re=new vv(O,ue,de),le=new mv(O,ue,de),Ve=new Fm,we=new tv,ye=new gv(O,ue,le,we,de,re,Ve),xt=new Rm(m),Dt=new km(m),pt=new Zd(O,de),Z=new Em(O,ue,pt,de),Nt=new Nm(O,pt,Ve,Z),$e=new Vm(O,Nt,pt,Ve),ee=new Hm(O,de,ye),M=new Lm(we),Fe=new ev(m,xt,Dt,ue,de,Z,M),sn=new Mv(m,we),Ut=new iv,_=new cv(ue,de),K=new Tm(m,xt,Dt,le,$e,h,o),H=new pv(m,$e,de),ge=new bv(O,Ve,de,le),se=new Cm(O,ue,Ve,de),Se=new Om(O,ue,Ve,de),Ve.programs=Fe.programs,m.capabilities=de,m.extensions=ue,m.properties=we,m.renderLists=Ut,m.shadowMap=H,m.state=le,m.info=Ve}xe();const ce=new Sv(m,O);this.xr=ce,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=ue.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ue.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(b){b!==void 0&&(G=b,this.setSize(T,z,!1))},this.getSize=function(b){return b.set(T,z)},this.setSize=function(b,D,U){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}T=b,z=D,e.width=Math.floor(b*G),e.height=Math.floor(D*G),U!==!1&&(e.style.width=b+"px",e.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(T*G,z*G).floor()},this.setDrawingBufferSize=function(b,D,U){T=b,z=D,G=U,e.width=Math.floor(b*U),e.height=Math.floor(D*U),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(E)},this.getViewport=function(b){return b.copy(R)},this.setViewport=function(b,D,U,I){b.isVector4?R.set(b.x,b.y,b.z,b.w):R.set(b,D,U,I),le.viewport(E.copy(R).multiplyScalar(G).floor())},this.getScissor=function(b){return b.copy(F)},this.setScissor=function(b,D,U,I){b.isVector4?F.set(b.x,b.y,b.z,b.w):F.set(b,D,U,I),le.scissor(P.copy(F).multiplyScalar(G).floor())},this.getScissorTest=function(){return X},this.setScissorTest=function(b){le.setScissorTest(X=b)},this.setOpaqueSort=function(b){J=b},this.setTransparentSort=function(b){k=b},this.getClearColor=function(b){return b.copy(K.getClearColor())},this.setClearColor=function(){K.setClearColor.apply(K,arguments)},this.getClearAlpha=function(){return K.getClearAlpha()},this.setClearAlpha=function(){K.setClearAlpha.apply(K,arguments)},this.clear=function(b=!0,D=!0,U=!0){let I=0;b&&(I|=16384),D&&(I|=256),U&&(I|=1024),O.clear(I)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ve,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",Ie,!1),Ut.dispose(),_.dispose(),we.dispose(),xt.dispose(),Dt.dispose(),$e.dispose(),Z.dispose(),ge.dispose(),Fe.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",ae),ce.removeEventListener("sessionend",he),q&&(q.dispose(),q=null),De.stop()};function ve(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),p=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),p=!1;const b=Ve.autoReset,D=H.enabled,U=H.autoUpdate,I=H.needsUpdate,V=H.type;xe(),Ve.autoReset=b,H.enabled=D,H.autoUpdate=U,H.needsUpdate=I,H.type=V}function Ie(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Xe(b){const D=b.target;D.removeEventListener("dispose",Xe),at(D)}function at(b){L(b),we.remove(b)}function L(b){const D=we.get(b).programs;D!==void 0&&(D.forEach(function(U){Fe.releaseProgram(U)}),b.isShaderMaterial&&Fe.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,U,I,V,me){D===null&&(D=ne);const Me=V.isMesh&&V.matrixWorld.determinant()<0,Te=Gc(b,D,U,I,V);le.setMaterial(I,Me);let Ce=U.index,ke=1;I.wireframe===!0&&(Ce=Nt.getWireframeAttribute(U),ke=2);const Pe=U.drawRange,Le=U.attributes.position;let Ye=Pe.start*ke,Pt=(Pe.start+Pe.count)*ke;me!==null&&(Ye=Math.max(Ye,me.start*ke),Pt=Math.min(Pt,(me.start+me.count)*ke)),Ce!==null?(Ye=Math.max(Ye,0),Pt=Math.min(Pt,Ce.count)):Le!=null&&(Ye=Math.max(Ye,0),Pt=Math.min(Pt,Le.count));const on=Pt-Ye;if(on<0||on===1/0)return;Z.setup(V,I,Te,U,Ce);let Dn,Ke=se;if(Ce!==null&&(Dn=pt.get(Ce),Ke=Se,Ke.setIndex(Dn)),V.isMesh)I.wireframe===!0?(le.setLineWidth(I.wireframeLinewidth*ie()),Ke.setMode(1)):Ke.setMode(4);else if(V.isLine){let Re=I.linewidth;Re===void 0&&(Re=1),le.setLineWidth(Re*ie()),V.isLineSegments?Ke.setMode(1):V.isLineLoop?Ke.setMode(2):Ke.setMode(3)}else V.isPoints?Ke.setMode(0):V.isSprite&&Ke.setMode(4);if(V.isInstancedMesh)Ke.renderInstances(Ye,on,V.count);else if(U.isInstancedBufferGeometry){const Re=U._maxInstanceCount!==void 0?U._maxInstanceCount:1/0,nr=Math.min(U.instanceCount,Re);Ke.renderInstances(Ye,on,nr)}else Ke.render(Ye,on)},this.compile=function(b,D){function U(I,V,me){I.transparent===!0&&I.side===pn&&I.forceSinglePass===!1?(I.side=Ct,I.needsUpdate=!0,Ot(I,V,me),I.side=xn,I.needsUpdate=!0,Ot(I,V,me),I.side=pn):Ot(I,V,me)}d=_.get(b),d.init(),g.push(d),b.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights(m.physicallyCorrectLights),b.traverse(function(I){const V=I.material;if(V)if(Array.isArray(V))for(let me=0;me<V.length;me++){const Me=V[me];U(Me,b,I)}else U(V,b,I)}),g.pop(),d=null};let B=null;function Y(b){B&&B(b)}function ae(){De.stop()}function he(){De.start()}const De=new Mc;De.setAnimationLoop(Y),typeof self<"u"&&De.setContext(self),this.setAnimationLoop=function(b){B=b,ce.setAnimationLoop(b),b===null?De.stop():De.start()},ce.addEventListener("sessionstart",ae),ce.addEventListener("sessionend",he),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(D),D=ce.getCamera()),b.isScene===!0&&b.onBeforeRender(m,b,D,A),d=_.get(b,g.length),d.init(),g.push(d),pe.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Q.setFromProjectionMatrix(pe),$=this.localClippingEnabled,W=M.init(this.clippingPlanes,$),u=Ut.get(b,f.length),u.init(),f.push(u),lt(b,D,0,m.sortObjects),u.finish(),m.sortObjects===!0&&u.sort(J,k),W===!0&&M.beginShadows();const U=d.state.shadowsArray;if(H.render(U,b,D),W===!0&&M.endShadows(),this.info.autoReset===!0&&this.info.reset(),K.render(u,b),d.setupLights(m.physicallyCorrectLights),D.isArrayCamera){const I=D.cameras;for(let V=0,me=I.length;V<me;V++){const Me=I[V];mt(u,b,Me,Me.viewport)}}else mt(u,b,D);A!==null&&(ye.updateMultisampleRenderTarget(A),ye.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(m,b,D),Z.resetDefaultState(),x=-1,w=null,g.pop(),g.length>0?d=g[g.length-1]:d=null,f.pop(),f.length>0?u=f[f.length-1]:u=null};function lt(b,D,U,I){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)U=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Q.intersectsSprite(b)){I&&j.setFromMatrixPosition(b.matrixWorld).applyMatrix4(pe);const Me=$e.update(b),Te=b.material;Te.visible&&u.push(b,Me,Te,U,j.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(b.isSkinnedMesh&&b.skeleton.frame!==Ve.render.frame&&(b.skeleton.update(),b.skeleton.frame=Ve.render.frame),!b.frustumCulled||Q.intersectsObject(b))){I&&j.setFromMatrixPosition(b.matrixWorld).applyMatrix4(pe);const Me=$e.update(b),Te=b.material;if(Array.isArray(Te)){const Ce=Me.groups;for(let ke=0,Pe=Ce.length;ke<Pe;ke++){const Le=Ce[ke],Ye=Te[Le.materialIndex];Ye&&Ye.visible&&u.push(b,Me,Ye,U,j.z,Le)}}else Te.visible&&u.push(b,Me,Te,U,j.z,null)}}const me=b.children;for(let Me=0,Te=me.length;Me<Te;Me++)lt(me[Me],D,U,I)}function mt(b,D,U,I){const V=b.opaque,me=b.transmissive,Me=b.transparent;d.setupLightsView(U),W===!0&&M.setGlobalState(m.clippingPlanes,U),me.length>0&&kn(V,D,U),I&&le.viewport(E.copy(I)),V.length>0&&qe(V,D,U),me.length>0&&qe(me,D,U),Me.length>0&&qe(Me,D,U),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function kn(b,D,U){const I=de.isWebGL2;q===null&&(q=new yn(1,1,{generateMipmaps:!0,type:ue.has("EXT_color_buffer_half_float")?os:Yn,minFilter:jn,samples:I&&s===!0?4:0})),m.getDrawingBufferSize(N),I?q.setSize(N.x,N.y):q.setSize(js(N.x),js(N.y));const V=m.getRenderTarget();m.setRenderTarget(q),m.clear();const me=m.toneMapping;m.toneMapping=An,qe(b,D,U),m.toneMapping=me,ye.updateMultisampleRenderTarget(q),ye.updateRenderTargetMipmap(q),m.setRenderTarget(V)}function qe(b,D,U){const I=D.isScene===!0?D.overrideMaterial:null;for(let V=0,me=b.length;V<me;V++){const Me=b[V],Te=Me.object,Ce=Me.geometry,ke=I===null?Me.material:I,Pe=Me.group;Te.layers.test(U.layers)&&rn(Te,D,U,Ce,ke,Pe)}}function rn(b,D,U,I,V,me){b.onBeforeRender(m,D,U,I,V,me),b.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),V.onBeforeRender(m,D,U,I,b,me),V.transparent===!0&&V.side===pn&&V.forceSinglePass===!1?(V.side=Ct,V.needsUpdate=!0,m.renderBufferDirect(U,D,I,V,b,me),V.side=xn,V.needsUpdate=!0,m.renderBufferDirect(U,D,I,V,b,me),V.side=pn):m.renderBufferDirect(U,D,I,V,b,me),b.onAfterRender(m,D,U,I,V,me)}function Ot(b,D,U){D.isScene!==!0&&(D=ne);const I=we.get(b),V=d.state.lights,me=d.state.shadowsArray,Me=V.state.version,Te=Fe.getParameters(b,V.state,me,D,U),Ce=Fe.getProgramCacheKey(Te);let ke=I.programs;I.environment=b.isMeshStandardMaterial?D.environment:null,I.fog=D.fog,I.envMap=(b.isMeshStandardMaterial?Dt:xt).get(b.envMap||I.environment),ke===void 0&&(b.addEventListener("dispose",Xe),ke=new Map,I.programs=ke);let Pe=ke.get(Ce);if(Pe!==void 0){if(I.currentProgram===Pe&&I.lightsStateVersion===Me)return qo(b,Te),Pe}else Te.uniforms=Fe.getUniforms(b),b.onBuild(U,Te,m),b.onBeforeCompile(Te,m),Pe=Fe.acquireProgram(Te,Ce),ke.set(Ce,Pe),I.uniforms=Te.uniforms;const Le=I.uniforms;(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Le.clippingPlanes=M.uniform),qo(b,Te),I.needsLights=Wc(b),I.lightsStateVersion=Me,I.needsLights&&(Le.ambientLightColor.value=V.state.ambient,Le.lightProbe.value=V.state.probe,Le.directionalLights.value=V.state.directional,Le.directionalLightShadows.value=V.state.directionalShadow,Le.spotLights.value=V.state.spot,Le.spotLightShadows.value=V.state.spotShadow,Le.rectAreaLights.value=V.state.rectArea,Le.ltc_1.value=V.state.rectAreaLTC1,Le.ltc_2.value=V.state.rectAreaLTC2,Le.pointLights.value=V.state.point,Le.pointLightShadows.value=V.state.pointShadow,Le.hemisphereLights.value=V.state.hemi,Le.directionalShadowMap.value=V.state.directionalShadowMap,Le.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Le.spotShadowMap.value=V.state.spotShadowMap,Le.spotLightMatrix.value=V.state.spotLightMatrix,Le.spotLightMap.value=V.state.spotLightMap,Le.pointShadowMap.value=V.state.pointShadowMap,Le.pointShadowMatrix.value=V.state.pointShadowMatrix);const Ye=Pe.getUniforms(),Pt=Js.seqWithValue(Ye.seq,Le);return I.currentProgram=Pe,I.uniformsList=Pt,Pe}function qo(b,D){const U=we.get(b);U.outputEncoding=D.outputEncoding,U.instancing=D.instancing,U.skinning=D.skinning,U.morphTargets=D.morphTargets,U.morphNormals=D.morphNormals,U.morphColors=D.morphColors,U.morphTargetsCount=D.morphTargetsCount,U.numClippingPlanes=D.numClippingPlanes,U.numIntersection=D.numClipIntersection,U.vertexAlphas=D.vertexAlphas,U.vertexTangents=D.vertexTangents,U.toneMapping=D.toneMapping}function Gc(b,D,U,I,V){D.isScene!==!0&&(D=ne),ye.resetTextureUnits();const me=D.fog,Me=I.isMeshStandardMaterial?D.environment:null,Te=A===null?m.outputEncoding:A.isXRRenderTarget===!0?A.texture.encoding:Kn,Ce=(I.isMeshStandardMaterial?Dt:xt).get(I.envMap||Me),ke=I.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,Pe=!!I.normalMap&&!!U.attributes.tangent,Le=!!U.morphAttributes.position,Ye=!!U.morphAttributes.normal,Pt=!!U.morphAttributes.color,on=I.toneMapped?m.toneMapping:An,Dn=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Ke=Dn!==void 0?Dn.length:0,Re=we.get(I),nr=d.state.lights;if(W===!0&&($===!0||b!==w)){const Lt=b===w&&I.id===x;M.setState(I,b,Lt)}let ct=!1;I.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==nr.state.version||Re.outputEncoding!==Te||V.isInstancedMesh&&Re.instancing===!1||!V.isInstancedMesh&&Re.instancing===!0||V.isSkinnedMesh&&Re.skinning===!1||!V.isSkinnedMesh&&Re.skinning===!0||Re.envMap!==Ce||I.fog===!0&&Re.fog!==me||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==M.numPlanes||Re.numIntersection!==M.numIntersection)||Re.vertexAlphas!==ke||Re.vertexTangents!==Pe||Re.morphTargets!==Le||Re.morphNormals!==Ye||Re.morphColors!==Pt||Re.toneMapping!==on||de.isWebGL2===!0&&Re.morphTargetsCount!==Ke)&&(ct=!0):(ct=!0,Re.__version=I.version);let Nn=Re.currentProgram;ct===!0&&(Nn=Ot(I,D,V));let jo=!1,Ui=!1,ir=!1;const yt=Nn.getUniforms(),On=Re.uniforms;if(le.useProgram(Nn.program)&&(jo=!0,Ui=!0,ir=!0),I.id!==x&&(x=I.id,Ui=!0),jo||w!==b){if(yt.setValue(O,"projectionMatrix",b.projectionMatrix),de.logarithmicDepthBuffer&&yt.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),w!==b&&(w=b,Ui=!0,ir=!0),I.isShaderMaterial||I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshStandardMaterial||I.envMap){const Lt=yt.map.cameraPosition;Lt!==void 0&&Lt.setValue(O,j.setFromMatrixPosition(b.matrixWorld))}(I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshLambertMaterial||I.isMeshBasicMaterial||I.isMeshStandardMaterial||I.isShaderMaterial)&&yt.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),(I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshLambertMaterial||I.isMeshBasicMaterial||I.isMeshStandardMaterial||I.isShaderMaterial||I.isShadowMaterial||V.isSkinnedMesh)&&yt.setValue(O,"viewMatrix",b.matrixWorldInverse)}if(V.isSkinnedMesh){yt.setOptional(O,V,"bindMatrix"),yt.setOptional(O,V,"bindMatrixInverse");const Lt=V.skeleton;Lt&&(de.floatVertexTextures?(Lt.boneTexture===null&&Lt.computeBoneTexture(),yt.setValue(O,"boneTexture",Lt.boneTexture,ye),yt.setValue(O,"boneTextureSize",Lt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const sr=U.morphAttributes;if((sr.position!==void 0||sr.normal!==void 0||sr.color!==void 0&&de.isWebGL2===!0)&&ee.update(V,U,I,Nn),(Ui||Re.receiveShadow!==V.receiveShadow)&&(Re.receiveShadow=V.receiveShadow,yt.setValue(O,"receiveShadow",V.receiveShadow)),I.isMeshGouraudMaterial&&I.envMap!==null&&(On.envMap.value=Ce,On.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),Ui&&(yt.setValue(O,"toneMappingExposure",m.toneMappingExposure),Re.needsLights&&Jc(On,ir),me&&I.fog===!0&&sn.refreshFogUniforms(On,me),sn.refreshMaterialUniforms(On,I,G,z,q),Js.upload(O,Re.uniformsList,On,ye)),I.isShaderMaterial&&I.uniformsNeedUpdate===!0&&(Js.upload(O,Re.uniformsList,On,ye),I.uniformsNeedUpdate=!1),I.isSpriteMaterial&&yt.setValue(O,"center",V.center),yt.setValue(O,"modelViewMatrix",V.modelViewMatrix),yt.setValue(O,"normalMatrix",V.normalMatrix),yt.setValue(O,"modelMatrix",V.matrixWorld),I.isShaderMaterial||I.isRawShaderMaterial){const Lt=I.uniformsGroups;for(let rr=0,Zc=Lt.length;rr<Zc;rr++)if(de.isWebGL2){const Yo=Lt[rr];ge.update(Yo,Nn),ge.bind(Yo,Nn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Nn}function Jc(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function Wc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return v},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,D,U){we.get(b.texture).__webglTexture=D,we.get(b.depthTexture).__webglTexture=U;const I=we.get(b);I.__hasExternalTextures=!0,I.__hasExternalTextures&&(I.__autoAllocateDepthBuffer=U===void 0,I.__autoAllocateDepthBuffer||ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),I.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,D){const U=we.get(b);U.__webglFramebuffer=D,U.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,U=0){A=b,v=D,S=U;let I=!0,V=null,me=!1,Me=!1;if(b){const Ce=we.get(b);Ce.__useDefaultFramebuffer!==void 0?(le.bindFramebuffer(36160,null),I=!1):Ce.__webglFramebuffer===void 0?ye.setupRenderTarget(b):Ce.__hasExternalTextures&&ye.rebindTextures(b,we.get(b.texture).__webglTexture,we.get(b.depthTexture).__webglTexture);const ke=b.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Me=!0);const Pe=we.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(V=Pe[D],me=!0):de.isWebGL2&&b.samples>0&&ye.useMultisampledRTT(b)===!1?V=we.get(b).__webglMultisampledFramebuffer:V=Pe,E.copy(b.viewport),P.copy(b.scissor),y=b.scissorTest}else E.copy(R).multiplyScalar(G).floor(),P.copy(F).multiplyScalar(G).floor(),y=X;if(le.bindFramebuffer(36160,V)&&de.drawBuffers&&I&&le.drawBuffers(b,V),le.viewport(E),le.scissor(P),le.setScissorTest(y),me){const Ce=we.get(b.texture);O.framebufferTexture2D(36160,36064,34069+D,Ce.__webglTexture,U)}else if(Me){const Ce=we.get(b.texture),ke=D||0;O.framebufferTextureLayer(36160,36064,Ce.__webglTexture,U||0,ke)}x=-1},this.readRenderTargetPixels=function(b,D,U,I,V,me,Me){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=we.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te){le.bindFramebuffer(36160,Te);try{const Ce=b.texture,ke=Ce.format,Pe=Ce.type;if(ke!==It&&re.convert(ke)!==O.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Le=Pe===os&&(ue.has("EXT_color_buffer_half_float")||de.isWebGL2&&ue.has("EXT_color_buffer_float"));if(Pe!==Yn&&re.convert(Pe)!==O.getParameter(35738)&&!(Pe===mn&&(de.isWebGL2||ue.has("OES_texture_float")||ue.has("WEBGL_color_buffer_float")))&&!Le){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-I&&U>=0&&U<=b.height-V&&O.readPixels(D,U,I,V,re.convert(ke),re.convert(Pe),me)}finally{const Ce=A!==null?we.get(A).__webglFramebuffer:null;le.bindFramebuffer(36160,Ce)}}},this.copyFramebufferToTexture=function(b,D,U=0){const I=Math.pow(2,-U),V=Math.floor(D.image.width*I),me=Math.floor(D.image.height*I);ye.setTexture2D(D,0),O.copyTexSubImage2D(3553,U,0,0,b.x,b.y,V,me),le.unbindTexture()},this.copyTextureToTexture=function(b,D,U,I=0){const V=D.image.width,me=D.image.height,Me=re.convert(U.format),Te=re.convert(U.type);ye.setTexture2D(U,0),O.pixelStorei(37440,U.flipY),O.pixelStorei(37441,U.premultiplyAlpha),O.pixelStorei(3317,U.unpackAlignment),D.isDataTexture?O.texSubImage2D(3553,I,b.x,b.y,V,me,Me,Te,D.image.data):D.isCompressedTexture?O.compressedTexSubImage2D(3553,I,b.x,b.y,D.mipmaps[0].width,D.mipmaps[0].height,Me,D.mipmaps[0].data):O.texSubImage2D(3553,I,b.x,b.y,Me,Te,D.image),I===0&&U.generateMipmaps&&O.generateMipmap(3553),le.unbindTexture()},this.copyTextureToTexture3D=function(b,D,U,I,V=0){if(m.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const me=b.max.x-b.min.x+1,Me=b.max.y-b.min.y+1,Te=b.max.z-b.min.z+1,Ce=re.convert(I.format),ke=re.convert(I.type);let Pe;if(I.isData3DTexture)ye.setTexture3D(I,0),Pe=32879;else if(I.isDataArrayTexture)ye.setTexture2DArray(I,0),Pe=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(37440,I.flipY),O.pixelStorei(37441,I.premultiplyAlpha),O.pixelStorei(3317,I.unpackAlignment);const Le=O.getParameter(3314),Ye=O.getParameter(32878),Pt=O.getParameter(3316),on=O.getParameter(3315),Dn=O.getParameter(32877),Ke=U.isCompressedTexture?U.mipmaps[0]:U.image;O.pixelStorei(3314,Ke.width),O.pixelStorei(32878,Ke.height),O.pixelStorei(3316,b.min.x),O.pixelStorei(3315,b.min.y),O.pixelStorei(32877,b.min.z),U.isDataTexture||U.isData3DTexture?O.texSubImage3D(Pe,V,D.x,D.y,D.z,me,Me,Te,Ce,ke,Ke.data):U.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Pe,V,D.x,D.y,D.z,me,Me,Te,Ce,Ke.data)):O.texSubImage3D(Pe,V,D.x,D.y,D.z,me,Me,Te,Ce,ke,Ke),O.pixelStorei(3314,Le),O.pixelStorei(32878,Ye),O.pixelStorei(3316,Pt),O.pixelStorei(3315,on),O.pixelStorei(32877,Dn),V===0&&I.generateMipmaps&&O.generateMipmap(Pe),le.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?ye.setTextureCube(b,0):b.isData3DTexture?ye.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?ye.setTexture2DArray(b,0):ye.setTexture2D(b,0),le.unbindTexture()},this.resetState=function(){v=0,S=0,A=null,le.reset(),Z.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class _v extends Ec{}_v.prototype.isWebGL1Renderer=!0;class Ro extends je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class Tv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=uo,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=qt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Mt=new C;class zo{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}setX(e,t){return this.normalized&&(t=Ue(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ue(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ue(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ue(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=gn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=gn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=gn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=gn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ue(t,this.array),n=Ue(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ue(t,this.array),n=Ue(n,this.array),i=Ue(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ue(t,this.array),n=Ue(n,this.array),i=Ue(i,this.array),s=Ue(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Je(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new zo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const hl=new C,ul=new He,dl=new He,Ev=new C,fl=new Ee;class Cv extends We{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Ee,this.bindMatrixInverse=new Ee}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new He,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,i=this.geometry;ul.fromBufferAttribute(i.attributes.skinIndex,e),dl.fromBufferAttribute(i.attributes.skinWeight,e),hl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=dl.getComponent(s);if(o!==0){const a=ul.getComponent(s);fl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Ev.copy(hl).applyMatrix4(fl),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Cc extends je{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Pc extends nt{constructor(e=null,t=1,n=1,i,s,o,a,l,c=ut,h=ut,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const pl=new Ee,Pv=new Ee;class Io{constructor(e=[],t=[]){this.uuid=qt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ee)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ee;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Pv;pl.multiplyMatrices(a,t[s]),pl.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Io(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=hc(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Pc(t,e,e,It,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Cc),this.bones.push(o),this.boneInverses.push(new Ee().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class ml extends Je{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const gl=new Ee,vl=new Ee,ks=[],Lv=new Ee,qi=new We;class Rv extends We{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ml(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1;for(let i=0;i<n;i++)this.setMatrixAt(i,Lv)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(qi.geometry=this.geometry,qi.material=this.material,qi.material!==void 0)for(let s=0;s<i;s++){this.getMatrixAt(s,gl),vl.multiplyMatrices(n,gl),qi.matrixWorld=vl,qi.raycast(e,ks);for(let o=0,a=ks.length;o<a;o++){const l=ks[o];l.instanceId=s,l.object=this,t.push(l)}ks.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ml(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Lc extends en{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Al=new C,xl=new C,yl=new Ee,Br=new Co,Ds=new Ni;class ko extends je{constructor(e=new st,t=new Lc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Al.fromBufferAttribute(t,i-1),xl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Al.distanceTo(xl);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ds.copy(n.boundingSphere),Ds.applyMatrix4(i),Ds.radius+=s,e.ray.intersectsSphere(Ds)===!1)return;yl.copy(i).invert(),Br.copy(e.ray).applyMatrix4(yl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new C,h=new C,u=new C,d=new C,f=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const v=Math.max(0,o.start),S=Math.min(g.count,o.start+o.count);for(let A=v,x=S-1;A<x;A+=f){const w=g.getX(A),E=g.getX(A+1);if(c.fromBufferAttribute(p,w),h.fromBufferAttribute(p,E),Br.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const y=e.ray.origin.distanceTo(d);y<e.near||y>e.far||t.push({distance:y,point:u.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,o.start),S=Math.min(p.count,o.start+o.count);for(let A=v,x=S-1;A<x;A+=f){if(c.fromBufferAttribute(p,A),h.fromBufferAttribute(p,A+1),Br.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const E=e.ray.origin.distanceTo(d);E<e.near||E>e.far||t.push({distance:E,point:u.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Sl=new C,Ml=new C;class zv extends ko{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Sl.fromBufferAttribute(t,i),Ml.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Sl.distanceTo(Ml);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Iv extends ko{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Rc extends en{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const bl=new Ee,go=new Co,Ns=new Ni,Os=new C;class Do extends je{constructor(e=new st,t=new Rc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere),Ns.applyMatrix4(i),Ns.radius+=s,e.ray.intersectsSphere(Ns)===!1)return;bl.copy(i).invert(),go.copy(e.ray).applyMatrix4(bl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,m=f;g<m;g++){const p=c.getX(g);Os.fromBufferAttribute(u,p),wl(Os,p,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,m=f;g<m;g++)Os.fromBufferAttribute(u,g),wl(Os,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function wl(r,e,t,n,i,s,o){const a=go.distanceSqToPoint(r);if(a<t){const l=new C;go.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=t||(o.isVector2?new oe:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new C,i=[],s=[],o=[],a=new C,l=new Ee;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new C)}s[0]=new C,o[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(dt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(dt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class No extends tn{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const n=t||new oe,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class kv extends No{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Oo(){let r=0,e=0,t=0,n=0;function i(s,o,a,l){r=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const Fs=new C,Ur=new Oo,Hr=new Oo,Vr=new Oo;class Dv extends tn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Fs.subVectors(i[0],i[1]).add(i[0]),c=Fs);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Fs.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Fs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);m<1e-4&&(m=1),g<1e-4&&(g=m),p<1e-4&&(p=m),Ur.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,m,p),Hr.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,m,p),Vr.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,m,p)}else this.curveType==="catmullrom"&&(Ur.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Hr.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Vr.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ur.calc(l),Hr.calc(l),Vr.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function _l(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,a=r*r,l=r*a;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*a+s*r+t}function Nv(r,e){const t=1-r;return t*t*e}function Ov(r,e){return 2*(1-r)*r*e}function Fv(r,e){return r*r*e}function ns(r,e,t,n){return Nv(r,e)+Ov(r,t)+Fv(r,n)}function Bv(r,e){const t=1-r;return t*t*t*e}function Uv(r,e){const t=1-r;return 3*t*t*r*e}function Hv(r,e){return 3*(1-r)*r*r*e}function Vv(r,e){return r*r*r*e}function is(r,e,t,n,i){return Bv(r,e)+Uv(r,t)+Hv(r,n)+Vv(r,i)}class zc extends tn{constructor(e=new oe,t=new oe,n=new oe,i=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new oe){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(is(e,i.x,s.x,o.x,a.x),is(e,i.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Gv extends tn{constructor(e=new C,t=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(is(e,i.x,s.x,o.x,a.x),is(e,i.y,s.y,o.y,a.y),is(e,i.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Fo extends tn{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t){const n=t||new oe;return n.copy(this.v2).sub(this.v1).normalize(),n}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jv extends tn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ic extends tn{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(ns(e,i.x,s.x,o.x),ns(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wv extends tn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(ns(e,i.x,s.x,o.x),ns(e,i.y,s.y,o.y),ns(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kc extends tn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(_l(a,l.x,c.x,h.x,u.x),_l(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new oe().fromArray(i))}return this}}var Zv=Object.freeze({__proto__:null,ArcCurve:kv,CatmullRomCurve3:Dv,CubicBezierCurve:zc,CubicBezierCurve3:Gv,EllipseCurve:No,LineCurve:Fo,LineCurve3:Jv,QuadraticBezierCurve:Ic,QuadraticBezierCurve3:Wv,SplineCurve:kc});class Xv extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new Fo(t,e))}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Zv[i.type]().fromJSON(i))}return this}}class qv extends Xv{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Fo(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Ic(this.currentPoint.clone(),new oe(e,t),new oe(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const a=new zc(this.currentPoint.clone(),new oe(e,t),new oe(n,i),new oe(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new kc(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,o,a,l),this}absellipse(e,t,n,i,s,o,a,l){const c=new No(e,t,n,i,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Bo extends st{constructor(e=[new oe(0,-.5),new oe(.5,0),new oe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=dt(i,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],h=1/t,u=new C,d=new oe,f=new C,g=new C,m=new C;let p=0,v=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:p=e[S+1].x-e[S].x,v=e[S+1].y-e[S].y,f.x=v*1,f.y=-p,f.z=v*0,m.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(m.x,m.y,m.z);break;default:p=e[S+1].x-e[S].x,v=e[S+1].y-e[S].y,f.x=v*1,f.y=-p,f.z=v*0,g.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),l.push(f.x,f.y,f.z),m.copy(g)}for(let S=0;S<=t;S++){const A=n+S*h*i,x=Math.sin(A),w=Math.cos(A);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*x,u.y=e[E].y,u.z=e[E].x*w,o.push(u.x,u.y,u.z),d.x=S/t,d.y=E/(e.length-1),a.push(d.x,d.y);const P=l[3*E+0]*x,y=l[3*E+1],T=l[3*E+0]*w;c.push(P,y,T)}}for(let S=0;S<t;S++)for(let A=0;A<e.length-1;A++){const x=A+S*e.length,w=x,E=x+e.length,P=x+e.length+1,y=x+1;s.push(w,E,y),s.push(P,y,E)}this.setIndex(s),this.setAttribute("position",new Ze(o,3)),this.setAttribute("uv",new Ze(a,2)),this.setAttribute("normal",new Ze(c,3))}static fromJSON(e){return new Bo(e.points,e.segments,e.phiStart,e.phiLength)}}class Uo extends Bo{constructor(e=1,t=1,n=4,i=8){const s=new qv;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new Uo(e.radius,e.length,e.capSegments,e.radialSegments)}}class Ho extends st{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new C,h=new oe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ze(o,3)),this.setAttribute("normal",new Ze(a,3)),this.setAttribute("uv",new Ze(l,2))}static fromJSON(e){return new Ho(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Vo extends st{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new C,d=new C,f=[],g=[],m=[],p=[];for(let v=0;v<=n;v++){const S=[],A=v/n;let x=0;v==0&&o==0?x=.5/t:v==n&&l==Math.PI&&(x=-.5/t);for(let w=0;w<=t;w++){const E=w/t;u.x=-e*Math.cos(i+E*s)*Math.sin(o+A*a),u.y=e*Math.cos(o+A*a),u.z=e*Math.sin(i+E*s)*Math.sin(o+A*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),p.push(E+x,1-A),S.push(c++)}h.push(S)}for(let v=0;v<n;v++)for(let S=0;S<t;S++){const A=h[v][S+1],x=h[v][S],w=h[v+1][S],E=h[v+1][S+1];(v!==0||o>0)&&f.push(A,x,E),(v!==n-1||l<Math.PI)&&f.push(x,w,E)}this.setIndex(f),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(m,3)),this.setAttribute("uv",new Ze(p,2))}static fromJSON(e){return new Vo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class jv extends Tt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Go extends en{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cc,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ti extends Go{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return dt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ae(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function _n(r,e,t){return Dc(r)?new r.constructor(r.subarray(e,t!==void 0?t:r.length)):r.slice(e,t)}function Bs(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Dc(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Yv(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Tl(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function Nc(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class ps{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Kv extends ps{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xi,endingEnd:xi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case yi:s=e,a=2*t-n;break;case qs:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case yi:o=e,l=2*n-t;break;case qs:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),m=g*g,p=m*g,v=-d*p+2*d*m-d*g,S=(1+d)*p+(-1.5-2*d)*m+(-.5+d)*g+1,A=(-1-f)*p+(1.5+f)*m+.5*g,x=f*p-f*m;for(let w=0;w!==a;++w)s[w]=v*o[h+w]+S*o[c+w]+A*o[l+w]+x*o[u+w];return s}}class Oc extends ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}}class Qv extends ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class nn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Bs(t,this.TimeBufferType),this.values=Bs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Bs(e.times,Array),values:Bs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Qv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Oc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Kv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case as:t=this.InterpolantFactoryMethodDiscrete;break;case zi:t=this.InterpolantFactoryMethodLinear;break;case fr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return as;case this.InterpolantFactoryMethodLinear:return zi;case this.InterpolantFactoryMethodSmooth:return fr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=_n(n,s,o),this.values=_n(this.values,s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Dc(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=_n(this.times),t=_n(this.values),n=this.getValueSize(),i=this.getInterpolation()===fr,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const m=t[u+g];if(m!==t[d+g]||m!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=_n(e,0,o),this.values=_n(t,0,o*n)):(this.times=e,this.values=t),this}clone(){const e=_n(this.times,0),t=_n(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}nn.prototype.TimeBufferType=Float32Array;nn.prototype.ValueBufferType=Float32Array;nn.prototype.DefaultInterpolation=zi;class Fi extends nn{}Fi.prototype.ValueTypeName="bool";Fi.prototype.ValueBufferType=Array;Fi.prototype.DefaultInterpolation=as;Fi.prototype.InterpolantFactoryMethodLinear=void 0;Fi.prototype.InterpolantFactoryMethodSmooth=void 0;class Fc extends nn{}Fc.prototype.ValueTypeName="color";class us extends nn{}us.prototype.ValueTypeName="number";class $v extends ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)jt.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Qn extends nn{InterpolantFactoryMethodLinear(e){return new $v(this.times,this.values,this.getValueSize(),e)}}Qn.prototype.ValueTypeName="quaternion";Qn.prototype.DefaultInterpolation=zi;Qn.prototype.InterpolantFactoryMethodSmooth=void 0;class Bi extends nn{}Bi.prototype.ValueTypeName="string";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=as;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;class ds extends nn{}ds.prototype.ValueTypeName="vector";class vo{constructor(e,t=-1,n,i=To){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=qt(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(t0(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(nn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=Yv(l);l=Tl(l,1,h),c=Tl(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new us(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,m){if(f.length!==0){const p=[],v=[];Nc(f,p,v,g),p.length!==0&&m.push(new u(d,p,v))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let m=0;m<d[g].morphTargets.length;m++)f[d[g].morphTargets[m]]=-1;for(const m in f){const p=[],v=[];for(let S=0;S!==d[g].morphTargets.length;++S){const A=d[g];p.push(A.time),v.push(A.morphTarget===m?1:0)}i.push(new us(".morphTargetInfluence["+m+"]",p,v))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(ds,f+".position",d,"pos",i),n(Qn,f+".quaternion",d,"rot",i),n(ds,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function e0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return us;case"vector":case"vector2":case"vector3":case"vector4":return ds;case"color":return Fc;case"quaternion":return Qn;case"bool":case"boolean":return Fi;case"string":return Bi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function t0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=e0(r.type);if(r.times===void 0){const t=[],n=[];Nc(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const ki={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class n0{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const i0=new n0;class ms{constructor(e){this.manager=e!==void 0?e:i0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const dn={};class s0 extends Error{constructor(e,t){super(e),this.response=t}}class Bc extends ms{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ki.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(dn[e]!==void 0){dn[e].push({onLoad:t,onProgress:n,onError:i});return}dn[e]=[],dn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=dn[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=d?parseInt(d):0,g=f!==0;let m=0;const p=new ReadableStream({start(v){S();function S(){u.read().then(({done:A,value:x})=>{if(A)v.close();else{m+=x.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:m,total:f});for(let E=0,P=h.length;E<P;E++){const y=h[E];y.onProgress&&y.onProgress(w)}v.enqueue(x),S()}})}}});return new Response(p)}else throw new s0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{ki.add(e,c);const h=dn[e];delete dn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=dn[e];if(h===void 0)throw this.manager.itemError(e),c;delete dn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class r0 extends ms{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ki.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=hs("img");function l(){h(),ki.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class o0 extends ms{constructor(e){super(e)}load(e,t,n,i){const s=new nt,o=new r0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class tr extends je{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Gr=new Ee,El=new C,Cl=new C;class Jo{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Po,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new He(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;El.setFromMatrixPosition(e.matrixWorld),t.position.copy(El),Cl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cl),t.updateMatrixWorld(),Gr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Gr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class a0 extends Jo{constructor(){super(new wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=cs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class l0 extends tr{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.target=new je,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new a0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Pl=new Ee,ji=new C,Jr=new C;class c0 extends Jo{constructor(){super(new wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new oe(4,2),this._viewportCount=6,this._viewports=[new He(2,1,1,1),new He(0,1,1,1),new He(3,1,1,1),new He(1,1,1,1),new He(3,0,1,1),new He(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ji.setFromMatrixPosition(e.matrixWorld),n.position.copy(ji),Jr.copy(n.position),Jr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Jr),n.updateMatrixWorld(),i.makeTranslation(-ji.x,-ji.y,-ji.z),Pl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pl)}}class h0 extends tr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new c0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class u0 extends Jo{constructor(){super(new $s(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ao extends tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.target=new je,this.shadow=new u0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class d0 extends tr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class xo{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class f0 extends ms{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ki.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){ki.add(e,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){i&&i(l),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}class p0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){jt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;jt.multiplyQuaternionsFlat(e,o,e,t,e,n),jt.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const Wo="\\[\\]\\.:\\/",m0=new RegExp("["+Wo+"]","g"),Zo="[^"+Wo+"]",g0="[^"+Wo.replace("\\.","")+"]",v0=/((?:WC+[\/:])*)/.source.replace("WC",Zo),A0=/(WCOD+)?/.source.replace("WCOD",g0),x0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zo),y0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zo),S0=new RegExp("^"+v0+A0+x0+y0+"$"),M0=["material","materials","bones","map"];class b0{constructor(e,t,n){const i=n||Oe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Oe{constructor(e,t,n){this.path=t,this.parsedPath=n||Oe.parseTrackName(t),this.node=Oe.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Oe.Composite(e,t,n):new Oe(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(m0,"")}static parseTrackName(e){const t=S0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);M0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Oe.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Oe.Composite=b0;Oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Oe.prototype.GetterByBindingType=[Oe.prototype._getValue_direct,Oe.prototype._getValue_array,Oe.prototype._getValue_arrayElement,Oe.prototype._getValue_toArray];Oe.prototype.SetterByBindingTypeAndVersioning=[[Oe.prototype._setValue_direct,Oe.prototype._setValue_direct_setNeedsUpdate,Oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Oe.prototype._setValue_array,Oe.prototype._setValue_array_setNeedsUpdate,Oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Oe.prototype._setValue_arrayElement,Oe.prototype._setValue_arrayElement_setNeedsUpdate,Oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Oe.prototype._setValue_fromArray,Oe.prototype._setValue_fromArray_setNeedsUpdate,Oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class w0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,a=new Array(o),l={endingStart:xi,endingEnd:xi};for(let c=0;c!==o;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=sd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case od:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case To:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===rd;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===id){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=yi,i.endingEnd=yi):(e?i.endingStart=this.zeroSlopeAtStart?yi:xi:i.endingStart=qs,t?i.endingEnd=this.zeroSlopeAtEnd?yi:xi:i.endingEnd=qs)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}}const _0=new Float32Array(1);class T0 extends ei{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const m=t&&t._propertyBindings[u].binding.parsedPath;g=new p0(Oe.create(n,f,m),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Oc(new Float32Array(2),new Float32Array(2),1,_0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?vo.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=To),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new w0(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?vo.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wo);class E0{constructor(e){this.state=Ge.getInstance(),this.view=_t.getInstance(),this.scene=this.view.scene,this.viewport=this.state.viewport,this.setInstance()}setInstance(){this.instance=new wt(45,this.viewport.width/this.viewport.height,.1,5e3),this.instance.rotation.reorder("YXZ"),this.scene.add(this.instance)}resize(){this.instance.aspect=this.viewport.width/this.viewport.height,this.instance.updateProjectionMatrix()}update(){const e=this.state.player;this.instance.position.set(e.camera.position[0],e.camera.position[1],e.camera.position[2]),this.instance.quaternion.set(e.camera.quaternion[0],e.camera.quaternion[1],e.camera.quaternion[2],e.camera.quaternion[3])}destroy(){}}const C0="data:image/png;base64,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",P0=r=>{typeof r=="number"&&(r=r.toString(10)[0]);const e=L0.indexOf(r);if(e===-1)return[0,0];const t=e%Rl,n=Math.floor(e/Rl);return[t,n]},Ll=(r,e=4)=>{typeof r=="number"&&(r=Math.floor(r).toString(10)),r.length>e&&(r=r.slice(0,e));const t=r.length;r.length<e&&(r=r.padEnd(e," "));const n=[...r].map(P0);return{count:t,offsets:n}},L0="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz #@&$%?!+-_=*/\\|[](){}<>.;:,×",R0=4096,z0=256,Rl=64,zl=64,Il=120,I0=C0;var k0=`precision highp float;
#define GLSLIFY 1

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float z_offset;

attribute vec3 position;

attribute float char_count;
varying float v_char_count;

attribute float size;

attribute vec3 color;
varying vec3 v_color;

// REPLACE-DECLARE:
attribute vec2 char_offset_X;
varying vec2 v_char_offset_X;
// REPLACE-END

void main() {

  v_char_count = char_count;
  v_color = color;
  
  // REPLACE-COMPUTE:
  v_char_offset_X = char_offset_X;
  // REPLACE-END
  
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
  gl_Position.z += z_offset;
	gl_PointSize = size * 2000.0 / -mvPosition.z;
}`,D0=`precision highp float;
#define GLSLIFY 1

// #define MULTIPLY

uniform sampler2D atlas_texture;
uniform float char_max;
uniform vec2 char_size;
uniform float char_aspect;
uniform float opacity;

varying float v_char_count;
varying vec3 v_color;

// REPLACE-DECLARE:
varying vec2 v_char_offset_X;
// REPLACE-END

vec2 get_uv_coords(in vec2 position, in vec2 offset, float index) {
  float x = 
    (position.x * char_max 
    + offset.x 
    - index) * char_size.x;
  float y = 1.0 - (
    position.y 
    + offset.y
    ) * char_size.y;
  return vec2(x, y);
}

vec4 get_texel(in vec2 position, in vec2 offset, float index) {
#ifdef MULTIPLY
  float a = texture2D(atlas_texture, get_uv_coords(position, offset, index)).a;
  return vec4(mix(vec3(1.0), v_color, opacity * a), 1.0);
#else
  return vec4(v_color, opacity * texture2D(atlas_texture, get_uv_coords(position, offset, index)).a);
#endif
}

void main() {

  vec2 position = gl_PointCoord;

  position.x += -(char_max - v_char_count) / char_max / 2.0;

  position.y *= char_max * char_aspect;
  position.y += (1.0 - char_max * char_aspect) / 2.0;

  bool x_out = position.x < 0.0 || position.x > v_char_count / char_max;
  bool y_out = position.y < 0.0 || position.y > 1.0;

  if (x_out || y_out) {
    // gl_FragColor = vec4(1.0);
    // return;
    discard;
  }

  // REPLACE-COMPUTE:
  if (position.x < 1.0 / char_max) {
    gl_FragColor = get_texel(position, v_char_offset_X, 0.0);
  } else if (position.x < 2.0 / char_max) {
    gl_FragColor = get_texel(position, v_char_offset_X, 1.0);
  } else {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
  // REPLACE-END
}
`;const Wr=r=>{const e=new Array(r);for(let t=0;t<r;t++)e[t]=t;return e},Ai="  ",N0=r=>`
attribute vec2 char_offset_${r};
varying vec2 v_char_offset_${r};
`.slice(1),O0=r=>`
${Ai}v_char_offset_${r} = char_offset_${r};
`.slice(1),F0=r=>`
varying vec2 v_char_offset_${r};
`.slice(1),B0=r=>{const e=Wr(r).map(N0).join(""),t=Wr(r).map(O0).join(""),n=k0.replace(/ *\/\/ REPLACE-DECLARE[\s\S]*?REPLACE-END/,e).replace(/ *\/\/ REPLACE-COMPUTE[\s\S]*?REPLACE-END/,t),i=Wr(r).map(F0).join(""),s=new Array;for(let l=0;l<r;l++)s.push(l===0?Ai:`${Ai}} else `),s.push(l<r-1?`if (position.x < ${l+1}.0 / char_max) `:""),s.push(`{
`),s.push(`${Ai}${Ai}gl_FragColor = get_texel(position, v_char_offset_${l}, ${l}.0);
`);s.push(`${Ai}}
`);const o=s.join(""),a=D0.replace(/ *\/\/ REPLACE-DECLARE[\s\S]*?REPLACE-END/,i).replace(/ *\/\/ REPLACE-COMPUTE[\s\S]*?REPLACE-END/,o);return[n,a]},Xo=document.createElement("img");Xo.src=I0;const Uc=new nt(Xo);Xo.onload=()=>Uc.needsUpdate=!0;function U0(r,e,t){const[n,i]=B0(r),s={atlas_texture:{value:Uc},opacity:{value:1},z_offset:{value:t},char_max:{value:r},char_size:{value:new oe(zl/R0,Il/z0)},char_aspect:{value:zl/Il}},o={};e===ro&&(o.MULTIPLY=!0);const a=new jv({uniforms:s,defines:o,vertexShader:n,fragmentShader:i,blending:e,transparent:e===Zn,vertexColors:!0,depthWrite:!1});return Object.defineProperty(a,"opacity",{get:()=>a.uniforms.opacity.value,set:l=>a.uniforms.opacity.value=l}),a}const Zr=12,kl={position:{x:0,y:0,z:0},color:"white",size:1,text:"foo"};class Dl extends Do{constructor({charMax:e=4,blending:t=so,zOffset:n=-.01}={}){e>Zr&&(console.warn(`max chars is ${Zr}`),e=Zr);const i=new st;i.setAttribute("position",new Je(new Float32Array(0),3)),i.setAttribute("color",new Je(new Float32Array(0),3)),i.setAttribute("size",new Je(new Float32Array(0),1)),i.setAttribute("char_count",new Je(new Float32Array(0),1));for(let o=0;o<e;o++)i.setAttribute(`char_offset_${o}`,new Je(new Float32Array(0),2));const s=U0(e,t,n);super(i,s),this.charMax=e}push(e,t){const n=this.geometry,i=n.getAttribute(e),s=new Float32Array(i.array.length+t.length);s.set(i.array,0),s.set(t,i.array.length),n.setAttribute(e,new Je(s,i.itemSize))}pushFill(e,t,n){const i=this.geometry,s=i.getAttribute(e),o=new Float32Array(s.array.length+n);o.set(s.array,0),o.fill(t,s.array.length),i.setAttribute(e,new Je(o,s.itemSize))}display(e=kl){if(Array.isArray(e)){e.forEach(u=>this.display(u));return}e=Object.assign(Object.assign({},kl),e);const{x:t,y:n,z:i}=e.position;this.push("position",[t,n,i]);const{r:s,g:o,b:a}=new Ae(e.color);this.push("color",[s,o,a]),this.push("size",[e.size]);const{charMax:l}=this,{count:c,offsets:h}=Ll(e.text,l);this.push("char_count",[c]);for(let u=0;u<l;u++)this.push(`char_offset_${u}`,h[u])}displayVertices(e,t={}){var n;if(e instanceof st)return this.displayVertices(e.getAttribute("position").array,t);const{color:i="white",size:s=1,format:o=void 0}=t,a=e instanceof Float32Array,l=typeof i=="function"?v=>new Ae(i(v)):(()=>{const v=new Ae(i);return()=>v})(),c=typeof s=="function"?v=>s(v):()=>s,h=a?e.length/3:e.length,{charMax:u}=this,d=a?e:new Float32Array(h*3),f=new Float32Array(h*3),g=new Float32Array(h),m=new Float32Array(h),p=new Array(u);for(let v=0;v<u;v++)p[v]=new Float32Array(h*2);if(a===!1)for(let v=0;v<h;v++){const{x:S,y:A,z:x}=e[v];d[v*3+0]=S,d[v*3+1]=A,d[v*3+2]=x}for(let v=0;v<h;v++){const S=l(v);f[v*3+0]=S.r,f[v*3+1]=S.g,f[v*3+2]=S.b,g[v]=c(v);const A=(n=o==null?void 0:o(v))!==null&&n!==void 0?n:v.toString(10),{count:x,offsets:w}=Ll(A,u);m[v]=x;for(let E=0;E<u;E++){const[P,y]=w[E];p[E][v*2+0]=P,p[E][v*2+1]=y}}this.push("position",d),this.push("color",f),this.push("size",g),this.push("char_count",m);for(let v=0;v<u;v++)this.push(`char_offset_${v}`,p[v])}displayFaces(e,{color:t="white",size:n=1,format:i=void 0}={}){if(e.isBufferGeometry){e=e;const s=e.index.array,o=e.getAttribute("position").array,a=s.length/3,l=new Float32Array(a*3);for(let c=0;c<a;c++){const h=s[c*3+0],u=o[h*3+0],d=o[h*3+1],f=o[h*3+2],g=s[c*3+1],m=o[g*3+0],p=o[g*3+1],v=o[g*3+2],S=s[c*3+2],A=o[S*3+0],x=o[S*3+1],w=o[S*3+2];l[c*3+0]=(u+m+A)/3,l[c*3+1]=(d+p+x)/3,l[c*3+2]=(f+v+w)/3}this.displayVertices(l,{color:t,size:n,format:i})}}get zOffset(){return this.material.uniforms.z_offset.value}set zOffset(e){const t=this.material;t.uniforms.z_offset.value!==e&&(t.uniforms.z_offset.value=e,t.uniformsNeedUpdate=!0)}get z_offset(){return this.zOffset}set z_offset(e){this.zOffset=e}get opacity(){return this.material.opacity}set opacity(e){this.material.opacity=e}}class H0{constructor(e){this.state=Ge.getInstance(),this.view=_t.getInstance(),this.scene=this.view.scene,this.chunkState=e,this.areaVisible=!0,this.idVisible=!0,this.neighboursIdVisible=!0}setGroup(){this.group=new Qt,this.group.position.x=this.chunkState.x,this.group.position.z=this.chunkState.z,this.scene.add(this.group)}destroyGroup(){this.group&&this.scene.remove(this.group)}setArea(){this.destroyArea(),this.areaVisible&&(this.area=new We(new zn(this.chunkState.size,this.chunkState.size),new Xt({wireframe:!0})),this.area.geometry.rotateX(Math.PI*.5),this.area.material.color.multiplyScalar((this.chunkState.depth+1)/this.state.chunks.maxDepth),this.group.add(this.area))}destroyArea(){this.area&&(this.area.geometry.dispose(),this.area.material.dispose(),this.group.remove())}setId(){this.destroyId(),this.idVisible&&(this.id=new Dl({charMax:4}),this.id.material.depthTest=!1,this.id.material.onBeforeRender=()=>{},this.id.material.onBuild=()=>{},this.id.display({text:this.chunkState.id,color:"#ffc800",size:(this.state.chunks.maxDepth-this.chunkState.depth+1)*6,position:new C(0,(this.state.chunks.maxDepth-this.chunkState.depth)*10,0)}),this.group.add(this.id))}destroyId(){this.id&&(this.id.geometry.dispose(),this.id.material.dispose(),this.group.remove(this.id))}setNeighboursIds(){if(this.destroyNeighboursIds(),!this.neighboursIdVisible||this.chunkState.neighbours.size===0)return;this.neighboursIds=new Dl({charMax:4}),this.neighboursIds.material.depthTest=!1,this.neighboursIds.material.onBeforeRender=()=>{},this.neighboursIds.material.onBuild=()=>{},this.group.add(this.neighboursIds);const e=this.chunkState.neighbours.get("n"),t=this.chunkState.neighbours.get("e"),n=this.chunkState.neighbours.get("s"),i=this.chunkState.neighbours.get("w"),s=(this.state.chunks.maxDepth-this.chunkState.depth+1)*6,o=(this.state.chunks.maxDepth-this.chunkState.depth)*10,a=e?e.id:"";this.neighboursIds.display({text:a,color:"#00bfff",size:s,position:new C(0,o,-this.chunkState.quarterSize)});const l=t?t.id:"";this.neighboursIds.display({text:l,color:"#00bfff",size:s,position:new C(this.chunkState.quarterSize,o,0)});const c=n?n.id:"";this.neighboursIds.display({text:c,color:"#00bfff",size:s,position:new C(0,o,this.chunkState.quarterSize)});const h=i?i.id:"";this.neighboursIds.display({text:h,color:"#00bfff",size:s,position:new C(-this.chunkState.quarterSize,o,0)})}destroyNeighboursIds(){this.neighboursIds&&(this.neighboursIds.geometry.dispose(),this.neighboursIds.material.dispose(),this.group.remove(this.neighboursIds))}destroy(){this.destroyGroup(),this.destroyArea(),this.destroyId(),this.destroyNeighboursIds()}}class V0{constructor(e){this.game=it.getInstance(),this.state=Ge.getInstance(),this.scene=this.game.scene,this.chunkState=e,this.helper=new H0(this.chunkState)}update(){}destroy(){}}class G0{constructor(){this.state=Ge.getInstance(),this.state.chunks.events.on("create",e=>{const t=new V0(e);e.events.on("destroy",()=>{t.destroy()})})}update(){}}var J0=`#define M_PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uGrassDistance;
uniform vec3 uPlayerPosition;
uniform float uTerrainSize;
uniform float uTerrainTextureSize;
uniform sampler2D uTerrainATexture;
uniform vec2 uTerrainAOffset;
uniform sampler2D uTerrainBTexture;
uniform vec2 uTerrainBOffset;
uniform sampler2D uTerrainCTexture;
uniform vec2 uTerrainCOffset;
uniform sampler2D uTerrainDTexture;
uniform vec2 uTerrainDOffset;
uniform sampler2D uNoiseTexture;
uniform float uFresnelOffset;
uniform float uFresnelScale;
uniform float uFresnelPower;
uniform vec3 uSunPosition;

attribute vec2 center;

varying vec3 vColor;

float inverseLerp(float v, float minValue, float maxValue)
{
    return (v - minValue) / (maxValue - minValue);
}
float remap(float v, float inMin, float inMax, float outMin, float outMax)
{
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}
float getSunShade(vec3 normal)
{
    float sunShade = dot(normal, - uSunPosition);
    sunShade = sunShade * 0.5 + 0.5;

    return sunShade;
}
vec3 getSunShadeColor(vec3 baseColor, float sunShade)
{
    vec3 shadeColor = baseColor * vec3(0.0, 0.5, 0.7);
    return mix(baseColor, shadeColor, sunShade);
}
float getSunReflection(vec3 viewDirection, vec3 worldNormal, vec3 viewNormal)
{
    vec3 sunViewReflection = reflect(uSunPosition, viewNormal);
    float sunViewStrength = max(0.2, dot(sunViewReflection, viewDirection));

    float fresnel = uFresnelOffset + uFresnelScale * (1.0 + dot(viewDirection, worldNormal));
    float sunReflection = fresnel * sunViewStrength;
    sunReflection = pow(sunReflection, uFresnelPower);

    return sunReflection;
}
vec3 getSunReflectionColor(vec3 baseColor, float sunReflection)
{
    return mix(baseColor, vec3(1.0, 1.0, 1.0), clamp(sunReflection, 0.0, 1.0));
}
float getGrassAttenuation(vec2 position)
{
    float distanceAttenuation = distance(uPlayerPosition.xz, position) / uGrassDistance * 2.0;
    return 1.0 - clamp(0.0, 1.0, smoothstep(0.3, 1.0, distanceAttenuation));
}
vec2 getRotatePivot2d(vec2 uv, float rotation, vec2 pivot)
{
    return vec2(
        cos(rotation) * (uv.x - pivot.x) + sin(rotation) * (uv.y - pivot.y) + pivot.x,
        cos(rotation) * (uv.y - pivot.y) - sin(rotation) * (uv.x - pivot.x) + pivot.y
    );
}

void main()
{
    
    vec2 newCenter = center;
    newCenter -= uPlayerPosition.xz;
    float halfSize = uGrassDistance * 0.5;
    newCenter.x = mod(newCenter.x + halfSize, uGrassDistance) - halfSize;
    newCenter.y = mod(newCenter.y + halfSize, uGrassDistance) - halfSize; 
    vec4 modelCenter = modelMatrix * vec4(newCenter.x, 0.0, newCenter.y, 1.0);

    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.xz += newCenter; 

    
    float angleToCamera = atan(modelCenter.x - cameraPosition.x, modelCenter.z - cameraPosition.z);
    modelPosition.xz = getRotatePivot2d(modelPosition.xz, angleToCamera, modelCenter.xz);

    
    vec2 terrainAUv = (modelPosition.xz - uTerrainAOffset.xy) / uTerrainSize;
    vec2 terrainBUv = (modelPosition.xz - uTerrainBOffset.xy) / uTerrainSize;
    vec2 terrainCUv = (modelPosition.xz - uTerrainCOffset.xy) / uTerrainSize;
    vec2 terrainDUv = (modelPosition.xz - uTerrainDOffset.xy) / uTerrainSize;

    float fragmentSize = 1.0 / uTerrainTextureSize;
    vec4 terrainAColor = texture2D(uTerrainATexture, terrainAUv * (1.0 - fragmentSize) + fragmentSize * 0.5);
    vec4 terrainBColor = texture2D(uTerrainBTexture, terrainBUv * (1.0 - fragmentSize) + fragmentSize * 0.5);
    vec4 terrainCColor = texture2D(uTerrainCTexture, terrainCUv * (1.0 - fragmentSize) + fragmentSize * 0.5);
    vec4 terrainDColor = texture2D(uTerrainDTexture, terrainDUv * (1.0 - fragmentSize) + fragmentSize * 0.5);

    vec4 terrainData = vec4(0);
    terrainData += step(0.0, terrainAUv.x) * step(terrainAUv.x, 1.0) * step(0.0, terrainAUv.y) * step(terrainAUv.y, 1.0) * terrainAColor;
    terrainData += step(0.0, terrainBUv.x) * step(terrainBUv.x, 1.0) * step(0.0, terrainBUv.y) * step(terrainBUv.y, 1.0) * terrainBColor;
    terrainData += step(0.0, terrainCUv.x) * step(terrainCUv.x, 1.0) * step(0.0, terrainCUv.y) * step(terrainCUv.y, 1.0) * terrainCColor;
    terrainData += step(0.0, terrainDUv.x) * step(terrainDUv.x, 1.0) * step(0.0, terrainDUv.y) * step(terrainDUv.y, 1.0) * terrainDColor;

    vec3 normal = terrainData.rgb;

    modelPosition.y += terrainData.a;
    modelCenter.y += terrainData.a;

    
    float slope = 1.0 - abs(dot(vec3(0.0, 1.0, 0.0), normal));

    
    float distanceScale = getGrassAttenuation(modelCenter.xz);
    float slopeScale = smoothstep(remap(slope, 0.4, 0.5, 1.0, 0.0), 0.0, 1.0);
    float scale = distanceScale * slopeScale;
    modelPosition.xyz = mix(modelCenter.xyz, modelPosition.xyz, scale);

    
    float tipness = step(2.0, mod(float(gl_VertexID) + 1.0, 3.0));

    
    vec2 noiseUv = modelPosition.xz * 0.02 + uTime * 0.05;
    vec4 noiseColor = texture2D(uNoiseTexture, noiseUv);
    modelPosition.x += (noiseColor.x - 0.5) * tipness * scale;
    modelPosition.z += (noiseColor.y - 0.5) * tipness * scale;

    
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    
    vec3 viewDirection = normalize(modelPosition.xyz - cameraPosition);
    
    vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);
    vec3 viewNormal = normalize(normalMatrix * normal);

    
    vec3 uGrassDefaultColor = vec3(0.52, 0.65, 0.26);
    vec3 uGrassShadedColor = vec3(0.52 / 1.3, 0.65 / 1.3, 0.26 / 1.3);
    vec3 lowColor = mix(uGrassShadedColor, uGrassDefaultColor, 1.0 - scale); 
    vec3 color = mix(lowColor, uGrassDefaultColor, tipness);

    
    float sunShade = getSunShade(normal);
    color = getSunShadeColor(color, sunShade);

    
    float sunReflection = getSunReflection(viewDirection, worldNormal, viewNormal);
    color = getSunReflectionColor(color, sunReflection);

    vColor = color;
    
}`,W0=`varying vec3 vColor;

void main()
{
    gl_FragColor = vec4(vColor, 1.0);
}`;function Z0(){return new Tt({uniforms:{uTime:{value:null},uGrassDistance:{value:null},uPlayerPosition:{value:null},uTerrainSize:{value:null},uTerrainTextureSize:{value:null},uTerrainATexture:{value:null},uTerrainAOffset:{value:null},uTerrainBTexture:{value:null},uTerrainBOffset:{value:null},uTerrainCTexture:{value:null},uTerrainCOffset:{value:null},uTerrainDTexture:{value:null},uTerrainDOffset:{value:null},uNoiseTexture:{value:null},uFresnelOffset:{value:null},uFresnelScale:{value:null},uFresnelPower:{value:null},uSunPosition:{value:null}},vertexShader:J0,fragmentShader:W0})}class X0{constructor(){this.game=it.getInstance(),this.view=_t.getInstance(),this.state=Ge.getInstance(),this.time=this.state.time,this.scene=this.view.scene,this.noises=this.view.noises,this.details=200,this.size=this.state.chunks.minSize,this.count=this.details*this.details,this.fragmentSize=this.size/this.details,this.bladeWidthRatio=1.5,this.bladeHeightRatio=4,this.bladeHeightRandomness=.5,this.positionRandomness=.5,this.noiseTexture=this.noises.create(128,128),this.setGeometry(),this.setMaterial(),this.setMesh()}setGeometry(){const e=new Float32Array(this.count*3*2),t=new Float32Array(this.count*3*3);for(let n=0;n<this.details;n++){const i=(n/this.details-.5)*this.size+this.fragmentSize*.5;for(let s=0;s<this.details;s++){const o=(s/this.details-.5)*this.size+this.fragmentSize*.5,a=(n*this.details+s)*9,l=(n*this.details+s)*6,c=i+(Math.random()-.5)*this.fragmentSize*this.positionRandomness,h=o+(Math.random()-.5)*this.fragmentSize*this.positionRandomness;e[l]=c,e[l+1]=h,e[l+2]=c,e[l+3]=h,e[l+4]=c,e[l+5]=h;const d=this.fragmentSize*this.bladeWidthRatio*.5,f=this.fragmentSize*this.bladeHeightRatio*(1-this.bladeHeightRandomness+Math.random()*this.bladeHeightRandomness);t[a]=-d,t[a+1]=0,t[a+2]=0,t[a+3]=0,t[a+4]=f,t[a+5]=0,t[a+6]=d,t[a+7]=0,t[a+8]=0}}this.geometry=new st,this.geometry.setAttribute("center",new Ze(e,2)),this.geometry.setAttribute("position",new Ze(t,3))}setMaterial(){const e=this.state.chunks,t=this.state.terrains;this.material=new Z0,this.material.uniforms.uTime.value=0,this.material.uniforms.uGrassDistance.value=this.size,this.material.uniforms.uPlayerPosition.value=new C,this.material.uniforms.uTerrainSize.value=e.minSize,this.material.uniforms.uTerrainTextureSize.value=t.segments,this.material.uniforms.uTerrainATexture.value=null,this.material.uniforms.uTerrainAOffset.value=new oe,this.material.uniforms.uTerrainBTexture.value=null,this.material.uniforms.uTerrainBOffset.value=new oe,this.material.uniforms.uTerrainCTexture.value=null,this.material.uniforms.uTerrainCOffset.value=new oe,this.material.uniforms.uTerrainDTexture.value=null,this.material.uniforms.uTerrainDOffset.value=new oe,this.material.uniforms.uNoiseTexture.value=this.noiseTexture,this.material.uniforms.uFresnelOffset.value=0,this.material.uniforms.uFresnelScale.value=.5,this.material.uniforms.uFresnelPower.value=2,this.material.uniforms.uSunPosition.value=new C(-.5,-.5,-.5)}setMesh(){this.mesh=new We(this.geometry,this.material),this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}update(){const t=this.state.player.position.current,n=this.state.chunks,i=this.state.sun;this.material.uniforms.uTime.value=this.time.elapsed,this.material.uniforms.uSunPosition.value.set(i.position.x,i.position.y,i.position.z),this.mesh.position.set(t[0],0,t[2]),this.material.uniforms.uPlayerPosition.value.set(t[0],t[1],t[2]);const s=n.getDeepestChunkForPosition(t[0],t[2]);if(s&&s.terrain&&s.terrain.renderInstance.texture){this.material.uniforms.uTerrainATexture.value=s.terrain.renderInstance.texture,this.material.uniforms.uTerrainAOffset.value.set(s.x-s.size*.5,s.z-s.size*.5);const o=(t[0]-s.x+s.size*.5)/s.size,a=(t[2]-s.z+s.size*.5)/s.size,l=s.neighbours.get(o<.5?"w":"e");l&&l.terrain&&l.terrain.renderInstance.texture&&(this.material.uniforms.uTerrainBTexture.value=l.terrain.renderInstance.texture,this.material.uniforms.uTerrainBOffset.value.set(l.x-l.size*.5,l.z-l.size*.5));const c=s.neighbours.get(a<.5?"n":"s");c&&c.terrain&&c.terrain.renderInstance.texture&&(this.material.uniforms.uTerrainCTexture.value=c.terrain.renderInstance.texture,this.material.uniforms.uTerrainCOffset.value.set(c.x-c.size*.5,c.z-c.size*.5));const h=l.neighbours.get(a<.5?"n":"s");h&&h.terrain&&h.terrain.renderInstance.texture&&(this.material.uniforms.uTerrainDTexture.value=h.terrain.renderInstance.texture,this.material.uniforms.uTerrainDOffset.value.set(h.x-h.size*.5,h.z-h.size*.5))}}}var q0=`varying vec2 vUv;

void main()
{
    gl_Position = vec4(position, 1.0);

    vUv = uv;
}`,j0=`varying vec2 vUv;

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float perlin3dPeriodic(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); 
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); 
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); 
  vec3 Pf1 = Pf0 - vec3(1.0); 
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

void main()
{
    float uFrequency = 8.0;

    float noiseR = perlin3dPeriodic(vec3(vUv * uFrequency, 123.456), vec3(uFrequency)) * 0.5 + 0.5;
    float noiseG = perlin3dPeriodic(vec3(vUv * uFrequency, 456.789), vec3(uFrequency)) * 0.5 + 0.5;
    float noiseB = perlin3dPeriodic(vec3(vUv * uFrequency, 789.123), vec3(uFrequency)) * 0.5 + 0.5;

    gl_FragColor = vec4(noiseR, noiseG, noiseB, 1.0);
}`;function Y0(){return new Tt({uniforms:{},vertexShader:q0,fragmentShader:j0})}class K0{constructor(){this.view=_t.getInstance(),this.renderer=this.view.renderer,this.scene=this.view.scene,this.setCustomRender(),this.setMaterial(),this.setPlane()}setCustomRender(){this.customRender={},this.customRender.scene=new Ro,this.customRender.camera=new $s(-1,1,1,-1,.1,10)}setMaterial(){this.material=new Y0}setPlane(){this.plane=new We(new zn(2,2),this.material),this.plane.frustumCulled=!1,this.customRender.scene.add(this.plane)}setHelper(){this.helper={},this.helper.geometry=new zn(1,1),this.helper.material=new Xt;const e=new We(this.helper.geometry,this.helper.material);e.position.y=5+1,e.position.x=-1,e.scale.set(2,2,2);const t=new We(this.helper.geometry,this.helper.material);t.position.y=5+1,t.position.x=1,t.scale.set(2,2,2);const n=new We(this.helper.geometry,this.helper.material);n.position.y=5-1,n.position.x=-1,n.scale.set(2,2,2);const i=new We(this.helper.geometry,this.helper.material);i.position.y=5-1,i.position.x=1,i.scale.set(2,2,2),window.requestAnimationFrame(()=>{this.scene.add(e)})}create(e,t){const n=new yn(e,t,{generateMipmaps:!1,wrapS:Rn,wrapT:Rn});this.renderer.instance.setRenderTarget(n),this.renderer.instance.render(this.customRender.scene,this.customRender.camera),this.renderer.instance.setRenderTarget(null);const i=n.texture;return this.helper&&(this.helper.material.map=i),i}}function Nl(r,e){if(e===ad)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ho||e===lc){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===ho)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Q0 extends ms{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new iA(t)}),this.register(function(t){return new hA(t)}),this.register(function(t){return new uA(t)}),this.register(function(t){return new rA(t)}),this.register(function(t){return new oA(t)}),this.register(function(t){return new aA(t)}),this.register(function(t){return new lA(t)}),this.register(function(t){return new nA(t)}),this.register(function(t){return new cA(t)}),this.register(function(t){return new sA(t)}),this.register(function(t){return new eA(t)}),this.register(function(t){return new dA(t)}),this.register(function(t){return new fA(t)})}load(e,t,n,i){const s=this;let o;this.resourcePath!==""?o=this.resourcePath:this.path!==""?o=this.path:o=xo.extractUrlBase(e),this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Bc(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Hc){try{o[ze.KHR_BINARY_GLTF]=new pA(e)}catch(u){i&&i(u);return}s=JSON.parse(o[ze.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new EA(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case ze.KHR_MATERIALS_UNLIT:o[u]=new tA;break;case ze.KHR_DRACO_MESH_COMPRESSION:o[u]=new mA(s,this.dracoLoader);break;case ze.KHR_TEXTURE_TRANSFORM:o[u]=new gA;break;case ze.KHR_MESH_QUANTIZATION:o[u]=new vA;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function $0(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const ze={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class eA{constructor(e){this.parser=e,this.name=ze.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ae(16777215);l.color!==void 0&&h.fromArray(l.color);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ao(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new h0(h),c.distance=u;break;case"spot":c=new l0(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Cn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class tA{constructor(){this.name=ze.KHR_MATERIALS_UNLIT}getMaterialType(){return Xt}extendParams(e,t,n){const i=[];e.color=new Ae(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.fromArray(o),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Ne))}return Promise.all(i)}}class nA{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class iA{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new oe(a,a)}return Promise.all(s)}}class sA{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class rA{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ae(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];return o.sheenColorFactor!==void 0&&t.sheenColor.fromArray(o.sheenColorFactor),o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ne)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class oA{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class aA{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ae(a[0],a[1],a[2]),Promise.all(s)}}class lA{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ti}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class cA{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ae(a[0],a[1],a[2]),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ne)),Promise.all(s)}}class hA{constructor(e){this.parser=e,this.name=ze.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class uA{constructor(e){this.parser=e,this.name=ze.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class dA{constructor(e){this.name=ze.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class fA{constructor(e){this.name=ze.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Bt.TRIANGLES&&c.mode!==Bt.TRIANGLE_STRIP&&c.mode!==Bt.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const m=new Ee,p=new C,v=new jt,S=new C(1,1,1),A=new Rv(g.geometry,g.material,d);for(let x=0;x<d;x++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&v.fromBufferAttribute(l.ROTATION,x),l.SCALE&&S.fromBufferAttribute(l.SCALE,x),A.setMatrixAt(x,m.compose(p,v,S));for(const x in l)x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);je.prototype.copy.call(A,g),A.frustumCulled=!1,this.parser.assignFinalMaterial(A),f.push(A)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Hc="glTF",Yi=12,Ol={JSON:1313821514,BIN:5130562};class pA{constructor(e){this.name=ze.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Yi),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Hc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Yi,s=new DataView(e,Yi);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Ol.JSON){const c=new Uint8Array(e,Yi+o,a);this.content=n.decode(c)}else if(l===Ol.BIN){const c=Yi+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class mA{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ze.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=yo[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=yo[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ci[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u){i.decodeDracoFile(h,function(d){for(const f in d.attributes){const g=d.attributes[f],m=l[f];m!==void 0&&(g.normalized=m)}u(d)},a,c)})})}}class gA{constructor(){this.name=ze.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class vA{constructor(){this.name=ze.KHR_MESH_QUANTIZATION}}class Vc extends ps{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,m=g-c,p=-2*f+3*d,v=f-d,S=1-p,A=v-d+u;for(let x=0;x!==a;x++){const w=o[m+x+a],E=o[m+x+l]*h,P=o[g+x+a],y=o[g+x]*h;s[x]=S*w+A*E+p*P+v*y}return s}}const AA=new jt;class xA extends Vc{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return AA.fromArray(s).normalize().toArray(s),s}}const Bt={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ci={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Fl={9728:ut,9729:vt,9984:co,9985:oc,9986:Vs,9987:jn},Bl={33071:Et,33648:Xs,10497:Rn},Xr={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},yo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Tn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},yA={CUBICSPLINE:void 0,LINEAR:zi,STEP:as},qr={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function SA(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Go({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:xn})),r.DefaultMaterial}function Ki(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Cn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function MA(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function bA(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function wA(r){const e=r.extensions&&r.extensions[ze.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+Ul(e.attributes):t=r.indices+":"+Ul(r.attributes)+":"+r.mode,t}function Ul(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function So(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function _A(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const TA=new Ee;class EA{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new $0,this.associations=new Map,this.primitiveCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new o0(this.options.manager):this.textureLoader=new f0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Bc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};Ki(s,a,i),Cn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ze.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(xo.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Xr[i.type],a=Ci[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Je(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Xr[i.type],c=Ci[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let m,p;if(f&&f!==u){const v=Math.floor(d/f),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+v+":"+i.count;let A=t.cache.get(S);A||(m=new c(a,v*f,i.count*f/h),A=new Tv(m,f/h),t.cache.add(S,A)),p=new zo(A,l,d%f/h,g)}else a===null?m=new c(i.count*l):m=new c(a,d,i.count*l),p=new Je(m,l,g);if(i.sparse!==void 0){const v=Xr.SCALAR,S=Ci[i.sparse.indices.componentType],A=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,w=new S(o[1],A,i.sparse.count*v),E=new c(o[2],x,i.sparse.count*l);a!==null&&(p=new Je(p.array.slice(),p.itemSize,p.normalized));for(let P=0,y=w.length;P<y;P++){const T=w[P];if(p.setX(T,E[P*l]),l>=2&&p.setY(T,E[P*l+1]),l>=3&&p.setZ(T,E[P*l+2]),l>=4&&p.setW(T,E[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"";const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=Fl[d.magFilter]||vt,h.minFilter=Fl[d.minFilter]||jn,h.wrapS=Bl[d.wrapS]||Rn,h.wrapT=Bl[d.wrapT]||Rn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(m){const p=new nt(m);p.needsUpdate=!0,d(p)}),t.load(xo.resolveURL(u,s.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),u.userData.mimeType=o.mimeType||_A(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord!=0&&!(t==="aoMap"&&n.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),s.extensions[ze.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[ze.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[ze.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.encoding=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Rc,en.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Lc,en.prototype.copy.call(l,n),l.color.copy(n.color),this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}n.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=n}getMaterialType(){return Go}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[ze.KHR_MATERIALS_UNLIT]){const u=i[ze.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new Ae(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.fromArray(d),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Ne)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=pn);const h=s.alphaMode||qr.OPAQUE;if(h===qr.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===qr.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Xt&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new oe(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}return s.occlusionTexture!==void 0&&o!==Xt&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Xt&&(a.emissive=new Ae().fromArray(s.emissiveFactor)),s.emissiveTexture!==void 0&&o!==Xt&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Ne)),Promise.all(c).then(function(){const u=new o(a);return s.name&&(u.name=s.name),Cn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Ki(i,u,s),u})}createUniqueName(e){const t=Oe.sanitizeNodeName(e||"");let n=t;for(let i=1;this.nodeNamesUsed[n];++i)n=t+"_"+i;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Hl(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=wA(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[ze.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Hl(new st,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?SA(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const m=h[f],p=o[f];let v;const S=c[f];if(p.mode===Bt.TRIANGLES||p.mode===Bt.TRIANGLE_STRIP||p.mode===Bt.TRIANGLE_FAN||p.mode===void 0)v=s.isSkinnedMesh===!0?new Cv(m,S):new We(m,S),v.isSkinnedMesh===!0&&!v.geometry.attributes.skinWeight.normalized&&v.normalizeSkinWeights(),p.mode===Bt.TRIANGLE_STRIP?v.geometry=Nl(v.geometry,lc):p.mode===Bt.TRIANGLE_FAN&&(v.geometry=Nl(v.geometry,ho));else if(p.mode===Bt.LINES)v=new zv(m,S);else if(p.mode===Bt.LINE_STRIP)v=new ko(m,S);else if(p.mode===Bt.LINE_LOOP)v=new Iv(m,S);else if(p.mode===Bt.POINTS)v=new Do(m,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(v.geometry.morphAttributes).length>0&&bA(v,s),v.name=t.createUniqueName(s.name||"mesh_"+e),Cn(v,s),p.extensions&&Ki(i,v,p),t.assignFinalMaterial(v),u.push(v)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return u[0];const d=new Qt;t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new wt(_d.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new $s(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Cn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this.getDependency("node",t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Ee;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Io(a,l)})}loadAnimation(e){const n=this.json.animations[e],i=[],s=[],o=[],a=[],l=[];for(let c=0,h=n.channels.length;c<h;c++){const u=n.channels[c],d=n.samplers[u.sampler],f=u.target,g=f.node,m=n.parameters!==void 0?n.parameters[d.input]:d.input,p=n.parameters!==void 0?n.parameters[d.output]:d.output;i.push(this.getDependency("node",g)),s.push(this.getDependency("accessor",m)),o.push(this.getDependency("accessor",p)),a.push(d),l.push(f)}return Promise.all([Promise.all(i),Promise.all(s),Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2],f=c[3],g=c[4],m=[];for(let v=0,S=h.length;v<S;v++){const A=h[v],x=u[v],w=d[v],E=f[v],P=g[v];if(A===void 0)continue;A.updateMatrix();let y;switch(Tn[P.path]){case Tn.weights:y=us;break;case Tn.rotation:y=Qn;break;case Tn.position:case Tn.scale:default:y=ds;break}const T=A.name?A.name:A.uuid,z=E.interpolation!==void 0?yA[E.interpolation]:zi,G=[];Tn[P.path]===Tn.weights?A.traverse(function(k){k.morphTargetInfluences&&G.push(k.name?k.name:k.uuid)}):G.push(T);let J=w.array;if(w.normalized){const k=So(J.constructor),R=new Float32Array(J.length);for(let F=0,X=J.length;F<X;F++)R[F]=J[F]*k;J=R}for(let k=0,R=G.length;k<R;k++){const F=new y(G[k]+"."+Tn[P.path],x.array,J,z);E.interpolation==="CUBICSPLINE"&&(F.createInterpolant=function(Q){const W=this instanceof Qn?xA:Vc;return new W(this.times,this.values,this.getValueSize()/3,Q)},F.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),m.push(F)}}const p=n.name?n.name:"animation_"+e;return new vo(p,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this.extensions,i=this,s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"";return function(){const a=[],l=i._invokeOne(function(d){return d.createNodeMesh&&d.createNodeMesh(e)});l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(d){return i._getNodeRef(i.cameraCache,s.camera,d)})),i._invokeAll(function(d){return d.createNodeAttachment&&d.createNodeAttachment(e)}).forEach(function(d){a.push(d)});const c=[],h=s.children||[];for(let d=0,f=h.length;d<f;d++)c.push(i.getDependency("node",h[d]));const u=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([Promise.all(a),Promise.all(c),u])}().then(function(a){const l=a[0],c=a[1],h=a[2];let u;if(s.isBone===!0?u=new Cc:l.length>1?u=new Qt:l.length===1?u=l[0]:u=new je,u!==l[0])for(let d=0,f=l.length;d<f;d++)u.add(l[d]);if(s.name&&(u.userData.name=s.name,u.name=o),Cn(u,s),s.extensions&&Ki(n,u,s),s.matrix!==void 0){const d=new Ee;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,TA)});for(let d=0,f=c.length;d<f;d++)u.add(c[d]);return u})}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Qt;n.name&&(s.name=i.createUniqueName(n.name)),Cn(s,n),n.extensions&&Ki(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof en||d instanceof nt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}}function CA(r,e,t){const n=e.attributes,i=new Di;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),a.normalized){const h=So(Ci[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new C,l=new C;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const m=So(Ci[d.componentType]);l.multiplyScalar(m)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Ni;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Hl(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=yo[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Cn(r,e),CA(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?MA(r,e.targets,t):r})}var PA=`varying vec3 vGameNormal;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);

    
    vGameNormal = worldNormal;
}`,LA=`uniform vec3 uSunPosition;
uniform vec3 uColor;

varying vec3 vGameNormal;

float getSunShade(vec3 normal)
{
    float sunShade = dot(normal, - uSunPosition);
    sunShade = sunShade * 0.5 + 0.5;

    return sunShade;
}
vec3 getSunShadeColor(vec3 baseColor, float sunShade)
{
    vec3 shadeColor = baseColor * vec3(0.0, 0.5, 0.7);
    return mix(baseColor, shadeColor, sunShade);
}

void main()
{
    vec3 color = uColor;

    float sunShade = getSunShade(vGameNormal);
    color = getSunShadeColor(color, sunShade);
    
    gl_FragColor = vec4(color, 1.0);
    
}`;function RA(){return new Tt({uniforms:{uColor:{value:null},uLightnessSmoothness:{value:null},uSunPosition:{value:null}},vertexShader:PA,fragmentShader:LA})}class zA{constructor(){this.game=it.getInstance(),this.state=Ge.getInstance(),this.view=_t.getInstance(),this.debug=vn.getInstance(),this.scene=this.view.scene,this.setGroup(),this.setLights(),this.setHelper(),this.setModel(),this.setDebug()}setGroup(){this.group=new Qt,this.scene.add(this.group)}setLights(){this.ambientLight=new d0(16777215,1.4),this.scene.add(this.ambientLight),this.charKeyLight=new Ao(16777215,1.8),this.charKeyLight.position.set(2,4,-3),this.group.add(this.charKeyLight),this.charFillLight=new Ao(12312831,.9),this.charFillLight.position.set(-2,3,3),this.group.add(this.charFillLight)}setHelper(){this.helper=new We,this.helper.material=new RA,this.helper.material.uniforms.uColor.value=new Ae("#fff8d6"),this.helper.material.uniforms.uSunPosition.value=new C(-.5,-.5,-.5),this.helper.geometry=new Uo(.5,.8,3,16),this.helper.geometry.translate(0,.9,0),this.helper.visible=!0,this.group.add(this.helper)}setModel(){this.loader=new Q0,this.actions={},this.currentAction=null;const e=["./models/player.glb","models/player.glb","/world/models/player.glb","/models/player.glb"],t=n=>{if(n.length===0){console.error("All player model candidate URLs failed. Keeping helper active.");return}const i=n.shift();this.loader.load(i,s=>{console.log("Player model successfully loaded from:",i),this.setupModel(s)},void 0,s=>{console.warn(`Failed loading model from "${i}", trying next candidate...`),t(n)})};t(e)}setupModel(e){if(this.model=e.scene,this.model.position.set(0,.95,0),this.model.traverse(t=>{t.isMesh&&(t.frustumCulled=!1,t.castShadow=!0,t.receiveShadow=!0,t.material&&(t.material.vertexColors=!0,t.material.roughness=.5,t.material.metalness=0,t.material.needsUpdate=!0))}),this.group.add(this.model),this.helper&&(this.helper.visible=!1),e.animations&&e.animations.length>0){this.mixer=new T0(this.model);for(const t of e.animations){const n=this.mixer.clipAction(t);this.actions[t.name]=n}this.actions.Idle?(this.actions.Idle.play(),this.currentAction=this.actions.Idle):this.actions.Run&&(this.actions.Run.play(),this.currentAction=this.actions.Run)}}setDebug(){if(!this.debug.active)return;this.debug.ui.getFolder("view/player").addColor(this.helper.material.uniforms.uColor,"value")}update(){const e=this.state.player,t=this.state.sun,n=this.state.time.delta;if(this.group.position.set(e.position.current[0],e.position.current[1],e.position.current[2]),this.helper.rotation.y=e.rotation,this.helper.material.uniforms.uSunPosition.value.set(t.position.x,t.position.y,t.position.z),this.sunLight&&t&&(this.sunLight.position.set(t.position.x*50+e.position.current[0],Math.max(20,t.position.y*50),t.position.z*50+e.position.current[2]),this.sunLight.target=this.group),this.model&&(this.model.rotation.y=e.rotation+Math.PI),this.mixer){this.mixer.update(n);const i=e.speed>.005;if(i&&this.actions.Run){this.currentAction!==this.actions.Run&&(this.actions.Run.reset().fadeIn(.2).play(),this.currentAction&&this.currentAction.fadeOut(.2),this.currentAction=this.actions.Run);const s=Math.min(2.2,Math.max(.8,e.speed/Math.max(.001,n)/10));this.actions.Run.timeScale=s}else!i&&this.actions.Idle&&this.currentAction!==this.actions.Idle&&(this.actions.Idle.reset().fadeIn(.25).play(),this.currentAction&&this.currentAction.fadeOut(.25),this.currentAction=this.actions.Idle)}}}class IA{constructor(e={}){this.game=it.getInstance(),this.view=_t.getInstance(),this.state=Ge.getInstance(),this.debug=vn.getInstance(),this.scene=this.view.scene,this.domElement=this.game.domElement,this.viewport=this.state.viewport,this.time=this.state.time,this.camera=this.view.camera,this.setInstance()}setInstance(){this.clearColor="#222222",this.instance=new Ec({alpha:!1,antialias:!0}),this.instance.sortObjects=!1,this.instance.domElement.style.position="absolute",this.instance.domElement.style.top=0,this.instance.domElement.style.left=0,this.instance.domElement.style.width="100%",this.instance.domElement.style.height="100%",this.instance.setClearColor(this.clearColor,1),this.instance.setSize(this.viewport.width,this.viewport.height),this.instance.setPixelRatio(this.viewport.clampedPixelRatio),this.context=this.instance.getContext(),this.debug.stats&&this.debug.stats.setRenderPanel(this.context)}resize(){this.instance.setSize(this.viewport.width,this.viewport.height),this.instance.setPixelRatio(this.viewport.clampedPixelRatio)}update(){this.debug.stats&&this.debug.stats.beforeRender(),this.instance.render(this.scene,this.camera.instance),this.debug.stats&&this.debug.stats.afterRender()}destroy(){this.instance.renderLists.dispose(),this.instance.dispose(),this.renderTarget.dispose()}}var kA=`varying vec2 vUv;

void main()
{
    gl_Position = vec4(position, 1.0);

    vUv = uv;
}`,DA=`uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec3 color = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(color, 1.0);
}`;function NA(){return new Tt({uniforms:{uTexture:{value:null}},vertexShader:kA,fragmentShader:DA})}var OA=`#define M_PI 3.1415926535897932384626433832795

uniform vec3 uSunPosition;

uniform float uAtmosphereElevation;
uniform float uAtmospherePower;
uniform vec3 uColorDayCycleLow;
uniform vec3 uColorDayCycleHigh;
uniform vec3 uColorNightLow;
uniform vec3 uColorNightHigh;

uniform float uDawnAngleAmplitude;
uniform float uDawnElevationAmplitude;
uniform vec3 uColorDawn;

uniform float uSunAmplitude;
uniform float uSunMultiplier;
uniform vec3 uColorSun;

uniform float uDayCycleProgress;

varying vec3 vColor;

vec3 blendAdd(vec3 base, vec3 blend)
{
	return min(base + blend, vec3(1.0));
}

vec3 blendAdd(vec3 base, vec3 blend, float opacity)
{
	return (blendAdd(base, blend) * opacity + base * (1.0 - opacity));
}

void main()
{
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vec3 normalizedPosition = normalize(position);

    
    
    float horizonIntensity = (uv.y - 0.5) / uAtmosphereElevation;
    horizonIntensity = pow(1.0 - horizonIntensity, uAtmospherePower);

    
    vec3 colorDayCycle = mix(uColorDayCycleHigh, uColorDayCycleLow, horizonIntensity);
    
    
    vec3 colorNight = mix(uColorNightHigh, uColorNightLow, horizonIntensity);
    
    
    float dayIntensity = abs(uDayCycleProgress - 0.5) * 2.0;
    vec3 color = mix(colorNight, colorDayCycle, dayIntensity);

    /**
     * Sun glow
     */
    
    float distanceToSun = distance(normalizedPosition, uSunPosition);

    /**
     * Dawn
     */
    
    float dawnAngleIntensity = dot(normalize(uSunPosition.xz), normalize(normalizedPosition.xz));
    dawnAngleIntensity = smoothstep(0.0, 1.0, (dawnAngleIntensity - (1.0 - uDawnAngleAmplitude)) / uDawnAngleAmplitude);

    
    float dawnElevationIntensity = 1.0 - min(1.0, (uv.y - 0.5) / uDawnElevationAmplitude);

    
    float dawnDayCycleIntensity = cos(uDayCycleProgress * 4.0 * M_PI + M_PI) * 0.5 + 0.5;

    
    float dawnIntensity = clamp(dawnAngleIntensity * dawnElevationIntensity * dawnDayCycleIntensity, 0.0, 1.0);
    color = blendAdd(color, uColorDawn, dawnIntensity);

    /**
     * Sun glow
     */
    
    float sunIntensity = smoothstep(0.0, 1.0, clamp(1.0 - distanceToSun / uSunAmplitude, 0.0, 1.0)) * uSunMultiplier;
    color = blendAdd(color, uColorSun, sunIntensity);

    float sunGlowStrength = pow(max(0.0, 1.0 + 0.05 - distanceToSun * 2.5), 2.0);
    color = blendAdd(color, uColorSun, sunGlowStrength);

    vColor = vec3(color);
    
}`,FA=`varying vec3 vColor;

void main()
{
    gl_FragColor = vec4(vColor, 1.0);
}`;function BA(){return new Tt({uniforms:{uSunPosition:{value:new C},uAtmosphereElevation:{value:.5},uAtmospherePower:{value:10},uColorDayCycleLow:{value:new Ae},uColorDayCycleHigh:{value:new Ae},uColorNightLow:{value:new Ae},uColorNightHigh:{value:new Ae},uDawnAngleAmplitude:{value:1},uDawnElevationAmplitude:{value:.2},uColorDawn:{value:new Ae},uSunAmplitude:{value:.75},uSunMultiplier:{value:1},uColorSun:{value:new Ae},uDayCycleProgress:{value:0}},vertexShader:OA,fragmentShader:FA})}var UA=`#define M_PI 3.1415926535897932384626433832795

uniform vec3 uSunPosition;
uniform float uSize;
uniform float uBrightness;
uniform float uHeightFragments;

attribute float aSize;
attribute vec3 aColor;

varying vec3 vColor;

void main()
{
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    
    vec3 normalizedPosition = normalize(modelPosition.xyz);
    float sunSizeMultiplier = 1.0 - (dot(normalize(uSunPosition), normalizedPosition) * 0.5 + 0.5);
    

    gl_PointSize = aSize * uSize * sunSizeMultiplier * uHeightFragments;

    
    if(gl_PointSize < 0.5)
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);

    vColor = mix(aColor, vec3(1.0), uBrightness);
}`,HA=`varying vec3 vColor;

void main()
{
    gl_FragColor = vec4(vColor, 1.0);
}`;function VA(){return new Tt({uniforms:{uSunPosition:{value:new C},uSize:{value:.01},uBrightness:{value:.5},uHeightFragments:{value:null}},vertexShader:UA,fragmentShader:HA})}class GA{constructor(){this.game=it.getInstance(),this.view=_t.getInstance(),this.state=Ge.getInstance(),this.debug=vn.getInstance(),this.viewport=this.state.viewport,this.renderer=this.view.renderer,this.scene=this.view.scene,this.outerDistance=1e3,this.group=new Qt,this.scene.add(this.group),this.setCustomRender(),this.setBackground(),this.setSphere(),this.setSun(),this.setStars(),this.setDebug()}setCustomRender(){this.customRender={},this.customRender.scene=new Ro,this.customRender.camera=this.view.camera.instance.clone(),this.customRender.resolutionRatio=.1,this.customRender.renderTarget=new yn(this.viewport.width*this.customRender.resolutionRatio,this.viewport.height*this.customRender.resolutionRatio,{generateMipmaps:!1}),this.customRender.texture=this.customRender.renderTarget.texture}setBackground(){this.background={},this.background.geometry=new zn(2,2),this.background.material=new NA,this.background.material.uniforms.uTexture.value=this.customRender.renderTarget.texture,this.background.material.depthTest=!1,this.background.material.depthWrite=!1,this.background.mesh=new We(this.background.geometry,this.background.material),this.background.mesh.frustumCulled=!1,this.group.add(this.background.mesh)}setSphere(){this.sphere={},this.sphere.widthSegments=128,this.sphere.heightSegments=64,this.sphere.update=()=>{const e=new Vo(10,this.sphere.widthSegments,this.sphere.heightSegments);this.sphere.geometry&&(this.sphere.geometry.dispose(),this.sphere.mesh.geometry=this.sphere.geometry),this.sphere.geometry=e},this.sphere.material=new BA,this.sphere.material.uniforms.uColorDayCycleLow.value.set("#f0fff9"),this.sphere.material.uniforms.uColorDayCycleHigh.value.set("#2e89ff"),this.sphere.material.uniforms.uColorNightLow.value.set("#004794"),this.sphere.material.uniforms.uColorNightHigh.value.set("#001624"),this.sphere.material.uniforms.uColorSun.value.set("#ff531a"),this.sphere.material.uniforms.uColorDawn.value.set("#ff1900"),this.sphere.material.uniforms.uDayCycleProgress.value=0,this.sphere.material.side=Ct,this.sphere.update(),this.sphere.mesh=new We(this.sphere.geometry,this.sphere.material),this.customRender.scene.add(this.sphere.mesh)}setSun(){this.sun={},this.sun.distance=this.outerDistance-50;const e=new Ho(.02*this.sun.distance,32),t=new Xt({color:16777215});this.sun.mesh=new We(e,t),this.group.add(this.sun.mesh)}setStars(){this.stars={},this.stars.count=1e3,this.stars.distance=this.outerDistance,this.stars.update=()=>{const e=new Float32Array(this.stars.count*3),t=new Float32Array(this.stars.count),n=new Float32Array(this.stars.count*3);for(let s=0;s<this.stars.count;s++){const o=s*3,a=new C;a.setFromSphericalCoords(this.stars.distance,Math.acos(Math.random()),2*Math.PI*Math.random()),e[o]=a.x,e[o+1]=a.y,e[o+2]=a.z,t[s]=Math.pow(Math.random()*.9,10)+.1;const l=new Ae;l.setHSL(Math.random(),1,.5+Math.random()*.5),n[o]=l.r,n[o+1]=l.g,n[o+2]=l.b}const i=new st;i.setAttribute("position",new Ze(e,3)),i.setAttribute("aSize",new Ze(t,1)),i.setAttribute("aColor",new Ze(n,3)),this.stars.geometry&&(this.stars.geometry.dispose(),this.stars.points.geometry=this.stars.geometry),this.stars.geometry=i},this.stars.update(),this.stars.material=new VA,this.stars.material.uniforms.uHeightFragments.value=this.viewport.height*this.viewport.clampedPixelRatio,this.stars.points=new Do(this.stars.geometry,this.stars.material),this.group.add(this.stars.points)}setDebug(){if(!this.debug.active)return;const e=this.debug.ui.getFolder("view/sky/sphere/geometry");e.add(this.sphere,"widthSegments").min(4).max(512).step(1).name("widthSegments").onChange(()=>{this.sphere.update()}),e.add(this.sphere,"heightSegments").min(4).max(512).step(1).name("heightSegments").onChange(()=>{this.sphere.update()});const t=this.debug.ui.getFolder("view/sky/sphere/material");t.add(this.sphere.material.uniforms.uAtmosphereElevation,"value").min(0).max(5).step(.01).name("uAtmosphereElevation"),t.add(this.sphere.material.uniforms.uAtmospherePower,"value").min(0).max(20).step(1).name("uAtmospherePower"),t.addColor(this.sphere.material.uniforms.uColorDayCycleLow,"value").name("uColorDayCycleLow"),t.addColor(this.sphere.material.uniforms.uColorDayCycleHigh,"value").name("uColorDayCycleHigh"),t.addColor(this.sphere.material.uniforms.uColorNightLow,"value").name("uColorNightLow"),t.addColor(this.sphere.material.uniforms.uColorNightHigh,"value").name("uColorNightHigh"),t.add(this.sphere.material.uniforms.uDawnAngleAmplitude,"value").min(0).max(1).step(.001).name("uDawnAngleAmplitude"),t.add(this.sphere.material.uniforms.uDawnElevationAmplitude,"value").min(0).max(1).step(.01).name("uDawnElevationAmplitude"),t.addColor(this.sphere.material.uniforms.uColorDawn,"value").name("uColorDawn"),t.add(this.sphere.material.uniforms.uSunAmplitude,"value").min(0).max(3).step(.01).name("uSunAmplitude"),t.add(this.sphere.material.uniforms.uSunMultiplier,"value").min(0).max(1).step(.01).name("uSunMultiplier"),t.addColor(this.sphere.material.uniforms.uColorSun,"value").name("uColorSun");const n=this.debug.ui.getFolder("view/sky/stars");n.add(this.stars,"count").min(100).max(5e4).step(100).name("count").onChange(()=>{this.stars.update()}),n.add(this.stars.material.uniforms.uSize,"value").min(0).max(1).step(1e-4).name("uSize"),n.add(this.stars.material.uniforms.uBrightness,"value").min(0).max(1).step(.001).name("uBrightness")}update(){const e=this.state.day,t=this.state.sun,n=this.state.player;this.group.position.set(n.position.current[0],n.position.current[1],n.position.current[2]),this.sphere.material.uniforms.uSunPosition.value.set(t.position.x,t.position.y,t.position.z),this.sphere.material.uniforms.uDayCycleProgress.value=e.progress,this.sun.mesh.position.set(t.position.x*this.sun.distance,t.position.y*this.sun.distance,t.position.z*this.sun.distance),this.sun.mesh.lookAt(n.position.current[0],n.position.current[1],n.position.current[2]),this.stars.material.uniforms.uSunPosition.value.set(t.position.x,t.position.y,t.position.z),this.stars.material.uniforms.uHeightFragments.value=this.viewport.height*this.viewport.clampedPixelRatio,this.customRender.camera.quaternion.copy(this.view.camera.instance.quaternion),this.renderer.instance.setRenderTarget(this.customRender.renderTarget),this.renderer.instance.render(this.customRender.scene,this.customRender.camera),this.renderer.instance.setRenderTarget(null)}resize(){this.customRender.renderTarget.width=this.viewport.width*this.customRender.resolutionRatio,this.customRender.renderTarget.height=this.viewport.height*this.customRender.resolutionRatio}}class JA{constructor(e,t){this.state=Ge.getInstance(),this.view=_t.getInstance(),this.scene=this.view.scene,this.terrains=e,this.terrainState=t,this.terrainState.renderInstance=this,this.created=!1,this.terrainState.events.on("ready",()=>{this.create()})}create(){const e=this.state.terrains;this.created?(this.geometry.dispose(),this.geometry=new st,this.geometry.setAttribute("position",new Je(this.terrainState.positions,3)),this.geometry.index=new Je(this.terrainState.indices,1,!1),this.mesh.geometry=this.geometry):(this.geometry=new st,this.geometry.setAttribute("position",new Ze(this.terrainState.positions,3)),this.geometry.setAttribute("uv",new Ze(this.terrainState.uv,2)),this.geometry.index=new Je(this.terrainState.indices,1,!1),this.texture=new Pc(this.terrainState.texture,e.segments,e.segments,It,mn,_o,Et,Et,vt,vt),this.texture.flipY=!1,this.texture.needsUpdate=!0,this.mesh=new We(this.geometry,this.terrains.material),this.mesh.userData.texture=this.texture,this.scene.add(this.mesh),this.created=!0)}update(){}destroy(){this.created&&(this.geometry.dispose(),this.scene.remove(this.mesh))}}class WA{constructor(){this.game=it.getInstance(),this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.texture=new nt(this.canvas),this.colors={aboveFar:"#ffffff",aboveClose:"#a6c33c",belowClose:"#2f3d36",belowFar:"#011018"},this.width=1,this.height=512,this.update(),this.setDebug()}update(){const e=this.context.createLinearGradient(0,0,0,this.height);e.addColorStop(0,this.colors.aboveFar),e.addColorStop(.49999,this.colors.aboveClose),e.addColorStop(.51111,this.colors.belowClose),e.addColorStop(1,this.colors.belowFar),this.context.fillStyle=e,this.context.fillRect(0,0,this.width,this.height),this.texture.needsUpdate=!0}setDebug(){const e=this.game.debug;if(!e.active)return;const t=e.ui.getFolder("view/terrains/gradient");for(const n in this.colors)t.addColor(this.colors,n).onChange(()=>this.update())}}var ZA=`uniform vec3 uPlayerPosition;
uniform float uLightnessSmoothness;
uniform float uFresnelOffset;
uniform float uFresnelScale;
uniform float uFresnelPower;
uniform vec3 uSunPosition;
uniform float uGrassDistance;
uniform sampler2D uTexture;
uniform sampler2D uFogTexture;

varying vec3 vColor;

float inverseLerp(float v, float minValue, float maxValue)
{
    return (v - minValue) / (maxValue - minValue);
}
float remap(float v, float inMin, float inMax, float outMin, float outMax)
{
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}
float getSunShade(vec3 normal)
{
    float sunShade = dot(normal, - uSunPosition);
    sunShade = sunShade * 0.5 + 0.5;

    return sunShade;
}
vec3 getSunShadeColor(vec3 baseColor, float sunShade)
{
    vec3 shadeColor = baseColor * vec3(0.0, 0.5, 0.7);
    return mix(baseColor, shadeColor, sunShade);
}
float getSunReflection(vec3 viewDirection, vec3 worldNormal, vec3 viewNormal)
{
    vec3 sunViewReflection = reflect(uSunPosition, viewNormal);
    float sunViewStrength = max(0.2, dot(sunViewReflection, viewDirection));

    float fresnel = uFresnelOffset + uFresnelScale * (1.0 + dot(viewDirection, worldNormal));
    float sunReflection = fresnel * sunViewStrength;
    sunReflection = pow(sunReflection, uFresnelPower);

    return sunReflection;
}
vec3 getSunReflectionColor(vec3 baseColor, float sunReflection)
{
    return mix(baseColor, vec3(1.0, 1.0, 1.0), clamp(sunReflection, 0.0, 1.0));
}
vec3 getFogColor(vec3 baseColor, float depth, vec2 screenUv)
{
    float uFogIntensity = 0.0025;
    vec3 fogColor = texture2D(uFogTexture, screenUv).rgb;
    
    float fogIntensity = 1.0 - exp(- uFogIntensity * uFogIntensity * depth * depth );
    return mix(baseColor, fogColor, fogIntensity);
}
float getGrassAttenuation(vec2 position)
{
    float distanceAttenuation = distance(uPlayerPosition.xz, position) / uGrassDistance * 2.0;
    return 1.0 - clamp(0.0, 1.0, smoothstep(0.3, 1.0, distanceAttenuation));
}

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    float depth = - viewPosition.z;
    gl_Position = projectionMatrix * viewPosition;

    
    vec4 terrainData = texture2D(uTexture, uv);
    vec3 normal = terrainData.rgb;

    
    float slope = 1.0 - abs(dot(vec3(0.0, 1.0, 0.0), normal));

    vec3 viewDirection = normalize(modelPosition.xyz - cameraPosition);
    vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);
    vec3 viewNormal = normalize(normalMatrix * normal);

    
    vec3 uGrassDefaultColor = vec3(0.52, 0.65, 0.26);
    vec3 uGrassShadedColor = vec3(0.52 / 1.3, 0.65 / 1.3, 0.26 / 1.3);
    
    
    
    float grassDistanceAttenuation = getGrassAttenuation(modelPosition.xz);
    float grassSlopeAttenuation = smoothstep(remap(slope, 0.4, 0.5, 1.0, 0.0), 0.0, 1.0);
    float grassAttenuation = grassDistanceAttenuation * grassSlopeAttenuation;
    vec3 grassColor = mix(uGrassShadedColor, uGrassDefaultColor, 1.0 - grassAttenuation);

    vec3 color = grassColor;

    
    float sunShade = getSunShade(normal);
    color = getSunShadeColor(color, sunShade);

    
    float sunReflection = getSunReflection(viewDirection, worldNormal, viewNormal);
    color = getSunReflectionColor(color, sunReflection);

    
    vec2 screenUv = (gl_Position.xy / gl_Position.w * 0.5) + 0.5;
    color = getFogColor(color, depth, screenUv);

    
    

    
    vColor = color;
}`,XA=`uniform sampler2D uGradientTexture;

varying vec3 vColor;

void main()
{
    vec3 color = vColor;
    
    gl_FragColor = vec4(color, 1.0);
    
}`;function qA(){return new Tt({uniforms:{uPlayerPosition:{value:null},uGradientTexture:{value:null},uLightnessSmoothness:{value:null},uFresnelOffset:{value:null},uFresnelScale:{value:null},uFresnelPower:{value:null},uSunPosition:{value:null},uFogTexture:{value:null},uGrassDistance:{value:null},uTexture:{value:null}},vertexShader:ZA,fragmentShader:XA})}class jA{constructor(){this.game=it.getInstance(),this.state=Ge.getInstance(),this.view=_t.getInstance(),this.debug=_t.getInstance(),this.viewport=this.state.viewport,this.sky=this.view.sky,this.setGradient(),this.setMaterial(),this.setDebug(),this.state.terrains.events.on("create",e=>{const t=new JA(this,e);e.events.on("destroy",()=>{t.destroy()})})}setGradient(){this.gradient=new WA}setMaterial(){this.material=new qA,this.material.uniforms.uPlayerPosition.value=new C,this.material.uniforms.uGradientTexture.value=this.gradient.texture,this.material.uniforms.uLightnessSmoothness.value=.25,this.material.uniforms.uFresnelOffset.value=0,this.material.uniforms.uFresnelScale.value=.5,this.material.uniforms.uFresnelPower.value=2,this.material.uniforms.uSunPosition.value=new C(-.5,-.5,-.5),this.material.uniforms.uFogTexture.value=this.sky.customRender.texture,this.material.uniforms.uGrassDistance.value=this.state.chunks.minSize,this.material.onBeforeRender=(e,t,n,i,s)=>{this.material.uniforms.uTexture.value=s.userData.texture,this.material.uniformsNeedUpdate=!0}}setDebug(){if(!this.debug.active)return;const e=debug.ui.getFolder("view/terrains");e.add(this.material,"wireframe"),e.add(this.material.uniforms.uLightnessSmoothness,"value").min(0).max(1).step(.001).name("uLightnessSmoothness"),e.add(this.material.uniforms.uFresnelOffset,"value").min(-1).max(1).step(.001).name("uFresnelOffset"),e.add(this.material.uniforms.uFresnelScale,"value").min(0).max(2).step(.001).name("uFresnelScale"),e.add(this.material.uniforms.uFresnelPower,"value").min(1).max(10).step(1).name("uFresnelPower")}update(){const t=this.state.player.position.current,n=this.state.sun;this.material.uniforms.uPlayerPosition.value.set(t[0],t[1],t[2]),this.material.uniforms.uSunPosition.value.set(n.position.x,n.position.y,n.position.z)}resize(){}}class YA{constructor(){this.view=_t.getInstance(),this.state=Ge.getInstance(),this.scene=this.view.scene,this.mesh=new We(new zn(1e3,1e3),new Xt({color:"#1d3456"})),this.mesh.geometry.rotateX(-Math.PI*.5)}update(){const e=this.state.player;this.mesh.position.set(e.position.current[0],0,e.position.current[2])}}const wi=class{static getInstance(){return wi.instance}constructor(){if(wi.instance)return wi.instance;wi.instance=this,this.scene=new Ro,this.camera=new E0,this.renderer=new IA,this.noises=new K0,this.sky=new GA,this.water=new YA,this.terrains=new jA,this.chunks=new G0,this.player=new zA,this.grass=new X0}resize(){this.camera.resize(),this.renderer.resize(),this.sky.resize(),this.terrains.resize()}update(){this.sky.update(),this.water.update(),this.terrains.update(),this.chunks.update(),this.player.update(),this.grass.update(),this.camera.update(),this.renderer.update()}destroy(){}};let _t=wi;Ht(_t,"instance");const _i=class{static getInstance(){return _i.instance}constructor(){if(_i.instance)return _i.instance;_i.instance=this,this.seed="p",this.debug=new vn,this.state=new Ge,this.view=new _t,window.addEventListener("resize",()=>{this.resize()}),this.update()}update(){this.state.update(),this.view.update(),window.requestAnimationFrame(()=>{this.update()})}resize(){this.state.resize(),this.view.resize()}destroy(){}};let it=_i;Ht(it,"instance");const Vl=new it;Vl.view&&document.querySelector(".game").append(Vl.view.renderer.instance.domElement);
