'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Spin, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PhotoCard from '@/components/PhotoCard';
import PhotoUpload from '@/components/PhotoUpload';
import type { Photo } from '@/types';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos');
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUploadSuccess = () => {
    setUploadModalOpen(false);
    fetchPhotos();
  };

  const handlePhotoDelete = (id: string) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#fff', 
        padding: '0 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Title level={2} style={{ margin: 0 }}>
          Photo Gallery
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setUploadModalOpen(true)}
        >
          Upload Photo
        </Button>
      </Header>

      <Content style={{ padding: '50px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Spin size="large" />
          </div>
        ) : photos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Title level={3}>No photos yet</Title>
            <p>Upload your first photo to get started!</p>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {photos.map((photo) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={photo.id}>
                <PhotoCard
                  photo={photo}
                  onDelete={handlePhotoDelete}
                  onCommentAdded={fetchPhotos}
                />
              </Col>
            ))}
          </Row>
        )}
      </Content>

      <Modal
        title="Upload Photo"
        open={uploadModalOpen}
        onCancel={() => setUploadModalOpen(false)}
        footer={null}
        width={600}
      >
        <PhotoUpload onUploadSuccess={handleUploadSuccess} />
      </Modal>
    </Layout>
  );
}