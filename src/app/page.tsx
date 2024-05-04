'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from './components/Button/Button';
import './globals.css';
import { Header } from './components/Header/Header';

export default function Home() {
  return (
    <>
      <main>
        <Header
          imgSrc="/static/assets/kramp-logo.svg"
          tooltipText="Welcome to Kramp"
        />
        <Link href="/characters">
          <p className="home-page-btn">
            <Button btnLabel="Click to view assignment" />
          </p>
        </Link>
      </main>
    </>
  );
}
