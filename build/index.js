!function(){"use strict";function e(){return e=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a])}return e},e.apply(this,arguments)}var t=window.wp.element,l=window.wp.components;const{createHigherOrderComponent:a}=wp.compose,{Fragment:n,useState:r}=wp.element,{InspectorControls:o}=wp.blockEditor,{__:__}=wp.i18n,{PanelBody:c}=wp.components,s=["core/group"];wp.hooks.addFilter("blocks.registerBlockType","wab/set-group-row-advanced",((e,t)=>s.includes(t)?Object.assign({},e,{attributes:Object.assign({},e.attributes,{layoutFlex:{type:"object"}})}):e));const i=a((e=>a=>{if(!s.includes(a.name))return(0,t.createElement)(e,a);const r=wp.data.select("core/block-editor").getBlockParents(a.clientId),i=wp.data.select("core/block-editor").getBlockAttributes(r.at(-1));if(!r||"flex"!==i?.layout?.type)return(0,t.createElement)(e,a);const{attributes:u,setAttributes:p}=a,{layoutFlex:d}=u,b=e=>{const t=Object.assign({},d,{[e.key]:e.val});p({layoutFlex:t})};return(0,t.createElement)(n,null,(0,t.createElement)(e,a),(0,t.createElement)(o,null,(0,t.createElement)(c,{title:__("Contrôle avancé de la mise en page")},(0,t.createElement)(l.Flex,{align:"flex-start"},(0,t.createElement)(l.FlexBlock,null,(0,t.createElement)(l.TextControl,{label:__("Grow"),onChange:e=>b({val:e,key:"flexGrow"}),value:d?.flexGrow,type:"number",min:0,placeholder:1,style:{flexShrink:1}})),(0,t.createElement)(l.FlexBlock,null,(0,t.createElement)(l.TextControl,{label:__("Shrink"),onChange:e=>b({val:e,key:"flexShrink"}),value:d?.flexShrink,type:"number",min:0,placeholder:1,style:{flexShrink:1}})),(0,t.createElement)(l.FlexBlock,null,(0,t.createElement)(l.__experimentalUnitControl,{label:__("Flex-basis"),onChange:e=>b({val:e,key:"flexBasis"}),value:d?.flexBasis,units:[{value:"%",label:"%",default:0},{value:"px",label:"px",default:0},{value:"em",label:"em",default:0},{value:"rem",label:"rem",default:0}],placeholder:__("auto"),style:{width:"80px"}}))))))}),"withGroupRowAdvanced");wp.hooks.addFilter("editor.BlockEdit","wab/with-group-row-advanced",i);const u=a((l=>a=>{if(!s.includes(a.name))return(0,t.createElement)(l,a);const{attributes:n}=a;return!n.layoutFlex||Object.values(n.layoutFlex).every((e=>null===e||""===e))?(0,t.createElement)(l,a):(0,t.createElement)(l,e({},a,{wrapperProps:{style:n.layoutFlex}}))}),"withGroupRowAdvancedStyle");wp.hooks.addFilter("editor.BlockListBlock","wab/with-group-row-advanced-prop",u),wp.hooks.addFilter("blocks.getSaveContent.extraProps","wab/apply-group-row-advanced",(function(e,t,l){if(!s.includes(t.name))return e;const{layoutFlex:a}=l;return!a||Object.values(a).every((e=>null===e||""===e))||Object.assign(e,{style:Object.assign({},e?.style,a)}),e}))}();