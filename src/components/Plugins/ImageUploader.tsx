import React, { useState, useRef } from 'react';
import { Upload, X, Image, File, Check, AlertCircle, Eye, Download, Trash2 } from 'lucide-react';

interface UploadedImage {
  id: string;
  name: string;
  size: number;
  url: string;
  type: string;
  uploadDate: string;
}

interface ImageUploaderProps {
  onUpload?: (images: UploadedImage[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  maxFiles = 10,
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    setError(null);
    
    // Validate file count
    if (uploadedImages.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate files
    const validFiles = files.filter(file => {
      if (!acceptedTypes.includes(file.type)) {
        setError(`File type ${file.type} not supported`);
        return false;
      }
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);

    try {
      const newImages: UploadedImage[] = [];
      
      for (const file of validFiles) {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const imageUrl = URL.createObjectURL(file);
        const newImage: UploadedImage = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          url: imageUrl,
          type: file.type,
          uploadDate: new Date().toISOString()
        };
        
        newImages.push(newImage);
      }

      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      onUpload?.(updatedImages);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (id: string) => {
    const updatedImages = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(updatedImages);
    onUpload?.(updatedImages);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Image Uploader</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Upload up to {maxFiles} images. Max size: {maxSize}MB per file.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Drop images here or click to browse
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Supports: JPEG, PNG, GIF, WebP
            </p>
          </div>
          
          {uploading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-blue-600 dark:text-blue-400">Uploading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
        </div>
      )}

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Uploaded Images ({uploadedImages.length})
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="aspect-video bg-gray-200 dark:bg-gray-600 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setPreviewImage(image.url)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {image.name}
                    </h5>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{formatFileSize(image.size)}</span>
                    <span>{new Date(image.uploadDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPreviewImage(image.url)}
                      className="flex-1 flex items-center justify-center space-x-1 px-2 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => copyImageUrl(image.url)}
                      className="flex-1 flex items-center justify-center space-x-1 px-2 py-1 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded text-xs hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Copy URL</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;