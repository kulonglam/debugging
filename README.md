Type	            Fix Description

Syntax	          Corrected label for attributes to match input id (fixed supplier-contact vs supplier_contact).
Syntax	          Added missing id="product_name" to the Product Name input.
Syntax	          Fixed spelling of stationery in the category dropdown options.
Logical           Added a real-time event listener to calculate Total Amount automatically ($Quantity \times Price$).
Logical           Combined all validation checks into a single submit listener to prevent conflicting event behaviours.
Logical         	Added enctype="multipart/form-data" to the HTML form to support file uploads.
Error Handling	  Wrapped calculation logic in a try/catch block to handle unexpected null or non-numeric values.
Error Handling	  Added a preventDefault() guard to block submission if the Delivery Date is earlier than the Purchase Date.
