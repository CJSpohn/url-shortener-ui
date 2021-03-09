import React from 'react';
import './UrlContainer.css';

const UrlContainer = ({ urls, deleteCard }) => {
  let urlEls = [];
  if (urls) {
    urlEls = urls.map((url, index) => {
      return (
        <div key={index} className="url">
          <h3>{url.title}</h3>
          <a href={url.short_url} target="blank">{url.short_url}</a>
          <p>{url.long_url}</p>
          <button className="del-btn" onClick={() => deleteCard(url.id)}>Delete</button>
        </div>
      )
    });
  }

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
