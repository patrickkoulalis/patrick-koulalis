// Live Key
const stripe = Stripe("pk_live_6hiU9mzkB5WvD6quYQ7BK5jd");
// Development Key
// const stripe = Stripe("pk_test_yTxwWJhOPvOYxTEo9oVzXWqy");
const elements = stripe.elements();

const style = {
  base: {
    color: "#32325d",
    lineHeight: "18px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

const card = elements.create("card", { style });
const cardElement = document.querySelector("#card-element");
if (cardElement) {
  card.mount("#card-element");

  // Handle real-time validation errors from the card Element.
  card.addEventListener("change", function(event) {
    var displayError = document.getElementById("card-errors");
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = "";
    }
  });

  // Handle form submission.
  const paymentForm = document.getElementById("payment-form");
  if (paymentForm) {
    paymentForm.addEventListener("submit", function(event) {
      event.preventDefault();
      createToken(paymentForm);
    });
  }

  const addNewCardForm = document.getElementById("add-card");
  if (addNewCardForm) {
    addNewCardForm.addEventListener("submit", function(event) {
      event.preventDefault();
      createToken(addNewCardForm);
    });
  }

  function createToken(form) {
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById("card-errors");
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        stripeTokenHandler(result.token, form);
      }
    });
  }

  function stripeTokenHandler(token, form) {
    // Insert the token ID into the form so it gets submitted to the server
    var hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "stripeToken");
    hiddenInput.setAttribute("value", token.id);
    form.appendChild(hiddenInput);
    // Submit the form
    form.submit();
  }
}
