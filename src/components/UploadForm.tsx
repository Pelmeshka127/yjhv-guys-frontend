import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Title, Paper, FileInput, Button, Group, LoadingOverlay, Avatar, Box, Image} from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import avitoIcon2 from '../assets/avito2.png';
import avitoIcon1 from '../assets/avito.png';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (file) => {
      setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:8081/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false);
      navigate('/result', { state: { data: response.data } });
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Box mb="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image 
          src={avitoIcon1 || "/placeholder.svg"} 
          alt="Avito Logo" 
          width={200}
          height={100}
          fit="contain"
        />
      </Box>

      <Paper withBorder shadow="md" p={80} radius="md" pos="relative">
        {/* Исправленный LoadingOverlay - удален проблемный атрибут */}
        <LoadingOverlay visible={loading} />
        
        <Group position="center" mb="xl">
          <Avatar src={avitoIcon2} alt="Avito Logo" size={64} radius="xl" />
          <Title order={1} align="center">Загрузить фото машины</Title>
        </Group>
        
        <form onSubmit={handleSubmit}>
          <FileInput
            label="Выберите изображение"
            placeholder="Нажмите для загрузки"
            icon={<IconUpload size={14} />}
            required
            onChange={handleFileChange}
            mb="md"
          />
            
          <Button 
            fullWidth 
            type="submit" 
            disabled={loading}
            loading={loading}
          >
            {loading ? 'Загрузка...' : 'Анализировать фото'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default UploadForm;