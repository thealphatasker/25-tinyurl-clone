import Header from "./Header/Header";
import BodyMain1 from "./BodyMain1/BodyMain1";
import Bodypt2 from "./Body-part-2/Bodypt2";
import Bodypt3 from "./Body-part-3/Bodypt3";
import Bodypt4 from "./Body-part-4/Bodypt4";
import Bodypt5 from "./Body-part-5/Bodypt5";
import Bodypt6 from "./Body-part-6/Bodypt6";
import Footer from "./Footer/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "600",
            padding: "16px 24px",
            minWidth: "300px",
          },
          success: {
            iconTheme: {
              primary: "#1f8244",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#c0392b",
              secondary: "#fff",
            },
          },
        }}
      />
      <Header />
      <BodyMain1 />
      <Bodypt2 />
      <Bodypt3 />
      <Bodypt4 />
      <Bodypt5 />
      <Bodypt6 />
      <Footer />
    </div>
  );
}

export default App;
