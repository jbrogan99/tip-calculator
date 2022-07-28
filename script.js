//input elements
const percentContainer = document.getElementById("percent_container");
const numberOfPeople = document.querySelector("input#NumberOfPeople");
const bill = document.querySelector("input#BillAmount");
const custom = document.querySelector("input#custom");

//output elements
const tipPP = document.querySelector("#individual_results");
const groupRestlus = document.querySelector("#group_results");
const reset = document.querySelector("#ResetAllValues");
//Target dataset values
function targetPercentage(e) {
  const target = e.target;
  const percentage_tip = parseInt(target.dataset.tip);
  return percentage_tip;
}
//Calculate Tip function
function calculateTip(targetPercent) {
  const errorMessage = document.getElementById("errorMessage");
  const billAmount = parseFloat(bill.value);
  const nop = parseInt(numberOfPeople.value);
  if (billAmount > 0 && nop > 0) {
    const tipPPEqaution = (targetPercent * billAmount) / 100 / nop;
    const groupRestlusEquation =
      billAmount + (targetPercent * billAmount) / 100 / nop;
    tipPP.textContent = "$" + tipPPEqaution.toFixed(2);
    groupRestlus.textContent = "$" + groupRestlusEquation.toFixed(2);
    errorMessage.style.display = "none";
  } else {
    errorMessage.style.display = "";
  }
}

//Reset values function
function resetValues() {
  const errorZero = document.getElementById("errorZero");
  const errorMessage = document.getElementById("errorMessage");
  bill.value = "";
  numberOfPeople.value = "";
  tipPP.textContent = "$0.00";
  groupRestlus.textContent = "$0.00";
  custom.value = "";
  errorZero.style.display = "none";
  errorMessage.style.display = "none";
}

function billAmountIsValid(billAmount) {
  return billAmount > 0;
}

function numberOfPeopleIsValid(numberOfPeople) {
  return numberOfPeople > 0;
}

//custom percentage between 1 > 100
function customNumber(tipAmount) {
  const errorMessage = document.getElementById("errorMessage");
  const billAmount = parseFloat(bill.value);
  const nop = parseInt(numberOfPeople.value);
  if (
    billAmountIsValid(billAmount) &&
    numberOfPeopleIsValid(nop) &&
    tipAmount > 0 &&
    tipAmount <= 100
  ) {
    const tipPPEqaution = (tipAmount * billAmount) / 100 / nop;
    const groupRestlusEquation =
      billAmount + (tipAmount * billAmount) / 100 / nop;
    tipPP.textContent = "$" + tipPPEqaution.toFixed(2);
    groupRestlus.textContent = "$" + groupRestlusEquation.toFixed(2);
    errorMessage.style.display = "none";
  } else {
    errorMessage.style.display = "";
  }
}

let saveTargetPercentage = (e) => {
  let targetPercent = { targetPercentage: targetPercentage(e) };
  const x = JSON.stringify(targetPercent);
  sessionStorage.setItem("percentage_values", x);
  sessionStorage.removeItem(saveCustomNumber());
  return targetPercent.targetPercentage;
};

let retrieveTargetPercentage = () => {
  let targetPercentageJson = sessionStorage.getItem("percentage_values");
  const fixedPercentageObject = JSON.parse(targetPercentageJson);

  let customPercentageJson = sessionStorage.getItem("custom_number");
  const customPercentageObject = JSON.parse(customPercentageJson);

  if (fixedPercentageObject != null) {
    return fixedPercentageObject.targetPercentage;
  }
  if (customPercentageObject != null) {
    return customPercentageObject.customNum;
  }
  return null;
};

function saveCustomNumber(tipAmount) {
  const customNumberObject = { customNum: tipAmount };
  const jsonFormattedObject = JSON.stringify(customNumberObject);
  sessionStorage.setItem("custom_number", jsonFormattedObject);
  sessionStorage.removeItem(saveTargetPercentage());
  return customNumberObject.customNum;
}
let retrieveCustomPercentage = () => {
  let customPercentageJson = sessionStorage.getItem("custom_number");
  const parseJsonObject = JSON.parse(customPercentageJson);
  return parseJsonObject != null ? parseJsonObject.customNum : null;
};

function userClickedOnFixedPercentButton(e) {
  return e.target.dataset.tip;
}

//Event listeners
numberOfPeople.addEventListener("keyup", function () {
  calculateTip(retrieveTargetPercentage()) ||
    customNumber(retrieveCustomPercentage());
});

bill.addEventListener("keyup", function () {
  calculateTip(retrieveTargetPercentage());
});

custom.addEventListener("keyup", function () {
  const customUserValue = parseInt(this.value);
  customNumber(customUserValue);
  saveCustomNumber(customUserValue);
});

percentContainer.addEventListener("click", function (e) {
  if (userClickedOnFixedPercentButton(e)) {
    const percentage = saveTargetPercentage(e);
    calculateTip(percentage);
  }
});

reset.addEventListener("click", resetValues, false);

window.addEventListener("DOMContentLoaded", function () {
  const errorMessage = document.getElementById("errorMessage");
  const errorZero = document.getElementById("errorZero");
  errorMessage.style.display = "none";
  errorZero.style.display = "none";
  const a = 5;
  const b = 5;
  const c = a + b;
  const all = parseInt(c);
  console.log(c);
  console.log(all);
});
