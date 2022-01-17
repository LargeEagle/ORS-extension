var mode = localStorage.getItem("mode");
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
var editItemDisplayAnswerTextbox;
var editItemValueTextbox;
var editItemOptionalTextboxCheckbox;
var editItemReferCodeTextbox;
var targetItemEditSaveBTN;
var inputData;

function redefineQuestionInfo() {
  mode = localStorage.getItem("mode");

  targetID = localStorage.getItem("targetID");
  // ctlNumber = parseInt(getOrdinalOfItems()) + 1;

  questionEditBTN = document.querySelector(
    "#Question-" + targetID + "_btnEdit"
  );
  targetItemEditBTN = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_btnAnswerEdit"
  );
  targetItemSaveBTN = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_btnEditSave"
  );

  /*define Question items in add mode*/
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
  /*end of define Question items in add mode */

  /*define Question in edit mode */

  targetItemEditSaveBTN = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_btnEditSave"
  );
  editItemDisplayAnswerTextbox = document.querySelector(
    "#Question-" +
      targetID +
      "_dgAnswers__ctl" +
      ctlNumber +
      "_txtEditDisplayName"
  );
  editItemValueTextbox = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_txtEditValue"
  );
  editItemOptionalTextboxCheckbox = document.querySelector(
    "#Question-" +
      targetID +
      "_dgAnswers__ctl" +
      ctlNumber +
      "_cbEditOptionalTextbox"
  );
  editItemReferCodeTextbox = document.querySelector(
    "#Question-" + targetID + "_dgAnswers__ctl" + ctlNumber + "_txtEditRefValue"
  );
  /*end of define Question in edit mode */

  inputData = JSON.parse(localStorage.getItem("inputData"));
}
function getOrdinalOfItems() {
  if (localStorage.getItem("currentItem") === null) {
    localStorage.setItem("currentItem", "1");
  }
  return localStorage.getItem("currentItem");
}

function startEdit() {
  if (mode === "add") {
    if (isFinish() === false) {
      startModeAdd();
    } else {
      localStorage.removeItem("targetID");
      localStorage.removeItem("inputData");
      localStorage.removeItem("currentItem");
      console.log("All items has been added!!!");
    }
  }

  if (mode === "edit") {
    if (isFinish() === false) {
      startModeEdit();
    } else {
      localStorage.removeItem("targetID");
      localStorage.removeItem("inputData");
      localStorage.removeItem("currentItem");
      console.log("All items has been Updated!!!");
    }
  }
}

function isFinish() {
  var nextOrdinalOfItemInData =
    parseInt(localStorage.getItem("currentItem")) - 1;
  if (typeof inputData[nextOrdinalOfItemInData] !== "undefined") {
    console.log(`not yet complete add/edit items`);
    return false;
  } else {
    if (mode === "add") {
      alert("All items has been added!!!");
    }
    if (mode === "edit") {
      alert("All items has been updated!!!");
    }

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

function startModeEdit() {
  if (!!questionEditBTN) {
    questionEditBTN.click();
  }
  console.log(`start editing...`);

  if (!!targetItemEditBTN) {
    clickItemEditBTN();
  }

  if (!!targetItemSaveBTN) {
    console.log(`filling data...`);
    currentItem = parseInt(getOrdinalOfItems()) - 1;
    fillData(inputData[currentItem], false);
    clickTargetItemEditSaveBTN();
  }
}

function clickItemEditBTN() {
  targetItemEditBTN.click();
}

function clickAddNewAnswerBTN() {
  addNewAnswerBTN.click();
}

function clickTargetItemEditSaveBTN() {
  logToStore();
  targetItemEditSaveBTN.click();
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

  if (isAdd === false) {
    DisplayAnswerTextbox = editItemDisplayAnswerTextbox;
    ValueTextbox = editItemValueTextbox;
    OptionalTextboxCheckbox = editItemOptionalTextboxCheckbox;
    ReferCodeTextbox = editItemReferCodeTextbox;
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
  console.log("gotMessage function");
  // var info = [message.targetID, message.inputData];
  localStorage.setItem("targetID", message.targetID.toLowerCase());
  var rawInputData = message.inputData;

  var TextboxToJSON = JSON.parse(message.inputData);

  localStorage.setItem("inputData", JSON.stringify(TextboxToJSON));

  localStorage.setItem("mode", message.mode);
  redefineQuestionInfo();
  startEdit();
  console.log(inputData);
}

if (!!localStorage.getItem("targetID")) {
  redefineQuestionInfo();
  startEdit();
}
