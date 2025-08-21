//DONATION PAGE

// On submit
document.getElementById('donationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const purpose = document.getElementById('donationPurpose').value;
  const amount = parseInt(document.getElementById('amount').value);
  const email = document.getElementById('emailAddress').value;
  const name = document.getElementById('fullName').value;
  const phone = document.getElementById('phoneNumber').value;

  if (!amount || amount < 1000) {
    alert("Please enter a valid donation amount (minimum ₦1000).");
    return;
  }

  PaystackPop.setup({
    key: 'pk_live_8b68928947729b9ee2b6b5575143a74ae67f1ee6', // Replace with your Paystack public key
    email: email,
    amount: amount * 100, // in kobo
    currency: "NGN",
    ref: '' + Math.floor(Math.random() * 1000000000 + 1),
    metadata: {
      custom_fields: [
        { display_name: "Full Name", variable_name: "full_name", value: name },
        { display_name: "Phone", variable_name: "phone_number", value: phone },
        { display_name: "Donation Purpose", variable_name: "donation_purpose", value: purpose }
      ]
    },
    callback: function(response) {
      alert("Thank you for donating to " + purpose + "! Ref: " + response.reference);
      document.getElementById('donationForm').reset();
    },
    onClose: function() {
      alert("Donation process was canceled.");
    }
  }).openIframe();
});

// Run prefill on page load
window.onload = setDonationPurposeFromURL;