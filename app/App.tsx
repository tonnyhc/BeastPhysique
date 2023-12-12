import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./src/contexts/AuthContext";

import { ThemeProvider } from "./src/contexts/ThemeContext";
import Layout from "./_layout";

const queryClient = new QueryClient();



export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
