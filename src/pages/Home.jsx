import { useEffect, useState } from "react";
import BookGrid from "../components/BookGrid";
import EbookFeatures from "../components/EbookFeatures";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import SubscribeSection from "../components/SubscribeSection";
import Wrapper from "../components/Wrapper";
import { baseUrl } from "../baseUrl";

function Home() {
  const [newReleaseBooks, setNewReleaseBooks] = useState([]);
  const limit = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/books/getAll?page=1&limit=${limit}&sort=newest`
        );
        const data = await response.json();
        setNewReleaseBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="mt-8">
      <Wrapper>
        <Hero />
      </Wrapper>
      <div className="bg-gray-100 py-8 mt-14">
        <Wrapper>
          <BookGrid title="New Releases" books={newReleaseBooks} />
        </Wrapper>
      </div>
      <Wrapper>
        <EbookFeatures />
      </Wrapper>
      <div className="bg-gray-100">
        <Wrapper>
          <SubscribeSection />
        </Wrapper>
      </div>
      <div className="bg-gray-900">
        <Wrapper>
          <Footer />
        </Wrapper>
      </div>
    </div>
  );
}

export default Home;
