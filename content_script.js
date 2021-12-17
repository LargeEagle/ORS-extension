var mode = "add";
var targetID = localStorage.getItem("targetID");
var ctlNumber = parseInt(getOrdinalOfItems()) + 1;
var questionEditBTN;
var targetItemEditBTN;
var targetItemSaveBTN;
var targetItemAddNewSaveBTN;
var addNewAnswerBTN;
var newAddItemDisplayAnswerTextbox;
var newAddItemValueTextbox;
var newAddItemOptionalTextboxCheckbox;
var newAddItemReferCodeTextbox;
var inputData;

function redefineQuestionInfo() {
  targetID = localStorage.getItem("targetID");
  var ctlNumber = parseInt(getOrdinalOfItems()) + 1;

  questionEditBTN = document.querySelector(
    "#Question-" + targetID + "_btnEdit"
  );
  targetItemEditBTN = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_btnAnswerEdit"
  );
  targetItemSaveBTN = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_btnEditSave"
  );
  targetItemAddNewSaveBTN = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_btnNewSave"
  );
  addNewAnswerBTN = document.querySelector(
    "#Question-" + targetID + "_btnEditNewAnswer"
  );
  newAddItemDisplayAnswerTextbox = document.querySelector(
    "#Question-" +
      targetID +
      "_dgAnswers__ctl" +
      ctlNumber +
      "_txtNewDisplayName"
  );
  newAddItemValueTextbox = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_txtNewValue"
  );
  newAddItemOptionalTextboxCheckbox = document.querySelector(
    "#Question-" +
      targetID +
      "_dgAnswers__ctl" +
      ctlNumber +
      "_cbNewOptionalTextbox"
  );
  newAddItemReferCodeTextbox = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_txtNewRefValue"
  );

  inputData = localStorage.getItem("inputData");
}
function getOrdinalOfItems() {
  if (localStorage.getItem("currentItem") === null) {
    localStorage.setItem("currentItem", "1");
  }
  return localStorage.getItem("currentItem");
}

function startEdit() {
  if (mode === "add") {
    if (isAddFinish() === false) {
      startModeAdd();
    } else {
      localStorage.removeItem("targetID");
      localStorage.removeItem("inputData");
      localStorage.removeItem("currentItem");
      console.log("All items has been added!!!");
    }
  }
}

function isAddFinish() {
  var nextOrdinalOfItemInData =
    parseInt(localStorage.getItem("currentItem")) - 1;
  if (typeof inputData[nextOrdinalOfItemInData] !== "undefined") {
    console.log(`not yet complete add items`);
    return false;
  } else {
    alert("All items has been added!!!");
    return true;
  }
}

function startModeAdd() {
  if (!!questionEditBTN) {
    questionEditBTN.click();
  }
  if (!questionEditBTN && !targetItemEditBTN && !!addNewAnswerBTN) {
    clickAddNewAnswerBTN();
  }
  if (!questionEditBTN && !!targetItemEditBTN) {
    clickItemEditBTN();
  }
  if (!questionEditBTN && (!!targetItemSaveBTN || !!targetItemAddNewSaveBTN)) {
    currentItem = parseInt(getOrdinalOfItems()) - 1;
    fillData(inputData[currentItem], true);
    clickTargetItemAddNewSaveBTN();
  }
}

function clickItemEditBTN() {
  targetItemEditBTN.click();
}

function clickAddNewAnswerBTN() {
  addNewAnswerBTN.click();
}

function clickTargetItemAddNewSaveBTN() {
  logToStore();
  targetItemAddNewSaveBTN.click();
}

function logToStore() {
  var currentNumber = parseInt(localStorage.getItem("currentItem"));
  localStorage.setItem("currentItem", currentNumber + 1);
}

function fillData(data, isAdd) {
  var DisplayAnswerTextbox = "";
  var ValueTextbox = "";
  var OptionalTextboxCheckbox = "";
  var ReferCodeTextbox = "";

  if (isAdd === true) {
    DisplayAnswerTextbox = newAddItemDisplayAnswerTextbox;
    ValueTextbox = newAddItemValueTextbox;
    OptionalTextboxCheckbox = newAddItemOptionalTextboxCheckbox;
    ReferCodeTextbox = newAddItemReferCodeTextbox;
  }

  DisplayAnswerTextbox.value = data.DisplayAnswer;
  ValueTextbox.value = data.value;
  ReferCodeTextbox.value = data.ReferCode;
  if (data.OptionalTextbox === "yes") {
    console.log(OptionalTextboxCheckbox.id);
    OptionalTextboxCheckbox.checked = true;
  }
  if (data.OptionalTextbox === "no") {
    OptionalTextboxCheckbox.checked = false;
  }
}

//console.log(inputData[3])

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  // var info = [message.targetID, message.inputData];
  localStorage.setItem("targetID", message.targetID);
  localStorage.setItem("inputData", message.inputData);
  redefineQuestionInfo();
  startEdit();
  console.log(inputData);
}

if (!!localStorage.getItem("targetID")) {
  redefineQuestionInfo();
  startEdit();
}
