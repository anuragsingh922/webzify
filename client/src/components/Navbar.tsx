import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="relative z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">
              <span onClick={() => navigate("/")} className="cursor-pointer">
                WebBuilder
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4 animate-fade-in">
            <ThemeToggle />
            <Button onClick={() => navigate("/themes")}>Theme Selection</Button>
            <Button className="bg-transparent hover:bg-transparent text-foreground border border-foreground" onClick={() => navigate("/admin")}>Admin Pannel</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
