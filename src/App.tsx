import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';

enum MessageType {
  updateCookie = 'UPDATE_COOKIE'
}

interface IData {
  type: MessageType;
  domain: string;
  email?: string;
  shipping?: {
    company?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    unit?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phone?: string;
    alternatePhone?: string;
  };
  billing?: {
    company?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    unit?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phone?: string;
    alternatePhone?: string;
  }
}

function App() {
  useEffect(() => {
    console.log('iframe loaded');
    const postMessageCallback = function (e: MessageEvent<IData>) {
      const origin = e.origin;
      if(!origin.includes('tix') || !origin.includes('fansight')) return;
      console.log('got post message', e);
      const { type, domain, ...rest } = e.data;
      if (type === MessageType.updateCookie) {
        console.log('set cookies');
        Cookies.set('customerPrefill', `${encodeURIComponent(JSON.stringify({
          ...rest,
        }))};`, {
          domain,
          path: '/',
          secure: true,
          sameSite: 'None'
        })
        console.log('get cookies', Cookies.get('customerPrefill'));
      }
    }
    window.addEventListener('message', postMessageCallback, false);
    return () => window.removeEventListener('message', postMessageCallback, false);
  }, [])

  return (
    <div className="App">
      <h1>Test cookies</h1>
    </div>
  );
}

export default App;
