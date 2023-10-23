import { useLocation } from "react-router-dom";
import { useEffect, React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CheckIn } from "pages/CheckIn";
import { Landing } from "pages/Landing";
import { Home } from "pages/Home";
import { Error } from "pages/Error";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
          <Routes>
            <Route path="/checkin" element={< CheckIn />} />
            <Route path="/landing" element={< Landing />} />
            <Route path="/home" element={< Home />} />
            <Route path="/*" element={< Error />} />
          </Routes>
      </Router>
    </div>
  )
}
export default App;