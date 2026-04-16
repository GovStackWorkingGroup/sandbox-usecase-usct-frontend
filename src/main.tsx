import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {QueryClient, QueryClientProvider} from "react-query";
import {RouterProvider} from "react-router-dom";
import {Accordion} from "./chakra-overrides/Accordion";
import {colors} from "./chakra-overrides/colors";
import {Heading} from "./chakra-overrides/Heading";
import {List} from "./chakra-overrides/List";
import {Progress} from "./chakra-overrides/Progress";
import Tabs from "./chakra-overrides/Tabs";
import {Text} from "./chakra-overrides/Text";
import "./index.css";
import {router} from "./routes/router";

const theme = extendTheme({
  colors,
  components: {
    Heading: Heading,
    Text: Text,
    Progress: Progress,
    Tabs: Tabs,
    List: List,
    Accordion: Accordion,
  },
  breakpoints: {
    xs: "200px",
    sm: "520px",
    md: "768px",
    lg: "991px",
    xl: "1240px",
    "2xl": "1300px",
  },
});

const queryClient = new QueryClient();

// on (re)load, check signed-id status
sessionStorage.removeItem("user");

console.log("Previous docker image is 73149fd33247484fe54a079e9c58acc2cb22fbcf");

fetch(`/api/v1/roles`, {
credentials: "include" ,
signal: AbortSignal.timeout(5000)})
.then(roles => {
  if (roles.ok) {
    return roles.text().then(text => {
      sessionStorage.setItem("user", text)
    })
  }
}).finally(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <RouterProvider router={router}/>
          </ChakraProvider>
        </QueryClientProvider>
      </React.StrictMode>,
  );
});
