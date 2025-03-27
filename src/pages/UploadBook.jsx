import React, { useState } from "react";
import { IoCloudUpload, IoArrowBack } from "react-icons/io5";
import { baseUrl } from "../baseUrl";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const UploadBook = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("bookToken");

  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    publishYear: new Date().getFullYear(),
    coverImage: null,
    pdf: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));

    if (name === "coverImage" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      const response = await fetch(`${baseUrl}/api/books/upload`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Upload successfully");
        navigate(-1);
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      toast.error(error.message || "Something want wrong");
    } finally {
      setLoading(false);
    }
  };

  const bookCategories = [
    // Fiction Genres
    "Literary Fiction", "Classic Fiction", "Contemporary Fiction", "Experimental Fiction", "Magical Realism", "Philosophical Fiction", "Metafiction", "Epistolary Fiction", "Stream of Consciousness",
    
    // Mystery & Thriller
    "Detective Fiction", "Hard-Boiled Detective", "Cozy Mystery", "Police Procedural", "Forensic Thriller", "Legal Thriller", "Psychological Thriller", "Spy Thriller", "Crime Fiction", "Noir Fiction", "Serial Killer Thriller", "Political Thriller", "Conspiracy Thriller", "Cybercrime Thriller", "Cold Case Mystery",
    
    // Science Fiction
    "Hard Science Fiction", "Soft Science Fiction", "Space Opera", "Cyberpunk", "Steampunk", "Biopunk", "Post-Cyberpunk", "Military Sci-Fi", "Time Travel Fiction", "Alternate History", "Alien Encounter", "First Contact", "Dystopian Fiction", "Post-Apocalyptic", "Climate Fiction", "Nano-Tech Fiction", "AI Fiction", "Quantum Fiction", "Solar Punk", "Interstellar Fiction", "Xenofiction",
    
    // Fantasy
    "High Fantasy", "Urban Fantasy", "Dark Fantasy", "Epic Fantasy", "Sword & Sorcery", "Heroic Fantasy", "Mythic Fantasy", "Contemporary Fantasy", "Paranormal Fantasy", "Gothic Fantasy", "Supernatural Fantasy", "Grimdark Fantasy", "Portal Fantasy", "Historical Fantasy", "Arthurian Fantasy", "Celtic Fantasy", "Nordic Fantasy", "Asian-inspired Fantasy", "African Fantasy", "Steampunk Fantasy",
    
    // Romance
    "Contemporary Romance", "Historical Romance", "Regency Romance", "Victorian Romance", "Medieval Romance", "Paranormal Romance", "Vampire Romance", "Werewolf Romance", "Shifter Romance", "LGBTQ+ Romance", "M/M Romance", "F/F Romance", "Bisexual Romance", "Transgender Romance", "Erotic Romance", "Sweet Romance", "Romantic Comedy", "Military Romance", "Sports Romance", "Billionaire Romance", "Rock Star Romance", "Small Town Romance", "Enemies to Lovers", "Marriage of Convenience", "Second Chance Romance",
    
    // Horror
    "Supernatural Horror", "Psychological Horror", "Gothic Horror", "Body Horror", "Cosmic Horror", "Folk Horror", "Haunted House", "Zombie Fiction", "Vampire Horror", "Werewolf Horror", "Demonic Possession", "Lovecraftian Horror", "Occult Horror", "Paranormal Horror", "Slasher Horror", "Apocalyptic Horror", "Survival Horror",
    
    // Historical Fiction
    "Ancient History Fiction", "Classical Era", "Roman Empire", "Greek Civilization", "Medieval Fiction", "Renaissance Fiction", "Tudor Period", "Colonial Era", "Revolutionary War", "Civil War Era", "World War I Fiction", "World War II Fiction", "Cold War Fiction", "Vietnam War", "Middle Eastern Historical Fiction", "African Historical Fiction", "Asian Historical Fiction", "Indigenous Historical Fiction",
    
    // Non-Fiction
    "Political Biography", "Celebrity Memoir", "Sports Autobiography", "Military Biography", "Scientific Biography", "Business Biography", "Art & Artist Biography", "Music Biography", "Royal Biography", "Political History", "Military History", "Social History", "Cultural History", "Economic History", "Technological History", "Maritime History", "Archaeological History", "Women's History", "LGBTQ+ History", "Racial History",
    
    // Self-Help & Personal Development
    "Life Coaching", "Career Development", "Personal Finance", "Relationship Advice", "Mental Health", "Emotional Intelligence", "Productivity", "Leadership", "Communication Skills", "Motivation", "Habit Formation", "Mindfulness", "Stress Management", "Self-Confidence", "Creativity Enhancement", "Goal Setting", "Personal Branding", "Time Management", "Decision Making", "Resilience",
    
    // Academic & Professional
    "Academic Research", "Scientific Papers", "Medical Research", "Legal Studies", "Engineering Textbooks", "Computer Science", "Mathematics", "Physics Research", "Chemistry Textbooks", "Biology Studies", "Psychology Textbooks", "Sociology Research", "Anthropology", "Philosophy Texts", "Educational Resources", "Professional Certification",
    
    // Specialized Non-Fiction
    "True Crime", "Travel Writing", "Food & Cooking", "Health & Wellness", "Nutrition", "Fitness", "Alternative Medicine", "Holistic Health", "Yoga", "Meditation", "Spiritual Growth", "Philosophical Texts", "Religious Studies", "Comparative Religion", "Archaeology", "Anthropology", "Linguistics", "Cultural Studies", "Gender Studies",
    
    // Children's & Young Adult
    "Picture Books", "Early Reader", "Middle Grade Fiction", "Young Adult Fiction", "Young Adult Fantasy", "Young Adult Sci-Fi", "Young Adult Romance", "Young Adult Mystery", "Educational Children's Books", "Multicultural Children's Books", "Graphic Novels for Kids", "STEM Children's Books", "Emotional Intelligence for Kids",
    
    // Specialized Genres
    "Poetry", "Experimental Poetry", "Slam Poetry", "Haiku", "Sonnets", "Graphic Novels", "Comic Books", "Manga", "Art Books", "Photography Books", "Architecture", "Design", "Fashion", "Film Studies", "Music Theory", "Theater & Performance", "Maritime Fiction", "Wilderness Survival", "Exploration Narratives", "Adventure Travel", "Philosophical Novels",
    
    // Emerging & Niche Categories
    "Climate Fiction", "Tech Noir", "Afrofuturism", "Indigenous Futurism", "Solarpunk", "Biopunk", "Quantum Fiction", "Speculative Fiction", "Cross-Cultural Fiction", "Translated Literature", "Multilingual Narratives", "Experimental Narrative", "Digital Literature", "Interactive Fiction",
    
    "Other" // Catch-all category
];


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Link
        to={"/"}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 group">
        <IoArrowBack className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Books</span>
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Upload New Book</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            {coverPreview ? (
              <div className="relative w-full max-w-xs">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverPreview(null);
                    setFormData((prev) => ({ ...prev, coverImage: null }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                  ×
                </button>
              </div>
            ) : (
              <div className="text-center">
                <IoCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                <label className="mt-2 cursor-pointer">
                  <span className="text-orange-500 hover:text-orange-600">
                    Upload cover image
                  </span>
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author (optional)
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Publish Year
              </label>
              <input
                type="number"
                name="publishYear"
                required
                min="1900"
                max={new Date().getFullYear()}
                value={formData.publishYear}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              PDF File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="space-y-1 text-center">
                <IoCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-orange-500 hover:text-orange-600">
                    <span>Upload PDF file</span>
                    <input
                      type="file"
                      name="pdf"
                      accept=".pdf"
                      required
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {formData.pdf && (
                  <p className="text-sm text-gray-500">
                    Selected: {formData.pdf.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;
