import { useState, useEffect, useRef } from "react";
import { 
  Menu, X, ChevronDown, ArrowRight, Star, Shield, Clock, 
  Award, Users, Microscope, Cpu, Phone, Mail, MapPin, 
  ChevronUp, Globe, Sparkles, CheckCircle2, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dentalHeroBg from "@/assets/dental-hero-bg.jpg";
import dentalTeam from "@/assets/dental-team.jpg";
import dentalLogo from "@/assets/dental-logo.png";
import dentalServices from "@/assets/dental-services.jpg";
import dentalCarousel1 from "@/assets/dental-carousel-1.jpg";
import dentalCarousel2 from "@/assets/dental-carousel-2.jpg";

// ─── Language Content ────────────────────────────────────────────────
const content = {
  vi: {
    nav: { about: "Về chúng tôi", services: "Dịch vụ", technology: "Công nghệ", team: "Đội ngũ", testimonials: "Đánh giá", contact: "Liên hệ" },
    hero: {
      badge: "🏆 ISO 13485 & FDA Certified",
      title1: "Digital Age",
      title2: "Dental Lab",
      subtitle: "Phòng Lab Nha Khoa Kỹ Thuật Số Hàng Đầu",
      desc: "Chúng tôi kết hợp công nghệ CAD/CAM tiên tiến với tay nghề thủ công tinh xảo để mang đến những sản phẩm phục hình răng chất lượng cao nhất.",
      cta1: "Tìm hiểu thêm",
      cta2: "Liên hệ ngay",
      stats: [
        { value: "15+", label: "Năm kinh nghiệm" },
        { value: "500+", label: "Đối tác nha sĩ" },
        { value: "134K+", label: "Sản phẩm/tháng" },
        { value: "99.8%", label: "Tỷ lệ hài lòng" }
      ]
    },
    about: {
      tag: "VỀ CHÚNG TÔI",
      title: "Đối tác tin cậy của Nha sĩ",
      desc: "Digital Age Dental Lab được thành lập với sứ mệnh nâng cao chất lượng phục hình răng thông qua công nghệ số. Với hơn 15 năm kinh nghiệm, chúng tôi tự hào là đơn vị gia công răng hàng đầu tại Việt Nam.",
      values: [
        { icon: "shield", title: "Chất lượng ISO", desc: "Tuân thủ nghiêm ngặt tiêu chuẩn ISO 13485 & FDA" },
        { icon: "clock", title: "Giao hàng đúng hạn", desc: "Cam kết OTD 100% với quy trình quản lý chặt chẽ" },
        { icon: "award", title: "Vật liệu cao cấp", desc: "Sử dụng 100% vật liệu nhập khẩu chính hãng" },
        { icon: "users", title: "Đội ngũ chuyên gia", desc: "Hơn 200 kỹ thuật viên được đào tạo bài bản" }
      ]
    },
    services: {
      tag: "DỊCH VỤ",
      title: "Giải pháp Phục hình Toàn diện",
      items: [
        { title: "Crown & Bridge (C&S)", desc: "Mão răng sứ, cầu răng với độ chính xác tối đa từ hệ thống CAD/CAM", capacity: "94,700 units/tháng" },
        { title: "Removable Prosthetics (RPD)", desc: "Hàm tháo lắp, khung kim loại với thiết kế 3D scanning hiện đại", capacity: "24,100 units/tháng" },
        { title: "Nghiên cứu & Phát triển (NG)", desc: "Nghiên cứu vật liệu mới, phát triển quy trình sản xuất tiên tiến", capacity: "15,700 units/tháng" },
        { title: "Implant Solutions", desc: "Abutment tùy chỉnh, surgical guides với độ chính xác micron", capacity: "Theo yêu cầu" }
      ]
    },
    technology: {
      tag: "CÔNG NGHỆ",
      title: "Nền tảng Kỹ thuật số Tiên tiến",
      desc: "Chúng tôi đầu tư mạnh vào công nghệ để đảm bảo mỗi sản phẩm đều đạt chất lượng hoàn hảo.",
      items: [
        { title: "3D Scanning", desc: "Quét dấu răng kỹ thuật số với độ chính xác 7 micron" },
        { title: "CAD/CAM Design", desc: "Thiết kế 3D với phần mềm chuyên dụng hàng đầu thế giới" },
        { title: "CNC Milling", desc: "Gia công CNC 5 trục cho độ khít sát tối ưu" },
        { title: "3D Printing", desc: "In 3D vật liệu y tế cho mẫu thử và surgical guides" },
        { title: "Sintering", desc: "Lò nung chân không kiểm soát nhiệt độ chính xác ±1°C" },
        { title: "Quality Control", desc: "Kiểm tra chất lượng đa tầng với thiết bị đo lường hiện đại" }
      ]
    },
    team: {
      tag: "ĐỘI NGŨ",
      title: "Con người là Tài sản Quý giá nhất",
      desc: "Đội ngũ hơn 200 kỹ thuật viên tay nghề cao, được đào tạo liên tục và làm việc với tinh thần trách nhiệm cao nhất.",
      members: [
        { name: "Dr. Nguyễn Văn An", role: "Giám đốc Kỹ thuật", exp: "20 năm kinh nghiệm" },
        { name: "ThS. Trần Thị Bình", role: "Trưởng phòng R&D", exp: "15 năm kinh nghiệm" },
        { name: "KTV. Lê Hoàng Cường", role: "Trưởng bộ phận C&S", exp: "12 năm kinh nghiệm" },
        { name: "KTV. Phạm Minh Đức", role: "Trưởng bộ phận RPD", exp: "10 năm kinh nghiệm" }
      ]
    },
    testimonials: {
      tag: "ĐÁNH GIÁ",
      title: "Khách hàng nói gì về chúng tôi",
      items: [
        { name: "Dr. Sarah Johnson", clinic: "Smile Dental Clinic, USA", text: "Digital Age Dental Lab delivers exceptional quality consistently. Their CAD/CAM crowns fit perfectly every time.", rating: 5 },
        { name: "Dr. Tanaka Hiroshi", clinic: "Tokyo Dental Center, Japan", text: "Outstanding turnaround time and the quality of their zirconia restorations is world-class.", rating: 5 },
        { name: "BS. Nguyễn Thanh Hà", clinic: "Nha khoa Quốc tế, HCM", text: "Đối tác đáng tin cậy nhất của phòng khám chúng tôi. Chất lượng ổn định và dịch vụ chuyên nghiệp.", rating: 5 }
      ]
    },
    contact: {
      tag: "LIÊN HỆ",
      title: "Hãy liên hệ với chúng tôi",
      desc: "Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn.",
      address: "Lô CN-01, KCN VSIP II-A, Bình Dương, Việt Nam",
      phone: "+84 274 3000 123",
      email: "info@digitalagedentallab.com",
      hours: "Thứ 2 - Thứ 7: 7:30 - 17:30"
    },
    footer: {
      slogan: "Nâng tầm nụ cười Việt với công nghệ số",
      copyright: "© 2025 Digital Age Dental Lab. All rights reserved.",
      links: ["Chính sách bảo mật", "Điều khoản sử dụng", "Tuyển dụng"]
    }
  },
  en: {
    nav: { about: "About Us", services: "Services", technology: "Technology", team: "Team", testimonials: "Testimonials", contact: "Contact" },
    hero: {
      badge: "🏆 ISO 13485 & FDA Certified",
      title1: "Digital Age",
      title2: "Dental Lab",
      subtitle: "Leading Digital Dental Laboratory",
      desc: "We combine advanced CAD/CAM technology with skilled craftsmanship to deliver the highest quality dental restorations.",
      cta1: "Learn More",
      cta2: "Contact Us",
      stats: [
        { value: "15+", label: "Years Experience" },
        { value: "500+", label: "Dentist Partners" },
        { value: "134K+", label: "Units/Month" },
        { value: "99.8%", label: "Satisfaction Rate" }
      ]
    },
    about: {
      tag: "ABOUT US",
      title: "Your Trusted Dental Partner",
      desc: "Digital Age Dental Lab was founded with the mission to elevate dental restoration quality through digital technology. With over 15 years of experience, we are proudly one of the leading dental labs in Vietnam.",
      values: [
        { icon: "shield", title: "ISO Quality", desc: "Strict compliance with ISO 13485 & FDA standards" },
        { icon: "clock", title: "On-Time Delivery", desc: "100% OTD commitment with rigorous process management" },
        { icon: "award", title: "Premium Materials", desc: "100% genuine imported materials from leading brands" },
        { icon: "users", title: "Expert Team", desc: "Over 200 professionally trained dental technicians" }
      ]
    },
    services: {
      tag: "SERVICES",
      title: "Comprehensive Restoration Solutions",
      items: [
        { title: "Crown & Bridge (C&S)", desc: "Porcelain crowns and bridges with maximum precision from CAD/CAM systems", capacity: "94,700 units/month" },
        { title: "Removable Prosthetics (RPD)", desc: "Removable dentures and metal frameworks with modern 3D scanning design", capacity: "24,100 units/month" },
        { title: "Research & Development (NG)", desc: "New material research and advanced manufacturing process development", capacity: "15,700 units/month" },
        { title: "Implant Solutions", desc: "Custom abutments and surgical guides with micron-level precision", capacity: "On demand" }
      ]
    },
    technology: {
      tag: "TECHNOLOGY",
      title: "Advanced Digital Platform",
      desc: "We invest heavily in technology to ensure every product achieves perfect quality.",
      items: [
        { title: "3D Scanning", desc: "Digital impression scanning with 7-micron accuracy" },
        { title: "CAD/CAM Design", desc: "3D design with world-leading specialized software" },
        { title: "CNC Milling", desc: "5-axis CNC machining for optimal fit" },
        { title: "3D Printing", desc: "Medical-grade 3D printing for models and surgical guides" },
        { title: "Sintering", desc: "Vacuum sintering furnace with ±1°C temperature control" },
        { title: "Quality Control", desc: "Multi-level quality checks with modern measuring equipment" }
      ]
    },
    team: {
      tag: "OUR TEAM",
      title: "People are our Greatest Asset",
      desc: "A team of over 200 highly skilled technicians, continuously trained and working with the highest sense of responsibility.",
      members: [
        { name: "Dr. Nguyen Van An", role: "Technical Director", exp: "20 years experience" },
        { name: "MSc. Tran Thi Binh", role: "R&D Head", exp: "15 years experience" },
        { name: "Tech. Le Hoang Cuong", role: "C&S Department Head", exp: "12 years experience" },
        { name: "Tech. Pham Minh Duc", role: "RPD Department Head", exp: "10 years experience" }
      ]
    },
    testimonials: {
      tag: "TESTIMONIALS",
      title: "What Our Clients Say",
      items: [
        { name: "Dr. Sarah Johnson", clinic: "Smile Dental Clinic, USA", text: "Digital Age Dental Lab delivers exceptional quality consistently. Their CAD/CAM crowns fit perfectly every time.", rating: 5 },
        { name: "Dr. Tanaka Hiroshi", clinic: "Tokyo Dental Center, Japan", text: "Outstanding turnaround time and the quality of their zirconia restorations is world-class.", rating: 5 },
        { name: "Dr. Nguyen Thanh Ha", clinic: "International Dental, HCM", text: "The most reliable partner for our clinic. Consistent quality and professional service.", rating: 5 }
      ]
    },
    contact: {
      tag: "CONTACT",
      title: "Get in Touch",
      desc: "We are always ready to consult and support you.",
      address: "Lot CN-01, VSIP II-A Industrial Park, Binh Duong, Vietnam",
      phone: "+84 274 3000 123",
      email: "info@digitalagedentallab.com",
      hours: "Monday - Saturday: 7:30 AM - 5:30 PM"
    },
    footer: {
      slogan: "Elevating Vietnamese Smiles with Digital Technology",
      copyright: "© 2025 Digital Age Dental Lab. All rights reserved.",
      links: ["Privacy Policy", "Terms of Service", "Careers"]
    }
  }
};

// ─── Icon mapper ─────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />
};

