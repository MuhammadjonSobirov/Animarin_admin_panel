import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, get, update, remove } from 'firebase/database';
import { MdArrowBackIos } from "react-icons/md";
import app from '../../firebeseConfig'; // Ensure the path is correct

const Edit = () => {
  const { id } = useParams(); // Anime ID passed via route parameters
  const navigate = useNavigate();
  const [animeData, setAnimeData] = useState({
    name: '',
    description: '',
    img: '',
    s_img: '',
    janr: [], // Now an array of objects
    episodes: [{ linkId: Date.now(), link: '' }],
    episode_count: '',
    url: '',
    season: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the current anime data
  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const db = getDatabase(app);
        const animeRef = ref(db, `movies/animes/${id}`);
        const snapshot = await get(animeRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setAnimeData({
            ...data,
            janr: data.janr || [], // Ensure janr is an array
          });
        } else {
          setError('No data found for this anime.');
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeData();
  }, [id]);

  console.log(animeData);


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle genre changes
  const handleGenreChange = (index, value) => {
    const updatedGenres = [...animeData.janr];
    updatedGenres[index].name = value; // Update the name of the genre at the specified index
    setAnimeData((prevData) => ({
      ...prevData,
      janr: updatedGenres,
    }));
  };

  // Add a new genre
  const addGenre = () => {
    setAnimeData((prevData) => ({
      ...prevData,
      janr: [...prevData.janr, { name: '' }],
    }));
  };

  // Remove a genre
  const removeGenre = (index) => {
    const updatedGenres = animeData.janr.filter((_, i) => i !== index);
    setAnimeData((prevData) => ({
      ...prevData,
      janr: updatedGenres,
    }));
  };

  // Handle episode link changes
  // Handle episode link changes
  const handleEpisodeLinkChange = (index, value) => {
    const updatedLinks = [...animeData.episodes];
    updatedLinks[index].link = value, updatedLinks[index].linkId = Date.now(); // Update the link at the specified index
    setAnimeData((prevData) => ({
      ...prevData,
      episodes: updatedLinks
    }));
  };

  // Add a new episode link
  const addEpisodeLink = () => {
    setAnimeData((prevData) => ({
      ...prevData,
      episodes: [...prevData.episodes, { link: '' }]
    }));
  };

  // Remove an episode link
  const removeEpisodeLink = (index) => {
    const updatedLinks = animeData.episodes.filter((_, i) => i !== index);
    setAnimeData((prevData) => ({
      ...prevData,
      episodes: updatedLinks
    }));
  };

  // Save edited data to Firebase
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const db = getDatabase(app);
      const animeRef = ref(db, `movies/animes/${id}`);
      await update(animeRef, animeData); // Update the existing record

      alert('Data updated successfully!');
      navigate('/'); // Navigate back to the main list or home page
    } catch (error) {
      alert(`Error updating data: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      const db = getDatabase(app);
      const animeRef = ref(db, `movies/animes/${id}`);
      await remove(animeRef);
      alert('Data deleted successfully!');
      navigate('/'); // Navigate back to the main list or home page after deletion
    } catch (error) {
      alert(`Error deleting data: ${error.message}`);
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <button
        className="absolute top-32 left-20 cursor-pointer text-2xl font-semibold text-gray-900 dark:text-white mb-6"
        onClick={() => navigate(-1)}
      >
        <MdArrowBackIos />
      </button>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Edit Anime
      </h2>
      <form onSubmit={handleSave} className="flex flex-col items-center space-y-4">
        {/* Other inputs */}
        <input
          name="name"
          value={animeData.name}
          onChange={handleInputChange}
          className="w-full max-w-md border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          placeholder="Anime Name"
        />
        {/* Genres */}
        {animeData.janr.map((genre, index) => (
          <div key={index} className="flex space-x-2">
            <input
              value={genre.name}
              onChange={(e) => handleGenreChange(index, e.target.value)}
              className="w-full max-w-md border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder={`Genre ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeGenre(index)}
              className="bg-red-500 hover:bg-red-700 text-white rounded-md px-2 py-1 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addGenre}
          className="w-full max-w-md bg-green-500 hover:bg-green-700 text-white text-sm font-medium rounded-md p-3"
        >
          Add Genre
        </button>
        <input
          name="img"
          value={animeData.img}
          onChange={handleInputChange}
          className="w-full max-w-md border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          placeholder="Image URL"
        />
        <input
          name="s_img"
          value={animeData.s_img}
          onChange={handleInputChange}
          className="w-full max-w-md border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          placeholder="Slide Image URL"
        />
        <input
          name="episode_count"
          value={animeData.episode_count}
          onChange={handleInputChange}
          className="w-full max-w-md border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="number"
          placeholder="Number of Episodes"
        />
        {animeData.episodes.map((episode, index) => (
          <div key={index} className="flex space-x-2">
            <input
              value={episode.link}
              onChange={(e) => handleEpisodeLinkChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder={`Episode ${index + 1} Link`}
            />
            <button
              type="button"
              onClick={() => removeEpisodeLink(index)}
              className="bg-red-500 hover:bg-red-700 text-white rounded-md px-2 py-1 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addEpisodeLink}
          className="bg-green-500 hover:bg-green-700 text-white text-sm font-medium rounded-md p-3"
        >
          Add Episode Link
        </button>
        <input
          name="season"
          value={animeData.season}
          onChange={handleInputChange}
          className="w-full max-w-md border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="number"
          placeholder="Season Number"
        />
        <input
          name="url"
          value={animeData.url}
          onChange={handleInputChange}
          className="w-full max-w-md border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          placeholder="Anime URL"
        />
        {/* Other inputs */}
        <textarea
          name="description"
          value={animeData.description}
          onChange={handleInputChange}
          className="w-full max-w-md border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Anime Description"
          rows="4"
        />
        <button
          type="submit"
          className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md p-3"
        >
          Save Changes
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className="w-full max-w-md bg-red-500 hover:bg-red-700 text-white text-sm font-medium rounded-md p-3"
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default Edit;
