'use client';
import { useState } from 'react';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="메뉴">
        {open ? '✕' : '☰'}
      </button>
      {open && (
        <div className="mobile-menu" onClick={close}>
          <a href="/story">박용군 이야기</a>
          <a href="/diagnose">폐업 진단</a>
          <a href="/match">코치 매칭</a>
          <a href="/resume">실패 경력서</a>
        </div>
      )}
    </>
  );
}
