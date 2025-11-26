'use client';

import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

interface PhotoUploadProps {
  onUploadSuccess: () => void;
}

export default function PhotoUpload({ onUploadSuccess }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    beforeUpload: async (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }

      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, ''));

      try {
        const response = await fetch('/api/photos', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        message.success('Photo uploaded successfully!');
        onUploadSuccess();
      } catch (error) {
        message.error('Failed to upload photo');
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }

      return false;
    },
    showUploadList: false,
  };

  return (
    <Dragger {...uploadProps} disabled={uploading}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag image to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for single image upload. Maximum file size: 5MB
      </p>
    </Dragger>
  );
}