function injectTheScript() {
  document.querySelector("#targetQuestion").value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // query the active tab, which will be only one tab
    //and inject the script in it
    chrome.tabs.executeScript(tabs[0].id, { file: "content_script.js" });
  });
}

document.querySelector("#clickAdd").addEventListener("click", function () {
  updateQustionItemStart("add");
});

document.querySelector("#clickEdit").addEventListener("click", function () {
  updateQustionItemStart("edit");
});

function updateQustionItemStart(updateMode) {
  //var targetID = document.querySelector("#targetQuestion").value;
  var inputData = document.querySelector("#inputData").value;
  //   localStorage.setItem("targetID", targetID);
  //   localStorage.setItem("inputData", inputData);

  if (
    /^[\],:{}\s]*$/.test(
      inputData
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    //the json is ok
    // console.log(`the json is ok`);
    document.querySelector("#inputData").style.borderColor = "green";
    document.querySelector("#CustomMSG").innerHTML = "";

    var message = {
      targetID: document.querySelector("#targetQuestion").value,
      inputData: document.querySelector("#inputData").value,
      mode: updateMode,
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  } else {
    //the json is not ok
    document.querySelector("#inputData").style.borderColor = "red";
    document.querySelector(
      "#CustomMSG"
    ).innerHTML = `JSON format is invalid. For more details, please access below link to verify.<br><a href="https://jsonformatter.curiousconcept.com/" target="_blank">https://jsonformatter.curiousconcept.com/</a>`;
    console.log(`the json is not ok`);
  }
}
