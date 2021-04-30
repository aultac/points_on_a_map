import React, {useState} from 'react';


export default function() {

  const [count, setCount] = useState(0);

  const buttonClicked = function() {
    setCount(count+1);
    console.log('The button was clicked ', count, ' times');
  }

  return <div>
    <h1>Hello, I am the app</h1>
    <div>
      The count is {count} <br/>
      <button id="thebutton" onClick={buttonClicked}>I am the button</button>
    </div>
  </div>;
}
