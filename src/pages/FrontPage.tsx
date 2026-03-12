import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu, X, ChevronDown, ArrowRight, Shield, Clock, 
  Award, Users, Globe, Sparkles, CheckCircle2,
  GraduationCap, FileText, Monitor, Database, Package,
  BarChart3, MessageSquare, Image, Tv, Settings,
  ChevronUp, BookOpen, FolderKanban, Phone, Mail, MapPin,
  Microscope, Cpu, Zap, Building2, Heart, Flag, Star, TrendingUp, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dentalHeroBg from "@/assets/dental-hero-bg.jpg";
import dentalTeam from "@/assets/dental-team.jpg";
import dentalLogo from "@/assets/dental-logo.png";
import dentalServices from "@/assets/dental-services.jpg";

// ─── Language Content ────────────────────────────────────────────────
const content = {
  vi: {
    nav: { about: "Về chúng tôi", systems: "Hệ thống", services: "Dịch vụ", technology: "Công nghệ", team: "Đội ngũ", milestones: "Thành tựu", contact: "Liên hệ" },
    hero: {
      badge: "🏠 Cổng thông tin nội bộ",
      greeting: "Chào mừng đến với",
      title1: "Digital Age",
      title2: "Dental Lab",
      subtitle: "Cổng Thông Tin Nội Bộ",
      desc: "Truy cập nhanh tất cả hệ thống, ứng dụng và dịch vụ nội bộ của công ty. Mọi thứ bạn cần đều ở đây.",
      cta1: "Vào Portal chính",
      cta2: "Xem hệ thống",
      stats: [
        { value: "15+", label: "Năm hoạt động" },
        { value: "200+", label: "Nhân viên" },
        { value: "134K+", label: "Sản phẩm/tháng" },
        { value: "42", label: "Ứng dụng nội bộ" }
      ]
    },
    about: {
      tag: "VỀ CHÚNG TÔI",
      title: "Digital Age Dental Lab",
      desc: "Được thành lập với sứ mệnh nâng cao chất lượng phục hình răng thông qua công nghệ số. Với hơn 15 năm kinh nghiệm, chúng tôi tự hào là đơn vị gia công răng hàng đầu tại Việt Nam, phục vụ hơn 500 đối tác nha sĩ trong và ngoài nước.",
      values: [
        { icon: "shield", title: "ISO 13485 & FDA", desc: "Tuân thủ nghiêm ngặt tiêu chuẩn quốc tế" },
        { icon: "clock", title: "OTD 100%", desc: "Cam kết giao hàng đúng hạn tuyệt đối" },
        { icon: "award", title: "Vật liệu chính hãng", desc: "100% vật liệu nhập khẩu cao cấp" },
        { icon: "users", title: "200+ Kỹ thuật viên", desc: "Đội ngũ được đào tạo chuyên nghiệp" }
      ]
    },
    systems: {
      tag: "HỆ THỐNG NỘI BỘ",
      title: "Truy cập nhanh các Hệ thống",
      desc: "Tất cả công cụ và ứng dụng bạn cần để làm việc hiệu quả",
      categories: [
        {
          title: "Quản lý & Vận hành",
          items: [
            { name: "IT Portal", desc: "Cổng thông tin IT chính", icon: "monitor", url: "/", color: "from-blue-500 to-blue-600" },
            { name: "Main Portal", desc: "Dashboard tổng hợp", icon: "grid", url: "/portal", color: "from-emerald-500 to-emerald-600" },
            { name: "Material Request", desc: "Yêu cầu nguyên vật liệu", icon: "package", url: "/material-request", color: "from-orange-500 to-orange-600" },
            { name: "Project Management", desc: "Quản lý dự án MIS", icon: "folder", url: "/mis/project-management", color: "from-purple-500 to-purple-600" },
          ]
        },
        {
          title: "Đào tạo & Phát triển",
          items: [
            { name: "Training Center", desc: "Trung tâm đào tạo", icon: "graduation", url: "/training-center/dashboard", color: "from-indigo-500 to-indigo-600" },
            { name: "Education", desc: "Tài liệu đào tạo", icon: "book", url: "/education", color: "from-cyan-500 to-cyan-600" },
            { name: "Dictionary", desc: "Từ điển chuyên ngành", icon: "bookopen", url: "/dictionary", color: "from-teal-500 to-teal-600" },
            { name: "Quiz Center", desc: "Kiểm tra kiến thức", icon: "check", url: "/training/quiz", color: "from-pink-500 to-pink-600" },
          ]
        },
        {
          title: "Nội dung & Truyền thông",
          items: [
            { name: "News Center", desc: "Tin tức & thông báo", icon: "message", url: "/news/center", color: "from-red-500 to-red-600" },
            { name: "Content Management", desc: "Quản lý nội dung", icon: "file", url: "/content-management", color: "from-violet-500 to-violet-600" },
            { name: "Media Gallery", desc: "Thư viện hình ảnh & video", icon: "image", url: "/media-gallery", color: "from-rose-500 to-rose-600" },
            { name: "TV Display", desc: "Màn hình hiển thị TV", icon: "tv", url: "/tv-display", color: "from-amber-500 to-amber-600" },
          ]
        }
      ]
    },
    services: {
      tag: "NĂNG LỰC SẢN XUẤT",
      title: "Dịch vụ Gia công Răng",
      items: [
        { title: "Crown & Bridge (C&S)", desc: "Mão răng sứ, cầu răng với hệ thống CAD/CAM", capacity: "94,700 units/tháng", icon: "microscope" },
        { title: "Removable (RPD)", desc: "Hàm tháo lắp, khung kim loại với 3D scanning", capacity: "24,100 units/tháng", icon: "cpu" },
        { title: "R&D (NG)", desc: "Nghiên cứu vật liệu & quy trình mới", capacity: "15,700 units/tháng", icon: "zap" },
        { title: "Implant Solutions", desc: "Abutment tùy chỉnh & surgical guides", capacity: "Theo yêu cầu", icon: "sparkles" },
      ]
    },
    technology: {
      tag: "CÔNG NGHỆ",
      title: "Nền tảng Công nghệ Số",
      desc: "Đầu tư mạnh vào công nghệ để đảm bảo chất lượng sản phẩm hoàn hảo.",
      items: [
        { title: "3D Scanning", desc: "Quét dấu răng kỹ thuật số, độ chính xác 7 micron" },
        { title: "CAD/CAM Design", desc: "Thiết kế 3D với phần mềm chuyên dụng hàng đầu" },
        { title: "CNC Milling", desc: "Gia công CNC 5 trục, độ khít sát tối ưu" },
        { title: "3D Printing", desc: "In 3D vật liệu y tế cho mẫu thử" },
        { title: "Sintering", desc: "Lò nung chân không ±1°C" },
        { title: "Quality Control", desc: "Kiểm tra chất lượng đa tầng" }
      ]
    },
    team: {
      tag: "ĐỘI NGŨ",
      title: "Con người là Tài sản Quý giá nhất",
      desc: "Hơn 200 kỹ thuật viên tay nghề cao, được đào tạo liên tục.",
      members: [
        { name: "Dr. Nguyễn Văn An", role: "Giám đốc Kỹ thuật", exp: "20 năm kinh nghiệm" },
        { name: "ThS. Trần Thị Bình", role: "Trưởng phòng R&D", exp: "15 năm kinh nghiệm" },
        { name: "KTV. Lê Hoàng Cường", role: "Trưởng bộ phận C&S", exp: "12 năm kinh nghiệm" },
        { name: "KTV. Phạm Minh Đức", role: "Trưởng bộ phận RPD", exp: "10 năm kinh nghiệm" }
      ]
    },
    milestones: {
      tag: "THÀNH TỰU",
      title: "Hành trình Phát triển",
      desc: "Những cột mốc quan trọng đánh dấu sự phát triển không ngừng của Digital Age Dental Lab.",
      items: [
        { year: "2009", title: "Thành lập công ty", desc: "Digital Age Dental Lab chính thức ra đời tại Bình Dương với 20 nhân viên đầu tiên.", icon: "flag" },
        { year: "2012", title: "Đạt chứng nhận ISO 13485", desc: "Hệ thống quản lý chất lượng đạt tiêu chuẩn quốc tế cho thiết bị y tế.", icon: "award" },
        { year: "2015", title: "Xuất khẩu quốc tế", desc: "Mở rộng thị trường sang Nhật Bản, Úc và các nước ASEAN.", icon: "globe" },
        { year: "2017", title: "Đầu tư CAD/CAM", desc: "Triển khai hệ thống thiết kế và gia công kỹ thuật số toàn diện.", icon: "cpu" },
        { year: "2019", title: "100 nhân viên", desc: "Đội ngũ phát triển lên 100 kỹ thuật viên, mở rộng nhà máy giai đoạn 2.", icon: "users" },
        { year: "2021", title: "FDA Approved", desc: "Đạt chứng nhận FDA Hoa Kỳ, mở rộng xuất khẩu sang thị trường Mỹ.", icon: "star" },
        { year: "2023", title: "134K+ sản phẩm/tháng", desc: "Đạt công suất 134,000+ đơn vị sản phẩm mỗi tháng với 200+ nhân viên.", icon: "trending" },
        { year: "2025", title: "Chuyển đổi số toàn diện", desc: "Triển khai hệ thống MES, ERP và 42+ ứng dụng nội bộ hỗ trợ vận hành.", icon: "zap" },
      ]
    },
    contact: {
      tag: "LIÊN HỆ NỘI BỘ",
      title: "Thông tin Liên hệ",
      desc: "Liên hệ phòng IT hoặc các bộ phận hỗ trợ khi cần.",
      address: "Lô CN-01, KCN VSIP II-A, Bình Dương, Việt Nam",
      phone: "Ext. 100 (IT Support) | Ext. 200 (HR)",
      email: "it-support@digitalagedentallab.com",
      hours: "Thứ 2 - Thứ 7: 7:30 - 17:30",
      quickLinks: "Truy cập nhanh"
    },
    footer: {
      slogan: "Nâng tầm nụ cười Việt với công nghệ số",
      copyright: "© 2025 Digital Age Dental Lab. Internal Use Only.",
      links: ["IT Helpdesk", "HR Portal", "Chính sách công ty"]
    }
  },
  en: {
    nav: { about: "About Us", systems: "Systems", services: "Services", technology: "Technology", team: "Team", milestones: "Milestones", contact: "Contact" },
    hero: {
      badge: "🏠 Internal Information Portal",
      greeting: "Welcome to",
      title1: "Digital Age",
      title2: "Dental Lab",
      subtitle: "Internal Information Portal",
      desc: "Quick access to all company systems, applications and internal services. Everything you need is right here.",
      cta1: "Go to Main Portal",
      cta2: "View Systems",
      stats: [
        { value: "15+", label: "Years Operating" },
        { value: "200+", label: "Employees" },
        { value: "134K+", label: "Units/Month" },
        { value: "42", label: "Internal Apps" }
      ]
    },
    about: {
      tag: "ABOUT US",
      title: "Digital Age Dental Lab",
      desc: "Founded with the mission to elevate dental restoration quality through digital technology. With over 15 years of experience, we are proudly one of the leading dental labs in Vietnam, serving over 500 dentist partners domestically and internationally.",
      values: [
        { icon: "shield", title: "ISO 13485 & FDA", desc: "Strict compliance with international standards" },
        { icon: "clock", title: "100% OTD", desc: "Absolute on-time delivery commitment" },
        { icon: "award", title: "Genuine Materials", desc: "100% premium imported materials" },
        { icon: "users", title: "200+ Technicians", desc: "Professionally trained team" }
      ]
    },
    systems: {
      tag: "INTERNAL SYSTEMS",
      title: "Quick Access to Systems",
      desc: "All tools and applications you need to work efficiently",
      categories: [
        {
          title: "Management & Operations",
          items: [
            { name: "IT Portal", desc: "Main IT information portal", icon: "monitor", url: "/", color: "from-blue-500 to-blue-600" },
            { name: "Main Portal", desc: "Aggregated dashboard", icon: "grid", url: "/portal", color: "from-emerald-500 to-emerald-600" },
            { name: "Material Request", desc: "Material request system", icon: "package", url: "/material-request", color: "from-orange-500 to-orange-600" },
            { name: "Project Management", desc: "MIS project management", icon: "folder", url: "/mis/project-management", color: "from-purple-500 to-purple-600" },
          ]
        },
        {
          title: "Training & Development",
          items: [
            { name: "Training Center", desc: "Training center dashboard", icon: "graduation", url: "/training-center/dashboard", color: "from-indigo-500 to-indigo-600" },
            { name: "Education", desc: "Training materials", icon: "book", url: "/education", color: "from-cyan-500 to-cyan-600" },
            { name: "Dictionary", desc: "Technical dictionary", icon: "bookopen", url: "/dictionary", color: "from-teal-500 to-teal-600" },
            { name: "Quiz Center", desc: "Knowledge assessment", icon: "check", url: "/training/quiz", color: "from-pink-500 to-pink-600" },
          ]
        },
        {
          title: "Content & Communication",
          items: [
            { name: "News Center", desc: "News & announcements", icon: "message", url: "/news/center", color: "from-red-500 to-red-600" },
            { name: "Content Management", desc: "Content management", icon: "file", url: "/content-management", color: "from-violet-500 to-violet-600" },
            { name: "Media Gallery", desc: "Image & video library", icon: "image", url: "/media-gallery", color: "from-rose-500 to-rose-600" },
            { name: "TV Display", desc: "TV display screens", icon: "tv", url: "/tv-display", color: "from-amber-500 to-amber-600" },
          ]
        }
      ]
    },
    services: {
      tag: "PRODUCTION CAPACITY",
      title: "Dental Lab Services",
      items: [
        { title: "Crown & Bridge (C&S)", desc: "Porcelain crowns & bridges with CAD/CAM", capacity: "94,700 units/month", icon: "microscope" },
        { title: "Removable (RPD)", desc: "Removable dentures with 3D scanning", capacity: "24,100 units/month", icon: "cpu" },
        { title: "R&D (NG)", desc: "New materials & process research", capacity: "15,700 units/month", icon: "zap" },
        { title: "Implant Solutions", desc: "Custom abutments & surgical guides", capacity: "On demand", icon: "sparkles" },
      ]
    },
    technology: {
      tag: "TECHNOLOGY",
      title: "Digital Technology Platform",
      desc: "Heavy investment in technology to ensure perfect product quality.",
      items: [
        { title: "3D Scanning", desc: "Digital impression scanning, 7-micron accuracy" },
        { title: "CAD/CAM Design", desc: "3D design with world-leading software" },
        { title: "CNC Milling", desc: "5-axis CNC machining, optimal fit" },
        { title: "3D Printing", desc: "Medical-grade 3D printing for models" },
        { title: "Sintering", desc: "Vacuum sintering furnace ±1°C" },
        { title: "Quality Control", desc: "Multi-level quality checks" }
      ]
    },
    team: {
      tag: "OUR TEAM",
      title: "People are our Greatest Asset",
      desc: "Over 200 highly skilled technicians, continuously trained.",
      members: [
        { name: "Dr. Nguyen Van An", role: "Technical Director", exp: "20 years experience" },
        { name: "MSc. Tran Thi Binh", role: "R&D Head", exp: "15 years experience" },
        { name: "Tech. Le Hoang Cuong", role: "C&S Department Head", exp: "12 years experience" },
        { name: "Tech. Pham Minh Duc", role: "RPD Department Head", exp: "10 years experience" }
      ]
    },
    milestones: {
      tag: "MILESTONES",
      title: "Our Journey",
      desc: "Key milestones marking the continuous growth of Digital Age Dental Lab.",
      items: [
        { year: "2009", title: "Company Founded", desc: "Digital Age Dental Lab officially established in Binh Duong with 20 founding employees.", icon: "flag" },
        { year: "2012", title: "ISO 13485 Certified", desc: "Quality management system achieved international standards for medical devices.", icon: "award" },
        { year: "2015", title: "International Expansion", desc: "Expanded market to Japan, Australia and ASEAN countries.", icon: "globe" },
        { year: "2017", title: "CAD/CAM Investment", desc: "Deployed comprehensive digital design and manufacturing system.", icon: "cpu" },
        { year: "2019", title: "100 Employees", desc: "Team grew to 100 technicians, factory phase 2 expansion.", icon: "users" },
        { year: "2021", title: "FDA Approved", desc: "Achieved US FDA certification, expanding exports to the American market.", icon: "star" },
        { year: "2023", title: "134K+ Units/Month", desc: "Reached capacity of 134,000+ product units per month with 200+ employees.", icon: "trending" },
        { year: "2025", title: "Full Digital Transformation", desc: "Deployed MES, ERP and 42+ internal applications for operations.", icon: "zap" },
      ]
    },
    contact: {
      tag: "INTERNAL CONTACT",
      title: "Contact Information",
      desc: "Contact IT department or support teams when needed.",
      address: "Lot CN-01, VSIP II-A Industrial Park, Binh Duong, Vietnam",
      phone: "Ext. 100 (IT Support) | Ext. 200 (HR)",
      email: "it-support@digitalagedentallab.com",
      hours: "Monday - Saturday: 7:30 AM - 5:30 PM",
      quickLinks: "Quick Access"
    },
    footer: {
      slogan: "Elevating Vietnamese Smiles with Digital Technology",
      copyright: "© 2025 Digital Age Dental Lab. Internal Use Only.",
      links: ["IT Helpdesk", "HR Portal", "Company Policies"]
    }
  }
};

