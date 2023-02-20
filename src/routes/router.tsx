import { Amplify } from "aws-amplify";
import { createBrowserRouter, redirect } from "react-router-dom";
import Landing from "../ui/Landing/Landing";
import { authentication } from "../utils/authentication";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import Public from "./public/Public";
import Root from "./Root";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";
import AuthoriseCitizenServant from "./usct/authorise-citizen-servant/AuthoriseCitizenServant";
import CandidateList from "./usct/candidate-list/CandidateList";
import CaseManagement from "./usct/case-management/CaseManagement";
import Info from "./usct/info/Info";
import Personal from "./usct/personal/Personal";
import ReviewCandidate from "./usct/review-candidate/ReviewCandidate";
import Review from "./usct/review/Review";
import USCT from "./usct/USCT";

Amplify.configure({
  Auth: {
    region: "eu-central-1",
    userPoolId: "eu-central-1_r6tpMB1Kk",
    userPoolWebClientId: "64qi51ecoi6invhnp745v5qqjj",
  },
});

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Root />,
    loader: async () => {
      try {
        // await authentication.isLoggedIn();
      } catch (error) {
        return redirect("/sign-in");
      }
    },
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Public />,
    loader: async () => {
      try {
        const user = await authentication.isLoggedIn();
        if (user) {
          return redirect("/dashboard");
        }
      } catch (error) {
        return;
      }
    },
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    loader: async () => {
      try {
        // await authentication.isLoggedIn();
      } catch (error) {
        return redirect("/sign-in");
      }
    },
    path: "experience-govstack",
    children: [
      {
        path: "USCT",
        element: <USCT />,
        children: [
          {
            element: <AuthoriseCitizenServant />,
            path: "",
          },
          {
            element: <CaseManagement />,
            path: "case-management",
          },
          {
            element: <CandidateList />,
            path: "candidate-list",
          },
          {
            element: <ReviewCandidate />,
            path: "review-candidate/:id",
          },
          {
            element: <Info />,
            path: "info",
          },
          {
            element: <Personal />,
            path: "personal",
          },
          {
            element: <Review />,
            path: "review",
          },
        ],
      },
    ],
  },
]);
