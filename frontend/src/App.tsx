import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./components/shared/MainLayout";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
        <Toaster position="top-center" />
      </Router>
    </>
  );
}

export default App;
