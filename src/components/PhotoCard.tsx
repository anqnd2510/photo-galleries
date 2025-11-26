'use client';

import React from 'react';
import { Card, Image, Popconfirm, message } from 'antd';
import { DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import type { Photo } from '@/types';
import CommentSection from './CommentSection';

const { Meta } = Card;

interface PhotoCardProps {
  photo: Photo;
  onDelete: (id: string) => void;
  onCommentAdded: () => void;
}

export default function PhotoCard({
  photo,
  onDelete,
  onCommentAdded,
}: PhotoCardProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/photos?id=${photo.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      message.success('Photo deleted successfully');
      onDelete(photo.id);
    } catch (error) {
      message.error('Failed to delete photo');
      console.error('Delete error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card
      hoverable
      cover={
        <div style={{ height: 250, overflow: 'hidden' }}>
          <Image
            alt={photo.title}
            src={photo.imageData}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            preview={{
              mask: 'View Image',
            }}
          />
        </div>
      }
      actions={[
        <div key="comments" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CommentOutlined />
          <span style={{ marginLeft: 8 }}>{photo.comments.length}</span>
        </div>,
        <Popconfirm
          key="delete"
          title="Delete this photo?"
          description="This action cannot be undone"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>,
      ]}
    >
      <Meta
        title={photo.title}
        description={formatDate(photo.createdAt)}
      />
      <div style={{ marginTop: 16 }}>
        <CommentSection
          photoId={photo.id}
          comments={photo.comments}
          onCommentAdded={onCommentAdded}
        />
      </div>
    </Card>
  );
}