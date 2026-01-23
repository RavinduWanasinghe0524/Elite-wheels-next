/**
 * SplitText Utility
 * Splits text into animatable lines and words for cinematic typography reveals
 */

export interface SplitTextOptions {
  type?: 'lines' | 'words' | 'chars' | 'lines,words';
  linesClass?: string;
  wordsClass?: string;
  charsClass?: string;
}

export class SplitText {
  private element: HTMLElement;
  private originalHTML: string;
  public lines: HTMLElement[] = [];
  public words: HTMLElement[] = [];
  public chars: HTMLElement[] = [];

  constructor(element: HTMLElement | string, options: SplitTextOptions = {}) {
    this.element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!this.element) {
      throw new Error('SplitText: Element not found');
    }

    this.originalHTML = this.element.innerHTML;
    this.split(options);
  }

  private split(options: SplitTextOptions) {
    const { 
      type = 'lines,words', 
      linesClass = 'split-line',
      wordsClass = 'split-word',
      charsClass = 'split-char'
    } = options;

    const text = this.element.textContent || '';
    const types = type.split(',');

    if (types.includes('lines') || types.includes('words')) {
      this.splitIntoLines(linesClass, wordsClass, types.includes('words'));
    }

    if (types.includes('chars') && !types.includes('words')) {
      this.splitIntoChars(charsClass);
    }
  }

  private splitIntoLines(linesClass: string, wordsClass: string, splitWords: boolean) {
    // Store original styles
    const computedStyle = window.getComputedStyle(this.element);
    
    // Create temporary container to measure line breaks
    const temp = document.createElement('div');
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    temp.style.width = computedStyle.width;
    temp.style.font = computedStyle.font;
    temp.style.lineHeight = computedStyle.lineHeight;
    temp.style.letterSpacing = computedStyle.letterSpacing;
    temp.innerHTML = this.originalHTML;
    document.body.appendChild(temp);

    const words = this.originalHTML.split(/\s+/);
    const lines: string[][] = [];
    let currentLine: string[] = [];
    let currentLineY = 0;

    // Create spans for each word to detect line breaks
    temp.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
    const wordSpans = temp.querySelectorAll('span');

    wordSpans.forEach((span, index) => {
      const rect = span.getBoundingClientRect();
      if (currentLineY === 0) {
        currentLineY = rect.top;
      }

      if (rect.top > currentLineY + 1) {
        // New line detected
        lines.push([...currentLine]);
        currentLine = [words[index]];
        currentLineY = rect.top;
      } else {
        currentLine.push(words[index]);
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    document.body.removeChild(temp);

    // Build the HTML with line wrappers
    const linesHTML = lines.map(lineWords => {
      const lineContent = splitWords
        ? lineWords.map(word => `<span class="${wordsClass}">${word}</span>`).join(' ')
        : lineWords.join(' ');
      
      return `<div class="${linesClass}" style="overflow: hidden;"><div style="display: inline-block;">${lineContent}</div></div>`;
    }).join('');

    this.element.innerHTML = linesHTML;

    // Store references
    this.lines = Array.from(this.element.querySelectorAll(`.${linesClass}`));
    if (splitWords) {
      this.words = Array.from(this.element.querySelectorAll(`.${wordsClass}`));
    }
  }

  private splitIntoChars(charsClass: string) {
    const text = this.element.textContent || '';
    const charsHTML = text.split('').map(char => {
      return char === ' ' 
        ? ' ' 
        : `<span class="${charsClass}">${char}</span>`;
    }).join('');

    this.element.innerHTML = charsHTML;
    this.chars = Array.from(this.element.querySelectorAll(`.${charsClass}`));
  }

  public revert() {
    this.element.innerHTML = this.originalHTML;
    this.lines = [];
    this.words = [];
    this.chars = [];
  }
}

/**
 * React Hook for SplitText
 */
import { useEffect, useRef, MutableRefObject } from 'react';

export function useSplitText<T extends HTMLElement>(
  options: SplitTextOptions = {}
): [MutableRefObject<T | null>, SplitText | null] {
  const ref = useRef<T>(null);
  const splitTextRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (ref.current && !splitTextRef.current) {
      splitTextRef.current = new SplitText(ref.current, options);
    }

    return () => {
      if (splitTextRef.current) {
        splitTextRef.current.revert();
        splitTextRef.current = null;
      }
    };
  }, []);

  return [ref, splitTextRef.current];
}
