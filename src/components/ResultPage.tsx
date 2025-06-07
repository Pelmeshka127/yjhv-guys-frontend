import { useLocation } from 'react-router-dom';
import { Container, Title, Image, Button, Box, Grid, Paper, Text, List, Tabs, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import avitoIcon1 from '../assets/avito.png'; 

function ResultPage() {
  const location = useLocation();
  const responseData = location.state?.data || {};
  const navigate = useNavigate();

  // Извлекаем общее описание и список обработанных изображений
  const { common_analysis, images } = responseData;
  const results = images || [];

  if (!common_analysis || results.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Text>Данные недоступны</Text>
        <Button onClick={() => navigate('/')} mt="md">
          Вернуться на главную
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
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

      {/* Вкладки с фотографиями */}
      <Tabs defaultValue={`photo-0`}>
        <Tabs.List>
          {results.map((result, index) => (
            <Tabs.Tab key={index} value={`photo-${index}`}>
              Фото {index + 1}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {results.map((result, index) => {
          const imageUrl = result.processed_image.startsWith('/')
            ? `http://localhost:8082${result.processed_image}`
            : result.processed_image;

          return (
            <Tabs.Panel key={index} value={`photo-${index}`} pt="xl">
              <Grid gutter="xl" align="stretch">
                {/* Левая колонка - фотография */}
                <Grid.Col span={6}>
                  <Paper 
                    withBorder 
                    radius="md" 
                    style={{ 
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '20px',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Фото автомобиля ${index + 1}`}
                      radius="md"
                      style={{ 
                        maxWidth: '100%',
                        maxHeight: '500px',
                        objectFit: 'contain'
                      }}
                    />
                  </Paper>
                </Grid.Col>

                {/* Правая колонка - описание автомобиля */}
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
                      <Title order={3} mb="md" align="center">Описание автомобиля</Title>
                      
                      <Box mb="xl">
                        <Text size="lg" weight={500} mb="sm">Детали:</Text>
                        <List spacing="sm" size="sm" mb="md">
                          <List.Item>Марка: <strong>{common_analysis.make}</strong></List.Item>
                          <List.Item>Модель: <strong>{common_analysis.model}</strong></List.Item>
                          <List.Item>Год выпуска: <strong>{common_analysis.year}</strong></List.Item>
                          <List.Item>Цвет: <strong>{common_analysis.color}</strong></List.Item>
                          <List.Item>Состояние: <strong>{common_analysis.condition}</strong></List.Item>
                          <List.Item>Диапазон цен: <strong>{common_analysis.price_range}</strong></List.Item>
                        </List>
                      </Box>

                      <Box mb="xl">
                        <Text size="lg" weight={500} mb="sm">Особенности:</Text>
                        <List spacing="sm" size="sm" mb="md">
                          {common_analysis.features.map((feature, idx) => (
                            <List.Item key={idx}>{feature}</List.Item>
                          ))}
                        </List>
                      </Box>

                      <Box>
                        <Text size="lg" weight={500} mb="sm">Анализ рынка:</Text>
                        <Text size="sm">{common_analysis.market_analysis}</Text>
                      </Box>
                    </Box>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </Container>
  );
}

export default ResultPage;