import React, { useEffect, useRef, ReactNode } from "react";
import { addSourceToText } from "./addSourceToText";

interface CopyWithSourceProps {
  customSourceUrl?: string; // 사용자 정의 출처 URL
  children: ReactNode; // 자식 요소들을 받기 위한 prop
}

const CopyWithSource: React.FC<CopyWithSourceProps> = ({ customSourceUrl, children }) => {
  const copyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection();
      const anchorNode = selection?.anchorNode;

      if (copyContainerRef.current && anchorNode instanceof Node && copyContainerRef.current.contains(anchorNode)) {
        const selectedText = selection?.toString();

        // 빈 텍스트 복사 시 출처 추가 방지
        if (!selectedText || selectedText.trim() === "") {
          return;
        }

        // 출처가 포함된 텍스트 생성
        const sourceUrl = customSourceUrl || window.location.href; // 사용자 정의 출처 사용
        const modifiedText = addSourceToText(selectedText, sourceUrl);

        // 클립보드에 수정된 텍스트 저장
        event.clipboardData?.setData("text/plain", modifiedText);
        event.preventDefault(); // 기본 복사 동작을 방지
      }
    };

    // 복사 이벤트 리스너 등록
    document.addEventListener("copy", handleCopy);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, [customSourceUrl]);

  return <div ref={copyContainerRef}>{children}</div>; // 자식 요소를 포함하는 div 반환
};

export default CopyWithSource;