// src/test/CopyWithSource.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CopyWithSource from '../components/CopyWithSource';
import { act } from 'react'

test('renders copy button', () => {
    render(<CopyWithSource text="Test text" source="Test source" />);
    expect(screen.getByText('복사')).toBeInTheDocument();
});

test('copies text with source when button is clicked', async () => {
    render(<CopyWithSource text="Test text" source="Test source" />);
    const button = screen.getByText('복사');

    // `act`를 사용하여 비동기 작업을 감싸기
    await act(async () => {
        fireEvent.click(button);
    });

    expect(screen.getByText('복사됨!')).toBeInTheDocument();
});