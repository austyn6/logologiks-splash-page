import React from 'react';
import Hero from './components/Hero';
import ContactForm from './components/ContactForm';
import './styles/Styles.css';
import './styles/Hero.css';
import './styles/ContactForm.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <ContactForm />
    </div>
  );
}

export default App;
