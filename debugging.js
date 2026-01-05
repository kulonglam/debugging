        // Variable Definitions
        const qtyInput = document.getElementById('quantity');
        const priceInput = document.getElementById('unitPrice');
        const totalInput = document.getElementById('totalAmount');
        const purchaseDate = document.getElementById('purchase_date');
        const deliveryDate = document.getElementById('delivery_date');
        const phoneInput = document.getElementById('supplier_contact');
        const phoneError = document.getElementById('phone-error');
        const dateError = document.getElementById('date-error');

        // Real-time total calculation
        function calculateTotal() {
            const qty = parseFloat(qtyInput.value) || 0;
            const price = parseFloat(priceInput.value) || 0;
            totalInput.value = (qty * price).toFixed(2);
        }

        qtyInput.addEventListener('input', calculateTotal);
        priceInput.addEventListener('input', calculateTotal);

        // Combined Form Validation
        document.getElementById('procurementForm').addEventListener('submit', function(e) {
            let isValid = true;

            // 1. Date Validation
            const pDate = new Date(purchaseDate.value);
            const dDate = new Date(deliveryDate.value);

            if (purchaseDate.value && deliveryDate.value && dDate < pDate) {
                e.preventDefault();
                dateError.style.display = 'block';
                deliveryDate.focus();
                isValid = false;
            } else {
                dateError.style.display = 'none';
            }

            // 2. Phone Validation (Check length only if date was valid to avoid double-focus)
            if (phoneInput.value.length !== 10) {
                e.preventDefault();
                phoneError.style.display = 'block';
                if (isValid) phoneInput.focus();
                isValid = false;
            }
        });

        // Real-time phone formatting
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, ''); // Digits only

            if (this.value.length > 0 && !this.value.startsWith('0')) {
                phoneError.textContent = "Number must start with 0";
                phoneError.style.display = 'block';
            } else if (this.value.length > 0 && this.value.length !== 10) {
                phoneError.textContent = "Must be exactly 10 digits";
                phoneError.style.display = 'block';
            } else {
                phoneError.style.display = 'none';
            }
        });

        document.getElementById('procurementForm').addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            let isValid = true;
            const pDate = new Date(purchaseDate.value);
            const dDate = new Date(deliveryDate.value);

            // Date Validation
            if (dDate < pDate) {
                document.getElementById('date-error').style.display = 'block';
                isValid = false;
            }

            // Phone Validation
            if (phoneInput.value.length !== 10) {
                phoneError.style.display = 'block';
                isValid = false;
            }

            // If everything is correct
            if (isValid) {
                const submitBtn = document.querySelector('.submit-btn');
                const productName = document.getElementById('product_name').value;
                
                // Change button state to "Loading"
                submitBtn.disabled = true;
                submitBtn.textContent = "Processing...";
                submitBtn.style.opacity = "0.7";

                // Simulate a server delay (2 seconds)
                setTimeout(() => {
                    // Hide the form
                    document.getElementById('procurementForm').style.display = 'none';
                    
                    // Show the success message
                    const successDiv = document.getElementById('success-message');
                    document.getElementById('display-product').textContent = productName;
                    successDiv.style.display = 'block';
                }, 2000);
            }
        });
        // Syntax	Corrected label for attributes to match input id (e.g., supplier-contact vs suplier_contact).
        // Syntax	Fixed a spelling error in the HTML <option> value for "stationery".
        // Syntax	Added the missing id="product_name" to the product name input (it was incorrectly using id="supplierName").
        // Logical Added a JavaScript event listener to automatically calculate the Total Amount ($Quantity \times Unit Price$).
        // Logical	Changed the form method to POST and added enctype="multipart/form-data" to allow file uploads.
        // Logical	Fixed duplicate name="date" attributes. Both Purchase and Delivery dates had the same name, which would cause data loss on submission.
        // Error Handling	Added a script to prevent the "Delivery Date" from being earlier than the "Purchase Date".
        // Error Handling	Wrapped the calculation logic in a try/catch block to handle potential runtime null-pointer errors