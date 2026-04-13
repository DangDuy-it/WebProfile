import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';

export default function HomePage() {
  return (
    <main className="main-content">
      <HeroSection />
      <AboutSection />
      {/* Thêm SkillsSection, ProjectsSection nếu cần */}
      <ContactSection />
    </main>
  );
}
