
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-background' : 'bg-background'}`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
