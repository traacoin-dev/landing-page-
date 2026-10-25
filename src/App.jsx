import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import logoImg from "./assets/ksc-logo.png";
import FormComponent from "./components/FormComponent.jsx";
// import CourseComponent from "./components/CourseComponent.jsx"; // removed per new design
// import BatchesComponent from "./components/BatchesComponent.jsx"; // removed per new design
import {
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Award,
  FileText,
  Calendar,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  Sparkles,
  Download,
  Eye,
  Star,
  Check,
  PhoneCall,
  UserCheck,
  Radio,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldCheck,
  Compass,
  Play,
  Pause,
  Maximize2,
} from "lucide-react";

// Data Content imports from modular JSON files (src/data/)
import coursesData from "./data/courses.json";
import batchesData from "./data/batches.json";
import galleryData from "./data/gallery.json";
import achieversData from "./data/achievers.json";
import mapData from "./data/map.json";

// Official Brand Assets
const CLOUDINARY_LOGO = "https://res.cloudinary.com/oapmlpnu/image/upload/v1792001715/ksc-logo.png";
const FALLBACK_LOGO = CLOUDINARY_LOGO;
const LOGO_URL = logoImg || CLOUDINARY_LOGO;
const RK_MASTER_IMG = "https://i.ibb.co/mV6pY161/RK-Master-copy.jpg";

// WhatsApp Link Redirecting Directly to 9491844963
const WHATSAPP_LINK = "https://wa.me/919491844963?text=Hi%20Kutty%20Study%20Circle%2C%20I%20am%20interested%20in%20DSC%20training%20and%20batches";

// Paste your deployed Google Apps Script Web App URL below:
// Example: "https://script.google.com/macros/s/AKfycb.../exec"
const GOOGLE_SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyJ5_p8AOx7L61hptSwTTaKaa8UeSLN6wXViyfmL_U91WdyxRGF1X8cpCGjdpLeFGdfbQ/exec";

// Modularized Content Data (Easily editable in src/data/*.json)
const COURSES_DATA = coursesData;
const CURRENT_RUNNING_BATCHES = batchesData.currentRunning;
const UPCOMING_15_DAYS_DSC_BATCHES = batchesData.upcoming15DaysDSC;
const PREMIUM_GALLERY_PHOTOS = galleryData;
const ACHIEVERS_DATA = achieversData;

