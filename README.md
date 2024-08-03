# Copy-Paste Library

## 프로젝트 개요

`copy-paste-library`는 텍스트를 복사하고 출처를 표시하는 React 컴포넌트를 제공합니다. 이 라이브러리는 사용자가 제공한 텍스트와 출처 정보를 결합하여 클립보드에 복사하는 기능을 구현합니다.

## 설치 방법

### npm을 이용한 설치

```bash
npm install copy-paste-library
```

## 사용법

```bash
import React from 'react';
import CopyPasteComponent from 'copy-paste-library';

function App() {
  const text = "이것은 복사될 텍스트입니다.";
  const source = "출처: OpenAI";

  return (
    <div>
      <h1>Copy-Paste Library 데모</h1>
      <CopyPasteComponent text={text} source={source} />
    </div>
  );
}

export default App;

```

## 라이센스

ISC License

Copyright (c) 2024 Je

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
