import { useLocation } from 'react-router-dom';
import { Container, Title, Image, Button, Box, Grid, Paper, Text, List, Skeleton, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import avitoIcon1 from '../assets/avito.png'; 

function ResultPage() {
  const location = useLocation();
  const { data: locationData } = location.state || {};
  const navigate = useNavigate();

  // Используем TanStack Query для получения данных анализа
  const { data: analysisData, isLoading, isError } = useQuery({
    queryKey: ['analysis', locationData?.processed_image],
    queryFn: async () => {
      if (!locationData?.processed_image) return null;
      
      // Здесь можно добавить реальный запрос к API, если данные нужно догружать
      // В текущей реализации используем данные из location.state
      return locationData.analysis || null;
    },
    staleTime: 60 * 1000, // 1 минута до устаревания данных
    refetchOnWindowFocus: false,
  });

  if (!locationData) {
    return (
      <Container size="lg" py="xl">
        <Text>Данные недоступны</Text>
        <Button onClick={() => navigate('/')} mt="md">
          Вернуться на главную
        </Button>
      </Container>
    );
  }

  const imageUrl = locationData.processed_image.startsWith('/')
    ? `http://localhost:8081${locationData.processed_image}`
    : locationData.processed_image;

  return (
    <Container size="lg" py="xl">
      {/* Исправленный заголовок с логотипом и кнопкой */}
      <Flex 
        justify="center" 
        align="center" 
        gap="xl" 
        mt="xl" 
        mb="xl"
        style={{ position: 'relative' }}
      >
        <Image 
          src={avitoIcon1 || "/placeholder.svg"} 
          alt="Avito Logo" 
          width={150}
          height={80}
          fit="contain"
        />
        <Button 
          onClick={() => navigate('/')}
          size="lg"
          style={{
            position: 'absolute',
            right: 0,
            fontSize: '16px',
            padding: '12px 24px'
          }}
        >
          Назад
        </Button>
      </Flex>

      <Grid gutter="xl" align="stretch">
        {/* Левая колонка с изображением */}
        <Grid.Col span={6}>
          <Paper 
            withBorder 
            radius="md" 
            style={{ 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              backgroundColor: '#f8f9fa'
            }}
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt="Обработанное фото"
              radius="md"
              style={{ 
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </Paper>
        </Grid.Col>

        {/* Правая колонка с описанием */}
        <Grid.Col span={6}>
          <Paper 
            shadow="sm" 
            p="xl" 
            radius="md" 
            withBorder
            style={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f8f9fa'
            }}
          >
            <Box style={{ flex: 1 }}>
              <Title order={3} mb="md">Результаты анализа</Title>
              <Text size="lg" color="dimmed" mb="xl">
                Классификация: <strong>{locationData.classification}</strong>
              </Text>

              {isLoading ? (
                <Box>
                  <Skeleton height={20} mb="sm" width="60%" />
                  <Skeleton height={16} mb="xs" />
                  <Skeleton height={16} mb="xs" />
                  <Skeleton height={16} mb="xs" />
                  <Skeleton height={16} mb="xl" />
                  
                  <Skeleton height={20} mb="sm" width="50%" />
                  <Skeleton height={16} mb="xs" />
                  <Skeleton height={16} mb="xl" />
                </Box>
              ) : isError ? (
                <Text color="red">Ошибка загрузки данных анализа</Text>
              ) : analysisData ? (
                <>
                  <Box mb="xl">
                    <Text size="lg" weight={500} mb="sm">Детали автомобиля:</Text>
                    <List spacing="sm" size="sm" mb="md">
                      <List.Item>Марка: <strong>{analysisData.make}</strong></List.Item>
                      <List.Item>Модель: <strong>{analysisData.model}</strong></List.Item>
                      <List.Item>Год выпуска: <strong>{analysisData.year}</strong></List.Item>
                      <List.Item>Цвет: <strong>{analysisData.color}</strong></List.Item>
                      <List.Item>Состояние: <strong>{analysisData.condition}</strong></List.Item>
                      <List.Item>Диапазон цен: <strong>{analysisData.price_range}</strong></List.Item>
                    </List>
                  </Box>

                  <Box mb="xl">
                    <Text size="lg" weight={500} mb="sm">Особенности:</Text>
                    <List spacing="sm" size="sm" mb="md">
                      {analysisData.features.map((feature, index) => (
                        <List.Item key={index}>{feature}</List.Item>
                      ))}
                    </List>
                  </Box>

                  <Box>
                    <Text size="lg" weight={500} mb="sm">Анализ рынка:</Text>
                    <Text size="sm">{analysisData.market_analysis}</Text>
                  </Box>
                </>
              ) : (
                <Text size="sm" color="gray">
                  Данные анализа отсутствуют
                </Text>
              )}
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default ResultPage;