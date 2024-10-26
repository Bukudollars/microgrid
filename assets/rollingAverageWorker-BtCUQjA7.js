(function(){"use strict";const s={isEnabled:!1,logLevel:"debug",log:function(...o){this.isEnabled&&["debug","info","error"].includes(this.logLevel)&&console.log(...o)},info:function(...o){this.isEnabled&&["info","debug"].includes(this.logLevel)&&console.info("INFO: ",...o)},error:function(...o){this.isEnabled&&["error","info","debug"].includes(this.logLevel)&&console.error("ERROR: ",...o)}},f=60,P=24,h=30;self.onmessage=function(o){s.log("Rolling average worker received message");const n=f*P,r=n*h,v=[];let i=0,l=0,t=0,a=0;try{s.log("Rolling average worker received message");for(let e=0;e<o.data.length;e++){i+=o.data[e].gensetRealPowerContribution,l+=o.data[e].providedPVPower,t+=o.data[e].gensetRealPowerContribution,a+=o.data[e].providedPVPower;let g,d;e<n?(g=i/(e+1),d=l/(e+1)):(i-=o.data[e-n].gensetRealPowerContribution,l-=o.data[e-n].providedPVPower,g=i/n,d=l/n);let c,u;e<r?(c=t/(e+1),u=a/(e+1)):(t-=o.data[e-r].gensetRealPowerContribution,a-=o.data[e-r].providedPVPower,c=t/r,u=a/r),v.push({dailyGenAverage:g,dailyPVAverage:d,monthlyGenAverage:c,monthlyPVAverage:u})}self.postMessage(v)}catch(e){s.error("Error in rolling average worker: ",e)}}})();
