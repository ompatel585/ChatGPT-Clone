const ContentParser = ({ content }) => {
  const parseContent = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    const parts = [];

    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(<span key={parts.length}>{text.slice(lastIndex, match.index)}</span>);
      }

      const lang = match[1] || 'text';
      const code = match[2].trim();

      parts.push(
        <div key={`code-${parts.length}`} className="my-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">`{lang}`</span>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded transition-colors text-gray-300"
              title="Copy code"
            >
              Copy
            </button>
          </div>
          <pre className={`p-3 bg-gray-900/50 border border-gray-700 rounded-xl text-sm overflow-x-auto font-mono ${getLangClass(lang)}`}>
            <code>{code}</code>
          </pre>
        </div>
      );

      lastIndex = codeBlockRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key={parts.length}>{text.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : <span>{text}</span>;
  };

  const getLangClass = (lang) => {
    const classes = {
      js: 'text-yellow-300',
      javascript: 'text-yellow-300',
      ts: 'text-blue-300',
      typescript: 'text-blue-300',
      py: 'text-orange-300',
      python: 'text-orange-300',
      java: 'text-red-300',
      cpp: 'text-blue-400',
      cs: 'text-blue-400',
      html: 'text-orange-400',
      css: 'text-pink-400',
      json: 'text-green-400',
      md: 'text-gray-300',
      text: 'text-gray-300',
    };
    return classes[lang.toLowerCase()] || 'text-gray-300';
  };

  return <div className="whitespace-pre-wrap">{parseContent(content)}</div>;
};

export default ContentParser;

