import SectionHeart from '../components/SectionHeart';
import SectionLetter from '../components/SectionLetter';
import SectionScrapbook from '../components/SectionScrapbook';
import SectionMusic from '../components/SectionMusic';
import BackgroundMusic from '../components/BackgroundMusic';

export default function Home() {
  return (
    <main className="mobile-container bg-[#FEF9E1]">
      <SectionHeart />
      <SectionScrapbook />
      <SectionLetter />
      <SectionMusic />
      <BackgroundMusic />
    </main>
  );
}