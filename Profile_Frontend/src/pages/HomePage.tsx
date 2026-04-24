import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';
import SkillSection from '../sections/SkillSection';
export default function HomePage() {
  return (
    <main className="main-content">
      <HeroSection />
      <AboutSection />
      <SkillSection />
      {/* Thêm SkillsSection, ProjectsSection nếu cần */}
      <ContactSection />
    </main>
  );
}
