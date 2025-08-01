import React, { useState } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link, Image, Code, Quote, Undo, Redo, Type, Palette } from 'lucide-react';

interface WYSIWYGEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ 
  content = '', 
  onChange, 
  placeholder = 'Start writing...' 
}) => {
  const [editorContent, setEditorContent] = useState(content);
  const [selectedText, setSelectedText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const handleContentChange = (newContent: string) => {
    setEditorContent(newContent);
    onChange?.(newContent);
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    const editor = document.getElementById('wysiwyg-editor');
    if (editor) {
      handleContentChange(editor.innerHTML);
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      formatText('createLink', linkUrl);
      setShowLinkDialog(false);
      setLinkUrl('');
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      formatText('insertImage', url);
    }
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', tooltip: 'Bold' },
    { icon: Italic, command: 'italic', tooltip: 'Italic' },
    { icon: Underline, command: 'underline', tooltip: 'Underline' },
    { icon: AlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', tooltip: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', tooltip: 'Align Right' },
    { icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', tooltip: 'Numbered List' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', tooltip: 'Quote' },
    { icon: Code, command: 'formatBlock', value: 'pre', tooltip: 'Code Block' },
    { icon: Undo, command: 'undo', tooltip: 'Undo' },
    { icon: Redo, command: 'redo', tooltip: 'Redo' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3">
        <div className="flex items-center space-x-1 flex-wrap gap-2">
          {/* Format Dropdown */}
          <select
            onChange={(e) => formatText('formatBlock', e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="div">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
          </select>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

          {/* Formatting Buttons */}
          {toolbarButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <button
                key={index}
                onClick={() => formatText(button.command, button.value)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title={button.tooltip}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

          {/* Link Button */}
          <button
            onClick={() => setShowLinkDialog(true)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Insert Link"
          >
            <Link className="w-4 h-4" />
          </button>

          {/* Image Button */}
          <button
            onClick={insertImage}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Insert Image"
          >
            <Image className="w-4 h-4" />
          </button>

          {/* Font Size */}
          <select
            onChange={(e) => formatText('fontSize', e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="1">8pt</option>
            <option value="2">10pt</option>
            <option value="3" selected>12pt</option>
            <option value="4">14pt</option>
            <option value="5">18pt</option>
            <option value="6">24pt</option>
            <option value="7">36pt</option>
          </select>

          {/* Text Color */}
          <input
            type="color"
            onChange={(e) => formatText('foreColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
            title="Text Color"
          />
        </div>
      </div>

      {/* Editor */}
      <div
        id="wysiwyg-editor"
        contentEditable
        className="min-h-[300px] p-4 focus:outline-none text-gray-900 dark:text-white"
        style={{ lineHeight: '1.6' }}
        onInput={(e) => handleContentChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: editorContent }}
        data-placeholder={placeholder}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Insert Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLinkDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WYSIWYGEditor;