import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import './App.css';

const stripePromise = loadStripe('pk_test_51NzdnlSB5Vd7i9JHt295MNZuN4CGsddMc3KB8QegkiAXtDLJ79eGY9rRN1vgfxCaXE6IqcXo7xnVwPpgSQbB1EWy00TWNKFIBr');


const App = () => {


  return (
    <div className="App">
      <header className="App-header">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>

        {/* <button type="button" onClick={checkout} >Pay here</button> */}

      </header>
    </div>
  );
}

export default App;
