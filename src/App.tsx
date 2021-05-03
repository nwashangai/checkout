import React, { useState } from 'react';

// Components
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Checkbox from 'components/Checkbox';
import Card from 'components/Card';

// Styles
import './App.scss';

const initialState = {
  type: 'credit',
  cardNumber: '',
  expiry: '',
  cvv: '',
  errorMessage: '',
  successMessage: ''
}


const App = () => {
  const [state, setState] = useState<any>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateType = (value: string) => {
    setState({
      ...state,
      type: value
    })
  }

  const setCardNumber = (value: string) => {
    if (value.length <= 19) {
      const filtered = value.replace(/\ /g, '');

      if (!isNaN(Number(filtered))) {
        const data = filtered.match(/.{1,4}/g)
        const newData = data?.join(' ');
        setState({
          ...state,
          cardNumber: newData
        })
      }
    }
  }

  const setExpirey = (value: string) => {
    if (value.length <= 5) {
      const filtered = value.replace(/\//g, '')
      
      if (!isNaN(Number(filtered))) {
        const data = filtered.match(/.{1,2}/g)
        const newData = data?.join('/');
        setState({
          ...state,
          expiry: newData
        })
      }
    }
  }

  const setCVV = (value: string) => {
    if (value.length <= 3) {
      setState({
        ...state,
        cvv: value
      })
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setState({...state, errorMessage: '', successMessage: ''})
      const data = {
        type: state.type,
        cardNumber: state.cardNumber.replace(/\ /g, ''),
        expiry: state.expiry.replace(/\//g, ''),
        cvv: state.cvv,
      }

      if (data.cardNumber.length < 16) {
        throw new Error('card number should b 16 digits')
      }

      if (data.expiry.length < 4) {
        throw new Error('incorrect expiry date')
      }

      if (isNaN(Number(data.cvv)) || data.cvv.length < 3) {
        throw new Error('invalid cvv')
      }

      await new Promise((resolve, reject) => {
        setTimeout(_=> {
          localStorage.setItem('card-data', JSON.stringify(data));
          resolve(true)
        }, 2000)
      })
      
      

    } catch (error) {
      setState({ ...state, errorMessage: error.message})
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Welcome to Our Checkoot Page</h1>
        <span>fill out the form below to submit your payment details</span>
      </header>
      <main>
        <Card title="Payment Method">
          <div className="payment">
            <p>
              <Checkbox name="Paypal" isActive={state.type === 'paypal'} value={'paypal'} onClick={updateType}></Checkbox>
              <Checkbox name="Credit or Debit Card" isActive={state.type === 'credit'} value={'credit'} onClick={updateType}></Checkbox>
            </p>
            <div>
              <TextInput
                label="Card Number"
                placeholder="0000 0000 0000 0000"
                value={state.cardNumber}
                onChange={(e: any) => setCardNumber(e.target.value)}
              />
            </div>
            <div>
              <TextInput
                label="Expiry Date"
                placeholder="MM/YY"
                value={state.expiry}
                onChange={(e: any) => setExpirey(e.target.value)}
              />
              <TextInput
                type="password"
                label="CVC/CVV"
                placeholder="***"
                value={state.cvv}
                onChange={(e: any) => setCVV(e.target.value)}
              />
            </div>
            {state.errorMessage && <span className="error-message">{state.errorMessage}</span>}
          </div>
        </Card>
        <Card title="Summary">
          <div className="summary">
            <p>
              <span>Pro (Biled Monthly)</span>
              <span>$99.00</span>
            </p>
            <p>
              <span>Refeeral Bonus</span>
              <span>$2.00</span>
            </p>
            <p>
              <span>Vat</span>
              <span>$0.00</span>
            </p>
            <p>
              <span>Today you will be billed</span>
              <span>$0.00</span>
            </p>
            {state.successMessage && <span className="success-message">{state.successMessage}</span>}
            <p>
              <Button
                onClick={handleSubmit}
                disabled={false}
                isLoading={isLoading}
                name="Pay"
                classes="pay__btn"
              />
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default App;
