import React, { useEffect, useRef } from 'react';

function KeywordInput(keywordObject, setKeywordObject, style = {}, showValues = true) {
  const textareaRef = useRef();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        const inputKeywords = textareaRef.current.value
          .split(',')
          .map((keyword) => keyword.trim())
          .filter((keyword) => keyword !== '');

        if (inputKeywords.length > 0) {
          const updatedKeywords = [...keywordObject.keywords, ...inputKeywords];
          setKeywordObject({ ...keywordObject, keywords: updatedKeywords });

          textareaRef.current.value = '';
        }
      }
    };

    const handleBackspace = (event) => {
      if (event.key === 'Backspace' && textareaRef.current.selectionStart === 0 && textareaRef.current.selectionEnd === 0) {
        event.preventDefault();
        const lastKeyword = keywordObject.keywords[keywordObject.keywords.length - 1];
        if (lastKeyword) {
          const updatedKeywords = keywordObject.keywords.slice(0, -1);
          setKeywordObject({ ...keywordObject, keywords: updatedKeywords });

          textareaRef.current.value = lastKeyword;
        }
      }
    };

    textareaRef.current.addEventListener('keydown', handleKeyPress);
    textareaRef.current.addEventListener('keydown', handleBackspace);

    return () => {
      // Clean up the event listeners
      textareaRef.current.removeEventListener('keydown', handleKeyPress);
      textareaRef.current.removeEventListener('keydown', handleBackspace);
    };
  }, [keywordObject]);

  const handleKeywordClick = (index) => {
    // Remove the clicked keyword from the array
    const updatedKeywords = keywordObject.keywords.filter((_, i) => i !== index);
    setKeywordObject({ ...keywordObject, keywords: updatedKeywords });
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        placeholder="Enter comma-separated keywords and press Enter"
        rows={4}
        style={style}
      />
      <div>
        {showValues && <p>
          Keywords: [
          {keywordObject.keywords.map((keyword, index) => (
            <span
              key={index}
              onClick={() => handleKeywordClick(index)}
              style={{ cursor: 'pointer' }}
            >
              {keyword}
              {index !== keywordObject.keywords.length - 1 ? ', ' : ''}
            </span>
          ))}
          ]
        </p>}
      </div>
    </div>
  );
}

export default KeywordInput;
