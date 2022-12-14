import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import firebase from "../../lib/firebase";
import { useEffect } from "react";

const db = firebase.firestore();

export default function Footer({ footerNavigation }) {
  const [quote, loading, error] = useDocumentDataOnce(
    db.collection("Quotes").doc("strangetimesarethese")
  );
  useEffect(() => {
    console.log(quote, loading, error)
  }, [quote, loading])
  if(loading) {
    return (
      <div>Loading</div>
    )
  }
  if(!loading && quote !== undefined) {
    return (
      <footer className="bg-gray-50" aria-labelledby="footerHeading">
        <h2 id="footerHeading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 lg:pt-16 lg:px-8">
          <div className="space-y-8 xl:col-span-1 text-center">
            <div className="flex items-center justify-center">
              <img
                className="h-10 flex items-center justify-center"
                src="https://tailwindui.com/img/logos/workflow-mark-gray-300.svg"
                alt="Company name"
              />
            </div>
            <p className="text-gray-500 text-base flex items-center justify-center">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <blockquote>
                  "{quote.Quote}" - {quote.Attribution}
                </blockquote>
              )}
            </p>
            <div className="flex space-x-6 items-center justify-center">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
  
          <div className="mt-12 border-t border-gray-200 py-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2021 Eric Muir
            </p>
          </div>
        </div>
      </footer>
    );
  }
  return null
}
