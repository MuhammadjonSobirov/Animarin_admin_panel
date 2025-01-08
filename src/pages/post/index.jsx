import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push, set } from "firebase/database";
import app from "../../firebeseConfig";
import { MdArrowBackIos } from "react-icons/md";

const Post = () => {
  const navigate = useNavigate();

  let [newPost, setNewPost] = useState({
    name: '',
    about: '',
    janr: [], // Janrlar uchun array
    image: '',
    s_image: '',
    episodes: '', // Seriyalar soni
    episode_links: [], // Epizod linklari with IDs
    url: '',
    season: "" // Mavsum soni
  });

  const [janrInput, setJanrInput] = useState(""); // Yangi janr kiritish uchun vaqtinchalik state
  const [episodeInput, setEpisodeInput] = useState("");

  const isFormValid = newPost.name && newPost.about && newPost.season && newPost.s_image && newPost.image && newPost.episodes && newPost.url && newPost.janr.length > 0 && newPost.episode_links.length > 0;

  const handleEpisodeChange = (e) => {
    const episodeCount = e.target.value;

    setNewPost((prevPost) => ({
      ...prevPost,
      episodes: episodeCount
    }));

    // const episodesArray = Array.from({ length: episodeCount }, (_, index) => ({
    //   id: Date.now() + index,
    //   link: ""
    // }));
    // setNewPost((prevPost) => ({
    //   ...prevPost,
    //   episode_links: episodesArray
    // }));
    
  };

  const handleSeasonChange = (e) => {
    const seasonCount = e.target.value;
    setNewPost((prevPost) => ({
      ...prevPost,
      season: seasonCount
    }));
  };

  // const handleEpisodeLinkChange = (index, value) => {
  //   const updatedLinks = [...newPost.episode_links];
  //   updatedLinks[index].link = value;

  //   setNewPost((prevPost) => ({
  //     ...prevPost,
  //     episode_links: updatedLinks
  //   }));
  // };

  const handleAddJanr = () => {
    if (janrInput.trim()) {
      setNewPost((prevPost) => ({
        ...prevPost,
        janr: [...prevPost.janr, { id: Date.now(), name: janrInput }]
      }));
      setJanrInput(""); // Inputni tozalash
    }
  };

  const handleRemoveJanr = (id) => {
    setNewPost((prevPost) => ({
      ...prevPost,
      janr: prevPost.janr.filter((j) => j.id !== id)
    }));
  };

  const handleAddEpisode = () => {
    if (episodeInput.trim()) {
      setNewPost((prevPost) => ({
        ...prevPost,
        episode_links: [
          ...prevPost.episode_links,
          { id: Date.now(), link: episodeInput },
        ],
      }));
      setEpisodeInput("");
    }
  };

  // Epizodni o'chirish
  const handleRemoveEpisode = (id) => {
    setNewPost((prevPost) => ({
      ...prevPost,
      episode_links: prevPost.episode_links.filter((ep) => ep.id !== id),
    }));
  };


  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, 'movies/animes'));

    try {
      await set(newDocRef, {
        name: newPost.name,
        description: newPost.about,
        janr: newPost.janr.map((j) => j.name), // Janr faqat nomlarni yozadi
        img: newPost.image,
        s_img: newPost.s_image,
        episode_count: newPost.episodes,
        episodes: newPost.episode_links.map((ep) => ({ linkId: ep.id, link: ep.link })),
        url: newPost.url,
        season: newPost.season,
        id: Date.now(),
      });

      alert('Data saved successfully!');
      setNewPost({
        name: '',
        about: '',
        janr: [],
        image: '',
        s_image: '',
        episodes: '',
        episode_links: [],
        url: '',
        season: "",
      });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveData();
    navigate(`/`);
  };

  return (
    <div>
      <button className="absolute top-40 left-16 cursor-pointer text-2xl font-semibold text-gray-900 dark:text-white mb-6" onClick={() => navigate(-1)}><MdArrowBackIos /></button>
      <h2 className="text-3xl font-bold dark:text-white">Post tarkibi</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          value={newPost.name}
          onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
          className="my-2 border border-black w-[200px] rounded-md p-3"
          type="text"
          placeholder="Nomi"
        />
        <input
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
          className="my-2 border border-black w-[200px] rounded-md p-3"
          type="text"
          placeholder="Rasm URL"
        />
        <input
          value={newPost.s_image}
          onChange={(e) => setNewPost({ ...newPost, s_image: e.target.value })}
          className="my-2 border border-black w-[200px] rounded-md p-3"
          type="text"
          placeholder="Slide rasm URL"
        />
        {/* Janr qo'shish */}
        <div className="flex items-center">
          <input
            value={janrInput}
            onChange={(e) => setJanrInput(e.target.value)}
            className="my-2 border border-black w-[200px] rounded-md p-3"
            type="text"
            placeholder="Janr qo'shish"
          />
          <button type="button" onClick={handleAddJanr} className="ml-2 h-[48px] bg-green-500 hover:bg-green-700 text-white p-2 rounded-md">
            Qo'shish
          </button>
        </div>
        {/* Kiritilgan janrlarni ko'rsatish */}
        <div>
          {newPost.janr.map((j) => (
            <div key={j.id} className="flex border border-black w-[200px] rounded-md p-2 bg-white justify-between items-center">
              <span className="mr-2">{j.name}</span>
              <button type="button" onClick={() => handleRemoveJanr(j.id)} className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white p-1 rounded-md">
                O'chirish
              </button>
            </div>
          ))}
        </div>
        <input
          value={newPost.episodes}
          onChange={handleEpisodeChange}
          className="my-2 border border-black w-[200px] rounded-md p-3"
          type="number"
          placeholder="Seriyalar soni"
        />
        <div className="flex items-center">
          <input
            value={episodeInput}
            onChange={(e) => setEpisodeInput(e.target.value)}
            className="my-2 border border-black w-[200px] rounded-md p-3"
            type="text"
            placeholder="Epizod link qo'shish"
          />
          <button
            type="button"
            onClick={handleAddEpisode}
            className="ml-2 h-[48px] bg-green-500 hover:bg-green-700 text-white p-2 rounded-md"
          >
            Qo'shish
          </button>
        </div>
        <div>
          {newPost.episode_links.map((ep) => (
            <div
              key={ep.id}
              className="flex border border-black w-[200px] rounded-md p-2 bg-white justify-between items-center"
            >
              <span className="mr-2">{ep.link}</span>
              <button
                type="button"
                onClick={() => handleRemoveEpisode(ep.id)}
                className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white p-1 rounded-md"
              >
                O'chirish
              </button>
            </div>
          ))}
        </div>
        <input
          value={newPost.season}
          onChange={handleSeasonChange}
          className="my-2 border border-black w-[200px] rounded-md p-3"
          type="number"
          placeholder="Mavsum soni"
        />
        <input
          value={newPost.url}
          onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
          className="my-2 border border-black w-[200px] rounded-md p-3"
          type="text"
          placeholder="Animega link"
        />
        <textarea
          value={newPost.about}
          onChange={(e) => setNewPost({ ...newPost, about: e.target.value })}
          className="my-2 border border-black w-[200px] rounded-md p-3"
          type="text"
          placeholder="Ma'lumot"
        />
        <button
          type="submit"
          className="my-2 border bg-blue-500 hover:bg-blue-700 text-white border-black w-[200px] rounded-md p-3"
          disabled={!isFormValid}
        >
          Jonatish
        </button>
      </form>
    </div>
  );
};

export default Post;
