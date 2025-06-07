import { useLocation } from 'react-router-dom';

function ResultPage() {
    const location = useLocation();
    const { data } = location.state || {};

    if (!data) {
        return <div>Данные недоступны</div>;
    }

    // Если бэкенд на другом домене, добавляем базовый URL
    const imageUrl = data.processed_image.startsWith('/')
        ? `http://localhost:8081${data.processed_image}`
        : data.processed_image;

    return (    
        <div>
            <h1>Результат анализа</h1>
            <img src={imageUrl} alt="Обработанное фото" style={{ maxWidth: '100%' }} />
            <p>Классификация: {data.classification}</p>
        </div>
    );
}

export default ResultPage;