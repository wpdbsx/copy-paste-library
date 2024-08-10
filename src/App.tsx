import React from 'react';
import CopyWithSource from './components/CopyWithSource';

function App() {
    const customUrl = "https://custom-source-url.com";

    return (
        <div>
            <CopyWithSource customSourceUrl={customUrl} >
                <div>
                    <h1>출처가 자동으로 추가됩니다.</h1>

                    <p>이 텍스트를 복사하면 지정된 출처가 포함됩니다.</p>
                </div>

            </CopyWithSource>

            <div>
                복사가 안됩니다
            </div>
        </div>

    );
}

export default App;