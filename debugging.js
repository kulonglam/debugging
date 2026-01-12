// Defining the variables
const qtyInput = document.getElementById("quantity");
const priceInput = document.getElementById("unitPrice");
const totalInput = document.getElementById("totalAmount");
const purchaseDate = document.getElementById("purchase_date");
const deliveryDate = document.getElementById("delivery_date");
const phoneInput = document.getElementById("supplier_contact");
const phoneError = document.getElementById("phone-error");
const dateError = document.getElementById("date-error");
const procurementForm = document.getElementById("procurementForm");

//  Real-time total calculation logic
// Ensures the Total Amount is always correct (Quantity * Unit Price)
function calculateTotal() {
  try {
    const qty = parseFloat(qtyInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    totalInput.value = (qty * price).toFixed(2);
  } catch (error) {
    // Runtime catch to prevent script crashes
    console.error("Calculation Error:", error);
    totalInput.value = "0.00";
  }
}

qtyInput.addEventListener("input", calculateTotal);
priceInput.addEventListener("input", calculateTotal);

// Sanitizing phone input in real-time
phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");

  if (this.value.length > 0 && !this.value.startsWith("0")) {
    phoneError.textContent = "Number must start with 0";
    phoneError.style.display = "block";
  } else if (this.value.length > 0 && this.value.length !== 10) {
    phoneError.textContent = "Must be exactly 10 digits";
    phoneError.style.display = "block";
  } else {
    phoneError.style.display = "none";
  }
});

procurementForm.addEventListener("submit", function (e) {
  // Reset Validation state
  let isValid = true;
  const pDate = new Date(purchaseDate.value);
  const dDate = new Date(deliveryDate.value);

  // Error handling/logical: Prevent delivery before purchase
  if (dDate < pDate) {
    dateError.style.display = "block";
    deliveryDate.focus();
    isValid = false;
  } else {
    dateError.style.display = "none";
  }

  //  Final check for valid phone length
  if (phoneInput.value.length !== 10) {
    phoneError.style.display = "block";
    if (isValid) phoneInput.focus();
    isValid = false;
  }

  // Prevent default submission if errors exist
  if (!isValid) {
    e.preventDefault();
    return;
  }

  // Only runs if isValid is true
  e.preventDefault();

  const submitBtn = document.querySelector(".submit-btn");
  const productName = document.getElementById("product_name").value;

  // UI Feedback: Change button state
  submitBtn.disabled = true;
  submitBtn.textContent = "Processing...";
  submitBtn.style.opacity = "0.7";

  // Simulate Server Submission delay for 2 seconds
  setTimeout(() => {
    // Hide form and show success block
    procurementForm.style.display = "none";

    const successDiv = document.getElementById("success-message");
    document.getElementById("display-product").textContent = productName;
    successDiv.style.display = "block";
  }, 2000);
});
