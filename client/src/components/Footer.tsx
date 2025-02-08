import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <footer className="bg-muted/80 border-t backdrop-blur-sm relative z-10 p-0 m-0">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <div>
            <h3 className="text-lg font-semibold text-foreground/90 mb-4">
              About Us
            </h3>
            <p className="text-foreground/80">
              We help businesses create stunning websites quickly and
              efficiently.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground/90 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("/themes")}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Theme Selection
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground/90 mb-4">
              Contact
            </h3>
            <p className="text-foreground/80">
              Email: contact@webbuilder.com
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-foreground/80 animate-fade-in [animation-delay:200ms]">
          <p>
            &copy; {new Date().getFullYear()} WebBuilder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
