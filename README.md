## react-keyword-input

### A react component to create an input field that allows the user to enter keywords followed by enter or comma, and delete the previous keyword using the backspace key

To use, make sure you have React installed.

Then run 
```
npm i react-keyword-input
```

import the package at the top of your component,
and pass in a *useState* hook to the component.

Other values that can be passed in are *style={}* which is an object that dictates the styling of the input component, and *showValues=false* which dictates whether the array be printed underneath the input field.
```jsx
import React, {useState} from 'react';
import KeywordInput from 'react-keyword-input';

function App() {
    const [keywords, setKeywords] = { 
        keywords: [] 
    }

    return (
        <div>
            <KeywordInput 
                keywordObject={keywords} 
                setKeywordObject={setKeywords} 
                style={borderRadius: "5px"} 
                showValues={true} />
        </div>
    )
}
```
