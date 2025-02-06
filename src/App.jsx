import BookGrid from "./components/BookGrid";
import EbookFeatures from "./components/EbookFeatures";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SubscribeSection from "./components/SubscribeSection";
import Wrapper from "./components/Wrapper";

function App() {
  const books = [
    {
      title: "The Art of Web Development",
      year: "2024",
      description:
        "A modern guide to web development covering HTML, CSS, JavaScript, and frameworks.",
      image: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
      link: "#",
    },
    {
      title: "React Mastery",
      year: "2023",
      description:
        "An advanced book on React.js, hooks, state management, and performance optimization.",
      image: "https://edit.org/img/blog/m68-book-cover-templates.webp",
      link: "#",
    },
    {
      title: "The Art of Web Development",
      year: "2024",
      description:
        "A modern guide to web development covering HTML, CSS, JavaScript, and frameworks.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      link: "#",
    },
    {
      title: "React Mastery",
      year: "2023",
      description:
        "An advanced book on React.js, hooks, state management, and performance optimization.",
      image: "https://edit.org/img/blog/d3s-design-book-covers.webp",
      link: "#",
    },
    {
      title: "The Art of Web Development",
      year: "2024",
      description:
        "A modern guide to web development covering HTML, CSS, JavaScript, and frameworks.",
      image: "https://edit.org/img/blog/t9i-edit-book-covers-online.webp",
      link: "#",
    },
    {
      title: "React Mastery",
      year: "2023",
      description:
        "An advanced book on React.js, hooks, state management, and performance optimization.",
      image:
        "https://edit.org/img/blog/vnl-1024-ebook-cover-maker-online-free-template.webp",
      link: "#",
    },
  ];

  return (
    <>
      <Navbar />
      <Wrapper>
        <Hero />
      </Wrapper>
      <div className="bg-gray-100 py-12 mt-14">
        <Wrapper>
          <BookGrid title="Latest E-Books" books={books} />
        </Wrapper>
      </div>
      <div className="bg-gray-100 py-12">
        <Wrapper>
          <BookGrid title="Latest E-Books" books={books} />
        </Wrapper>
      </div>
      <Wrapper>
        <EbookFeatures />
      </Wrapper>
      <div className="bg-gray-100 py-12">
        <Wrapper>
          <SubscribeSection />
        </Wrapper>
      </div>
      <div className="bg-gray-900">
        <Wrapper>
          <Footer />
        </Wrapper>
      </div>
    </>
  );
}

export default App;
