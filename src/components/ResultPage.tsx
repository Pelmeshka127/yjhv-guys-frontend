import { useLocation } from 'react-router-dom';
import { Container, Title, Image, Button, Group, Box, Grid, Paper, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

// Импорт логотипа Avito (уточните путь)
import avitoIcon1 from '../assets/avito.png'; 

function ResultPage() {
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();

  if (!data) {
    return <div>Данные недоступны</div>;
  }

  // Если бэкенд на другом домене, добавляем базовый URL
  const imageUrl = data.processed_image.startsWith('/')
    ? `http://localhost:8081${data.processed_image}`
    : data.processed_image;

  return (
    <Container size="lg" py="xl">
      {/* Логотип и кнопка "Назад" в одной строке */}
      <Group position="apart" mt="xl" mb="xl">
        <Image 
          src={avitoIcon1} 
          alt="Avito Logo" 
          width={100}
          height={50}
          fit="contain"
        />
        <Button onClick={() => navigate('/')}>
          Назад
        </Button>
      </Group>

      {/* Основной контент в двух колонках */}
      <Grid gutter="xl">
        {/* Левая колонка с изображением */}
        <Grid.Col span={6}>
          <Image
            src={imageUrl}
            alt="Обработанное фото"
            radius="md"
            style={{ maxWidth: '100%' }}
          />
        </Grid.Col>

        {/* Правая колонка с текстом и формой */}
        <Grid.Col span={6}>
          <Paper 
            shadow="sm" 
            p="xl" 
            radius="md" 
            withBorder
            style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <Title order={3} mb="md">Результаты анализа</Title>
            <Text size="lg" color="dimmed" mb="xl">
              Классификация: <strong>{data.classification}</strong>
            </Text>

            {/* Дополнительное оформление (например, статистика или описание) */}
            <Box mt="auto">
              <Text size="sm" color="gray">
                Это пример дополнительного текста. Здесь можно добавить больше информации о результате анализа.
              </Text>
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default ResultPage;