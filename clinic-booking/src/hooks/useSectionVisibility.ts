import { useState, useEffect, useRef, RefObject } from 'react';

interface VisibleSections {
  [key: string]: boolean;
}

interface SectionRefs {
  [key: string]: RefObject<HTMLDivElement>;
}

export function useSectionVisibility(sectionNames: string[]) {
  const [visibleSections, setVisibleSections] = useState<VisibleSections>({});
  
  // Use useRef to store refs persistently across renders
  const refsStore = useRef<SectionRefs | null>(null);
  
  // Initialize refs only once
  if (refsStore.current === null) {
    const refObj: SectionRefs = {};
    sectionNames.forEach(name => {
      refObj[name] = { current: null } as unknown as RefObject<HTMLDivElement>;
    });
    refsStore.current = refObj;
  }

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section');
          if (sectionName) {
            setVisibleSections((prev) => ({
              ...prev,
              [sectionName]: true,
            }));
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    if (refsStore.current) {
      Object.entries(refsStore.current).forEach(([name, ref]) => {
        if (ref.current) {
          ref.current.setAttribute('data-section', name);
          observer.observe(ref.current);
        }
      });
    }

    return () => observer.disconnect();
  }, []); // Empty dependency array - only run once

  // Trigger hero animation immediately on mount
  useEffect(() => {
    if (sectionNames.includes('hero')) {
      setVisibleSections(prev => ({ ...prev, hero: true }));
    }
  }, []); // Empty dependency array - only run once

  return { visibleSections, refs: refsStore.current };
}