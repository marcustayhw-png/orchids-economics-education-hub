"use client";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Parse markdown and render images
  const parseMarkdown = (text: string) => {
    const parts: Array<{ type: 'text' | 'image'; content: string; alt?: string }> = [];
    
    // Regex to match ![alt](url)
    const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = imageRegex.exec(text)) !== null) {
      // Add text before the image
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }

      // Add the image
      parts.push({
        type: 'image',
        content: match[2], // URL
        alt: match[1] || 'Image'
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }

    return parts;
  };

  const parts = parseMarkdown(content);

  return (
    <div className={className}>
      {parts.map((part, index) => {
        if (part.type === 'image') {
          return (
            <div key={index} className="my-4">
              <img
                src={part.content}
                alt={part.alt}
                className="max-w-full h-auto rounded-lg border border-border"
                loading="lazy"
              />
            </div>
          );
        } else {
          return (
            <div key={index} className="whitespace-pre-wrap">
              {part.content}
            </div>
          );
        }
      })}
    </div>
  );
}
