import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

const App = () => {
  const [urls, setUrls] = useState([]);

  const loadUrls = async () => {
    const fetchedUrls = await getUrls()
    setUrls(fetchedUrls.urls)
  }

  const shortenUrl = url => {
    
  }

  useEffect(() => {
    loadUrls()
  }, [])

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm shortenUrl={shortenUrl}/>
      </header>
      <UrlContainer urls={urls}/>
    </main>
  )
}

export default App;