export default function FrontPage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const t = content[lang];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % t.testimonials.items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [t.testimonials.items.length]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "technology", label: t.nav.technology },
    { id: "team", label: t.nav.team },
    { id: "testimonials", label: t.nav.testimonials },
    { id: "contact", label: t.nav.contact }
  ];

  return (
    <div className="min-h-screen bg-[hsl(30,30%,97%)] text-[hsl(25,10%,20%)] overflow-x-hidden font-sans">
      {/* ════════ FIXED NAVBAR ════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-[hsl(30,20%,90%)]" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("hero")}>
              <img src={dentalLogo} alt="Logo" className="w-10 h-10 lg:w-12 lg:h-12" />
              <div>
                <span className={`font-bold text-lg lg:text-xl tracking-tight ${scrolled ? "text-[hsl(175,50%,30%)]" : "text-white"}`}>
                  Digital Age
                </span>
                <span className={`block text-xs font-medium -mt-1 ${scrolled ? "text-[hsl(30,40%,50%)]" : "text-[hsl(40,80%,75%)]"}`}>
                  Dental Lab
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    scrolled 
                      ? "text-[hsl(25,10%,35%)] hover:bg-[hsl(175,40%,92%)] hover:text-[hsl(175,50%,30%)]" 
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                className={`ml-3 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  scrolled 
                    ? "border-[hsl(175,40%,60%)] text-[hsl(175,50%,30%)] hover:bg-[hsl(175,40%,92%)]" 
                    : "border-white/40 text-white hover:bg-white/15"
                }`}
              >
                <Globe className="w-3.5 h-3.5 inline mr-1" />
                {lang === "vi" ? "EN" : "VI"}
              </button>
            </div>

            {/* Mobile menu btn */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-xl ${scrolled ? "text-[hsl(25,10%,30%)]" : "text-white"}`}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[hsl(30,20%,90%)] shadow-2xl animate-in slide-in-from-top-2">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-[hsl(25,10%,30%)] hover:bg-[hsl(175,40%,95%)] font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setLang(lang === "vi" ? "en" : "vi"); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-xl text-[hsl(175,50%,30%)] font-bold"
              >
                <Globe className="w-4 h-4 inline mr-2" />
                {lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ════════ HERO SECTION ════════ */}
      <section id="hero" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={dentalHeroBg} alt="Dental Lab" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(175,50%,15%)]/90 via-[hsl(175,40%,20%)]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(175,50%,10%)]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 text-[hsl(40,80%,65%)]" />
              {t.hero.badge}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.9] mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              <span className="text-white">{t.hero.title1}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(40,80%,65%)] to-[hsl(30,70%,60%)]">
                {t.hero.title2}
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-[hsl(40,40%,80%)] font-medium mb-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              {t.hero.subtitle}
            </p>
            <p className="text-base lg:text-lg text-white/70 mb-10 max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
              {t.hero.desc}
            </p>

            <div className="flex flex-wrap gap-4 mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-700">
              <Button
                onClick={() => scrollTo("about")}
                className="px-8 py-6 text-base font-bold rounded-2xl bg-gradient-to-r from-[hsl(40,80%,55%)] to-[hsl(30,70%,50%)] text-[hsl(25,20%,15%)] hover:shadow-2xl hover:shadow-[hsl(40,80%,55%)]/30 hover:scale-105 transition-all duration-300 border-0"
              >
                {t.hero.cta1} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="px-8 py-6 text-base font-bold rounded-2xl border-2 border-white/30 text-white bg-white/5 hover:bg-white/15 hover:border-white/50 transition-all duration-300"
              >
                {t.hero.cta2}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-1000">
              {t.hero.stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-3xl lg:text-4xl font-black text-white">{stat.value}</div>
                  <div className="text-sm text-white/60 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* ════════ ABOUT SECTION ════════ */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(175,40%,92%)] text-[hsl(175,50%,30%)] text-xs font-bold tracking-widest mb-6">
                {t.about.tag}
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[hsl(25,10%,15%)] mb-6 leading-tight">
                {t.about.title}
              </h2>
              <p className="text-lg text-[hsl(25,10%,40%)] leading-relaxed mb-10">
                {t.about.desc}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {t.about.values.map((val, i) => (
                  <div key={i} className="group p-5 rounded-2xl bg-[hsl(30,30%,97%)] hover:bg-[hsl(175,40%,95%)] border border-[hsl(30,20%,92%)] hover:border-[hsl(175,40%,80%)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(175,50%,40%)] to-[hsl(175,60%,30%)] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      {iconMap[val.icon]}
                    </div>
                    <h4 className="font-bold text-[hsl(25,10%,20%)] mb-2">{val.title}</h4>
                    <p className="text-sm text-[hsl(25,10%,45%)]">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={dentalTeam} alt="Our Team" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-[hsl(30,20%,92%)]">
                <div className="text-3xl font-black text-[hsl(175,50%,30%)]">200+</div>
                <div className="text-sm text-[hsl(25,10%,45%)] font-medium">{lang === "vi" ? "Kỹ thuật viên" : "Technicians"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SERVICES SECTION ════════ */}
      <section id="services" className="py-24 lg:py-32 bg-gradient-to-b from-[hsl(30,30%,97%)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(40,60%,92%)] text-[hsl(30,60%,40%)] text-xs font-bold tracking-widest mb-6">
              {t.services.tag}
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[hsl(25,10%,15%)] mb-4">
              {t.services.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.services.items.map((svc, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-white border border-[hsl(30,20%,92%)] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(175,50%,40%)] to-[hsl(175,60%,28%)] flex items-center justify-center text-white shrink-0">
                    <Microscope className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[hsl(25,10%,15%)] mb-2">{svc.title}</h3>
                    <p className="text-[hsl(25,10%,45%)] mb-4 leading-relaxed">{svc.desc}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(175,40%,95%)] text-[hsl(175,50%,30%)] text-sm font-bold">
                      <Cpu className="w-4 h-4" />
                      {svc.capacity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TECHNOLOGY SECTION ════════ */}
      <section id="technology" className="py-24 lg:py-32 bg-[hsl(175,50%,12%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[hsl(175,60%,40%)] blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[hsl(40,80%,50%)] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[hsl(40,80%,70%)] text-xs font-bold tracking-widest mb-6">
              {t.technology.tag}
            </span>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">{t.technology.title}</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">{t.technology.desc}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.technology.items.map((tech, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[hsl(40,80%,60%)]/30 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(40,80%,55%)] to-[hsl(30,70%,45%)] flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-6 h-6 text-[hsl(25,20%,15%)]" />
                </div>
                <h4 className="text-lg font-bold mb-2">{tech.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TEAM SECTION ════════ */}
      <section id="team" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={dentalServices} alt="Our team at work" className="w-full h-[450px] object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(175,40%,92%)] text-[hsl(175,50%,30%)] text-xs font-bold tracking-widest mb-6">
                {t.team.tag}
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[hsl(25,10%,15%)] mb-6 leading-tight">
                {t.team.title}
              </h2>
              <p className="text-lg text-[hsl(25,10%,40%)] leading-relaxed mb-10">{t.team.desc}</p>

              <div className="space-y-4">
                {t.team.members.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[hsl(30,30%,97%)] border border-[hsl(30,20%,92%)] hover:border-[hsl(175,40%,70%)] transition-all">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(175,50%,40%)] to-[hsl(175,60%,25%)] flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[hsl(25,10%,15%)]">{m.name}</div>
                      <div className="text-sm text-[hsl(175,50%,30%)] font-medium">{m.role}</div>
                      <div className="text-xs text-[hsl(25,10%,55%)]">{m.exp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS SECTION ════════ */}
      <section id="testimonials" className="py-24 lg:py-32 bg-gradient-to-b from-[hsl(30,30%,97%)] to-[hsl(30,25%,95%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(40,60%,92%)] text-[hsl(30,60%,40%)] text-xs font-bold tracking-widest mb-6">
              {t.testimonials.tag}
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[hsl(25,10%,15%)]">{t.testimonials.title}</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {t.testimonials.items.map((item, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${i === activeTestimonial ? "block" : "hidden"}`}
              >
                <div className="bg-white rounded-3xl p-10 shadow-xl border border-[hsl(30,20%,92%)] text-center">
                  <Quote className="w-12 h-12 text-[hsl(175,40%,75%)] mx-auto mb-6" />
                  <p className="text-xl lg:text-2xl text-[hsl(25,10%,25%)] leading-relaxed mb-8 italic">
                    "{item.text}"
                  </p>
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-[hsl(40,80%,55%)] text-[hsl(40,80%,55%)]" />
                    ))}
                  </div>
                  <div className="font-bold text-[hsl(25,10%,15%)]">{item.name}</div>
                  <div className="text-sm text-[hsl(175,50%,35%)] font-medium">{item.clinic}</div>
                </div>
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-8">
              {t.testimonials.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === activeTestimonial ? "bg-[hsl(175,50%,35%)] w-8" : "bg-[hsl(25,10%,80%)]"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CONTACT SECTION ════════ */}
      <section id="contact" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(175,40%,92%)] text-[hsl(175,50%,30%)] text-xs font-bold tracking-widest mb-6">
                {t.contact.tag}
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[hsl(25,10%,15%)] mb-6">{t.contact.title}</h2>
              <p className="text-lg text-[hsl(25,10%,40%)] mb-10">{t.contact.desc}</p>

              <div className="space-y-6">
                {[
                  { icon: <MapPin className="w-6 h-6" />, label: t.contact.address },
                  { icon: <Phone className="w-6 h-6" />, label: t.contact.phone },
                  { icon: <Mail className="w-6 h-6" />, label: t.contact.email },
                  { icon: <Clock className="w-6 h-6" />, label: t.contact.hours }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(175,40%,93%)] flex items-center justify-center text-[hsl(175,50%,30%)] shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[hsl(25,10%,30%)] pt-3 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[hsl(30,30%,97%)] rounded-3xl p-8 border border-[hsl(30,20%,92%)]">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-[hsl(25,10%,25%)] mb-2">
                    {lang === "vi" ? "Họ và tên" : "Full Name"}
                  </label>
                  <input className="w-full px-4 py-3 rounded-xl border border-[hsl(30,20%,88%)] bg-white focus:ring-2 focus:ring-[hsl(175,50%,40%)] focus:border-transparent outline-none transition-all text-[hsl(25,10%,20%)]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[hsl(25,10%,25%)] mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-[hsl(30,20%,88%)] bg-white focus:ring-2 focus:ring-[hsl(175,50%,40%)] focus:border-transparent outline-none transition-all text-[hsl(25,10%,20%)]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[hsl(25,10%,25%)] mb-2">
                    {lang === "vi" ? "Phòng khám / Tổ chức" : "Clinic / Organization"}
                  </label>
                  <input className="w-full px-4 py-3 rounded-xl border border-[hsl(30,20%,88%)] bg-white focus:ring-2 focus:ring-[hsl(175,50%,40%)] focus:border-transparent outline-none transition-all text-[hsl(25,10%,20%)]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[hsl(25,10%,25%)] mb-2">
                    {lang === "vi" ? "Nội dung tin nhắn" : "Message"}
                  </label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-[hsl(30,20%,88%)] bg-white focus:ring-2 focus:ring-[hsl(175,50%,40%)] focus:border-transparent outline-none transition-all resize-none text-[hsl(25,10%,20%)]" />
                </div>
                <Button className="w-full py-6 text-base font-bold rounded-2xl bg-gradient-to-r from-[hsl(175,50%,35%)] to-[hsl(175,60%,25%)] text-white hover:shadow-xl hover:shadow-[hsl(175,50%,35%)]/20 transition-all duration-300">
                  {lang === "vi" ? "Gửi tin nhắn" : "Send Message"} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="bg-[hsl(175,50%,10%)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={dentalLogo} alt="Logo" className="w-10 h-10" />
                <div>
                  <span className="font-bold text-lg">Digital Age</span>
                  <span className="block text-xs text-[hsl(40,80%,65%)] -mt-0.5">Dental Lab</span>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{t.footer.slogan}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[hsl(40,80%,65%)]">{lang === "vi" ? "Liên kết" : "Quick Links"}</h4>
              <div className="space-y-2">
                {navLinks.map(link => (
                  <button key={link.id} onClick={() => scrollTo(link.id)} className="block text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[hsl(40,80%,65%)]">{lang === "vi" ? "Pháp lý" : "Legal"}</h4>
              <div className="space-y-2">
                {t.footer.links.map((link, i) => (
                  <a key={i} href="#" className="block text-white/50 hover:text-white text-sm transition-colors">{link}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/40 text-sm">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[hsl(175,50%,35%)] text-white shadow-xl hover:bg-[hsl(175,50%,30%)] transition-all animate-in fade-in"
        >
          <ChevronUp className="w-6 h-6 mx-auto" />
        </button>
      )}
    </div>
  );
}
