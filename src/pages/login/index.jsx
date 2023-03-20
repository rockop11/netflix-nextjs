import { UnloggedContent } from "@components/index";

//Google Font
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const LoginPage = () => {
  return (
    <div className={inter.className}>
      <UnloggedContent />
    </div>
  );
};

export default LoginPage;
