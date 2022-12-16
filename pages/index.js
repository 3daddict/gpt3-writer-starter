import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState('');
  const [summaryLength, setLength] = useState(250);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        tone,
        summaryLength,
        userInput 
      }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };

  const onUserChangedTone = (event) => {
    //console.log(event.target.value);
    setTone(event.target.value);
  };

  const onUserChangedLength = (event) => {
    //console.log(event.target.value);
    setLength(event.target.value);
  };
  
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Profile Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write a sentence with your skills and interests.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Type your skills here..."
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="dropdown-container">
            <select className="dropdown" 
              value={tone}
              onChange={onUserChangedTone}
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="hipster">Hipster</option>
              <option value="funny">Funny</option>
            </select>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="100"
              max="500"
              value={summaryLength}
              onChange={onUserChangedLength}
              className="slider"
              id="summaryLength"
            />
            <p>Summary Length: {summaryLength}</p>
          </div>
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
      
    </div>
  );
};

export default Home;
