(function(){"use strict";const s={isEnabled:!1,logLevel:"debug",log:function(...e){this.isEnabled&&["debug","info","error"].includes(this.logLevel)&&console.log(...e)},info:function(...e){this.isEnabled&&["info","debug"].includes(this.logLevel)&&console.info("INFO: ",...e)},error:function(...e){this.isEnabled&&["error","info","debug"].includes(this.logLevel)&&console.error("ERROR: ",...e)}},t=60,h=24,m=30;self.onmessage=function(e){s.log("Rolling average worker received message");const i=t*h,d=i*m,v=[];let n=0,r=0,l=0,a=0,f=0,w=0,b=0,R=0;try{s.log("Rolling average worker received message");for(let o=0;o<e.data.length;o++){n+=e.data[o].gensetRealPowerContribution/t,r+=e.data[o].providedPVPower/t,l+=e.data[o].gensetRealPowerContribution/t,a+=e.data[o].providedPVPower/t,f+=e.data[o].gensetRealPowerContribution/t,w+=e.data[o].providedPVPower/t,e.data[o].essPowerContribution>0&&(b+=e.data[o].essPowerContribution/t),e.data[o].utilityRealPowerContribution>0&&(R+=e.data[o].utilityRealPowerContribution/t);let g,u;o<i?(g=n/1e3,u=r/1e3):(n-=e.data[o-i].gensetRealPowerContribution/t,r-=e.data[o-i].providedPVPower/t,g=n/1e3,u=r/1e3);let P,c;o<d?(P=l/1e3,c=a/1e3):(l-=e.data[o-d].gensetRealPowerContribution/t,a-=e.data[o-d].providedPVPower/t,P=l/1e3,c=a/1e3),v.push({dailyGenAverage:g,dailyPVAverage:u,monthlyGenAverage:P,monthlyPVAverage:c,genSum:f,pvSum:w,essSum:b,utilitySum:R})}self.postMessage(v)}catch(o){s.error("Error in rolling average worker: ",o)}}})();