
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toggleTheme } from "@/store/themeSlice";
import type { RootState } from "@/store/store";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-white" />
      )}
    </Button>
  );
};

export default ThemeToggle;

