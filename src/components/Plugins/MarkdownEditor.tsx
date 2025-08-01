import React, { useState } from 'react';
import { Eye, Edit, Bold, Italic, Code, Link, Image, List, ListOrdered, Quote, Heading, Save } from 'lucide-react';

interface MarkdownEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  content = '', 
  onChange, 
  placeholder = '# Start writing in Markdown...' 
}) => {
  const [markdown, setMarkdown] = useState(content);
  const [isPreview, setIsPreview] = useState(false);

  const handleContentChange = (newContent: string) => {
    setMarkdown(newContent);
    onChange?.(newContent);
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    const newText = markdown.substring(0, start) + before + selectedText + after + markdown.substring(end);
    
    handleContentChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown renderer for preview
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/`(.*)`/gim, '<code class="bg-gray-100 dark:bg-gray-700 px-1 rounded">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-500 hover:underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto rounded" />')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
      .replace(/\n/gim, '<br>');
  };

  const toolbarButtons = [
    { icon: Heading, action: () => insertMarkdown('# '), tooltip: 'Heading' },
    { icon: Bold, action: () => insertMarkdown('**', '**'), tooltip: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), tooltip: 'Italic' },
    { icon: Code, action: () => insertMarkdown('`', '`'), tooltip: 'Inline Code' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), tooltip: 'Link' },
    { icon: Image, action: () => insertMarkdown('![alt](', ')'), tooltip: 'Image' },
    { icon: List, action: () => insertMarkdown('- '), tooltip: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('1. '), tooltip: 'Numbered List' },
    { icon: Quote, action: () => insertMarkdown('> '), tooltip: 'Quote' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {toolbarButtons.map((button, index) => {
              const Icon = button.icon;
              return (
                <button
                  key={index}
                  onClick={button.action}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  title={button.tooltip}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                isPreview 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {isPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm">{isPreview ? 'Edit' : 'Preview'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="relative">
        {isPreview ? (
          <div 
            className="min-h-[400px] p-4 prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
          />
        ) : (
          <textarea
            id="markdown-textarea"
            value={markdown}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-[400px] p-4 bg-transparent border-none resize-none focus:outline-none text-gray-900 dark:text-white font-mono text-sm leading-relaxed"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Lines: {markdown.split('\n').length}</span>
            <span>Words: {markdown.split(/\s+/).filter(word => word.length > 0).length}</span>
            <span>Characters: {markdown.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Markdown</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;