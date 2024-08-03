// src/components/CopyWithSource.tsx
import React from 'react';

const CopyWithSource: React.FC<{ text: string, source: string }> = ({ text, source }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        const fullText = `${text}\n\n출처: ${source}`;
        navigator.clipboard.writeText(fullText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div>
            <button onClick={handleCopy}>
                {copied ? '복사됨!' : '복사'}
            </button>
        </div>
    );
};

export default CopyWithSource;