// ─── Icon mapper ─────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  monitor: <Monitor className="w-5 h-5" />,
  grid: <Building2 className="w-5 h-5" />,
  package: <Package className="w-5 h-5" />,
  folder: <FolderKanban className="w-5 h-5" />,
  graduation: <GraduationCap className="w-5 h-5" />,
  book: <BookOpen className="w-5 h-5" />,
  bookopen: <BookOpen className="w-5 h-5" />,
  check: <CheckCircle2 className="w-5 h-5" />,
  message: <MessageSquare className="w-5 h-5" />,
  file: <FileText className="w-5 h-5" />,
  image: <Image className="w-5 h-5" />,
  tv: <Tv className="w-5 h-5" />,
  microscope: <Microscope className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  flag: <Flag className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  trending: <TrendingUp className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
};

export default function FrontPage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const navigate = useNavigate();
  const t = content[lang];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "systems", label: t.nav.systems },
    { id: "services", label: t.nav.services },
    { id: "technology", label: t.nav.technology },
    { id: "team", label: t.nav.team },
    { id: "milestones", label: t.nav.milestones },
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

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-xl ${scrolled ? "text-[hsl(25,10%,30%)]" : "text-white"}`}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

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

            <p className="text-lg text-[hsl(40,40%,80%)] font-medium mb-2 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {t.hero.greeting}
            </p>
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
                onClick={() => navigate("/")}
                className="px-8 py-6 text-base font-bold rounded-2xl bg-gradient-to-r from-[hsl(40,80%,55%)] to-[hsl(30,70%,50%)] text-[hsl(25,20%,15%)] hover:shadow-2xl hover:shadow-[hsl(40,80%,55%)]/30 hover:scale-105 transition-all duration-300 border-0"
              >
                {t.hero.cta1} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollTo("systems")}
                className="px-8 py-6 text-base font-bold rounded-2xl border-2 border-white/30 text-white bg-white/5 hover:bg-white/15 hover:border-white/50 transition-all duration-300"
              >
                {t.hero.cta2}
              </Button>
            </div>

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

      {/* ════════ INTERNAL SYSTEMS SECTION ════════ */}
      <section id="systems" className="py-24 lg:py-32 bg-gradient-to-b from-[hsl(30,30%,97%)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(175,40%,92%)] text-[hsl(175,50%,30%)] text-xs font-bold tracking-widest mb-6">
              {t.systems.tag}
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[hsl(25,10%,15%)] mb-4">
              {t.systems.title}
            </h2>
            <p className="text-lg text-[hsl(25,10%,45%)] max-w-2xl mx-auto">{t.systems.desc}</p>
          </div>

          <div className="space-y-12">
            {t.systems.categories.map((cat, ci) => (
              <div key={ci}>
                <h3 className="text-xl font-bold text-[hsl(25,10%,20%)] mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[hsl(175,50%,40%)] to-[hsl(175,60%,25%)]" />
                  {cat.title}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(item.url)}
                      className="group text-left p-5 rounded-2xl bg-white border border-[hsl(30,20%,92%)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-[hsl(175,40%,75%)]"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                        {iconMap[item.icon]}
                      </div>
                      <h4 className="font-bold text-[hsl(25,10%,15%)] mb-1">{item.name}</h4>
                      <p className="text-sm text-[hsl(25,10%,50%)]">{item.desc}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[hsl(175,50%,35%)] opacity-0 group-hover:opacity-100 transition-opacity">
                        {lang === "vi" ? "Mở" : "Open"} <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SERVICES / CAPACITY SECTION ════════ */}
      <section id="services" className="py-24 lg:py-32 bg-white">
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
              <div key={i} className="group relative p-8 rounded-3xl bg-[hsl(30,30%,97%)] border border-[hsl(30,20%,92%)] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(175,50%,40%)] to-[hsl(175,60%,28%)] flex items-center justify-center text-white shrink-0">
                    {iconMap[svc.icon]}
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
                <img src={dentalServices} alt="Team at work" className="w-full h-[450px] object-cover" />
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

      {/* ════════ CONTACT / INTERNAL INFO SECTION ════════ */}
      <section id="contact" className="py-24 lg:py-32 bg-gradient-to-b from-[hsl(30,30%,97%)] to-white">
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

            {/* Quick Access Panel instead of Contact Form */}
            <div className="bg-white rounded-3xl p-8 border border-[hsl(30,20%,92%)] shadow-lg">
              <h3 className="text-xl font-bold text-[hsl(25,10%,15%)] mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[hsl(175,50%,35%)]" />
                {t.contact.quickLinks}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "IT Portal", url: "/", icon: <Monitor className="w-5 h-5" />, color: "from-blue-500 to-blue-600" },
                  { label: "Training", url: "/training-center/dashboard", icon: <GraduationCap className="w-5 h-5" />, color: "from-indigo-500 to-indigo-600" },
                  { label: "News", url: "/news/center", icon: <MessageSquare className="w-5 h-5" />, color: "from-red-500 to-red-600" },
                  { label: "Material Request", url: "/material-request", icon: <Package className="w-5 h-5" />, color: "from-orange-500 to-orange-600" },
                  { label: "Media Gallery", url: "/media-gallery", icon: <Image className="w-5 h-5" />, color: "from-rose-500 to-rose-600" },
                  { label: "Dictionary", url: "/dictionary", icon: <BookOpen className="w-5 h-5" />, color: "from-teal-500 to-teal-600" },
                  { label: "TV Display", url: "/tv-display", icon: <Tv className="w-5 h-5" />, color: "from-amber-500 to-amber-600" },
                  { label: "User Permissions", url: "/user-permissions", icon: <Settings className="w-5 h-5" />, color: "from-gray-500 to-gray-600" },
                ].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(link.url)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(30,30%,97%)] hover:bg-[hsl(175,40%,95%)] border border-[hsl(30,20%,92%)] hover:border-[hsl(175,40%,80%)] transition-all text-left group"
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform`}>
                      {link.icon}
                    </div>
                    <span className="text-sm font-semibold text-[hsl(25,10%,25%)]">{link.label}</span>
                  </button>
                ))}
              </div>
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
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Heart className="w-3 h-3" />
                <span>Made with love by IT Department</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[hsl(40,80%,65%)]">{lang === "vi" ? "Điều hướng" : "Navigation"}</h4>
              <div className="space-y-2">
                {navLinks.map(link => (
                  <button key={link.id} onClick={() => scrollTo(link.id)} className="block text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[hsl(40,80%,65%)]">{lang === "vi" ? "Hỗ trợ" : "Support"}</h4>
              <div className="space-y-2">
                {t.footer.links.map((link, i) => (
                  <button key={i} className="block text-white/50 hover:text-white text-sm transition-colors">
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/30 text-sm">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[hsl(175,50%,35%)] text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
