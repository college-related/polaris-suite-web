import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoute from "./routes/AppRoute";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppRoute />
    </GoogleOAuthProvider>
  );
}

export default App;
