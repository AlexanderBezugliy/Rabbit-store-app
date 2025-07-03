import { useSearchParams, useNavigate } from 'react-router-dom';


const SortOptions = () => {
    const [searchParams] = useSearchParams();//Получаем текущие параметры URL
    
    const navigate = useNavigate();// Получаем функцию для программной навигации

    // Получаем текущее значение sortBy из URL, или пустую строку если его нет
    const currentSortBy = searchParams.get("sortBy") || "";

    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        // Создаём новый объект с текущими параметрами, чтобы не потерять другие параметры, если они есть
        const newSearchParams = new URLSearchParams(searchParams.toString());

        if (sortBy) {
            newSearchParams.set("sortBy", sortBy);
        } else {
            newSearchParams.delete("sortBy"); // Удаляем параметр, если выбрано "Default"
        }

        // Обновляем URL. Метод `Maps` с параметрами запроса автоматически сохраняет путь.
        navigate(`?${newSearchParams.toString()}`);
    }

    return (
        <div className='mb-4 flex justify-end items-center'>
            <select
                id="sort"
                onChange={handleSortChange}
                value={currentSortBy}
                className='border p-3 rounded-md focus:outline-none'
            >
                <option value="">Default</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    )
}

export default SortOptions
