(function(){"use strict";const W=[{hour:0,residential:.12,commercial:.15,Industrial:1,Community:.43},{hour:1,residential:.08,commercial:.15,Industrial:1,Community:.15},{hour:2,residential:.08,commercial:.15,Industrial:1,Community:.15},{hour:3,residential:.12,commercial:.15,Industrial:1,Community:.15},{hour:4,residential:.12,commercial:.15,Industrial:1,Community:.15},{hour:5,residential:.22,commercial:.15,Industrial:1,Community:.25},{hour:6,residential:.3,commercial:.15,Industrial:1,Community:.43},{hour:7,residential:.5,commercial:.15,Industrial:1,Community:.58},{hour:8,residential:.38,commercial:.55,Industrial:1,Community:.65},{hour:9,residential:.32,commercial:1,Industrial:1,Community:.65},{hour:10,residential:.32,commercial:1,Industrial:1,Community:.65},{hour:11,residential:.38,commercial:1,Industrial:1,Community:.65},{hour:12,residential:.4,commercial:1,Industrial:1,Community:.65},{hour:13,residential:.55,commercial:1,Industrial:1,Community:.65},{hour:14,residential:.48,commercial:1,Industrial:1,Community:.65},{hour:15,residential:.3,commercial:1,Industrial:1,Community:.65},{hour:16,residential:.3,commercial:1,Industrial:1,Community:.65},{hour:17,residential:.3,commercial:1,Industrial:1,Community:.75},{hour:18,residential:.55,commercial:.82,Industrial:1,Community:.84},{hour:19,residential:1,commercial:.65,Industrial:1,Community:1},{hour:20,residential:.78,commercial:.55,Industrial:1,Community:1},{hour:21,residential:.55,commercial:.15,Industrial:1,Community:1},{hour:22,residential:.48,commercial:.15,Industrial:1,Community:1},{hour:23,residential:.22,commercial:.15,Industrial:1,Community:.75}],x={residential:.9,commercial:.8,industrial:.75,community:.85},B={residential:1,commercial:.95,industrial:.9,community:.95},X={residential:.01,commercial:.02,industrial:.02,community:.01},U=.85,j=1,z=.05,G=.7,T=.3,H=24,r={isEnabled:!1,logLevel:"debug",log:function(...f){this.isEnabled&&["debug","info","error"].includes(this.logLevel)&&console.log(...f)},info:function(...f){this.isEnabled&&["info","debug"].includes(this.logLevel)&&console.info("INFO: ",...f)},error:function(...f){this.isEnabled&&["error","info","debug"].includes(this.logLevel)&&console.error("ERROR: ",...f)}};self.onmessage=function(f){try{console.log("Worker received message: ",f.data);const o=f.data;let A=Object.freeze({activeFeederBreakers:o.totalFeederBreakers,remainingESSEnergy:o.singleESSEnergy*o.essModuleCount,essChargeState:1,loadPowerFactor:Math.random()*(B.commercial-x.commercial)+x.commercial,loadVariation:.95});const N=Array.from({length:o.simulationTime},(D,e)=>{try{const w=Y({...A,variables:o,index:e});return A=Object.freeze({...A,remainingESSEnergy:w.remainingESSEnergy,activeFeederBreakers:w.activeFeederBreakers,essChargeState:w.essChargeState,loadPowerFactor:w.loadPowerFactor,loadVariation:w.loadVariation}),w}catch(w){throw console.error("Error in computeValue at index ${index}: ",w.message),w}});self.postMessage(N)}catch(o){r.error("Error in simulation worker: ",o.message),self.postMessage({error:o.message})}};function u(f,o){return f===0&&o===0?0:Math.sqrt(f**2/(f**2+o**2))}function Y({activeFeederBreakers:f,remainingESSEnergy:o,essChargeState:A,loadPowerFactor:N,loadVariation:D,variables:e,index:w}){r.log("Index: ",w),r.log("Peak Load: ",e.peakLoad),r.log("Active Feeder Breakers: ",f),r.log("Total Feeder Breakers: ",e.totalFeederBreakers);const $=Math.max(x.commercial,Math.min((1-Math.random()*2)*X.commercial+N,B.commercial)),q=Math.max(U,Math.min((1-Math.random()*2)*z+D,j)),V=W[Math.floor(w/e.granularity)%H].commercial*e.peakLoad*q/e.totalFeederBreakers,l=V*f;r.log("Real Load: ",l);const m=Math.sqrt((l/N)**2-l**2),J=Math.max(Math.sin((w%(H*e.granularity)-6*e.granularity)*15*Math.PI/(180*e.granularity)),0),i=e.peakPVPower*J*e.cloudingFactor;let M=0,I=f;const s=e.singleESSEnergy*e.essModuleCount,h=e.singleESSPeakPower*e.essModuleCount;let n=0,t=0,a=o,C=0,L=A,R=0,O=0,F=0;const y=e.singleGensetPower*e.gensetCount,p=e.singleGensetPower*.3,k=e.singleGensetPower*.7;let c=0,P=0,d=0,g=0,_=0;return r.log("availablePVPower: ",i),r.log("activeFeederBreakers: ",f),r.log("realLoad: ",l),r.log("remainingESSEnergy: ",o),e.utility?(r.log("Utility is available"),I=e.totalFeederBreakers,l<i?(r.log("realLoad < availablePVPower"),o<s?(n=m,t=-Math.min(i-l,h),a=o-1/e.granularity*t,C=u(t,n),a>s&&(a=s),i-l+t>0&&(R=-Math.min(i-l+t,e.utilityExportLimit),O=0,F=u(R,O)),M=l-t-R):(R=-Math.min(i-l,e.utilityExportLimit),O=m,F=u(R,O),M=l-R)):(r.log("not enough PV to cover the load"),i<=0?(r.log("no PV power available"),a<s?(r.log("no PV power and ESS not charged"),t=-Math.min(h,(s-o)*e.granularity),n=0,C=u(t,n),R=l+Math.min(h,(s-o)*e.granularity),O=m,F=u(R,O),a=o+1/e.granularity*h,a>s&&(a=s)):(R=l,O=m),F=u(R,O)):(r.log("PV and utility both available"),l-i<h&&o/s>T?(M=i,t=Math.min(l-i,o*e.granularity),n=m,C=u(t,n),a=o-1/e.granularity*t,R=0,O=0):(M=i,R=l-i,O=m,F=u(R,O))))):(r.log("No utility power available"),e.gensetCount===0?(r.log("No gensets, only PV and energy storage"),f<e.totalFeederBreakers&&(r.log("activeFeederBreakers < variables.totalFeederBreakers"),(i-l>=V||o>0&&i+h-l>=V)&&I++),l<i?o<s?(n=m,t=-Math.min(i-l,h,s-o),C=u(t,n),a=o-1/e.granularity*t,a>s&&(a=s),M=l-t):(M=l,t=0,n=m,C=u(t,n)):(r.log("less PV than the load requires"),o<=0?(r.log("ESS is discharged, shed load"),I=Math.floor(i/V),M=l,t=0,n=m,C=u(t,n)):l>i+h||l>i+o?(r.log("not enough capacity between the PV and ESS to support the load, shed load"),I=Math.floor(Math.min(i+h,i+o)/V),M=i,t=Math.min(l-i,o),n=m,C=u(t,n),a=o-1/e.granularity*t):(r.log("PV and energy storage is sufficient to power load"),M=i,t=l-i,n=m,C=u(t,n),a=o-1/e.granularity*t))):e.gensetCount>0&&e.essModuleCount===0?(r.log("Generator sets only, no ESS"),c=l-i,f<e.totalFeederBreakers&&i+y-l>=V&&I++,c<=0?(P=1,M=Math.max(l-p,0),d=p,g=m,_=u(d,g)):(r.log("not enough PV to power load"),c>y&&(I=Math.floor((i+y)/V)),P=Math.min(e.gensetCount,Math.ceil(c/k)),d=Math.max(P*p,c),M=Math.max(l-d,0),g=m,_=u(d,g))):e.gensetCount>0&&e.essModuleCount>0&&(r.log("Gensets, PV, and energy storage"),o>0&&f<e.totalFeederBreakers?i+y+h-l>=V&&I++:f<e.totalFeederBreakers&&i+y-l>=V&&I++,c=l-i,c<=0?(r.log("more PV than the load requires, run on PV and ESS"),P=0,o<s?(n=m,t=-Math.min(i-l,h,s-o),C=u(t,n),a=o-1/e.granularity*t,a>s&&(a=s),M=l-t,d=0,g=0,_=0,a/s>G&&(L=1)):(r.log("ESS does not require charging"),M=l,t=0,n=m,C=u(t,n),d=0,d=0,g=0,_=0)):(r.log("PV does not have enough power to run the load, run on PV + genset and/or energy storage"),A===1?c<o?(r.log("ESS can cover the load"),P=0,n=m,t=c,C=u(t,n),a=o-1/e.granularity*t,M=l-t,d=0,g=0,_=0,a/s<T&&(L=0)):(r.log("ESS can't cover complete load, use genset and/or ESS"),c>y+h&&c>y+o&&(I=Math.floor((i+y+h)/V)),P=Math.min(e.gensetCount,Math.ceil(c/k)),c/P<h&&c/P<o?(r.log("ESS can offset one genset"),P--,d=Math.max(p,c-h,c-o),g=m-m/P,_=u(d,g),t=c-d,n=m-g,C=u(t,n),a=o-1/e.granularity*t,a/s<T&&(L=0),M=l-d-t):c>y?(r.log("more power than the gensets can support, run ESS"),P=e.gensetCount,d=l-i-h,g=m*d/l,_=u(d,g),t=Math.min(h,o),n=m-g,C=u(t,n),a=o-1/e.granularity*t,a/s<T&&(L=0),M=l-d-t):(r.log("run on genset only and recharge the ESS"),P=Math.min(e.gensetCount,Math.ceil(c/k)),t=-Math.min(h,s-o,P*e.singleGensetPower-c),n=0,C=u(t,n),d=Math.max(P*p,c)-t,M=Math.max(l-d,0),g=m,_=u(d,g),a=o-1/e.granularity*t,a>s&&(a=s),o/s>G&&(L=1))):(r.log("ESS Charge State = 0, run on PV + Gensets"),c>y&&(o>0?(c>y+Math.min(h,o)&&(I=Math.floor(i+y+Math.min(h,o)/V)),P=e.gensetCount,d=l-i-Math.min(h,o),g=m*d/l,_=u(d,g),t=Math.min(h,o),n=m-g,C=u(t,n),a=o-1/e.granularity*t,a/s<T&&(L=0)):I=Math.floor(i+y/V)),P=Math.min(e.gensetCount,Math.ceil(c/k)),t=-Math.min(h,s-o,P*e.singleGensetPower-c),n=0,C=u(t,n),d=Math.max(P*p,c)-t,M=l-c,g=m,_=u(d,g),a=o-1/e.granularity*t,a>s&&(a=s),a/s>G&&(L=1))))),r.log("essRealPowerContribution: ",t),r.log("essReactivePowerContribution: ",n),r.log("newRemainingESSEnergy: ",a),r.log("newActiveFeederBreakers: ",I),r.log("gensetRealPowerRequirement: ",c),r.log("gensetsRequired: ",P),r.log("nextGensetOnlinePower: ",k),{index:w,activeFeederBreakers:I,remainingESSEnergy:a,totalESSEnergy:s,totalGensetPower:y,essChargeState:A,realLoad:l,loadPowerFactor:$,loadVariation:q,reactiveLoad:m,availablePVPower:i,providedPVPower:M,essReactivePowerContribution:n,essRealPowerContribution:t,essPowerFactor:C,utilityRealPowerContribution:R,utilityReactivePowerContribution:O,utilityPowerFactor:F,providedPVPower:M,gensetRealPowerContribution:d,gensetReactivePowerContribution:g,gensetPowerFactor:_,gensetsRequired:P,essChargeState:L}}})();
