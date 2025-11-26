'use client';

import React, { useState } from 'react';
import { List, Input, Button, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import type { Comment } from '@/types';

const { TextArea } = Input;

interface CommentSectionProps {
  photoId: string;
  comments: Comment[];
  onCommentAdded: () => void;
}

export default function CommentSection({
  photoId,
  comments,
  onCommentAdded,
}: CommentSectionProps) {
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      message.warning('Please enter a comment');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/photos/${photoId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentText }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      message.success('Comment added successfully');
      setCommentText('');
      onCommentAdded();
    } catch (error) {
      message.error('Failed to add comment');
      console.error('Comment error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <List
        dataSource={comments}
        locale={{ emptyText: 'No comments yet' }}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              description={
                <div>
                  <p style={{ margin: 0 }}>{comment.content}</p>
                  <span style={{ fontSize: 12, color: '#999' }}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
        style={{ maxHeight: 200, overflow: 'auto', marginBottom: 12 }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <TextArea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          autoSize={{ minRows: 1, maxRows: 3 }}
          onPressEnter={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSubmit}
          loading={submitting}
        />
      </div>
    </div>
  );
}