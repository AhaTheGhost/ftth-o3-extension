var theSIP;
var phoneNum;
var type;
var urlIndex;
var canTicket;

// listen for sendMessage() from ticket script
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        // Portal buttons link
        if (request.sip !== undefined && request.sip.length > 1 ){

          chrome.windows.getAll({populate:true},function(windows){
            windows.forEach(function(window){

              window.tabs.forEach(function(tab){
                if(tab.url !== undefined && tab.url.includes('http://partner.o3-telecom.com/')){

                  var tId = tab.id;
                  urlIndex = 0;
                  theSIP = request.sip;
                  type = request.type;

                  if(type === 'power' || type === 'port'){
                    chrome.tabs.update(tId, {url: "http://partner.o3-telecom.com/maintenance"});
                    chrome.tabs.onUpdated.addListener(powerPortListener);
                  }

                  if(type === 'log'){
                    chrome.tabs.update(tId, {url: "http://partner.o3-telecom.com/action_logs"});
                    chrome.tabs.onUpdated.addListener(logListener);
                  }

                }
              });

            });
          });

        } else if (request.phoneNum !== undefined && (request.phoneNum.length >= 10 && request.phoneNum.length <= 11)){

          chrome.windows.getAll({populate:true},function(windows){
            windows.forEach(function(window){

              window.tabs.forEach(function(tab){
                if(tab.url !== undefined && tab.url.includes('http://partner.o3-telecom.com/')){

                  var tId = tab.id;
                  urlIndex = 0;
                  phoneNum = request.phoneNum;
                  type = request.type;

                  if(type === 'phone'){
                    chrome.tabs.update(tId, {url: "http://partner.o3-telecom.com/maintenance"});
                    chrome.tabs.onUpdated.addListener(phoneListener);
                  }

                }
              });

            });
          });

        } else if (request.canSip !== undefined && (request.canSip.length >= 9 && request.canSip.length <= 10) && !isNaN(request.canSip)){

          chrome.windows.getAll({populate:true},function(windows){
            windows.forEach(function(window){

              window.tabs.forEach(function(tab){
                if(tab.url !== undefined && tab.url.includes('http://partner.o3-telecom.com/')){

                  var tId = tab.id;
                  urlIndex = 0;
                  theSIP = request.canSip;
                  canTicket = request.canTicket;

                  chrome.tabs.update(tId, {url: "http://partner.o3-telecom.com/maintenance"});
                  chrome.tabs.onUpdated.addListener(sipCancelListener);

                }
              });

            });
          });

        } else if (request.cancelCan !== undefined) {

          chrome.tabs.onUpdated.removeListener(sipCancelListener);

        } else {

          // set the icon for the browser action from sendMessage() in ticket script
          chrome.browserAction.setIcon({
              path: {
                  "20": request.iconPath20,
                  "40": request.iconPath40
              },
              tabId: sender.tab.id
          });
          // disable browser action for the current tab
          chrome.browserAction.disable(sender.tab.id);

        }

        Promise.resolve("").then(result => sendResponse(result));
        return true;
});

function phoneListener(tabId, info, tab) {
  if (info.status === 'complete') {
    chrome.tabs.executeScript(tabId, { code: "var phoneNum = '" + phoneNum + "';"}, function(){
        chrome.tabs.executeScript(tabId, { file: "js/portalButtons/phoneCode.js"}, function(){});
    });

    if(urlIndex == 1){
      chrome.tabs.onUpdated.removeListener(phoneListener);
      return;
    }

    urlIndex++;
  }
}

function powerPortListener(tabId, info, tab) {
  if (info.status === 'complete') {
    chrome.tabs.executeScript(tabId, { code: "var sip = '" + theSIP + "';"}, function(){
      if(type === 'power')
        chrome.tabs.executeScript(tabId, { file: "js/portalButtons/powerCode.js"}, function(){});
      else
        chrome.tabs.executeScript(tabId, { file: "js/portalButtons/portCode.js"}, function(){});
    });

    if(urlIndex == 2){
      chrome.tabs.onUpdated.removeListener(powerPortListener);
      return;
    }

    urlIndex++;
  }
}

function logListener(tabId, info, tab) {
  if (info.status === 'complete') {
    chrome.tabs.executeScript(tabId, { code: "var sip = '" + theSIP + "';"}, function(){
      chrome.tabs.executeScript(tabId, { file: "js/portalButtons/logCode.js"}, function(){});
    });

    if(urlIndex == 1){
      chrome.tabs.onUpdated.removeListener(logListener);
      return;
    }

    urlIndex++;
  }
}

function sipCancelListener(tabId, info, tab) {
  if (info.status === 'complete') {
    chrome.tabs.executeScript(tabId, { code: "var parameter = {sip: '" + theSIP + "', canTicket: '" + canTicket + "'};"}, function(){
      chrome.tabs.executeScript(tabId, { file: "js/canCode.js"}, function(){});
    });

    if(urlIndex == 4){
      chrome.tabs.onUpdated.removeListener(sipCancelListener);
      return;
    }

    urlIndex++;
  }
}
