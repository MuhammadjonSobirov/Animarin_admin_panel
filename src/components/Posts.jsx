import { useEffect, useState } from 'react';
import app from '../firebeseConfig';
import { getDatabase, ref, get } from 'firebase/database';
import LoadingSpinner from './Loading';
import { useNavigate } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const starCountRef = ref(db, 'movies/animes');
        const snapshot = await get(starCountRef);
        const myData = snapshot.val();
        if (snapshot.val()) {
          const temporaryarray = Object.keys(myData).map((key) => ({ ...myData[key], animeId: key }))
          setData(temporaryarray);
          console.log(temporaryarray);
          
        } else {
          setError('No data available');
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDescription = (index) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  console.log(data);

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Anime Collection</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <li key={index} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6">
            <div className="flex flex-col items-center text-center">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={item.img || "https://via.placeholder.com/96"} alt={item.name || "Anime image"} />
              <a href={item.url || "https://www.example.com"} target="_blank" rel="noopener noreferrer"><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name || "Anime name"}</h5></a>

              <p className="text-sm text-gray-500 hidden md:block dark:text-gray-400 mb-4">
                {expandedItems[index]
                  ? item.description
                  : item.description?.slice(0, 100) + (item.description?.length > 100 ? '...' : '')}
                {item.description?.length > 100 && (
                  <button
                    onClick={() => toggleDescription(index)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    {expandedItems[index] ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Season: {item.season}, Episodes: {item.episode_count}
              </p>

              <div className="flex space-x-3">
                <button onClick={() => navigate(`/edit/${item.animeId}`)}  className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Read;
