import React, { useState } from 'react';
import "./exp.css";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey:"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",
});
delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);
let textUp = "#include<iostream>/n using namespace std;/n int main()/n{/nint x=9,y=8;/ncout<<x+y;/n}/n";
function Explain() {
  const [explanation, setExplanation] = useState('');

  const explainCode = async () => {
    textUp = document.getElementById("code").value;
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Explain this code :" + textUp,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\"\"\""],
      });
      const exp = JSON.parse(response.request.response);
      setExplanation(exp.choices[0].text);
      console.log(explanation)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea defaultValue={textUp}
      id='code'/>
      <br/>
      <button onClick={explainCode}>Explain Code</button>
      <p style={{
        color:"black",
        fontSize:"1.2 em"
      }}>{explanation}</p>
    </div>
  );
}

export default Explain;