import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import generateAction from './api/generate';

const Home = () => {
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling API...")
    // calling fetch method to send a POST request to the generate endpoint with the user input
    const response = await fetch('/api/generate',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied... ", output.text);
    
    setApiOutput(`${output.text}`)
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(apiOutput);
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>GPT3-Powered Email Writing Assistant</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write faster, better , and more efficiently</h2>
          </div>
        </div>
      </div>
      <div className='prompt-container'>
        <textarea 
          placeholder='An email...' className='prompt-box' value={userInput} 
          onChange={onUserChangedText}
        />
        <div className='prompt-buttons'>
          <a className={isGenerating ? 'generate-button loading': 'generate-button'} onClick={callGenerateEndpoint} >
            <div className='generate'>
              {isGenerating ? <span className='loader'></span>: <p>Generate</p>}
            </div>
          </a>
        </div>
        {!apiOutput && (
          <div className='prompt-info'>
            <h2 class='prompt-ex'>Some prompt examples:</h2>
            <p>1. An email to a prospective client giving details on how you will carry out the project.</p>
            <p>2. An email to developers reminding them of the upcoming deadline.</p>
            <p>3. An email to a friend asking to join a project.</p>
            <p>4. An email to a friend asking to join my team as a product manager.</p>
          </div>
        )}
        {apiOutput && (
          <div className='output'>
            <div className='ouput-header-container'>
              <div className='output-header'>
                <h3>Output</h3>
              </div>
            </div>
            <div className='output-content'>
              <p>{apiOutput}</p>
            </div>
            <div className='copy-button' >
              <p className='copy' onClick={copyOutput}>Copy</p>
            </div>
          </div>
        )}
        {apiOutput && (
          <div className='feedback copy'>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLSeKCAyLUPpaGzcafQyzrmlh3r_NIna4BIYmYwfH_MRpvrOa4w/viewform?usp=sf_link' target='_blank' rel='noreferrer'>Give us feedback</a>
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p className='hide-logo-name'>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;