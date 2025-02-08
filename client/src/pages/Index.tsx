import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import ThemeSelector from "@/pages/ThemeSelector";
import { Clock, DollarSign, Rocket } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setMousePosition } from "@/store/mouseSlice";
import type { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [typedText, setTypedText] = useState("");
  const textToType = "Build Your Dream Website";
  const [charIndex, setCharIndex] = useState(0);
  const dispatch = useDispatch();
  const mousePosition = useSelector((state: RootState) => state.mouse.position);
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (charIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + textToType[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [charIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const hero = document.getElementById("hero-section");
    if (hero) {
      const rect = hero.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        dispatch(
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          })
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
      {/* Navbar */}
      <Navbar />
      <>
        {/* Hero Section */}
        <section
          id="hero-section"
          className="relative z-10 py-20 px-4 overflow-hidden"
        >
          <div
            className="pointer-events-none fixed w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x - 128}px, ${
                mousePosition.y - 128
              }px)`,
              transition: "transform 0.15s ease-out",
            }}
          />
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6 animate-fade-in min-h-[60px] drop-shadow-xl">
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms] font-medium drop-shadow-lg">
              Create stunning websites effortlessly with our powerful theme
              builder. Perfect for businesses and individuals alike.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/themes")}
              className="animate-fade-in [animation-delay:400ms] shadow-lg hover:scale-105 transition-transform"
            >
              Theme Selection
            </Button>
          </div>
        </section>

        <section className="py-20 px-4 relative z-10 pr-24 pl-24">
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-6">
              <h3
                className={`font-serif text-3xl sm:w-full lg:w-1/2 bg-gradient-to-r ${
                  theme === "dark" ? "from-white" : "from-black"
                } to-yellow-400 bg-clip-text text-transparent drop-shadow-lg`}
              >
                We’re Not Just Another lovable or bolt!
              </h3>

              <p className="text-xl text-ellipsis text-balance w-3/4 font-extralight drop-shadow-lg text-foreground">
                While Lovable and Bolt offer powerful AI-driven platforms for
                generating full-stack applications, we take it a step further.
                We help you choose the perfect theme and connect you with a
                skilled freelance developer to bring your vision to life.
                Whether you’re using Lovable or Bolt, we streamline the entire
                process, ensuring your website is up and running quickly and
                efficiently.
              </p>
            </div>
            <div className="hidden md:flex lg:flex justify-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=2805&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="img"
                  className="border rounded-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sample Designs Section */}
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground/90 mb-12 animate-fade-in drop-shadow-lg">
              Sample Designs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:200ms]">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Professional website design"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold">
                      Professional Design
                    </h3>
                    <p className="text-white/90 text-sm">
                      Perfect for business websites
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:400ms]">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Modern website design"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold">Modern Design</h3>
                    <p className="text-white/90 text-sm">
                      Sleek and contemporary
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:600ms]">
                <img
                  src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
                  alt="Creative website design"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold">
                      Creative Design
                    </h3>
                    <p className="text-white/90 text-sm">
                      Stand out from the crowd
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground/90 mb-12 animate-fade-in drop-shadow-lg">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-card/95 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in [animation-delay:200ms] backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <Rocket className="text-primary animate-bounce" />
                </div>
                <h3 className="text-xl font-semibold text-foreground/90 text-center mb-2">
                  Fast Website Building
                </h3>
                <p className="text-foreground/80 text-center">
                  Build your website in minutes, not hours. Our intuitive
                  builder makes it quick and easy.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card/95 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in [animation-delay:400ms] backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <DollarSign className="text-primary animate-bounce [animation-delay:200ms]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground/90 text-center mb-2">
                  Cost Effective
                </h3>
                <p className="text-foreground/80 text-center">
                  Save money with our affordable solutions while getting
                  professional results.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card/95 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in [animation-delay:600ms] backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <Clock className="text-primary animate-bounce [animation-delay:400ms]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground/90 text-center mb-2">
                  Save Time
                </h3>
                <p className="text-foreground/80 text-center">
                  Focus on your business while we handle the technical details
                  of your website.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    </div>
  );
};

export default Index;
