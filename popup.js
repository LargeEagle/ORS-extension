function injectTheScript() {
  document.querySelector("#targetQuestion").value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // query the active tab, which will be only one tab
    //and inject the script in it
    chrome.tabs.executeScript(tabs[0].id, { file: "content_script.js" });
  });
}

document
  .querySelector("#clickAdd")
  .addEventListener("click", addQustionItemStart);

function addQustionItemStart() {
  //var targetID = document.querySelector("#targetQuestion").value;
  //   var inputData = document.querySelector("#inputData").value;
  //   localStorage.setItem("targetID", targetID);
  //   localStorage.setItem("inputData", inputData);

  var message = {
    targetID: document.querySelector("#targetQuestion").value,
    inputData: document.querySelector("#inputData").value,
  };

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