// Social Media Icons
function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function App() {
  const [activeBatchTab, setActiveBatchTab] = useState("upcoming15"); // default to upcoming 15 days DSC batches
  const [lightboxImg, setLightboxImg] = useState(null);
  const [selectedMapBranch, setSelectedMapBranch] = useState("chittoor");
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Premium Gallery State & Refs
  const [activeGallerySlide, setActiveGallerySlide] = useState(0);
  const [isGalleryAutoPlay, setIsGalleryAutoPlay] = useState(true);
  const [galleryCategory, setGalleryCategory] = useState("all");

  const slideImgRef = useRef(null);
  const slideContentRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Lead Generation Form State & Validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [demoForm, setDemoForm] = useState({
    name: "",
    mobile: "",
    course: "AP DSC 2026 (SGT Batch)",
    branch: "Tirupati",
    mode: "offline", // offline or online
  });

  const heroRef = useRef(null);
  const statYearsRef = useRef(null);
  const statStudentsRef = useRef(null);
  const statMentorsRef = useRef(null);
  const statBranchesRef = useRef(null);

  // Filtered gallery photos based on category
  const filteredPhotos = galleryCategory === "all"
    ? PREMIUM_GALLERY_PHOTOS
    : PREMIUM_GALLERY_PHOTOS.filter((p) => p.category === galleryCategory);

  // Initialize AOS & GSAP Animations
  useEffect(() => {
    AOS.init({
      duration: 650,
      once: true,
      easing: "ease-out-cubic",
      offset: 40,
    });

    // GSAP Hero Entrance Sequence
    const ctx = gsap.context(() => {
      gsap.from(".gsap-hero-badge", {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".gsap-hero-title", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(".gsap-hero-sub", {
        opacity: 0,
        y: 15,
        duration: 0.7,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.from(".gsap-hero-form", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        delay: 0.35,
        ease: "power3.out",
      });

      // Animated Stats Counters
      const countObj = { years: 0, students: 0, mentors: 0, branches: 0 };
      gsap.to(countObj, {
        years: 14,
        students: 2000,
        mentors: 80,
        branches: 3,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          if (statYearsRef.current) statYearsRef.current.innerText = `${Math.floor(countObj.years)}+`;
          if (statStudentsRef.current) statStudentsRef.current.innerText = `${Math.floor(countObj.students)}+`;
          if (statMentorsRef.current) statMentorsRef.current.innerText = `${Math.floor(countObj.mentors)}+`;
          if (statBranchesRef.current) statBranchesRef.current.innerText = `${Math.floor(countObj.branches)}`;
        },
      });
    }, heroRef);

    // Scroll listener for sticky mobile action bar
    const handleScroll = () => {
      setShowFloatingBar(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Premium Gallery GSAP transition when slide changes
  useEffect(() => {
    if (slideImgRef.current && slideContentRef.current) {
      gsap.fromTo(
        slideImgRef.current,
        { scale: 1.08, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        slideContentRef.current.children,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, [activeGallerySlide, galleryCategory]);

  // Gallery Autoplay timer
  useEffect(() => {
    if (!isGalleryAutoPlay) return;
    const timer = setInterval(() => {
      setActiveGallerySlide((prev) => (prev + 1) % filteredPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isGalleryAutoPlay, filteredPhotos.length]);

  const handleCategoryChange = (cat) => {
    setGalleryCategory(cat);
    setActiveGallerySlide(0);
  };

  // Mobile Touch Swipe Handling for Gallery
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      setActiveGallerySlide((prev) => (prev + 1) % filteredPhotos.length);
    } else if (diff < -45) {
      setActiveGallerySlide((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnrollClick = (courseTitle) => {
    setDemoForm((prev) => ({ ...prev, course: courseTitle }));
    scrollToSection("free-demo-form");
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    const modeLabel = demoForm.mode === "online" ? "Online (Live Virtual)" : `${demoForm.branch} Branch (Offline)`;

    try {
      if (GOOGLE_SCRIPT_WEB_APP_URL && GOOGLE_SCRIPT_WEB_APP_URL.startsWith("http")) {
        // Send lead directly to Google Apps Script Web App
        await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: demoForm.name,
            mobile: demoForm.mobile,
            course: demoForm.course,
            mode: demoForm.mode,
            branch: demoForm.branch,
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch (err) {
      console.warn("Google Apps Script submission:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      alert(`Thank you ${demoForm.name || "Student"}! Your seat reservation for ${demoForm.course} (${modeLabel}) has been registered. Our academic counsellor will call you at ${demoForm.mobile} within 15 minutes.`);
      setDemoForm({
        name: "",
        mobile: "",
        course: "AP DSC 2026 (SGT Batch)",
        branch: "Tirupati",
        mode: "offline",
      });
      setTimeout(() => setSubmitSuccess(false), 8000);
    }
  };

  const currentPhoto = filteredPhotos[activeGallerySlide] || filteredPhotos[0];

  return (
    <div className="relative min-h-screen bg-white text-slate-900 antialiased selection:bg-[#F59E0B] selection:text-[#0B356D]">
      {/* =========================================================================
          SLEEK BRAND HEADER & LIVE TOP SCROLL BAR (NAVBAR REMOVED AS REQUESTED)
      ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white shadow-md border-b border-slate-200">
        {/* Top Brand & Direct Call / WhatsApp Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <img
              src={LOGO_URL}
              alt="Kutty Study Circle"
              className="h-8 sm:h-10 w-auto object-contain"
              onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }}
            />
            <span className="hidden md:inline-block text-[10px] text-slate-500 font-bold border-l border-slate-300 pl-2 leading-tight">
              Chittoor<br />Tirupati · Palamaner
            </span>
          </a>

          {/* Quick Direct Actions on Header: Direct Call & WhatsApp to 9491844963 */}
          <div className="flex items-center gap-2">
            <a
              href="tel:9491844963"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-[#0B356D] border border-[#0B356D] hover:bg-blue-50 rounded-lg flex items-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>94918 44963</span>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-1.5 transition"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          
        

        {/* TOP SCROLL BAR: Updated New Batch Starts for DSC Training (Requested by user) */}
          </div>
        </div>
        <div className="bg-[#0B356D] text-white py-2 px-3 border-t border-b border-blue-900/60 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center">
            <div className="flex-shrink-0 flex items-center gap-1.5 bg-[#F59E0B] text-[#072247] font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 rounded shadow-xs mr-3 z-10 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#072247] animate-ping" />
              <span>DSC TRAINING</span>
            
            </div>
            <div className="flex-1 overflow-hidden relative">
              <div className="animate-ticker flex items-center gap-8 text-xs sm:text-sm font-medium text-slate-100 whitespace-nowrap">
                <span>🔥 <strong>Updated:</strong> New Batch Starts for DSC Training in Next 15 Days (SGT &amp; School Assistant) · Admissions Open across Chittoor, Tirupati &amp; Palamaner</span>
                <span className="text-[#FBBF24]">★</span>
                <span>📞 Call or WhatsApp: <strong>94918 44963</strong></span>
                <span className="text-[#FBBF24]">★</span>
                <span>🔥 <strong>Updated:</strong> New Batch Starts for DSC Training in Next 15 Days (SGT &amp; School Assistant) · Admissions Open across Chittoor, Tirupati &amp; Palamaner</span>
                <span className="text-[#FBBF24]">★</span>
                <span>📞 Call or WhatsApp: <strong>94918 44963</strong></span>
              
            
          
        
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 1: HERO & LEAD GENERATION (99% Mobile-First)
      ========================================================================= */}
      <section
        id="free-demo"
        ref={heroRef}
        className="relative bg-gradient-to-b from-[#0B356D] via-[#092B59] to-[#061D3D] text-white pt-8 pb-14 sm:py-20 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="gsap-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/35 text-[#FBBF24] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Next 15 Days Batch Starting for DSC</span>
              

              </div>
              <h1 className="gsap-hero-title font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-white">
                Crack TET, DSC, SI &amp; Constable with the{" "}
                <span className="text-[#FBBF24]">right guidance</span>
              </h1>

              <p className="text-amber-200/90 text-sm sm:text-base font-medium">
                మీ ప్రభుత్వ ఉద్యోగ కలకు, మీ ఊరిలోనే అత్యుత్తమ క్లాస్‌రూమ్ కోచింగ్
              </p>

              <p className="gsap-hero-sub text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
                Structured batches, weekly mock test simulations and mentors who have walked your path. Classroom branches at Chittoor, Tirupati and Palamaner.
              </p>

              {/* Dual Action CTA Buttons */}
              <div className="pt-1 flex flex-row items-center gap-3">
                <a
                  href="#free-demo-form"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#072247] font-extrabold text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-center"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-center"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              

              {/* 4 Stats Cards */}
              </div>
              <div className="grid grid-cols-4 gap-2 pt-3">
                <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-white/15 text-center">
                  <div ref={statYearsRef} className="text-xl sm:text-2xl font-black text-[#FBBF24] font-serif">14+
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-300 mt-0.5 font-medium leading-tight">Years
                

                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-white/15 text-center">
                  <div ref={statStudentsRef} className="text-xl sm:text-2xl font-black text-[#FBBF24] font-serif">2,000+
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-300 mt-0.5 font-medium leading-tight">Selections
                

                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-white/15 text-center">
                  <div ref={statMentorsRef} className="text-xl sm:text-2xl font-black text-[#FBBF24] font-serif">80+
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-300 mt-0.5 font-medium leading-tight">Mentors
                

                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-white/15 text-center">
                  <div ref={statBranchesRef} className="text-xl sm:text-2xl font-black text-[#FBBF24] font-serif">3
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-300 mt-0.5 font-medium leading-tight">Branches
                
              
            

            {/* Right Column: Lead Form Card ("form leave like that only") */}
                  </div>
                </div>
              </div>
            </div>
            <div id="free-demo-form" className="gsap-hero-form lg:col-span-5">
              <div className="bg-white rounded-2xl p-5 sm:p-7 text-slate-900 shadow-2xl border border-slate-100 relative">
                <div className="mb-4">
                  <div className="inline-block bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded mb-1">
                    Free Trial Class
                  
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B356D]">
                    Book your free demo class
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Takes 30 seconds. No fee required. Fast callback.
                  </p>
                

                {/* Mode Selector (Offline vs Online) */}
                </div>
                <div className="mb-4">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Preferred Mode
                  </label>
                  <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl gap-1">
                    <button
                      type="button"
                      onClick={() => setDemoForm({ ...demoForm, mode: "offline" })}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg transition ${
                        demoForm.mode === "offline"
                          ? "bg-[#0B356D] text-white shadow-sm"
                          : "text-slate-600 hover:text-[#0B356D]"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Offline (Classroom)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoForm({ ...demoForm, mode: "online" })}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg transition ${
                        demoForm.mode === "online"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-slate-600 hover:text-emerald-700"
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Online (Virtual)</span>
                    </button>
                  
                

                {/* Form Fields (Retained exactly as requested) */}
                  </div>
                </div>
                <form onSubmit={handleDemoSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lakshmi / Ramesh"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B356D] text-slate-900 bg-white"
                    />
                  

                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={demoForm.mobile}
                      onChange={(e) => setDemoForm({ ...demoForm, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B356D] text-slate-900 bg-white"
                    />
                  

                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Target Course
                    </label>
                    <select
                      value={demoForm.course}
                      onChange={(e) => setDemoForm({ ...demoForm, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B356D] text-slate-900 bg-white"
                    >
                      <option value="AP DSC 2026 (SGT Batch)">AP DSC 2026 (SGT Fast-Track Batch)</option>
                      <option value="AP DSC 2026 (School Assistant)">AP DSC 2026 (School Assistant Maths/Science/Social)</option>
                      <option value="Teacher Eligibility Test (TET)">Teacher Eligibility Test (TET Paper 1 &amp; 2)</option>
                      <option value="AP Police SI / Constable">AP Police SI &amp; Constable (Written + Physical)</option>
                      <option value="Banking & SSC">Banking &amp; SSC Comprehensive</option>
                      <option value="Railway (RRB NTPC, Group D)">Railway (RRB NTPC &amp; Group D)</option>
                    </select>
                  

                  {demoForm.mode === "offline" && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nearest Branch
                      </label>
                      <select
                        value={demoForm.branch}
                        onChange={(e) => setDemoForm({ ...demoForm, branch: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B356D] text-slate-900 bg-white"
                      >
                        <option value="Tirupati">Tirupati (AIR Bypass Road, MR Palle Circle)</option>
                        <option value="Chittoor">Chittoor (Head Office - Mittoor)</option>
                        <option value="Palamaner">Palamaner (Town Center)</option>
                      </select>
                    
                    </div>
                  )}

                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 font-extrabold text-sm rounded-xl shadow-md transition transform hover:-translate-y-0.5 uppercase tracking-wide bg-[#F59E0B] hover:bg-[#D97706] text-[#072247] disabled:opacity-75 disabled:cursor-wait"
                  >
                    {isSubmitting
                      ? "⏳ Registering Your Seat..."
                      : demoForm.mode === "online"
                      ? "📡 Book Online Demo Class"
                      : "🏫 Reserve Free Demo Seat"}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center leading-tight">
                    Our counsellor will call you back within 15 minutes, 8 AM to 8 PM.
                  </p>
                </form>
              
            
          
        
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT US & FOUNDER SPOTLIGHT
      ========================================================================= */}
      <section id="about" className="py-14 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B356D] bg-blue-100 px-3.5 py-1.5 rounded-full">
              About Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B356D] mt-3">
              Built around the student
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              For 14 years, Kutty Study Circle has guided hardworking students in Rayalaseema into government careers through expert mentors and honest, result-focused preparation.
            </p>
          

          {/* Founder Message Card */}
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-[#FFF9EE] rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-md max-w-4xl mx-auto relative mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#F59E0B] shadow-md bg-white">
                  <img
                    src={RK_MASTER_IMG}
                    alt="RK Master"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#0B356D] text-white p-1.5 rounded-full shadow">
                  <Award className="w-4 h-4 text-[#F59E0B]" />
                
              

                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <blockquote className="text-sm sm:text-base text-slate-800 italic leading-relaxed">
                  &ldquo;Over the past 14 years, our sole objective has been to take aspirants from humble backgrounds and equip them with the conceptual mastery, speed calculations, and mental confidence required to crack competitive government examinations.&rdquo;
                </blockquote>
                <div className="mt-3">
                  <div className="font-serif font-bold text-lg text-[#0B356D]">RK Master
                  </div>
                  <div className="text-xs font-semibold text-amber-800">Founder &amp; Director, Kutty Study Circle
                
              
            

                  </div>
                </div>
              </div>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -top-3 right-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Talk to Mentor</span>
            </a>
          

          {/* 4 Pillars */}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
            <div data-aos="zoom-in" data-aos-delay="100" className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-[#0B356D] text-white font-bold flex items-center justify-center text-sm mb-3">
                1
              
              </div>
              <h4 className="font-serif font-bold text-base text-[#0B356D]">Expert Mentors</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                80+ experienced faculty, including RK Master. Ask doubts face-to-face in class.
              </p>
            

            </div>
            <div data-aos="zoom-in" data-aos-delay="150" className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-[#0B356D] text-white font-bold flex items-center justify-center text-sm mb-3">
                2
              
              </div>
              <h4 className="font-serif font-bold text-base text-[#0B356D]">Structured Batches</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Disciplined morning, evening and weekend batches aligned strictly with official syllabi.
              </p>
            

            </div>
            <div data-aos="zoom-in" data-aos-delay="200" className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-[#0B356D] text-white font-bold flex items-center justify-center text-sm mb-3">
                3
              
              </div>
              <h4 className="font-serif font-bold text-base text-[#0B356D]">Test Series &amp; Practice</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Weekly mock tests in actual examination halls with OMR evaluation &amp; rank analysis.
              </p>
            

            </div>
            <div data-aos="zoom-in" data-aos-delay="250" className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-[#0B356D] text-white font-bold flex items-center justify-center text-sm mb-3">
                4
              
              </div>
              <h4 className="font-serif font-bold text-base text-[#0B356D]">Personal Guidance</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Dedicated 1-on-1 counseling, weak-area diagnosis and physical test training.
              </p>
            
          
        
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: OUR COURSES (2-Column Grid on Mobile)
      ========================================================================= */}
      <section id="courses" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B356D] bg-blue-100 px-3.5 py-1.5 rounded-full">
              Our Courses
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B356D] mt-3">
              Explore Our Signature Programs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Every course is taught by dedicated faculty across Chittoor, Tirupati, and Palamaner.
            </p>
          

          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {COURSES_DATA.map((course, idx) => (
              <div
                key={course.id}
                data-aos="fade-up"
                data-aos-delay={idx * 75}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 hover:border-[#0B356D] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                      {course.tag}
                    </span>
                    <span className="text-[9px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {course.seats}
                    </span>
                  

                  </div>
                  <h3 className="font-serif text-base sm:text-xl font-bold text-[#0B356D] group-hover:text-amber-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {course.summary}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] sm:text-xs text-slate-500 font-medium">
                    <Clock className="w-3 h-3 inline mr-1 text-slate-400" />
                    <span>{course.timing}</span>
                  
                

                  </div>
                </div>
                <div className="mt-4 pt-2">
                  <button
                    onClick={() => handleEnrollClick(course.title)}
                    className="w-full py-2.5 px-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#072247] font-extrabold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                
              
                </div>
              </div>
            ))}
          
        
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: STUDY STORE (BUTTONS REMOVED - "YOU WILL FIND ALL THESE IN KUTTY STUDY CIRCLE")
      ========================================================================= */}
      <section id="study-store" className="py-14 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B356D] bg-blue-100 px-3.5 py-1.5 rounded-full">
              Study Store
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B356D] mt-3">
              Practice Papers &amp; Study Materials
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Model tests, previous question bit banks, and verified formula book sets prepared by our faculty.
            </p>
          

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card 1: Model Papers */}
            <div
              data-aos="fade-right"
              className="bg-[#0B356D] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 text-[#FBBF24] flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Model Papers &amp; Practice Tests
                </h3>
                <p className="text-slate-200 text-sm mt-2 leading-relaxed">
                  Exam-pattern papers to test yourself every week. Includes OMR answer sheets and detailed video solutions.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-amber-300">
                  <span className="bg-white/10 px-2.5 py-1 rounded">✓ AP DSC Mock Series</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded">✓ TET Grand Tests</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded">✓ Police SI Bit Bank</span>
                
              

              {/* Browse Button Removed -> Replaced with user's requested statement */}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/15">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F59E0B] text-[#072247] font-extrabold text-xs sm:text-sm shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-[#072247] flex-shrink-0" />
                  <span>You will find all these in Kutty Study Circle</span>
                
                </div>
                <p className="text-[11px] text-slate-300 mt-2 font-medium">
                  Provided directly to every student upon enrolment at our Chittoor, Tirupati, and Palamaner branches.
                </p>
              
            

            {/* Card 2: Study Material */}
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="bg-[#FFF3D6] text-slate-900 rounded-2xl p-6 sm:p-8 border border-amber-200/90 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-200 text-[#0B356D] flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B356D]">
                  Study Material &amp; Bit Bank
                </h3>
                <p className="text-slate-700 text-sm mt-2 leading-relaxed">
                  Subject notes, Telugu &amp; English bit banks, arithmetic shortcuts, and quick-revision formula booklets.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-[#0B356D]">
                  <span className="bg-white/80 px-2.5 py-1 rounded border border-amber-200">✓ RK Master Geometry Module</span>
                  <span className="bg-white/80 px-2.5 py-1 rounded border border-amber-200">✓ DSC Pedagogy Book</span>
                
              

              {/* Browse Button Removed -> Replaced with user's requested statement */}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-200/70">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B356D] text-[#FBBF24] font-extrabold text-xs sm:text-sm shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-[#FBBF24] flex-shrink-0" />
                  <span>You will find all these in Kutty Study Circle</span>
                
                </div>
                <p className="text-[11px] text-slate-600 mt-2 font-medium">
                  Complete bilingual printed sets and revision bit banks provided directly at the academy centers.
                </p>
              
            
          
        
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: BATCHES & TRAINING
          (Current Batches: Join Removed; Upcoming Batches: Next 15 Days for DSC)
      ========================================================================= */}
      <section id="batches" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B356D] bg-blue-100 px-3.5 py-1.5 rounded-full">
              Batches &amp; Timings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B356D] mt-3">
              DSC Training &amp; Classroom Batches
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Review current classroom sessions or reserve your seat for new DSC batches starting in the next 15 days.
            </p>
          

          {/* Tab Selector */}
          </div>
          <div className="flex justify-center mb-8" data-aos="fade-up">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 w-full max-w-lg shadow-inner">
              <button
                onClick={() => setActiveBatchTab("upcoming15")}
                className={`flex-1 py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeBatchTab === "upcoming15"
                    ? "bg-[#0B356D] text-white shadow-md"
                    : "text-slate-600 hover:text-[#0B356D]"
                }`}
              >
                ⭐ Next 15 Days DSC Batches
              </button>
              <button
                onClick={() => setActiveBatchTab("running")}
                className={`flex-1 py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeBatchTab === "running"
                    ? "bg-[#0B356D] text-white shadow-md"
                    : "text-slate-600 hover:text-[#0B356D]"
                }`}
              >
                Currently Running Batches
              </button>
            
          

          {/* Batches Cards Grid */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {activeBatchTab === "running" ? (
              // CURRENT RUNNING BATCHES (JOIN BUTTON REMOVED AS REQUESTED)
              CURRENT_RUNNING_BATCHES.map((batch) => (
                <div
                  key={batch.id}
                  data-aos="fade-up"
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border-t-4 border-t-emerald-600"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-50 text-[#0B356D] border border-blue-100">
                        {batch.category}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {batch.status}
                      </span>
                    

                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B356D]">
                      {batch.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {batch.desc}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <div className="text-[9px] uppercase font-bold text-slate-400">Timing
                        </div>
                        <div className="text-xs font-bold text-slate-800 truncate">{batch.timing}
                      
                        </div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <div className="text-[9px] uppercase font-bold text-slate-400">Mode
                        </div>
                        <div className="text-xs font-bold text-slate-800 truncate">{batch.mode}
                      
                        </div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <div className="text-[9px] uppercase font-bold text-slate-400">Center
                        </div>
                        <div className="text-xs font-bold text-slate-800 truncate">{batch.location}
                      
                    

                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-[11px] text-slate-500 font-medium mb-1">
                        <span>Syllabus progression</span>
                        <span>Week {batch.progressWeek} of {batch.totalWeeks}</span>
                      
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${(batch.progressWeek / batch.totalWeeks) * 100}%` }}
                        />
                      
                    
                  

                  {/* NO JOIN BUTTON AS INSTRUCTED - Simple Status Note instead */}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Classroom Session in Progress</span>
                    </span>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0B356D] font-bold hover:underline flex items-center gap-1"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ask Schedule</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              // UPCOMING NEXT 15 DAYS DSC BATCHES (WITH ENROLL OPTION)
              UPCOMING_15_DAYS_DSC_BATCHES.map((batch) => (
                <div
                  key={batch.id}
                  data-aos="fade-up"
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between border-t-4 border-t-[#F59E0B]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {batch.category}
                      </span>
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300">
                        ⚡ {batch.status}
                      </span>
                    

                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B356D]">
                      {batch.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {batch.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                      <div className="bg-amber-50/70 p-2 rounded-lg">
                        <div className="text-[9px] uppercase font-bold text-slate-500">Schedule
                        </div>
                        <div className="text-xs font-bold text-[#0B356D]">{batch.timing}
                      
                        </div>
                      </div>
                      <div className="bg-amber-50/70 p-2 rounded-lg">
                        <div className="text-[9px] uppercase font-bold text-slate-500">Seat Status
                        </div>
                        <div className="text-xs font-bold text-amber-800">{batch.seats}
                      
                    
                  

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 flex gap-2">
                    <button
                      onClick={() => handleEnrollClick(batch.courseSelection)}
                      className="flex-1 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#072247] font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition"
                    >
                      Reserve Seat (Next 15 Days)
                    </button>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl flex items-center justify-center transition"
                      title="Enquire on WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))
            )}
          
        
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ULTRA-PREMIUM CINEMATIC CAMPUS GALLERY (GSAP Animated)
      ========================================================================= */}
      <section
        id="gallery"
        className="py-16 sm:py-24 bg-gradient-to-b from-[#05172E] via-[#041224] to-[#061D3D] text-white relative overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#FBBF24] text-xs font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Campus Life &amp; Milestones</span>
            
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Experience life at <span className="text-[#FBBF24]">Kutty Study Circle</span>
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Step inside our smart classrooms, state-level auditoriums, and celebratory ranker felicitations across Chittoor, Tirupati, and Palamaner.
            </p>
          

          {/* Category Filter Chips */}
          </div>
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none" data-aos="fade-up">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                galleryCategory === "all"
                  ? "bg-[#F59E0B] text-[#072247] shadow-lg shadow-[#F59E0B]/20"
                  : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              All Moments ({PREMIUM_GALLERY_PHOTOS.length})
            </button>
            <button
              onClick={() => handleCategoryChange("classroom")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                galleryCategory === "classroom"
                  ? "bg-[#F59E0B] text-[#072247] shadow-lg shadow-[#F59E0B]/20"
                  : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              Smart Classrooms (2)
            </button>
            <button
              onClick={() => handleCategoryChange("seminar")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                galleryCategory === "seminar"
                  ? "bg-[#F59E0B] text-[#072247] shadow-lg shadow-[#F59E0B]/20"
                  : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              Grand Seminars &amp; Meets (2)
            </button>
            <button
              onClick={() => handleCategoryChange("hall")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                galleryCategory === "hall"
                  ? "bg-[#F59E0B] text-[#072247] shadow-lg shadow-[#F59E0B]/20"
                  : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              Practice Halls &amp; Library (2)
            </button>
          

          {/* MAIN CINEMATIC SHOWCASE (Touch-Swipeable on Mobile + GSAP Animated) */}
          </div>
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black/60 border border-amber-400/20 shadow-[0_25px_70px_rgba(0,0,0,0.6)] group"
            onMouseEnter={() => setIsGalleryAutoPlay(false)}
            onMouseLeave={() => setIsGalleryAutoPlay(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            data-aos="zoom-in"
          >
            <div className="relative h-[380px] sm:h-[480px] md:h-[540px] w-full overflow-hidden">
              <img
                ref={slideImgRef}
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className="w-full h-full object-cover animate-ken-burns origin-center transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />

              {/* Slide Counter Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-mono font-bold text-amber-300">
                <span>0{activeGallerySlide + 1}</span>
                <span className="text-white/40">/</span>
                <span className="text-slate-400">0{filteredPhotos.length}</span>
              

              {/* Autoplay & Zoom Controls */}
              </div>
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
                <button
                  onClick={() => setIsGalleryAutoPlay(!isGalleryAutoPlay)}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/70 transition flex items-center gap-1.5 text-xs font-semibold"
                  title={isGalleryAutoPlay ? "Pause Auto-Slide" : "Play Auto-Slide"}
                >
                  {isGalleryAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isGalleryAutoPlay ? "Auto" : "Paused"}</span>
                </button>

                <button
                  onClick={() => setLightboxImg(currentPhoto.url)}
                  className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-[#F59E0B] hover:text-[#072247] transition shadow"
                  title="View High-Resolution Image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              

              {/* Caption Content */}
              </div>
              <div
                ref={slideContentRef}
                className="absolute bottom-6 left-4 right-4 sm:bottom-10 sm:left-10 sm:right-10 z-20 max-w-2xl text-left"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B] text-[#072247] text-[11px] font-extrabold uppercase tracking-wide mb-2.5 shadow">
                  <MapPin className="w-3 h-3" />
                  <span>{currentPhoto.tag} · {currentPhoto.location}</span>
                

                </div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
                  {currentPhoto.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 mt-2 line-clamp-2 sm:line-clamp-none leading-relaxed drop-shadow">
                  {currentPhoto.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => setLightboxImg(currentPhoto.url)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white text-white hover:text-[#072247] backdrop-blur-md rounded-xl text-xs font-bold transition duration-300 border border-white/30"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View High-Res Photo</span>
                  </button>
                
              

              {/* Arrows */}
                </div>
              </div>
              <button
                onClick={() => setActiveGallerySlide((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#F59E0B] hover:text-[#072247] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => setActiveGallerySlide((prev) => (prev + 1) % filteredPhotos.length)}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#F59E0B] hover:text-[#072247] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
                <div
                  key={activeGallerySlide}
                  className="h-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] animate-gallery-progress"
                  style={{ animationPlayState: isGalleryAutoPlay ? "running" : "paused" }}
                />
              
            

            {/* Dots */}
              </div>
            </div>
            <div className="py-3 px-4 bg-black/80 flex items-center justify-center gap-2 border-t border-white/10">
              {filteredPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGallerySlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeGallerySlide === idx
                      ? "w-8 bg-[#F59E0B]"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            
          

          {/* Filmstrip Thumbnails */}
            </div>
          </div>
          <div className="mt-4 flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none" data-aos="fade-up">
            {filteredPhotos.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => setActiveGallerySlide(idx)}
                className={`relative flex-shrink-0 w-20 sm:w-32 h-14 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  activeGallerySlide === idx
                    ? "ring-3 ring-[#F59E0B] scale-105 shadow-lg shadow-[#F59E0B]/20"
                    : "opacity-60 hover:opacity-100 hover:scale-102 border border-white/15"
                }`}
              >
                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/25" />
                {activeGallerySlide === idx && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#F59E0B] shadow" />
                )}
              </button>
            ))}
          
        
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: ACHIEVERS & SUCCESS STORIES
      ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B356D] bg-blue-100 px-3.5 py-1.5 rounded-full">
              Hall of Fame
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B356D] mt-3">
              Our students, our pride
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Over 2,000 government selections secured since 2012. A few of the faces behind that proud number.
            </p>
          

          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {ACHIEVERS_DATA.map((achiever, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {achiever.rank}
                    </span>
                  
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#0B356D]">
                    {achiever.name}
                  </h4>
                  <div className="text-xs font-bold text-slate-500 mt-0.5">
                    {achiever.post}
                  
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic mt-3 leading-relaxed">
                    &ldquo;{achiever.feedback}&rdquo;
                  </p>
                
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Selection
                  </span>
                  <span>KSC Alumnus</span>
                
              
                </div>
              </div>
            ))}
          
        
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: CTA BANNER (BUTTONS SIDE BY SIDE ON MOBILE AS REQUESTED)
      ========================================================================= */}
      <section className="py-14 sm:py-20 bg-[#0B356D] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#F59E0B] text-[#072247] flex items-center justify-center mx-auto mb-4 shadow-xl">
            <GraduationCap className="w-8 h-8" />
          

          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Ready to start your journey?
          </h2>

          <p className="mt-3 text-slate-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Attend one free demo class at your nearest branch before you decide. No fee asked. Our counsellor will guide your preparation path.
          </p>

          {/* BUTTONS STRICTLY SIDE BY SIDE ON MOBILE (GRID 2 COLS AS REQUESTED) */}
          <div className="mt-8 max-w-lg mx-auto">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-2 sm:py-3.5 sm:px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 text-center truncate"
              >
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => scrollToSection("free-demo-form")}
                className="py-3 px-2 sm:py-3.5 sm:px-6 bg-[#F59E0B] hover:bg-[#D97706] text-[#072247] font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition text-center truncate"
              >
                Enroll Now
              </button>
            

            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => scrollToSection("branches")}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-bold underline underline-offset-4 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Find Our Branches (Tirupati · Chittoor · Palamaner)</span> &rarr;
              </button>
            
          
        
            </div>
          </div>
        </div>
      </section>

      
      
     {/* =========================================================================
          SECTION 9: OUR BRANCHES (Tirupati Head Office, Chittoor, Palamaner + Map)
      ========================================================================= */}
      <section id="branches" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B356D] bg-blue-100 px-3.5 py-1.5 rounded-full">
              Main Branches
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B356D] mt-3">
              Visit our Rayalaseema learning centers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Open Monday to Saturday, 8:00 AM to 8:00 PM. Walk in anytime for free career counseling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Branch Cards */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">

              {/* Tirupati · Head Office */}
              <div
                data-aos="fade-up"
                className="bg-[#FFF9EE] rounded-2xl p-5 border-2 border-amber-300 shadow-sm relative"
              >
                <span className="absolute -top-2.5 right-4 bg-[#F59E0B] text-[#072247] text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Head Office
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0B356D]">Tirupati · Head Office</h4>
                <p className="text-xs text-slate-700 mt-1">
                  Moresuper Market upstairs, Junction, MR Palli Road, New Balaji Colony, Avilali, Tirupati 517502
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="tel:9491844963"
                    className="text-xs font-bold text-[#0B356D] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F59E0B]" /> 94918 44963
                  </a>
                  <span className="text-slate-300">·</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Moresuper+Market+upstairs%2C+MR+Palli+Road%2C+New+Balaji+Colony%2C+Tirupati%2C+Andhra+Pradesh+517502"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5" /> Google Directions
                  </a>
                </div>
              </div>

              {/* Chittoor Branch */}
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#0B356D] transition"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#0B356D]">Chittoor · Branch</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  20-149, Jail Khana Street, Mittoor, Chittoor, Andhra Pradesh 517001
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="tel:9491844963"
                    className="text-xs font-bold text-[#0B356D] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F59E0B]" /> 94918 44963
                  </a>
                  <span className="text-slate-300">·</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=20-149%2C+Jail+Khana+Street%2C+Mittoor%2C+Chittoor%2C+Andhra+Pradesh+517001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5" /> Google Directions
                  </a>
                </div>
              </div>

              {/* Palamaner Branch */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#0B356D] transition"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#0B356D]">Palamaner · Branch</h4>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    Admissions Open
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Near Gundubhavi, Palamaner, Chittoor District, Andhra Pradesh
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="tel:9491844963"
                    className="text-xs font-bold text-[#0B356D] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F59E0B]" /> 94918 44963
                  </a>
                  <span className="text-slate-300">·</span>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp Desk
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <a
                  href="tel:9491844963"
                  className="flex-1 py-3 bg-[#0B356D] hover:bg-[#072247] text-white font-bold text-xs rounded-xl shadow-xs transition text-center flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Call 94918 44963</span>
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#072247] font-bold text-xs rounded-xl shadow-xs transition text-center flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#072247]" />
                  <span>WhatsApp Help</span>
                </a>
              </div>
            </div>

            {/* Embedded Live Google Map */}
            <div
              data-aos="fade-left"
              className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white min-h-[350px]"
            >
              <div className="p-4 sm:p-5 border-b border-slate-200">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B356D]">Find Your Nearest Branch</h3>
                <p className="text-xs text-slate-500 mt-1">Select a branch to view its location on the map.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {Object.entries(mapData).map(([key, branch]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedMapBranch(key)}
                      aria-pressed={selectedMapBranch === key}
                      className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold border transition ${
                        selectedMapBranch === key
                          ? "bg-[#0B356D] text-white border-[#0B356D]"
                          : "bg-white text-[#0B356D] border-slate-300 hover:border-[#0B356D]"
                      }`}
                    >
                      {branch.name}
                    </button>
                  ))}
                </div>
              </div>
              <iframe
                key={selectedMapBranch}
                title={`${mapData[selectedMapBranch].name} - Kutty Study Circle Map`}
                src={mapData[selectedMapBranch].embedUrl}
                width="100%"
                height="360"
                style={{ border: 0, minHeight: "360px", display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#0B356D]">{mapData[selectedMapBranch].name}</p>
                  <p className="text-xs text-slate-600 mt-1">{mapData[selectedMapBranch].address}</p>
                </div>
                <a
                  href={mapData[selectedMapBranch].directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#072247] text-xs font-extrabold transition whitespace-nowrap"
                >
                  <Compass className="w-4 h-4" /> Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: MODERN FOOTER
      ========================================================================= */}
      <footer className="bg-[#071E3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-block bg-white px-3 py-2 rounded-xl shadow-xs">
                <img
                  src={LOGO_URL}
                  alt="Kutty Study Circle"
                  className="h-9 sm:h-11 w-auto object-contain"
                  onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }}
                />
              

              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                For 14 years, Kutty Study Circle has guided students toward careers in teaching and government services through expert mentors, structured batches, and honest, result-focused preparation.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://www.facebook.com/people/Kutty-Study-Circle-Chittoor-Tirupati/100063825377434/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F59E0B] hover:text-[#072247] text-white flex items-center justify-center transition"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/kuttystudycircle.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F59E0B] hover:text-[#072247] text-white flex items-center justify-center transition"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@kuttystudycircle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F59E0B] hover:text-[#072247] text-white flex items-center justify-center transition"
                  title="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center transition"
                  title="WhatsApp 9491844963"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              
            

              </div>
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => scrollToSection("free-demo")} className="hover:text-[#FBBF24] transition">Free Demo Class</button></li>
                <li><button onClick={() => scrollToSection("about")} className="hover:text-[#FBBF24] transition">About Us</button></li>
                <li><button onClick={() => scrollToSection("courses")} className="hover:text-[#FBBF24] transition">Our Courses</button></li>
                <li><button onClick={() => scrollToSection("batches")} className="hover:text-[#FBBF24] transition">Next 15 Days DSC Batches</button></li>
                <li><button onClick={() => scrollToSection("gallery")} className="hover:text-[#FBBF24] transition">Campus Gallery</button></li>
                <li><button onClick={() => scrollToSection("branches")} className="hover:text-[#FBBF24] transition">Our Branches</button></li>
              </ul>
            

            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-3">
                Programs
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => handleEnrollClick("AP DSC 2026 (SGT Batch)")} className="hover:text-[#FBBF24] transition">AP DSC 2026 SGT Batch</button></li>
                <li><button onClick={() => handleEnrollClick("AP DSC 2026 (School Assistant)")} className="hover:text-[#FBBF24] transition">DSC School Assistant</button></li>
                <li><button onClick={() => handleEnrollClick("Teacher Eligibility Test (TET)")} className="hover:text-[#FBBF24] transition">Teacher Eligibility Test</button></li>
                <li><button onClick={() => handleEnrollClick("AP Police SI / Constable")} className="hover:text-[#FBBF24] transition">AP Police SI Programs</button></li>
                <li><button onClick={() => handleEnrollClick("Banking & SSC")} className="hover:text-[#FBBF24] transition">Banking, SSC &amp; Railway</button></li>
              </ul>
            

            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-3">
                Contact Info
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>26-111, Mittoor, Chittoor &amp; Tirupati Bypass</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0" />
                  <a href="tel:9491844963" className="hover:text-[#FBBF24] font-bold text-white">94918 44963</a>
                </li>
                <li className="flex items-center gap-2">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#FBBF24] font-bold text-white">WhatsApp 94918 44963</a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0" />
                  <span>Mon-Sat: 8:00 AM - 8:00 PM</span>
                </li>
              </ul>
            
          

            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
            <p>
              © 2026 Kutty Study Circle · All rights reserved. 14 Years of Shaping Futures.
            </p>
          
        
          </div>
        </div>
      </footer>
{/* New Landing Sections */}
{/* Landing sections moved to HomePage */}





     {/* =========================================================================
    STICKY MOBILE ACTION BAR
========================================================================= */}
{showFloatingBar && (
  <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-3 sm:hidden shadow-2xl flex items-center gap-2 animate-fadeIn">
    <a
      href="tel:9491844963"
      className="flex-1 py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-[#0B356D] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
    >
      <Phone className="w-3.5 h-3.5 text-[#0B356D]" />
      <span>Call 94918 44963</span>
    </a>

    <button
      onClick={() => scrollToSection("free-demo-form")}
      className="flex-1 py-2.5 px-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#072247] font-extrabold text-xs rounded-xl shadow-sm text-center"
    >
      Book Free Demo
    </button>
  </div>
)}

{/* Floating WhatsApp Action Pill (Desktop only) */}
<a
  href={WHATSAPP_LINK}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-2xl transition transform hover:scale-105"
  title="WhatsApp Direct 9491844963"
>
  <WhatsAppIcon className="w-5 h-5" />
  <span className="text-xs font-bold">WhatsApp Us</span>
</a>

      {/* =========================================================================
          LIGHTBOX MODAL FOR GALLERY
      ========================================================================= */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImg}
              alt="Enlarged Campus Moment"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain border border-white/20"
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 bg-[#F59E0B] text-[#072247] p-2 rounded-full font-bold shadow-xl hover:bg-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          
        
          </div>
        </div>
      )}
    
    </div>
  );
}
