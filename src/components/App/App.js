import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

const App = () => {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(false);

  const loadUrls = async () => {
    try {
      const fetchedUrls = await getUrls()
      setUrls(fetchedUrls.urls)
    } catch(e) {
      setError(true)
    }
  }

  const shortenUrl = async (url, title) => {
    setError(false);
    try {
      const postedUrl = await postUrl(url, title);
      loadUrls()
    } catch(e) {
      setError(true)
    }
  }

  useEffect(() => {
    loadUrls()
  }, [])

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        {error && <h1>Sorry something went wrong</h1>}
        <UrlForm shortenUrl={shortenUrl}/>
      </header>
      <UrlContainer urls={urls}/>
    </main>
  )
}

export default App;
